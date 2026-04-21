import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Share2, 
  Calendar, 
  Maximize, 
  Compass, 
  Edit3, 
  LayoutGrid 
} from 'lucide-react';

const PaintingModal = ({ painting, onClose, onNext, onPrev }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0); // 0 = full, 1-4 = quadrants

  const zoomLevels = [
    { name: 'Full', origin: 'center', scale: 1, pos: 'center' },
    { name: 'Details TL', origin: '0% 0%', scale: 2, pos: '0% 0%' },
    { name: 'Details TR', origin: '100% 0%', scale: 2, pos: '100% 0%' },
    { name: 'Details BL', origin: '0% 100%', scale: 2, pos: '0% 100%' },
    { name: 'Details BR', origin: '100% 100%', scale: 2, pos: '100% 100%' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset zoom when painting changes
    if (painting) {
      setZoomIndex(0);
    }
  }, [painting]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 400);
  };

  if (!painting) return null;

  const handleNextImage = () => {
    setZoomIndex((prev) => (prev + 1) % zoomLevels.length);
  };

  const handlePrevImage = () => {
    setZoomIndex((prev) => (prev - 1 + zoomLevels.length) % zoomLevels.length);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 bg-brand-bg/30 dark:bg-brand-bg/40 backdrop-blur-[2px] transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      
      {/* Scrollable container for mobile flexibility */}
      <div 
        className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center pt-16 md:pt-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Left Back Button */}
        <div className="w-full max-w-6xl mb-6 px-4">
          <button 
            onClick={handleClose}
            className="flex items-center gap-2 text-brand-text/60 hover:text-brand-accent font-bold text-sm tracking-wide transition-colors group cursor-pointer"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Paintings
          </button>
        </div>

        {/* Main Section */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-6xl bg-transparent flex flex-col md:flex-row gap-8 items-start z-10 transition-all duration-700 ease-out ${isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-[0.98] translate-y-8 opacity-0'}`}
        >
          
          {/* Left Column: Image Area */}
          <div className="w-full md:w-[60%] flex flex-col gap-6">
            <div className="relative group aspect-square md:aspect-auto md:h-[600px] w-full bg-black/5 rounded-3xl overflow-hidden glassmorphism shadow-2xl">
              <img 
                src={painting.image} 
                alt={painting.title} 
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                style={{
                  transform: `scale(${zoomLevels[zoomIndex].scale})`,
                  transformOrigin: zoomLevels[zoomIndex].origin
                }}
              />
              
              {/* Image Navigation Arrows */}
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {zoomLevels.map((level, idx) => (
                <button 
                  key={idx}
                  onClick={() => setZoomIndex(idx)}
                  className={`w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer relative ${zoomIndex === idx ? 'border-brand-accent scale-105' : 'border-transparent opacity-80 hover:opacity-100'}`}
                >
                  <img 
                    src={painting.image} 
                    alt="thumbnail" 
                    className="w-full h-full object-cover" 
                    style={{
                      objectPosition: level.pos,
                      transform: idx === 0 ? 'scale(1)' : 'scale(2)'
                    }}
                  />
                  {idx === 0 && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <LayoutGrid size={16} className="text-white opacity-60" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column: Details Area */}
          <div className="w-full md:w-[40%] flex flex-col gap-8 bg-white/20 dark:bg-black/10 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] glass-heavy border-white/30 dark:border-white/10 shadow-xl">
            {/* Title & Likes */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold font-serif text-brand-text leading-tight">{painting.title}</h2>
                <p className="text-brand-accent font-semibold tracking-wider mt-1">{painting.category}</p>
              </div>
              <div className="flex items-center gap-1 text-brand-text/60 font-bold bg-white/30 dark:bg-white/5 px-3 py-1.5 rounded-full text-sm">
                 <Heart size={16} className="text-[#FF8DA1]" fill="#FF8DA1" />
                 <span>{painting.likes}</span>
              </div>
            </div>

            {/* Separator */}
            <div className="flex items-center gap-3 opacity-20">
              <div className="h-px bg-current flex-1"></div>
              <div className="rotate-45 w-1.5 h-1.5 bg-current outline-offset-4"></div>
              <div className="h-px bg-current flex-1"></div>
            </div>

            {/* Description */}
            <p className="text-brand-text/80 leading-relaxed text-[15px]">
              {painting.description}
            </p>

            {/* Stats Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-brand-accent/5 dark:bg-white/5 p-6 rounded-3xl border border-brand-accent/10">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-white/10 flex items-center justify-center text-brand-accent shadow-sm">
                   <Edit3 size={18} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Medium</p>
                   <p className="text-xs font-bold text-brand-text/80 whitespace-nowrap">{painting.medium}</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-white/10 flex items-center justify-center text-brand-accent shadow-sm">
                   <Maximize size={18} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Size</p>
                   <p className="text-xs font-bold text-brand-text/80">{painting.dimensions}</p>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-white/10 flex items-center justify-center text-brand-accent shadow-sm">
                   <Calendar size={18} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Year</p>
                   <p className="text-xs font-bold text-brand-text/80">{painting.year}</p>
                 </div>
               </div>

               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white/40 dark:bg-white/10 flex items-center justify-center text-brand-accent shadow-sm">
                   <Compass size={18} />
                 </div>
                 <div>
                   <p className="text-[10px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Category</p>
                   <p className="text-xs font-bold text-brand-text/80">{painting.subcategory}</p>
                 </div>
               </div>
            </div>

            {/* My Thoughts Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-brand-text font-serif">My Thoughts</h3>
                <div className="h-px bg-brand-text/10 flex-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
              </div>
              <p className="text-brand-text/70 text-sm italic leading-relaxed">
                {painting.thoughts}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
               <button className="flex-1 flex items-center justify-center gap-2 bg-[#E39EB2] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#E39EB2]/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">
                 <Heart size={18} /> Like ({painting.likes})
               </button>
               <button className="flex items-center justify-center w-16 bg-white/30 dark:bg-white/10 py-4 rounded-2xl text-brand-text/60 hover:text-brand-accent hover:bg-white/50 transition-all border border-white/40 dark:border-white/5 cursor-pointer">
                 <Share2 size={20} />
               </button>
            </div>
          </div>

        </div>

        {/* Global Footer Navigation */}
        <div className="w-full flex items-center justify-center gap-6 mt-12 pb-12">
           <button 
             onClick={onPrev}
             disabled={!onPrev}
             className={`flex items-center gap-3 glassmorphism bg-white/40 dark:bg-white/5 px-6 py-4 rounded-2xl transition-all shadow-md group ${!onPrev ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:scale-105 cursor-pointer'}`}
           >
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                <ChevronLeft size={20} />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Previous</p>
                <p className="text-xs font-bold text-brand-text">Painting</p>
              </div>
           </button>

           <button 
             onClick={handleClose}
             className="w-16 h-16 rounded-[2rem] bg-brand-accent flex items-center justify-center text-white shadow-xl shadow-brand-accent/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
           >
             <LayoutGrid size={24} />
           </button>

           <button 
             onClick={onNext}
             disabled={!onNext}
             className={`flex items-center gap-3 glassmorphism bg-white/40 dark:bg-white/5 px-6 py-4 rounded-2xl transition-all shadow-md group ${!onNext ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white hover:scale-105 cursor-pointer'}`}
           >
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold text-brand-text/40 tracking-widest leading-none mb-1">Next</p>
                <p className="text-xs font-bold text-brand-text">Painting</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-brand-text/40 group-hover:text-brand-accent group-hover:bg-brand-accent/10 transition-colors">
                <ChevronRight size={20} />
              </div>
           </button>
        </div>

      </div>

    </div>
  );
};

export default PaintingModal;
