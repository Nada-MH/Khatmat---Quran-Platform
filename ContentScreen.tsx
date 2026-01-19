
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContentScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for related programs studying this specific content (Surah Al-Kahf)
  const relatedPrograms = [
    {
      id: 'h101',
      title: 'حلقة تدبر الكهف الأسبوعية',
      type: 'HALAQAH',
      teacher: 'الشيخ صالح الفوزان',
      status: 'بث مباشر الآن 🔴',
      icon: '🕋'
    },
    {
      id: 'k202',
      title: 'ختمة تدبر سورة الكهف',
      type: 'KHATMAH',
      participants: 142,
      progress: 45,
      icon: '📖'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <button onClick={() => navigate(-1)} className="text-emerald-600 flex items-center gap-1 text-sm mb-4 hover:translate-x-1 transition-transform">
        <span>→</span> رجوع للرئيسية
      </button>

      <article className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <header className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-bold text-emerald-900 font-amiri mb-2">تدبر سورة الكهف</h2>
          <div className="flex gap-2">
            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded font-bold">مستوى متوسط</span>
            <span className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded font-bold">تفسير</span>
          </div>
        </header>

        <section className="space-y-4">
          <div className="bg-slate-50 p-6 rounded-2xl text-center leading-loose border border-slate-100 shadow-inner">
            <p className="font-amiri text-2xl text-slate-800">
              ﴿ الْحَمْدُ لِلَّهِ الَّذِي أَنْزَلَ عَلَى عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَلْ لَهُ عِوَجًا ﴾
            </p>
            <p className="text-[10px] text-slate-400 mt-2 font-bold tracking-widest uppercase">[الكهف: ١]</p>
          </div>

          <div className="prose prose-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span className="text-emerald-600">💡</span> تفسير ميسر:
            </h4>
            <p>
              الثناء بالجميل والكمال لله عز وجل، الذي أنزل على عبده ورسوله محمد ﷺ القرآن، ولم يجعل فيه شيئًا من الميل عن الحق أو النقص أو الاختلال.
            </p>
            <p className="mt-4">
              هذه السورة الكريمة تسمى "الكهف" وهي حصن للمسلم من الفتن، وبدأت بالحمد لله على نعمة الوحي والهداية.
            </p>
          </div>
        </section>

        {/* Linked Communities Section */}
        <section className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50 space-y-3">
          <h4 className="font-bold text-amber-900 text-xs mb-3 flex items-center gap-2">
            <span className="animate-pulse">✨</span> مجتمعات تدرس هذه السورة الآن:
          </h4>
          <div className="space-y-2">
            {relatedPrograms.map(prog => (
              <div key={prog.id} className="bg-white p-3 rounded-xl flex items-center justify-between shadow-sm border border-amber-200/30">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{prog.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{prog.title}</p>
                    <p className="text-[9px] text-slate-400">
                      {prog.type === 'HALAQAH' ? `المعلم: ${prog.teacher}` : `مشارك: ${prog.participants}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => prog.type === 'HALAQAH' ? navigate(`/session/${prog.id}`) : navigate('/khatmah')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all active:scale-95 ${
                    prog.status ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-600 text-white'
                  }`}
                >
                  {prog.status ? 'انضم للبث' : 'انضمام'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
          <h4 className="font-bold text-emerald-900 text-sm mb-3">المصدر التعليمي:</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">📚</div>
            <div>
              <p className="text-xs font-bold text-emerald-800">تفسير السعدي (تيسير الكريم الرحمن)</p>
              <p className="text-[10px] text-emerald-600">الجزء الثالث • صفحة ٤٦٧</p>
            </div>
          </div>
        </section>

        <div className="flex gap-3">
            <button className="flex-1 bg-slate-100 hover:bg-slate-200 py-3.5 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                🎧 استماع
            </button>
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
                تمت القراءة ✅
            </button>
        </div>
      </article>

      {/* Recommended Content */}
      <section className="pb-8">
        <h3 className="font-bold text-slate-700 mb-3 text-sm px-1">دروس ذات صلة بالكهف</h3>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-emerald-200 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner">📖</div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-800">تفسير الآية {i+1} من سورة الكهف</p>
                <p className="text-[10px] text-slate-400">مدة القراءة: ٣ دقائق</p>
              </div>
              <span className="text-slate-300">{'<'}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentScreen;
