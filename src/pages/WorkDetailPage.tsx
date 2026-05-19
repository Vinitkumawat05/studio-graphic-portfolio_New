import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Footer from '../components/Footer';
import { Project } from '../types';

interface WorkDetail extends Project {
  projectType?: string;
  year?: string;
  role?: string;
  client?: string;
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // Detailed project data
  const allProjects: Record<string, WorkDetail> = {
    '1': {
      id: '1',
      title: 'Nova',
      category: 'Brand Indentity',
      projectType: 'Brand Identity',
      year: '2023',
      role: 'Brand Designer',
      client: 'Nova Labs',
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
      projectType: 'Motion System',
      year: '2024',
      role: 'Motion Designer',
      client: 'Motion Lab',
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
      projectType: 'Brand Identity',
      year: '2024',
      role: 'Creative Director',
      client: 'Cyberpunk Identity',
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
      projectType: 'Typography & Motion',
      year: '2024',
      role: 'Motion Designer',
      client: 'Kinetic Type',
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
      <div className="min-h-screen bg-[#1C1C1C] text-[#ECE8DF] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[45px] md:text-4xl font-normal tracking-[-1px] leading-[45px] mb-4">Project Not Found</h1>
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
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  const projectDetails = [
    { label: 'Project Type', value: currentProject.projectType || currentProject.category },
    { label: 'Year', value: currentProject.year || '2024' },
    { label: 'My Role', value: currentProject.role || 'Brand Designer' },
    { label: 'Client', value: currentProject.client || currentProject.title },
  ];

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C] overflow-x-hidden">
      <main className="px-6 md:px-8 lg:px-20 max-w-[1700px] mx-auto pt-[80px] md:pt-[70px] pb-0 md:pb-28">
        <motion.div
          {...sectionReveal}
          className="w-full h-[320px] md:h-[440px] lg:h-[560px] overflow-hidden rounded-lg bg-[#515352] mb-9"
        >
          <img
            src={currentProject.imageUrl}
            alt={currentProject.title}
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>

        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-16"
          >
            <div>
              <p className="mb-6 text-base text-[#A4A4A4]">Project Overview</p>
              <p className="max-w-[1080px] text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-[#F2F2F2]">
                {currentProject.description}
              </p>
            </div>
            <h1 className="self-start text-left lg:text-right text-[30px] md:text-[34px] leading-none font-black tracking-[-0.02em] uppercase text-white">
              {currentProject.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4"
          >
            {projectDetails.map((detail) => (
              <div key={detail.label}>
                <p className="mb-3 text-base text-[#A4A4A4]">{detail.label}</p>
                <p className="text-base md:text-lg leading-tight text-white">{detail.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 space-y-3 md:space-y-4"
          >
            <div className="h-[300px] md:h-[520px] lg:h-[650px] overflow-hidden rounded-md bg-[#515352]">
              <img
                src={currentProject.images[0] || currentProject.imageUrl}
                alt={`${currentProject.title} visual 1`}
                className="h-full w-full object-cover opacity-80"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {[1, 2].map((imageIndex) => (
                <div key={imageIndex} className="h-[420px] md:h-[560px] lg:h-[680px] overflow-hidden rounded-md bg-[#515352]">
                  <img
                    src={currentProject.images[imageIndex] || currentProject.imageUrl}
                    alt={`${currentProject.title} visual ${imageIndex + 1}`}
                    className="h-full w-full object-cover opacity-80"
                  />
                </div>
              ))}
            </div>

            <div className="h-[300px] md:h-[520px] lg:h-[650px] overflow-hidden rounded-md bg-[#515352]">
              <img
                src={currentProject.images[3] || currentProject.images[1] || currentProject.imageUrl}
                alt={`${currentProject.title} visual 4`}
                className="h-full w-full object-cover opacity-80"
              />
            </div>
          </motion.div>
        </section>

        {/* Related Works Section */}
        <motion.section {...sectionReveal} className="mb-32">
          <p className="text-[#ECE8DF]/45 text-[17px] font-black tracking-[0px] mb-8">Other Works</p>
          <h2 className="text-[45px] md:text-6xl font-normal tracking-[-1px] md:tracking-[0px] leading-[45px] md:leading-tight mb-16">More Projects</h2>
          
          <div className="-mx-1 flex gap-4 overflow-x-auto no-scrollbar px-1 snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0">
            {relatedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  navigate(`/work/${project.id}`);
                }}
                className="group min-w-[68vw] max-w-[260px] shrink-0 snap-start cursor-pointer md:min-w-0 md:max-w-none md:shrink"
              >
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[20px] border border-white/10 bg-white/5 transition-all md:mb-6 md:rounded-[30px]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default WorkDetailPage;
