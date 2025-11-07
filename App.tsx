import React from 'react';
import BMICalculator from './components/BMICalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            حاسبة مؤشر كتلة الجسم
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            احسب مؤشر كتلة الجسم فورًا من أجل صحة أفضل.
          </p>
        </header>
        <main>
          <BMICalculator />
        </main>
        <footer className="text-center mt-12 text-slate-500">
          <p>&copy; {new Date().getFullYear()} حاسبة مؤشر كتلة الجسم الحديثة. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;