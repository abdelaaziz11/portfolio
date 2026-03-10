import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';
import './Projects.css';

const { projects } = portfolioData;

const allTechs = ['All', ...new Set(projects.flatMap(p => p.technologies))];

function ProjectCard({ project, onOpen, delay, inView }) {
  return (
    <motion.div
      className="project-card card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(project)}
    >
      <div className="project-image">
        <img src={project.thumbnail} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <span className="project-open-btn">View Details →</span>
        </div>
        {project.featured && <div className="project-featured-badge">Featured</div>}
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.shortDescription}</p>
        <div className="project-tech">
          {project.technologies.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
          {project.technologies.length > 4 && (
            <span className="tag">+{project.technologies.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView(0.05);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.technologies.includes(filter));

  return (
    <section id="projects" className="section projects-section">
      <div className="container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Selected <span>Projects</span></h2>
        </motion.div>

        <motion.div
          className="filter-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {['All', 'React', 'Node.js', 'MongoDB', 'Express.js', 'Python'].map(tech => (
            <button
              key={tech}
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </button>
          ))}
        </motion.div>

        <div className="projects-grid">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
              delay={0.1 + i * 0.1}
              inView={inView}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-projects">
            <p>No projects found for this technology.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
