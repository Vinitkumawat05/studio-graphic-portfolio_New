import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '../components/Footer';
import DesignerAI from '../components/DesignerAI';
import { ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface WorkDetail extends Project {
  description: string;
  challenges: string;
  solution: string;
  results: string[];
  images: string[];
}

const WorkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Detailed project data
  const allProjects: Record<string, WorkDetail> = {
    '1': {
      id: '1',
      title: 'LIGHTSPEED',
      category: 'Branding',
      imageUrl: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200',
      size: 'large',
      description: 'How Lightspeed transformed their online retail experience by launching a mobile-optimized website and simplifying checkout workflows, increasing conversion rates by 55% and boosting customer satisfaction across devices.',
      challenges: 'Lightspeed struggled with a complex checkout process and inconsistent mobile experience that frustrated users and led to lost sales opportunities. Customers abandoned carts due to lengthy forms and slow load times on mobile devices. The lack of responsive design limited reach and negatively impacted brand perception in a highly competitive market.',
      solution: 'We redesigned their entire digital ecosystem with a focus on mobile-first principles. Our solution included: streamlined checkout process with one-click payments, progressive web app technology for faster loading, responsive design across all devices, and optimized user flows based on user research.',
      results: [
        '55% increase in conversion rates',
        '78% improvement in mobile performance',
        '40% reduction in cart abandonment',
        '92% customer satisfaction rating'
      ],
      images: [
        'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'
      ]
    },
    '2': {
      id: '2',
      title: 'MOTION LAB',
      category: 'Digital',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      size: 'medium',
      description: 'A comprehensive motion design system for digital products that standardizes animations and interactions across platforms.',
      challenges: 'Inconsistent animations and lack of cohesive motion language across products led to poor user experience.',
      solution: 'Created a complete motion design system with documentation, guidelines, and reusable components.',
      results: [
        '50% faster development cycles',
        'Consistent user experience',
        'Improved brand recognition',
        'Reduced design-to-development friction'
      ],
      images: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200'
      ]
    },
    '3': {
      id: '3',
      title: 'CYBERPUNK IDENTITY',
      category: 'Branding',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      size: 'medium',
      description: 'A bold brand identity system for a tech-forward company that challenged design conventions.',
      challenges: 'Standing out in a crowded tech market with a distinctive visual identity.',
      solution: 'Developed an experimental design approach combining cyberpunk aesthetics with modern typography.',
      results: [
        'Increased brand awareness by 85%',
        'Award-winning design recognition',
        'Viral social media engagement',
        '200% increase in website traffic'
      ],
      images: [
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1635405074683-96d6921a2a2c?auto=format&fit=crop&q=80&w=1200'
      ]
    },
    '4': {
      id: '4',
      title: 'KINETIC TYPE',
      category: 'Motion',
      imageUrl: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800',
      size: 'medium',
      description: 'An innovative typography and motion design project that brings letterforms to life.',
      challenges: 'Creating engaging text-based animations that maintain readability and visual appeal.',
      solution: 'Developed proprietary kinetic typography system using advanced web animation techniques.',
      results: [
        'Industry recognition and awards',
        'Featured in design publications',
        'Educational value for the design community',
        'Inspired 10+ industry projects'
      ],
      images: [
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
      ]
    }
  };

  const currentProject = id ? allProjects[id] : null;
  
  // Get related projects (other projects)
  const relatedProjects = Object.values(allProjects).filter(p => p.id !== id).slice(0, 3);

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/work')}
            className="text-lime-400 hover:underline"
          >
            Back to Works
          </button>
        </div>
      </div>
    );
  }

  const sectionReveal = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <main className="px-6 md:px-12 lg:px-20 max-w-[2200px] mx-auto pt-32 md:pt-40">
        {/* Introduction Section with 001 */}
        <section className="mb-32 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-12 flex items-center gap-4">
              <div className="h-12 w-1 bg-lime-400 rounded-full"></div>
              <div>
                <p className="text-lime-400 text-[12px] font-black tracking-[0.3em] uppercase">001</p>
                <p className="text-white/40 text-[12px] font-black tracking-widest uppercase">Introduction</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="border-b border-white/10 pb-6">
                <p className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Client</p>
                <p className="text-2xl md:text-3xl font-black">{currentProject.title}</p>
              </div>
              
              <div className="border-b border-white/10 pb-6">
                <p className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Timeline</p>
                <p className="text-2xl md:text-3xl font-black">6 months</p>
              </div>
              
              <div className="pb-6">
                <p className="text-white/40 text-[11px] font-black tracking-[0.3em] uppercase mb-3">Year</p>
                <p className="text-2xl md:text-3xl font-black">2024</p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                {currentProject.description}
              </p>
            </div>
          </motion.div>

          {/* Hero Image on the right */}
          <motion.div
            {...sectionReveal}
            className="rounded-[30px] overflow-hidden aspect-square md:aspect-auto md:h-96 lg:h-[500px]"
          >
            <img
              src={currentProject.imageUrl}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Header Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-8">Project Overview</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
              Project Details
            </h1>
          </motion.div>
        </section>

        {/* Challenges Section */}
        <section className="mb-24 grid md:grid-cols-2 gap-16">
          <motion.div {...sectionReveal}>
            <div className="md:sticky md:top-32">
              <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6">002</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">Challenges</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {currentProject.challenges}
              </p>
            </div>
          </motion.div>
          <motion.div {...sectionReveal}>
            <img
              src={currentProject.images[1] || currentProject.imageUrl}
              alt="Challenges visualization"
              className="rounded-[40px] w-full h-96 object-cover"
            />
          </motion.div>
        </section>

        {/* Solution Section */}
        <section className="mb-24 grid md:grid-cols-2 gap-16">
          <motion.div {...sectionReveal}>
            <img
              src={currentProject.images[2] || currentProject.imageUrl}
              alt="Solution visualization"
              className="rounded-[40px] w-full h-96 object-cover"
            />
          </motion.div>
          <motion.div {...sectionReveal}>
            <div className="md:sticky md:top-32">
              <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6">003</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">Solution</h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {currentProject.solution}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Results Section */}
        <motion.section {...sectionReveal} className="mb-32">
          <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-6">004</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-12">Results</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProject.results.map((result, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[20px] bg-white/5 border border-white/10 hover:border-lime-400 transition-all"
              >
                <p className="text-2xl md:text-3xl font-black text-lime-400 mb-3">{idx + 1}.</p>
                <p className="text-lg font-black leading-relaxed">{result}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Related Works Section */}
        <motion.section {...sectionReveal} className="mb-32">
          <p className="text-lime-400 text-[10px] font-black tracking-[0.6em] uppercase mb-8">Other Works</p>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-16">More Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/work/${project.id}`);
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden mb-6 bg-white/5 border border-white/10 hover:border-lime-400 transition-all">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.2s]"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-black tracking-widest uppercase w-fit">
                      {project.category}
                    </span>
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter leading-tight group-hover:translate-x-2 transition-all">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lime-400 opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-[10px] font-black tracking-widest uppercase">View Project</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
      <DesignerAI />
    </div>
  );
};

export default WorkDetailPage;
