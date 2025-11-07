import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Unit, BMIData, BMICategory, HistoryEntry } from '../types';
import UnitSwitch from './UnitSwitch';
import InputSlider from './InputSlider';
import BMIResult from './BMIResult';
import BMIHistory from './BMIHistory';

const DEFAULT_METRIC_HEIGHT = 170;
const DEFAULT_METRIC_WEIGHT = 70;

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<Unit>('metric');
  const [height, setHeight] = useState<number>(DEFAULT_METRIC_HEIGHT);
  const [weight, setWeight] = useState<number>(DEFAULT_METRIC_WEIGHT);
  const [bmiData, setBmiData] = useState<BMIData>({ bmi: null, category: null, color: 'bg-slate-500' });
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const isInitialMount = useRef(true);

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('bmiHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse BMI history from localStorage", error);
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bmiHistory', JSON.stringify(history));
  }, [history]);


  const heightConfig = useMemo(() => {
    return unit === 'metric'
      ? { min: 120, max: 220, step: 1, unit: 'سم' }
      : { min: 48, max: 84, step: 1, unit: 'بوصة' };
  }, [unit]);

  const weightConfig = useMemo(() => {
    return unit === 'metric'
      ? { min: 30, max: 180, step: 1, unit: 'كجم' }
      : { min: 60, max: 400, step: 1, unit: 'رطل' };
  }, [unit]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (unit === 'metric') {
      // Convert imperial to metric and set state
      setHeight(prev => Math.round(prev * 2.54));
      setWeight(prev => Math.round(prev / 2.205));
    } else {
      // Convert metric to imperial and set state
      setHeight(prev => Math.round(prev / 2.54));
      setWeight(prev => Math.round(prev * 2.205));
    }
  }, [unit]);

  useEffect(() => {
    const calculateBMI = () => {
      if (height <= 0 || weight <= 0) {
        setBmiData({ bmi: null, category: null, color: 'bg-slate-500' });
        return;
      }
      
      let bmiValue: number;
      if (unit === 'metric') {
        const heightInMeters = height / 100;
        bmiValue = weight / (heightInMeters * heightInMeters);
      } else {
        bmiValue = 703 * (weight / (height * height));
      }

      let category: BMICategory | null = null;
      let color: string = 'bg-slate-500';

      if (bmiValue < 18.5) {
        category = BMICategory.Underweight;
        color = 'bg-sky-500';
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        category = BMICategory.Normal;
        color = 'bg-green-500';
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        category = BMICategory.Overweight;
        color = 'bg-yellow-500';
      } else if (bmiValue >= 30) {
        category = BMICategory.Obesity;
        color = 'bg-red-500';
      }
      
      setBmiData({ bmi: bmiValue, category, color });
    };

    calculateBMI();
  }, [height, weight, unit]);

  const handleReset = () => {
    setUnit('metric');
    setHeight(DEFAULT_METRIC_HEIGHT);
    setWeight(DEFAULT_METRIC_WEIGHT);
  };

  const handleSaveResult = () => {
    if (bmiData.bmi && bmiData.category) {
      const newEntry: HistoryEntry = {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
        bmi: bmiData.bmi,
        category: bmiData.category,
        color: bmiData.color,
      };
      setHistory(prevHistory => [newEntry, ...prevHistory]);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700 shadow-2xl shadow-black/20">
        <div className="space-y-8 flex flex-col justify-center">
          <UnitSwitch selectedUnit={unit} onUnitChange={setUnit} />
          <InputSlider
            label="الطول"
            unit={heightConfig.unit}
            value={height}
            min={heightConfig.min}
            max={heightConfig.max}
            step={heightConfig.step}
            onChange={setHeight}
          />
          <InputSlider
            label="الوزن"
            unit={weightConfig.unit}
            value={weight}
            min={weightConfig.min}
            max={weightConfig.max}
            step={weightConfig.step}
            onChange={setWeight}
          />
          <button
            onClick={handleReset}
            className="w-full py-3 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label="إعادة تعيين مدخلات الحاسبة"
          >
            إعادة تعيين
          </button>
        </div>
        <div>
          <BMIResult 
            data={bmiData} 
            onSave={handleSaveResult}
            isSaveDisabled={bmiData.bmi === null}
          />
        </div>
      </div>
      <BMIHistory history={history} onClear={handleClearHistory} />
    </div>
  );
};

export default BMICalculator;
