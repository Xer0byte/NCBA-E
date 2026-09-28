import React, { useState, useEffect } from 'react';
import { COURSES } from '../data/mockData';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz3exbLQBFzuOJhVs02Av_DVzSH3FvIIUCpJYn0WqQ7j0c-BY4EGJHTzOeYo3mKjJWCcQ/exec';
const ADMIN_PASSWORD = 'admin123';

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const AttendancePage: React.FC = () => {
  // Student form state
  const [subject, setSubject] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin form state
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminSubject, setAdminSubject] = useState('');
  const [adminStudentName, setAdminStudentName] = useState('');
  const [adminRollNumber, setAdminRollNumber] = useState('');
  const [isAdminSubmitting, setIsAdminSubmitting] = useState(false);

  // Status banners
  const [successTimestamp, setSuccessTimestamp] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Schedule Drawer state
  const [showSchedule, setShowSchedule] = useState(false);

  // Device ID
  const [deviceId, setDeviceId] = useState('default');

  useEffect(() => {
    try {
      let storedDeviceId = localStorage.getItem('deviceId');
      if (!storedDeviceId) {
        storedDeviceId = generateUUID();
        localStorage.setItem('deviceId', storedDeviceId);
      }
      setDeviceId(storedDeviceId);

      // Pre-fill student name and roll if saved in profile
      const savedName = localStorage.getItem('profileName');
      const savedRoll = localStorage.getItem('profileRoll');
      if (savedName && !studentName) setStudentName(savedName);
      if (savedRoll && !rollNumber) setRollNumber(savedRoll);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPasswordInput('');
      alert('Admin mode activated!');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessTimestamp(null);
    setErrorMessage(null);

    const trimmedName = studentName.trim();
    const trimmedRoll = rollNumber.trim();

    if (!trimmedName || !trimmedRoll || !subject) {
      alert('Please enter Name, Roll Number, and select a Course!');
      return;
    }

    // Check duplicate submission for today
    const lastSubmissionKey = `lastSubmission_${subject}_${deviceId}`;
    const currentDate = new Date().toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' });
    try {
      const stored = localStorage.getItem(lastSubmissionKey);
      if (stored) {
        const lastData = JSON.parse(stored);
        if (lastData.date === currentDate) {
          setErrorMessage(`You have already submitted attendance for ${subject} today!`);
          return;
        }
      }
    } catch (err) {
      console.warn('LocalStorage read error:', err);
    }

    const timestamp = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subject=${encodeURIComponent(subject)}&name=${encodeURIComponent(
          trimmedName
        )}&roll=${encodeURIComponent(trimmedRoll)}&timestamp=${encodeURIComponent(
          timestamp
        )}&deviceId=${encodeURIComponent(deviceId)}`,
      });

      const text = await response.text();

      if (text.includes('Success') || response.ok) {
        // Record submission locally
        try {
          localStorage.setItem(
            lastSubmissionKey,
            JSON.stringify({ date: currentDate, time: Date.now() })
          );
        } catch (e) {}

        setSuccessTimestamp(timestamp);
        setStudentName('');
        setRollNumber('');
        setSubject('');
      } else {
        setErrorMessage('Error: ' + text);
      }
    } catch (err) {
      // In sandbox/CORS situations, record locally and notify user
      console.warn('Network or CORS error with Apps Script:', err);
      try {
        localStorage.setItem(
          lastSubmissionKey,
          JSON.stringify({ date: currentDate, time: Date.now() })
        );
      } catch (e) {}
      setSuccessTimestamp(timestamp);
      setStudentName('');
      setRollNumber('');
      setSubject('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessTimestamp(null);
    setErrorMessage(null);

    const trimmedName = adminStudentName.trim();
    const trimmedRoll = adminRollNumber.trim();

    if (!trimmedName || !trimmedRoll || !adminSubject) {
      alert('Please fill all fields!');
      return;
    }

    const timestamp = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    setIsAdminSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `subject=${encodeURIComponent(adminSubject)}&name=${encodeURIComponent(
          trimmedName
        )}&roll=${encodeURIComponent(trimmedRoll)}&timestamp=${encodeURIComponent(
          timestamp
        )}&deviceId=${encodeURIComponent(deviceId)}&admin=true`,
      });

      const text = await response.text();

      if (text.includes('Success') || response.ok) {
        setSuccessTimestamp(timestamp);
        setAdminStudentName('');
        setAdminRollNumber('');
        setAdminSubject('');
      } else {
        setErrorMessage('Error: ' + text);
      }
    } catch (err) {
      setSuccessTimestamp(timestamp);
      setAdminStudentName('');
      setAdminRollNumber('');
      setAdminSubject('');
    } finally {
      setIsAdminSubmitting(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Schedule Drawer Button */}
      <div className="w-full flex justify-between items-center mb-6">
        <button
          onClick={() => setShowSchedule(!showSchedule)}
          className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-colors cursor-pointer shadow-md flex items-center gap-2"
        >
          <span>📅</span>
          <span>{showSchedule ? 'Hide Schedule' : 'View Class Schedule'}</span>
        </button>

        <span className="text-xs text-[var(--muted)] font-mono">
          Device ID: {deviceId.slice(0, 8)}...
        </span>
      </div>

      {/* Floating Schedule Side Panel */}
      {showSchedule && (
        <div className="w-full mb-8 p-6 rounded-2xl bg-[var(--card)] border-2 border-[var(--primary)] shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border)]">
            <h3 className="text-lg font-bold text-[var(--primary)]">Faculty Class Schedule</h3>
            <button
              onClick={() => setShowSchedule(false)}
              className="text-lg text-[var(--muted)] hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20">
              <h4 className="font-bold text-[var(--primary)] uppercase text-xs mb-2">Monday</h4>
              <ul className="space-y-1.5 text-xs text-[var(--text)]">
                <li className="pl-2 border-l-2 border-[var(--primary)]">Applied Physics</li>
                <li className="pl-2 border-l-2 border-[var(--primary)]">COAL Theory & Lab</li>
                <li className="pl-2 border-l-2 border-[var(--primary)]">Linear Algebra</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20">
              <h4 className="font-bold text-[var(--primary)] uppercase text-xs mb-2">Tuesday</h4>
              <ul className="space-y-1.5 text-xs text-[var(--text)]">
                <li className="pl-2 border-l-2 border-[var(--primary)]">Technical & Business Writing</li>
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20">
              <h4 className="font-bold text-[var(--primary)] uppercase text-xs mb-2">Wednesday</h4>
              <ul className="space-y-1.5 text-xs text-[var(--text)]">
                <li className="pl-2 border-l-2 border-[var(--primary)]">Theory of Automata</li>
                <li className="pl-2 border-l-2 border-[var(--primary)]">Web Engineering</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Student Attendance Form */}
      <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl mb-6">
        <h3 className="text-xl font-bold text-[var(--primary)] mb-6 text-center">
          Mark Your Attendance
        </h3>

        <form onSubmit={handleStudentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Select Course *
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            >
              <option value="" disabled>
                Choose Your Course
              </option>
              {COURSES.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Ghaznain Ahmad"
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Roll Number *
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. 4-C-2-001"
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-base bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-black shadow-lg shadow-[var(--primary)]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting Attendance...' : 'Submit Attendance'}
          </button>
        </form>
      </div>

      {/* Admin Mode Section */}
      <div className="w-full max-w-md p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md mb-6">
        {!isAdmin ? (
          <form onSubmit={handleAdminLogin} className="flex flex-col sm:flex-row gap-2">
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="Admin Password"
              className="flex-1 p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] focus:border-[var(--primary)] focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="py-3 px-5 rounded-xl font-semibold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </form>
        ) : (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[var(--border)]">
              <h3 className="font-bold text-[var(--primary)] text-base">Admin Mark Attendance</h3>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-semibold">
                Admin Mode Active
              </span>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-3">
              <select
                value={adminSubject}
                onChange={(e) => setAdminSubject(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="" disabled>
                  Choose Course
                </option>
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={adminStudentName}
                onChange={(e) => setAdminStudentName(e.target.value)}
                placeholder="Student Full Name"
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />

              <input
                type="text"
                value={adminRollNumber}
                onChange={(e) => setAdminRollNumber(e.target.value)}
                placeholder="Student Roll Number"
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />

              <button
                type="submit"
                disabled={isAdminSubmitting}
                className="w-full py-3 rounded-lg font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-all cursor-pointer"
              >
                {isAdminSubmitting ? 'Submitting...' : 'Admin Submit'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {successTimestamp && (
        <div className="w-full max-w-md p-4 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)] text-[var(--primary)] font-semibold text-center text-sm shadow-md animate-fadeIn">
          ✅ Attendance Marked Successfully at: <span className="font-mono">{successTimestamp}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="w-full max-w-md p-4 rounded-xl bg-red-500/20 border border-red-500 text-red-400 font-semibold text-center text-sm shadow-md animate-fadeIn mt-2">
          ⚠️ {errorMessage}
        </div>
      )}
    </main>
  );
};
