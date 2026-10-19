import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import './FeaturedProjects.css';

const ProjectCard = ({ project, isClone }) => (
    <Link
        to={`/projects/${project.id}`}
        className="project-card"
        data-cursor-text="VIEW PROJECT"
        // The cloned set only exists to make the loop seamless, so hide it from screen readers and keyboard focus
        aria-hidden={isClone || undefined}
        tabIndex={isClone ? -1 : undefined}
    >
        <div className="project-image">
            <img src={project.image} alt={isClone ? '' : project.title} loading="lazy" />
        </div>
        <div className="project-info">
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-category">{project.category}</p>
        </div>
    </Link>
);

const FeaturedProjects = () => {
    // Speed scales with the number of projects so each card moves at the same pace
    const duration = `${projectsData.length * 5}s`;

    return (
        <section className="featured-projects" id="projects">
            <div className="container">
                <div className="projects-header reveal-on-scroll">
                    <h2 className="projects-title">Our Recent Projects</h2>
                    <p className="projects-subtitle">A glimpse into our premium aluminium interior transformations.</p>
                </div>
            </div>

            <div className="projects-marquee reveal-on-scroll delay-100">
                <div className="projects-track" style={{ '--marquee-duration': duration }}>
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    {projectsData.map((project) => (
                        <ProjectCard key={`${project.id}-clone`} project={project} isClone />
                    ))}
                </div>
            </div>

            <div className="container">
                <div className="projects-footer">
                    <Link to="/projects" className="view-all-projects-btn">
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
