
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const KhatmahRecordingScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
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
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    intervalRef.current = window.setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Simulate upload delay
    setTimeout(() => {
      navigate(`/khatmah?submitted=${id}`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-[200] flex flex-col text-white">
      {/* Header */}
      <div className="p-6 bg-slate-800/80 backdrop-blur-md flex justify-between items-center border-b border-white/10">
        <button onClick={() => navigate(-1)} className="text-white text-xl">✕</button>
        <div className="text-center">
          <h3 className="font-bold font-amiri text-lg">تسجيل التلاوة</h3>
          <p className="text-[10px] text-slate-400">الجزء ١٥-١٦</p>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Camera Preview */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Overlay */}
        <div className="absolute inset-0 pointer-events-none border-[24px] border-slate-900/40"></div>
        
        {/* Timer UI */}
        {isRecording && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1.5 rounded-full font-bold flex items-center gap-2 animate-pulse shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            REC {formatTime(timer)}
          </div>
        )}

        {/* Text Overlay for reading */}
        {!isRecording && !timer && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-10 text-center pointer-events-none">
            <span className="text-4xl mb-4">📖</span>
            <h4 className="text-xl font-bold font-amiri mb-2">استعد للقراءة</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تأكد من وضوح صوتك وإضاءة المكان قبل البدء. اضغط على الزر الأحمر لبدء التسجيل.
            </p>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="p-10 bg-slate-800 flex flex-col items-center gap-6">
        {isSubmitted ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-emerald-400">جاري رفع التلاوة للنظام...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8">
              {!timer ? (
                <button 
                  onClick={startRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all"
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full border-4 border-white"></div>
                </button>
              ) : isRecording ? (
                <button 
                  onClick={stopRecording}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all"
                >
                  <div className="w-10 h-10 bg-red-600 rounded-lg"></div>
                </button>
              ) : (
                <div className="flex gap-4">
                  <button 
                    onClick={() => { setTimer(0); setIsRecording(false); }}
                    className="bg-slate-700 px-6 py-3 rounded-2xl text-sm font-bold border border-white/10"
                  >
                    إعادة المحاولة 🔄
                  </button>
                  <button 
                    onClick={handleSubmit}
                    className="bg-emerald-600 px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    إرسال التلاوة ✅
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-slate-500 max-w-xs text-center">
              بمجرد الإرسال، سيتم تحويل ملفك الصوتي للمعلم المختص لتقييم التجويد والأداء.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default KhatmahRecordingScreen;
