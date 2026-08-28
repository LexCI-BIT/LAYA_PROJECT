import React from 'react';
import './Expertise.css';

const Expertise = () => {
    const expertiseItems = [
        {
            title: 'Aluminium Interiors',
            desc: 'Precision-crafted solutions for modern homes.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            )
        },
        {
            title: 'Modular Cupboards',
            desc: 'Elegant storage designed for maximum efficiency.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
            )
        },
        {
            title: 'Exterior Works',
            desc: 'Durable and stylish aluminium exterior solutions.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
            )
        },
        {
            title: 'Custom Designs',
            desc: 'Tailored interiors that reflect your unique style.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8l4 4-4 4-4-4 4-4z"></path>
                </svg>
            )
        },
        {
            title: 'Construction',
            desc: 'End-to-end construction services with quality craftsmanship.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20h20"></path>
                    <path d="M5 20V10l7-5 7 5v10"></path>
                    <rect x="9" y="14" width="6" height="6"></rect>
                    <line x1="12" y1="3" x2="12" y2="5"></line>
                    <polyline points="3 11 5 10"></polyline>
                    <polyline points="19 10 21 11"></polyline>
                </svg>
            )
        },
        {
            title: 'Glasswork',
            desc: 'Premium glass installations for elegant, modern spaces.',
            icon: (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="1"></rect>
                    <line x1="12" y1="3" x2="12" y2="21"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="3" x2="12" y2="12"></line>
                    <line x1="12" y1="12" x2="21" y2="21"></line>
                </svg>
            )
        }
    ];

    return (
        <section className="expertise" id="expertise">
            <div className="container">
                <div className="expertise-header reveal-on-scroll">
                    <h2 className="expertise-title">Our Expertise</h2>
                </div>
                <div className="expertise-grid">
                    {expertiseItems.map((item, index) => (
                        <div key={index} className={`expertise-card reveal-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <div className="expertise-icon">{item.icon}</div>
                            <h3 className="expertise-card-title">{item.title}</h3>
                            <p className="expertise-card-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
