
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_USER } from '../constants';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [wirdStatus, setWirdStatus] = useState<'PENDING' | 'REVIEWED'>('PENDING');

  const handleCompleteWird = () => {
    setWirdStatus('REVIEWED');
  };

  const handleCheckResults = () => {
    navigate('/khatmah-status/k1');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={MOCK_USER.avatar} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-[#947f57]" />
            <div>
              <h2 className="text-lg font-bold text-slate-800">السلام عليكم، {MOCK_USER.name}</h2>
              <p className="text-sm text-slate-500">لديك {MOCK_USER.streak} أيام متتالية! 🔥</p>
            </div>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-slate-400 hover:text-[#947f57] transition-colors"
            title="الإحصائيات"
          >
            📊
          </button>
        </div>
      </section>

      {/* Daily Wird Status */}
      <section 
        style={{ backgroundColor: wirdStatus === 'REVIEWED' ? '#947f57' : '#fcfbf7' }}
        className={`p-5 rounded-2xl border transition-all duration-500 shadow-sm ${
          wirdStatus === 'REVIEWED' ? 'border-[#836d46]' : 'border-[#947f57]/20'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`font-bold ${wirdStatus === 'REVIEWED' ? 'text-white' : 'text-[#947f57]'}`}>وِرد اليوم</h3>
          <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider ${
            wirdStatus === 'REVIEWED' ? 'bg-white/20 text-white' : 'bg-[#947f57]/20 text-[#947f57]'
          }`}>
            {wirdStatus === 'REVIEWED' ? 'تمت المراجعة' : 'قيد الإنجاز'}
          </span>
        </div>
        
        <div className={`p-4 rounded-xl shadow-inner border flex items-center justify-between transition-all ${
          wirdStatus === 'REVIEWED' ? 'bg-white/10 border-white/20' : 'bg-white border-[#947f57]/10'
        }`}>
          <div>
            <p className={`text-[10px] ${wirdStatus === 'REVIEWED' ? 'text-white/70' : 'text-slate-400'}`}>ختمة المجموعة الأسبوعية</p>
            <p className={`font-bold text-lg font-amiri ${wirdStatus === 'REVIEWED' ? 'text-white' : 'text-slate-800'}`}>الجزء الأول (البقرة)</p>
          </div>
          
          <button 
            onClick={wirdStatus === 'PENDING' ? handleCompleteWird : handleCheckResults}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95 ${
              wirdStatus === 'REVIEWED' 
                ? 'bg-white text-[#947f57] hover:bg-slate-50' 
                : 'bg-[#947f57] text-white hover:bg-[#836d46]'
            }`}
          >
            {wirdStatus === 'REVIEWED' ? 'استعلام النتيجة والملاحظات ✅' : 'تم الإنجاز'}
          </button>
        </div>
      </section>

      {/* Next Session Card */}
      <section className="bg-amber-50 p-5 rounded-2xl border border-amber-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-amber-900">الجلسة القادمة</h3>
          <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded">اليوم، ٨:٣٠ مساءً</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm border border-amber-100">
            🕋
          </div>
          <div>
            <p className="font-bold text-slate-800">حلقة التجويد الميسر</p>
            <p className="text-xs text-slate-500">مع الشيخ أحمد محمود</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-white text-amber-700 border border-amber-200 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-100 transition-colors">
          عرض تفاصيل الحلقة
        </button>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-white p-5 rounded-2xl border border-slate-100 text-center hover:border-[#947f57] transition-all shadow-sm group"
        >
          <p className="text-2xl group-hover:scale-110 transition-transform mb-1">📖</p>
          <p className="text-xl font-bold text-[#947f57]">{MOCK_USER.completedJuz}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">جزء مكتمل</p>
        </button>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-white p-5 rounded-2xl border border-slate-100 text-center hover:border-[#947f57] transition-all shadow-sm group"
        >
          <p className="text-2xl group-hover:scale-110 transition-transform mb-1">🏆</p>
          <p className="text-xl font-bold text-[#947f57]">{MOCK_USER.badges.length}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">أوسمة محققة</p>
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
