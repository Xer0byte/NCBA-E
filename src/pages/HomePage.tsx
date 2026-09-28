import React from 'react';
import { PageId } from '../types';
import { NcbaeLogo } from '../components/NcbaeLogo';
import { XerobyteLogo } from '../components/XerobyteLogo';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center animate-fadeIn">
      {/* Big Logo with hover effect */}
      <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
        <NcbaeLogo className="h-44 sm:h-52 md:h-60 w-auto drop-shadow-2xl" />
      </div>

      {/* Welcome Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--primary)] uppercase tracking-wider mb-2">
        Welcome to NCBA&E
      </h1>
      <p className="text-base sm:text-lg font-semibold text-[var(--muted)] mb-8 tracking-wide">
        Official Academic & Attendance Hub • Section 4-C-2
      </p>

      {/* Main 3 Featured Navigation Buttons */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
        <button
          onClick={() => onNavigate('attendance')}
          className="w-full sm:flex-1 py-4 px-6 rounded-full font-bold text-base md:text-lg bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/30 hover:bg-[var(--primary-dark)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          📝 Mark Attendance
        </button>
        <button
          onClick={() => onNavigate('groups')}
          className="w-full sm:flex-1 py-4 px-6 rounded-full font-bold text-base md:text-lg bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/30 hover:bg-[var(--primary-dark)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          💬 WhatsApp Groups
        </button>
        <button
          onClick={() => onNavigate('live-attendance')}
          className="w-full sm:flex-1 py-4 px-6 rounded-full font-bold text-base md:text-lg bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/30 hover:bg-[var(--primary-dark)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          📊 Live Attendance
        </button>
      </div>

      {/* Quick Access Portal Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        <button
          onClick={() => onNavigate('faculty')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👨‍🏫</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">Faculty Directory</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Teachers & Office Hours</p>
        </button>

        <button
          onClick={() => onNavigate('announcements')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📢</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">Announcements</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Exams & Deadlines</p>
        </button>

        <button
          onClick={() => onNavigate('schedule')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📅</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">Faculty Schedule</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Weekly Timetable</p>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👤</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">My Profile</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Student Credentials</p>
        </button>

        <button
          onClick={() => onNavigate('contact-us')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📞</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">Contact Us</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Get in Touch</p>
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] hover:-translate-y-1.5 transition-all duration-300 text-center group cursor-pointer shadow-md"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">⚙️</div>
          <h3 className="font-bold text-[var(--primary)] text-sm sm:text-base">Settings</h3>
          <p className="text-xs text-[var(--muted)] mt-1">Preferences & Theme</p>
        </button>
      </div>

      {/* Section info banner */}
      <div className="mt-12 p-4 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 max-w-lg w-full flex items-center justify-between text-xs sm:text-sm">
        <div className="text-left">
          <p className="font-bold text-[var(--primary)]">Department of CS & IT</p>
          <p className="text-[var(--muted)]">Semester 4 • Morning Batch</p>
        </div>
        <div className="flex items-center gap-2">
          <XerobyteLogo className="h-6 w-auto" />
        </div>
      </div>
    </main>
  );
};
