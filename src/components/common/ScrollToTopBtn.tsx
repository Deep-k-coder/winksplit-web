import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '../../hooks/useScrollEffects';

export const ScrollToTopBtn: React.FC = () => {
  const { progress, scrollY } = useScrollProgress();
  const isVisible = scrollY > 350;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-paper-lg border border-wink-kraft-light/50 flex items-center justify-center text-wink-green-deep hover:text-white hover:bg-wink-green transition-all duration-300 transform group ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-75 pointer-events-none'
      }`}
    >
      {/* Circular Progress Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5">
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="text-wink-kraft-light/25 stroke-current"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="text-wink-green stroke-current group-hover:text-wink-sand transition-all duration-150"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>

      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
