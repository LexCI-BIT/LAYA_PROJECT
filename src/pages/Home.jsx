import React from 'react';
import Hero from '../components/Hero';
import Expertise from '../components/Expertise';
import WhyChooseUs from '../components/WhyChooseUs';
import ManufacturingUnit from '../components/ManufacturingUnit';
import HowItWorks from '../components/HowItWorks';
import FeaturedProjects from '../components/FeaturedProjects';
import PriceCalculatorPreview from '../components/PriceCalculatorPreview';
import ModularJourney from '../components/ModularJourney';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';

const Home = () => {
    return (
        <>
            <Hero />
            <Expertise />
            <WhyChooseUs />
            <ManufacturingUnit showIntro={true} showBody={false}/>
            <HowItWorks />
            <FeaturedProjects />
            <PriceCalculatorPreview />
            <ModularJourney />
            <Testimonials />
            <FAQSection />
        </>
    );
};

export default Home;
