
import React from 'react';
import { HistoryEntry, BMICategory } from '../types';

interface BMIHistoryProps {
  history: HistoryEntry[];
  onClear: () => void;
}

const CATEGORY_DISPLAY_NAMES_AR: { [key in BMICategory]: string } = {
  [BMICategory.Underweight]: 'نقص الوزن',
  [BMICategory.Normal]: 'وزن طبيعي',
  [BMICategory.Overweight]: 'زيادة الوزن',
  [BMICategory.Obesity]: 'سمنة',
};

const BMIHistory: React.FC<BMIHistoryProps> = ({ history, onClear }) => {
  return (
    <div className="w-full p-6 md:p-8 bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700 shadow-2xl shadow-black/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">سجل الحسابات</h3>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-red-600/50 text-red-300 text-sm font-semibold rounded-lg hover:bg-red-600/70 hover:text-white transition-colors duration-300"
            aria-label="مسح كل سجلات الحسابات"
          >
            مسح السجل
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <p>لا توجد سجلات حتى الآن.</p>
          <p className="text-sm">احفظ نتيجة لبدء تتبع تقدمك.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 transition-all duration-200 hover:bg-slate-700/50 hover:border-slate-600 hover:scale-[1.02]"
            >
              <div className="text-right">
                <p className="font-semibold text-white">
                  {entry.bmi.toLocaleString('ar-EG', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  <span className="text-xs text-slate-400 mr-1">مؤشر كتلة الجسم</span>
                </p>
                <p className="text-sm text-slate-400">{entry.date}</p>
              </div>
              <div className="text-left">
                <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${entry.color}`}>
                  {CATEGORY_DISPLAY_NAMES_AR[entry.category]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BMIHistory;