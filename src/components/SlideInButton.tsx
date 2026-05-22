import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideInButtonProps {
  text: string;
  icon?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  showArrow?: boolean;
}

const SlideInButton: React.FC<SlideInButtonProps> = ({
  text,
  icon = false,
  onClick,
  href,
  className = '',
  variant = 'primary',
  showArrow = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `relative inline-flex items-center gap-3 overflow-hidden rounded-full transition-all duration-300 active:scale-95`;

  const variantClasses = {
    primary: 'px-7 py-2.5 transition-colors duration-300 border-none outline-none ring-0 shadow-none',
    secondary:
      'px-6 md:px-8 py-3 border border-white/40 text-white',
  };

  const primaryStyle =
    variant === 'primary'
      ? {
          backgroundColor: '#FFFFFF',
          color: '#000000',
        }
      : undefined;

  // Spring animation config matching Framer
  const springTransition = {
    type: 'spring' as const,
    bounce: 0.1,
    duration: 0.5,
  };

  const content = (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={primaryStyle}
      onClick={onClick}
    >
      {/* No animated background fill, just solid hover effect */}

      {/* Text container with slide effect */}
      <div className="relative flex items-center gap-3 z-10">
        <span className="relative overflow-hidden block h-[1.2em]">
          {/* Main text - slides up on hover */}
          <motion.span
            className="block"
            animate={{
              y: isHovered ? '-100%' : '0%',
            }}
            transition={springTransition}
          >
            {text}
          </motion.span>

          {/* Duplicate text - slides in from below */}
          <motion.span
            className="block absolute top-full left-0 w-full"
            animate={{
              y: isHovered ? '-100%' : '0%',
            }}
            transition={springTransition}
          >
            {text}
          </motion.span>
        </span>

        {/* Arrow Icon */}
        {showArrow && (
          <motion.div
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={springTransition}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};

export default SlideInButton;
