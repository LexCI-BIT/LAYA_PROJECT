import React, { useEffect, useRef } from 'react';
import './ModularOfferings.css';
import { useNavigate } from "react-router-dom";


const offerings = [
  {
    title: 'Windows & Doors',
    desc: 'Premium aluminium windows and doors with sleek, modern finishes. Designed for durability, natural light, and everyday comfort.',
    image: '/images/hero/windows.jpg',
  },
  {
    title: 'Wardrobes',
    desc: 'Custom-designed aluminium wardrobes with elegant glass finishes. Smart storage solutions that combine style and functionality.',
    image: '/images/hero/closet.jpeg',
  },
  {
    title: 'Glass & Aluminium Partitions',
    desc: 'Contemporary glass and aluminium partitions for stylish interiors. Create defined spaces while maintaining openness and light.',
    image: '/images/hero/partition.jpg',
  },
  {
    title: 'Exterior Elevations',
    desc: 'Modern exterior designs featuring premium aluminium elements. Enhance your building’s appearance with clean lines and lasting appeal.',
    image: '/images/hero/elevation.jpeg',
  },
];

export default function LatestOfferings() {
  const offeringsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = offeringsRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.offering-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('offering-visible');
          } else {
            entry.target.classList.remove('offering-visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="latest-offerings" id="latest-offerings">
      <div className="latest-offerings-container">
        <div className="latest-offerings-heading">
          <h2>Our Latest Offerings</h2>
          <p>
            Explore thoughtfully crafted aluminium interiors
            designed for modern living.
          </p>
        </div>

        <div className="latest-offerings-grid" ref={offeringsRef}>
          {offerings.map((offering, index) => (
            <article
              className={`offering-card ${
                index % 2 === 1 ? 'offering-card-reverse' : ''
              }`}
              key={offering.title}
            >
              <div className="offering-image-wrap">
                <img src={offering.image} alt={offering.title} />
              </div>

              <div className="offering-content">
                <h3>{offering.title}</h3>
                <p>{offering.desc}</p>

                <button
  className="offering-view-more"
  onClick={() => {
    if (offering.title === 'Wardrobes') {
      navigate('/offerings/modular-cupboards');
    } else if (offering.title === 'Exterior Elevations') {
      navigate('/offerings/exterior-works');
    }
    else if (offering.title === 'Glass & Aluminium Partitions') {
      navigate('/glass-aluminium-partitions');
    }
  }}
>
  Explore more
</button>

                {/* <button
                  className="offering-view-more"
                  onClick={() => {
                    if (offering.title === 'Wardrobes') {
                      window.location.href = '/modular-offerings';
                    }
                  }}
                >
                  View More
                </button> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
