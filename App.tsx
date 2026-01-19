
import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import VolunteerHomeScreen from './screens/VolunteerHomeScreen';
import KhatmahScreen from './screens/KhatmahScreen';
import HalaqahScreen from './screens/HalaqahScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ContentScreen from './screens/ContentScreen';
import AuthScreen from './screens/AuthScreen';
import VolunteerPortal from './screens/VolunteerPortal';
import ChatScreen from './screens/ChatScreen';
import LiveSessionScreen from './screens/LiveSessionScreen';
import KhatmahRecordingScreen from './screens/KhatmahRecordingScreen';
import KhatmahReviewStatusScreen from './screens/KhatmahReviewStatusScreen';
import { User, UserRole } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <MemoryRouter>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route 
            path="/" 
            element={user.role === UserRole.VOLUNTEER ? <VolunteerHomeScreen user={user} /> : <HomeScreen />} 
          />
          <Route path="/khatmah" element={<KhatmahScreen />} />
          <Route path="/halaqat" element={<HalaqahScreen user={user} />} />
          <Route 
            path="/dashboard" 
            element={user.role === UserRole.VOLUNTEER ? <VolunteerPortal /> : <DashboardScreen />} 
          />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/profile" element={<ProfileScreen user={user} onLogout={handleLogout} />} />
          <Route path="/content/:id" element={<ContentScreen />} />
          <Route path="/session/:id" element={<LiveSessionScreen />} />
          <Route path="/record/:id" element={<KhatmahRecordingScreen />} />
          <Route path="/khatmah-status/:id" element={<KhatmahReviewStatusScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
};

export default App;
