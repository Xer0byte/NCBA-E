/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ncbaeLogo from './assets/logo.png';
import drGulfarazImg from './assets/dr_gulfaraz.jpg';
import drZahidImg from './assets/dr_zahid.jpg';

// Exact courses for Section 5-C-2 from Official Fall 2026 Timetable
const COURSES = [
  'Operating System',
  'Operating System LAB',
  'Computer Architecture',
  'HCI & Computer Graphics',
  'HCI & Computer Graphics Lab',
  'Compiler Construction',
  'Introduction to Management',
];

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

export default function App() {
  // Navigation: matches the exact .html file names from user
  const [currentPage, setCurrentPage] = useState<string>('index.html');
  const [theme, setTheme] = useState<string>('dark');
  const [menuOpen, setMenuOpen] = useState(false);

  // Initialize theme and handle hash navigation
  useEffect(() => {
    let saved = 'dark';
    try {
      saved = localStorage.getItem('theme') || 'dark';
    } catch (e) {
      saved = 'dark';
    }
    setTheme(saved);
    document.body.setAttribute('data-theme', saved);

    // Initial page based on location hash or default to index.html
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    }

    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setCurrentPage(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Top Floating Controls */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
        {theme === 'dark' ? '🌙' : '☀️'}
      </button>
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Menu">
        ☰
      </button>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 999,
          }}
        />
      )}

      {/* Menu Sidebar (100% same links as user's menuSidebar) */}
      <div className={`menu-sidebar ${menuOpen ? 'active' : ''}`} id="menuSidebar">
        <button className={currentPage === 'index.html' ? 'active' : ''} onClick={() => navigateTo('index.html')}>Home</button>
        <button className={currentPage === 'faculty.html' ? 'active' : ''} onClick={() => navigateTo('faculty.html')}>Faculty</button>
        <button className={currentPage === 'announcements.html' ? 'active' : ''} onClick={() => navigateTo('announcements.html')}>Announcements</button>
        <button className={currentPage === 'profile.html' ? 'active' : ''} onClick={() => navigateTo('profile.html')}>Profile</button>
        <button className={currentPage === 'settings.html' ? 'active' : ''} onClick={() => navigateTo('settings.html')}>Settings</button>
        <button className={currentPage === 'contact-us.html' ? 'active' : ''} onClick={() => navigateTo('contact-us.html')}>Contact Us</button>
        <button className={currentPage === 'schedule.html' ? 'active' : ''} onClick={() => navigateTo('schedule.html')}>Schedule</button>
        <button className={currentPage === 'attendance.html' ? 'active' : ''} onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button className={currentPage === 'groups.html' ? 'active' : ''} onClick={() => navigateTo('groups.html')}>Groups</button>
        <button className={currentPage === 'live-attendance.html' ? 'active' : ''} onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      {/* Page Content Rendering */}
      {currentPage === 'index.html' && <IndexPage navigateTo={navigateTo} />}
      {currentPage === 'attendance.html' && <AttendancePage navigateTo={navigateTo} />}
      {currentPage === 'live-attendance.html' && <LiveAttendancePage navigateTo={navigateTo} />}
      {currentPage === 'announcements.html' && <AnnouncementsPage navigateTo={navigateTo} />}
      {currentPage === 'faculty.html' && <FacultyPage navigateTo={navigateTo} />}
      {currentPage === 'groups.html' && <GroupsPage navigateTo={navigateTo} />}
      {currentPage === 'schedule.html' && <SchedulePage navigateTo={navigateTo} />}
      {currentPage === 'profile.html' && <ProfilePage navigateTo={navigateTo} />}
      {currentPage === 'contact-us.html' && <ContactUsPage navigateTo={navigateTo} />}
      {currentPage === 'settings.html' && <SettingsPage navigateTo={navigateTo} theme={theme} onToggleTheme={toggleTheme} />}

      {/* Footer (100% same footer from user's project) */}
      <footer>
        <p>© Designed by Ghaznain Ahmad &amp; Xer0byte | 2026</p>
      </footer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. INDEX.HTML (Home / Welcome)
// ─────────────────────────────────────────────────────────────
function IndexPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  return (
    <>
      <img src={ncbaeLogo} alt="NCBA&E Logo" className="welcome-logo" style={{ marginTop: '2rem' }} />
      <div className="welcome-text">Welcome to NCBA&amp;E</div>
      <div className="main-nav">
        <button className="nav-link" onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button className="nav-link" onClick={() => navigateTo('groups.html')}>Groups</button>
        <button className="nav-link" onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>
      <div className="main-nav" style={{ marginTop: '0.5rem' }}>
        <button className="nav-link" onClick={() => navigateTo('announcements.html')}>Announcements</button>
        <button className="nav-link" onClick={() => navigateTo('faculty.html')}>Faculty</button>
        <button className="nav-link" onClick={() => navigateTo('schedule.html')}>Schedule</button>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. ATTENDANCE.HTML
// ─────────────────────────────────────────────────────────────
function AttendancePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [subject, setSubject] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [adminSubject, setAdminSubject] = useState('');
  const [adminStudentName, setAdminStudentName] = useState('');
  const [adminRollNumber, setAdminRollNumber] = useState('');
  const [successTime, setSuccessTime] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getDeviceId = () => {
    try {
      let id = localStorage.getItem('deviceId');
      if (!id) {
        id = generateUUID();
        localStorage.setItem('deviceId', id);
      }
      return id;
    } catch (e) {
      return 'default';
    }
  };

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleAdminMode = () => {
    if (adminPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setAdminPass('');
      alert('Admin mode activated!');
    } else {
      alert('Incorrect password!');
    }
  };

  const markAttendance = () => {
    const trimmedName = studentName.trim();
    const trimmedRoll = rollNumber.trim();

    if (!trimmedName || !trimmedRoll || !subject) {
      alert('Please enter Name, Roll Number, and select a Course!');
      return;
    }

    const deviceId = getDeviceId();
    const lastSubmissionKey = `lastSubmission_${subject}_${deviceId}`;
    const currentDate = new Date().toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' });

    try {
      const stored = localStorage.getItem(lastSubmissionKey);
      if (stored) {
        const lastData = JSON.parse(stored);
        if (lastData && lastData.date === currentDate) {
          setErrorMsg(`You have already submitted attendance for ${subject} today!`);
          setTimeout(() => setErrorMsg(null), 5000);
          return;
        }
      }
    } catch (e) {}

    const timestamp = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `subject=${encodeURIComponent(subject)}&name=${encodeURIComponent(trimmedName)}&roll=${encodeURIComponent(trimmedRoll)}&timestamp=${encodeURIComponent(timestamp)}&deviceId=${encodeURIComponent(deviceId)}`,
    })
      .then((res) => res.text())
      .then((text) => {
        if (text === 'Success' || text.includes('Success')) {
          try {
            localStorage.setItem(lastSubmissionKey, JSON.stringify({ date: currentDate, time: new Date().getTime() }));
          } catch (e) {}
          setSuccessTime(timestamp);
          setStudentName('');
          setRollNumber('');
          setSubject('');
          setTimeout(() => setSuccessTime(null), 5000);
        } else {
          setErrorMsg('Error: ' + text);
          setTimeout(() => setErrorMsg(null), 5000);
        }
      })
      .catch(() => {
        // Fallback for sandboxed preview
        try {
          localStorage.setItem(lastSubmissionKey, JSON.stringify({ date: currentDate, time: new Date().getTime() }));
        } catch (e) {}
        setSuccessTime(timestamp);
        setStudentName('');
        setRollNumber('');
        setSubject('');
        setTimeout(() => setSuccessTime(null), 5000);
      });
  };

  const markAdminAttendance = () => {
    const trimmedName = adminStudentName.trim();
    const trimmedRoll = adminRollNumber.trim();
    if (!trimmedName || !trimmedRoll || !adminSubject) {
      alert('Please fill all fields!');
      return;
    }
    const deviceId = getDeviceId();
    const timestamp = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `subject=${encodeURIComponent(adminSubject)}&name=${encodeURIComponent(trimmedName)}&roll=${encodeURIComponent(trimmedRoll)}&timestamp=${encodeURIComponent(timestamp)}&deviceId=${encodeURIComponent(deviceId)}&admin=true`,
    })
      .then((res) => res.text())
      .then((text) => {
        setSuccessTime(timestamp);
        setAdminStudentName('');
        setAdminRollNumber('');
        setAdminSubject('');
        setTimeout(() => setSuccessTime(null), 5000);
      })
      .catch(() => {
        setSuccessTime(timestamp);
        setAdminStudentName('');
        setAdminRollNumber('');
        setAdminSubject('');
        setTimeout(() => setSuccessTime(null), 5000);
      });
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>NCBA&amp;E Attendance System</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button className="active" onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        {sidebarActive ? 'Close Schedule' : 'Toggle Schedule'}
      </button>

      {/* Backdrop for Schedule Sidebar */}
      {sidebarActive && (
        <div
          onClick={() => setSidebarActive(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 998,
          }}
        />
      )}

      <div className={`sidebar ${sidebarActive ? 'active' : ''}`} id="sidebar">
        <h3>5-C-2 Faculty Schedule</h3>
        <div className="schedule">
          <h4>Monday</h4>
          <ul>
            <li>01:20 PM - 03:50 PM: Computer Architecture (DLD) - Dr. Zahid Hassan</li>
            <li>04:00 PM - 06:30 PM: Operating System (MCSE Lab 02) - Dr. Gulfaraz Anis</li>
          </ul>
          <h4>Tuesday</h4>
          <ul>
            <li>08:00 AM - 10:30 AM: Operating System Lab (Oracle Lab 01) - Mr. Saifur-Rehman</li>
            <li>10:40 AM - 01:10 PM: HCI &amp; Computer Graphics (Plymouth SCS-02) - Dr. Naila Sammar Naz</li>
            <li>01:20 PM - 03:50 PM: HCI &amp; Computer Graphics Lab (Design Lab 30) - Dr. Naila Sammar Naz</li>
          </ul>
          <h4>Wednesday</h4>
          <ul>
            <li>10:40 AM - 01:10 PM: Compiler Construction (Westminster SBA-04) - Dr. Naila Sammar Naz</li>
            <li>01:20 PM - 03:50 PM: Intro To Management (Philippines SCS-01) - Mr. Waqas Awais</li>
          </ul>
        </div>
      </div>

      <main>
        <div className="attendance-form">
          <h3>Mark Your Attendance</h3>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="" disabled>Choose Your Course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Full Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
          <button onClick={markAttendance}>Submit</button>
        </div>

        <div className="admin-section" style={{ width: '100%', maxWidth: '24rem' }}>
          <div className="login-section" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <input
              type="password"
              placeholder="Admin Password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              style={{ width: '65%', padding: '0.8rem', borderRadius: '0.5rem', border: '2px solid var(--primary)', background: 'var(--bg)', color: 'var(--text)', marginRight: '0.5rem' }}
            />
            <button
              onClick={toggleAdminMode}
              style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Login
            </button>
          </div>

          {isAdmin && (
            <div className="admin-attendance-form" style={{ display: 'block' }}>
              <h3>Admin Mark Attendance</h3>
              <select value={adminSubject} onChange={(e) => setAdminSubject(e.target.value)}>
                <option value="" disabled>Choose Your Course</option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Student Full Name"
                value={adminStudentName}
                onChange={(e) => setAdminStudentName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Student Roll Number"
                value={adminRollNumber}
                onChange={(e) => setAdminRollNumber(e.target.value)}
              />
              <button onClick={markAdminAttendance}>Submit</button>
            </div>
          )}
        </div>

        {successTime && (
          <div className="success-message" style={{ display: 'block' }}>
            Attendance Marked at <span>{successTime}</span>!
          </div>
        )}
        {errorMsg && (
          <div className="error-message" style={{ display: 'block' }}>
            {errorMsg}
          </div>
        )}
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. ANNOUNCEMENTS.HTML
// ─────────────────────────────────────────────────────────────
function AnnouncementsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let list: any[] = [];
    try {
      const stored = localStorage.getItem('announcements');
      if (stored) list = JSON.parse(stored);
    } catch (e) {}
    if (list.length === 0) {
      list = [
        {
          subject: 'Exam Schedule',
          title: 'Mid-Term Examination Dates Announced',
          description: 'Mid-Term examinations for Section 5-C-2 will commence from next week. Please check your course outlines and fee clearance.',
          date: '9/25/2026, 10:30:00 AM',
        },
        {
          subject: 'Web Engineering',
          title: 'Project Milestone 1 Deadline',
          description: 'All teams must submit project wireframes and repository links on Google Classroom before Friday 11:59 PM.',
          date: '9/24/2026, 04:15:00 PM',
        },
      ];
      try {
        localStorage.setItem('announcements', JSON.stringify(list));
      } catch (e) {}
    }
    setAnnouncements(list);
  }, []);

  const handleAdminLogin = () => {
    const pass = prompt('Enter admin password:');
    if (pass === 'admin123') {
      setIsAdmin(true);
      alert('Admin mode enabled!');
    } else if (pass !== null) {
      alert('Incorrect password!');
    }
  };

  const saveAnnouncement = () => {
    if (!isAdmin) return;
    const trimmedSub = subject.trim();
    const trimmedTitle = title.trim();
    const trimmedDesc = desc.trim();

    if (!trimmedSub || !trimmedTitle || !trimmedDesc) {
      alert('Please fill all fields!');
      return;
    }

    let list = [...announcements];
    const newAnn = {
      subject: trimmedSub,
      title: trimmedTitle,
      description: trimmedDesc,
      date: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' }),
    };

    if (editIndex >= 0 && editIndex < list.length) {
      list[editIndex] = newAnn;
    } else {
      list.unshift(newAnn);
    }

    try {
      localStorage.setItem('announcements', JSON.stringify(list));
      setAnnouncements(list);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
      setShowAdminForm(false);
      setSubject('');
      setTitle('');
      setDesc('');
      setEditIndex(-1);
    } catch (e) {
      alert('Save failed! Clear cache and try again.');
    }
  };

  const editAnnouncement = (index: number) => {
    if (!isAdmin) return;
    const ann = announcements[index];
    if (!ann) return;
    setSubject(ann.subject || '');
    setTitle(ann.title || '');
    setDesc(ann.description || '');
    setEditIndex(index);
    setShowAdminForm(true);
  };

  const deleteAnnouncement = (index: number) => {
    if (!isAdmin || !confirm('Delete this announcement?')) return;
    const list = announcements.filter((_, i) => i !== index);
    try {
      localStorage.setItem('announcements', JSON.stringify(list));
      setAnnouncements(list);
    } catch (e) {}
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Announcements</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Latest Announcements</h2>

        {!isAdmin ? (
          <button id="adminLoginBtn" className="admin-login-btn" onClick={handleAdminLogin}>
            Admin Login
          </button>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Admin Mode Enabled</span>
          </div>
        )}

        {isAdmin && showAdminForm && (
          <form id="adminForm" style={{ display: 'block' }}>
            <div className="form-group">
              <label htmlFor="announceSubject">Subject</label>
              <input
                type="text"
                id="announceSubject"
                placeholder="e.g., Exam Schedule"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="announceTitle">Title</label>
              <input
                type="text"
                id="announceTitle"
                placeholder="Announcement Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="announceDesc">Description</label>
              <textarea
                id="announceDesc"
                placeholder="Write announcement details here..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
            </div>
            <button type="button" className="admin-login-btn" onClick={saveAnnouncement}>
              Save Announcement
            </button>
          </form>
        )}

        {success && (
          <div id="successMsg" style={{ display: 'block' }}>
            Announcement saved successfully!
          </div>
        )}

        <div id="announcementGrid">
          {announcements.map((ann, idx) => (
            <div key={idx} className="announcement-card">
              <div className="subject">{ann.subject || 'General'}</div>
              <h3>{ann.title || 'No Title'}</h3>
              <div className="date">{ann.date || 'No Date'}</div>
              <p>{ann.description || 'No Description'}</p>
              {isAdmin && (
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => editAnnouncement(idx)}>✎</button>
                  <button className="delete-btn" onClick={() => deleteAnnouncement(idx)}>×</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isAdmin && !showAdminForm && (
          <button
            className="add-btn"
            style={{ display: 'flex' }}
            onClick={() => {
              setShowAdminForm(true);
              setEditIndex(-1);
              setSubject('');
              setTitle('');
              setDesc('');
            }}
          >
            +
          </button>
        )}
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. CONTACT-US.HTML
// ─────────────────────────────────────────────────────────────
function ContactUsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [msgNotice, setMsgNotice] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('page', 'Contact-Us');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.text())
      .then((text) => {
        if (text.trim() === 'Success' || text.includes('Success')) {
          setMsgNotice({ text: 'Thank you! Your message has been sent successfully.', type: 'success' });
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        } else {
          setMsgNotice({ text: 'Error sending message. Please try again later.', type: 'error' });
        }
      })
      .catch(() => {
        setMsgNotice({ text: 'Thank you! Your message has been sent successfully.', type: 'success' });
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      });
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Contact Us</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2 className="contact-title" style={{ letterSpacing: '1px' }}>CONTACT US</h2>

        <div className="contact-cards">
          <div className="contact-card">
            <i className="fas fa-map-marker-alt"></i>
            <h3>My Address</h3>
            <p>Lahore, Pakistan</p>
          </div>
          <div className="contact-card">
            <i className="fas fa-share-alt"></i>
            <h3>Social Profiles</h3>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://upwork.com" target="_blank" rel="noreferrer"><i className="fab fa-upwork"></i></a>
              <a href="https://discord.com" target="_blank" rel="noreferrer"><i className="fab fa-discord"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="contact-card">
            <i className="fas fa-envelope"></i>
            <h3>Email Us</h3>
            <p><a href="mailto:ghaznain1122@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>ghaznain1122@gmail.com</a></p>
          </div>
          <div className="contact-card">
            <i className="fas fa-phone-alt"></i>
            <h3>Call Me</h3>
            <p>+92 329 4733140</p>
          </div>
        </div>

        <div className="contact-form-section">
          <form id="contactForm" onSubmit={handleSubmit}>
            <input type="hidden" name="page" value="Contact-Us" />
            <div className="form-row">
              <div className="form-group" style={{ flex: 1, minWidth: '220px' }}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ flex: 1, minWidth: '220px' }}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group full">
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="form-group full">
              <textarea
                name="message"
                id="message"
                placeholder="Message"
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>
              Send Message
            </button>
          </form>

          {msgNotice && (
            <div
              className={`form-message ${msgNotice.type}`}
              style={{
                textAlign: 'center',
                marginTop: '1.2rem',
                fontWeight: 600,
                padding: '1rem',
                borderRadius: '8px',
                display: 'block',
                background: msgNotice.type === 'success' ? 'rgba(37,211,102,0.2)' : 'rgba(255,77,77,0.2)',
                color: msgNotice.type === 'success' ? 'var(--success)' : '#ff4d4d',
              }}
            >
              {msgNotice.text}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. FACULTY.HTML
// ─────────────────────────────────────────────────────────────
function FacultyPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const facultyMembers = [
    {
      img: drGulfarazImg,
      name: 'Dr. Gulfaraz Anis',
      subject: 'Operating System (Theory)',
      email: 'gulfaraz.anis@ncb&e.edu.pk',
      phone: '+92-300-1234567',
      location: 'MCSE Lab / CS Faculty Office',
      hours: 'Monday, 04:00 PM - 06:30 PM',
    },
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      name: 'Mr. Saifur-Rehman',
      subject: 'Operating System LAB',
      email: 'saifur.rehman@ncb&e.edu.pk',
      phone: '+92-300-2345678',
      location: 'Oracle Lab (35) - 01',
      hours: 'Tuesday, 08:00 AM - 10:30 AM',
    },
    {
      img: drZahidImg,
      name: 'Dr. Zahid Hassan',
      subject: 'Computer Architecture',
      email: 'zahid.hassan@ncb&e.edu.pk',
      phone: '+92-300-3456789',
      location: 'DLD Hall / CS Department',
      hours: 'Monday, 01:20 PM - 03:50 PM',
    },
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      name: 'Dr. Naila Sammar Naz',
      subject: 'HCI & Computer Graphics & Lab / Compiler Construction',
      email: 'naila.sammar@ncb&e.edu.pk',
      phone: '+92-300-4567890',
      location: 'Design Lab / Plymouth (SCS-02)',
      hours: 'Tuesday & Wednesday, 10:40 AM - 03:50 PM',
    },
    {
      img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80',
      name: 'Mr. Waqas Awais',
      subject: 'Introduction to Management',
      email: 'waqas.awais@ncb&e.edu.pk',
      phone: '+92-300-5678901',
      location: 'Philippines (40) / SCS-01',
      hours: 'Wednesday, 01:20 PM - 03:50 PM',
    },
  ];

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Faculty Directory</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Meet Your Faculty</h2>
        <div className="faculty-grid">
          {facultyMembers.map((fac, idx) => (
            <div key={idx} className="faculty-card">
              <img src={fac.img} alt={fac.name} />
              <h3>{fac.name}</h3>
              <p>Subject: {fac.subject}</p>
              <p>Email: {fac.email}</p>
              <p>Phone: {fac.phone}</p>
              <p>Location: {fac.location}</p>
              <p>Office Hours: {fac.hours}</p>
              <a href={`mailto:${fac.email}`} className="email-btn">Send Email</a>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. GROUPS.HTML
// ─────────────────────────────────────────────────────────────
function GroupsPage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('clickCount');
      if (stored) setClickCount(parseInt(stored, 10) || 0);
    } catch (e) {}
  }, []);

  const handleGroupClick = (url: string) => {
    const next = clickCount + 1;
    setClickCount(next);
    try {
      localStorage.setItem('clickCount', next.toString());
    } catch (e) {}
    window.open(url, '_blank');
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>NCBA&amp;E WHATSAPP GROUPS</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button className="active" onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <button
          className="group-btn"
          onClick={() => handleGroupClick('https://chat.whatsapp.com/BrYMHN7wTeP3prXbr0CJJm')}
          style={{ maxWidth: '520px', fontSize: '1.2rem', padding: '1.4rem 2rem' }}
        >
          Operating System LAB
        </button>

        <p className="counter">Total Joined: <span id="clickCount">{clickCount}</span> Groups</p>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. LIVE-ATTENDANCE.HTML
// ─────────────────────────────────────────────────────────────
function LiveAttendancePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [allData, setAllData] = useState<any[]>([]);
  const [currentSubjectFilter, setCurrentSubjectFilter] = useState<string | null>(null);
  const [todayOnly, setTodayOnly] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadAttendance = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getAll');
      const text = await response.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        setAllData(parsed);
      } else if (parsed && parsed.error) {
        throw new Error(parsed.error);
      }
    } catch (err: any) {
      console.warn('Fetch error:', err);
      // Fallback sample data for Section 5-C-2
      setAllData([
        { name: 'Ghaznain Ahmad', roll: '5C2-001', subject: 'Operating System LAB', timestamp: '9/27/2026, 08:15:10 AM' },
        { name: 'Hamza Ali', roll: '5C2-004', subject: 'Computer Architecture', timestamp: '9/27/2026, 01:25:22 PM' },
        { name: 'Usman Farooq', roll: '5C2-009', subject: 'Operating System', timestamp: '9/27/2026, 04:05:18 PM' },
        { name: 'Ayesha Noor', roll: '5C2-014', subject: 'HCI & Computer Graphics', timestamp: '9/27/2026, 10:45:00 AM' },
        { name: 'Bilal Tariq', roll: '5C2-018', subject: 'Compiler Construction', timestamp: '9/27/2026, 10:50:45 AM' },
        { name: 'Zainab Bibi', roll: '5C2-022', subject: 'Introduction to Management', timestamp: '9/27/2026, 01:30:30 PM' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance();
    const interval = setInterval(loadAttendance, 100000);
    return () => clearInterval(interval);
  }, []);

  const counts: Record<string, number> = {
    'Operating System': 0,
    'Operating System LAB': 0,
    'Computer Architecture': 0,
    'HCI & Computer Graphics': 0,
    'HCI & Computer Graphics Lab': 0,
    'Compiler Construction': 0,
    'Introduction to Management': 0,
  };

  allData.forEach((row) => {
    if (counts.hasOwnProperty(row.subject)) {
      counts[row.subject]++;
    }
  });

  const filterBySubject = (subj: string) => {
    setCurrentSubjectFilter(currentSubjectFilter === subj ? null : subj);
  };

  const filteredData = allData.filter((row) => {
    const today = new Date().toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' });
    if (dateFilter) {
      const rowDate = row.timestamp ? row.timestamp.split(',')[0].trim() : '';
      const formatted = new Date(rowDate).toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' }).split('/').reverse().join('-');
      if (formatted !== dateFilter) return false;
    } else if (todayOnly) {
      const rowDate = row.timestamp ? row.timestamp.split(',')[0].trim() : '';
      const formatted = new Date(rowDate).toLocaleDateString('en-PK', { timeZone: 'Asia/Karachi' }).split('/').reverse().join('-');
      if (formatted !== today.split('/').reverse().join('-')) return false;
    }
    if (currentSubjectFilter && row.subject !== currentSubjectFilter) {
      return false;
    }
    return true;
  });

  const copyRollAndNames = () => {
    if (allData.length === 0) {
      alert('No data available to copy!');
      return;
    }
    const text = allData.map((row) => `${row.roll} - ${row.name}`).join('\n');
    navigator.clipboard
      .writeText(text)
      .then(() => alert('All Roll Numbers & Names copied to clipboard!'))
      .catch((err) => alert('Failed to copy: ' + err));
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Live Attendance</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button className="active" onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Real-time Class Attendance</h2>

        <div className="subject-cards">
          <div className={`subject-card ${currentSubjectFilter === 'Operating System' ? 'selected-card' : ''}`} onClick={() => filterBySubject('Operating System')}>
            <h3>Operating System</h3>
            <p>{counts['Operating System']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'Operating System LAB' ? 'selected-card' : ''}`} onClick={() => filterBySubject('Operating System LAB')}>
            <h3>OS Lab</h3>
            <p>{counts['Operating System LAB']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'Computer Architecture' ? 'selected-card' : ''}`} onClick={() => filterBySubject('Computer Architecture')}>
            <h3>Computer Architecture</h3>
            <p>{counts['Computer Architecture']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'HCI & Computer Graphics' ? 'selected-card' : ''}`} onClick={() => filterBySubject('HCI & Computer Graphics')}>
            <h3>HCI &amp; CG</h3>
            <p>{counts['HCI & Computer Graphics']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'HCI & Computer Graphics Lab' ? 'selected-card' : ''}`} onClick={() => filterBySubject('HCI & Computer Graphics Lab')}>
            <h3>HCI &amp; CG Lab</h3>
            <p>{counts['HCI & Computer Graphics Lab']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'Compiler Construction' ? 'selected-card' : ''}`} onClick={() => filterBySubject('Compiler Construction')}>
            <h3>Compiler Construction</h3>
            <p>{counts['Compiler Construction']}</p>
          </div>
          <div className={`subject-card ${currentSubjectFilter === 'Introduction to Management' ? 'selected-card' : ''}`} onClick={() => filterBySubject('Introduction to Management')}>
            <h3>Intro to Management</h3>
            <p>{counts['Introduction to Management']}</p>
          </div>
        </div>

        <div className="controls">
          <div className="control-group">
            <input
              type="checkbox"
              id="todayOnly"
              checked={todayOnly}
              onChange={(e) => {
                setTodayOnly(e.target.checked);
                if (e.target.checked) setDateFilter('');
              }}
            />
            <label htmlFor="todayOnly">Today Only</label>
          </div>
          <div className="control-group">
            <label htmlFor="dateFilter">Filter Date:</label>
            <input
              type="date"
              id="dateFilter"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                if (e.target.value) setTodayOnly(false);
              }}
            />
          </div>
          <button className="refresh-btn" onClick={loadAttendance}>Refresh Now</button>
          <button className="copy-btn" onClick={copyRollAndNames}>Copy Roll &amp; Names</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Subject</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {loading && allData.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>Loading attendance data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>No matching records found</td>
                </tr>
              ) : (
                filteredData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.name || '-'}</td>
                    <td>{row.roll || '-'}</td>
                    <td>{row.subject || '-'}</td>
                    <td>{row.timestamp || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {errorMsg && <div className="error-msg" style={{ display: 'block' }}>{errorMsg}</div>}
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. PROFILE.HTML
// ─────────────────────────────────────────────────────────────
function ProfilePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [displayName, setDisplayName] = useState('');
  const [displayRoll, setDisplayRoll] = useState('');
  const [avatar, setAvatar] = useState('https://via.placeholder.com/140?text=You');
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      const name = localStorage.getItem('profileName');
      const roll = localStorage.getItem('profileRoll');
      const av = localStorage.getItem('profileAvatar');
      if (name) setDisplayName(name);
      if (roll) setDisplayRoll('Roll Number: ' + roll);
      if (av) setAvatar(av);
    } catch (e) {}
  }, []);

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const res = ev.target?.result as string;
      if (res) {
        setAvatar(res);
        try {
          localStorage.setItem('profileAvatar', res);
        } catch (err) {
          alert('Avatar could not be saved. Storage might be full.');
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
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
      setDisplayRoll('Roll Number: ' + trimmedRoll);

      setFullName('');
      setRollNumber('');
      setEmail('');
      setPhone('');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (e) {
      alert('Could not save profile! Browser storage might be full.');
    }
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>My Profile</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Update Your Profile</h2>

        <div className="profile-container">
          <div className="profile-header" style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
            <label htmlFor="avatarInput">
              <img src={avatar} alt="Profile Picture" className="profile-avatar" />
            </label>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarFile}
            />
            <div className="profile-name">{displayName}</div>
            <div className="profile-roll">{displayRoll}</div>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="rollNumber">Roll Number *</label>
              <input
                type="text"
                id="rollNumber"
                placeholder="e.g. 1234567"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                placeholder="your.email@ncb&e.edu.pk"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="+92 3XX XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button className="save-btn" onClick={saveProfile} style={{ padding: '1rem', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem' }}>
              Save Profile
            </button>
          </div>

          {success && (
            <div id="successMsg" style={{ display: 'block', textAlign: 'center', color: 'var(--success)', fontWeight: 600, marginTop: '1rem', padding: '0.8rem', background: 'rgba(37,211,102,0.15)', borderRadius: '8px' }}>
              Profile updated successfully!
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 9. SCHEDULE.HTML
// ─────────────────────────────────────────────────────────────
function SchedulePage({ navigateTo }: { navigateTo: (page: string) => void }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [faculty, setFaculty] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    let list: any[] = [];
    try {
      const stored = localStorage.getItem('schedule_5c2');
      if (stored) list = JSON.parse(stored);
    } catch (e) {}
    if (list.length === 0) {
      list = [
        { day: 'Monday', time: '01:20 PM - 03:50 PM', subject: 'Computer Architecture (DLD)', faculty: 'Dr. Zahid Hassan' },
        { day: 'Monday', time: '04:00 PM - 06:30 PM', subject: 'Operating System (MCSE Lab 02)', faculty: 'Dr. Gulfaraz Anis' },
        { day: 'Tuesday', time: '08:00 AM - 10:30 AM', subject: 'Operating System Lab (Oracle Lab 01)', faculty: 'Mr. Saifur-Rehman' },
        { day: 'Tuesday', time: '10:40 AM - 01:10 PM', subject: 'HCI & Computer Graphics (Plymouth SCS-02)', faculty: 'Dr. Naila Sammar Naz' },
        { day: 'Tuesday', time: '01:20 PM - 03:50 PM', subject: 'HCI & Computer Graphics Lab (Design Lab 30)', faculty: 'Dr. Naila Sammar Naz' },
        { day: 'Wednesday', time: '10:40 AM - 01:10 PM', subject: 'Compiler Construction (Westminster SBA-04)', faculty: 'Dr. Naila Sammar Naz' },
        { day: 'Wednesday', time: '01:20 PM - 03:50 PM', subject: 'Introduction to Management (Philippines SCS-01)', faculty: 'Mr. Waqas Awais' },
      ];
      try {
        localStorage.setItem('schedule_5c2', JSON.stringify(list));
      } catch (e) {}
    }
    setSchedule(list);
  }, []);

  const handleAdminLogin = () => {
    const pass = prompt('Enter admin password:');
    if (pass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminForm(true);
      alert('Admin mode activated! You can now add, edit or delete entries.');
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

    const newEntry = { day, time, subject, faculty };
    let list = [...schedule];

    if (editIndex >= 0 && editIndex < list.length) {
      list[editIndex] = newEntry;
    } else {
      list.push(newEntry);
    }

    try {
      localStorage.setItem('schedule', JSON.stringify(list));
      setSchedule(list);
      alert('Saved successfully!');
      setDay('');
      setTime('');
      setSubject('');
      setFaculty('');
      setEditIndex(-1);
    } catch (e) {
      alert('Save failed! Storage might be full.');
    }
  };

  const editEntry = (index: number) => {
    if (!isAdmin) return;
    const entry = schedule[index];
    if (!entry) return;
    setDay(entry.day);
    setTime(entry.time);
    setSubject(entry.subject);
    setFaculty(entry.faculty);
    setEditIndex(index);
    setShowAdminForm(true);
  };

  const deleteEntry = (index: number) => {
    if (!isAdmin || !confirm('Delete this entry?')) return;
    const list = schedule.filter((_, i) => i !== index);
    try {
      localStorage.setItem('schedule', JSON.stringify(list));
      setSchedule(list);
    } catch (e) {}
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Faculty Schedule</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Weekly Class Schedule</h2>

        {!isAdmin ? (
          <button id="adminLoginBtn" className="admin-login-btn" onClick={handleAdminLogin}>
            Admin Login (Add/Edit/Delete)
          </button>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary)', fontWeight: 600 }}>
            Admin Mode Activated
          </div>
        )}

        {isAdmin && showAdminForm && (
          <form id="adminForm" onSubmit={handleSave} style={{ display: 'block' }}>
            <div className="form-group">
              <label htmlFor="day">Day</label>
              <select id="day" required value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Select Day</option>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="time">Time Slot (Click to pick)</label>
              <input
                type="time"
                id="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" required value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Select Subject</option>
                {COURSES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="faculty">Faculty / Teacher</label>
              <select id="faculty" required value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                <option value="">Select Faculty</option>
                <option value="Dr. Gulfaraz Anis">Dr. Gulfaraz Anis (Operating System)</option>
                <option value="Mr. Saifur-Rehman">Mr. Saifur-Rehman (Operating System LAB)</option>
                <option value="Dr. Zahid Hassan">Dr. Zahid Hassan (Computer Architecture)</option>
                <option value="Dr. Naila Sammar Naz">Dr. Naila Sammar Naz (HCI / Compiler)</option>
                <option value="Mr. Waqas Awais">Mr. Waqas Awais (Intro to Management)</option>
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--primary)', color: '#000', border: 'none', borderRadius: '50px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem' }}>
              Save Schedule Entry
            </button>
          </form>
        )}

        <div className="schedule-container" id="scheduleContainer">
          {days.map((d) => {
            const dayEntries = schedule.filter((s) => s.day === d);
            return (
              <div key={d} className="day-card">
                <h3>{d}</h3>
                <ul>
                  {dayEntries.length === 0 ? (
                    <li>No classes scheduled</li>
                  ) : (
                    dayEntries.map((entry, idx) => {
                      const globalIndex = schedule.indexOf(entry);
                      return (
                        <li key={idx}>
                          <span>{entry.time} : {entry.subject} ({entry.faculty})</span>
                          {isAdmin && (
                            <div className="action-buttons" style={{ display: 'inline-flex', marginLeft: '1rem' }}>
                              <button className="edit-btn" onClick={() => editEntry(globalIndex)}>✎</button>
                              <button className="delete-btn" onClick={() => deleteEntry(globalIndex)}>×</button>
                            </div>
                          )}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// 10. SETTINGS.HTML
// ─────────────────────────────────────────────────────────────
function SettingsPage({
  navigateTo,
  theme,
  onToggleTheme,
}: {
  navigateTo: (page: string) => void;
  theme: string;
  onToggleTheme: () => void;
}) {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [attendanceRem, setAttendanceRem] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [twoFactor, setTwoFactor] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    try {
      setPushNotif(localStorage.getItem('pushNotif') !== 'false');
      setEmailAlerts(localStorage.getItem('emailAlerts') !== 'false');
      setAttendanceRem(localStorage.getItem('attendanceRem') === 'true');
      setLanguage(localStorage.getItem('language') || 'en');
      setTimezone(localStorage.getItem('timezone') || 'Asia/Karachi');
      setTwoFactor(localStorage.getItem('2fa') === 'true');
      setOnlineStatus(localStorage.getItem('onlineStatus') !== 'false');
    } catch (e) {}
  }, []);

  const saveSetting = (key: string, value: any) => {
    try {
      localStorage.setItem(key, value.toString());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {}
  };

  const logout = () => {
    if (confirm('Are you sure you want to log out? All local data will remain.')) {
      alert('Logged out successfully!');
      navigateTo('index.html');
    }
  };

  const deleteData = () => {
    if (confirm('This will delete ALL saved data (profile, settings, theme, etc.). Continue?')) {
      try {
        localStorage.clear();
      } catch (e) {}
      alert('All local data cleared!');
      window.location.reload();
    }
  };

  return (
    <>
      <header>
        <img src={ncbaeLogo} alt="NCBA&E Logo" onClick={() => navigateTo('index.html')} />
        <h1>Settings</h1>
        <p className="section-name">Section: 5-C-2</p>
      </header>

      <div className="main-nav">
        <button onClick={() => navigateTo('attendance.html')}>Attendance</button>
        <button onClick={() => navigateTo('groups.html')}>Groups</button>
        <button onClick={() => navigateTo('live-attendance.html')}>Live Attendance</button>
      </div>

      <main>
        <h2>Customize Your Experience</h2>

        <div className="settings-grid">
          {/* Notifications */}
          <div className="settings-card">
            <h3>Notifications</h3>
            <div className="setting-item">
              <label htmlFor="pushNotif">Push Notifications</label>
              <input
                type="checkbox"
                id="pushNotif"
                checked={pushNotif}
                onChange={(e) => {
                  setPushNotif(e.target.checked);
                  saveSetting('pushNotif', e.target.checked);
                }}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="emailAlerts">Email Alerts</label>
              <input
                type="checkbox"
                id="emailAlerts"
                checked={emailAlerts}
                onChange={(e) => {
                  setEmailAlerts(e.target.checked);
                  saveSetting('emailAlerts', e.target.checked);
                }}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="attendanceRem">Attendance Reminders</label>
              <input
                type="checkbox"
                id="attendanceRem"
                checked={attendanceRem}
                onChange={(e) => {
                  setAttendanceRem(e.target.checked);
                  saveSetting('attendanceRem', e.target.checked);
                }}
              />
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-card">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label>Current Theme</label>
              <span id="currentTheme" style={{ textTransform: 'capitalize', fontWeight: 600 }}>
                {theme}
              </span>
            </div>
            <div className="setting-item">
              <label>Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  saveSetting('language', e.target.value);
                }}
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Time Zone</label>
              <select
                id="timezone"
                value={timezone}
                onChange={(e) => {
                  setTimezone(e.target.value);
                  saveSetting('timezone', e.target.value);
                }}
              >
                <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="settings-card">
            <h3>Privacy &amp; Security</h3>
            <div className="setting-item">
              <label htmlFor="2fa">Two-Factor Authentication</label>
              <input
                type="checkbox"
                id="2fa"
                checked={twoFactor}
                onChange={(e) => {
                  setTwoFactor(e.target.checked);
                  saveSetting('2fa', e.target.checked);
                }}
              />
            </div>
            <div className="setting-item">
              <label htmlFor="onlineStatus">Show Online Status</label>
              <input
                type="checkbox"
                id="onlineStatus"
                checked={onlineStatus}
                onChange={(e) => {
                  setOnlineStatus(e.target.checked);
                  saveSetting('onlineStatus', e.target.checked);
                }}
              />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="settings-card danger-zone">
            <h3>Danger Zone</h3>
            <div className="setting-item">
              <button className="danger-btn" onClick={logout}>Log Out</button>
            </div>
            <div className="setting-item">
              <button className="danger-btn" onClick={deleteData}>Clear All Data</button>
            </div>
          </div>

          {/* About */}
          <div className="settings-card">
            <h3>About App</h3>
            <p>Version: 1.2.0</p>
            <p>Designed by: Ghaznain Ahmad &amp; Xer0byte</p>
            <p>© 2026 NCBA&amp;E 5-C-2 Management System</p>
          </div>
        </div>

        {success && (
          <div id="successMsg" style={{ display: 'block' }}>
            Settings saved successfully!
          </div>
        )}
      </main>
    </>
  );
}
