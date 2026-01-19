
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface KhatmahItem {
  id: string;
  title: string;
  type: string;
  progress: number;
  participants: number;
  myPart: string;
  daysLeft: number;
  status: 'NOT_STARTED' | 'SUBMITTED' | 'REVIEWED';
  description?: string;
}

const KhatmahScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExplorer, setShowExplorer] = useState(false);
  const [joiningId, setJoiningId] = useState<string | null>(null);
  
  // Simulated global state for my active khatmas
  const [myKhatmat, setMyKhatmat] = useState<KhatmahItem[]>([
    {
      id: 'k1',
      title: 'ختمة رمضان الجماعية',
      type: 'جماعية',
      progress: 65,
      participants: 120,
      myPart: 'الجزء ١٥-١٦',
      daysLeft: 12,
      status: 'NOT_STARTED'
    },
    {
      id: 'k2',
      title: 'ختمة الفجر الأسبوعية',
      type: 'فردية',
      progress: 20,
      participants: 1,
      myPart: 'سورة الكهف',
      daysLeft: 4,
      status: 'NOT_STARTED'
    },
  ]);

  // Mock data for community khatmas available to join
  const [availableKhatmat] = useState<KhatmahItem[]>([
    {
      id: 'k3',
      title: 'ختمة حفاظ الخرطوم',
      type: 'جماعية',
      progress: 10,
      participants: 450,
      myPart: 'سيتم التحديد بعد الانضمام',
      daysLeft: 30,
      status: 'NOT_STARTED',
      description: 'ختمة كبرى تهدف لجمع حفاظ العاصمة لختم المصحف في شهر واحد.'
    },
    {
      id: 'k4',
      title: 'ختمة تدارس سورة النور',
      type: 'موضوعية',
      progress: 5,
      participants: 85,
      myPart: 'الآيات ١-٢٠',
      daysLeft: 15,
      status: 'NOT_STARTED',
      description: 'ختمة مركزة مع وقفات تدبرية لأحكام سورة النور.'
    },
    {
      id: 'k5',
      title: 'ختمة يوم الجمعة السريعة',
      type: 'دورية',
      progress: 0,
      participants: 12,
      myPart: 'سورة يس',
      daysLeft: 2,
      status: 'NOT_STARTED',
      description: 'ختمة أسبوعية تقام كل يوم جمعة تبدأ فجراً وتنتهي مغرباً.'
    }
  ]);

  useEffect(() => {
    // Check if we just returned from a submission
    const searchParams = new URLSearchParams(location.search);
    const submittedId = searchParams.get('submitted');
    if (submittedId) {
      setMyKhatmat(prev => prev.map(k => 
        k.id === submittedId ? { ...k, status: 'SUBMITTED' } : k
      ));
      
      const timer = setTimeout(() => {
        setMyKhatmat(prev => prev.map(k => 
          k.id === submittedId ? { ...k, status: 'REVIEWED' } : k
        ));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleAction = (k: KhatmahItem) => {
    if (k.status === 'NOT_STARTED') {
      navigate(`/record/${k.id}`);
    } else {
      // Navigate to the status/feedback page for both SUBMITTED and REVIEWED
      navigate(`/khatmah-status/${k.id}`);
    }
  };

  const handleJoinKhatmah = (k: KhatmahItem) => {
    setJoiningId(k.id);
    
    // Simulate API delay
    setTimeout(() => {
      // Add to my list (adjusting part if needed)
      const newKhatmah: KhatmahItem = {
        ...k,
        myPart: k.myPart === 'سيتم التحديد بعد الانضمام' ? 'الجزء الأول' : k.myPart
      };
      
      setMyKhatmat(prev => [newKhatmah, ...prev]);
      setJoiningId(null);
      setShowExplorer(false);
      
      // Basic toast notification
      alert(`تم الانضمام بنجاح لـ "${k.title}"! ستجدها الآن في قائمة ختماتك.`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 font-amiri">الختمات النشطة</h2>
        <button className="bg-emerald-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg shadow-emerald-600/20 active:scale-95 transition-transform">+</button>
      </div>

      <div className="space-y-4">
        {myKhatmat.length === 0 && (
          <div className="text-center py-10 opacity-40">
            <span className="text-4xl">📭</span>
            <p className="mt-2 font-bold">ليس لديك ختمات نشطة حالياً</p>
          </div>
        )}
        
        {myKhatmat.map((k) => (
          <div key={k.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-800">{k.title}</h3>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{k.type}</span>
              </div>
              <p className="text-xs text-slate-400">باقي {k.daysLeft} أيام</p>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>تقدم المجموعة</span>
                <span>{k.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${k.progress}%` }}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl flex justify-between items-center mb-4 transition-colors ${
              k.status === 'NOT_STARTED' ? 'bg-slate-50' : 
              k.status === 'SUBMITTED' ? 'bg-amber-50 border border-amber-100' : 
              'bg-emerald-50 border border-emerald-100'
            }`}>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400">قسمك الحالي</span>
                <span className="text-sm font-bold text-emerald-800">{k.myPart}</span>
              </div>
              
              <button 
                onClick={() => handleAction(k)}
                className={`text-sm font-bold py-2 px-4 rounded-lg transition-all ${
                  k.status === 'NOT_STARTED' ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' : 
                  k.status === 'SUBMITTED' ? 'text-amber-700 bg-amber-100 cursor-wait shadow-sm' : 
                  'text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm'
                }`}
              >
                {k.status === 'NOT_STARTED' ? 'قراءة الآن 📖' : 
                 k.status === 'SUBMITTED' ? 'بانتظار المراجعة... ⏳' : 
                 'استعلام النتيجة والملاحظات ✅'}
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i+k.id}/30/30`} className="w-6 h-6 rounded-full border border-white" alt="user" />
                ))}
              </span>
              <span>+{k.participants - 3} مشارك</span>
            </div>
          </div>
        ))}
      </div>

      <section className="pt-4">
        <h3 className="font-bold text-slate-700 mb-3">ختمات مقترحة لك</h3>
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center hover:border-emerald-300 transition-colors cursor-pointer group" onClick={() => setShowExplorer(true)}>
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform">🔍</div>
          <p className="text-slate-500 font-bold mb-1">هل تريد البدء في ختمة جديدة؟</p>
          <button className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors">استكشف ختمات المجتمع الآن</button>
        </div>
      </section>

      {/* Community Explorer Modal */}
      {showExplorer && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-end justify-center p-0 sm:p-4">
          <div className="bg-slate-50 w-full max-w-md rounded-t-[2.5rem] animate-slide-up shadow-2xl flex flex-col h-[85vh]">
            {/* Modal Header */}
            <div className="p-6 bg-white rounded-t-[2.5rem] border-b border-slate-100 sticky top-0 z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 font-amiri">ختمات المجتمع</h3>
                <button onClick={() => setShowExplorer(false)} className="text-slate-400 text-2xl">✕</button>
              </div>
              <div className="relative">
                <input type="text" placeholder="ابحث عن ختمة محددة..." className="w-full bg-slate-100 p-3 rounded-xl text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" />
                <span className="absolute right-3 top-3.5 opacity-30">🔍</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {availableKhatmat.filter(ak => !myKhatmat.some(mk => mk.id === ak.id)).map(ak => (
                <div key={ak.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 transition-all hover:border-emerald-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-800">{ak.title}</h4>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{ak.type}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">{ak.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400">المشاركون</span>
                        <span className="text-xs font-bold text-slate-700">{ak.participants}</span>
                      </div>
                      <div className="w-[1px] h-4 bg-slate-100"></div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400">المدة</span>
                        <span className="text-xs font-bold text-slate-700">{ak.daysLeft} يوم</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleJoinKhatmah(ak)}
                      disabled={joiningId === ak.id}
                      className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                        joiningId === ak.id 
                          ? 'bg-slate-100 text-slate-400 cursor-wait' 
                          : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 active:scale-95'
                      }`}
                    >
                      {joiningId === ak.id ? 'جاري الانضمام...' : 'انضمام +'}
                    </button>
                  </div>
                </div>
              ))}
              
              {availableKhatmat.filter(ak => !myKhatmat.some(mk => mk.id === ak.id)).length === 0 && (
                <div className="text-center py-20 opacity-40">
                  <p className="font-bold">لقد انضممت لجميع الختمات المتاحة حالياً! 🌟</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default KhatmahScreen;
