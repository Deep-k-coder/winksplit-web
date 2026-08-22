import React from 'react';
import { useScrollProgress } from '../../hooks/useScrollEffects';

export const ScrollProgressBar: React.FC = () => {
  const { progress } = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[100] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-wink-green via-wink-kraft-gold to-[#25D366] transition-all duration-150 ease-out shadow-gold-glow"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
