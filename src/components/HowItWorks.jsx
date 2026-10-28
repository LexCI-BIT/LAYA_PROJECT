import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        {
            title: 'Consultation',
            desc: 'Share your requirements and ideas',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            )
        },
        {
            title: 'Design Planning',
            desc: 'Our experts create tailored designs',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
            )
        },
        {
            title: 'Material Selection',
            desc: 'Choose premium aluminium finishes',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            )
        },
        {
            title: 'Execution',
            desc: 'Precision-driven installation',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            )
        },
        {
            title: 'Delivery',
            desc: 'On-time project completion',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
            )
        }
    ];

    return (
        <section className="how-it-works" id="how-it-works">
            <div className="container">
                <h2 className="section-title reveal-on-scroll">How It Works</h2>
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className={`how-step-item reveal-on-scroll delay-${(index % 5) * 100 + 100}`}>
                            <div className="how-step-icon">
                                {step.icon}
                                <span className="step-number">{index + 1}</span>
                            </div>
                            <h3 className="how-step-title">{step.title}</h3>
                            <p className="how-step-desc">{step.desc}</p>
                            {index < steps.length - 1 && <div className="how-step-connector"></div>}
                        </div>
                    ))}
                </div>
                <div className="how-it-works-footer">
                    <button className="learn-more-btn">Learn More</button>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
