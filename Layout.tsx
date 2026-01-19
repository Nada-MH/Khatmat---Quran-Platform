
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define nav items dynamically based on user role
  const getNavItems = () => {
    if (user.role === UserRole.VOLUNTEER) {
      return [
        { path: '/', label: 'الرئيسية', icon: '🏠' },
        { path: '/chat', label: 'المحادثات', icon: '💬' },
        { path: '/dashboard', label: 'الإدارة', icon: '🛠️' },
        { path: '/profile', label: 'حسابي', icon: '👤' },
      ];
    }
    // For Students (UserRole.USER)
    return [
      { path: '/', label: 'الرئيسية', icon: '🏠' },
      { path: '/khatmah', label: 'الختمات', icon: '📖' },
      { path: '/halaqat', label: 'الحلقات', icon: '🕋' },
      { path: '/chat', label: 'المحادثات', icon: '💬' },
      { path: '/profile', label: 'حسابي', icon: '👤' },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-slate-50 shadow-xl overflow-hidden relative border-x border-slate-200">
      {/* Header */}
      <header className="bg-[#947f57] text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
           <h1 className="text-xl font-bold font-amiri cursor-pointer" onClick={() => navigate('/')}>ختمات</h1>
           {user.role === UserRole.VOLUNTEER && (
             <span className="text-[10px] bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full">معلم متطوع</span>
           )}
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-black/10 rounded-full relative">
            🔔
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#947f57]"></span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 p-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 flex justify-around p-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all active:scale-90 focus:outline-none ${
                isActive ? 'text-[#947f57] font-bold' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
