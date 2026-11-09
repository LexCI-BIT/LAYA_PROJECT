import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PriceCalculatorNew.css';

const calculatorOptions = [
    {
        id: 'wardrobe',
        title: 'Wardrobe Cost Calculator',
        desc: 'Estimate the cost of your wardrobe based on style and storage needs.',
        image: '/calculator/wardrobe_hero.jpg'
    },
    {
        id: 'kitchen',
        title: 'Kitchen Cost Calculator',
        desc: 'Get an approximate cost for your modular kitchen design.',
        image: '/images/design-ideas/kitchen-designs-1.webp'
    },
    {
        id: 'full-home',
        title: 'Full Home Interior Calculator',
        desc: 'Understand the estimated budget for your complete home interior project.',
        image: '/images/design-ideas/luxury-living-room-1.webp'
    },
    {
        id: 'living-room',
        title: 'Living Room Calculator',
        desc: 'Estimate the cost of your living room interiors and TV units.',
        image: '/calculator/living_room.jpg'
    }
];

const PriceCalculatorMain = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pc-main-page">
            <section className="pc-hero animate-in">
                <div className="container">
                    <h1 className="pc-title">Choose a Cost Calculator</h1>
                    <p className="pc-subtitle">Estimate the cost of your interiors based on your design and space requirements.</p>
                </div>
            </section>

            <section className="pc-categories section-padding">
                <div className="container">
                    <div className="pc-grid">
                        {calculatorOptions.map((calc, index) => (
                            <Link 
                                key={calc.id} 
                                to={`/price-calculator/${calc.id}`} 
                                className="pc-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="pc-card-image">
                                    <img src={calc.image} alt={calc.title} />
                                    <div className="pc-card-overlay">
                                        <span className="pc-view-btn">Calculate Now</span>
                                    </div>
                                </div>
                                <div className="pc-card-info">
                                    <h3 className="pc-card-title">{calc.title}</h3>
                                    <p className="pc-card-desc">{calc.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PriceCalculatorMain;
