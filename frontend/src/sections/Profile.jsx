import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import './Profile.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Profile() {
  const { data, loading } = useApi(api.profile.get);

  // Fall back to static data while loading or if API unavailable
  const profile = data || portfolioData.profile;

  return (
    <section id="profile" className="profile-section">
      <div className="container">
        <div className="profile-content">
          <div className="profile-text">
            <motion.div {...fadeUp(0.2)} className="profile-greeting">
              <span className="greeting-dot" />
              Available for opportunities
            </motion.div>

            <motion.h1 {...fadeUp(0.35)} className="profile-name">
              Hi, I'm <br />
              <span className="name-gradient">{loading ? '...' : profile.name}</span>
            </motion.h1>

            <motion.div {...fadeUp(0.5)} className="profile-title">
              <span className="title-mono">&lt;</span>
              {profile.title}
              <span className="title-mono">/&gt;</span>
            </motion.div>

            <motion.p {...fadeUp(0.65)} className="profile-bio">
              {profile.bio}
            </motion.p>

            <motion.div {...fadeUp(0.8)} className="profile-actions">
              <a href="#projects" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                View Projects
              </a>
              <a href={profile.cvUrl} className="btn btn-outline" download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                Download CV
              </a>
              <a href="#contact" className="btn btn-ghost" onClick={e => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>
                Contact Me
              </a>
            </motion.div>

            <motion.div {...fadeUp(0.95)} className="profile-social">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href={`mailto:${profile.email}`} className="social-link" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="profile-visual"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="avatar-container">
              <div className="avatar-ring" />
              <div className="avatar-ring avatar-ring-2" />
              <div className="avatar-inner">
                <div className="avatar-placeholder">
                  <span>{profile.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <div className="avatar-badge badge-1">
                <span>⚡</span> MERN
              </div>
              <div className="avatar-badge badge-2">
                <span>🚀</span> 3yr exp
              </div>
              <div className="avatar-badge badge-3">
                <span>✓</span> Open to work
              </div>
            </div>

            <div className="profile-stats">
              {[
                { label: 'Projects', value: '20+' },
                { label: 'Experience', value: '3yr' },
                { label: 'Commits', value: '1k+' },
              ].map(({ label, value }) => (
                <div key={label} className="stat-item">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <div className="scroll-line" />
          <span>scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
