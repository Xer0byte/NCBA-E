export type PageId =
  | 'home'
  | 'attendance'
  | 'live-attendance'
  | 'announcements'
  | 'faculty'
  | 'groups'
  | 'schedule'
  | 'profile'
  | 'contact-us'
  | 'settings';

export interface Announcement {
  id?: string;
  subject: string;
  title: string;
  description: string;
  date: string;
}

export interface AttendanceRecord {
  name: string;
  roll: string;
  subject: string;
  timestamp: string;
  deviceId?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  subject: string;
  email: string;
  phone: string;
  location: string;
  officeHours: string;
  avatarUrl: string;
}

export interface ScheduleEntry {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  subject: string;
  faculty: string;
}

export interface ProfileData {
  name: string;
  roll: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface AppSettings {
  pushNotif: boolean;
  emailAlerts: boolean;
  attendanceRem: boolean;
  language: string;
  timezone: string;
  twoFactor: boolean;
  onlineStatus: boolean;
}
