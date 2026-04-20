import React, { useEffect } from 'react';
import { Quote } from 'lucide-react';
import skillsData from '../../data/skills.json';
import { LucideIconRenderer } from '../../components/ui/IconRenderers';
import SkillCard from '../../components/ui/SkillCard';
import ValueCard from '../../components/ui/ValueCard';

const Skills = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative z-10 w-full animate-fade-in flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-20 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 animate-pulse">
           <LucideIconRenderer iconName="Heart" className="text-brand-accent" size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-serif text-brand-text mb-6">
          {skillsData.header.title}
        </h1>
        
        <div className="flex items-center gap-3 justify-center mb-6 w-full max-w-xs opacity-40">
          <div className="h-px bg-brand-text flex-1"></div>
          <div className="rotate-45 w-1.5 h-1.5 bg-brand-accent"></div>
          <div className="h-px bg-brand-text flex-1"></div>
        </div>
        
        <p className="text-lg md:text-xl text-brand-text/70 italic font-medium max-w-2xl text-center leading-relaxed">
          {skillsData.header.subtitle}
        </p>
      </div>

      {/* Section 1: Technical */}
      <div className="w-full mb-32">
        <div className="flex flex-col items-center mb-12 text-center">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
             <h2 className="text-2xl font-bold text-brand-text">{skillsData.sections.technical.title}</h2>
           </div>
           <p className="text-sm text-brand-text/50 max-w-md">{skillsData.sections.technical.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {skillsData.sections.technical.categories.map((cat) => (
            <SkillCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>

      {/* Section 2: Values */}
      <div className="w-full mb-32">
        <div className="flex flex-col items-center mb-12 text-center">
           <div className="flex items-center gap-3 mb-2">
             <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
             <h2 className="text-2xl font-bold text-brand-text">{skillsData.sections.values.title}</h2>
           </div>
           <p className="text-sm text-brand-text/50 max-w-md">{skillsData.sections.values.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {skillsData.sections.values.items.map((val, idx) => (
            <ValueCard key={idx} value={val} />
          ))}
        </div>
      </div>

      {/* Quote Footer */}
      <div className="w-full max-w-4xl relative">
        <div className="absolute inset-0 bg-brand-accent/5 rounded-[3rem] -z-10 blur-xl"></div>
        <div className="glassmorphism rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
          
          <Quote size={40} className="text-brand-accent/30 mb-8" />
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-text italic mb-6 leading-tight">
            "{skillsData.quote.text}"
          </h3>
          <div className="flex items-center gap-3 opacity-20 w-32">
            <div className="h-px bg-current flex-1"></div>
            <div className="rotate-45 w-1.5 h-1.5 bg-brand-accent"></div>
            <div className="h-px bg-current flex-1"></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Skills;
