
import React from 'react';
import { useModal } from '../context/ModalContext';
import { IconRenderer } from '../components/Icons';
import './WindowsDoors.css';

const WINDOWS_DOORS_IMG = '/images/offerings/windowsanddoors.png';

const products = [
    {
      title: 'Sliding Windows',
      icon: 'sliding-window',
      desc: 'Elegant sliding windows designed for smooth operation, natural light and modern living spaces.',
    },
    {
      title: 'Casement Windows',
      icon: 'casement-window',
      desc: 'Classic aluminium casement windows offering excellent ventilation and contemporary styling.',
    },
    {
      title: 'French Windows',
      icon: 'french-window',
      desc: 'Stylish full-height windows that create an open connection between indoor and outdoor spaces.',
    },
    {
      title: 'Sliding Doors',
      icon: 'sliding-door',
      desc: 'Space-saving sliding doors with sleek aluminium frames and expansive glass views.',
    },
    {
      title: 'Bi-fold Doors',
      icon: 'bi-fold-door',
      desc: 'Modern folding door systems that open up your space with seamless functionality.',
    },
    {
      title: 'Entrance Doors',
      icon: 'entrance-door',
      desc: 'Premium aluminium entrance doors combining sophisticated design, strength and security.',
    },
  ];

  const benefits = [
    {
      icon: 'shield-check',
      title: 'Durability',
      desc: 'Strong aluminium profiles designed for long-lasting performance and everyday use.',
    },
    {
      icon: 'leaf',
      title: 'Natural Light',
      desc: 'Modern glass designs maximise daylight and create brighter, more welcoming interiors.',
    },
    {
      icon: 'grid',
      title: 'Sound Insulation',
      desc: 'Quality window and door systems designed to improve indoor comfort and reduce outside noise.',
    },
    {
      icon: 'design',
      title: 'Custom Finishes',
      desc: 'Choose from a range of frame colours, finishes and configurations to suit your architecture.',
    },
  ];

export default function WindowsDoors() {
  const { openModal } = useModal();

  return (
    <>
      {/* HERO */}
      <section className="gp-hero wd-hero">
        <div className="gp-sticky">
          <div className="gp-stage">
            <img
              src={WINDOWS_DOORS_IMG}
              alt="Modern aluminium windows and doors"
              className="gp-layer"
            />
          </div>

          <div className="gp-shade" />

          <div className="gp-intro">
            <span className="gp-tag">Modern Architectural Solutions</span>

            <h1>
              Windows
              <br />
              & Doors
            </h1>

            <p>
              Designed for light. Crafted for living.
              <br />
              Discover premium aluminium windows and doors
              that bring elegance and functionality together.
            </p>

            <button
              className="offering-primary-btn"
              onClick={openModal}
              type="button"
            >
              Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="glass-about-service">
        <div className="glass-about-container">
          <h2>About this Service</h2>

          <p>
             From elegant sliding windows to contemporary entrance doors,
            every design combines durability, functionality and
            refined aesthetics. Our solutions are tailored to bring
            natural light, comfort and style into your spaces.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="glass-benefits">
        <div className="glass-benefits-container">
          <h2>Key Benefits</h2>

          <div className="glass-benefits-grid">
            {benefits.map((benefit, index) => (
              <article className="glass-benefit-card" key={index}>
                <div className="glass-benefit-icon">
                  <IconRenderer
                    iconName={benefit.icon}
                    size={40}
                  />
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS / APPLICATIONS */}
      <section className="glass-applications">
        <div className="glass-applications-container">
          <h2>Our Windows & Doors</h2>

          <div className="glass-applications-grid">
            {products.map((product, index) => (
              <article className="glass-application-card" key={index}>
                <div className="glass-application-icon">
                  <IconRenderer
                    iconName={product.icon}
                    size={36}
                  />
                </div>

                <h3>{product.title}</h3>
                <p>{product.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
