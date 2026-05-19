import React from 'react';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import HorizontalTextScroll from './components/HorizontalTextScroll';
import SlideInButton from './components/SlideInButton';
import ServicesSection from './components/ServicesSection';
import { Project } from './types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TestimonialsSection from './components/TestimonialsSection';

const App: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'Vantage archive',
      category: 'Branding',
      imageUrl: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200',
      size: 'large',
      hasAccent: true,
    },
    {
      id: '2',
      title: 'Motion lab',
      category: 'UI/UX',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      size: 'tall',
    },
    {
      id: '3',
      title: 'Cyberpunk identity',
      category: 'Experimental',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      size: 'medium',
      hasAccent: true,
    },
    {
      id: '4',
      title: 'Kinetic type',
      category: 'Motion',
      imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800',
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
        <section id="work" className="pt-[80px] pb-0 md:pb-40">
          {/* Work section header and button removed as requested */}
          <PortfolioGrid projects={projects} />
        </section>

       

        <ExperienceTimeline />
        <ServicesSection />
        <FAQ />
        <TestimonialsSection />
      </main>

      {/* Horizontal Text Scroll Section - outside main to avoid overflow/max-width clipping */}
      <HorizontalTextScroll />

      <Footer />
    </div>
  );
};

export default App;
