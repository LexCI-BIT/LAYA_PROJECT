import React from 'react';
import { useModal } from '../context/ModalContext';
import { offeringsData } from '../data/offeringsData';
import { IconRenderer } from '../components/Icons';
import './GlassPartition.css';

const PARTITION_IMG = '/images/offerings/partition_full.jpg';

export default function GlassPartitionHero() {
  const { openModal } = useModal();
  const data = offeringsData['glass-aluminium-partitions'];

  return (
    <>
      <section className="gp-hero">
        <div className="gp-sticky">
          <div className="gp-stage">
            <img
              src={PARTITION_IMG}
              alt="Modern glass and aluminium partition interior"
              className="gp-layer"
            />
          </div>

          <div className="gp-shade" />

          <div className="gp-intro">
            <span className="gp-tag">{data.shortTitle}</span>
            <h1>{data.title}</h1>

            <p>
              Open spaces. Defined beautifully.
              <br />
              Discover elegant glass and aluminium partitions.
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

      <section className="glass-about-service">
        <div className="glass-about-container">
          <h2>About this Service</h2>
          <p>{data.about}</p>
        </div>
      </section>

      {data.benefits && (
        <section className="glass-benefits">
          <div className="glass-benefits-container">
            <h2>Key Benefits</h2>
            <div className="glass-benefits-grid">
              {data.benefits.map((benefit, index) => (
                <article className="glass-benefit-card" key={index}>
                  <div className="glass-benefit-icon">
                    <IconRenderer iconName={benefit.icon || 'star'} size={40} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {data.applications && (
        <section className="glass-applications">
          <div className="glass-applications-container">
            <h2>Applications</h2>
            <div className="glass-applications-grid">
              {data.applications.map((app, index) => (
                <article className="glass-application-card" key={index}>
                  <div className="glass-application-icon">
                    <IconRenderer iconName={app.icon || 'partition'} size={36} />
                  </div>
                  <h3>{app.title}</h3>
                  <p>{app.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
