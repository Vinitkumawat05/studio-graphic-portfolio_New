
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioGridProps {
  projects: Project[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[350px] md:auto-rows-[450px] grid-flow-dense">
      {projects.map((project, index) => {
        let gridSpan = "md:col-span-4";
        if (project.size === 'large') gridSpan = "md:col-span-8";
        if (project.size === 'tall') gridSpan = "md:col-span-4";
        if (project.size === 'medium') gridSpan = "md:col-span-6";
        if (project.size === 'small') gridSpan = "md:col-span-4";

        return (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
              duration: 0.9, 
              delay: (index % 3) * 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className={`${gridSpan} md:row-span-1`}
          >
            <div 
              onClick={() => navigate(`/work/${project.id}`)}
              className="group block relative w-full h-full overflow-hidden rounded-[40px] bg-[#070707] border border-white/5 transition-all duration-700 hover:border-white/30 cursor-pointer"
            >
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <span className="w-fit px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[17px] font-black, normal tracking-[0px] sentancecase">
                      {project.category}
                    </span>
                    {project.hasAccent && (
                      <span className="w-fit px-4 py-1.5 rounded-full bg-[#a3e635] text-black text-[17px] font-black, normal tracking-[0px] sentancecase">
                        Spotlight
                      </span>
                    )}
                  </div>
                  
                  <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[17px] font-black, normal tracking-[0px] text-[#a3e635] sentancecase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 tracking-[0px]">
                    Project No. 00{project.id}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-black, normal tracking-[-1px] leading-[4px] ">
                    {project.title}
                  </h3>
                  <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 opacity-20"></div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PortfolioGrid;
