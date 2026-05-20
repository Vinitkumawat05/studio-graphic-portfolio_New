
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioGridProps {
  projects: Project[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [autoHovered, setAutoHovered] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const cardElements = document.querySelectorAll('.mobile-work-card');
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            setAutoHovered(entry.target.getAttribute('data-id'));
          }
        });
      },
      { threshold: [0.7] }
    );
    cardElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, isMobile]);

  // Unified minimal image-only grid for all devices
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col">
          <div
            className="block relative w-full rounded-[16px] bg-white overflow-hidden cursor-pointer"
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
          <h3 className="font-sfpro text-white text-lg md:text-xl font-medium leading-tight tracking-tight uppercase mt-2 px-1">
            {project.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid;
