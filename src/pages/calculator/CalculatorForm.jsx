import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { calculatorConfigs } from '../../data/calculatorConfig';
import { validateName, validatePhone, validateCity, validateEmail, validateAll, trimValues } from '../../utils/formValidation';
import './CalculatorFunnel.css';

const leadRules = {
    name: validateName,
    phone: validatePhone,
    city: validateCity,
    email: (v) => validateEmail(v, { required: false })
};

const CalculatorForm = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const config = calculatorConfigs[type];

    const [currentStep, setCurrentStep] = useState(0);
    const [selections, setSelections] = useState({});
    const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', city: '', email: '' });
    const [leadErrors, setLeadErrors] = useState({});
    const [leadTouched, setLeadTouched] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentStep]);

    if (!config) {
        return <Navigate to="/price-calculator" replace />;
    }

    const sections = config.form.sections;
    const totalSteps = sections.length + 1; // +1 for the lead capture step

    const handleSingleSelect = (sectionId, option) => {
        setSelections(prev => ({
            ...prev,
            [sectionId]: option
        }));
        // Auto-advance for single selection (to a fixed step, so double-clicks can't skip a step)
        const nextStep = currentStep + 1;
        setTimeout(() => {
            setCurrentStep(nextStep);
        }, 400);
    };

    const handleMultiSelect = (sectionId, option) => {
        setSelections(prev => {
            const currentList = prev[sectionId] || [];
            const exists = currentList.find(item => item.label === option.label);
            
            if (exists) {
                return { ...prev, [sectionId]: currentList.filter(item => item.label !== option.label) };
            } else {
                return { ...prev, [sectionId]: [...currentList, option] };
            }
        });
    };

    const handleLeadChange = (e) => {
        const { name, value } = e.target;
        setLeadInfo({ ...leadInfo, [name]: value });
        if (leadTouched[name]) {
            setLeadErrors({ ...leadErrors, [name]: leadRules[name](value) });
        }
    };

    const handleLeadBlur = (e) => {
        const { name, value } = e.target;
        setLeadTouched({ ...leadTouched, [name]: true });
        setLeadErrors({ ...leadErrors, [name]: leadRules[name](value) });
    };

    const leadFieldProps = (name) => ({
        name,
        value: leadInfo[name],
        onChange: handleLeadChange,
        onBlur: handleLeadBlur,
        className: leadErrors[name] ? 'input-error' : undefined,
        'aria-invalid': !!leadErrors[name],
        'aria-describedby': leadErrors[name] ? `lead-${name}-error` : undefined
    });

    const renderLeadError = (name) =>
        leadErrors[name] ? <span id={`lead-${name}-error`} className="cf-field-error">{leadErrors[name]}</span> : null;

    const calculateTotal = () => {
        let calculatedBase = config.basePrice;
        let addonsCost = 0;

        sections.forEach(sec => {
            const selected = selections[sec.id];
            if (!selected) return;

            if (sec.isMultiple) {
                selected.forEach(addon => { addonsCost += addon.price; });
            } else {
                calculatedBase *= selected.multiplier;
            }
        });
        
        const total = calculatedBase + addonsCost;
        return {
            min: Math.round((total * 0.9) / 1000) * 1000,
            max: Math.round((total * 1.1) / 1000) * 1000
        };
    };

    const submitForm = (e) => {
        e.preventDefault();
        const formErrors = validateAll(leadInfo, leadRules);
        setLeadErrors(formErrors);
        setLeadTouched({ name: true, phone: true, city: true, email: true });

        const firstInvalid = Object.keys(leadRules).find((key) => formErrors[key]);
        if (firstInvalid) {
            e.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        // Here, an API call would normally fire to save the lead.

        const estimate = calculateTotal();

        // Push to result page with the data
        navigate(`/price-calculator/${type}/result`, {
            state: { estimate, selections, leadInfo: trimValues(leadInfo) }
        });
    };

    const renderStepContent = () => {
        if (currentStep < sections.length) {
            const section = sections[currentStep];
            return (
                <div className="cf-form-step animate-in">
                    <h2 className="cf-step-question">Step {currentStep + 1}: {section.title}</h2>
                    <div className="cf-options-grid">
                        {section.options.map(opt => {
                            let isSelected = false;
                            if (section.isMultiple) {
                                isSelected = selections[section.id]?.some(item => item.label === opt.label);
                            } else {
                                isSelected = selections[section.id]?.label === opt.label;
                            }

                            return (
                                <button
                                    key={opt.label}
                                    className={`cf-option-btn ${isSelected ? 'selected' : ''}`}
                                    onClick={() => section.isMultiple ? handleMultiSelect(section.id, opt) : handleSingleSelect(section.id, opt)}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                    {section.isMultiple && (
                        <div className="cf-step-actions">
                            <button 
                                className="cf-btn-primary" 
                                onClick={() => setCurrentStep(prev => prev + 1)}
                                disabled={!selections[section.id] || selections[section.id].length === 0}
                            >
                                Continue
                            </button>
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <div className="cf-form-step animate-in">
                    <h2 className="cf-step-question">Last Step: Get Your Quote</h2>
                    <p className="cf-lead-desc">Where should we send your detailed interior estimate?</p>
                    <form className="cf-lead-form" onSubmit={submitForm} noValidate>
                        <div className="input-group">
                            <label htmlFor="lead-name">Full Name</label>
                            <input id="lead-name" type="text" autoComplete="name" maxLength={60} placeholder="Enter your name" {...leadFieldProps('name')} />
                            {renderLeadError('name')}
                        </div>
                        <div className="input-group">
                            <label htmlFor="lead-phone">Phone Number</label>
                            <input id="lead-phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={16} placeholder="+91 XXXXX XXXXX" {...leadFieldProps('phone')} />
                            {renderLeadError('phone')}
                        </div>
                        <div className="input-group">
                            <label htmlFor="lead-city">City / Location</label>
                            <input id="lead-city" type="text" autoComplete="address-level2" maxLength={50} placeholder="E.g., Hyderabad" {...leadFieldProps('city')} />
                            {renderLeadError('city')}
                        </div>
                        <div className="input-group">
                            <label htmlFor="lead-email">Email Address (Optional)</label>
                            <input id="lead-email" type="email" autoComplete="email" maxLength={100} placeholder="you@example.com" {...leadFieldProps('email')} />
                            {renderLeadError('email')}
                        </div>
                        <button type="submit" className="cf-btn-submit">View My Estimate</button>
                    </form>
                </div>
            );
        }
    };

    return (
        <div className="calc-funnel-page form-stage">
            <div className="cf-form-container">
                <div className="cf-progress-bar">
                    <div 
                        className="cf-progress-fill" 
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                </div>
                
                <div className="cf-back-control">
                    {currentStep > 0 && (
                        <button className="cf-btn-back" onClick={() => setCurrentStep(prev => prev - 1)}>
                            ← Back
                        </button>
                    )}
                </div>

                <div className="cf-step-wrapper">
                    {renderStepContent()}
                </div>
            </div>
        </div>
    );
};

export default CalculatorForm;
