import React, { useState, useEffect } from 'react';
import { Announcement } from '../types';
import { INITIAL_ANNOUNCEMENTS } from '../data/mockData';

const ADMIN_PASSWORD = 'admin123';

export const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  // Form inputs
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('announcements');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnnouncements(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading announcements:', e);
    }
    // Default fallback
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    try {
      localStorage.setItem('announcements', JSON.stringify(INITIAL_ANNOUNCEMENTS));
    } catch (e) {}
  }, []);

  const handleAdminLogin = () => {
    const pass = prompt('Enter admin password:');
    if (pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      alert('Admin mode enabled!');
    } else if (pass !== null) {
      alert('Incorrect password!');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const trimmedSub = subject.trim();
    const trimmedTitle = title.trim();
    const trimmedDesc = desc.trim();

    if (!trimmedSub || !trimmedTitle || !trimmedDesc) {
      alert('Please fill all fields!');
      return;
    }

    const newAnn: Announcement = {
      subject: trimmedSub,
      title: trimmedTitle,
      description: trimmedDesc,
      date: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
    };

    let updatedList = [...announcements];
    if (editIndex >= 0 && editIndex < updatedList.length) {
      updatedList[editIndex] = newAnn;
    } else {
      updatedList.unshift(newAnn);
    }

    try {
      localStorage.setItem('announcements', JSON.stringify(updatedList));
      setAnnouncements(updatedList);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);

      // Reset form
      setShowForm(false);
      setSubject('');
      setTitle('');
      setDesc('');
      setEditIndex(-1);
    } catch (e) {
      alert('Save failed! Storage might be full.');
    }
  };

  const handleEdit = (index: number) => {
    if (!isAdmin) return;
    const ann = announcements[index];
    if (!ann) return;
    setSubject(ann.subject);
    setTitle(ann.title);
    setDesc(ann.description);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (!isAdmin) return;
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    const updated = announcements.filter((_, i) => i !== index);
    try {
      localStorage.setItem('announcements', JSON.stringify(updated));
      setAnnouncements(updated);
    } catch (e) {}
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Latest Announcements
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Official Class Updates & Important Notices • Section 4-C-2
        </p>

        {!isAdmin ? (
          <button
            onClick={handleAdminLogin}
            className="mt-4 px-6 py-2.5 rounded-full font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] hover:scale-105 transition-all shadow-md cursor-pointer"
          >
            🔑 Admin Login
          </button>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] font-semibold border border-[var(--primary)]">
              Admin Mode Active
            </span>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditIndex(-1);
                setSubject('');
                setTitle('');
                setDesc('');
              }}
              className="px-4 py-1.5 rounded-full font-bold text-xs bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-colors cursor-pointer"
            >
              {showForm ? 'Close Form' : '+ New Announcement'}
            </button>
          </div>
        )}
      </div>

      {/* Admin Form */}
      {isAdmin && showForm && (
        <div className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--primary)] shadow-2xl mb-8 animate-fadeIn">
          <h3 className="text-lg font-bold text-[var(--primary)] mb-4 pb-2 border-b border-[var(--border)]">
            {editIndex >= 0 ? 'Edit Announcement' : 'Post New Announcement'}
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Subject / Category *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Exam Schedule, Web Engineering, Assignment"
                required
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Announcement Title"
                required
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Description / Notice Details *
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Write announcement details here..."
                required
                rows={4}
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none resize-y"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] transition-all cursor-pointer shadow"
              >
                {editIndex >= 0 ? 'Update Announcement' : 'Save Announcement'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="py-3 px-4 rounded-xl font-semibold text-sm bg-neutral-700 text-white hover:bg-neutral-600 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {successMsg && (
        <div className="w-full max-w-xl p-3 mb-6 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)] text-[var(--primary)] font-semibold text-center text-sm shadow">
          Announcement saved successfully!
        </div>
      )}

      {/* Announcements Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((ann, idx) => (
          <div
            key={ann.id || idx}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between"
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/40 p-1 rounded-full border border-[var(--border)]">
                <button
                  onClick={() => handleEdit(idx)}
                  className="p-1.5 text-xs text-[var(--primary)] hover:bg-[var(--primary)]/20 rounded-full transition-colors"
                  title="Edit"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="p-1.5 text-xs text-red-400 hover:bg-red-500/20 rounded-full transition-colors"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            )}

            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[var(--primary)] px-2.5 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-3">
                {ann.subject || 'General'}
              </span>

              <h3 className="text-lg font-bold text-[var(--text)] mb-2 line-clamp-2">{ann.title}</h3>

              <p className="text-xs text-[var(--muted)] mb-3 font-mono">{ann.date}</p>

              <p className="text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">
                {ann.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Add Button for Admin */}
      {isAdmin && !showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditIndex(-1);
            setSubject('');
            setTitle('');
            setDesc('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-[var(--primary)] text-black text-3xl font-black shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          title="Add New Announcement"
        >
          +
        </button>
      )}
    </main>
  );
};
