import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { offeringsData } from '../data/offeringsData';
import { useModal } from '../context/ModalContext';
import { IconRenderer } from '../components/Icons';
import RenovationHero, { WOOD_IMG, ALUMINIUM_IMG } from '../components/RenovationHero';
import WardrobeHero, { CLOSED_IMG, OPEN_IMG } from '../components/WardrobeHero';
import KitchenHero, { EMPTY_IMG, FULL_IMG } from '../components/KitchenHero';
import './OfferingDetail.css';

// Offerings with a scroll-driven hero, used once their image pair is available
const SCROLL_HEROES = {
  'aluminium-interiors': { Component: KitchenHero, images: [EMPTY_IMG, FULL_IMG] },
  renovation: { Component: RenovationHero, images: [WOOD_IMG, ALUMINIUM_IMG] },
  'modular-cupboards': { Component: WardrobeHero, images: [CLOSED_IMG, OPEN_IMG] },
};

const OfferingDetail = () => {
  const { slug } = useParams();
  const { openModal } = useModal();
  const data = offeringsData[slug];
  const scrollHero = SCROLL_HEROES[slug];
  const [failedSlug, setFailedSlug] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!SCROLL_HEROES[slug]) return;
    let cancelled = false;
    Promise.all(SCROLL_HEROES[slug].images.map((src) => new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    }))).catch(() => { if (!cancelled) setFailedSlug(slug); });
    return () => { cancelled = true; };
  }, [slug]);

  if (!data) {
    return <Navigate to="/" />;
  }

  return (
    <div className="offering-detail-page">
      {/* Hero Section */}
      {scrollHero && failedSlug !== slug ? <scrollHero.Component data={data} /> : (
      <section className="offering-hero">
        <img src={data.heroImage} alt={data.title} className="offering-hero-img" />
        <div className="offering-hero-content">
          <span className="offering-tag">{data.shortTitle}</span>
          <h1 className="offering-hero-title">{data.title}</h1>
          <div className="offering-hero-actions">
            <button className="offering-primary-btn" onClick={openModal}>Get Free Consultation</button>
            <button className="offering-secondary-btn" onClick={() => window.scrollTo({ top: document.querySelector('.offering-section').offsetTop - 100, behavior: 'smooth' })}>Learn More</button>
          </div>
        </div>
      </section>
      )}

      {/* About Section */}
      <section className="offering-section">
        <div className="offering-container">
          <div className="about-grid">
            <h2 className="offering-section-title">About this Service</h2>
            <p className="about-text">{data.about}</p>
          </div>
        </div>
      </section>

      {/* Benefits Content (Dynamic) */}
      {data.benefits && (
        <section className="offering-section dark">
          <div className="offering-container">
            <h2 className="offering-section-title">Key Benefits</h2>
            <div className="offering-grid-container">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    <IconRenderer iconName={benefit.icon || 'star'} size={40} />
                  </div>
                  <h3 className="grid-item-title">{benefit.title}</h3>
                  <p className="grid-item-desc">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications Content (Dynamic) */}
      {data.applications && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">Applications</h2>
            <div className="offering-grid-container">
              {data.applications.map((app, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', color: 'var(--text-dark)', opacity: 0.8 }}>
                    <IconRenderer iconName={app.icon} size={40} />
                  </div>
                  <h3 className="grid-item-title">{app.title}</h3>
                  <p className="grid-item-desc">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Types Content (Dynamic) */}
      {data.types && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">Types of {data.title}</h2>
            <div className="offering-grid-container">
              {data.types.map((type, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    <IconRenderer iconName={type.icon} size={40} />
                  </div>
                  <h3 className="grid-item-title">{type.title}</h3>
                  <p className="grid-item-desc">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Content (Dynamic) */}
      {data.services && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">Services Included</h2>
            <div className="offering-grid-container">
              {data.services.map((service, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                    <IconRenderer iconName={service.icon} size={40} />
                  </div>
                  <h3 className="grid-item-title">{service.title}</h3>
                  <p className="grid-item-desc">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customizable Content (Dynamic) */}
      {data.customizable && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">What can be Customized</h2>
            <div className="offering-grid-container">
              {data.customizable.map((item, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', color: 'var(--text-dark)', opacity: 0.8 }}>
                    <IconRenderer iconName={item.icon} size={40} />
                  </div>
                  <h3 className="grid-item-title">{item.title}</h3>
                  <p className="grid-item-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Renovatable Content (Dynamic) */}
      {data.renovatable && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">What can be Renovated</h2>
            <div className="offering-grid-container">
              {data.renovatable.map((item, i) => (
                <div key={i} className="grid-item">
                  <div style={{ marginBottom: '1.5rem', color: 'var(--text-dark)', opacity: 0.8 }}>
                    <IconRenderer iconName={item.icon} size={40} />
                  </div>
                  <h3 className="grid-item-title">{item.title}</h3>
                  <p className="grid-item-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Content (Dynamic) */}
      {data.process && (
        <section className="offering-section dark">
          <div className="offering-container">
            <h2 className="offering-section-title">Our Process</h2>
            <div className="offering-grid-container">
              {data.process.map((p, i) => (
                <div key={i} className="grid-item">
                  <span style={{ fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem', display: 'block' }}>STEP 0{i + 1}</span>
                  <h3 className="grid-item-title">{p.step}</h3>
                  <p className="grid-item-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {data.gallery && (
        <section className="offering-section">
          <div className="offering-container">
            <h2 className="offering-section-title">Project Inspiration</h2>
            <div className="gallery-grid">
              {data.gallery.map((img, i) => (
                <img key={i} src={img} alt="Inspiration" className="gallery-img" />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default OfferingDetail;
