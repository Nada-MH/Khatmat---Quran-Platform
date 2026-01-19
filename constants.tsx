
import React from 'react';

export const COLORS = {
  primary: '#947f57', // Gold/Tan brand color
  secondary: '#d97706', // Amber 600
  accent: '#fef3c7', // Amber 100
  background: '#f8fafc',
  text: '#1e293b',
};

export const BADGES = [
  { id: 'streak-7', name: '7 أيام متتالية', icon: '🔥' },
  { id: 'juz-1', name: 'إتمام جزء', icon: '📖' },
  { id: 'helper', name: 'مساعد مجتمعي', icon: '🤝' },
  { id: 'scholar', name: 'طالب علم', icon: '🎓' },
];

export const MOCK_USER: any = {
  id: 'u1',
  name: 'عبدالرحمن محمد',
  role: 'USER',
  level: 'INTERMEDIATE',
  avatar: 'https://picsum.photos/seed/user1/100/100',
  streak: 12,
  completedJuz: 15,
  badges: ['streak-7', 'juz-1']
};

export const MOCK_VOLUNTEER: any = {
  id: 'v1',
  name: 'الشيخ أحمد محمود',
  role: 'VOLUNTEER',
  level: 'ADVANCED',
  avatar: 'https://picsum.photos/seed/vol1/100/100',
  streak: 45,
  completedJuz: 30,
  badges: ['streak-7', 'helper', 'scholar']
};
