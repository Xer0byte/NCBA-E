import React from 'react';
import { PageId } from '../types';
import { NcbaeLogo } from './NcbaeLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
}) => {
  const menuItems: { id: PageId; label: string; icon: string }[] = [
    { id: 'home', label: 'Home / Welcome', icon: '🏛️' },
    { id: 'attendance', label: 'Attendance', icon: '📝' },
    { id: 'live-attendance', label: 'Live Attendance', icon: '📊' },
    { id: 'groups', label: 'WhatsApp Groups', icon: '💬' },
    { id: 'faculty', label: 'Faculty Directory', icon: '👨‍🏫' },
    { id: 'announcements', label: 'Announcements', icon: '📢' },
    { id: 'schedule', label: 'Schedule / Timetable', icon: '📅' },
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'contact-us', label: 'Contact Us', icon: '📞' },
  ];

  const handleSelect = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] transition-opacity duration-300"
        />
      )}

      {/* Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[290px] sm:w-[320px] max-w-[85vw] bg-[var(--card)] backdrop-blur-xl p-6 pt-16 z-[1000] shadow-2xl border-l border-[var(--border)] transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Close Button & Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <NcbaeLogo className="h-10 w-auto" />
              <div>
                <h3 className="font-bold text-[var(--primary)] text-base">NCBA&E</h3>
                <p className="text-xs text-[var(--muted)]">Section 4-C-2</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-2xl text-[var(--primary)] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
              title="Close Menu"
            >
              ✕
            </button>
          </div>

          {/* Links List */}
          <div className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm md:text-base flex items-center gap-3 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--primary)] text-black font-bold shadow-md'
                      : 'text-[var(--text)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/15'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-4 border-t border-[var(--border)] text-center text-xs text-[var(--muted)]">
          <p>© 2026 NCBA&E Section 4-C-2</p>
          <p className="mt-1 text-[11px] text-[var(--primary)] font-medium">Ghaznain Ahmad & Xer0byte</p>
        </div>
      </div>
    </>
  );
};
