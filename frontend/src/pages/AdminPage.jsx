import { useState } from 'react';
import './Admin.css';

import DashboardSection  from './sections/DashboardSection';
import ProjectsSection   from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import EducationSection  from './sections/EducationSection';
import SkillsSection     from './sections/SkillsSection';
import FormationsSection from './sections/FormationsSection';
import MessagesSection   from './sections/MessagesSection';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',    icon: '🏠' },
  { id: 'projects',   label: 'Projects',     icon: '🗂' },
  { id: 'experience', label: 'Experience',   icon: '💼' },
  { id: 'education',  label: 'Education',    icon: '🎓' },
  { id: 'skills',     label: 'Skills',       icon: '⚡' },
  { id: 'formations', label: 'Formations',   icon: '📜' },
  { id: 'messages',   label: 'Messages',     icon: '✉️' },
];

const TITLES = {
  dashboard:  'Dashboard',
  projects:   'Projects',
  experience: 'Work Experience',
  education:  'Education',
  skills:     'Skills',
  formations: 'Formations & Certifications',
  messages:   'Contact Messages',
};

export default function AdminPage() {
  const [active, setActive]       = useState('dashboard');
  const [sidebarOpen, setSidebar] = useState(false);

  const navigate = (id) => {
    setActive(id);
    setSidebar(false);
  };

  const renderSection = () => {
    switch (active) {
      case 'dashboard':  return <DashboardSection onNavigate={navigate} />;
      case 'projects':   return <ProjectsSection />;
      case 'experience': return <ExperienceSection />;
      case 'education':  return <EducationSection />;
      case 'skills':     return <SkillsSection />;
      case 'formations': return <FormationsSection />;
      case 'messages':   return <MessagesSection />;
      default:           return null;
    }
  };

  return (
    <div className="admin-layout">
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
          onClick={() => setSidebar(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          <a href="/" onClick={e => { e.preventDefault(); window.location.href = '/'; }}>
            <span style={{ background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>&lt;AM/&gt;</span>
            <span className="admin-logo-badge">ADMIN</span>
          </a>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Content</div>

          {NAV.map(item => (
            <button
              key={item.id}
              className={`sidebar-link ${active === item.id ? 'active' : ''}`}
              onClick={() => navigate(item.id)}
            >
              <span className="sidebar-link-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <a href="/" className="sidebar-back-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back to Portfolio
          </a>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <button className="sidebar-toggle" onClick={() => setSidebar(!sidebarOpen)} aria-label="Toggle sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <span className="admin-topbar-title">{TITLES[active]}</span>
          <span className="admin-topbar-sub">
            {active !== 'dashboard' && active !== 'messages' ? '— Create, edit & delete' : ''}
          </span>

          <div className="admin-topbar-actions">
            <a
              href="/"
              className="btn btn-ghost"
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              ← View Portfolio
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
