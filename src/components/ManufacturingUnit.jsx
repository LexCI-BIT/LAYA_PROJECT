import React from 'react';
import { Check } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import './ManufacturingUnit.css';

const services = [
    {
        title: 'Aluminium Sections & Profiles',
        desc: 'Supply of aluminium sections and profiles for doors, windows, partitions, interiors, and other architectural applications.'
    },
    {
        title: 'Custom Fabrication',
        desc: 'Fabricated components and sections designed to suit specific architectural and construction requirements.'
    },
    {
        title: 'Bulk Supply & Project Orders',
        desc: 'Aluminium material supply for contractors, fabricators, builders, interior designers, and large-scale projects.'
    }
];

const products = [
    { title: 'Aluminium Sections & Profiles', image: '/images/manufacturing/sections-profiles.jpg' },
    { title: 'Door & Window Profiles', image: '/images/manufacturing/door-window-profiles.jpg' },
    { title: 'Partition & Interior Sections', image: '/images/manufacturing/partition-sections.jpg' },
    { title: 'Custom-Fabricated Components', image: '/images/manufacturing/custom-components.jpg' }
];

const strengths = [
    { title: 'Quality Materials', desc: 'Aluminium products selected to meet project requirements.' },
    { title: 'Precision & Consistency', desc: 'Focus on accurate dimensions and consistent specifications.' },
    { title: 'Customised Solutions', desc: 'Options tailored to project needs.' },
    { title: 'Reliable Supply', desc: 'Coordinated material supply and delivery schedules.' },
    { title: 'Competitive Pricing', desc: 'Solutions suited to project budgets.' },
    { title: 'Customer-Focused Service', desc: 'Support from material selection to order fulfilment.' }
];

const ManufacturingUnit = () => {
    const { openModal } = useModal();

    return (
        <section className="manufacturing" id="manufacturing-unit">
            <div className="container">
                <div className="mfg-intro">
                    <div className="mfg-intro-media reveal-on-scroll">
                        <img
                            src="/images/manufacturing/factory-floor.jpg?v=2"
                            alt="Technicians assembling aluminium window frames on the Laya Space Design factory floor"
                            className="mfg-intro-main"
                            loading="lazy"
                        />
                        <img
                            src="/images/manufacturing/cnc-machining.jpg?v=2"
                            alt="Technician machining an aluminium profile on a CNC machine"
                            className="mfg-intro-inset"
                            loading="lazy"
                        />
                    </div>
                    <div className="mfg-intro-text reveal-on-scroll delay-200">
                        <span className="mfg-eyebrow">Aluminium Manufacturing</span>
                        <h2 className="mfg-title">Aluminium Manufacturing &amp; Supply</h2>
                        <p>
                            At Laya Space Design, we specialise in aluminium manufacturing, fabrication, and supply
                            solutions tailored to meet the needs of residential, commercial, and industrial projects.
                            Our focus is on delivering quality materials, precision workmanship, and dependable
                            service to support projects of every scale.
                        </p>
                        <p>
                            With an emphasis on durability, accuracy, and timely supply, we aim to provide aluminium
                            solutions that meet modern design and construction requirements.
                        </p>
                        <button onClick={openModal} className="mfg-cta">Request a Quote</button>
                    </div>
                </div>
            </div>

            <div className="mfg-offer">
                <div className="container">
                    <h3 className="mfg-subtitle reveal-on-scroll">What We Offer</h3>
                    <div className="mfg-services">
                        {services.map((service, index) => (
                            <div key={service.title} className="mfg-service">
                                <div className="mfg-service-body reveal-on-scroll">
                                    <span className="mfg-service-index">{String(index + 1).padStart(2, '0')}</span>
                                    <h4 className="mfg-service-title">{service.title}</h4>
                                    <p className="mfg-service-desc">{service.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="mfg-block">
                    <h3 className="mfg-subtitle reveal-on-scroll">Types of Aluminium Products</h3>
                    <div className="mfg-products">
                        {products.map((product, index) => (
                            <figure key={product.title} className={`mfg-product reveal-on-scroll delay-${index * 100 + 100}`}>
                                <div className="mfg-product-media">
                                    <img src={product.image} alt={product.title} loading="lazy" />
                                </div>
                                <figcaption>{product.title}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>

                <div className="mfg-block">
                    <h3 className="mfg-subtitle reveal-on-scroll">Why Source With Us</h3>
                    <ul className="mfg-strengths">
                        {strengths.map((item, index) => (
                            <li key={item.title} className={`mfg-strength reveal-on-scroll delay-${(index % 3) * 100 + 100}`}>
                                <span className="mfg-strength-icon"><Check size={16} strokeWidth={2} /></span>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ManufacturingUnit;
