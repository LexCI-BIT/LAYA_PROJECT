import React, { useState, useEffect } from 'react';
import './PromoModal.css';
import promoImg from '../assets/promo_offer.png';
import { validateName, validatePhone, validatePincode, validateAll, trimValues } from '../utils/formValidation';

const promoRules = {
    name: validateName,
    phone: validatePhone,
    pincode: validatePincode
};

const PromoModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', pincode: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms

        const checkAndShow = () => {
            const isCompleted = localStorage.getItem('laya_promo_completed');
            if (isCompleted) return;

            const lastShown = localStorage.getItem('laya_promo_last_shown');
            const now = Date.now();

            if (!lastShown || now - parseInt(lastShown) >= REFRESH_INTERVAL) {
                setIsOpen(true);
            }
        };

        // Initial check with 1.5s delay
        const initialTimer = setTimeout(checkAndShow, 1500);

        // Periodic check every 30 seconds
        const interval = setInterval(checkAndShow, 30000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        localStorage.setItem('laya_promo_last_shown', Date.now().toString());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (touched[name]) {
            setErrors({ ...errors, [name]: promoRules[name](value) });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: promoRules[name](value) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateAll(formData, promoRules);
        setErrors(formErrors);
        setTouched({ name: true, phone: true, pincode: true });

        const firstInvalid = Object.keys(promoRules).find((key) => formErrors[key]);
        if (firstInvalid) {
            e.currentTarget.querySelector(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        console.log('Lead captured', trimValues(formData));
        localStorage.setItem('laya_promo_completed', 'true');
        setIsOpen(false);
    };

    const fieldProps = (name) => ({
        name,
        value: formData[name],
        onChange: handleChange,
        onBlur: handleBlur,
        className: `promo-input${errors[name] ? ' input-error' : ''}`,
        'aria-invalid': !!errors[name],
        'aria-describedby': errors[name] ? `promo-${name}-error` : undefined
    });

    const renderError = (name) =>
        errors[name] ? <span id={`promo-${name}-error`} className="promo-field-error">{errors[name]}</span> : null;

    if (!isOpen) return null;

    return (
        <div className="promo-modal-overlay" onClick={closeModal}>
            <div className="promo-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="promo-close-btn" onClick={closeModal} aria-label="Close modal">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="promo-image-container">
                    <img src={promoImg} alt="Special Offer" />
                </div>

                <div className="promo-content">
                    <h2 className="promo-title">Exclusive Offer</h2>
                    <p className="promo-subtitle sans-serif">Unlock 20% Off Your First Project</p>

                    <form className="promo-form" onSubmit={handleSubmit} noValidate>
                        <div>
                            <input
                                type="text"
                                placeholder="Your Name"
                                autoComplete="name"
                                maxLength={60}
                                {...fieldProps('name')}
                            />
                            {renderError('name')}
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                autoComplete="tel"
                                inputMode="tel"
                                maxLength={16}
                                {...fieldProps('phone')}
                            />
                            {renderError('phone')}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Pincode"
                                autoComplete="postal-code"
                                inputMode="numeric"
                                maxLength={6}
                                {...fieldProps('pincode')}
                            />
                            {renderError('pincode')}
                        </div>

                        <button type="submit" className="promo-submit-btn">
                            Continue
                        </button>
                    </form>

                    <p className="promo-disclaimer">
                        By continuing, you agree to our Terms of Use & Privacy Policy.
                        We'll use these details to share the offer with you.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromoModal;
