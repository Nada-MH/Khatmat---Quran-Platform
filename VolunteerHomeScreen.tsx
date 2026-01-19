
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface VolunteerHomeScreenProps {
  user: User;
}

const VolunteerHomeScreen: React.FC<VolunteerHomeScreenProps> = ({ user }) => {
  const navigate = useNavigate();
  const [showReschedule, setShowReschedule] = useState(false);
  const [nextSession, setNextSession] = useState({
    id: 'h1',
    title: 'حلقة التجويد المكثفة',
    time: '16:30',
    date: '2024-05-19',
    type: 'تجويد',
    students: 15
  });

  // Helper to map numeric date to ISO-like format for the state
  const getFullDate = (dayNum: string) => `2024-05-${dayNum}`;

  const weekDays = [
    { day: 'السبت', date: '١٨', raw: '18', active: false },
    { day: 'الأحد', date: '١٩', raw: '19', active: true, sessions: 2 },
    { day: 'الاثنين', date: '٢٠', raw: '20', active: false },
    { day: 'الثلاثاء', date: '٢١', raw: '21', active: true, sessions: 1 },
    { day: 'الأربعاء', date: '٢٢', raw: '22', active: false },
    { day: 'الخميس', date: '٢٣', raw: '23', active: false },
    { day: 'الجمعة', date: '٢٤', raw: '24', active: false },
  ];

  const notifications = [
    { id: 1, type: 'enrollment', text: 'سارة علي انضمت إلى حلقة تصحيح التلاوة', time: 'منذ ١٠ دقائق', icon: '✨' },
    { id: 2, type: 'message', text: 'لديك رسالة جديدة من الطالب محمد أحمد', time: 'منذ ساعة', icon: '💬' },
    { id: 3, type: 'alert', text: 'تذكير: موعد جلسة "حفظ جزء عم" يقترب', time: 'منذ ساعتين', icon: '⏰' },
  ];

  const groupKhatmats = [
    { id: 'k1', name: 'ختمة طلاب المستوى الأول', progress: 75, status: 'نشط' },
    { id: 'k2', name: 'ختمة حفظة جزء تبارك', progress: 40, status: 'نشط' },
  ];

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'م' : 'ص';
    const displayH = h % 12 || 12;
    return `${displayH}:${minutes} ${ampm}`;
  };

  const handleDayClick = (rawDay: string) => {
    const newDate = getFullDate(rawDay);
    setNextSession(prev => ({ ...prev, date: newDate }));
    setShowReschedule(true);
  };

  const handleRescheduleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTime = formData.get('time') as string;
    const newDate = formData.get('date') as string;
    
    setNextSession(prev => ({
      ...prev,
      time: newTime,
      date: newDate,
    }));
    setShowReschedule(false);
  };

  const handleStartSession = () => {
    // Navigate to live session as host
    navigate(`/session/${nextSession.id}?host=true`);
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Teacher Profile Summary */}
      <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={user.avatar} className="w-16 h-16 rounded-2xl object-cover" alt="Teacher" />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border-2 border-white text-[8px]">✓</div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-amiri leading-tight">أهلاً بك، {user.name}</h2>
            <p className="text-xs text-slate-400">لديك ٢ جلسة تعليمية مجدولة</p>
          </div>
        </div>
      </section>

      {/* Notifications / Alerts Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700 text-sm">تنبيهات أخيرة</h3>
          <button className="text-[10px] text-emerald-600 font-bold hover:underline">عرض الكل</button>
        </div>
        <div className="space-y-3">
          {notifications.map(notif => (
            <div key={notif.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-start gap-4 shadow-sm hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {notif.icon}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{notif.text}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar View - Interactive */}
      <section className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-700 text-sm">جدولك الأسبوعي</h3>
          <span className="text-[10px] text-emerald-600 font-bold">مايو ٢٠٢٤</span>
        </div>
        <div className="flex justify-between gap-1">
          {weekDays.map((d, i) => {
            const isSelected = nextSession.date === getFullDate(d.raw);
            return (
              <button 
                key={i} 
                onClick={() => handleDayClick(d.raw)}
                className={`flex-1 flex flex-col items-center py-3 rounded-2xl transition-all outline-none active:scale-90 ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : d.active 
                      ? 'bg-emerald-50 border border-emerald-100 text-emerald-900' 
                      : 'bg-slate-50 border border-transparent text-slate-400'
                }`}
              >
                <span className={`text-[9px] mb-1 ${isSelected ? 'text-emerald-100' : d.active ? 'text-emerald-700 font-bold' : ''}`}>{d.day}</span>
                <span className="text-sm font-bold">{d.date}</span>
                {d.active && !isSelected && <div className="mt-1 w-1 h-1 bg-emerald-600 rounded-full"></div>}
                {isSelected && <div className="mt-1 w-1 h-1 bg-white rounded-full"></div>}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-400 mt-4 text-center">اضغط على أي يوم لجدولة الجلسة القادمة فيه</p>
      </section>

      {/* Next Session - Highlight */}
      <section className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">الجلسة القادمة</p>
            <h3 className="text-xl font-bold font-amiri">{nextSession.title}</h3>
          </div>
          <button 
            onClick={() => setShowReschedule(true)}
            className="bg-white/10 hover:bg-white/20 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold border border-white/10 transition-colors"
          >
            إعادة جدولة 📅
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">الوقت</span>
              <span className="text-sm font-bold">{formatTime(nextSession.time)}</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400">التاريخ</span>
              <span className="text-sm font-bold">{nextSession.date}</span>
            </div>
          </div>
          <button 
            onClick={handleStartSession}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            بدء الجلسة ⚡
          </button>
        </div>
      </section>

      {/* Khatmah Completion Tracking */}
      <section className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-700 text-sm mb-5">إنجاز الختمات الجماعية</h3>
        <div className="space-y-6">
          {groupKhatmats.map(k => (
            <div key={k.id}>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{k.name}</h4>
                  <p className="text-[10px] text-slate-400">الحالة: {k.status}</p>
                </div>
                <span className="text-sm font-bold text-emerald-600">{k.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-l from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${k.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reschedule Modal */}
      {showReschedule && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end justify-center">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] p-8 animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-amiri">تحديد موعد الجلسة</h3>
              <button onClick={() => setShowReschedule(false)} className="text-slate-400 text-2xl">✕</button>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 mr-1 uppercase">التاريخ</label>
                <input 
                  type="date" 
                  name="date"
                  required
                  defaultValue={nextSession.date}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 mr-1 uppercase">الوقت</label>
                <input 
                  type="time" 
                  name="time"
                  required
                  defaultValue={nextSession.time}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl">
                  تأكيد وحفظ الموعد
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowReschedule(false)}
                  className="w-full text-slate-400 py-4 text-sm font-medium"
                >
                  إلغاء التعديل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VolunteerHomeScreen;
