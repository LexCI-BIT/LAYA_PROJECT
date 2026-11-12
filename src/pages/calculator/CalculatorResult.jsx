import React, { useEffect } from 'react';
import { useLocation, Navigate, useParams, Link } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import { calculatorConfigs } from '../../data/calculatorConfig';
import './CalculatorFunnel.css';

const CalculatorResult = () => {
    const location = useLocation();
    const { type } = useParams();
    const { openModal } = useModal();
    const config = calculatorConfigs[type];

    // Destructure the data passed from the Form stage
    const { estimate, selections, leadInfo } = location.state || {};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Security check: if user navigated here directly without submitting the form, kick them back
    if (!location.state || !config) {
        return <Navigate to={`/price-calculator/${type}`} replace />;
    }

    const { title, disclaimer } = config.result;

    return (
        <div className="calc-funnel-page result-stage">
            <div className="container">
                <div className="cf-result-card animate-in">
                    <div className="cf-result-header">
                        <h2>{title}</h2>
                        {leadInfo.name && <p className="greet-name">Hi {leadInfo.name},</p>}
                    </div>

                    <div className="cf-price-reveal">
                        <span className="cf-currency">₹</span>
                        <span className="cf-amount">
                            {estimate.min.toLocaleString('en-IN')} – {estimate.max.toLocaleString('en-IN')}*
                        </span>
                    </div>

                    <div className="cf-summary-box">
                        <h3>Your Selections</h3>
                        <div className="cf-summary-list">
                            {config.form.sections.map(section => {
                                const selected = selections[section.id];
                                if (!selected) return null;
                                
                                let valText = '';
                                if (section.isMultiple) {
                                    if (selected.length === 0) return null;
                                    valText = selected.map(s => s.label).join(', ');
                                } else {
                                    valText = selected.label;
                                }

                                return (
                                    <div key={section.id} className="cf-summary-item">
                                        <span className="cf-sum-key">{section.title}</span>
                                        <span className="cf-sum-val">{valText}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="cf-disclaimer">
                        <p>{disclaimer}</p>
                    </div>

                    <div className="cf-result-ctas">
                        <button className="cf-btn-primary" onClick={openModal}>
                            Get Free Consultation
                        </button>
                        <a href="https://wa.me/918341884094?text=Hi,%20I%20just%20used%20your%20price%20calculator%20and%20want%20to%20discuss%20designing%20my%20space!" target="_blank" rel="noopener noreferrer" className="cf-btn-whatsapp">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                            </svg>
                            Discuss Requirements
                        </a>
                        <Link to={`/price-calculator`} className="cf-btn-tertiary">
                            Calculate Another Space
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorResult;
