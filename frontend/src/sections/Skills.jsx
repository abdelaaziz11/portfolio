import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import './Skills.css';

const { skills } = portfolioData;

const categoryIcons = {
  Frontend: '🎨',
  Backend: '⚙️',
  Databases: '🗄️',
  DevOps: '🐳',
  Tools: '🔧',
  Deployment: '🚀',
  Languages: '💻',
};

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="skill-item">
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-level">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView(0.05);
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const categories = Object.keys(skills);

  return (
    <section id="skills" className="section skills-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Expertise</div>
          <h2 className="section-title">Technical <span>Skills</span></h2>
        </motion.div>

        <motion.div
          className="skills-tabs"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`skills-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span>{categoryIcons[cat]}</span>
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          className="skills-panel card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="skills-panel-header">
            <span className="skills-panel-icon">{categoryIcons[activeCategory]}</span>
            <h3>{activeCategory}</h3>
            <span className="skills-count">{skills[activeCategory].length} skills</span>
          </div>
          <div className="skills-list">
            {skills[activeCategory].map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                inView={inView}
                delay={0.3 + i * 0.07}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
