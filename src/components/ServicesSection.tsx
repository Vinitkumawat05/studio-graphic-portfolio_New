import React, { useState } from 'react';
import { motion } from 'motion/react';
import SlideInButton from './SlideInButton';

const services = [
  {
    id: 1,
    title: 'Branding & Identity',
    description:
      'We craft bold, memorable brand identities that tell your story and leave a lasting impression. From logos to full brand guidelines, we ensure consistency and impact across all touchpoints.',
    timeline: '2 - 4 weeks',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    title: 'Web Design',
    description:
      'We build high-performance websites that captivate users and drive results. Every pixel is crafted with purpose, blending aesthetics with seamless functionality.',
    timeline: '4 - 8 weeks',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description:
      'We design intuitive, user-centered interfaces that feel polished and efficient. Our process balances beauty with usability to create experiences people love.',
    timeline: '3 - 6 weeks',
    image:
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 4,
    title: 'Motion & Visual Design',
    description:
      'We bring brands to life with motion systems, campaign visuals, and storytelling that make the identity feel alive across every channel.',
    timeline: '2 - 5 weeks',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000',
  },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <section id="services" className="pt-0 pb-20 md:py-24 lg:py-32 scroll-mt-16 md:scroll-mt-20">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ECE8DF]" />
          <span className="text-[15px] text-[#ECE8DF]/60">Services</span>
        </div>

        <h2 className="max-w-[760px] text-[45px] font-normal leading-[45px] tracking-[-1px] md:text-[72px] md:leading-[0.95]">
          What we offer.
        </h2>

        <p className="max-w-sm text-[16px] leading-[22px] text-[#ECE8DF]/55 lg:text-right">
          We specialize in creating bold, high-impact digital experiences that set brands apart.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(320px,1fr)_minmax(320px,1fr)] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col justify-between rounded-lg border border-[#ECE8DF]/10 bg-[#ECE8DF]/[0.03] p-4 md:p-5"
        >
          <div>
            {services.map((service, index) => {
              const isActive = activeService === index;

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveService(index)}
                  onMouseEnter={() => setActiveService(index)}
                  className={`group w-full border-b border-[#ECE8DF]/10 py-5 text-left transition-colors last:border-b-0 md:py-6 ${
                    isActive ? 'text-[#ECE8DF]' : 'text-[#ECE8DF]/42 hover:text-[#ECE8DF]/75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="min-w-[34px] text-[20px] font-normal leading-none md:text-[25px]">{service.id}.</span>
                    <div>
                      <span className="block text-[23px] font-normal leading-[1.05] md:text-[25px]">{service.title}</span>
                      <p className={`mt-3 text-[15px] leading-[22px] transition-all md:hidden ${isActive ? 'block text-[#ECE8DF]/65' : 'hidden'}`}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="hidden border-t border-[#ECE8DF]/10 pt-4 md:block">
            <SlideInButton
              text="Start the Project"
              href="/contact"
              variant="primary"
              className="w-full justify-center rounded-lg px-6 py-5 text-lg font-medium"
            />
          </div>
        </motion.div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: 0.08 }}
          className="hidden min-h-[260px] flex-col justify-between rounded-lg border border-[#ECE8DF]/10 bg-[#ECE8DF]/[0.03] p-6 md:flex md:min-h-[360px] md:p-8 lg:min-h-[500px]"
        >
          <p className="text-[17px] leading-relaxed text-[#ECE8DF]/70 md:text-[20px] md:leading-[1.45]">
            {active.description}
          </p>
          <div className="mt-10 flex items-center justify-between border-t border-[#ECE8DF]/10 pt-6">
            <span className="text-xs uppercase tracking-[0.18em] text-[#ECE8DF]/38">Timeline</span>
            <span className="text-base text-[#ECE8DF]/75 md:text-lg">{active.timeline}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease, delay: 0.16 }}
          className="relative min-h-[320px] overflow-hidden rounded-lg bg-[#515352] md:col-span-2 md:min-h-[420px] lg:col-span-1 lg:min-h-[500px]"
        >
          {services.map((service, index) => (
            <motion.img
              key={service.id}
              src={service.image}
              alt={service.title}
              initial={false}
              animate={{ opacity: activeService === index ? 1 : 0, scale: activeService === index ? 1 : 1.04 }}
              transition={{ duration: 0.55, ease }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}
        </motion.div>
      </div>

      <div className="mt-5 md:hidden">
        <SlideInButton
          text="Start the Project"
          href="/contact"
          variant="primary"
          className="w-full justify-center rounded-lg px-6 py-5 text-lg font-medium"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
