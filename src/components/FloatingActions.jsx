import React from 'react';
import './FloatingActions.css';
import WhatsAppIcon, { WhatsAppIconSprite } from './WhatsAppIcon';

const FloatingActions = () => {
    const whatsappNumber = "918341884094"; // +91 83418 84094 (wa.me needs digits only)
    const whatsappMessage = encodeURIComponent("Hi, I’m interested in aluminium interiors. I would like a consultation.");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div className="floating-actions-container">
            <WhatsAppIconSprite />
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="floating-whatsapp"
                title="Chat with us"
            >
                <WhatsAppIcon />
            </a>
        </div>
    );
};

export default FloatingActions;
