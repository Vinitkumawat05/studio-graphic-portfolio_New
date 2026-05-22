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
  const localImage = (fileName: string) => `/images/${encodeURIComponent(fileName)}`;
  const visionToMomentuImages = Array.from({ length: 8 }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, '0');
    return `/images/vision-to-momentu-${imageNumber}.jpg`;
  });
  const lumeaImages = Array.from({ length: 9 }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, '0');
    return localImage(`LUM\u00C9A_Logo-${imageNumber}.jpg`);
  });
  const oceanicContraImages = Array.from({ length: 11 }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, '0');
    return localImage(`Oceanic Contra-${imageNumber}.jpg`);
  });
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    // Collapse broken image slot instead of leaving an empty-looking area.
    target.style.display = 'none';
  };

  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [id]);

  // Detailed project data
  const allProjects: Record<string, WorkDetail> = {
    '1': {
      id: '1',
      title: 'Vision to momentum',
      category: 'Brand Identity',
      projectType: 'Brand Identity',
      year: '2025',
      role: 'Brand Designer',
      client: 'Vision to momentum',
      imageUrl: visionToMomentuImages[0],
      size: 'large',
      description: 'The Vision to Momentum logo is a modern and futuristic identity designed to represent the transformation of ideas into action. Built with clean geometric structures and connected letterforms, the logo symbolizes progress, movement, and forward-thinking creativity. Every element of the design was carefully crafted to communicate ambition, innovation, and the continuous journey from vision to achievement.',
      challenges: 'Build a clear, premium identity system that remains consistent across multiple visual contexts while maintaining strong recognition.',
      solution: 'Developed a cohesive identity direction and presentation flow, then structured the complete showcase from frame 01 to 08 in a clean sequence.',
      results: [
        'Unified visual language',
        'Clear storytelling sequence',
        'Consistent brand application',
        'Presentation-ready output'
      ],
      images: visionToMomentuImages
    },
    '2': {
      id: '2',
      title: 'Lumea',
      category: 'Web Design',
      projectType: 'Logo Design',
      year: '2025',
      role: 'Logo Designer',
      client: 'Lumea',
      imageUrl: lumeaImages[0],
      size: 'medium',
      description: 'The LUMÉA Beauty & Skincare logo is designed to embody elegance, purity, and modern luxury. Created with a clean typographic approach and refined visual balance, the identity reflects the essence of premium skincare and timeless beauty. The minimal structure allows the brand to feel sophisticated, graceful, and effortlessly modern.',
      challenges: 'Create a premium and clean identity direction that feels distinctive while staying versatile.',
      solution: 'Built a structured identity system and presented applications through an ordered showcase sequence.',
      results: [
        'Strong brand consistency',
        'Premium visual direction',
        'Flexible asset system',
        'Presentation-ready identity set'
      ],
      images: lumeaImages
    },
    '3': {
      id: '3',
      title: 'Oceanic',
      category: 'UI/UX',
      projectType: 'Brand Identity',
      year: '2025',
      role: 'Brand Designer',
      client: 'Oceanic',
      imageUrl: oceanicContraImages[0],
      size: 'medium',
      description: 'The Oceanic Enviro India Pvt. Ltd. logo is a modern and meaningful identity inspired by the beauty, movement, and balance of the ocean. Designed with clean geometric forms and flowing wave elements, the logo represents sustainability, environmental responsibility, and continuous progress. The circular structure symbolizes unity, protection, and the natural cycle of life, while the wave patterns reflect fluidity, purity, and harmony with nature.',
      challenges: 'Design a memorable and scalable identity language across multiple touchpoints.',
      solution: 'Crafted a cohesive brand system and arranged the final output as a narrative visual sequence.',
      results: [
        'Unified identity language',
        'Better visual recognition',
        'Clear presentation structure',
        'Scalable brand assets'
      ],
      images: oceanicContraImages
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
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  const projectDetails = [
    { label: 'Project Type', value: currentProject.projectType || currentProject.category },
    { label: 'Year', value: currentProject.year || '2024' },
    { label: 'My Role', value: currentProject.role || 'Brand Designer' },
    { label: 'Client', value: currentProject.client || currentProject.title },
  ];
  const isVisionProject = currentProject.id === '1';
  const isLumeaProject = currentProject.id === '2';
  const image02 = currentProject.images[1];
  const image03 = currentProject.images[2];
  const image04 = currentProject.images[3];
  const visionRemainingImages = currentProject.images.slice(4);
  const lumeaRemainingImages = currentProject.images.slice(3);

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-[#ECE8DF] selection:bg-[#ECE8DF] selection:text-[#1C1C1C] overflow-x-hidden">
      <main className="px-6 md:px-8 lg:px-20 max-w-[1700px] mx-auto pt-[80px] md:pt-[70px] pb-0 md:pb-0">
        <motion.div
          {...sectionReveal}
          className="mb-9 w-full overflow-hidden rounded-lg bg-[#515352]"
        >
          <img
            src={currentProject.imageUrl}
            alt={currentProject.title}
            onError={handleImageError}
            className="block h-auto w-full opacity-80"
          />
        </motion.div>

        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-end justify-between gap-8"
          >
            <p className="text-base text-[#A4A4A4]">Project Overview</p>
            <h1 className="self-start text-left lg:text-right text-[20px] md:text-[34px] leading-none font-medium tracking-[-0.02em] uppercase text-white whitespace-nowrap">
              {currentProject.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mt-6"
          >
            <p className="w-full text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] text-[#F2F2F2]">
              {currentProject.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4"
          >
            {projectDetails.map((detail) => (
              <div key={detail.label}>
                <p className="text-base text-[#A4A4A4]">{detail.label}</p>
                <p className="text-base md:text-lg leading-tight text-white">{detail.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 space-y-3 md:space-y-4"
          >
            {isVisionProject ? (
              <>
                {image02 && (
                  <div className="overflow-hidden rounded-md bg-[#515352]">
                    <img
                      src={image02}
                      alt={`${currentProject.title} visual 2`}
                      onError={handleImageError}
                      className="block h-auto w-full opacity-80"
                    />
                  </div>
                )}
                {(image03 || image04) && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    {image03 && (
                      <div className="overflow-hidden rounded-md bg-[#515352]">
                        <img
                          src={image03}
                          alt={`${currentProject.title} visual 3`}
                          onError={handleImageError}
                          className="block h-auto w-full opacity-80"
                        />
                      </div>
                    )}
                    {image04 && (
                      <div className="overflow-hidden rounded-md bg-[#515352]">
                        <img
                          src={image04}
                          alt={`${currentProject.title} visual 4`}
                          onError={handleImageError}
                          className="block h-auto w-full opacity-80"
                        />
                      </div>
                    )}
                  </div>
                )}
                {visionRemainingImages.map((image, index) => (
                  <div key={`${currentProject.id}-tail-${index}`} className="overflow-hidden rounded-md bg-[#515352]">
                    <img
                      src={image || currentProject.imageUrl}
                      alt={`${currentProject.title} visual ${index + 5}`}
                      onError={handleImageError}
                      className="block h-auto w-full opacity-80"
                    />
                  </div>
                ))}
              </>
            ) : isLumeaProject ? (
              <>
                {(image02 || image03) && (
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                    {image02 && (
                      <div className="overflow-hidden rounded-md bg-[#515352]">
                        <img
                          src={image02}
                          alt={`${currentProject.title} visual 2`}
                          onError={handleImageError}
                          className="block h-auto w-full opacity-80"
                        />
                      </div>
                    )}
                    {image03 && (
                      <div className="overflow-hidden rounded-md bg-[#515352]">
                        <img
                          src={image03}
                          alt={`${currentProject.title} visual 3`}
                          onError={handleImageError}
                          className="block h-auto w-full opacity-80"
                        />
                      </div>
                    )}
                  </div>
                )}
                {lumeaRemainingImages.map((image, index) => (
                  <div key={`${currentProject.id}-tail-${index}`} className="overflow-hidden rounded-md bg-[#515352]">
                    <img
                      src={image || currentProject.imageUrl}
                      alt={`${currentProject.title} visual ${index + 4}`}
                      onError={handleImageError}
                      className="block h-auto w-full opacity-80"
                    />
                  </div>
                ))}
              </>
            ) : (
              currentProject.images.slice(1).map((image, imageIndex) => (
                <div key={`${currentProject.id}-${imageIndex}`} className="overflow-hidden rounded-md bg-[#515352]">
                  <img
                    src={image || currentProject.imageUrl}
                    alt={`${currentProject.title} visual ${imageIndex + 2}`}
                    onError={handleImageError}
                    className="block h-auto w-full opacity-80"
                  />
                </div>
              ))
            )}
          </motion.div>
        </section>

        {/* Related Works Section */}
        <motion.section {...sectionReveal} className="mb-0">
          <h2 className="text-[45px] md:text-6xl font-normal tracking-[-1px] md:tracking-[0px] leading-[45px] md:leading-tight mb-8 mt-8">More Projects</h2>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0">
            {relatedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                  navigate(`/work/${project.id}`);
                }}
                className="group min-w-[68vw] max-w-[260px] shrink-0 snap-start cursor-pointer md:min-w-0 md:max-w-none md:shrink"
              >
                <div className="relative mb-4 overflow-hidden rounded-[12px] border border-white/10 bg-white/5 transition-all md:mb-6">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    onError={handleImageError}
                    className="block h-auto w-full opacity-100"
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


