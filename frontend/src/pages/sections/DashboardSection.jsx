import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { AdminLoading } from '../AdminUI';

const RESOURCES = [
  { key: 'projects',   label: 'Projects',    icon: '🗂',  color: '#00e5ff' },
  { key: 'experience', label: 'Experiences', icon: '💼',  color: '#4f8eff' },
  { key: 'education',  label: 'Education',   icon: '🎓',  color: '#8b5cf6' },
  { key: 'skills',     label: 'Skills',      icon: '⚡',  color: '#f59e0b' },
  { key: 'formations', label: 'Formations',  icon: '📜',  color: '#00e57b' },
  { key: 'contact',    label: 'Messages',    icon: '✉️',  color: '#ff6b6b' },
];

export default function DashboardSection({ onNavigate }) {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(
      RESOURCES.map(r => api[r.key].getAll().then(res => [r.key, (res.data || []).length]))
    ).then(results => {
      setCounts(Object.fromEntries(results));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <AdminLoading />;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          Welcome back 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Manage all your portfolio content from here. Click a card to jump to that section.
        </p>
      </div>

      <div className="admin-stats-grid">
        {RESOURCES.map(r => (
          <div
            key={r.key}
            className="admin-stat-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate(r.key)}
          >
            <div className="admin-stat-icon">{r.icon}</div>
            <div className="admin-stat-value">{counts[r.key] ?? 0}</div>
            <div className="admin-stat-label">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Quick tips */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginTop: 8 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
          Quick Guide
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['➕ Create', 'Fill in the form on the right side and click the Create button'],
            ['✏️ Edit', 'Click the edit icon on any list item to load it into the form'],
            ['🗑️ Delete', 'Click the delete icon, then confirm in the popup dialog'],
            ['🔄 Live', 'All changes are immediately saved to MongoDB and live on your portfolio'],
          ].map(([title, desc]) => (
            <div key={title} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-cyan)', whiteSpace: 'nowrap', marginTop: 1 }}>{title}</span>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
