
import React from 'react';
import { BMIData, BMICategory } from '../types';

interface BMIResultProps {
  data: BMIData;
  onSave: () => void;
  isSaveDisabled: boolean;
}

const CATEGORIES_AR = [
  { name: BMICategory.Underweight, displayName: 'نقص الوزن', color: 'bg-sky-500', range: '> ١٨.٥' },
  { name: BMICategory.Normal, displayName: 'وزن طبيعي', color: 'bg-green-500', range: '١٨.٥ - ٢٤.٩' },
  { name: BMICategory.Overweight, displayName: 'زيادة الوزن', color: 'bg-yellow-500', range: '٢٥.٠ - ٢٩.٩' },
  { name: BMICategory.Obesity, displayName: 'سمنة', color: 'bg-red-500', range: '≤ ٣٠.٠' },
];

const HEALTH_TIPS_AR = {
  [BMICategory.Underweight]: {
    title: 'ركز على الأطعمة الغنية بالعناصر الغذائية',
    summary: "مؤشر كتلة جسمك ضمن نطاق نقص الوزن. من المهم التركيز على نظام غذائي متوازن لضمان حصول جسمك على الطاقة والعناصر الغذائية التي يحتاجها.",
    tips: [
      'أضف الدهون الصحية مثل الأفوكادو والمكسرات والبذور.',
      'تناول وجبات رئيسية ووجبات خفيفة متوازنة بانتظام على مدار اليوم.',
      'فكر في ممارسة تمارين القوة لبناء كتلة عضلية صافية.',
    ],
  },
  [BMICategory.Normal]: {
    title: "أنت تقوم بعمل رائع!",
    summary: 'تهانينا! مؤشر كتلة جسمك ضمن النطاق الطبيعي، وهو مؤشر ممتاز على صحة جيدة. الحفاظ على هذا المستوى هو مفتاح العافية على المدى الطويل.',
    tips: [
      'استمر في اتباع نظام غذائي متوازن غني بالفواكه والخضروات والحبوب الكاملة.',
      'حافظ على نشاطك من خلال ممارسة التمارين الرياضية بانتظام التي تستمتع بها.',
      'أعطِ الأولوية للنوم الجيد وإدارة التوتر من أجل صحة شاملة.',
    ],
  },
  [BMICategory.Overweight]: {
    title: 'تغييرات صغيرة، تأثير كبير',
    summary: 'مؤشر كتلة جسمك ضمن نطاق زيادة الوزن. إجراء تغييرات صغيرة ومستدامة في نمط حياتك يمكن أن يكون له تأثير إيجابي كبير على صحتك.',
    tips: [
      'ركز على التحكم في حجم الحصص وممارسات الأكل الواعي.',
      'أدمج المزيد من النشاط البدني في روتينك اليومي، مثل المشي السريع.',
      'اختر الأطعمة الكاملة بدلاً من الخيارات المصنعة كلما أمكن ذلك.',
    ],
  },
  [BMICategory.Obesity]: {
    title: 'اتخاذ خطوات نحو الصحة',
    summary: 'مؤشر كتلة جسمك ضمن نطاق السمنة. هذا وقت مناسب للتركيز على وضع خطة داعمة ومستدامة لرحلتك الصحية.',
    tips: [
      'ابدأ بأهداف صغيرة وقابلة للتحقيق فيما يتعلق بالنظام الغذائي والتمارين الرياضية.',
      'زد من حركتك اليومية - حتى المشي القصير يحدث فرقًا.',
      'اطلب التوجيه من أخصائي رعاية صحية لوضع خطة مخصصة لك.',
    ],
  },
};

const HealthTips: React.FC<{ category: BMICategory | null }> = ({ category }) => {
  if (!category || !HEALTH_TIPS_AR[category]) return null;

  const { title, summary, tips } = HEALTH_TIPS_AR[category];

  return (
    <div className="mt-8 w-full text-right bg-slate-700/50 p-6 rounded-2xl border border-slate-700">
      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-sm text-slate-300 mb-4">{summary}</p>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
             <svg
              className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-slate-300 text-sm">{tip}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-500 mt-6 italic">
        إخلاء مسؤولية: هذه المعلومات للأغراض العامة فقط وليست بديلاً عن المشورة الطبية المتخصصة. استشر دائمًا مقدم رعاية صحية مؤهل.
      </p>
    </div>
  );
};

const BMIResult: React.FC<BMIResultProps> = ({ data, onSave, isSaveDisabled }) => {
  const { bmi, category, color } = data;

  const getIndicatorPosition = () => {
    if (bmi === null) return 0;
    if (bmi < 15) return 0;
    if (bmi > 40) return 100;
    const position = ((bmi - 15) / (40 - 15)) * 100;
    return position;
  };

  const indicatorPosition = getIndicatorPosition();
  
  const translatedCategory = category ? CATEGORIES_AR.find(c => c.name === category)?.displayName : '';

  return (
    <div className="w-full bg-slate-800 p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/20">
      <h3 className="text-lg font-medium text-slate-300 mb-2">مؤشر كتلة جسمك هو</h3>
      {bmi !== null ? (
        <>
          <div className="text-6xl font-bold text-white mb-2">{bmi.toLocaleString('ar-EG', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
          <div className={`text-xl font-semibold px-4 py-1 rounded-full ${color} text-white`}>
            {translatedCategory}
          </div>
          <div className="w-full mt-8">
            <div className="relative w-full h-2 bg-slate-700 rounded-full">
              <div className="flex h-full rounded-full overflow-hidden">
                <div className="w-[25%] bg-sky-500"></div>
                <div className="w-[25%] bg-green-500"></div>
                <div className="w-[25%] bg-yellow-500"></div>
                <div className="w-[25%] bg-red-500"></div>
              </div>
              <div
                className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 transition-all duration-500"
                style={{ right: `${indicatorPosition}%` }}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-lg border-2 border-slate-800"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-2 px-1">
              <span>{(15).toLocaleString('ar-EG')}</span>
              <span>{(20).toLocaleString('ar-EG')}</span>
              <span>{(25).toLocaleString('ar-EG')}</span>
              <span>{(30).toLocaleString('ar-EG')}</span>
              <span>{(35).toLocaleString('ar-EG')}</span>
              <span>{(40).toLocaleString('ar-EG')}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full">
            {CATEGORIES_AR.map((cat) => (
              <div key={cat.name} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                  <p className="text-white text-sm font-semibold">{cat.displayName}</p>
                </div>
                <p className="text-slate-400 text-xs mt-1">{cat.range}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onSave}
            disabled={isSaveDisabled}
            className="w-full mt-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-slate-600 disabled:cursor-not-allowed"
            aria-label="حفظ النتيجة الحالية"
          >
            حفظ النتيجة
          </button>
          <HealthTips category={category} />
        </>
      ) : (
        <div className="text-4xl font-bold text-slate-500 mb-2">--.-</div>
      )}
    </div>
  );
};

export default BMIResult;