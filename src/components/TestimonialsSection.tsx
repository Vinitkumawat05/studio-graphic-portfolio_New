import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const testimonials = [
  {
    quote: 'Working with Studio felt like unlocking an entirely new level of possibility. They built a visual language that felt as bold as our ambition.',
    name: 'Sophia L.',
    title: 'Marketing Director',
    rating: '4.9/5',
  },
  {
    quote: 'The team elevated every interaction—clean, cinematic, and built for performance. We saw conversion spikes within days.',
    name: 'Daniel W.',
    title: 'SaaS Founder',
    rating: '4.9/5',
  },
  {
    quote: 'We asked for a daring, differentiated identity and they delivered with relentless polish and thoughtfulness.',
    name: 'Emma R.',
    title: 'Startup Founder',
    rating: '4.8/5',
  },
  {
    quote: 'Studio became an extension of our team. They translate complex tech into emotional design with zero fluff.',
    name: 'Miles T.',
    title: 'Product Lead',
    rating: '5/5',
  },
];

const marqueeContent = [...testimonials, ...testimonials];

const TestimonialsSection: React.FC = () => {
  const marqueeRefs = useRef<HTMLDivElement[]>([]);
  const tweens = useRef<gsap.core.Tween[]>([]);

  const handleHover = (index: number, slow: boolean) => {
    const tween = tweens.current[index];
    if (tween) {
      tween.timeScale(slow ? 0.4 : 1);
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      tweens.current.forEach((tween) => tween?.kill());
      tweens.current = [];

      marqueeRefs.current.forEach((track, index) => {
        if (!track) return;
        const direction = index === 0 ? -1 : 1;
        const duration = index === 0 ? 25 : 30;

        gsap.set(track, { xPercent: direction === -1 ? 0 : -50 });
        
        const tween = gsap.to(track, {
          xPercent: direction === -1 ? -50 : 0,
          duration,
          ease: 'none',
          repeat: -1,
        });

        tweens.current[index] = tween;
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
          <span className="rating">{item.rating}</span>
        </div>
      </article>
    ));

  return (
    <section className="testimonials">
      <div className="testimonials__heading">
        <p className="eyebrow">Testimonials</p>
        <h2>
          Real Results,
          <br />
          Real Transformations.
        </h2>
        <p className="subline">
          Here’s what our clients have to say about working with STUDIO.
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

      <div
        className="marquee"
        data-direction="ltr"
        onMouseEnter={() => handleHover(1, true)}
        onMouseLeave={() => handleHover(1, false)}
      >
        <div
          className="marquee__track"
          ref={(el) => {
            if (el) marqueeRefs.current[1] = el;
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
          padding: 4rem 0 3rem;
          background: #050505;
          color: #ffffff;
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
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 500;
          line-height: 1.1;
        }

        .testimonials__heading .eyebrow {
          text-transform: sentencecase;
          letter-spacing: 0em;
          font-size: 1.08rem;
          color: #A3E635;
          margin-bottom: 0.75rem;
        }

        .testimonials__heading .subline {
          opacity: 0.7;
          margin-top: 0.75rem;
        }

        .marquee {
          position: relative;
          overflow: visible;
          width: 100vw;
        }

        .marquee__track {
          display: flex;
          gap: 1.5rem;
          will-change: transform;
          width: max-content;
        }

        .testimonial-card {
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 2rem;
          min-width: 421px;
          max-width: 421px;
          height: 315px;
          background: rgba(255, 255, 255, 0.03);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .testimonial-card p {
          font-size: 1rem;
          line-height: 1.5;
          color: #e5e5e5;
        }

        .testimonial-meta {
          margin-top: 1.25rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: space-between;
          align-items: center;
          color: #9ca3af;
          font-size: 0.85rem;
        }

        .testimonial-meta .name {
          font-weight: 600;
          color: #ffffff;
        }

        .testimonial-meta .rating {
          color: #f87171;
        }

      `}</style>
    </section>
  );
};

export default TestimonialsSection;
