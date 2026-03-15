import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
  const [ref, inView] = useInView();
  const { data, loading, error } = useApi(api.experience.getAll);

  // Fall back to static data if API fails or while loading
  const experience = data || portfolioData.experience;

  return (
    <section id="experience" className="section experience-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Career</div>
          <h2 className="section-title">Work <span>Experience</span></h2>
        </motion.div>

        {error && (
          <p style={{ color: 'var(--clr-accent)', textAlign: 'center', marginBottom: '1rem' }}>
            ⚠ Could not load experience from server — showing cached data.
          </p>
        )}

        <div className="timeline">
          {(loading ? portfolioData.experience : experience).map((job, i) => (
            <motion.div
              key={job._id || job.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="timeline-connector">
                <div className="timeline-dot" />
                {i < experience.length - 1 && <div className="timeline-line" />}
              </div>
              <div className="timeline-card card">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-role">{job.role}</h3>
                    <div className="exp-company">{job.company}</div>
                  </div>
                  <div className="exp-duration">{job.duration}</div>
                </div>
                <p className="exp-description">{job.description}</p>
                <div className="exp-tech">
                  {job.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
