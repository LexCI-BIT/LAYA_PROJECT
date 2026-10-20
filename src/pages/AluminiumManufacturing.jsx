
import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import ManufacturingUnit from '../components/ManufacturingUnit';
import ManufacturingProjects from '../components/ManufacturingProjects';

import './AluminiumManufacturing.css';

const AluminiumManufacturing = () => {
  return (
    <main className="aluminium-page">

      {/* Hero Section */}
      <section className="aluminium-hero">

        {/* Hero Background Image */}
        <div className="aluminium-hero-art" aria-hidden="true">
          <img
            src="/images/manufacturing/aluminium-manufacturing.jpeg"
            alt=""
          />
        </div>

        {/* Dark Overlay */}
        <div className="aluminium-hero-shade" />

        {/* Hero Content */}
        <div className="container aluminium-hero-content">

          <span className="aluminium-kicker">
            Precision • Performance • Reliability
          </span>

          <h1>
            Aluminium Manufacturing
            <br />
            <em>&amp; Supply</em>
          </h1>

          <p>
            Purpose-built aluminium profiles and fabrication
            solutions for contemporary spaces, architecture,
            interiors, and large-scale projects.
          </p>

          {/* Hero Buttons */}
          <div className="aluminium-hero-actions">

            <a
              className="aluminium-primary-cta"
              href="#what-we-offer"
            >
              Explore Our Capabilities
              <ArrowRight size={17} />
            </a>

            <Link
              className="aluminium-secondary-cta"
              to="/#contact"
            >
              Talk to Our Team
            </Link>

          </div>

          {/* Scroll Cue
          <a
            className="aluminium-scroll-cue"
            href="#what-we-offer"
          >
            <ArrowDown size={16} />
            Scroll to explore
          </a> */}

        </div>

        {/* Hero Caption */}
        <div className="aluminium-hero-caption">
          ENGINEERED FOR EVERY DETAIL
        </div>

      </section>

      {/* What We Offer, Types of Aluminium, Why Source With Us */}
      <section
        id="what-we-offer"
        className="aluminium-page-sections"
      >
        <ManufacturingUnit
          showIntro={false}
          showBody={true}
        />
      </section>

      {/* Previous Projects Slideshow */}
      <section className="aluminium-projects-section">
        <ManufacturingProjects />
      </section>

    </main>
  );
};

export default AluminiumManufacturing;
