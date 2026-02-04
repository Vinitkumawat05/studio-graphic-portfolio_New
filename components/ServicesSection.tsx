import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SlideInButton from './SlideInButton';

const services = [
  {
    id: 1,
    title: 'Branding & Identity',
    description:
      'We craft bold, memorable brand identities that tell your story and leave a lasting impression. From logos to full brand guidelines, we ensure consistency and impact across all touchpoints.',
    timeline: '2 - 4 weeks',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    title: 'Web Design',
    description:
      'We build stunning, high-performance websites that captivate users and drive results. Every pixel is crafted with purpose, blending aesthetics with seamless functionality.',
    timeline: '4 - 8 weeks',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description:
      'We design intuitive, user-centered interfaces that delight and engage. Our process balances beauty with usability to create experiences people love.',
    timeline: '3 - 6 weeks',
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 4,
    title: 'Motion & Visual Design',
    description:
      'We bring brands to life with captivating motion graphics and visual storytelling. From animations to video content, we create experiences that move people.',
    timeline: '2 - 5 weeks',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
  },
];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  return (
    <section className="py-32 relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          <span className=" font-[17px] Sentancecase tracking-[0px] text-white/60">Services</span>
        </div>
        <h2 className="text-5xl md:text-[80px] font-normal tracking-[-1px] ">
          What we offer.
        </h2>
        <p className="text-white/50 max-w-xs text-right text-[17px] leading-[24px]">
          We specialize in creating bold, high-impact digital experiences that set brands apart.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-[1fr_494px_494px] gap-6 lg:gap-2 h-[500px]">
        {/* Left - Service List with Staggered Animation */}
        <div className="h-[500px] flex flex-col">
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-5 flex-1">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  onMouseEnter={() => setActiveService(index)}
                  className={`py-6 cursor-pointer transition-colors ${
                    index !== services.length - 1 ? 'border-b border-white/5' : ''
                  } ${activeService === index ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
                >
                  <span className="text-[24px]">{service.id}.</span>
                  <span className="text-[24px] font-medium ml-4">{service.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Start the Project Button */}
          <div className="mt-4">
            <SlideInButton
              text="Start the Project"
              href="/contact"
              variant="primary"
              className="w-full justify-center rounded-2xl px-6 py-5 text-xl font-medium"
            />
          </div>
        </div>

        {/* Middle - 4 Description Cards stacked vertically, scrolls TOP to BOTTOM */}
        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 overflow-hidden relative h-[500px]">
          <div className="relative h-full w-full">
            {/* Container with all 4 cards stacked vertically */}
            <motion.div 
              className="flex flex-col absolute w-full"
              style={{ height: `${services.length * 100}%` }}
              animate={{ y: `-${activeService * (100 / services.length)}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="flex flex-col justify-between"
                  style={{ height: `${100 / services.length}%`, padding: '33px 0 33px 0' }}
                >
                  <p className="text-white/70 text-[17px] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-auto">
                    <span className="text-white/40 text-base uppercase tracking-widest">Timeline</span>
                    <span className="text-white/70 text-lg">{service.timeline}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right - 4 Image Cards stacked vertically, scrolls BOTTOM to TOP */}
        <div className="relative overflow-hidden rounded-3xl h-[500px]">
          {/* Container with all 4 cards stacked vertically */}
          <motion.div 
            className="flex flex-col absolute w-full"
            style={{ height: `${services.length * 100}%` }}
            animate={{ y: `-${(services.length - 1 - activeService) * (100 / services.length)}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="relative w-full"
                style={{ height: `${100 / services.length}%` }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
