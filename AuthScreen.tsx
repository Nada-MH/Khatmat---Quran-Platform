
import React, { useState } from 'react';
import { User, UserRole, ExperienceLevel } from '../types';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication logic
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === UserRole.VOLUNTEER ? 'الشيخ أحمد' : 'عبدالرحمن محمد'),
      role: role,
      level: role === UserRole.VOLUNTEER ? ExperienceLevel.ADVANCED : ExperienceLevel.BEGINNER,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || email || 'default'}`,
      streak: isLogin ? 12 : 0,
      completedJuz: isLogin ? 5 : 0,
      badges: isLogin ? ['streak-7'] : []
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-right font-sans" dir="rtl">
      <div className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(6,95,70,0.1)] border border-emerald-50">
        
        {/* Brand/Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-emerald-200 rotate-3 transition-transform hover:rotate-0">
            <span className="text-white drop-shadow-md">📖</span>
          </div>
          <h1 className="text-3xl font-bold text-emerald-900 font-amiri tracking-tight">ختمات</h1>
          <p className="text-slate-400 text-sm mt-1">منصة حلقات القرآن الكريم</p>
        </div>

        {/* Role Toggle Switch */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex mb-8 relative">
          <div 
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${role === UserRole.VOLUNTEER ? 'translate-x-[calc(-100%-0.375rem)]' : 'translate-x-0'}`}
          ></div>
          <button 
            type="button"
            onClick={() => setRole(UserRole.USER)}
            className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-200 ${role === UserRole.USER ? 'text-emerald-700' : 'text-slate-500'}`}
          >
            طالب
          </button>
          <button 
            type="button"
            onClick={() => setRole(UserRole.VOLUNTEER)}
            className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-200 ${role === UserRole.VOLUNTEER ? 'text-emerald-700' : 'text-slate-500'}`}
          >
            معلم متطوع
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="group">
              <label className="block text-xs font-bold text-slate-500 mb-2 mr-1 transition-colors group-focus-within:text-emerald-600">الاسم الكامل</label>
              <div className="relative">
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300" 
                  placeholder="أدخل اسمك الكريم"
                />
                <span className="absolute left-4 top-4 opacity-30">👤</span>
              </div>
            </div>
          )}
          
          <div className="group">
            <label className="block text-xs font-bold text-slate-500 mb-2 mr-1 transition-colors group-focus-within:text-emerald-600">البريد الإلكتروني</label>
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300" 
                placeholder="example@mail.com" 
              />
              <span className="absolute left-4 top-4 opacity-30">📧</span>
            </div>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-500 mb-2 mr-1 transition-colors group-focus-within:text-emerald-600">كلمة المرور</label>
            <div className="relative">
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-300" 
                placeholder="••••••••" 
              />
              <span className="absolute left-4 top-4 opacity-30">🔒</span>
            </div>
          </div>

          <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all mt-4 text-lg">
            {isLogin ? 'دخول' : 'بدء الرحلة'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 mb-3">
            {role === UserRole.VOLUNTEER 
              ? 'أهلاً بك يا ناشر الخير، جزاك الله خيراً' 
              : 'أهلاً بك يا طالب العلم، أنرت الطريق'}
          </p>
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-emerald-700 font-bold underline underline-offset-4 decoration-emerald-200 hover:decoration-emerald-500 transition-all"
          >
            {isLogin ? 'ليس لديك حساب؟ انضم إلينا' : 'لديك حساب؟ سجل دخولك'}
          </button>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 z-[-1]"></div>
      <div className="fixed -bottom-24 -left-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 z-[-1]"></div>
    </div>
  );
};

export default AuthScreen;
