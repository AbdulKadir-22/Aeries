import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ChevronDown, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import projectsData from '../../data/projects.json';
import ProjectCard from '../../components/ui/ProjectCard';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'UI/UX'];

const Projects = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState([]);
  
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const moreProjects = projectsData.filter(p => !p.featured || projectsData.length <= 1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setVisibleProjects(moreProjects);
    } else {
      setVisibleProjects(projectsData.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative z-10 w-full animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6">
           <Briefcase className="text-brand-accent" size={32} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-brand-text mb-6">
          Projects
        </h1>
        
        <div className="flex items-center gap-3 justify-center mb-6 w-full max-w-md opacity-40">
          <div className="h-px bg-brand-text flex-1"></div>
          <div className="rotate-45 w-1.5 h-1.5 bg-brand-accent"></div>
          <div className="h-px bg-brand-text flex-1"></div>
        </div>
        
        <p className="text-lg md:text-xl text-brand-text/70 italic font-medium max-w-2xl text-center leading-relaxed">
          A collection of things I've designed, developed and brought to life with purpose and passion.
        </p>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-24">
          <div 
            onClick={() => navigate(`/projects/${featuredProject.id}`)}
            className="group relative glassmorphism rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row gap-8 p-6 md:p-10 cursor-pointer hover:shadow-2xl transition-all duration-700 border-white/40 dark:border-white/10"
          >
            {/* Image Side */}
            <div className="w-full lg:w-3/5 aspect-video md:aspect-auto md:h-[450px] rounded-3xl overflow-hidden relative shadow-lg">
              <img 
                src={featuredProject.image} 
                alt={featuredProject.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center lg:pr-6">
              <div className="flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <Sparkles size={14} className="animate-pulse" /> Featured Project
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-brand-text mb-6 group-hover:text-brand-accent transition-colors">
                {featuredProject.title}
              </h2>
              
              <p className="text-brand-text/70 text-lg mb-8 leading-relaxed font-medium">
                {featuredProject.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {featuredProject.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-bold uppercase tracking-widest text-brand-text/50 bg-brand-text/5 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#E39EB2] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#E39EB2]/20 hover:scale-[1.03] active:scale-95 transition-all text-sm whitespace-nowrap">
                  View Case Study <ArrowRight size={18} />
                </button>
                <a 
                  href={featuredProject.links.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-2 glassmorphism px-8 py-4 rounded-2xl font-bold text-brand-text text-sm border-white/40 dark:border-white/10 hover:bg-white/40 transition-all whitespace-nowrap"
                >
                  Live Demo <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* More Projects Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
           <div className="text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                <h2 className="text-2xl font-bold text-brand-text">More Projects</h2>
              </div>
              <p className="text-sm text-brand-text/50 font-medium">More ideas. More code. More learning.</p>
           </div>

           {/* Filter */}
           <div className="glassmorphism rounded-full p-1.5 flex flex-wrap justify-center gap-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-[#E39EB2] text-white shadow-md' 
                      : 'text-brand-text/50 hover:text-brand-text hover:bg-brand-text/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {visibleProjects.map((project) => (
             <ProjectCard key={project.id} project={project} />
           ))}
        </div>

        {/* Empty State */}
        {visibleProjects.length === 0 && (
          <div className="text-center py-20 opacity-50">
             <p className="text-xl font-bold text-brand-text">No projects found in this category.</p>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <button className="flex items-center gap-2 glassmorphism px-8 py-4 rounded-full text-brand-text/60 hover:text-brand-text transition-all font-bold group">
            Load More Projects <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Projects;
