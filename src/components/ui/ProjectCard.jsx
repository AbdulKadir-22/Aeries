import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight, Heart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const IconComponent = LucideIcons[project.icon] || LucideIcons.Code;

  return (
    <div 
      onClick={() => navigate(`/projects/${project.id}`)}
      className="group glassmorphism rounded-3xl p-4 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden"
    >
      {/* Image Area */}
      <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[16/10] bg-brand-text/5">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Floating Category Icon */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full glassmorphism bg-white/40 dark:bg-black/40 flex items-center justify-center text-brand-text shadow-lg transform group-hover:scale-110 transition-transform duration-500">
           <IconComponent size={20} className="text-brand-accent" />
        </div>

        {/* Floating Like Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glassmorphism bg-white/40 dark:bg-black/40 flex items-center justify-center text-brand-text/40 hover:text-[#FF8DA1] transition-colors shadow-lg cursor-pointer"
        >
           <Heart size={18} fill="currentColor" className="opacity-40" />
        </button>
      </div>
      
      {/* Info Section */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
           <h3 className="text-xl font-bold text-brand-text font-serif group-hover:text-brand-accent transition-colors">
              {project.title}
           </h3>
        </div>
        
        <p className="text-sm text-brand-text/60 line-clamp-2 mb-4 leading-relaxed h-10">
          {project.shortDescription}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] font-bold uppercase tracking-widest text-brand-text/40 bg-brand-text/5 px-2.5 py-1 rounded-full whitespace-nowrap">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-bold text-brand-text/30 px-1">+ {project.tags.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-brand-text/5">
          <button className="flex items-center gap-2 text-xs font-bold text-brand-text/40 group-hover:text-brand-accent transition-colors">
            View Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
