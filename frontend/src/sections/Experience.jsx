import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import './Experience.css';

const { experience } = portfolioData;

export default function Experience() {
  const [ref, inView] = useInView();

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

        <div className="timeline">
          {experience.map((job, i) => (
            <motion.div
              key={job.id}
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
