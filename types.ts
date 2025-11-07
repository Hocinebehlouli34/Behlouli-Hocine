export type Unit = 'metric' | 'imperial';

export enum BMICategory {
  Underweight = 'Underweight',
  Normal = 'Normal weight',
  Overweight = 'Overweight',
  Obesity = 'Obesity',
}

export interface BMIData {
  bmi: number | null;
  category: BMICategory | null;
  color: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  bmi: number;
  category: BMICategory;
  color: string;
}
