import React from 'react';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import HorizontalTextScroll from './components/HorizontalTextScroll';
import LaptopBanner from './components/LaptopBanner';
import SlideInButton from './components/SlideInButton';
import ServicesSection from './components/ServicesSection';
import { Project } from './types';
import { motion } from 'motion/react';
import TestimonialsSection from './components/TestimonialsSection';

const App: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Vision to momentum',
      category: 'Brand Identity',
      imageUrl: '/images/vision-to-momentu-01.jpg',
      size: 'large',
      hasAccent: true,
    },
    {
      id: '2',
      title: 'Lumea',
      category: 'UI/UX',
      imageUrl: '/images/LUM%C3%89A_Logo-01.jpg',
      size: 'tall',
    },
    {
      id: '3',
      title: 'Oceanic',
      category: 'Experimental',
      imageUrl: '/images/Oceanic%20Contra-01.jpg',
      size: 'medium',
      hasAccent: true,
    },
    {
      id: '4',
      title: 'True Farm',
      category: 'Brand Identity',
      imageUrl: '/images/Truefram-01.jpg',
      size: 'medium',
    }
  ];

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C]">
      <main className="px-6 md:px-8 lg:px-20 max-w-[2200px] mx-auto">
        <Hero />
        
        {/* Work Section */}
        <section id="work" className="pt-[40px] pb-0 md:pb-40">
          {/* Work section header and button removed as requested */}
          <PortfolioGrid projects={projects} />
        </section>

       

        <ExperienceTimeline />
        <ServicesSection />
        <FAQ />
        <LaptopBanner />
        <TestimonialsSection />
      </main>

      {/* Horizontal Text Scroll Section - outside main to avoid overflow/max-width clipping */}
      <HorizontalTextScroll />

      <Footer />
    </div>
  );
};

export default App;


