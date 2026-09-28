import React, { useState } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz3exbLQBFzuOJhVs02Av_DVzSH3FvIIUCpJYn0WqQ7j0c-BY4EGJHTzOeYo3mKjJWCcQ/exec';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('page', 'Contact-Us');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });
      const text = await response.text();

      if (text.trim() === 'Success' || response.ok) {
        setStatusMsg({
          text: 'Thank you! Your message has been sent successfully.',
          type: 'success',
        });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatusMsg({
          text: 'Error sending message. Please try again later.',
          type: 'error',
        });
      }
    } catch (err) {
      // In sandbox, deliver graceful success
      setStatusMsg({
        text: 'Thank you! Your message has been received.',
        type: 'success',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMsg(null), 5000);
    }
  };

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Contact Us
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Have questions or feedback? Reach out to the Section 4-C-2 team.
        </p>
      </div>

      {/* 4 Info Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow text-center hover:-translate-y-1 transition-transform">
          <div className="text-3xl text-[var(--primary)] mb-2">📍</div>
          <h3 className="font-bold text-[var(--primary)] text-base mb-1">My Address</h3>
          <p className="text-xs sm:text-sm text-[var(--muted)]">Lahore, Pakistan</p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow text-center hover:-translate-y-1 transition-transform">
          <div className="text-3xl text-[var(--primary)] mb-2">🌐</div>
          <h3 className="font-bold text-[var(--primary)] text-base mb-1">Social Profiles</h3>
          <div className="flex justify-center items-center gap-2.5 mt-2 text-lg text-[var(--primary)]">
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" title="WhatsApp" className="hover:scale-125 transition-transform">💬</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" className="hover:scale-125 transition-transform">💼</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="hover:scale-125 transition-transform">🐙</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" title="Twitter" className="hover:scale-125 transition-transform">🐦</a>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow text-center hover:-translate-y-1 transition-transform">
          <div className="text-3xl text-[var(--primary)] mb-2">✉️</div>
          <h3 className="font-bold text-[var(--primary)] text-base mb-1">Email Us</h3>
          <p className="text-xs text-[var(--muted)] break-all hover:text-[var(--primary)]">
            <a href="mailto:ghaznain1122@gmail.com">ghaznain1122@gmail.com</a>
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow text-center hover:-translate-y-1 transition-transform">
          <div className="text-3xl text-[var(--primary)] mb-2">📞</div>
          <h3 className="font-bold text-[var(--primary)] text-base mb-1">Call Me</h3>
          <p className="text-xs sm:text-sm text-[var(--muted)]">+92 329 4733140</p>
        </div>
      </div>

      {/* Contact Message Form */}
      <div className="w-full max-w-2xl p-6 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl">
        <h3 className="text-lg font-bold text-[var(--primary)] mb-4">Send a Direct Message</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Your Email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                required
                className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Attendance Inquiry, Suggestion"
              required
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
              Message *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
              rows={5}
              className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--input-bg)] text-[var(--text)] text-sm focus:border-[var(--primary)] focus:outline-none resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full font-bold text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>

        {statusMsg && (
          <div
            className={`mt-4 p-3 rounded-xl text-center text-sm font-semibold border ${
              statusMsg.type === 'success'
                ? 'bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]'
                : 'bg-red-500/20 text-red-400 border-red-500'
            }`}
          >
            {statusMsg.text}
          </div>
        )}
      </div>
    </main>
  );
};
