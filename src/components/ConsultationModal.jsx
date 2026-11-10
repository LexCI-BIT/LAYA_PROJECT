import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import {
    validateName, validatePhone, validateEmail, validateRequired,
    validateMaxLength, validateAll, trimValues
} from '../utils/formValidation';
import { submitLead } from '../utils/submitLead';
import './ConsultationModal.css';

const initialFormData = {
    name: '',
    phone: '',
    email: '',
    city: '',
    requirement: '',
    message: ''
};

const rules = {
    name: validateName,
    phone: validatePhone,
    email: (v) => validateEmail(v),
    city: validateRequired('Please select your city.'),
    requirement: validateRequired('Please select your requirement.'),
    message: validateMaxLength(500, 'Message')
};

// Only mounted while the modal is open, so the form state resets every time it closes
const ConsultationModal = () => {
    const { isModalOpen, closeModal } = useModal();
    return isModalOpen ? <ConsultationModalContent closeModal={closeModal} /> : null;
};

const ConsultationModalContent = ({ closeModal }) => {
    const [submitted, setSubmitted] = useState(false);
    // 'idle', 'sending' or 'error' while the enquiry is on its way to the leads Sheet
    const [sendStatus, setSendStatus] = useState('idle');
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const timeoutRef = useRef(null);

    // Cancel the pending auto-close timer if the modal is closed manually
    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (touched[name]) {
            setErrors({ ...errors, [name]: rules[name](value) });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: rules[name](value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sendStatus === 'sending') return;
        const form = e.currentTarget;
        const formErrors = validateAll(formData, rules);
        setErrors(formErrors);
        setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

        const firstInvalid = Object.keys(rules).find((key) => formErrors[key]);
        if (firstInvalid) {
            form.querySelector(`[name="${firstInvalid}"]`)?.focus();
            return;
        }

        const lead = trimValues(formData);
        setSendStatus('sending');
        try {
            await submitLead({
                form: 'Consultation',
                name: lead.name,
                phone: lead.phone,
                email: lead.email,
                city: lead.city,
                requirement: lead.requirement,
                details: lead.message,
                website: form.elements.website.value
            });
            setSubmitted(true);
            timeoutRef.current = setTimeout(closeModal, 3000);
        } catch (error) {
            console.error('Consultation enquiry was not sent:', error);
            setSendStatus('error');
        }
    };

    const fieldProps = (name) => ({
        name,
        value: formData[name],
        onChange: handleChange,
        onBlur: handleBlur,
        className: errors[name] ? 'input-error' : undefined,
        'aria-invalid': !!errors[name],
        'aria-describedby': errors[name] ? `consult-${name}-error` : undefined
    });

    const renderError = (name) =>
        errors[name] ? <span id={`consult-${name}-error`} className="field-error">{errors[name]}</span> : null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>&times;</button>

                {!submitted ? (
                    <div className="modal-inner">
                        <div className="modal-header">
                            <h2>Book Your Free Consultation</h2>
                            <p>Our experts will connect with you to suggest the best aluminium design solutions.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="consultation-form" noValidate>
                            <div className="form-group">
                                <input
                                    type="text" placeholder="Full Name" autoComplete="name"
                                    maxLength={60} {...fieldProps('name')}
                                />
                                {renderError('name')}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="tel" placeholder="Phone Number" autoComplete="tel"
                                        inputMode="tel" maxLength={16} {...fieldProps('phone')}
                                    />
                                    {renderError('phone')}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email" placeholder="Email Address" autoComplete="email"
                                        maxLength={100} {...fieldProps('email')}
                                    />
                                    {renderError('email')}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <select {...fieldProps('city')}>
                                        <option value="">Select City</option>
                                        <option value="Hyderabad">Hyderabad</option>
                                        <option value="Warangal">Warangal</option>
                                        <option value="Visakhapatnam">Visakhapatnam</option>
                                        <option value="Vijayawada">Vijayawada</option>
                                        <option value="Other">Other (Telangana/AP)</option>
                                    </select>
                                    {renderError('city')}
                                </div>
                                <div className="form-group">
                                    <select {...fieldProps('requirement')}>
                                        <option value="">Requirement</option>
                                        <option value="Wardrobe">Wardrobe Designs</option>
                                        <option value="Kitchen">Kitchen Designs</option>
                                        <option value="Living Room">Living Room</option>
                                        <option value="Space Saving">Space Saving</option>
                                        <option value="Full Home">Full Home Interiors</option>
                                    </select>
                                    {renderError('requirement')}
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Message (Optional)" rows="3"
                                    maxLength={500} {...fieldProps('message')}
                                ></textarea>
                                {renderError('message')}
                            </div>
                            {/* Spam trap: hidden from visitors, only bots fill it in */}
                            <input type="text" name="website" className="form-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                            <button type="submit" className="submit-btn-premium" disabled={sendStatus === 'sending'}>
                                {sendStatus === 'sending' ? 'Sending…' : 'Submit Requirement'}
                            </button>
                            {sendStatus === 'error' && (
                                <p className="form-submit-error" role="alert">
                                    Sorry, your request couldn't be sent. Please try again, or call{' '}
                                    <a href="tel:+918341884094">+91 83418 84094</a> or{' '}
                                    <a href="https://wa.me/918341884094" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
                                </p>
                            )}
                        </form>
                    </div>
                ) : (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Thank You!</h2>
                        <p>Our team will contact you shortly to schedule your free consultation.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConsultationModal;
