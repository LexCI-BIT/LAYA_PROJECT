import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Footer.css';
import WhatsAppIcon from './WhatsAppIcon';

const Footer = () => {
    const { openModal } = useModal();

    return (
        <footer className="footer">
            {/* CTA card */}
            <div className="footer-cta">
                <div className="container">
                    <div className="footer-cta-card" id="free-consultation">
                        <div className="footer-cta-text">
                            <span className="footer-cta-eyebrow">Free Design Consultation</span>
                            <h3 className="footer-cta-title">Need help designing your space?</h3>
                            <p className="footer-cta-sub">
                                Talk to our design team about your home and get expert guidance on the right aluminium interiors for your space.
                            </p>
                        </div>
                        <div className="footer-cta-actions">
                            <button className="footer-cta-btn primary" onClick={openModal}>Get Free Consultation</button>
                            <a href="https://wa.me/918341884094?text=Hi%2C%20I%E2%80%99m%20interested%20in%20aluminium%20interiors.%20I%20would%20like%20a%20consultation." target="_blank" rel="noopener noreferrer" className="footer-cta-btn whatsapp">
                                <WhatsAppIcon />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo-link" aria-label="Laya Space Design" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src="/images/laya-logo-horizontal-dark1.png" alt="Laya Space Design" className="footer-logo-img" />
                        </Link>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/laya.aluminiums?igsh=MWhsOWRiODk3aXV1MQ==" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram" title="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="https://wa.me/918341884094" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp" title="WhatsApp">
                                <WhatsAppIcon />
                            </a>
                        </div>
                    </div>

                    <div className="footer-grid">
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about-us">About Us</Link></li>
                                <li><Link to="/aluminium-manufacturing">Aluminium Manufacturing</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Design Ideas</h4>
                            <ul>
                                <li><Link to="/design-ideas/wardrobe">Wardrobe Designs</Link></li>
                                <li><Link to="/design-ideas/kitchen">Kitchen Designs</Link></li>
                                <li><Link to="/design-ideas/living-room">Living Room Designs</Link></li>
                                <li><Link to="/design-ideas/space-saving">Space Saving Ideas</Link></li>
                                {/* Listed for information only: no pages for these yet */}
                                <li><span className="footer-plain-item">TV Unit Designs</span></li>
                                <li><span className="footer-plain-item">Storage Solutions</span></li>
                                <li><span className="footer-plain-item">Custom Interior Ideas</span></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Offerings</h4>
                            <ul>
                                <li><Link to="/offerings/aluminium-interiors">Aluminium Interiors</Link></li>
                                <li><Link to="/offerings/modular-cupboards">Modular Cupboards</Link></li>
                                <li><Link to="/glass-aluminium-partitions">Glass & Aluminium Partitions</Link></li>
                                <li><Link to="/offerings/exterior-works">Exterior Works</Link></li>
                                <li><Link to="/offerings/custom-designs">Custom Designs</Link></li>
                                <li><Link to="/offerings/renovation">Renovation</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Cities We Serve</h4>
                            <div className="city-group">
                                <h5>Telangana</h5>
                                <ul>
                                    <li><span className="footer-plain-item">Hyderabad</span></li>
                                    <li><span className="footer-plain-item">Warangal</span></li>
                                    <li><span className="footer-plain-item">Karimnagar</span></li>
                                </ul>
                            </div>
                            <div className="city-group">
                                <h5>Andhra Pradesh</h5>
                                <ul>
                                    <li><span className="footer-plain-item">Vijayawada</span></li>
                                    <li><span className="footer-plain-item">Visakhapatnam</span></li>
                                    <li><span className="footer-plain-item">Guntur</span></li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about-us">About Us</Link></li>
                                <li><Link to="/#why-choose-us">Why Choose Us</Link></li>
                                <li><Link to="/#modular-journey">Our Process</Link></li>
                                <li><button className="link-btn" onClick={openModal}>Consultation</button></li>
                                <li><Link to="/#faqs">FAQs</Link></li>
                                {/* Scrolls to the consultation card above, on whichever page the visitor is on */}
                                <li><Link to="#free-consultation">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Contact Us</h4>
                            <div className="contact-info">
                                <p className="contact-phone"><strong>Phone:</strong> <a href="tel:+918341884094">+91 83418 84094</a></p>
                                <p><strong>Email:</strong> <a href="mailto:layaspacedesign1993@gmail.com">layaspacedesign1993@gmail.com</a></p>
                                <p><strong>Location:</strong> Telangana & Andhra Pradesh</p>
                                <p><strong>Working Hours:</strong>Mon – Sat | 9:00 AM – 7:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {new Date().getFullYear()} Laya Space Design. Engineers & Contractors in Architectural Aluminium Building Products. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

