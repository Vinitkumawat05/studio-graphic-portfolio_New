import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, ShieldCheck } from 'lucide-react';

const LaptopBanner: React.FC = () => {
  return (
    <section id="laptop" aria-label="Laptop" className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="absolute inset-0 z-10 flex items-start">
        <div className="ml-[8%] mt-[8%] max-w-[84%] text-white md:ml-[7%] md:mt-[5.5%] md:max-w-[55%] lg:mt-[4.8%]">
          <h2 className="text-[44px] font-medium leading-[56.08px] tracking-[-0.02em] md:text-[59px] md:leading-[85px] md:tracking-[-0.03em]">
            The Brand You've Been Imagining
            <br />
            Let's{' '}
            <span className="mt-[10px] inline-block bg-[#ffad4f] px-1.5 leading-[56.08px] text-[#1C1C1C] md:px-2 md:leading-[59px]">
              Build it.
            </span>
          </h2>

          <div className="mt-7 flex flex-col gap-4 text-[15px] font-normal leading-[10px] text-white/85 md:mt-10 md:flex-row md:items-center md:gap-9 md:text-[19px] md:leading-[14.4px]">
            <div className="flex items-center gap-1.5 md:gap-2">
              <ShieldCheck className="h-3 w-3 md:h-4 md:w-4" />
              <span>Make more trust with a strong Identity</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <RefreshCw className="h-3 w-3 md:h-4 md:w-4" />
              <span>Unlimited Revisions</span>
            </div>
          </div>

          <Link
            to="/contact"
            className="mt-7 inline-flex h-8 w-32 items-center justify-center bg-white text-[18px] font-medium leading-none text-[#1C1C1C] transition-opacity duration-300 hover:opacity-85 md:mt-10 md:h-12 md:w-40 md:text-[19px]"
          >
            Start Now
          </Link>
        </div>
      </div>

      <picture>
        <source media="(min-width: 768px)" srcSet="/images/Banner-for-laptop.jpg" />
        <img
          src="/images/Banner-for-mobile.jpg"
          alt="Laptop banner"
          className="block h-[145vw] min-h-[520px] max-h-[620px] w-full object-cover object-bottom md:h-auto md:min-h-0 md:max-h-none md:object-contain md:object-center"
        />
      </picture>
    </section>
  );
};

export default LaptopBanner;
