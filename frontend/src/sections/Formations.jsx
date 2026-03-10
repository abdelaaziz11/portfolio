import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import './Formations.css';

const { formations } = portfolioData;

export default function Formations() {
  const [ref, inView] = useInView();

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

        <div className="formations-grid">
          {formations.map((f, i) => (
            <motion.div
              key={f.id}
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
