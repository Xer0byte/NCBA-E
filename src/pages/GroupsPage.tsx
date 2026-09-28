import React, { useState, useEffect } from 'react';

interface GroupInfo {
  name: string;
  url: string;
  desc: string;
  icon: string;
}

const GROUPS: GroupInfo[] = [
  {
    name: 'Applied Physics',
    url: 'https://chat.whatsapp.com/ED8MCBcQf7x04mCo8pocnf?mode=ems_copy_c',
    desc: 'Lecture notes, lab manuals & tutorial updates',
    icon: '⚡',
  },
  {
    name: 'Computer Organization & Assembly Language Theory & Lab',
    url: 'https://chat.whatsapp.com/KRfxJi2wFCO3S5kx3n9gKg?mode=ems_copy_c',
    desc: '8086 assembly code, tasks & lab submissions',
    icon: '💻',
  },
  {
    name: 'Linear Algebra',
    url: 'https://chat.whatsapp.com/CQ1G5RvEcd4ImEOnTQERlh?mode=ems_wa_t',
    desc: 'Matrices, vector spaces & homework discussions',
    icon: '📐',
  },
  {
    name: 'Technical & Business Writing',
    url: 'https://chat.whatsapp.com/FjzWODwD333CHxShSl3gWY?mode=ems_copy_c',
    desc: 'Report formatting, presentations & grammar guidelines',
    icon: '✍️',
  },
  {
    name: 'Theory of Automata',
    url: 'https://chat.whatsapp.com/E6VIDMpfdtQF6ucjOWLlax?mode=ems_copy_c',
    desc: 'DFA, NFA, context-free grammars & assignments',
    icon: '⚙️',
  },
  {
    name: 'Web Engineering',
    url: 'https://chat.whatsapp.com/E6VIDMpfdtQF6ucjOWLlax?mode=ems_copy_c',
    desc: 'HTML, CSS, JS, React & term project coordination',
    icon: '🌐',
  },
];

export const GroupsPage: React.FC = () => {
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('clickCount');
      if (stored) {
        setClickCount(parseInt(stored, 10) || 0);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const handleGroupClick = (url: string) => {
    const next = clickCount + 1;
    setClickCount(next);
    try {
      localStorage.setItem('clickCount', next.toString());
    } catch (e) {}
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          NCBA&E WhatsApp Groups
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Official Course Discussion Channels • Section 4-C-2
        </p>
      </div>

      {/* Course Group Buttons */}
      <div className="w-full space-y-3.5 mb-8">
        {GROUPS.map((group) => (
          <button
            key={group.name}
            onClick={() => handleGroupClick(group.url)}
            className="w-full p-4 sm:p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl sm:text-3xl p-2.5 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] group-hover:scale-110 transition-transform">
                {group.icon}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  {group.name}
                </h3>
                <p className="text-xs text-[var(--muted)] line-clamp-1">{group.desc}</p>
              </div>
            </div>

            <span className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm bg-[var(--primary)] text-black group-hover:bg-[var(--primary-dark)] transition-colors whitespace-nowrap shadow ml-2">
              Join Group 💬
            </span>
          </button>
        ))}
      </div>

      {/* Total Joined Counter */}
      <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center w-full max-w-sm">
        <p className="text-sm text-[var(--muted)]">
          Total Joined:{' '}
          <span className="font-extrabold text-[var(--primary)] text-lg">{clickCount}</span> Groups
        </p>
      </div>
    </main>
  );
};
