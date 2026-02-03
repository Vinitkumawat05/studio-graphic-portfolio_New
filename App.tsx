
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
              {/* <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] sentancecase mb-6">Curated Archive</p> */}
              <h2 className="text-5xl md:text-[48px] font-black, normal tracking-[-1px] leading-[32px] sentancecase w-[590px]">
                The Work Speaks,We Listen.<br />
                <span className="text-white md:text-[17px] tracking-[0px] leading-[4px]">Real brands, Real impact, Every project here was built from obsession not templates.</span>
              </h2>
            </div>
            <Link 
              to="/work" 
              className="group flex items-center gap-6 px-10 py-5 rounded-full border border-white/10 hover:border-lime-400 transition-all hover:bg-white hover:text-black"
            >
              <span className="text-[17px] font-black, normal tracking-[0px] leading-[4px] sentancecase">See Everything</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <PortfolioGrid projects={projects} />
        </section>

       

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
