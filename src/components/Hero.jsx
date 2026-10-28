// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Pause, Play } from 'lucide-react';
// import { useModal } from '../context/ModalContext';
// import './Hero.css';

// // A showreel of the home: each shot drifts like a slow camera move (`from` -> `to`),
// // then hard-cuts to the next room, looping back to the exterior after the balcony.
// const SHOTS = [
//   { title: 'Exterior', image: '/images/hero/exterior.png?v=2', origin: '50% 50%', from: 'scale(1)', to: 'scale(1.12)' },
//   { title: 'Entrance Foyer', image: '/images/hero/foyer.jpg', origin: '50% 50%', from: 'scale(1.12) translateX(3%)', to: 'scale(1.12) translateX(-3%)' },
//   { title: 'Living Room', image: '/images/hero/living.jpg', origin: '50% 50%', from: 'scale(1.12) translateX(-3%)', to: 'scale(1.12) translateX(3%)' },
//   { title: 'Kitchen & Dining', image: '/images/hero/kitchen2.jpg', origin: '50% 45%', from: 'scale(1.03)', to: 'scale(1.13)' },
//   { title: 'Master Bedroom', image: '/images/hero/bedroom3.jpg?v=6', origin: '50% 50%', from: 'scale(1.12) translateX(-3%)', to: 'scale(1.12) translateX(3%)' },
//   { title: 'The Balcony', image: '/images/hero/balcony.jpg?v=6', origin: '50% 55%', from: 'scale(1.15)', to: 'scale(1.07)' },
// ];

// const SHOT_MS = 3000; // how long each shot runs before the cut

// const Hero = () => {
//   const { openModal } = useModal();
//   const sectionRef = useRef(null);
//   const [shot, setShot] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [inView, setInView] = useState(true);
//   const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

// useEffect(() => {
//   SHOTS.forEach((s) => {
//     const img = new Image();
//     img.src = s.image;

//     if (img.decode) {
//       img.decode().catch(() => {});
//     }
//   });
// }, []);

//   useEffect(() => {
//     if (paused || !inView || reducedMotion) return;
//     const t = setTimeout(() => setShot((s) => (s + 1) % SHOTS.length), SHOT_MS);
//     return () => clearTimeout(t);
//   }, [shot, paused, inView, reducedMotion]);

//   // Stop while the hero is off screen, and start again from the exterior when the visitor returns.
//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setInView(entry.isIntersecting);
//       if (!entry.isIntersecting) setShot(0);
//     }, { threshold: 0.25 });
//     observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className={`hero ${paused ? 'is-paused' : ''}`} id="home">
//       <div className="hero-slides" aria-hidden="true">
//         {SHOTS.map((s, i) => (
//           <div key={s.title} className={`hero-slide ${i === shot ? 'is-active' : ''}`}>
//             <img
//               src={s.image}
//               alt=""
//               fetchPriority={i === 0 ? 'high' : 'auto'}
//               decoding="async"
//               style={{
//                 transformOrigin: s.origin,
//                 '--shot-from': s.from,
//                 '--shot-to': s.to,
//                 '--shot-duration': `${SHOT_MS}ms`,
//               }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="hero-overlay"></div>

//       <div className="hero-content container">
//         <div className="hero-text">
//           <div className="animate-in">
//           <div className="hero-content">
//   <img
//     src="/images/laya-logo-horizontal-dark.png"
//     alt="Laya Space Design"
//     className="hero-logo"
//   />
//   </div>
//             <h1 className="hero-title">Precision in Every Detail</h1>
//             <p className="hero-subtitle">
//               Modern aluminium interiors crafted for durability, elegance, and everyday living.
//             </p>
//             <div className="hero-cta">
//               <button onClick={openModal} className="cta-primary">Get Free Consultation</button>
//               <Link to="/projects" className="cta-secondary">View Projects</Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <nav className="hero-rooms" aria-label="Rooms">
//         <div className="hero-rooms-track">
//           <div className="hero-rooms-bar" style={{ transform: `scaleY(${shot / (SHOTS.length - 1)})` }}></div>
//         </div>
//         {SHOTS.map((s, i) => (
//           <button
//             key={s.title}
//             className={`hero-room ${shot === i ? 'is-active' : ''}`}
//             onClick={() => setShot(i)}
//           >
//             <span className="hero-room-dot"></span>
//             <span className="hero-room-label">{s.title}</span>
//           </button>
//         ))}
//         {!reducedMotion && (
//           <button
//             className="hero-play"
//             onClick={() => setPaused((p) => !p)}
//             aria-label={paused ? 'Play showreel' : 'Pause showreel'}
//           >
//             {paused ? <Play size={14} /> : <Pause size={14} />}
//           </button>
//         )}
//       </nav>
//     </section>
//   );
// };

// export default Hero;



import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pause, Play } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import './Hero.css';

const SHOTS = [
  { title: 'Exterior', image: '/images/hero/exterior.png?v=2', origin: '50% 50%', from: 'scale(1)', to: 'scale(1.12)' },
  { title: 'Entrance Foyer', image: '/images/hero/foyer.jpg', origin: '50% 50%', from: 'scale(1.12) translateX(3%)', to: 'scale(1.12) translateX(-3%)' },
  { title: 'Living Room', image: '/images/hero/living.jpg', origin: '50% 50%', from: 'scale(1.12) translateX(-3%)', to: 'scale(1.12) translateX(3%)' },
  { title: 'Kitchen & Dining', image: '/images/hero/kitchen2.jpg', origin: '50% 45%', from: 'scale(1.03)', to: 'scale(1.13)' },
  { title: 'Master Bedroom', image: '/images/hero/bedroom3.jpg?v=6', origin: '50% 50%', from: 'scale(1.12) translateX(-3%)', to: 'scale(1.12) translateX(3%)' },
  { title: 'The Balcony', image: '/images/hero/balcony.jpg?v=6', origin: '50% 55%', from: 'scale(1.15)', to: 'scale(1.07)' },
];

const SHOT_MS = 3000;

const Hero = () => {
  const { openModal } = useModal();
  const sectionRef = useRef(null);
  const [shot, setShot] = useState(0);
  const [previousShot, setPreviousShot] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const changeShot = (nextShot) => {
    setPreviousShot(shot);
    setShot(nextShot);
  };

  useEffect(() => {
    SHOTS.forEach((s) => {
      const img = new Image();
      img.src = s.image;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  useEffect(() => {
    if (paused || !inView || reducedMotion) return;
    const t = setTimeout(
      () => changeShot((shot + 1) % SHOTS.length),
      SHOT_MS
    );
    return () => clearTimeout(t);
  }, [shot, paused, inView, reducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (!entry.isIntersecting) {
        setShot(0);
        setPreviousShot(0);
      }
    }, { threshold: 0.25 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`hero ${paused ? 'is-paused' : ''}`} id="home">
      <div className="hero-slides" aria-hidden="true">
        {SHOTS.map((s, i) => (
          <div
            key={s.title}
            className={`hero-slide ${i === shot ? 'is-active' : ''} ${
              i === previousShot && previousShot !== shot ? 'is-previous' : ''
            }`}
          >
            <img
              src={s.image}
              alt=""
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              style={{
                transformOrigin: s.origin,
                '--shot-from': s.from,
                '--shot-to': s.to,
                '--shot-duration': `${SHOT_MS}ms`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="hero-overlay"></div>

      <div className="hero-content container">
        <div className="hero-text">
          <div className="animate-in">
            <div className="hero-content">
              <img
                src="/images/laya-logo-horizontal-dark1.png"
                alt="Laya Space Design"
                className="hero-logo"
              />
            </div>

            <h1 className="hero-title">Precision in Every Detail</h1>
            <p className="hero-subtitle">
              Engineers &amp; Contractors in Architectural Aluminium Building Products
            </p>

            <div className="hero-cta">
              <button onClick={openModal} className="cta-primary">
                Get Free Consultation
              </button>
              <Link to="/projects" className="cta-secondary">
                View Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="hero-rooms" aria-label="Rooms">
        <div className="hero-rooms-track">
          <div
            className="hero-rooms-bar"
            style={{ transform: `scaleY(${shot / (SHOTS.length - 1)})` }}
          ></div>
        </div>

        {SHOTS.map((s, i) => (
          <button
            key={s.title}
            className={`hero-room ${shot === i ? 'is-active' : ''}`}
            onClick={() => changeShot(i)}
          >
            <span className="hero-room-dot"></span>
            <span className="hero-room-label">{s.title}</span>
          </button>
        ))}

        {!reducedMotion && (
          <button
            className="hero-play"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play showreel' : 'Pause showreel'}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
        )}
      </nav>
    </section>
  );
};

export default Hero;
