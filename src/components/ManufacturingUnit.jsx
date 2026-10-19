
import React from 'react';
import { Check } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import './ManufacturingUnit.css';


const services = [
  {
    number: '01',
    title: 'Precision Manufacturing',
    description:
      'Advanced manufacturing processes deliver accurate aluminium profiles and components for architectural and industrial applications.'
  },
  {
    number: '02',
    title: 'Custom Fabrication',
    description:
      'Tailor-made aluminium components developed to meet specific dimensions, design requirements and project specifications.'
  },
  {
    number: '03',
    title: 'Quality & Finishing',
    description:
      'Careful attention to material quality, dimensional accuracy and finishing helps achieve reliable, professional results.'
  },
  {
    number: '04',
    title: 'Project-Based Supply',
    description:
      'Aluminium solutions for residential, commercial and large-scale projects, with an emphasis on consistency and dependable coordination.'
  }
];

const products = [
  {
    title: 'Aluminium Sections & Profiles',
    image: '/images/manufacturing/Aluminium-Sections-Profiles.png'
  },
  {
    title: 'Door & Window Profiles',
    image: 'https://image.made-in-china.com/2f0j00RNFcsMQBQjkZ/Manufacture-Modern-Custom-Made-Window-and-Aluminum-Aluminium-Profile-Metal-Door-Sliding-Doors.webp'
  },
  {
    title: 'Partition & Interior Sections',
    image: 'https://i.pinimg.com/474x/cd/49/f1/cd49f1b6a3b453389aa60e92bf9133ac.jpg'
  },
  {
    title: 'Custom-Fabricated Components',
    image: 'https://www.alineautomation.com/wp-content/uploads/2025/06/A-lineAutomation-399414-AluminumProfileBars-BlogBanner1-1024x536.jpg'
  }
];

const strengths = [
  {
    title: 'Precision & Accuracy',
    description:
      'Careful attention to measurements and specifications across aluminium products.'
  },
  {
    title: 'Product Versatility',
    description:
      'Solutions for architectural profiles, doors, windows, partitions and custom components.'
  },
  {
    title: 'Quality-Focused Approach',
    description:
      'Material selection and finishing considered to meet project requirements.'
  },
  {
    title: 'Custom Solutions',
    description:
      'Products planned around individual designs, dimensions and applications.'
  },
  {
    title: 'Project Coordination',
    description:
      'A coordinated approach to product requirements, specifications and supply.'
  },
  {
    title: 'Modern Applications',
    description:
      'Aluminium solutions suitable for contemporary residential and commercial spaces.'
  }
];

const ManufacturingUnit = ({
  showIntro = true,
  showBody = true
}) => {
  const { openModal } = useModal();

  return (
    <section className="manufacturing">

      {/* Manufacturing Introduction */}
      {showIntro && (
        <div className="container">
          <div className="mfg-intro">

           
            <div
              className="mfg-intro-media mfg-3d-scene"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                e.currentTarget.style.setProperty(
                  '--tilt-y',
                  `${(x - 0.5) * 30}deg`
                );
                e.currentTarget.style.setProperty(
                  '--tilt-x',
                  `${(0.5 - y) * 20}deg`
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty('--tilt-y', '0deg');
                e.currentTarget.style.setProperty('--tilt-x', '0deg');
              }}
            >
              <div className="mfg-3d-object">
                <img
                  className="mfg-intro-main mfg-3d-image"
                  src="/images/manufacturing/aluminium-manufacturing1.png"
                  alt="Aluminium profiles with metallic liquid splash"
                  loading="eager"
                />
              </div>
            </div>

            <div className="mfg-intro-text">
              <span className="mfg-eyebrow">
                OUR MANUFACTURING
              </span>

              <h2 className="mfg-title">
                Where Precision
                <br />
                Meets Possibility
              </h2>

              <p>
                We provide aluminium manufacturing and fabrication
                solutions for contemporary architecture, interiors
                and construction projects.
              </p>

              <p>
                From standard aluminium profiles to customised
                components, our approach focuses on precision,
                practical design and consistent quality.
              </p>

              <button
                type="button"
                className="mfg-cta"
                onClick={openModal}
              >
                Discuss Your Project
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Manufacturing Body */}
      {showBody && (
        <>
          {/* What We Offer */}
          <section className="mfg-offer" id="what-we-offer">
            <div className="container">

              <span className="mfg-eyebrow">
                OUR CAPABILITIES
              </span>

              <h2 className="mfg-subtitle">
                What We Offer
              </h2>

              <div className="mfg-services">
                {services.map((service) => (
                  <article
                    className="mfg-service"
                    key={service.number}
                  >
                    <div className="mfg-service-body">
                      <span className="mfg-service-index">
                        {service.number}
                      </span>

                      <h3 className="mfg-service-title">
                        {service.title}
                      </h3>

                      <p className="mfg-service-desc">
                        {service.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>

          {/* Types of Aluminium Products */}
          <section className="container mfg-block block1">
            <span className="mfg-eyebrow">
              OUR PRODUCT RANGE
            </span>

            <h2 className="mfg-subtitle">
              Types of Aluminium Products
            </h2>

            <div className="mfg-products">
              {products.map((product) => (
                <figure
                  className="mfg-product"
                  key={product.title}
                >
                  <div className="mfg-product-media">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                    />
                  </div>

                  <figcaption>
                    {product.title}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Why Source With Us */}
          <section className="container mfg-block">
            <span className="mfg-eyebrow">
              THE LAYA ADVANTAGE
            </span>

            <h2 className="mfg-subtitle">
              Why Source With Us
            </h2>

            <ul className="mfg-strengths">
              {strengths.map((strength) => (
                <li
                  className="mfg-strength"
                  key={strength.title}
                >
                  <span className="mfg-strength-icon">
                    <Check size={16} />
                  </span>

                  <div>
                    <h4>{strength.title}</h4>
                    <p>{strength.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

    </section>
  );
};

export default ManufacturingUnit;
