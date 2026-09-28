import React from 'react';
import { PageId } from '../types';
import { NcbaeLogo } from './NcbaeLogo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onToggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  theme,
  onToggleTheme,
  onToggleMenu,
}) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'home':
        return 'Welcome to NCBA&E';
      case 'attendance':
        return 'NCBA&E Attendance System';
      case 'live-attendance':
        return 'Live Attendance';
      case 'announcements':
        return 'Announcements';
      case 'faculty':
        return 'Faculty Directory';
      case 'groups':
        return 'NCBA&E WhatsApp Groups';
      case 'schedule':
        return 'Faculty Schedule';
      case 'profile':
        return 'My Profile';
      case 'contact-us':
        return 'Contact Us';
      case 'settings':
        return 'Settings';
      default:
        return 'NCBA&E 4-C-2 Portal';
    }
  };

  return (
    <>
      {/* Top Floating Controls */}
      <button
        onClick={onToggleTheme}
        aria-label="Toggle Theme"
        className="fixed top-4 left-4 z-50 p-2.5 text-2xl md:text-3xl text-[var(--primary)] hover:scale-125 transition-transform duration-200 cursor-pointer bg-black/40 backdrop-blur-md rounded-full shadow-lg border border-[var(--border)]"
        title="Toggle Light/Dark Theme"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>

      <button
        onClick={onToggleMenu}
        aria-label="Open Navigation Menu"
        className="fixed top-4 right-4 z-50 p-2 text-2xl md:text-3xl text-[var(--primary)] hover:scale-125 transition-transform duration-200 cursor-pointer bg-black/40 backdrop-blur-md rounded-full shadow-lg border border-[var(--border)]"
        title="Open Menu"
      >
        ☰
      </button>

      {/* Main Header Banner */}
      <header className="w-full py-6 px-4 bg-[var(--card)] border-b-2 border-[var(--primary)] text-center flex flex-col items-center shadow-lg relative">
        <button
          onClick={() => onNavigate('home')}
          className="focus:outline-none group mb-2 cursor-pointer"
          title="Go to Home"
        >
          <NcbaeLogo className="h-28 md:h-36 w-auto" />
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--primary)] uppercase tracking-wider mb-1">
          {getPageTitle()}
        </h1>
        <p className="text-sm md:text-base font-semibold text-[var(--primary)]">
          Section: 4-C-2
        </p>
      </header>

      {/* Primary Navigation Pills */}
      <nav className="w-full max-w-4xl mx-auto my-4 px-2 flex justify-center items-center gap-3 md:gap-4 flex-wrap">
        <button
          onClick={() => onNavigate('home')}
          className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border-2 cursor-pointer ${
            currentPage === 'home'
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-md shadow-[var(--primary)]/30 scale-105'
              : 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:scale-105'
          }`}
        >
          🏠 Home
        </button>
        <button
          onClick={() => onNavigate('attendance')}
          className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border-2 cursor-pointer ${
            currentPage === 'attendance'
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-md shadow-[var(--primary)]/30 scale-105'
              : 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:scale-105'
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => onNavigate('groups')}
          className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border-2 cursor-pointer ${
            currentPage === 'groups'
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-md shadow-[var(--primary)]/30 scale-105'
              : 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:scale-105'
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => onNavigate('live-attendance')}
          className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 border-2 cursor-pointer ${
            currentPage === 'live-attendance'
              ? 'bg-[var(--primary)] text-black border-[var(--primary)] shadow-md shadow-[var(--primary)]/30 scale-105'
              : 'text-[var(--primary)] bg-[var(--primary)]/10 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black hover:scale-105'
          }`}
        >
          Live Attendance
        </button>
      </nav>
    </>
  );
};
