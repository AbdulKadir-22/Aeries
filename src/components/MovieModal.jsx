import React, { useEffect, useState } from 'react';
import { X, Star, Play, Film } from 'lucide-react';

const MovieModal = ({ movie, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 600);
  };

  if (!movie) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? 'opacity-100' : 'opacity-0 delay-0'}`}>
      <div className="absolute inset-0" onClick={handleClose}></div>
      
      {/* Cinematic Frame */}
      <div className={`relative w-full max-w-6xl aspect-auto md:aspect-[21/9] bg-[#050505] rounded-xl overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.05),0_0_40px_rgba(0,0,0,1)] border border-white/5 transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col md:flex-row ${isOpen ? 'scale-100 translate-y-0' : 'scale-[0.97] translate-y-8'}`}>
        
        {/* Glow effect matching poster top left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 blur-[100px] pointer-events-none mix-blend-screen"></div>

        {/* Poster Side */}
        <div className="w-full md:w-2/5 lg:w-1/3 aspect-[2/3] md:aspect-auto relative group overflow-hidden bg-black z-10">
          <img 
            src={movie.posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-[rgba(5,5,5,0.4)] md:to-[#050505]"></div>
          
          <button className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Play fill="white" size={32} className="ml-2" />
          </button>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-3/5 lg:w-2/3 p-8 md:p-14 flex flex-col justify-center text-white relative z-20 overflow-y-auto custom-scrollbar">
          
          {/* Header Metadata */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest font-mono text-white/80 backdrop-blur-sm border border-white/5">
              {movie.year}
            </span>
            <div className="flex gap-1 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]">
              {[...Array(movie.rating)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <div className="ml-auto opacity-30 flex items-center gap-2">
              <Film size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">Review</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight uppercase drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {movie.title}
          </h2>

          <div className="relative">
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-transparent rounded-full opacity-80"></div>
            <p className="text-lg md:text-2xl leading-relaxed text-neutral-300 font-light italic tracking-wide">
              "{movie.review}"
            </p>
          </div>
          
        </div>

      </div>

      <button 
        onClick={handleClose}
        className="absolute top-6 right-6 p-4 rounded-full hover:scale-110 transition-transform text-white/40 hover:text-white bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl z-[150]"
        aria-label="Close theater"
      >
        <X size={28} />
      </button>
    </div>
  );
};

export default MovieModal;
