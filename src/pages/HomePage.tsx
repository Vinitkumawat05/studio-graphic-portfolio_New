import React from 'react';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';
import ExperienceTimeline from '../components/ExperienceTimeline';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import HorizontalTextScroll from '../components/HorizontalTextScroll';
import TestimonialsSection from '../components/TestimonialsSection';
import { Project } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const projects: Project[] = [
    {
      id: '1',
      title: 'VISION TO MOMENTU',
      category: 'Brand Identity',
      imageUrl: '/images/vision-to-momentu-01.jpg',
      size: 'large',
      hasAccent: true,
    },
    {
      id: '2',
      title: 'LUMEA',
      category: 'Web Design',
      imageUrl: '/images/LUM%C3%89A_Logo-01.jpg',
      size: 'medium',
    },
    {
      id: '3',
      title: 'OCEANIC CONTRA',
      category: 'UI/UX',
      imageUrl: '/images/Oceanic%20Contra-01.jpg',
      size: 'medium',
      hasAccent: true,
    }
  ];

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <main className="px-6 md:px-8 lg:px-20 max-w-[2000px] mx-auto">
        <div className="pt-32">
          <Hero />
        
          {/* Work Section */}
          <section id="work" className="pt-[40px] pb-0 md:py-32">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24">
              <div>
                <p className="text-[#a3e635] text-[10px] font-black tracking-[0.5em] uppercase mb-4">Curated Selections</p>
                <h2 className="text-[30px] md:text-6xl font-normal md:font-black tracking-[-1px] md:tracking-tighter leading-[34px] md:leading-none">
                  SELECTED WORKS<span className="text-white/20">.</span>
                </h2>
              </div>
              <Link 
                to="/work" 
                className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 hover:border-white transition-all hover:bg-white hover:text-black"
              >
                <span className="text-[10px] font-black tracking-widest uppercase">View Full Archive</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <PortfolioGrid projects={projects} />
          </section>

          {/* Capabilities Marquee */}
          <div className="py-20 border-y border-black/5 overflow-hidden whitespace-nowrap bg-black/[0.02]">
            <div className="flex gap-16 animate-[marquee_20s_linear_infinite]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-16">
                  <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Brand Strategy</span>
                  <div className="w-3 h-3 rounded-full bg-[#a3e635]"></div>
                  <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Interface Design</span>
                  <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Motion Systems</span>
                  <div className="w-3 h-3 rounded-full bg-[#a3e635]"></div>
                </div>
              ))}
            </div>
          </div>

          <ExperienceTimeline />
          <FAQ />
          <TestimonialsSection />
        </div> {/* <-- Close pt-32 wrapper */}
      </main>
      <HorizontalTextScroll />
      <Footer />
    </div>
  );
};

export default HomePage;

