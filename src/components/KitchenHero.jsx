import React from 'react';
import { useModal } from '../context/ModalContext';
import useSteppedScroll from '../hooks/useSteppedScroll';
import './RenovationHero.css';
import './WardrobeHero.css';
import './KitchenHero.css';

// Empty room and fitted kitchen rendered from the same camera (1376x768 source grid).
export const EMPTY_IMG = '/images/offerings/kitchen-empty.jpg';
export const FULL_IMG = '/images/offerings/kitchen-full.jpg';

const STEP_LOCK = 1000; // piece fade-in time plus trackpad inertia

// Each scroll places one piece of the fitted render into the empty room. Every piece has two alpha masks:
// a sharp cut-out of the furniture, which rises into place, and a soft patch of the floor in front of it, which fades in place
// (the two renders light the floor differently). Foreground pieces come first, so a later piece never has to show
// through one that is not placed yet.
const MASK_DIR = '/images/offerings';
// `focus` is where the piece sits across the render (0 = left edge, 1 = right edge); narrow screens pan there.
const PIECES = [
  { label: 'Island & seating', focus: 0.5 },
  { label: 'Tall units & built-in appliances', focus: 0.33 },
  { label: 'Glass display cabinet', focus: 0.12 },
  { label: 'Cooking wall & open shelving', focus: 0.7 },
].map(({ label, focus }, i) => ({
  label,
  focus,
  piece: `${MASK_DIR}/kitchen-piece-${i + 1}.png`,
  floor: `${MASK_DIR}/kitchen-floor-${i + 1}.png`,
}));
const LAST = PIECES.length;

const maskStyle = (src) => ({ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` });

const KitchenHero = ({ data }) => {
  const { openModal } = useModal();
  const { stage, sectionRef } = useSteppedScroll(LAST, STEP_LOCK);

  const done = stage === LAST;
  const focus = stage === 0 ? 0.5 : PIECES[stage - 1].focus;

  return (
    <section className="reno-hero wd-hero kt-hero" ref={sectionRef} style={{ '--open': stage / LAST, '--focus': focus }} aria-label={data.title}>
      <div className="reno-sticky">
        <div className="kt-stage">
          <img src={EMPTY_IMG} alt="Empty room with panelled walls and herringbone floor" className="kt-layer" />
          {PIECES.map((piece, i) => (
            <img
              key={piece.floor}
              src={FULL_IMG}
              alt=""
              aria-hidden="true"
              className={`kt-layer kt-floor ${stage > i ? 'is-placed' : ''}`}
              style={maskStyle(piece.floor)}
            />
          ))}
          {PIECES.map((piece, i) => (
            <img
              key={piece.piece}
              src={FULL_IMG}
              alt=""
              aria-hidden="true"
              className={`kt-layer kt-piece ${stage > i ? 'is-placed' : ''}`}
              style={maskStyle(piece.piece)}
            />
          ))}
          {/* Once every piece is in, the full render settles in for its warm lighting and floor reflections */}
          <img
            src={FULL_IMG}
            alt="Fitted aluminium kitchen with island, stools, tall units and glass display cabinets"
            className={`kt-layer kt-finish ${done ? 'is-placed' : ''}`}
          />
        </div>
        <div className="reno-shade wd-shade" aria-hidden="true"></div>

        <div className={`wd-intro ${stage === 0 ? '' : 'is-hidden'}`}>
          <span className="reno-tag">{data.shortTitle}</span>
          <h1 className="reno-title">{data.title}</h1>
          <p className="reno-lede">An empty room today, a complete kitchen tomorrow. Scroll to furnish it.</p>
          <button className="offering-primary-btn" onClick={openModal} tabIndex={stage === 0 ? 0 : -1}>Get Free Consultation</button>
        </div>

        <div className="kt-labels" aria-live="polite">
          {PIECES.map((piece, i) => (
            <span key={piece.label} className={`kt-label ${stage === i + 1 && !done ? 'is-active' : ''}`}>
              <em>{String(i + 1).padStart(2, '0')}</em> {piece.label}
            </span>
          ))}
        </div>

        <div className={`wd-final ${done ? 'is-active' : ''}`} aria-hidden={!done}>
          <h2 className="wd-final-title">From bare walls to a finished kitchen.</h2>
          <p className="wd-final-sub">{PIECES.map((piece) => piece.label).join(' · ')}</p>
          <button className="reno-card-cta" onClick={openModal} tabIndex={done ? 0 : -1}>Design Your Interior</button>
        </div>

        <div className={`wd-scroll-hint ${done ? 'is-hidden' : ''}`} aria-hidden="true">
          <span>Scroll to furnish · {stage} / {LAST}</span>
          <span className="reno-scroll-line"></span>
        </div>
      </div>
    </section>
  );
};

export default KitchenHero;
