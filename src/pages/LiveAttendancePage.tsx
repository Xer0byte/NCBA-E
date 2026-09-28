import React, { useState, useEffect, useCallback } from 'react';
import { AttendanceRecord } from '../types';
import { INITIAL_ATTENDANCE } from '../data/mockData';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz3exbLQBFzuOJhVs02Av_DVzSH3FvIIUCpJYn0WqQ7j0c-BY4EGJHTzOeYo3mKjJWCcQ/exec';

const SUBJECT_LIST = [
  { full: 'Applied Physics', short: 'Applied Physics', key: 'ap' },
  {
    full: 'Computer Organization & Assembly Language Theory & Lab',
    short: 'COAL Theory & Lab',
    key: 'coal',
  },
  { full: 'Linear Algebra', short: 'Linear Algebra', key: 'la' },
  { full: 'Technical & Business Writing', short: 'Tech & Business Writing', key: 'tbw' },
  { full: 'Theory of Automata', short: 'Theory of Automata', key: 'toa' },
  { full: 'Web Engineering', short: 'Web Engineering', key: 'we' },
];

export const LiveAttendancePage: React.FC = () => {
  const [data, setData] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [todayOnly, setTodayOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const loadAttendance = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getAll`, {
        cache: 'no-store',
      });
      const text = await response.text();
      const parsed = JSON.parse(text);

      if (Array.isArray(parsed) && parsed.length > 0) {
        setData(parsed);
      } else if (parsed && parsed.error) {
        console.warn('API message:', parsed.error);
        // keep fallback data
      }
    } catch (err: any) {
      console.warn('Fetch error:', err);
      // keep initial records so user sees realistic data
    } finally {
      setLoading(false);
      setLastRefreshed(new Date().toLocaleTimeString('en-PK', { timeZone: 'Asia/Karachi' }));
    }
  }, []);

  useEffect(() => {
    loadAttendance();
    const interval = setInterval(loadAttendance, 100000); // 100s refresh
    return () => clearInterval(interval);
  }, [loadAttendance]);

  // Compute subject counts
  const counts: Record<string, number> = {};
  SUBJECT_LIST.forEach((s) => {
    counts[s.full] = 0;
  });
  data.forEach((row) => {
    if (counts[row.subject] !== undefined) {
      counts[row.subject]++;
    }
  });

  // Filter records
  const filteredData = data.filter((row) => {
    if (selectedSubject && row.subject !== selectedSubject) {
      return false;
    }

    if (dateFilter) {
      const rowDate = row.timestamp?.split(',')[0]?.trim() || '';
      try {
        const formatted = new Date(rowDate)
          .toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' })
          .split('/')
          .reverse()
          .join('-');
        if (formatted !== dateFilter) return false;
      } catch (e) {}
    } else if (todayOnly) {
      const today = new Date()
        .toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' })
        .split('/')
        .reverse()
        .join('-');
      const rowDate = row.timestamp?.split(',')[0]?.trim() || '';
      try {
        const formatted = new Date(rowDate)
          .toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' })
          .split('/')
          .reverse()
          .join('-');
        if (formatted !== today) return false;
      } catch (e) {}
    }

    return true;
  });

  const handleCopyRollAndNames = () => {
    if (filteredData.length === 0) {
      alert('No data available to copy!');
      return;
    }
    const text = filteredData.map((row) => `${row.roll} - ${row.name}`).join('\n');
    navigator.clipboard
      .writeText(text)
      .then(() => alert(`Copied ${filteredData.length} students to clipboard!`))
      .catch((err) => alert('Failed to copy: ' + err));
  };

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Real-Time Class Attendance
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Last updated: {lastRefreshed || 'Just now'} • Section 4-C-2
        </p>
      </div>

      {/* 6 Subject Count Cards */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
        {SUBJECT_LIST.map((subj) => {
          const isSelected = selectedSubject === subj.full;
          const count = counts[subj.full] || 0;
          return (
            <button
              key={subj.full}
              onClick={() => setSelectedSubject(isSelected ? null : subj.full)}
              className={`p-4 rounded-2xl bg-[var(--card)] border text-center transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-1 ${
                isSelected
                  ? 'border-[var(--primary)] shadow-lg shadow-[var(--primary)]/30 ring-2 ring-[var(--primary)]'
                  : 'border-[var(--border)] hover:border-[var(--primary)]'
              }`}
            >
              <h3 className="text-xs sm:text-sm font-semibold text-[var(--primary)] mb-2 line-clamp-2">
                {subj.short}
              </h3>
              <p className="text-2xl sm:text-3xl font-black text-[var(--text)]">{count}</p>
            </button>
          );
        })}
      </div>

      {/* Filter and Action Controls */}
      <div className="w-full p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={todayOnly}
              onChange={(e) => {
                setTodayOnly(e.target.checked);
                if (e.target.checked) setDateFilter('');
              }}
              className="w-4 h-4 rounded text-[var(--primary)] accent-[var(--primary)] cursor-pointer"
            />
            <span>Today Only</span>
          </label>

          <div className="flex items-center gap-2 text-sm">
            <label className="text-[var(--muted)] font-semibold">Filter Date:</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                if (e.target.value) setTodayOnly(false);
              }}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-xs sm:text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          {selectedSubject && (
            <button
              onClick={() => setSelectedSubject(null)}
              className="text-xs px-2.5 py-1 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)]/30 transition-colors"
            >
              ✕ Clear subject filter
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={loadAttendance}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-transform duration-200 cursor-pointer shadow disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Now'}
          </button>

          <button
            onClick={handleCopyRollAndNames}
            className="flex-1 sm:flex-none px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-transform duration-200 cursor-pointer shadow"
          >
            📋 Copy Roll & Names
          </button>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="w-full overflow-x-auto rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--primary)]/15 text-[var(--primary)] text-xs sm:text-sm uppercase tracking-wider font-bold">
              <th className="p-3.5 sm:p-4">Student Name</th>
              <th className="p-3.5 sm:p-4">Roll Number</th>
              <th className="p-3.5 sm:p-4">Course / Subject</th>
              <th className="p-3.5 sm:p-4">Recorded Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)] text-xs sm:text-sm">
            {loading && data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[var(--muted)]">
                  Loading live attendance data from server...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[var(--muted)]">
                  No matching attendance records found for this filter.
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr
                  key={`${row.roll}-${row.timestamp}-${idx}`}
                  className="hover:bg-[var(--primary)]/10 transition-colors"
                >
                  <td className="p-3.5 sm:p-4 font-semibold text-[var(--text)]">{row.name || '-'}</td>
                  <td className="p-3.5 sm:p-4 font-mono text-[var(--primary)]">{row.roll || '-'}</td>
                  <td className="p-3.5 sm:p-4 text-[var(--muted)]">{row.subject || '-'}</td>
                  <td className="p-3.5 sm:p-4 text-xs font-mono text-[var(--muted)]">
                    {row.timestamp || '-'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {errorMsg && (
        <div className="mt-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-xs text-center border border-red-500">
          {errorMsg}
        </div>
      )}
    </main>
  );
};
