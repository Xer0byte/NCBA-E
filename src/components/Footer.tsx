import React from 'react';
import { XerobyteLogo } from './XerobyteLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto py-5 px-4 bg-[var(--card)] text-center text-xs sm:text-sm text-[var(--muted)] border-t border-[var(--border)] flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2 text-[var(--primary)] font-semibold">
        <XerobyteLogo className="h-6 w-auto" />
      </div>
      <p>© Designed by Ghaznain Ahmad & Xer0byte | 2026</p>
      <p className="text-xs text-[var(--muted)]/70">
        NCBA&E Department of Computer Science & Information Technology • Section 4-C-2
      </p>
    </footer>
  );
};
