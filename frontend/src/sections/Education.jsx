import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import './Education.css';

const { education } = portfolioData;

export default function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="section education-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Learning</div>
          <h2 className="section-title">My <span>Education</span></h2>
        </motion.div>

        <div className="edu-grid">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="edu-card card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="edu-icon">🎓</div>
              <div className="edu-years">{edu.years}</div>
              <h3 className="edu-degree">{edu.degree}</h3>
              <div className="edu-school">{edu.school}</div>
              <p className="edu-desc">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
