
import React, { useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import './ManufacturingProjects.css';

const projects = [
  {
    id: 1,
    title: 'Sliding Aluminium Wardrobe',
    category: 'WARDROBE',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/-10g7zzx6.jpg',
    description: 'Sleek, space-saving storage with premium metallic finish.',
  },
  {
    id: 2,
    title: 'Modern L-Shaped Kitchen',
    category: 'KITCHEN',
    image: 'https://tiimg.tistatic.com/fp/1/008/622/aluminium-modular-kitchen-183.jpg',
    description: 'Waterproof and fire-resistant modular kitchen system.',
  },
  {
    id: 3,
    title: 'Straight Modular Kitchen',
    category: 'KITCHEN',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/multi-colour-aluminium-straight-modular-kitchen-for-home-2220644618-6gsp72jr.jpg',
    description: 'Compact efficiency for smart urban apartments.',
  },
  {
    id: 4,
    title: 'Custom TV Unit',
    category: 'LIVING ROOM',
    image: 'https://images.openai.com/static-rsc-3/92Pjmexslj8VU0tUUtZxzXaD1_hZiqHvG4S3cSS5wA7Wf2PBedxzT0RGBk24QCW-Wy6AQJZo8N7Q3jBjEGj1C0Hz0Qljovs5tAqKT9aFJTI?purpose=fullsize&v=1',
    description: 'Modern aluminium-framed TV unit with a clean, minimalist finish.',
  },
];

const ManufacturingProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Duplicate cards for seamless scrolling.
  const slideshowProjects = [...projects, ...projects];

  return (
    <section className="mfg-projects-section">
      <div className="container mfg-projects-heading">
        <span className="mfg-projects-eyebrow">
          OUR WORK & CAPABILITIES
        </span>

        <h2>Projects & Applications</h2>

        <p>
          Explore our aluminium products and fabrication
          capabilities for modern architectural and interior spaces.
        </p>
      </div>

      {/* Continuous horizontal image slideshow */}
      <div className="mfg-projects-viewport">
        <div className="mfg-projects-track">
          {slideshowProjects.map((project, index) => (
            <button
              type="button"
              className="mfg-project-card"
              key={`${project.id}-${index}`}
              onClick={() => setSelectedProject(project)}
              aria-label={`View ${project.title}`}
            >
              <img
                className="mfg-project-card-image"
                src={project.image}
                alt={project.title}
                loading={index < projects.length ? 'eager' : 'lazy'}
              />

              <div className="mfg-project-overlay">
                <span className="mfg-project-category">
                  {project.category}
                </span>

                <h3>{project.title}</h3>

                <span className="mfg-project-open">
                  <ArrowUpRight size={20} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Image popup */}
      {selectedProject && (
        <div
          className="mfg-project-modal"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="mfg-project-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="mfg-project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close preview"
            >
              <X size={24} />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
            />

            <div className="mfg-project-modal-info">
              <span>{selectedProject.category}</span>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManufacturingProjects;
