import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { calculatorConfigs } from '../../data/calculatorConfig';
import './CalculatorFunnel.css';

const CalculatorIntro = () => {
    const { type } = useParams();
    const config = calculatorConfigs[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    if (!config) {
        return <Navigate to="/price-calculator" replace />;
    }

    const introData = config.intro;
    // Format the ID for natural display (e.g., 'full-home' -> 'full home')
    const displayType = config.id.replace('-', ' ');
    // Title-cased version for headings (e.g., 'full-home' -> 'Full Home')
    const displayTypeTitle = displayType.replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="calc-funnel-page intro-stage">
            
            {/* 1. HERO SECTION (Dark with Background) */}
            <section 
                className="cf-section dark-bg cf-hero-wrapper"
                style={{ 
                    backgroundImage: `url("${introData.heroImage}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="container">
                    <div className="cf-hero animate-in">
                        <h1 className="cf-title">Wondering how much your {displayType} costs?</h1>
                        <p className="cf-subtitle">Find the price of your {displayType} effortlessly in 4 steps</p>
                        <div className="cf-hero-cta">
                            <Link to={`/price-calculator/${type}/form`} className="cf-btn-primary">
                                CALCULATE NOW
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. EXPLAINER SECTION (Light) */}
            <section className="cf-section light-bg">
                <div className="container">
                    <div className="cf-intro-text animate-in">
                        <h2 className="cf-section-title dark-text center">{introData.title}</h2>
                        <p className="cf-short-intro-desc">{introData.shortIntro}</p>
                    </div>
                </div>
            </section>

            {/* 3. THE PROCESS SECTION (Light Split View) */}
            <section className="cf-section light-bg cf-process-section">
                <div className="container cf-process-container">
                    {/* Left Header Column */}
                    <div className="cf-process-header animate-in">
                        <div className="cf-process-slashes"></div>
                        <h2 className="cf-process-title">The Process</h2>
                        <p className="cf-process-intro">
                            Through a unique combination of engineering, construction, and design discipline, we deliver precision aluminium interiors for modern living.
                        </p>
                    </div>

                    {/* Right Steps Grid */}
                    <div className="cf-process-grid animate-in">
                        {introData.steps.map((step, index) => (
                            <div key={index} className="cf-process-card">
                                <span className="cf-process-number">0{index + 1}</span>
                                <div className="cf-process-content">
                                    <h4 className="cf-process-step-title">{step.title}</h4>
                                    <p className="cf-process-step-desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. FAQ SECTION (Dark) */}
            <section className="cf-section dark-bg">
                <div className="container">
                    <h2 className="cf-section-title center">How the {displayTypeTitle} Price Calculator Works</h2>
                    <div className="cf-faq-grid animate-in">
                        {introData.howItWorks.map((item, index) => (
                            <div key={index} className="cf-faq-card">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default CalculatorIntro;
