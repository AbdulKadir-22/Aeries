import React from 'react';
import * as Icons from 'react-icons/fa';
import content from '../../data/content.json';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Dynamic Name from content.json
  const name = content.hero.name;

  return (
    <footer className="relative py-24 px-6 overflow-hidden mt-12 bg-transparent">
      {/* Grid Background */}
      <div className="absolute inset-0 footer-grid pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Top Text */}
        <p className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-50 mb-6 text-brand-text">
          YOURS TRULY,
        </p>
        
        {/* Dynamic Name */}
        <h2 className="text-4xl md:text-5xl font-serif italic mb-12 text-brand-text">
          {name}
        </h2>
        
        {/* Dynamic Icons from content.json */}
        <div className="flex items-center gap-6 md:gap-8 mb-12">
          {content.socialLinks.map((link, idx) => {
            const IconComponent = Icons[link.icon];
            return (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-text opacity-40 hover:opacity-100 hover:text-brand-accent transition-all duration-300 transform hover:-translate-y-1"
                aria-label={link.platform}
              >
                {IconComponent ? <IconComponent size={20} /> : null}
              </a>
            );
          })}
        </div>
        
        {/* Copyright */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/30 mb-2"></div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 text-brand-text">
            © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
