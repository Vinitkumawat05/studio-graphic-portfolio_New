import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Project } from '../types';

const WorkPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const allProjects: Project[] = [
    { id: '1', title: 'Vision to momentum', category: 'Brand Identity', imageUrl: '/images/vision-to-momentu-01.jpg', size: 'large', subtitle: 'Brand identity case study' },
    { id: '2', title: 'Lumea', category: 'Web Design', imageUrl: '/images/LUM%C3%89A_Logo-01.jpg', size: 'medium', subtitle: 'A streetwear brands online presence was invisible. Now it converts 40% more.' },
    { id: '3', title: 'Oceanic', category: 'UI/UX', imageUrl: '/images/Oceanic%20Contra-01.jpg', size: 'medium', subtitle: 'A creative app was losing users at onboarding. We redesigned the flow. Drop-off went down 60%.' },
  ];

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
                className="block relative w-full rounded-[12px] bg-white overflow-hidden cursor-pointer"
                onClick={() => navigate(`/work/${project.id}`)}
                title={project.title}
                tabIndex={0}
                role="button"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/work/${project.id}`); }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="block w-full h-auto"
                />
              </div>
              <div className="mt-3 px-1">
                <h3 className="font-sfpro text-white text-lg md:text-xl font-medium leading-tight tracking-tight uppercase">
                  {project.title}
                </h3>
                <div className="text-[#bdbdbd] text-xs md:text-sm font-normal mt-1">
                  {project.category}
                  {project.subtitle ? ` - ${project.subtitle}` : ''}
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

