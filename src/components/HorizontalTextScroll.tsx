import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalTextScroll: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(text, { x: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const getScrollDistance = () => Math.max(0, text.offsetWidth - window.innerWidth);

      gsap.to(text, {
        x: () => -getScrollDistance(),
        ease: 'linear',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          end: () => `+=${getScrollDistance()}`,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section-scroll-text">
      <h1 ref={textRef}>
        So, are you ready to Stand out?
      </h1>

      <style>{`
        .section-scroll-text {
          background-color: #1e1e1e;
          height: 100svh;
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .section-scroll-text h1 {
          font-family: system-ui, sans-serif;
          font-size: 100px;
          font-weight: 600;
          line-height: 1.1;
          color: #fff;
          margin: 0;
          white-space: nowrap;
          will-change: transform;
        }

        @media (max-width: 767px) {
          .section-scroll-text h1 {
            font-size: 64px;
          }
        }
      `}</style>
    </section>
  );
};

export default HorizontalTextScroll;
