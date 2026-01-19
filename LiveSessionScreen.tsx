
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const LiveSessionScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if current user is host via query param
  const queryParams = new URLSearchParams(location.search);
  const isHost = queryParams.get('host') === 'true';

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [participants, setParticipants] = useState([
    { id: '1', name: 'ياسين أحمد', isMuted: false, isVideoOff: false },
    { id: '2', name: 'عمر فاروق', isMuted: true, isVideoOff: false },
    { id: '3', name: 'حمزة كمال', isMuted: false, isVideoOff: true },
    { id: '4', name: 'سارة علي', isMuted: false, isVideoOff: false },
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate connection delay
    const timer = setTimeout(() => setIsConnecting(false), 1500);
    
    // Attempt to start local video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Could not access camera/mic:", err));
    }

    return () => {
      clearTimeout(timer);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleEndSession = () => {
    // Specifically for the teacher/host to end the entire session
    const confirmEnd = window.confirm("هل أنت متأكد من رغبتك في إنهاء الجلسة التعليمية؟ سيتم إغلاق البث لدى جميع الطلاب.");
    if (confirmEnd) {
      // Perform any "cleanup" here if needed
      console.log("Session ending for all participants...");
      // Forced navigation to home page
      navigate('/', { replace: true });
    }
  };

  const handleLeaveSession = () => {
    // For students to leave a session
    if (window.confirm("هل تريد مغادرة الجلسة؟")) {
      navigate(-1);
    }
  };

  const toggleParticipantMute = (pid: string) => {
    if (!isHost) return;
    setParticipants(prev => prev.map(p => 
      p.id === pid ? { ...p, isMuted: !p.isMuted } : p
    ));
  };

  const handleMuteAll = () => {
    if (!isHost) return;
    setParticipants(prev => prev.map(p => ({ ...p, isMuted: true })));
    alert("تم كتم صوت جميع الطلاب بنجاح.");
  };

  const toggleScreenShare = () => {
    setIsSharing(!isSharing);
    if (!isSharing) {
      alert("جاري مشاركة شاشتك مع الطلاب الآن...");
    }
  };

  if (isConnecting) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-[200] flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold font-amiri">
          {isHost ? 'جاري بدء الحلقة المباشرة كمعلم...' : 'جاري الاتصال بالحلقة...'}
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          {isHost ? 'نجهز لك أدوات الإدارة والتحكم' : 'يرجى الانتظار، نجهز لك مقعدك في الحلقة'}
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col overflow-hidden text-white font-sans" dir="rtl">
      {/* Header Info */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 animate-pulse shadow-lg">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            {isHost ? 'بث مباشر' : 'مباشر'}
          </div>
          <div className="text-right">
            <h3 className="font-bold text-sm font-amiri leading-tight">حلقة تصحيح التلاوة</h3>
            <p className="text-[10px] text-white/70">
              {isHost ? 'أنت المضيف (المعلم)' : 'المعلم: الشيخ أحمد محمود'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowParticipants(!showParticipants)}
          className="bg-white/10 p-2 px-4 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2 hover:bg-white/20 transition-colors"
        >
          <span className="text-xs font-bold">المشاركون</span>
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
            {participants.length}
          </span>
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 relative bg-slate-800 flex items-center justify-center overflow-hidden">
        {/* Screen Share Overlay (Mock) */}
        {isSharing ? (
          <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center z-20 animate-in fade-in zoom-in duration-500 p-8 text-center">
             <div className="w-48 h-32 bg-emerald-500/20 rounded-3xl border-2 border-emerald-500 border-dashed flex items-center justify-center text-5xl mb-6 shadow-2xl shadow-emerald-500/10">
                🖥️
             </div>
             <h4 className="text-2xl font-bold font-amiri text-emerald-400">أنت تشارك شاشتك الآن</h4>
             <p className="text-slate-400 text-sm mt-3 max-w-xs">يرى جميع الطلاب محتوى شاشتك في هذه اللحظة.</p>
             <button 
                onClick={toggleScreenShare}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-red-600/20 active:scale-95 transition-all"
             >
               إيقاف مشاركة الشاشة
             </button>
          </div>
        ) : (
          <>
            {/* Background for Student View or Host View */}
            {!isHost && (
               <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/teacher/800/1200')] bg-cover bg-center opacity-40 blur-[2px]"></div>
            )}
            
            <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-700">
                <div className={`w-36 h-36 ${isHost ? 'bg-blue-700/30 border-blue-500/20 shadow-blue-500/10' : 'bg-emerald-700/30 border-emerald-500/20 shadow-emerald-500/10'} rounded-[3rem] flex items-center justify-center text-5xl border backdrop-blur-sm mb-6 shadow-2xl animate-pulse`}>
                    {isHost ? '👨‍🏫' : '👳‍♂️'}
                </div>
                <h4 className="text-2xl font-bold font-amiri">
                  {isHost ? 'المعلم (أنت)' : 'الشيخ أحمد محمود'}
                </h4>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                  <p className="text-xs text-white/50 font-medium">
                    {isHost ? 'الطلاب يستمعون إلى توجيهاتك' : 'المعلم يشرح الآن أحكام التجويد'}
                  </p>
                </div>
            </div>
          </>
        )}

        {/* Local Video PIP */}
        {!isSharing && (
          <div className="absolute bottom-32 left-6 w-36 h-48 bg-slate-900 rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden z-30 group transition-transform hover:scale-105 duration-300">
            {!isVideoOff ? (
              <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover mirror"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800 text-3xl">
                👤
              </div>
            )}
            <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-0.5 rounded-lg text-[10px] backdrop-blur-md border border-white/10 font-bold">
              أنت
            </div>
          </div>
        )}
      </div>

      {/* Participant List Overlay */}
      {showParticipants && (
        <div className="absolute inset-0 bg-slate-900/95 z-[60] p-6 pt-24 animate-fade-in flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold font-amiri">المشاركون في الحلقة ({participants.length})</h4>
                <button onClick={() => setShowParticipants(false)} className="text-slate-400 p-2 text-2xl">✕</button>
            </div>
            
            {isHost && (
              <div className="mb-6">
                <button 
                  onClick={handleMuteAll}
                  className="w-full bg-red-600/10 text-red-500 py-3 rounded-2xl text-sm font-bold border border-red-600/20 active:scale-95 transition-all"
                >
                  كتم صوت جميع الطلاب 🔇
                </button>
              </div>
            )}

            <div className="space-y-4 flex-1 overflow-y-auto pb-10">
                {participants.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center text-sm font-bold border border-white/10 text-emerald-400 shadow-inner">
                              {p.name[0]}
                            </div>
                            <div>
                              <span className="text-sm font-bold block">{p.name}</span>
                              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">طالب</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button 
                              onClick={() => toggleParticipantMute(p.id)}
                              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${p.isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-white/5 text-slate-400'}`}
                            >
                              {p.isMuted ? '🔇' : '🎤'}
                            </button>
                            <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${p.isVideoOff ? 'bg-red-500/20 text-red-500 border border-red-500/20' : 'bg-white/5 text-slate-400'}`}>
                              {p.isVideoOff ? '🚫' : '📷'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="p-8 pb-12 flex justify-center items-center gap-4 sm:gap-8 bg-gradient-to-t from-black via-black/80 to-transparent z-40">
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl transition-all shadow-xl cursor-pointer ${isMuted ? 'bg-red-600 shadow-red-600/20' : 'bg-white/10 border border-white/20 hover:bg-white/20'}`}
            title="كتم الصوت"
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        
        <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl transition-all shadow-xl cursor-pointer ${isVideoOff ? 'bg-red-600 shadow-red-600/20' : 'bg-white/10 border border-white/20 hover:bg-white/20'}`}
            title="إيقاف الكاميرا"
        >
          {isVideoOff ? '🚫' : '📷'}
        </button>

        {isHost && (
          <button 
              onClick={toggleScreenShare}
              className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl transition-all shadow-xl cursor-pointer ${isSharing ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-white/10 border border-white/20 hover:bg-white/20'}`}
              title="مشاركة الشاشة"
          >
            {isSharing ? '📺' : '📤'}
          </button>
        )}
        
        <button 
            onClick={isHost ? handleEndSession : handleLeaveSession}
            className={`cursor-pointer ${isHost ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-700 hover:bg-slate-800'} w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center shadow-2xl shadow-red-600/30 active:scale-95 transition-all border border-white/10 group`}
            title={isHost ? "إنهاء الجلسة للكل" : "مغادرة الجلسة"}
        >
          <span className="text-3xl group-active:scale-110 transition-transform">📞</span>
          <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter text-white">
            {isHost ? 'إنهاء الكل' : 'مغادرة'}
          </span>
        </button>

        <button className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-[1.2rem] flex items-center justify-center text-2xl border border-white/10 transition-colors shadow-lg cursor-pointer">
          💬
        </button>
      </div>

      <style>{`
        .mirror {
          transform: scaleX(-1);
        }
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default LiveSessionScreen;
