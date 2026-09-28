import React, { useState, useEffect } from 'react';
import { ScheduleEntry } from '../types';
import { INITIAL_SCHEDULE, COURSES, INITIAL_FACULTY } from '../data/mockData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const ADMIN_PASSWORD = 'admin123';

export const SchedulePage: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleEntry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  // Form states
  const [day, setDay] = useState<ScheduleEntry['day']>('Monday');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [faculty, setFaculty] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('schedule');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSchedule(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('LocalStorage schedule read error:', e);
    }
    setSchedule(INITIAL_SCHEDULE);
    try {
      localStorage.setItem('schedule', JSON.stringify(INITIAL_SCHEDULE));
    } catch (e) {}
  }, []);

  const handleAdminLogin = () => {
    const pass = prompt('Enter admin password:');
    if (pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      alert('Admin mode activated! You can now add, edit or delete schedule slots.');
    } else if (pass !== null) {
      alert('Incorrect password!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!day || !time || !subject || !faculty) {
      alert('Please fill all fields!');
      return;
    }

    const newEntry: ScheduleEntry = { day, time, subject, faculty };
    let updated = [...schedule];

    if (editIndex >= 0 && editIndex < updated.length) {
      updated[editIndex] = newEntry;
    } else {
      updated.push(newEntry);
    }

    try {
      localStorage.setItem('schedule', JSON.stringify(updated));
      setSchedule(updated);
      alert('Saved successfully!');
      // reset form
      setEditIndex(-1);
      setTime('');
      setSubject('');
      setFaculty('');
    } catch (e) {
      alert('Save failed! Storage might be full.');
    }
  };

  const handleEdit = (idx: number) => {
    if (!isAdmin) return;
    const entry = schedule[idx];
    if (!entry) return;
    setDay(entry.day);
    setTime(entry.time);
    setSubject(entry.subject);
    setFaculty(entry.faculty);
    setEditIndex(idx);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (idx: number) => {
    if (!isAdmin) return;
    if (!confirm('Delete this schedule entry?')) return;
    const updated = schedule.filter((_, i) => i !== idx);
    try {
      localStorage.setItem('schedule', JSON.stringify(updated));
      setSchedule(updated);
    } catch (e) {}
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Weekly Class Schedule
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Lecture Slots & Timetable • Section 4-C-2
        </p>

        {!isAdmin ? (
          <button
            onClick={handleAdminLogin}
            className="mt-4 px-6 py-2.5 rounded-full font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            🔑 Admin Login (Manage Timetable)
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-semibold border border-[var(--primary)]">
              Admin Mode Enabled
            </span>
          </div>
        )}
      </div>

      {/* Admin Add/Edit Form */}
      {isAdmin && (
        <div className="w-full max-w-xl p-6 rounded-2xl bg-[var(--card)] border border-[var(--primary)] shadow-2xl mb-8 animate-fadeIn">
          <h3 className="text-lg font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)]">
            {editIndex >= 0 ? 'Edit Schedule Slot' : 'Add New Schedule Slot'}
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">Day *</label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value as ScheduleEntry['day'])}
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              >
                {DAYS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Time Slot * (e.g. 09:00 AM - 11:00 AM)
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 09:00 AM - 11:00 AM"
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="" disabled>
                  Select Course
                </option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Faculty Instructor *
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                required
                className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="" disabled>
                  Select Faculty
                </option>
                {INITIAL_FACULTY.map((f) => (
                  <option key={f.id} value={f.name}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 rounded-lg font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-all cursor-pointer shadow"
              >
                {editIndex >= 0 ? 'Update Slot' : 'Save Schedule Entry'}
              </button>
              {editIndex >= 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setEditIndex(-1);
                    setTime('');
                    setSubject('');
                    setFaculty('');
                  }}
                  className="py-3 px-4 rounded-lg font-semibold text-sm bg-neutral-700 text-white hover:bg-neutral-600 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Schedule by Days */}
      <div className="w-full space-y-4">
        {DAYS.map((currentDay) => {
          const dayEntries = schedule.filter((s) => s.day === currentDay);
          return (
            <div
              key={currentDay}
              className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md border-l-4 border-l-[var(--primary)]"
            >
              <h3 className="text-lg font-bold text-[var(--primary)] mb-3 flex items-center justify-between">
                <span>{currentDay}</span>
                <span className="text-xs font-normal text-[var(--muted)]">
                  {dayEntries.length} {dayEntries.length === 1 ? 'class' : 'classes'}
                </span>
              </h3>

              {dayEntries.length === 0 ? (
                <p className="text-xs sm:text-sm text-[var(--muted)] italic">No classes scheduled</p>
              ) : (
                <div className="space-y-2">
                  {dayEntries.map((entry, idx) => {
                    const globalIdx = schedule.findIndex((s) => s === entry);
                    return (
                      <div
                        key={`${entry.day}-${entry.time}-${idx}`}
                        className="p-3 rounded-xl bg-black/10 border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-bold text-sm text-[var(--text)]">
                            <span className="font-mono text-[var(--primary)] mr-2">{entry.time}</span>
                            <span>{entry.subject}</span>
                          </p>
                          <p className="text-xs text-[var(--muted)] mt-0.5">
                            Teacher: <span className="text-[var(--text)]">{entry.faculty}</span>
                          </p>
                        </div>

                        {isAdmin && (
                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleEdit(globalIdx)}
                              className="p-1.5 text-xs text-[var(--primary)] hover:bg-[var(--primary)]/20 rounded-full transition-colors"
                              title="Edit slot"
                            >
                              ✎
                            </button>
                            <button
                              onClick={() => handleDelete(globalIdx)}
                              className="p-1.5 text-xs text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
                              title="Delete slot"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};
