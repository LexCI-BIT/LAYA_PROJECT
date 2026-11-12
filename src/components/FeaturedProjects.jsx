import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import './FeaturedProjects.css';

const ProjectCard = ({ project, isClone }) => (
    // The cloned set only exists to make the loop seamless, so hide it from screen readers
    <div className="project-card" aria-hidden={isClone || undefined}>
        <div className="project-image">
            <img src={project.image} alt={isClone ? '' : project.title} loading="lazy" />
        </div>
        <div className="project-info">
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-category">{project.category}</p>
        </div>
    </div>
);

// Projects left out of the home page carousel (they still appear on the Projects page)
const HIDDEN_ON_HOME = [];
const featuredProjects = projectsData.filter((p) => !HIDDEN_ON_HOME.includes(p.id));

const FeaturedProjects = () => {
    // Speed scales with the number of projects so each card moves at the same pace
    const duration = `${featuredProjects.length * 5}s`;

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
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                    {featuredProjects.map((project) => (
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
