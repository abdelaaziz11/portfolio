import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import './About.css';

const { about } = portfolioData;

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section about-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">About Me</div>
          <h2 className="section-title">Crafting <span>Digital Experiences</span></h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text-block"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="about-main-text">{about.text}</p>

            <div className="about-highlights">
              {about.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <span className="highlight-check">✓</span>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-terminal"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="terminal-bar">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
              <span className="t-file">profile.json</span>
            </div>
            <div className="terminal-body">
              <pre className="terminal-code">
{`{
  "name": "Abdelaziz Khouda",
  "role": "Full-Stack Developer",
  "location": "Rabat, MA",
  "stack": ["React", "Node.js", 
            "MongoDB", "Express"],
  "passion": "Building scalable 
              web applications",
  "status": "Open to work",
  "availability": "Immediate",
  "coffee": true
}`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
