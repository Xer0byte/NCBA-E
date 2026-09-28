import React from 'react';
import { INITIAL_FACULTY } from '../data/mockData';

export const FacultyPage: React.FC = () => {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="w-full text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--primary)] uppercase tracking-wide">
          Meet Your Faculty
        </h2>
        <p className="text-xs sm:text-sm text-[var(--muted)] mt-1">
          Instructors, Office Locations & Contact Hours • Section 4-C-2
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_FACULTY.map((faculty) => (
          <div
            key={faculty.id}
            className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-[var(--primary)] transition-all duration-300 flex flex-col items-center text-center justify-between"
          >
            <div className="flex flex-col items-center w-full">
              <div className="relative mb-4">
                <img
                  src={faculty.avatarUrl}
                  alt={faculty.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-[var(--primary)] shadow-lg"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      faculty.name
                    )}&background=25D366&color=000&size=140`;
                  }}
                />
              </div>

              <h3 className="text-xl font-bold text-[var(--primary)] mb-1">{faculty.name}</h3>

              <div className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4 max-w-full">
                {faculty.subject}
              </div>

              <div className="w-full space-y-2 text-xs sm:text-sm text-[var(--muted)] text-left bg-black/10 p-4 rounded-xl border border-[var(--border)] mb-4">
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-[var(--text)] min-w-[70px]">Email:</span>
                  <span className="break-all">{faculty.email}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-[var(--text)] min-w-[70px]">Phone:</span>
                  <span>{faculty.phone}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-[var(--text)] min-w-[70px]">Location:</span>
                  <span>{faculty.location}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-semibold text-[var(--text)] min-w-[70px]">Hours:</span>
                  <span>{faculty.officeHours}</span>
                </p>
              </div>
            </div>

            <a
              href={`mailto:${faculty.email}`}
              className="w-full py-2.5 px-4 rounded-full font-bold text-xs sm:text-sm bg-[var(--primary)] text-black hover:bg-[var(--primary-dark)] hover:scale-105 transition-all text-center cursor-pointer shadow"
            >
              ✉️ Send Email
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};
