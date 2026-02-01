
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { Project } from '../types';
import { ArrowUpRight, Search, Filter } from 'lucide-react';

const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allProjects: Project[] = [
    { id: '1', title: 'VANTAGE ARCHIVE', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: '2', title: 'MOTION LAB', category: 'Digital', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', size: 'medium' },
    { id: '3', title: 'CYBERPUNK IDENTITY', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', size: 'medium' },
    { id: '4', title: 'KINETIC TYPE', category: 'Motion', imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: '5', title: 'STUDIO GEAR', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200', size: 'large' },
    { id: '6', title: 'SYSTEM 0.1', category: 'Digital', imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800', size: 'small' },
    { id: '7', title: 'NEON GENESIS', category: 'Motion', imageUrl: 'https://images.unsplash.com/photo-1547891269-05520fe3f208?auto=format&fit=crop&q=80&w=800', size: 'medium' },
    { id: '8', title: 'MONO ARCHIVE', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200', size: 'medium' },
  ];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="min-h-screen pt-40 pb-32 px-6 md:px-12 lg:px-20 max-w-[2000px] mx-auto">
        {/* Header Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-8">Master_Collection</p>
            <h1 className="text-[10vw] font-black tracking-tighter leading-[0.85] uppercase mb-12">
              THE WORK<span className="text-white/20">.</span><br />
              <span className="text-white/10">ARCHIVE_</span>
            </h1>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-y border-white/5 py-10">
            <div className="flex flex-wrap gap-3">
              {['All', 'Branding', 'Digital', 'Motion'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all ${
                    filter === tag 
                      ? 'bg-lime-400 text-black border-lime-400 shadow-[0_10px_30px_rgba(163,230,53,0.3)]' 
                      : 'border border-white/10 text-white/40 hover:text-white hover:border-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black tracking-widest text-white/20 uppercase mb-1">Total_Assets</span>
                <span className="text-xl font-black">{allProjects.length}</span>
              </div>
              <div className="w-px h-10 bg-white/5"></div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black tracking-widest text-white/20 uppercase mb-1">Status</span>
                <span className="text-xl font-black text-lime-400 uppercase tracking-tighter">Live_Feed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Archive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/work/${project.id}`);
                }}
                className="group relative aspect-[4/5] rounded-[40px] overflow-hidden bg-[#070707] border border-white/5 cursor-pointer hover:border-lime-400 transition-colors"
              >
                <img 
                  src={project.imageUrl} 
                  className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  alt={project.title}
                />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-black tracking-widest uppercase">
                      {project.category}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-black tracking-[0.4em] text-lime-400 uppercase block opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      Archive_Index_{project.id}
                    </span>
                    <h3 className="text-3xl font-black tracking-tighter leading-none group-hover:translate-x-2 transition-all duration-500">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Hover Grain Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay transition-opacity duration-700"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 text-xl font-black tracking-widest uppercase">No masterpieces found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
      <DesignerAI />
    </div>
  );
};

export default WorkPage;
