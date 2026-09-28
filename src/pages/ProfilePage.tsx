import React, { useState, useEffect } from 'react';

export const ProfilePage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [displayRoll, setDisplayRoll] = useState('');
  const [avatarSrc, setAvatarSrc] = useState<string>('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80');

  // Input states
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    try {
      const savedName = localStorage.getItem('profileName');
      const savedRoll = localStorage.getItem('profileRoll');
      const savedAvatar = localStorage.getItem('profileAvatar');

      if (savedName) setDisplayName(savedName);
      if (savedRoll) setDisplayRoll(`Roll Number: ${savedRoll}`);
      if (savedAvatar) setAvatarSrc(savedAvatar);
    } catch (e) {
      console.warn('Profile read error:', e);
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (result) {
        setAvatarSrc(result);
        try {
          localStorage.setItem('profileAvatar', result);
        } catch (err) {
          alert('Avatar could not be saved. Storage might be full.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedRoll = rollNumber.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedRoll || !trimmedEmail) {
      alert('Please fill all required fields: Name, Roll Number, and Email');
      return;
    }

    if (!trimmedEmail.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      localStorage.setItem('profileName', trimmedName);
      localStorage.setItem('profileRoll', trimmedRoll);
      localStorage.setItem('profileEmail', trimmedEmail);
      if (trimmedPhone) localStorage.setItem('profilePhone', trimmedPhone);

      setDisplayName(trimmedName);
      setDisplayRoll(`Roll Number: ${trimmedRoll}`);

      // Reset form input boxes as per user's original logic
      setFullName('');
      setRollNumber('');
      setEmail('');
      setPhone('');

      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      alert('Could not save profile! Storage might be full.');
    }
  };

  return (
    <main className="flex-1 w-full max-w-xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          My Profile
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Student Information & Avatar • Section 4-C-2
        </p>
      </div>

      <div className="w-full p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl">
        {/* Avatar & Display Info */}
        <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-[var(--border)]">
          <label htmlFor="avatarInput" className="cursor-pointer group relative block">
            <img
              src={avatarSrc}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[var(--primary)] shadow-lg group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold">📷 Change</span>
            </div>
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />

          <h3 className="text-xl font-bold text-[var(--primary)] mt-3 min-h-[1.75rem]">
            {displayName || 'Student Name'}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--muted)] min-h-[1.25rem]">
            {displayRoll || 'Section 4-C-2'}
          </p>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
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
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@ncb&e.edu.pk"
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 3XX XXXXXXX"
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-md"
          >
            Save Profile
          </button>
        </form>

        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-[var(--primary)]/20 border border-[var(--primary)] text-[var(--primary)] font-semibold text-center text-sm">
            ✅ Profile updated successfully!
          </div>
        )}
      </div>
    </main>
  );
};
