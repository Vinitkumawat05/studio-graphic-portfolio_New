
import React, { useState } from 'react';
// Removed motion/AnimatePresence for static grid
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Project } from '../types';
import { ArrowUpRight, Search, Filter } from 'lucide-react';

const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const allProjects: Project[] = [
    { id: '1', title: 'Nova', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200', size: 'large', subtitle: 'A fintech startup needed an identity that screamed trust without screaming boring. We gave them one.' },
    { id: '2', title: 'Drift', category: 'Web Design', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', size: 'medium', subtitle: 'A streetwear brands online presence was invisible. Now it converts 40% more.' },
    { id: '3', title: 'Layer', category: 'UI/UX', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', size: 'medium', subtitle: 'A creative app was losing users at onboarding. We redesigned the flow. Drop-off went down 60%.' },
    { id: '4', title: 'Phantom', category: 'Motion', imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', size: 'small', subtitle: 'An audio-visual collective needed a brand that moved. So we made one that does.' },
    { id: '5', title: 'STUDIO GEAR', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200', size: 'large', subtitle: 'Tools for creation' },
    { id: '6', title: 'SYSTEM 0.1', category: 'Digital', imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800', size: 'small', subtitle: 'Design systems' },
    { id: '7', title: 'NEON GENESIS', category: 'Motion', imageUrl: 'https://images.unsplash.com/photo-1547891269-05520fe3f208?auto=format&fit=crop&q=80&w=800', size: 'medium', subtitle: 'Future aesthetics' },
    { id: '8', title: 'MONO ARCHIVE', category: 'Branding', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200', size: 'medium', subtitle: 'Minimalist excellence' },
  ];


  // Unique categories for filter bar
  const categories = ['All', ...Array.from(new Set(allProjects.map(p => p.category)))];

  const filteredProjects = filter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="min-h-[100svh] bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C] overflow-x-hidden">
      <main className="min-h-[100svh] pt-[80px] md:pt-[116px] pb-32 px-6 md:px-8 lg:px-20 max-w-[2000px] mx-auto">
        {/* Large Heading SVG */}
        <div className="w-full flex justify-start items-center mb-8 mt-2">
          <img
            src="/assets/icon/Selected Work.svg"
            alt="Selected Work"
            className="w-full h-auto"
            style={{ display: 'block' }}
          />
        </div>

        {/* Filter Bar */}
        <div className="mb-6 flex flex-wrap gap-2 md:mb-10 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border border-[#ECE8DF] px-3 py-[6px] text-xs font-medium transition-all duration-200 md:px-5 md:py-1 md:text-sm ${filter === cat ? 'bg-[#ECE8DF] text-[#1C1C1C]' : 'bg-transparent text-[#ECE8DF] hover:bg-[#ECE8DF] hover:text-[#1C1C1C]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Archive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="flex flex-col">
              <div
                className="block relative w-full aspect-[4/3] rounded-[12px] bg-white overflow-hidden cursor-pointer"
                onClick={() => navigate(`/work/${project.id}`)}
                title={project.title}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/work/${project.id}`); }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-sfpro text-white text-lg md:text-xl font-bold leading-tight tracking-tight uppercase">
                  {project.title}
                </h3>
                <div className="text-[#bdbdbd] text-xs md:text-sm font-normal mt-1">
                  {project.category}
                  {project.subtitle ? ` • ${project.subtitle}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-white/20 text-xl font-black tracking-widest uppercase">No masterpieces found in this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default WorkPage;
