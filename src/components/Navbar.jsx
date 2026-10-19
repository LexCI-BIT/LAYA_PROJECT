import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openModal } = useModal();
  const isSubPage = location.pathname !== '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashLink = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${(scrolled || isSubPage) ? 'scrolled' : ''}`}>
      <div className="navbar-top-container container">
        <div className="nav-links left-links">
          <div className="nav-item-dropdown">
            <Link to="/design-ideas" className="dropdown-trigger nav-link-with-arrow">
              <span>Design Ideas</span>
              <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className="dropdown-menu">
              <Link to="/design-ideas/wardrobe">Wardrobe Designs</Link>
              <Link to="/design-ideas/kitchen">Kitchen Designs</Link>
              <Link to="/design-ideas/living-room">Living Room Designs</Link>
              <Link to="/design-ideas/space-saving">Space Saving Ideas</Link>
            </div>
          </div>
          <div className="nav-item-dropdown">
            <a href="#cities" className="dropdown-trigger nav-link-with-arrow">
              <span>Cities</span>
              <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="dropdown-menu">
              <div className="nested-dropdown-item">
                <a href="#telangana" className="nav-link-with-arrow">
                  <span>Telangana</span>
                  <svg className="dropdown-arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="nested-dropdown-menu">
                  <Link to="/cities/hyderabad">Hyderabad</Link>
                  <Link to="/cities/warangal">Warangal</Link>
                  <Link to="/cities/karimnagar">Karimnagar</Link>
                </div>
              </div>
              <div className="nested-dropdown-item">
                <a href="#andhra-pradesh" className="nav-link-with-arrow">
                  <span>Andhra Pradesh</span>
                  <svg className="dropdown-arrow-right" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="nested-dropdown-menu">
                  <Link to="/cities/vijayawada">Vijayawada</Link>
                  <Link to="/cities/visakhapatnam">Visakhapatnam</Link>
                  <Link to="/cities/guntur">Guntur</Link>
                </div>
              </div>
            </div>
          </div>
          <Link to="/projects">
            <span>Projects</span>
          </Link>
        </div>

        {/* <Link to="/" className="navbar-logo" aria-label="Laya Space Design" onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>
          <img 
            src="/images/laya-logo-horizontal-dark.png" 
            alt="Laya Space Design" 
            className="navbar-logo-img logo-dark" 
          />
          <img 
            src="/images/laya-logo-horizontal.png" 
            alt="Laya Space Design" 
            className="navbar-logo-img logo-light" 
          />
        </Link> */}

        <div className="nav-links right-links">
          <Link to="/#login" className="icon-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </Link>
          <a href="#consult" onClick={(e) => { e.preventDefault(); openModal(); }} className="consult-btn">Consult Online</a>
        </div>
      </div>

      <div className="navbar-bottom-container container">
        <div className="sub-nav-links">
          <Link to="/" onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}><span>Home</span></Link>
          <Link to="/#manufacturing-unit" onClick={(e) => handleHashLink(e, 'manufacturing-unit')}><span>Aluminium Manufacturing</span></Link>
          <div className="nav-item-dropdown">
            <Link to="/#offerings" className="dropdown-trigger" onClick={(e) => handleHashLink(e, 'offerings')}>
              <span>Offerings</span>
            </Link>
            <div className="dropdown-menu">
              <Link to="/offerings/aluminium-interiors">Aluminium Interiors</Link>
              <Link to="/offerings/modular-cupboards">Modular Cupboards</Link>
              <Link to="/offerings/exterior-works">Exterior Works</Link>
              <Link to="/offerings/custom-designs">Custom Designs</Link>
              <Link to="/offerings/renovation">Renovation</Link>
            </div>
          </div>
          <div className="nav-item-dropdown">
            <Link to="/price-calculator" className="dropdown-trigger" onClick={(e) => handleHashLink(e, 'price-calculator')}>
              <span>Price Calculator</span>
            </Link>
            <div className="dropdown-menu">
              <Link to="/price-calculator/wardrobe">Wardrobe Cost Calculator</Link>
              <Link to="/price-calculator/kitchen">Kitchen Cost Calculator</Link>
              <Link to="/price-calculator/living-room">Living Room Cost Calculator</Link>
              <Link to="/price-calculator/full-home">Full Home Interior Calculator</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
