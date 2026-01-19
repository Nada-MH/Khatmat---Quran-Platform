
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Evaluation {
  id: string;
  studentName: string;
  teacherName: string;
  khatmahTitle: string;
  part: string;
  status: 'PENDING' | 'REVIEWED';
  rating?: 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'REDO';
  notes?: string;
  verdict?: 'PASS' | 'RETRY';
  reachedSurah?: string;
  timestamp: string;
}

const KhatmahReviewStatusScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    // Simulate API fetch based on ID
    const timer = setTimeout(() => {
      // Logic: if ID contains 'k1' it's usually the one we use for mock
      // This is a mock. In real app, fetch by id.
      const mockEval: Evaluation = {
        id: id || '1',
        studentName: 'عبدالرحمن محمد',
        teacherName: 'الشيخ أحمد محمود',
        khatmahTitle: 'ختمة رمضان الجماعية',
        part: 'الجزء ١٥-١٦',
        status: id === 'k1' || id === 'sub1' ? 'REVIEWED' : 'PENDING',
        rating: 'EXCELLENT',
        notes: 'قراءة متميزة يا عبدالرحمن. انتبه فقط لمد المنفصل في سورة الإسراء. أداء يثلج الصدر، استمر!',
        verdict: 'PASS',
        reachedSurah: 'نهاية الجزء السادس عشر',
        timestamp: 'منذ ٣ ساعات'
      };
      setEvaluation(mockEval);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse">جاري تحميل النتائج...</p>
      </div>
    );
  }

  if (!evaluation) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm text-slate-400">🔙</button>
        <div>
          <h2 className="text-xl font-bold text-slate-800 font-amiri leading-none">نتائج التقييم</h2>
          <p className="text-[10px] text-slate-400 mt-1">{evaluation.khatmahTitle}</p>
        </div>
      </div>

      {evaluation.status === 'PENDING' ? (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center space-y-6">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner animate-bounce">
            ⏳
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 font-amiri">تلاوتك قيد المراجعة</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              لقد استلمنا تسجيلك بنجاح. سيقوم الشيخ {evaluation.teacherName} بمراجعة تلاوتك وتقديم الملاحظات قريباً.
            </p>
          </div>
          <div className="bg-amber-100/50 p-4 rounded-2xl text-amber-700 text-xs font-bold border border-amber-200">
            🔔 ستصلك رسالة فور انتهاء المراجعة
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all">
            العودة للرئيسية
          </button>
        </div>
      ) : (
        <>
          {/* Result Card */}
          <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-800 rounded-3xl flex items-center justify-center text-4xl mb-4 border border-emerald-700 shadow-2xl">
                {evaluation.rating === 'EXCELLENT' ? '🏆' : '✨'}
              </div>
              <h3 className="text-2xl font-bold font-amiri mb-1">نتيجة التقييم: {
                evaluation.rating === 'EXCELLENT' ? 'ممتاز جداً' : 
                evaluation.rating === 'GOOD' ? 'جيد جداً' : 
                evaluation.rating === 'AVERAGE' ? 'جيد' : 'يحتاج إعادة'
              }</h3>
              <p className="text-emerald-300 text-xs mb-6 font-medium">تم المراجعة بواسطة {evaluation.teacherName}</p>
              
              <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-xs font-bold">
                 الحالة: {evaluation.verdict === 'PASS' ? 'تم القبول بنجاح ✅' : 'يرجى الإعادة 🔄'}
              </div>
            </div>
            
            {/* Background Decorative */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-400 rounded-full blur-3xl opacity-20 -ml-10 -mb-10"></div>
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">تفاصيل الملاحظات</h4>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl shadow-inner flex-shrink-0">
                  🚩
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold">المستوى الذي وصلت إليه</p>
                  <p className="text-sm font-bold text-slate-800">{evaluation.reachedSurah}</p>
                </div>
              </div>

              <div className="h-px bg-slate-50"></div>

              <div className="space-y-3">
                 <div className="flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">توجيهات المعلم</p>
                 </div>
                 <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <p className="text-sm leading-relaxed text-slate-700 font-amiri italic">
                      "{evaluation.notes}"
                    </p>
                 </div>
              </div>

              {evaluation.verdict === 'RETRY' && (
                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-3">
                  <span className="text-xl">🔄</span>
                  <p className="text-[10px] text-red-700 font-bold leading-normal">
                    طلب المعلم منك إعادة تسجيل هذا الورد لتصحيح الأخطاء المذكورة أعلاه.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 gap-3">
             {evaluation.verdict === 'PASS' ? (
               <button 
                onClick={() => navigate('/khatmah')}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
               >
                 الانتقال للورد التالي 📖
               </button>
             ) : (
               <button 
                onClick={() => navigate(`/record/${evaluation.id}`)}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-600/20 active:scale-95 transition-all"
               >
                 إعادة التسجيل الآن 🎤
               </button>
             )}
             <button 
              onClick={() => navigate('/chat')}
              className="w-full bg-white border border-slate-100 py-4 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all text-sm"
             >
               مراسلة المعلم للاستفسار 💬
             </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KhatmahReviewStatusScreen;
