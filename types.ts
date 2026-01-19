
export enum UserRole {
  USER = 'USER',
  VOLUNTEER = 'VOLUNTEER',
  ADMIN = 'ADMIN'
}

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export enum ProgramType {
  KHATMAH = 'KHATMAH',
  MEMORIZATION = 'MEMORIZATION',
  TAFSIR = 'TAFSIR'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  level: ExperienceLevel;
  avatar: string;
  streak: number;
  completedJuz: number;
  badges: string[];
}

export interface Khatmah {
  id: string;
  title: string;
  description: string;
  participants: number;
  totalProgress: number; // 0-100
  startDate: string;
  type: 'DAILY' | 'WEEKLY';
  assignedPart: string; // e.g., "Juz 1"
  status: 'ACTIVE' | 'COMPLETED';
}

export interface Halaqah {
  id: string;
  title: string;
  teacher: string;
  type: ProgramType;
  level: ExperienceLevel;
  schedule: string;
  capacity: number;
  enrolled: number;
  nextSession: string;
  thumbnail: string;
}

export interface TafsirEntry {
  id: string;
  surah: string;
  ayah: number;
  content: string;
  source: string;
  audioUrl?: string;
}

export interface AnalyticsData {
  name: string;
  value: number;
}
