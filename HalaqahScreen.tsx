
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramType, ExperienceLevel, User, UserRole } from '../types';

interface HalaqahScreenProps {
  user: User;
}

const DAYS_OF_WEEK = [
  { id: 'sat', label: 'السبت' },
  { id: 'sun', label: 'الأحد' },
  { id: 'mon', label: 'الاثنين' },
  { id: 'tue', label: 'الثلاثاء' },
  { id: 'wed', label: 'الأربعاء' },
  { id: 'thu', label: 'الخميس' },
  { id: 'fri', label: 'الجمعة' },
];

const HalaqahScreen: React.FC<HalaqahScreenProps> = ({ user }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<ProgramType | 'ALL'>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const halaqat = [
    {
      id: 'h1',
      title: 'تحفيظ صغار - المستوى الأول',
      teacher: 'أ. فاطمة الزهراء',
      type: ProgramType.MEMORIZATION,
      level: ExperienceLevel.BEGINNER,
      time: 'الأحد والثلاثاء - ٤ عصرًا',
      capacity: '١٥/٢٠',
      tags: ['صغار', 'تلقين']
    },
    {
      id: 'h2',
      title: 'تدبر سورة البقرة',
      teacher: 'د. يوسف عبدالله',
      type: ProgramType.TAFSIR,
      level: ExperienceLevel.ADVANCED,
      time: 'السبت - ٨ مساءً',
      capacity: '٤٥/٥٠',
      tags: ['تدبر', 'تفسير']
    },
    {
      id: 'h3',
      title: 'تصحيح التلاوة للكبار',
      teacher: 'الشيخ محمد عمر',
      type: ProgramType.MEMORIZATION,
      level: ExperienceLevel.INTERMEDIATE,
      time: 'يوميًا بعد العشاء',
      capacity: '٨/١٠',
      tags: ['تجويد', 'كبار']
    }
  ];

  const filteredHalaqat = filter === 'ALL' ? halaqat : halaqat.filter(h => h.type === filter);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
    );
  };

  const handleJoinSession = (id: string) => {
    navigate(`/session/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 font-amiri">حلقات الذكر</h2>
          {user.role === UserRole.VOLUNTEER && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>+</span> إنشاء حلقة
            </button>
          )}
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter(ProgramType.MEMORIZATION)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === ProgramType.MEMORIZATION ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            تحفيظ
          </button>
          <button 
            onClick={() => setFilter(ProgramType.TAFSIR)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === ProgramType.TAFSIR ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            تفسير
          </button>
        </div>
      </div>

      {/* Smart Match Banner - Only for Students */}
      {user.role !== UserRole.VOLUNTEER && (
        <div className="bg-gradient-to-l from-emerald-600 to-teal-500 p-4 rounded-2xl text-white shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold flex items-center gap-2">
              <span>✨</span> نظام التوفيق الذكي
            </h4>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">نشط</span>
          </div>
          <p className="text-xs text-white/90 leading-relaxed mb-3">
            بناءً على مستواك (متوسط) ووقتك المفضل (المساء)، نقترح عليك الانضمام إلى "تدبر سورة البقرة".
          </p>
          <button className="bg-white text-emerald-700 w-full py-2 rounded-lg font-bold text-sm shadow-sm">عرض الاقتراح</button>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {filteredHalaqat.map(h => (
          <div key={h.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-800 mb-1">{h.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded ${h.level === ExperienceLevel.BEGINNER ? 'bg-blue-100 text-blue-700' : h.level === ExperienceLevel.INTERMEDIATE ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                  {h.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-3">{h.teacher}</p>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                  🕒 {h.time}
                </span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded flex items-center gap-1">
                  👥 {h.capacity}
                </span>
              </div>

              <div className="flex gap-2">
                {h.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded">#{tag}</span>
                ))}
              </div>
            </div>
            {/* Join button for students */}
            {user.role !== UserRole.VOLUNTEER && (
              <div className="flex flex-col justify-end">
                <button 
                  onClick={() => handleJoinSession(h.id)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm active:scale-95 transition-transform"
                >
                  انضمام
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Halaqah Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] p-8 animate-slide-up shadow-2xl border-t border-slate-100 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-2xl font-bold text-slate-900 font-amiri">إعداد حلقة جديدة</h3>
               <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-900 text-2xl transition-colors">✕</button>
            </div>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setShowCreateModal(false); alert('تم نشر الحلقة بنجاح!'); }}>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">اسم الحلقة</label>
                <input required type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all" placeholder="مثال: تحفيظ سورة البقرة للكبار" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">نوع المسار</label>
                  <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500/10">
                    <option value={ProgramType.MEMORIZATION}>حفظ القرآن</option>
                    <option value={ProgramType.TAFSIR}>تفسير وتدبر</option>
                    <option>تصحيح تلاوة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">المستوى التعليمي</label>
                  <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm appearance-none focus:ring-2 focus:ring-emerald-500/10">
                    <option value={ExperienceLevel.BEGINNER}>مبتدئ</option>
                    <option value={ExperienceLevel.INTERMEDIATE}>متوسط</option>
                    <option value={ExperienceLevel.ADVANCED}>متقدم</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">أيام الحلقة</label>
                <div className="flex gap-2 flex-wrap">
                  {DAYS_OF_WEEK.map(day => (
                    <button 
                      key={day.id} 
                      type="button" 
                      onClick={() => toggleDay(day.id)}
                      className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold transition-all ${selectedDays.includes(day.id) ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-200 text-slate-500 hover:border-emerald-500'}`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">وقت البدء</label>
                  <input required type="time" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">المدة (دق)</label>
                  <input required type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs" placeholder="60" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-2 mr-1 uppercase tracking-wider">السعة</label>
                  <input required type="number" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs" placeholder="15" />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-bold shadow-xl shadow-emerald-600/10 mt-6 active:scale-95 transition-all text-lg"
              >
                اعتماد ونشر الحلقة
              </button>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HalaqahScreen;
