import React from 'react';
import { LucideIconRenderer } from './IconRenderers';

const ValueCard = ({ value }) => (
  <div className="glassmorphism rounded-3xl p-6 flex flex-col items-center text-center w-full sm:w-48 transition-all duration-300 hover:bg-white/50 dark:hover:bg-white/10 group">
    <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4 group-hover:rotate-12 transition-transform">
      <LucideIconRenderer iconName={value.icon} size={20} />
    </div>
    <h4 className="font-bold text-brand-text mb-2 text-sm">{value.title}</h4>
    <p className="text-[11px] text-brand-text/50 leading-relaxed font-medium">
      {value.description}
    </p>
  </div>
);

export default ValueCard;
