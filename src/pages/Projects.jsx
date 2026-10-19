import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['ALL', 'WARDROBE', 'KITCHEN', 'LIVING ROOM', 'BEDROOM', 'EXTERIOR', 'CUSTOM'];

  const filteredProjects = filter === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <section className="projects-hero">
        <div className="projects-container">
          <h1 className="projects-hero-title">Our Projects</h1>
          <p className="projects-hero-subtitle">
            Explore our portfolio of modern aluminium interiors crafted with precision and style.
          </p>
        </div>
      </section>

      <section className="projects-gallery-section">
        <div className="projects-container">
          <div className="projects-filter-tabs">
            {categories.map(cat => (
              <button
                key={cat}
                className={`projects-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-full-grid">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id} className="project-detail-card" data-cursor-text="VIEW PROJECT">
                <div className="project-card-image-wrapper">
                  <img src={project.image} alt={project.title} className="project-card-img" />
                </div>
                <div className="project-card-content">
                  <span className="project-card-tag">{project.category}</span>
                  <h3 className="project-card-name">{project.title}</h3>
                  <p className="project-card-summary">{project.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
