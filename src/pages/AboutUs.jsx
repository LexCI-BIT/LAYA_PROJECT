import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HowItWorks from '../components/HowItWorks';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
  Eye,
  Target,
  Workflow,
  Users,
  CheckCircle2
} from 'lucide-react';
import './AboutUs.css';

const faqs = [
  {
    question: 'What services does Laya Space Design provide?',
    answer:
      'We provide interior design solutions, space planning, aluminium profiles, fabrication and customised solutions for residential and commercial projects.'
  },
  {
    question: 'Do you provide customised design solutions?',
    answer:
      'Yes. We consider your space, dimensions, functional needs, material preferences and design requirements to develop suitable solutions for your project.'
  },
  {
    question: 'Can I source aluminium products for my project?',
    answer:
      'Yes. We offer aluminium profiles and fabrication solutions for architectural applications, including doors, windows, partitions and custom components.'
  },
  {
    question: 'How do I get started with a project?',
    answer:
      'Contact our team with your project details, requirements and approximate dimensions. We will discuss your needs and guide you through the next steps.'
  },
  {
    question: 'Do you handle residential and commercial projects?',
    answer:
      'Yes. Our solutions are intended for a range of residential and commercial spaces, with recommendations tailored to each project.'
  },
  {
    question: 'How can I request a consultation?',
    answer:
      'Use the consultation or WhatsApp option on our website to share your requirements. Our team can then discuss your project and the appropriate next steps.'
  }
];

const processSteps = [
  {
    number: '01',
    title: 'Understand',
    description:
      'We begin by understanding your vision, requirements, space, budget and functional expectations.',
    icon: Users
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'We explore suitable materials, design possibilities, dimensions and solutions for your project.',
    icon: Target
  },
  {
    number: '03',
    title: 'Create',
    description:
      'We coordinate design, product selection and customised solutions around the agreed requirements.',
    icon: Workflow
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We focus on quality, precision and coordination to help bring the planned solution to life.',
    icon: CheckCircle2
  }
];

const clientSegments = [
  {
    number: '01',
    title: 'Residential Spaces',
    description:
      'Thoughtfully planned interiors and architectural solutions for homes.',
    image: '/images/about/clients/residential.jpg',
    alt: 'Residential interior design'
  },
  {
    number: '02',
    title: 'Commercial Spaces',
    description:
      'Functional, contemporary solutions for offices and business environments.',
    image: '/images/about/clients/commercial.jpg',
    alt: 'Contemporary commercial space'
  },
  {
    number: '03',
    title: 'Architects & Designers',
    description:
      'Material and product solutions that support architectural concepts.',
    image: '/images/about/clients/architects.jpg',
    alt: 'Architectural planning and design'
  },
  {
    number: '04',
    title: 'Hospitality & Retail',
    description:
      'Space-conscious solutions for customer-facing and hospitality environments.',
    image: '/images/about/clients/hospitality.jpg',
    alt: 'Hospitality and retail interior'
  },
  {
    number: '05',
    title: 'Project Partners',
    description:
      'Customised product and supply support for project-specific requirements.',
    image: '/images/about/clients/partners.jpg',
    alt: 'Architectural project collaboration'
  }
];

const AboutUs = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const pageRef = useRef(null);

  // useEffect(() => {
  //   const page = pageRef.current;

  //   if (!page) return undefined;

  //   const elements = page.querySelectorAll('[data-reveal]');

  //   if (!('IntersectionObserver' in window)) {
  //     elements.forEach((element) => {
  //       element.classList.add('is-visible');
  //     });

  //     return undefined;
  //   }

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add('is-visible');
  //           observer.unobserve(entry.target);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.12,
  //       rootMargin: '0px 0px -45px 0px'
  //     }
  //   );

  //   elements.forEach((element) => observer.observe(element));

  //   return () => observer.disconnect();
  // }, []);

  useEffect(() => {
  const page = pageRef.current;

  if (!page) return undefined;

  const elements = page.querySelectorAll('[data-reveal]');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => {
      element.classList.add('is-visible');
    });

    return undefined;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.12) {
          // Entering the viewport: play the animation
          entry.target.classList.add('is-visible');
        } else if (!entry.isIntersecting) {
          // Fully out of the viewport: reset so it can play again
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      // 0 detects "fully out of view", 0.12 detects "enough is visible"
      threshold: [0, 0.12],
      rootMargin: '0px 0px -45px 0px'
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);

  return (
    <main className="about-page" ref={pageRef}>
      <section className="about-hero">
        <div className="about-hero-grid" aria-hidden="true" />

        <div
          className="container about-hero-content"
          data-reveal="hero"
        >
          <span className="about-eyebrow">
            THE STORY BEHIND OUR WORK
          </span>

          <h1>
            Spaces shaped by
            <br />
            <em>purpose &amp; precision.</em>
          </h1>

          <p>
            We bring together thoughtful design, carefully considered
            materials and customised solutions to create spaces that
            balance aesthetics with functionality.
          </p>

          <a href="#about-vision" className="about-hero-link">
            DISCOVER OUR APPROACH
            <ArrowDown size={16} />
          </a>
        </div>

        <div className="about-hero-caption">
          DESIGN <span>•</span> MATERIALS <span>•</span> DETAIL
        </div>
      </section>

      <section
        id="about-vision"
        className="about-purpose about-vision"
      >
        <div className="container about-purpose-grid">
          <div
            className="about-purpose-label"
            data-reveal="slide-left"
          >
            <h2 className="about-eyebrow"> OUR VISION</h2>
            
          </div>

          <div className="about-vision-layout">
            <div
              className="about-purpose-content"
              data-reveal="slide-right"
            >
              <h2>
                Creating spaces
                <br />
                that <em>inspire.</em>
              </h2>

              <p className="about-lead">
                To shape better spaces through thoughtful design,
                purposeful materials and solutions that stand the
                test of time.
              </p>

              <p>
                We envision environments where every detail has a
                purpose, every material adds value, and every space
                reflects the people who use it. Our approach brings
                design intent and practical requirements together
                to create meaningful results.
              </p>
            </div>

            <figure
              className="about-image-frame about-vision-image"
              data-reveal="image-reveal"
            >
              <img
                src="/images/about/vision.png"
                alt="Thoughtfully designed contemporary interior"
                loading="lazy"
              />
              <figcaption>DESIGNED WITH PURPOSE</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="about-purpose about-mission">
        <div className="container about-purpose-grid">
          <div
            className="about-purpose-label"
            data-reveal="slide-left"
          >
            <h2 className="about-eyebrow"> OUR MISSION</h2>
            
          </div>

          <div className="about-mission-layout">
            <figure
              className="about-image-frame about-mission-image"
              data-reveal="image-reveal"
            >
              <img
                src="/images/about/mission.png"
                alt="Materials and details in a modern architectural space"
                loading="lazy"
              />
              <figcaption>PRECISION IN EVERY DETAIL</figcaption>
            </figure>

            <div
              className="about-purpose-content"
              data-reveal="slide-right"
            >
              <h2>
                Thoughtful design.
                <br />
                <em>Reliable execution.</em>
              </h2>

              <p className="about-lead">
                To provide carefully planned design and product
                solutions that meet real-world requirements without
                compromising on quality or detail.
              </p>

              <p>
                From understanding your requirements to selecting
                suitable materials and coordinating project needs,
                we aim to make every stage clear, considered and
                purposeful. We value precision, transparency and
                long-term relationships built on trust.
              </p>

              <div className="about-values">
                <span>Purposeful Design</span>
                <span>Material Quality</span>
                <span>Attention to Detail</span>
                <span>Client Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section id="about-clients" className="about-clients">
        <div className="container">
          <div
            className="about-section-heading"
            data-reveal="fade-up"
          >
            <h2>
              Our Clients
              <br />
            </h2>

            <p>
              We work towards solutions that respond to the different
              needs of spaces, professionals and projects.
            </p>
          </div>

          <div className="about-clients-grid">
            {clientSegments.map((client, index) => (
              <article
                className="about-client-card"
                key={client.number}
                data-reveal="client-card"
                style={{ '--reveal-delay': `${index * 100}ms` }}
              >
                <div className="about-client-image">
                  <img
                    src={client.image}
                    alt={client.alt}
                    loading="lazy"
                  />
                  <span>{client.number}</span>
                </div>

                <div className="about-client-content">
                  <h3>{client.title}</h3>

                  <p>{client.description}</p>

                  <ArrowUpRight
                    className="about-client-arrow"
                    size={20}
                    strokeWidth={1.4}
                  />
                </div>
              </article>
            ))}
          </div>

          <div
            className="about-client-note"
            data-reveal="fade-up"
          >
            <span className="about-client-note-line" />

            <p>
              Every project is different. Our focus remains the same:
              understand the requirement, consider the details and
              find the right solution.
            </p>
          </div>
        </div>
      </section>

      <section id="about-faq" className="about-faq">
        <div className="container about-faq-grid">
          <div
            className="about-faq-intro"
            data-reveal="slide-left"
          >
            <span className="about-eyebrow"> GOOD TO KNOW</span>

            <h2>
              Frequently
              <br />
              asked <em>questions.</em>
            </h2>

            <p>
              Have something specific in mind? Find answers to
              common questions about our services and process.
            </p>

            <figure className="about-image-frame about-faq-image">
              <img
                src="/images/about/faq.png"
                alt="Interior design materials and finishes"
                loading="lazy"
              />
              <figcaption>THE DETAILS MATTER</figcaption>
            </figure>

            <Link to="/#contact" className="about-text-link">
              HAVE ANOTHER QUESTION?
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div
            className="about-faq-list"
            data-reveal="slide-right"
          >
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          const answerId = `about-faq-answer-${index}`;

          return (
            <div
              className="about-faq-reveal"
              key={faq.question}
              style={{ '--reveal-delay': `${index * 65}ms` }}
              data-reveal="faq-item"
            >
              <article className={`about-faq-item ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="about-faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={19} className="about-faq-chevron" />
                </button>

                {isOpen && (
                  <div className="about-faq-answer" id={answerId}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            </div>
          );
        })}
          </div>
        </div>
      </section>



    </main>
  );
};

export default AboutUs;