import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  User, 
  Layers, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  Users
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import * as LucideIcons from 'lucide-react';
import projectsData from '../../data/projects.json';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  
  const currentIndex = projectsData.findIndex(p => p.id === id);
  const nextProject = projectsData[currentIndex + 1];
  const prevProject = projectsData[currentIndex - 1];

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      window.scrollTo(0, 0);
    } else {
      navigate('/projects');
    }
  }, [id, navigate]);

  if (!project) return null;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative z-10 w-full animate-fade-in">
      
      {/* Back Button */}
      <div className="mb-12">
        <Link 
          to="/projects"
          className="flex items-center gap-2 text-brand-text/60 hover:text-brand-accent font-bold text-sm tracking-wide transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-[0.2em] mb-4">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></div>
             Project Case Study
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-brand-text mb-6">
            {project.title}
          </h1>
          
          <p className="text-lg md:text-xl text-brand-text/70 mb-8 leading-relaxed font-medium">
            {project.longDescription}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="text-xs font-bold uppercase tracking-widest text-brand-text/50 bg-brand-text/5 px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href={project.links?.live || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#E39EB2] text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-[#E39EB2]/20 hover:scale-[1.03] active:scale-95 transition-all text-sm"
            >
              Live Demo <ExternalLink size={18} />
            </a>
            <a 
              href={project.links?.code || '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 glassmorphism px-8 py-4 rounded-2xl font-bold text-brand-text text-sm border-white/40 dark:border-white/10 hover:bg-white/40 transition-all"
            >
              View Code <FaGithub size={18} />
            </a>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
           <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl glassmorphism p-2 md:p-3 border-white/40 dark:border-white/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover rounded-[2.5rem]" />
           </div>
        </div>
      </div>

      {/* Stats Board */}
      <div className="glassmorphism rounded-3xl p-8 mb-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-white/30 dark:border-white/10">
         <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-3">
               <Calendar size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Duration</p>
            <p className="text-sm font-bold text-brand-text">{project.stats?.duration || 'Jan 2024 - Present'}</p>
         </div>
         <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-3">
               <User size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Role</p>
            <p className="text-sm font-bold text-brand-text">{project.stats?.role || 'Lead Developer'}</p>
         </div>
         <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-3">
               <Layers size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Category</p>
            <p className="text-sm font-bold text-brand-text">{project.stats?.type || project.category}</p>
         </div>
         <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-3">
               <Users size={20} />
            </div>
            <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Team</p>
            <p className="text-sm font-bold text-brand-text">{project.stats?.team || 'Solo Project'}</p>
         </div>
      </div>

      {/* Project Overview */}
      <div className="flex flex-col md:flex-row gap-12 mb-32 items-start">
         <div className="w-full md:w-1/3">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                 <LucideIcons.FileText size={18} />
               </div>
               <h2 className="text-2xl font-bold text-brand-text">Project Overview</h2>
            </div>
            <p className="text-brand-text/70 leading-relaxed font-medium mb-6">
              {project.overview || project.shortDescription}
            </p>
            <ul className="space-y-4">
               {(project.overviewPoints || []).map((point, idx) => (
                 <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-brand-text/80">
                   <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" />
                   <span>{point}</span>
                 </li>
               ))}
            </ul>
         </div>
         <div className="w-full md:w-2/3">
            <div className="rounded-3xl overflow-hidden shadow-xl glassmorphism p-2 bg-white/20 border-white/40 dark:border-white/10">
               <img src={project.image} alt="Dashboard View" className="w-full h-full object-cover rounded-2xl" />
            </div>
         </div>
      </div>

      {/* The Process */}
      <div className="mb-32">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 bg-brand-accent/10 px-4 py-2 rounded-full">
             <LucideIcons.PenTool size={18} className="text-brand-accent" />
             <span className="text-sm font-bold text-brand-accent uppercase tracking-widest">Our Methodology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-brand-text">The Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-brand-text/5 -z-10"></div>
          
          {(project.process || []).map((step, idx) => {
            const StepIcon = LucideIcons[step.icon] || LucideIcons.Circle;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                 <div className="w-20 h-20 rounded-full glassmorphism mb-6 flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent group-hover:scale-110 transition-all duration-500 relative z-10 border-white/40 dark:border-white/10 shadow-lg">
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-accent text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      0{step.step}
                    </span>
                    <StepIcon size={28} />
                 </div>
                 <h4 className="font-bold text-brand-text mb-2">{step.title}</h4>
                 <p className="text-xs text-brand-text/50 font-medium px-2 leading-relaxed">
                   {step.description}
                 </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Challenges & Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
         {/* Challenges */}
         <div className="flex flex-col h-full">
            <div className="glassmorphism rounded-[2.5rem] p-10 md:p-12 border-white/40 dark:border-white/10 flex-1 relative overflow-hidden group">
               {/* Decorative flowers */}
               <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                  <img src="/contact-painting.png" alt="" className="w-full h-full object-contain" />
               </div>

               <div className="flex items-center gap-3 mb-8">
                  <LucideIcons.Flag className="text-[#FF8DA1]" size={24} />
                  <h3 className="text-3xl font-bold font-serif text-brand-text">Challenges</h3>
               </div>
               <ul className="space-y-6">
                  {(project.challenges || []).map((challenge, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                       <CheckCircle2 size={18} className="text-[#FF8DA1] shrink-0 mt-1" />
                       <p className="text-brand-text/70 font-medium leading-relaxed">{challenge}</p>
                    </li>
                  ))}
               </ul>
               
               <div className="mt-12 pt-8 border-t border-brand-text/5 italic text-brand-text/60 font-serif">
                  "{project.quote || 'No challenge is too big to overcome.'}"
               </div>
            </div>
         </div>

         {/* Outcomes */}
         <div className="flex flex-col h-full gap-8">
            <div className="glassmorphism rounded-[2.5rem] p-10 md:p-12 border-white/40 dark:border-white/10 flex-1 relative overflow-hidden group">
               <div className="flex items-center gap-3 mb-8">
                  <LucideIcons.Trophy className="text-[#E39EB2]" size={24} />
                  <h3 className="text-3xl font-bold font-serif text-brand-text">Outcomes</h3>
               </div>
               <ul className="space-y-6 mb-12">
                  {(project.outcomes || []).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                       <CheckCircle2 size={18} className="text-[#E39EB2] shrink-0 mt-1" />
                       <p className="text-brand-text/70 font-medium leading-relaxed">{outcome}</p>
                    </li>
                  ))}
               </ul>

               <div className="grid grid-cols-3 gap-4">
                  {(project.results || []).map((result, idx) => {
                    const ResultIcon = LucideIcons[result.icon] || LucideIcons.Activity;
                    return (
                      <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/30 dark:bg-black/20">
                         <ResultIcon size={18} className="text-brand-accent mb-2" />
                         <span className="text-xl font-bold text-brand-text">{result.value}</span>
                         <span className="text-[8px] uppercase font-bold text-brand-text/40 tracking-widest">{result.label}</span>
                      </div>
                    );
                  })}
               </div>
            </div>
         </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-brand-text/10">
         {prevProject ? (
           <Link 
            to={`/projects/${prevProject.id}`}
            className="flex items-center gap-4 group w-full md:w-auto"
           >
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent transition-all group-hover:-translate-x-1 shadow-md">
                <ChevronLeft size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Previous Project</p>
                <p className="text-sm font-bold text-brand-text group-hover:text-brand-accent transition-colors">{prevProject.title}</p>
              </div>
           </Link>
         ) : <div className="hidden md:block w-32"></div>}

         <Link to="/projects" className="w-14 h-14 rounded-2xl bg-brand-text text-brand-bg flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
            <LayoutGrid size={24} />
         </Link>

         {nextProject ? (
           <Link 
            to={`/projects/${nextProject.id}`}
            className="flex items-center gap-4 group text-right w-full md:w-auto justify-end"
           >
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest mb-1">Next Project</p>
                <p className="text-sm font-bold text-brand-text group-hover:text-brand-accent transition-colors">{nextProject.title}</p>
              </div>
              <div className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent transition-all group-hover:translate-x-1 shadow-md">
                <ChevronRight size={20} />
              </div>
           </Link>
         ) : <div className="hidden md:block w-32"></div>}
      </div>

    </div>
  );
};

export default ProjectDetails;
