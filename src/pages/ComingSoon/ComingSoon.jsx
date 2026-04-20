import React from 'react';
import { Palette } from 'lucide-react';

const ComingSoon = ({ title }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 animate-fade-in pt-32 pb-24">
      <div className="w-24 h-24 rounded-full bg-brand-accent/10 flex items-center justify-center mb-8 animate-bounce">
        <Palette size={48} className="text-brand-accent" />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold font-serif text-brand-text mb-4">
        {title}
      </h1>
      <div className="flex items-center gap-3 justify-center mb-8 w-full max-w-xs opacity-40">
        <div className="h-px bg-brand-text flex-1"></div>
        <div className="rotate-45 w-2 h-2 bg-brand-accent"></div>
        <div className="h-px bg-brand-text flex-1"></div>
      </div>
      <p className="text-xl md:text-2xl text-brand-text/60 italic font-medium max-w-md">
        This blooming part of the portfolio is currently being crafted with love.
      </p>
    </div>
  );
};

export default ComingSoon;
