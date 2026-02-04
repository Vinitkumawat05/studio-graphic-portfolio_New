
import React from 'react';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';
import ExperienceTimeline from '../components/ExperienceTimeline';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { Project } from '../types';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <main className="px-6 md:px-12 lg:px-20 max-w-[2000px] mx-auto">
        <div className="pt-32">
          <Hero />
        
        {/* Work Section */}
        <section id="work" className="py-32">
          <motion.div 
            {...sectionReveal}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-24"
          >
            <div>
              <p className="text-lime-400 text-[10px] font-black tracking-[0.5em] uppercase mb-4">Curated Selections</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
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
          </motion.div>
          <PortfolioGrid projects={projects} />
        </section>

        {/* Capabilities Marquee */}
        <div className="py-20 border-y border-white/5 overflow-hidden whitespace-nowrap bg-white/[0.02]">
           <div className="flex gap-16 animate-[marquee_20s_linear_infinite]">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="flex items-center gap-16">
                 <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Brand Strategy</span>
                 <div className="w-3 h-3 rounded-full bg-lime-400"></div>
                 <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Interface Design</span>
                 <div className="w-3 h-3 rounded-full bg-white/20"></div>
                 <span className="text-3xl font-black tracking-tighter uppercase opacity-30">Motion Systems</span>
                 <div className="w-3 h-3 rounded-full bg-lime-400"></div>
               </div>
             ))}
           </div>
        </div>

        <ExperienceTimeline />
        <FAQ />
        </div>
      </main>
      <Footer />
      <DesignerAI />
    </div>
  );
};

export default HomePage;
