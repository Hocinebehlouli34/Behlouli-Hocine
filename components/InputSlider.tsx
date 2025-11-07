
import React from 'react';

interface InputSliderProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

const InputSlider: React.FC<InputSliderProps> = ({ label, unit, value, min, max, step, onChange }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="text-slate-300 font-medium">{label}</label>
        <span className="text-2xl font-bold text-white bg-slate-700 px-3 py-1 rounded-md">
          {value} <span className="text-sm text-slate-400">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500 transition-transform duration-200 hover:scale-[1.01]"
      />
    </div>
  );
};

export default InputSlider;