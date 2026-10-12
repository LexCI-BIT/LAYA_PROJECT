import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './FAQSection.css';

const faqs = [
    {
        question: 'What interior solutions does Laya Space Design offer?',
        answer: 'We create aluminium interiors, modular kitchens and cupboards, wardrobes, TV units, partitions, exterior works, and renovation solutions.'
    },
    {
        question: 'Can my design be customized to fit my space?',
        answer: 'Yes. Designs can be tailored to your room dimensions, storage needs, preferred finishes, and the way you use your space.'
    },
    {
        question: 'What are the benefits of aluminium interiors?',
        answer: 'Aluminium is moisture- and termite-resistant, durable, and easy to maintain. It is available in a range of finishes to suit your interior.'
    },
    {
        question: 'How does a project get started?',
        answer: 'We begin by understanding your requirements, then take measurements and prepare a design for your approval before manufacturing and installation.'
    },
    {
        question: 'How much will my project cost?',
        answer: 'The cost depends on the dimensions, design, materials, and finishes you choose. Use our calculator for an estimate, then speak with our team about your requirements.',
        link: true
    },
    {
        question: 'Which locations do you serve?',
        answer: 'Laya Space Design serves customers across Telangana and Andhra Pradesh. Contact us to discuss your location and project.'
    }
];

const FAQSection = () => {
    const { openModal } = useModal();

    return (
        <section className="faq-section" id="faqs" aria-labelledby="faq-title">
            <div className="container faq-layout">
                <div className="faq-intro reveal-on-scroll">
                    <span className="faq-eyebrow">FAQs</span>
                    <h2 id="faq-title">Good to know<br />before we begin.</h2>
                    <p>Quick answers about planning your aluminium interiors with Laya.</p>
                    <button className="faq-contact-button" onClick={openModal}>Ask us about your project <span aria-hidden="true">↗</span></button>
                </div>

                <div className="faq-list reveal-on-scroll delay-100">
                    {faqs.map((faq) => (
                        <details className="faq-item" key={faq.question}>
                            <summary>{faq.question}<span className="faq-toggle" aria-hidden="true" /></summary>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                                {faq.link && <Link to="/price-calculator">Explore the price calculator</Link>}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;