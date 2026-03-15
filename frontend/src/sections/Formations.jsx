import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import { portfolioData } from '../data/portfolioData';
import './Formations.css';

export default function Formations() {
  const [ref, inView] = useInView();
  const { data, loading, error } = useApi(api.formations.getAll);

  const formations = data || portfolioData.formations;

  return (
    <section id="formations" className="section formations-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Continuous Learning</div>
          <h2 className="section-title">Certifications & <span>Formations</span></h2>
        </motion.div>

        {error && (
          <p style={{ color: 'var(--clr-accent)', textAlign: 'center', marginBottom: '1rem' }}>
            ⚠ Could not load formations from server — showing cached data.
          </p>
        )}

        <div className="formations-grid">
          {(loading ? portfolioData.formations : formations).map((f, i) => (
            <motion.div
              key={f._id || f.id}
              className="formation-card card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <div className="formation-icon-wrap">
                <div className="formation-icon">{f.icon}</div>
              </div>
              <div className="formation-body">
                <div className="formation-year">{f.year}</div>
                <h3 className="formation-name">{f.name}</h3>
                <div className="formation-org">{f.org}</div>
                <div className="formation-skills">
                  {f.skills.map(s => <span key={s} className="tag">{s}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
