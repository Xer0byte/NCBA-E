import React, { useState, useEffect } from 'react';
import { PageId } from '../types';

interface SettingsPageProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate: (page: PageId) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [attendanceRem, setAttendanceRem] = useState(true);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [twoFactor, setTwoFactor] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      setPushNotif(localStorage.getItem('pushNotif') !== 'false');
      setEmailAlerts(localStorage.getItem('emailAlerts') !== 'false');
      setAttendanceRem(localStorage.getItem('attendanceRem') === 'true');
      setLanguage(localStorage.getItem('language') || 'en');
      setTimezone(localStorage.getItem('timezone') || 'Asia/Karachi');
      setTwoFactor(localStorage.getItem('2fa') === 'true');
      setOnlineStatus(localStorage.getItem('onlineStatus') !== 'false');
    } catch (e) {
      console.warn('Settings load error:', e);
    }
  }, []);

  const saveSetting = (key: string, value: any) => {
    try {
      localStorage.setItem(key, value.toString());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.warn('Save setting failed:', e);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out? Local data will remain saved.')) {
      alert('Logged out successfully!');
      onNavigate('home');
    }
  };

  const handleClearData = () => {
    if (confirm('This will delete ALL saved local data (profile, settings, theme, cache). Continue?')) {
      try {
        localStorage.clear();
      } catch (e) {}
      alert('All local data cleared successfully!');
      window.location.reload();
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Customize Your Experience
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Notification, Security, Appearance & System Preferences
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Notifications Card */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)] flex items-center gap-2">
            <span>🔔</span> Notifications
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="pushNotif" className="text-[var(--text)] font-medium">
                Push Notifications
              </label>
              <input
                type="checkbox"
                id="pushNotif"
                checked={pushNotif}
                onChange={(e) => {
                  setPushNotif(e.target.checked);
                  saveSetting('pushNotif', e.target.checked);
                }}
                className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="emailAlerts" className="text-[var(--text)] font-medium">
                Email Alerts
              </label>
              <input
                type="checkbox"
                id="emailAlerts"
                checked={emailAlerts}
                onChange={(e) => {
                  setEmailAlerts(e.target.checked);
                  saveSetting('emailAlerts', e.target.checked);
                }}
                className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="attendanceRem" className="text-[var(--text)] font-medium">
                Attendance Reminders
              </label>
              <input
                type="checkbox"
                id="attendanceRem"
                checked={attendanceRem}
                onChange={(e) => {
                  setAttendanceRem(e.target.checked);
                  saveSetting('attendanceRem', e.target.checked);
                }}
                className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Appearance Card */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)] flex items-center gap-2">
            <span>🎨</span> Appearance & Locale
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--text)] font-medium">Current Theme</span>
              <button
                onClick={onToggleTheme}
                className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <label className="text-[var(--text)] font-medium">Language</label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  saveSetting('language', e.target.value);
                }}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-xs focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ur">Urdu (اردو)</option>
              </select>
            </div>

            <div className="flex items-center justify-between gap-2">
              <label className="text-[var(--text)] font-medium">Time Zone</label>
              <select
                value={timezone}
                onChange={(e) => {
                  setTimezone(e.target.value);
                  saveSetting('timezone', e.target.value);
                }}
                className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-xs focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security Card */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)] flex items-center gap-2">
            <span>🛡️</span> Privacy & Security
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <label htmlFor="2fa" className="text-[var(--text)] font-medium">
                Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                id="2fa"
                checked={twoFactor}
                onChange={(e) => {
                  setTwoFactor(e.target.checked);
                  saveSetting('2fa', e.target.checked);
                }}
                className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="onlineStatus" className="text-[var(--text)] font-medium">
                Show Online Status
              </label>
              <input
                type="checkbox"
                id="onlineStatus"
                checked={onlineStatus}
                onChange={(e) => {
                  setOnlineStatus(e.target.checked);
                  saveSetting('onlineStatus', e.target.checked);
                }}
                className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-red-500/30 shadow-md">
          <h3 className="text-base font-bold text-red-500 mb-4 pb-2 border-b border-red-500/20 flex items-center gap-2">
            <span>⚠️</span> Danger Zone
          </h3>

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-neutral-700 text-white hover:bg-neutral-600 transition-colors cursor-pointer"
            >
              Log Out Session
            </button>

            <button
              onClick={handleClearData}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow"
            >
              Clear All Data & Cache
            </button>
          </div>
        </div>

        {/* About Card */}
        <div className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md col-span-1 md:col-span-2">
          <h3 className="text-base font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)] flex items-center gap-2">
            <span>ℹ️</span> About App
          </h3>

          <div className="space-y-1.5 text-xs sm:text-sm text-[var(--muted)]">
            <p>
              <span className="font-semibold text-[var(--text)]">Version:</span> 1.2.0 (Official Build)
            </p>
            <p>
              <span className="font-semibold text-[var(--text)]">Designed by:</span> Ghaznain Ahmad & Xer0byte
            </p>
            <p>
              <span className="font-semibold text-[var(--text)]">Institution:</span> NCBA&E (National College of Business Administration & Economics)
            </p>
            <p>
              <span className="font-semibold text-[var(--text)]">Batch:</span> Section 4-C-2 Management Portal
            </p>
            <p className="text-[11px] text-[var(--primary)] pt-2">© 2026 NCBA&E 4-C-2 Management System</p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)] text-[var(--primary)] font-semibold text-center text-sm animate-fadeIn">
          Settings saved successfully!
        </div>
      )}
    </main>
  );
};
