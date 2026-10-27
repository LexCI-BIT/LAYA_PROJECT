import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import './Navbar.css';
import AluminiumManufacturing from "../pages/AluminiumManufacturing";


const Navbar = () => {
  const location = useLocation();
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSubPage = location.pathname !== '/';
  // Pages whose top is light: the transparent white-text navbar would be invisible there
  const hasSolidNav =
    location.pathname.startsWith('/projects') ||
    location.pathname.startsWith('/design-ideas') ||
    /^\/price-calculator\/[^/]+\/(form|result)$/.test(location.pathname);

  // Mobile menu: lock page scroll while open, close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  // Any link tapped inside the drawer closes it
  const handleMenuClick = (e) => {
    if (e.target.closest('a')) setMenuOpen(false);
  };

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
    <nav className={`navbar ${isSubPage ? 'scrolled' : ''} ${ isSubPage ? 'subpage-navbar' : ''} ${
    hasSolidNav ? 'solid-navbar' : ''}`}>
      <div className="navbar-top-container container">
        <button
          type="button"
          className="menu-toggle"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
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
          <Link to="/aluminium-manufacturing"><span>Aluminium Manufacturing</span></Link>
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

      {createPortal(
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} inert={!menuOpen}>
          <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
          <aside
            id="mobile-menu"
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            onClick={handleMenuClick}
          >
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Menu</span>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <nav className="mobile-menu-links">
              <Link to="/" onClick={(e) => { if (location.pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } }}>Home</Link>
              <Link to="/aluminium-manufacturing">Aluminium Manufacturing</Link>
              <Link to="/projects">Projects</Link>

              <details>
                <summary>Design Ideas</summary>
                <div className="mobile-submenu">
                  <Link to="/design-ideas">All Design Ideas</Link>
                  <Link to="/design-ideas/wardrobe">Wardrobe Designs</Link>
                  <Link to="/design-ideas/kitchen">Kitchen Designs</Link>
                  <Link to="/design-ideas/living-room">Living Room Designs</Link>
                  <Link to="/design-ideas/space-saving">Space Saving Ideas</Link>
                </div>
              </details>

              <details>
                <summary>Offerings</summary>
                <div className="mobile-submenu">
                  <Link to="/#offerings" onClick={(e) => handleHashLink(e, 'offerings')}>All Offerings</Link>
                  <Link to="/offerings/aluminium-interiors">Aluminium Interiors</Link>
                  <Link to="/offerings/modular-cupboards">Modular Cupboards</Link>
                  <Link to="/offerings/exterior-works">Exterior Works</Link>
                  <Link to="/offerings/custom-designs">Custom Designs</Link>
                  <Link to="/offerings/renovation">Renovation</Link>
                </div>
              </details>

              <details>
                <summary>Price Calculator</summary>
                <div className="mobile-submenu">
                  <Link to="/price-calculator">All Calculators</Link>
                  <Link to="/price-calculator/wardrobe">Wardrobe Cost Calculator</Link>
                  <Link to="/price-calculator/kitchen">Kitchen Cost Calculator</Link>
                  <Link to="/price-calculator/living-room">Living Room Cost Calculator</Link>
                  <Link to="/price-calculator/full-home">Full Home Interior Calculator</Link>
                </div>
              </details>

              <details>
                <summary>Cities</summary>
                <div className="mobile-submenu">
                  <span className="mobile-submenu-label">Telangana</span>
                  <Link to="/cities/hyderabad">Hyderabad</Link>
                  <Link to="/cities/warangal">Warangal</Link>
                  <Link to="/cities/karimnagar">Karimnagar</Link>
                  <span className="mobile-submenu-label">Andhra Pradesh</span>
                  <Link to="/cities/vijayawada">Vijayawada</Link>
                  <Link to="/cities/visakhapatnam">Visakhapatnam</Link>
                  <Link to="/cities/guntur">Guntur</Link>
                </div>
              </details>
            </nav>

            <button
              type="button"
              className="mobile-menu-cta"
              onClick={() => { setMenuOpen(false); openModal(); }}
            >
              Consult Online
            </button>
          </aside>
        </div>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;
