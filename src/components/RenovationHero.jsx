import React, { useEffect, useRef, useState } from 'react';
import { useModal } from '../context/ModalContext';
import './RenovationHero.css';

// Two renders of the same kitchen from the same camera angle; the scroll sweeps one into the other.
export const WOOD_IMG = '/images/renovation/kitchen-before.jpg';
export const ALUMINIUM_IMG = '/images/renovation/kitchen-after.jpg';

const CARDS = [
  {
    eyebrow: 'Before',
    title: 'Worn-Out Wood',
    subtitle: 'Swollen, Peeling & Termite-Prone',
    body: 'Years of moisture, heat and termites take their toll: doors swell and warp, laminate peels away and panels rot from the inside. Repairs only buy time, because wood keeps breaking down.',
    swatch: 'wood',
    range: [0.08, 0.3],
  },
  {
    eyebrow: 'The Transformation',
    title: 'Surface by Surface',
    subtitle: 'Dismantled, Re-engineered, Refinished',
    body: 'We replace every tired panel with precision-cut aluminium, re-fitted to your existing layout with zero compromise on space.',
    swatch: 'blend',
    range: [0.32, 0.72],
  },
  {
    eyebrow: 'After',
    title: 'Metropolitan Edge',
    subtitle: 'Burgundy Aluminium & Brass Accents',
    body: 'Rich burgundy aluminium cabinetry, a seamless white hood and brushed brass pendants. Waterproof, termite-proof and built to stay immaculate.',
    swatch: 'aluminium',
    range: [0.78, 1.01],
    cta: true,
  },
];

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (x) => x * x * (3 - 2 * x);

const RenovationHero = ({ data }) => {
  const { openModal } = useModal();
  const sectionRef = useRef(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  // Reduced motion shows a static half-transformed scene with the middle card
  const [active, setActive] = useState(reduced ? 1 : -1);

  useEffect(() => {
    const section = sectionRef.current;
    if (reduced) {
      section.style.setProperty('--p', '0.5');
      section.style.setProperty('--t', '0.5');
      return;
    }

    let frame = null;
    let current = -1;
    const update = () => {
      frame = null;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = clamp(-rect.top / span);
      const t = ease(clamp((p - 0.12) / 0.76)); // material sweep runs between 12% and 88% of the scroll
      section.style.setProperty('--p', p.toFixed(4));
      section.style.setProperty('--t', t.toFixed(4));
      const idx = CARDS.findIndex((c) => p >= c.range[0] && p < c.range[1]);
      if (idx !== current) {
        current = idx;
        setActive(idx);
      }
    };
    const onScroll = () => { if (frame === null) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section className="reno-hero" ref={sectionRef} aria-label={data.title}>
      <div className="reno-sticky">
        <div className="reno-scene">
          <img src={WOOD_IMG} alt="Damaged wooden kitchen before renovation" className="reno-layer" />
          <img src={ALUMINIUM_IMG} alt="Burgundy aluminium kitchen after renovation" className="reno-layer reno-layer-after" />
          <div className="reno-glint" aria-hidden="true"></div>
          <div className="reno-light reno-light-warm" aria-hidden="true"></div>
          <div className="reno-light reno-light-cool" aria-hidden="true"></div>
          <div className="reno-shade" aria-hidden="true"></div>
        </div>

        <div className="reno-intro">
          <span className="reno-tag">{data.shortTitle}</span>
          <h1 className="reno-title">{data.title}</h1>
          <p className="reno-lede">Damaged wood out, durable aluminium in. Scroll to watch the transformation.</p>
          <button className="offering-primary-btn" onClick={openModal}>Get Free Consultation</button>
        </div>

        <div className="reno-cards">
          {CARDS.map((c, i) => (
            <article key={c.title} className={`reno-card ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i}>
              <div className="reno-card-head">
                <span className={`reno-swatch reno-swatch-${c.swatch}`} aria-hidden="true"></span>
                <span className="reno-card-eyebrow">{String(i + 1).padStart(2, '0')} · {c.eyebrow}</span>
              </div>
              <h2 className="reno-card-title">{c.title}</h2>
              <p className="reno-card-subtitle">{c.subtitle}</p>
              <p className="reno-card-body">{c.body}</p>
              {c.cta && (
                <button className="reno-card-cta" onClick={openModal} tabIndex={active === i ? 0 : -1}>
                  Start Your Renovation
                </button>
              )}
            </article>
          ))}
        </div>

        <div className="reno-meter" aria-hidden="true">
          <span>Oak</span>
          <div className="reno-meter-track"><div className="reno-meter-fill"></div></div>
          <span>Aluminium</span>
        </div>

        <div className="reno-scroll-hint" aria-hidden="true">
          <span>Scroll to transform</span>
          <span className="reno-scroll-line"></span>
        </div>
      </div>
    </section>
  );
};

export default RenovationHero;
