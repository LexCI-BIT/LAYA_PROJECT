import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
    const points = [
        { title: '35+ Years Experience', desc: 'A legacy of excellence in interior architecture.' },
        { title: 'Premium Aluminium Quality', desc: 'High-grade materials for lasting durability.' },
        { title: 'Modern Designs', desc: 'Sleek, contemporary aesthetics for any space.' },
        { title: 'Durable & Low Maintenance', desc: 'Built to withstand time with minimal effort.' },
        { title: 'Precision Craftsmanship', desc: 'Every detail meticulously planned and executed.' },
        { title: 'Customer Satisfaction', desc: 'Our commitment to your vision and happiness.' }
    ];

    return (
        <section className="why-choose-us" id="why-choose-us">
            <div className="container">
                <div className="why-header reveal-on-scroll">
                    <h2 className="why-title">Why Laya Space Design?</h2>
                </div>
                <div className="why-grid">
                    {points.map((point, index) => (
                        <div key={index} className={`why-card reveal-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <h3 className="why-card-title">{point.title}</h3>
                            <p className="why-card-desc">{point.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
