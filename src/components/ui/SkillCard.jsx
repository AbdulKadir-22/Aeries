import React from 'react';
import { IconRenderer, LucideIconRenderer } from './IconRenderers';

const SkillCard = ({ category }) => (
  <div className="glassmorphism rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group border-white/40 dark:border-white/10">
    <div className="w-20 h-20 rounded-3xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
      <LucideIconRenderer iconName={category.icon} size={36} />
    </div>
    
    <h3 className="text-2xl font-bold font-serif text-brand-text mb-3">{category.title}</h3>
    <p className="text-sm text-brand-text/60 leading-relaxed mb-8 max-w-[240px]">
      {category.description}
    </p>

    <div className="w-full flex items-center gap-3 opacity-20 mb-8">
      <div className="h-px bg-current flex-1"></div>
      <div className="rotate-45 w-1.5 h-1.5 bg-current outline-offset-4"></div>
      <div className="h-px bg-current flex-1"></div>
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      {category.skills.map((skill, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 group/skill">
          <div className="w-14 h-14 rounded-2xl bg-white/40 dark:bg-white/5 flex items-center justify-center shadow-sm border border-white/50 dark:border-white/10 group-hover/skill:scale-110 transition-all duration-300">
            <IconRenderer iconName={skill.icon} color={skill.color} size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text/40 group-hover/skill:text-brand-accent transition-colors">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default SkillCard;
