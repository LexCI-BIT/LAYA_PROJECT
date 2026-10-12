import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Footer.css';

const Footer = () => {
    const { openModal } = useModal();

    return (
        <footer className="footer">
            {/* CTA Strip */}
            <div className="footer-cta-strip">
                <div className="container">
                    <div className="cta-content">
                        <h3>Need help designing your space?</h3>
                        <div className="cta-buttons">
                            <button className="cta-btn primary" onClick={openModal}>Get Free Consultation</button>
                            <a href="https://wa.me/918341884094" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
                                Contact on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer-main">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo-link" aria-label="Laya Space Design" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src="/images/laya-logo-dark.png" alt="Laya Space Design" className="footer-logo-img" />
                        </Link>
                        <p className="tagline">Modern Aluminium Interiors Crafted for Elegant Living</p>
                        <p className="description">
                            Premium aluminium interiors, modular cupboards, custom designs, and renovation solutions for modern homes.
                        </p>
                        <div className="footer-social">
                            <a href="https://www.instagram.com/laya.aluminiums?igsh=MWhsOWRiODk3aXV1MQ==" target="_blank" rel="noopener noreferrer" className="social-icon">Instagram</a>
                            <a href="https://wa.me/918341884094" target="_blank" rel="noopener noreferrer" className="social-icon">WhatsApp</a>
                        </div>
                    </div>

                    <div className="footer-grid">
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><Link to="/#how-it-works">How It Works</Link></li>
                                <li><Link to="/#expertise">Offerings</Link></li>
                                <li><Link to="/price-calculator">Price Calculator</Link></li>
                                <li><Link to="/#modular-journey">The Modular Journey</Link></li>
                                <li><Link to="/#contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Design Ideas</h4>
                            <ul>
                                <li><Link to="/design-ideas/wardrobe">Wardrobe Designs</Link></li>
                                <li><Link to="/design-ideas/kitchen">Kitchen Designs</Link></li>
                                <li><Link to="/design-ideas/living-room">Living Room Designs</Link></li>
                                <li><Link to="/design-ideas/space-saving">Space-Saving Ideas</Link></li>
                                <li><Link to="/design-ideas/tv-unit">TV Unit Designs</Link></li>
                                <li><Link to="/design-ideas/storage">Storage Solutions</Link></li>
                                <li><Link to="/design-ideas/custom">Custom Interior Ideas</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Offerings</h4>
                            <ul>
                                <li><Link to="/offerings/aluminium-interiors">Aluminium Interiors</Link></li>
                                <li><Link to="/offerings/modular-cupboards">Modular Cupboards</Link></li>
                                <li><Link to="/offerings/exterior-works">Exterior Works</Link></li>
                                <li><Link to="/offerings/custom-designs">Custom Designs</Link></li>
                                <li><Link to="/offerings/renovation">Renovation</Link></li>
                                <li><Link to="/offerings/wardrobe-solutions">Wardrobe Solutions</Link></li>
                                <li><Link to="/offerings/kitchen-solutions">Kitchen Solutions</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Cities We Serve</h4>
                            <div className="city-group">
                                <h5>Telangana</h5>
                                <ul>
                                    <li><Link to="/cities/hyderabad">Hyderabad</Link></li>
                                    <li><Link to="/cities/warangal">Warangal</Link></li>
                                    <li><Link to="/cities/karimnagar">Karimnagar</Link></li>
                                </ul>
                            </div>
                            <div className="city-group">
                                <h5>Andhra Pradesh</h5>
                                <ul>
                                    <li><Link to="/cities/vijayawada">Vijayawada</Link></li>
                                    <li><Link to="/cities/visakhapatnam">Visakhapatnam</Link></li>
                                    <li><Link to="/cities/guntur">Guntur</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="footer-col">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/#about">About Us</Link></li>
                                <li><Link to="/#why-choose-us">Why Choose Us</Link></li>
                                <li><Link to="/#process">Our Process</Link></li>
                                <li><Link to="/projects">Projects</Link></li>
                                <li><button className="link-btn" onClick={openModal}>Consultation</button></li>
                                <li><Link to="/#faqs">FAQs</Link></li>
                                <li><Link to="/#contact">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div className="footer-col">
                            <h4>Contact Us</h4>
                            <div className="contact-info">
                                <p className="contact-phone"><strong>Phone:</strong> <a href="tel:+918341884094">+91 83418 84094</a></p>
                                <p><strong>Email:</strong> <a href="mailto: layaspacedesign1993@gmail.com"> layaspacedesign1993@gmail.com</a></p>
                                <p><strong>Location:</strong> Telangana & Andhra Pradesh</p>
                                <p><strong>Working Hours:</strong><br />Mon – Sat | 9:00 AM – 7:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 1993–{new Date().getFullYear()} Laya Space Design. Engineers & Contractors in Architectural Aluminium Building Products. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

