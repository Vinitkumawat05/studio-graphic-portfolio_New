import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: 'Working with Vinit was smooth from start to finish. He understood the vision for our agency logo quickly and delivered a clean, professional design that matched our brand identity perfectly.',
    name: 'Vaibhav',
    title: 'Marketing Agency Owner',
    service: 'Logo Design',
  },
  {
    quote: 'Vinit helped us with marketing creatives and promotional content for our cafe. The designs were eye-catching, modern, and matched our cafe’s vibe really well. We noticed better customer response on social media after using the creatives. Delivery was on time and the overall experience was professional.',
    name: 'Nikita',
    title: 'Cafe Owner',
    service: 'Marketing Work',
  },
  {
    quote: 'Had a great experience working with Vinit for our cafe’s marketing work. The promotional designs and content were clean, creative, and helped us present our brand more professionally online.',
    name: 'Amit',
    title: 'Cafe Owner',
    service: 'Marketing Work',
  },
  {
    quote: 'Vinit designed a professional and trustworthy logo for our clinic that perfectly reflected the identity we wanted to build. The design process was smooth, and he was patient with revisions and suggestions. The final logo looks clean, modern, and works well across all our branding materials.',
    name: 'Dr.Santosh',
    title: 'Clinic Owner',
    service: 'Logo Design',
  },
  {
    quote: 'Vinit designed a modern and elegant logo for Arvino Spaces that aligned perfectly with our interior design brand. He understood the aesthetic and direction we wanted from the beginning and delivered a clean, premium-looking identity. The overall process was professional, smooth, and detail-oriented.',
    name: 'Aman Sharma',
    title: 'Owner of Arvino Spaces',
    service: 'Logo Design',
  },
];

const marqueeContent = [...testimonials, ...testimonials];

const TestimonialsSection: React.FC = () => {
  const marqueeRefs = useRef<HTMLDivElement[]>([]);
  const tweens = useRef<gsap.core.Tween[]>([]);

  const handleHover = (index: number, slow: boolean) => {
    const tween = tweens.current[index];
    if (tween) tween.timeScale(slow ? 0.4 : 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      tweens.current.forEach((tween) => tween?.kill());
      tweens.current = [];

      marqueeRefs.current.forEach((track, index) => {
        if (!track) return;
        const direction = index === 0 ? -1 : 1;

        gsap.set(track, { xPercent: direction === -1 ? 0 : -50 });

        tweens.current[index] = gsap.to(track, {
          xPercent: direction === -1 ? -50 : 0,
          duration: index === 0 ? 25 : 30,
          ease: 'none',
          repeat: -1,
        });
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      tweens.current.forEach((tween) => tween?.kill());
    };
  }, []);

  const renderCards = () =>
    marqueeContent.map((item, index) => (
      <article key={`${item.name}-${index}`} className="testimonial-card">
        <p>{item.quote}</p>
        <div className="testimonial-meta">
          <span className="name">{item.name}</span>
          <span className="title">{item.title}</span>
          <span className="service">{item.service}</span>
        </div>
      </article>
    ));

  return (
    <section id="testimonials" className="testimonials scroll-mt-16 md:scroll-mt-20">
      <div className="testimonials__heading">
        <p className="eyebrow">Testimonials</p>
        <h2>
          Real Results,
          <br />
          Real Transformations.
        </h2>
        <p className="subline">
          Here's what our clients have to say about working with STUDIO.
        </p>
      </div>

      <div
        className="marquee"
        data-direction="rtl"
        onMouseEnter={() => handleHover(0, true)}
        onMouseLeave={() => handleHover(0, false)}
      >
        <div
          className="marquee__track"
          ref={(el) => {
            if (el) marqueeRefs.current[0] = el;
          }}
        >
          {renderCards()}
        </div>
      </div>

      <style>{`
        .testimonials {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          padding: clamp(4rem, 8vw, 7rem) 0 clamp(3rem, 6vw, 5rem);
          background: #1C1C1C;
          color: #ECE8DF;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow: hidden;
        }

        .testimonials__heading {
          max-width: 960px;
          margin: 0 auto;
          text-align: center;
          padding: 0 5vw;
        }

        .testimonials__heading h2 {
          font-size: clamp(2.75rem, 7vw, 5.5rem);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.03em;
        }

        .testimonials__heading .eyebrow {
          letter-spacing: 0;
          font-size: 1.08rem;
          color: #ECE8DF;
          margin-bottom: 0.75rem;
        }

        .testimonials__heading .subline {
          opacity: 0.7;
          margin-top: 0.75rem;
        }

        .marquee {
          position: relative;
          overflow: hidden;
          width: 100vw;
        }

        .marquee__track {
          display: flex;
          gap: clamp(0.75rem, 2vw, 1.5rem);
          will-change: transform;
          width: max-content;
        }

        .testimonial-card {
          border: 1px solid rgba(236, 232, 223, 0.1);
          border-radius: 8px;
          padding: clamp(1.25rem, 3vw, 2rem);
          min-width: clamp(280px, 70vw, 421px);
          max-width: clamp(280px, 70vw, 421px);
          min-height: clamp(260px, 34vw, 315px);
          background: rgba(236, 232, 223, 0.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testimonial-card p {
          font-size: 1rem;
          line-height: 1.5;
          color: rgba(236, 232, 223, 0.78);
        }

        .testimonial-meta {
          margin-top: 1.25rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: space-between;
          align-items: center;
          color: rgba(236, 232, 223, 0.45);
          font-size: 0.85rem;
        }

        .testimonial-meta .name {
          font-weight: 600;
          color: #ECE8DF;
        }

        .testimonial-meta .service {
          color: #ECE8DF;
        }

        @media (max-width: 640px) {
          .testimonials {
            gap: 1.25rem;
          }

          .testimonials__heading {
            text-align: left;
            padding: 0 1.5rem;
          }

          .testimonials__heading h2 {
            font-size: 35px;
            line-height: 40px;
            letter-spacing: -1px;
          }

          .testimonials__heading .subline {
            max-width: 320px;
          }

          .testimonial-card {
            min-width: 84vw;
            max-width: 84vw;
            min-height: 260px;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
