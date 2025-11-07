import React from 'react';
import { Unit } from '../types';

interface UnitSwitchProps {
  selectedUnit: Unit;
  onUnitChange: (unit: Unit) => void;
}

const UnitSwitch: React.FC<UnitSwitchProps> = ({ selectedUnit, onUnitChange }) => {
  return (
    <div className="flex justify-center p-1 bg-slate-800 rounded-full shadow-inner">
      <button
        onClick={() => onUnitChange('metric')}
        className={`w-1/2 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 ${
          selectedUnit === 'metric' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700'
        }`}
      >
        متري (كجم/سم)
      </button>
      <button
        onClick={() => onUnitChange('imperial')}
        className={`w-1/2 py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 ${
          selectedUnit === 'imperial' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-700'
        }`}
      >
        إمبراطوري (رطل/بوصة)
      </button>
    </div>
  );
};

export default UnitSwitch;