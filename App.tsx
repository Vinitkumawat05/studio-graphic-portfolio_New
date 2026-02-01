
import React from 'react';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import ExperienceTimeline from './components/ExperienceTimeline';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import DesignerAI from './components/DesignerAI';
import HorizontalTextScroll from './components/HorizontalTextScroll';
import { Project } from './types';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const projects: Project[] = [
    {
      id: '1',
      title: 'VANTAGE ARCHIVE',
      category: 'Branding',
      imageUrl: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200',
      size: 'large',
      hasAccent: true,
    },
    {
      id: '2',
      title: 'MOTION LAB',
      category: 'UI/UX',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      size: 'tall',
    },
    {
      id: '3',
      title: 'CYBERPUNK IDENTITY',
      category: 'Experimental',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      size: 'medium',
      hasAccent: true,
    },
    {
      id: '4',
      title: 'KINETIC TYPE',
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="px-6 md:px-12 lg:px-20 max-w-[2200px] mx-auto">
        <Hero />
        
        {/* Work Section */}
        <section id="work" className="py-40">
          <motion.div 
            {...sectionReveal}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32"
          >
            <div className="max-w-xl">
              <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6">Curated Archive</p>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                selected<br />
                <span className="text-white/20 italic">masterpieces.</span>
              </h2>
            </div>
            <Link 
              to="/work" 
              className="group flex items-center gap-6 px-10 py-5 rounded-full border border-white/10 hover:border-lime-400 transition-all hover:bg-white hover:text-black"
            >
              <span className="text-[10px] font-black tracking-widest uppercase">Explore All Works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <PortfolioGrid projects={projects} />
        </section>

        {/* Capabilities Marquee - Refined Style */}
        <div className="py-24 border-y border-white/5 overflow-hidden whitespace-nowrap bg-white/[0.01]">
           <div className="flex gap-20 animate-[marquee_30s_linear_infinite]">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="flex items-center gap-20">
                 <span className="text-4xl font-black tracking-tighter uppercase text-white/20 hover:text-white transition-colors cursor-default">Brand Strategy</span>
                 <div className="w-2 h-2 rounded-full bg-lime-400/40"></div>
                 <span className="text-4xl font-black tracking-tighter uppercase text-white/20 hover:text-white transition-colors cursor-default">Digital Landmarks</span>
                 <div className="w-2 h-2 rounded-full bg-white/10"></div>
                 <span className="text-4xl font-black tracking-tighter uppercase text-white/20 hover:text-white transition-colors cursor-default">Motion Systems</span>
                 <div className="w-2 h-2 rounded-full bg-lime-400/40"></div>
               </div>
             ))}
           </div>
        </div>

        <ExperienceTimeline />
        <FAQ />
        
        {/* Horizontal Text Scroll Section */}
        <HorizontalTextScroll />
      </main>

      <Footer />
      <DesignerAI />
    </div>
  );
};

export default App;
