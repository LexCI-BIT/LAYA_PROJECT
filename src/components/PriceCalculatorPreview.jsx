import React from 'react';
import { Link } from 'react-router-dom';
import { WardrobeIcon, KitchenIcon, TVUnitIcon, HouseIcon } from './Icons';
import './PriceCalculatorPreview.css';

// Each tile opens that calculator directly (icons from the site's own icon set, no photos)
const calculators = [
  { type: 'wardrobe', label: 'Wardrobe', Icon: WardrobeIcon },
  { type: 'kitchen', label: 'Kitchen', Icon: KitchenIcon },
  { type: 'living-room', label: 'Living Room', Icon: TVUnitIcon },
  { type: 'full-home', label: 'Full Home', Icon: HouseIcon },
];

const steps = [
  'Choose your space and layout',
  'Select size and finish level',
  'Get an instant estimate',
];

const PriceCalculatorPreview = () => {
  return (
    <section className="price-calculator-preview">
      <div className="container">
        <div className="pcp-layout">
          <div className="pcp-content">
            <span className="pcp-eyebrow">Price Calculator</span>
            <h2 className="pcp-title">Try Our Price Calculator</h2>
            <p className="pcp-text">
              Get a quick estimate for your home interior project in just a few clicks.
            </p>

            <ol className="pcp-steps">
              {steps.map((step, i) => (
                <li key={step}>
                  <span className="pcp-step-num">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <Link to="/price-calculator" className="pcp-btn">
              Calculate Now
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="pcp-tiles">
            {calculators.map((calc) => {
              const { Icon } = calc;
              return (
                <Link key={calc.type} to={`/price-calculator/${calc.type}`} className="pcp-tile">
                  <span className="pcp-tile-icon" aria-hidden="true">
                    <Icon size={26} />
                  </span>
                  <span className="pcp-tile-name">{calc.label}</span>
                  <span className="pcp-tile-cta">
                    Get Estimate
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculatorPreview;
