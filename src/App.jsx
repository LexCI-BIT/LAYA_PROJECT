import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PriceCalculatorMain from './pages/PriceCalculatorMain';
import CalculatorIntro from './pages/calculator/CalculatorIntro';
import CalculatorForm from './pages/calculator/CalculatorForm';
import CalculatorResult from './pages/calculator/CalculatorResult';
import DesignIdeasMain from './pages/DesignIdeasMain';
import CategoryGrid from './pages/CategoryGrid';
import IdeaDetail from './pages/IdeaDetail';
import OfferingDetail from './pages/OfferingDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import CityDetail from './pages/CityDetail';
import ConsultationModal from './components/ConsultationModal';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // reduced delay for better responsiveness
    }
  }, [location]);
  useEffect(() => {
    // Scroll reveal observer
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-observe on DOM mutations to catch dynamic elements
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });
    
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]); // Re-run when page changes

  return (
    <ModalProvider>
      <CustomCursor />
      <div className="app-wrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/price-calculator" element={<PriceCalculatorMain />} />
            <Route path="/price-calculator/:type" element={<CalculatorIntro />} />
            <Route path="/price-calculator/:type/form" element={<CalculatorForm />} />
            <Route path="/price-calculator/:type/result" element={<CalculatorResult />} />
            <Route path="/design-ideas" element={<DesignIdeasMain />} />
            <Route path="/design-ideas/:category" element={<CategoryGrid />} />
            <Route path="/design-ideas/:category/:id" element={<IdeaDetail />} />
            <Route path="/offerings/:slug" element={<OfferingDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/cities/:citySlug" element={<CityDetail />} />
          </Routes>
        </main>

        <ConsultationModal />
        <FloatingActions />
        <Footer />
      </div>
    </ModalProvider>
  );
}

export default App;
