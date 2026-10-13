import React from 'react';
import { useModal } from '../context/ModalContext';
import useSteppedScroll from '../hooks/useSteppedScroll';
import './RenovationHero.css';
import './WardrobeHero.css';

// Closed and open renders of the same wardrobe from the same camera (1200x896 source grid).
export const CLOSED_IMG = '/images/offerings/wardrobe-closed.jpg';
export const OPEN_IMG = '/images/offerings/wardrobe-open.jpg';

const IMG_W = 1200;
const IMG_H = 896;
const DOOR_TOP = 149;
const DOOR_BOTTOM = 676;

// Door panels in source pixels, opened as three pairs of double doors: one pair per scroll.
const PAIRS = [
  [[197, 334], [334, 465]],
  [[465, 600], [600, 738]],
  [[738, 872], [872, 1005]],
];
const LAST = PAIRS.length;
const STEP_LOCK = 900; // door swing time plus trackpad inertia

const doorStyle = ([x1, x2]) => {
  const w = x2 - x1;
  const h = DOOR_BOTTOM - DOOR_TOP;
  return {
    door: {
      left: `${(x1 / IMG_W) * 100}%`,
      width: `${(w / IMG_W) * 100}%`,
      top: `${(DOOR_TOP / IMG_H) * 100}%`,
      height: `${(h / IMG_H) * 100}%`,
    },
    face: {
      width: `${(IMG_W / w) * 100}%`,
      height: `${(IMG_H / h) * 100}%`,
      left: `${(-x1 / w) * 100}%`,
      top: `${(-DOOR_TOP / h) * 100}%`,
    },
  };
};

const WardrobeHero = ({ data }) => {
  const { openModal } = useModal();
  const { stage, sectionRef } = useSteppedScroll(LAST, STEP_LOCK);

  const done = stage === LAST;

  return (
    <section className="reno-hero wd-hero" ref={sectionRef} style={{ '--open': stage / LAST }} aria-label={data.title}>
      <div className="reno-sticky">
        <div className="wd-stage">
          <img src={OPEN_IMG} alt="Open modular wardrobe with lit shelves, hanging rails and drawers" className="wd-base" />
          <div className="wd-interior-shade" aria-hidden="true"></div>
          {PAIRS.map((pair, i) => pair.map((panel, side) => {
            const s = doorStyle(panel);
            return (
              <div
                key={`${i}-${side}`}
                className={`wd-door ${side === 0 ? 'wd-door-left' : 'wd-door-right'} ${stage > i ? 'is-open' : ''}`}
                style={s.door}
                aria-hidden="true"
              >
                <img src={CLOSED_IMG} alt="" className="wd-door-face" style={s.face} />
              </div>
            );
          }))}
        </div>
        <div className="reno-shade wd-shade" aria-hidden="true"></div>

        <div className={`wd-intro ${stage === 0 ? '' : 'is-hidden'}`}>
          <span className="reno-tag">{data.shortTitle}</span>
          <h1 className="reno-title">{data.title}</h1>
          <p className="reno-lede">Seamless doors outside, perfect order inside. Scroll to open.</p>
          <button className="offering-primary-btn" onClick={openModal} tabIndex={stage === 0 ? 0 : -1}>Get Free Consultation</button>
        </div>

        <div className={`wd-final ${done ? 'is-active' : ''}`} aria-hidden={!done}>
          <h2 className="wd-final-title">Everything in its place.</h2>
          <p className="wd-final-sub">LED-lit shelving · Hanging rails · Pull-out accessory trays · Shoe racks</p>
          <button className="reno-card-cta" onClick={openModal} tabIndex={done ? 0 : -1}>Design Your Wardrobe</button>
        </div>

        <div className={`wd-scroll-hint ${done ? 'is-hidden' : ''}`} aria-hidden="true">
          <span>Scroll to open · {stage} / {LAST}</span>
          <span className="reno-scroll-line"></span>
        </div>
      </div>
    </section>
  );
};

export default WardrobeHero;
