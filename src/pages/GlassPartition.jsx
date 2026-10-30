
import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../context/ModalContext';
import { offeringsData } from '../data/offeringsData';
import { IconRenderer } from '../components/Icons';
import './GlassPartition.css';

const EMPTY_IMG = '/images/offerings/Partitionn.jpg';
const FULL_IMG = '/images/offerings/partition-full.jpeg';
const LOCK_MS = 900;

export default function GlassPartitionHero() {
  const { openModal } = useModal();
  const data = offeringsData['glass-aluminium-partitions'];

  const [stage, setStage] = useState(0);
  const sectionRef = useRef(null);
  const stageRef = useRef(0);
  const busyRef = useRef(false);
  const touchStartY = useRef(null);
  const lockTimer = useRef(null);

  useEffect(() => {
    const isHeroAtTop = () => {
      const section = sectionRef.current;
      if (!section) return false;

      const rect = section.getBoundingClientRect();

      return rect.top <= 2 && rect.bottom >= window.innerHeight;
    };

    const changeStage = (nextStage) => {
      if (busyRef.current || nextStage === stageRef.current) return;

      busyRef.current = true;
      stageRef.current = nextStage;
      setStage(nextStage);

      window.clearTimeout(lockTimer.current);
      lockTimer.current = window.setTimeout(() => {
        busyRef.current = false;
      }, LOCK_MS);
    };

    const onWheel = (event) => {
      if (!isHeroAtTop()) return;

      const direction = Math.sign(event.deltaY);
      if (!direction) return;

      // Keep the document stationary while the image transition is running.
      if (busyRef.current) {
        event.preventDefault();
        return;
      }

      // Scroll down: empty room -> completed partition.
      if (direction > 0 && stageRef.current === 0) {
        event.preventDefault();
        changeStage(1);
      }

      // Scroll up: completed partition -> empty room.
      else if (direction < 0 && stageRef.current === 1) {
        event.preventDefault();
        changeStage(0);
      }

      // Once the image transition finishes, additional downward scrolling
      // can move to the next page section normally.
    };

    const onTouchStart = (event) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const onTouchMove = (event) => {
      if (touchStartY.current === null || !isHeroAtTop()) return;

      const movement = touchStartY.current - event.touches[0].clientY;

      if (
        busyRef.current ||
        (movement > 0 && stageRef.current === 0) ||
        (movement < 0 && stageRef.current === 1)
      ) {
        event.preventDefault();
      }
    };

    const onTouchEnd = (event) => {
      if (touchStartY.current === null) return;

      const movement =
        touchStartY.current - event.changedTouches[0].clientY;

      touchStartY.current = null;

      if (!isHeroAtTop() || Math.abs(movement) < 40) return;

      if (busyRef.current) return;

      if (movement > 0 && stageRef.current === 0) {
        changeStage(1);
      } else if (movement < 0 && stageRef.current === 1) {
        changeStage(0);
      }
    };

    const onKeyDown = (event) => {
      if (
        event.target.closest(
          'input, textarea, select, button, a, [contenteditable="true"]'
        )
      ) {
        return;
      }

      if (!isHeroAtTop()) return;

      if (busyRef.current) {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(event.key)) {
          event.preventDefault();
        }
        return;
      }

      if (
        ['ArrowDown', 'PageDown'].includes(event.key) &&
        stageRef.current === 0
      ) {
        event.preventDefault();
        changeStage(1);
      } else if (
        ['ArrowUp', 'PageUp'].includes(event.key) &&
        stageRef.current === 1
      ) {
        event.preventDefault();
        changeStage(0);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(lockTimer.current);
    };
  }, []);

  const done = stage === 1;
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const hero = sectionRef.current;
  
    if (!navbar || !hero) return;
  
    const updateNavbar = () => {
      const rect = hero.getBoundingClientRect();
  
      const heroIsVisible =
        rect.bottom > 0 && rect.top < window.innerHeight;
  
      navbar.classList.toggle('gp-nav-visible', heroIsVisible);
      navbar.classList.toggle('gp-nav-hidden', !heroIsVisible);
    };
  
    updateNavbar();
  
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);
  
    return () => {
      window.removeEventListener('scroll', updateNavbar);
      window.removeEventListener('resize', updateNavbar);
      navbar.classList.remove('gp-nav-visible', 'gp-nav-hidden');
    };
  }, []);

  return (
    <>
      <section className="gp-hero" ref={sectionRef}>
        <div className="gp-sticky">
          <div className="gp-stage">
            <img
              src={EMPTY_IMG}
              alt="Empty modern interior before installation"
              className={`gp-layer ${stage === 0 ? 'is-visible' : ''}`}
            />

            <img
              src={FULL_IMG}
              alt="Completed glass and aluminium partition interior"
              className={`gp-layer ${done ? 'is-visible' : ''}`}
            />
          </div>

          <div className="gp-shade" />

          <div className={`gp-intro ${done ? 'is-hidden' : ''}`}>
            <span className="gp-tag">{data.shortTitle}</span>
            <h1>{data.title}</h1>

            <p>
              Open spaces. Defined beautifully.
              <br />
              Scroll to transform your space.
            </p>

            <button
              className="offering-primary-btn"
              onClick={openModal}
              tabIndex={done ? -1 : 0}
            >
              Get Free Consultation
            </button>
          </div>

          <div
            className={`gp-final ${done ? 'is-active' : ''}`}
            aria-hidden={!done}
          >
            <h2>From open space to defined elegance.</h2>
            <p>Modern glass. Elegant aluminium. Beautiful spaces.</p>

            <button
              className="gp-final-cta"
              onClick={openModal}
              tabIndex={done ? 0 : -1}
            >
              Design Your Interior
            </button>
          </div>
        </div>
      </section>

      {/* About this Service */}
      <section className="glass-about-service">
        <div className="glass-about-container">
          <h2>About this Service</h2>
          <p>{data.about}</p>
        </div>
      </section>

      {/* Key Benefits */}
      {data.benefits && (
        <section className="glass-benefits">
          <div className="glass-benefits-container">
            <h2>Key Benefits</h2>

            <div className="glass-benefits-grid">
              {data.benefits.map((benefit, index) => (
                <article className="glass-benefit-card" key={index}>
                  <div className="glass-benefit-icon">
                    <IconRenderer
                      iconName={benefit.icon || 'star'}
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
      )}

      {/* Applications */}
      {data.applications && (
        <section className="glass-applications">
          <div className="glass-applications-container">
            <h2>Applications</h2>

            <div className="glass-applications-grid">
              {data.applications.map((app, index) => (
                <article className="glass-application-card" key={index}>
                  <div className="glass-application-icon">
                    <IconRenderer
                      iconName={app.icon || 'partition'}
                      size={36}
                    />
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
