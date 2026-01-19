
import React from 'react';
import { BADGES } from '../constants';
import { User, UserRole } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProfileScreenProps {
  user: User;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onLogout }) => {
  // Mock data for the profile charts
  const activityData = [
    { day: 'السبت', pages: 5 },
    { day: 'الأحد', pages: 12 },
    { day: 'الاثنين', pages: 8 },
    { day: 'الثلاثاء', pages: 15 },
    { day: 'الأربعاء', pages: 7 },
    { day: 'الخميس', pages: 10 },
    { day: 'الجمعة', pages: 22 },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Header */}
      <div className="text-center">
        <div className="relative inline-block">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto" />
          {user.role === UserRole.VOLUNTEER && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow-sm" title="Verified Teacher">
              ✓
            </div>
          )}
          <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white cursor-pointer hover:bg-emerald-600 transition-colors">
            ✏️
          </div>
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-800 font-amiri">{user.name}</h2>
        <p className="text-sm text-slate-500">
           {user.role === UserRole.VOLUNTEER ? 'معلم متطوع معتمد' : `طالب بمستوى ${user.level === 'BEGINNER' ? 'مبتدئ' : user.level === 'INTERMEDIATE' ? 'متوسط' : 'متقدم'}`}
        </p>
      </div>

      {/* Statistics Section - NEW */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-bold text-slate-700 text-sm">إحصائياتي</h3>
          <span className="text-[10px] text-emerald-600 font-bold">آخر ٧ أيام</span>
        </div>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔥</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">الحماس</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{user.streak} يوم</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">📖</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">الحفظ</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{user.completedJuz} جزء</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">📄</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">الصفحات</span>
            </div>
            <p className="text-xl font-bold text-slate-800">٢٤٥</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">⏳</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ساعات</span>
            </div>
            <p className="text-xl font-bold text-slate-800">٤٢.٥</p>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-emerald-900 p-5 rounded-[2rem] text-white shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <h4 className="text-xs font-bold text-emerald-300 mb-4">نشاط القراءة الأسبوعي</h4>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', background: '#064e3b', color: '#fff', fontSize: '10px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ stroke: '#059669', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pages" 
                    stroke="#34d399" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPages)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-2 px-1">
              {activityData.map((d, i) => (
                <span key={i} className="text-[8px] text-emerald-400/60 font-medium">{d.day[0]}</span>
              ))}
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-800 rounded-full blur-2xl opacity-50"></div>
        </div>
      </section>

      {/* Badges Section */}
      <section className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            الأوسمة <span className="text-xs font-normal text-slate-400">( {user.badges.length} / {BADGES.length} )</span>
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {BADGES.map(badge => {
            const isEarned = user.badges.includes(badge.id);
            return (
              <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-1 transition-opacity ${isEarned ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shadow-inner">
                  {badge.icon}
                </div>
                <span className="text-[10px] text-slate-600 font-medium text-center">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Settings List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {[
          { icon: '🌍', label: 'اللغة والمنطقة', value: 'العربية' },
          { icon: '🌙', label: 'الوضع الليلي', value: 'تلقائي' },
          { icon: '🔔', label: 'التنبيهات', value: 'نشطة' },
          { icon: '🔒', label: 'الخصوصية والأمان', value: '' },
          { icon: '📄', label: 'تصدير بياناتي', value: '' },
        ].map((item, i) => (
          <button key={i} className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${i !== 4 ? 'border-b border-slate-50' : ''}`}>
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-slate-700 font-medium">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.value && <span className="text-xs text-slate-400">{item.value}</span>}
              <span className="text-slate-300">{'<'}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Logout */}
      <button 
        onClick={onLogout}
        className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-bold border border-red-100 hover:bg-red-200 active:scale-[0.98] transition-all"
      >
        تسجيل الخروج
      </button>
      
      <p className="text-center text-[10px] text-slate-400">إصدار التطبيق v1.0.4 • ختمات © ٢٠٢٤</p>
    </div>
  );
};

export default ProfileScreen;
