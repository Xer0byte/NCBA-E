import { FacultyMember, ScheduleEntry, Announcement, AttendanceRecord } from '../types';

export const COURSES = [
  'Operating System',
  'Operating System LAB',
  'Computer Architecture',
  'HCI & Computer Graphics',
  'HCI & Computer Graphics Lab',
  'Compiler Construction',
  'Introduction to Management',
] as const;

export const INITIAL_FACULTY: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Dr. Gulfaraz Anis',
    title: 'Dr.',
    subject: 'Operating System (Theory)',
    email: 'gulfaraz.anis@ncb&e.edu.pk',
    phone: '+92-300-1234567',
    location: 'MCSE Lab / CS Faculty Office',
    officeHours: 'Monday, 04:00 PM - 06:30 PM',
    avatarUrl: '/dr_gulfaraz.jpg',
  },
  {
    id: 'f2',
    name: 'Mr. Saifur-Rehman',
    title: 'Mr.',
    subject: 'Operating System LAB',
    email: 'saifur.rehman@ncb&e.edu.pk',
    phone: '+92-300-2345678',
    location: 'Oracle Lab (35) - 01',
    officeHours: 'Tuesday, 08:00 AM - 10:30 AM',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f3',
    name: 'Dr. Zahid Hassan',
    title: 'Dr.',
    subject: 'Computer Architecture',
    email: 'zahid.hassan@ncb&e.edu.pk',
    phone: '+92-300-3456789',
    location: 'DLD Hall / CS Department',
    officeHours: 'Monday, 01:20 PM - 03:50 PM',
    avatarUrl: '/dr_zahid.jpg',
  },
  {
    id: 'f4',
    name: 'Dr. Naila Sammar Naz',
    title: 'Dr.',
    subject: 'HCI & Computer Graphics & Lab / Compiler Construction',
    email: 'naila.sammar@ncb&e.edu.pk',
    phone: '+92-300-4567890',
    location: 'Design Lab / Plymouth (SCS-02)',
    officeHours: 'Tuesday & Wednesday, 10:40 AM - 03:50 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'f5',
    name: 'Mr. Waqas Awais',
    title: 'Mr.',
    subject: 'Introduction to Management',
    email: 'waqas.awais@ncb&e.edu.pk',
    phone: '+92-300-5678901',
    location: 'Philippines (40) / SCS-01',
    officeHours: 'Wednesday, 01:20 PM - 03:50 PM',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80',
  },
];

export const INITIAL_SCHEDULE: ScheduleEntry[] = [
  {
    day: 'Monday',
    time: '01:20 PM - 03:50 PM',
    subject: 'Computer Architecture (DLD)',
    faculty: 'Dr. Zahid Hassan',
  },
  {
    day: 'Monday',
    time: '04:00 PM - 06:30 PM',
    subject: 'Operating System (MCSE Lab 02)',
    faculty: 'Dr. Gulfaraz Anis',
  },
  {
    day: 'Tuesday',
    time: '08:00 AM - 10:30 AM',
    subject: 'Operating System Lab (Oracle Lab 01)',
    faculty: 'Mr. Saifur-Rehman',
  },
  {
    day: 'Tuesday',
    time: '10:40 AM - 01:10 PM',
    subject: 'HCI & Computer Graphics (Plymouth SCS-02)',
    faculty: 'Dr. Naila Sammar Naz',
  },
  {
    day: 'Tuesday',
    time: '01:20 PM - 03:50 PM',
    subject: 'HCI & Computer Graphics Lab (Design Lab 30)',
    faculty: 'Dr. Naila Sammar Naz',
  },
  {
    day: 'Wednesday',
    time: '10:40 AM - 01:10 PM',
    subject: 'Compiler Construction (Westminster SBA-04)',
    faculty: 'Dr. Naila Sammar Naz',
  },
  {
    day: 'Wednesday',
    time: '01:20 PM - 03:50 PM',
    subject: 'Introduction to Management (Philippines SCS-01)',
    faculty: 'Mr. Waqas Awais',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    subject: 'Exam Schedule',
    title: 'Mid-Term Examination Date Sheet Announced',
    description: 'The Mid-Term Examinations for Section 5-C-2 will commence soon. Please verify your admit cards and fee clearance with the accounts department.',
    date: '9/25/2026, 10:30:00 AM',
  },
  {
    id: 'ann-2',
    subject: 'Operating System Lab',
    title: 'OS Lab Tasks & Group Submissions',
    description: 'All 5-C-2 students must join the official WhatsApp group for Operating System Lab and submit process synchronization assignments on time.',
    date: '9/24/2026, 04:15:00 PM',
  },
  {
    id: 'ann-3',
    subject: 'Computer Architecture',
    title: 'DLD Hall Session Materials',
    description: 'Slides for instruction pipeline and cache memory hierarchy have been shared. Prepare queries for the upcoming lecture session.',
    date: '9/22/2026, 02:00:00 PM',
  },
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    name: 'Ghaznain Ahmad',
    roll: '5C2-001',
    subject: 'Operating System LAB',
    timestamp: '9/27/2026, 08:15:10 AM',
  },
  {
    name: 'Hamza Ali',
    roll: '5C2-004',
    subject: 'Computer Architecture',
    timestamp: '9/27/2026, 01:25:22 PM',
  },
  {
    name: 'Usman Farooq',
    roll: '5C2-009',
    subject: 'Operating System',
    timestamp: '9/27/2026, 04:05:18 PM',
  },
  {
    name: 'Ayesha Noor',
    roll: '5C2-014',
    subject: 'HCI & Computer Graphics',
    timestamp: '9/27/2026, 10:45:00 AM',
  },
  {
    name: 'Bilal Tariq',
    roll: '5C2-018',
    subject: 'Compiler Construction',
    timestamp: '9/27/2026, 10:50:45 AM',
  },
  {
    name: 'Zainab Bibi',
    roll: '5C2-022',
    subject: 'Introduction to Management',
    timestamp: '9/27/2026, 01:30:30 PM',
  },
];
