
import React, { useState, useEffect } from 'react';
import { ProgramType, ExperienceLevel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Submission {
  id: string;
  studentName: string;
  studentAvatar: string;
  khatmahTitle: string;
  part: string;
  timestamp: string;
  videoUrl: string;
  status: 'PENDING' | 'REVIEWED';
}

const MOCK_SUBMISSIONS: Submission[] = [
  { 
    id: 'sub1', 
    studentName: 'ياسين أحمد', 
    studentAvatar: 'https://picsum.photos/seed/s1/100/100',
    khatmahTitle: 'ختمة رمضان الجماعية', 
    part: 'الجزء ١٥ (سبحان الذي)',
    timestamp: 'منذ ساعتين',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    status: 'PENDING'
  },
  { 
    id: 'sub2', 
    studentName: 'عمر فاروق', 
    studentAvatar: 'https://picsum.photos/seed/s2/100/100',
    khatmahTitle: 'ختمة الفجر الأسبوعية', 
    part: 'سورة الكهف كاملة',
    timestamp: 'منذ ٥ ساعات',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    status: 'PENDING'
  }
];

const VolunteerPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MANAGEMENT' | 'REPORTS'>('MANAGEMENT');
  const [showHalaqahModal, setShowHalaqahModal] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  
  // Evaluation Form State
  const [reviewData, setReviewData] = useState({
    rating: 'EXCELLENT',
    verdict: 'PASS',
    reachedSurah: '',
    notes: ''
  });

  const [myHalaqat] = useState([
    { id: 'h1', title: 'حلقة تصحيح التلاوة', type: 'تلاوة', level: 'متوسط', schedule: 'الأحد، الثلاثاء', time: '٨:٠٠ م', enrolled: 12, capacity: 15, attendance: '95%' },
  ]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    // Simulate saving review
    setSubmissions(prev => prev.map(s => 
      s.id === selectedSubmission.id ? { ...s, status: 'REVIEWED' } : s
    ));
    
    alert(`تم إرسال التقييم لـ ${selectedSubmission.studentName} بنجاح ✅`);
    setSelectedSubmission(null);
    setReviewData({ rating: 'EXCELLENT', verdict: 'PASS', reachedSurah: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl">👨‍🏫</div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 font-amiri">لوحة تحكم المعلم</h2>
            <p className="text-[10px] text-slate-400">إدارة الحلقات والتقييمات</p>
          </div>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('MANAGEMENT')}
            className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'MANAGEMENT' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
          >
            إدارة الحلقات
          </button>
          <button 
            onClick={() => setActiveTab('REPORTS')}
            className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-all ${activeTab === 'REPORTS' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
          >
            تقييم التلاوات
          </button>
        </div>
      </div>

      {activeTab === 'MANAGEMENT' ? (
        <div className="space-y-4">
           {/* Existing Management Logic... */}
           <button onClick={() => setShowHalaqahModal(true)} className="w-full bg-emerald-600 text-white p-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/10">
             + إنشاء حلقة جديدة
           </button>
           {myHalaqat.map(h => (
             <div key={h.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex justify-between items-center shadow-sm">
               <div>
                 <h4 className="font-bold text-sm text-slate-800">{h.title}</h4>
                 <p className="text-[10px] text-slate-400">{h.schedule} - {h.time}</p>
               </div>
               <span className="text-xs font-bold text-emerald-600">{h.attendance} حضور</span>
             </div>
           ))}
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {/* Submissions Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-slate-700 text-sm">التلاوات بانتظار التقييم</h3>
              <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {submissions.filter(s => s.status === 'PENDING').length} طلب معلق
              </span>
            </div>

            {submissions.filter(s => s.status === 'PENDING').length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center opacity-60">
                <span className="text-4xl block mb-2">✨</span>
                <p className="text-sm font-bold text-slate-500">تم تقييم جميع التلاوات بنجاح</p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.filter(s => s.status === 'PENDING').map(sub => (
                  <div 
                    key={sub.id} 
                    onClick={() => setSelectedSubmission(sub)}
                    className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all cursor-pointer group active:scale-[0.98]"
                  >
                    <img src={sub.studentAvatar} className="w-12 h-12 rounded-xl object-cover" alt="Student" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800 text-sm">{sub.studentName}</h4>
                      <p className="text-[10px] text-slate-400">{sub.khatmahTitle} • {sub.part}</p>
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-slate-400 block mb-1">{sub.timestamp}</span>
                      <button className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        مراجعة الآن
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Quick Statistics Mini Chart */}
          <section className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl">
             <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">إحصائيات المراجعة (أسبوعي)</h3>
             <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { day: 'س', v: 4 }, { day: 'ح', v: 12 }, { day: 'ن', v: 8 }, 
                    { day: 'ث', v: 15 }, { day: 'ر', v: 10 }, { day: 'خ', v: 6 }, { day: 'ج', v: 20 }
                  ]}>
                    <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                      {[4, 12, 8, 15, 10, 6, 20].map((v, i) => (
                        <Cell key={i} fill={i === 6 ? '#10b981' : '#334155'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </section>
        </div>
      )}

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[150] flex flex-col animate-in fade-in duration-300">
          {/* Header */}
          <div className="p-6 flex justify-between items-center text-white border-b border-white/10">
            <div>
              <h3 className="text-xl font-bold font-amiri leading-none">{selectedSubmission.studentName}</h3>
              <p className="text-[10px] text-slate-400 mt-1">{selectedSubmission.khatmahTitle} - {selectedSubmission.part}</p>
            </div>
            <button onClick={() => setSelectedSubmission(null)} className="bg-white/10 p-2 rounded-xl text-xl hover:bg-white/20 transition-colors">✕</button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative border border-white/10">
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[url('https://picsum.photos/seed/vid/800/450')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/40"></div>
                  <button className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl border border-white/30 hover:scale-110 transition-transform">▶️</button>
               </div>
               <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-emerald-500"></div>
               </div>
            </div>

            {/* Evaluation Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              {/* Verdict Toggle */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setReviewData({...reviewData, verdict: 'PASS'})}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border ${reviewData.verdict === 'PASS' ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-slate-400 border-white/10'}`}
                >
                  قبول التلاوة ✅
                </button>
                <button 
                  type="button"
                  onClick={() => setReviewData({...reviewData, verdict: 'RETRY'})}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all border ${reviewData.verdict === 'RETRY' ? 'bg-amber-600 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-400 border-white/10'}`}
                >
                  يحتاج إعادة 🔄
                </button>
              </div>

              {/* Progress Milestones */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-1">المرحلة التي وصل إليها الطالب</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    placeholder="مثال: سورة البقرة الآية ١٤٢ أو الجزء الأول"
                    value={reviewData.reachedSurah}
                    onChange={(e) => setReviewData({...reviewData, reachedSurah: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-sm focus:border-emerald-500 transition-all outline-none"
                  />
                  <span className="absolute left-4 top-4 opacity-30">🚩</span>
                </div>
              </div>

              {/* Rating Dropdown */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-1">التقييم العام</label>
                <select 
                  value={reviewData.rating}
                  onChange={(e) => setReviewData({...reviewData, rating: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-sm focus:border-emerald-500 outline-none appearance-none"
                >
                  <option value="EXCELLENT">ممتاز - أداء رائع ومتقن</option>
                  <option value="GOOD">جيد جداً - يحتاج انتباه بسيط</option>
                  <option value="AVERAGE">جيد - يحتاج تحسين مخارج الحروف</option>
                  <option value="REDO">ضعيف - يجب إعادة التسجيل</option>
                </select>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-1">ملاحظات المعلم وتوجيهاته</label>
                <textarea 
                  rows={4}
                  placeholder="اكتب توجيهاتك للطالب هنا (مثال: انتبه لأحكام الإخفاء عند حرف القاف...)"
                  value={reviewData.notes}
                  onChange={(e) => setReviewData({...reviewData, notes: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white text-sm focus:border-emerald-500 transition-all outline-none resize-none"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent flex gap-4">
                 <button 
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-2xl active:scale-95 transition-all text-lg"
                 >
                   اعتماد التقييم وإرساله 📤
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
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default VolunteerPortal;
