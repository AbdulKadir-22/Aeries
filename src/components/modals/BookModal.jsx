import React, { useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Star, Calendar, BookOpen, Quote } from 'lucide-react';

const BookModal = ({ book, onClose, onNext, onPrev }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 400);
  };

  if (!book) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 bg-brand-bg/95 backdrop-blur-sm transition-opacity duration-500 ease-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* The background click zone to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose}></div>
      
      {/* Top Left Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button 
          onClick={handleClose}
          className="flex items-center gap-2 text-brand-text/80 hover:text-brand-text font-semibold tracking-wide transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Shelf
        </button>
      </div>

      {/* Book Container */}
      <div 
        onClick={(e) => e.stopPropagation()} // FIX: Prevent clicks inside from closing the book
        className={`relative w-full max-w-5xl h-[85vh] md:h-auto md:aspect-[7/5] bg-[#4a3551] rounded-xl shadow-[0_30px_60px_rgba(74,53,81,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)] p-2 md:p-3 transition-transform duration-700 ease-out flex flex-col z-10 ${isOpen ? 'scale-100 translate-y-0' : 'scale-[0.98] translate-y-8'}`}
      >
        
        {/* Pages Wrapper */}
        <div className="flex-1 w-full h-full flex flex-col md:flex-row rounded-lg overflow-y-auto md:overflow-hidden relative shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] custom-scrollbar pb-10 md:pb-0" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Middle Spine Shadow Overlay */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none z-30 hidden md:block"></div>
          
          {/* Bookmark Ribbon */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-12 bg-[#c95a70] rounded-b-sm shadow-md z-40 hidden md:block">
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[8px] border-b-[#fcfaf5]"></div>
          </div>

          {/* Left Page */}
          <div className="w-full md:w-1/2 h-auto md:h-full shrink-0 bg-[#fcfaf5] p-6 md:p-10 flex flex-col overflow-visible md:overflow-y-auto no-scrollbar relative z-20">
            {/* Page texture line */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 24px, #000 24px, #000 25px)' }}></div>
            
            <div className="flex gap-6 mb-6">
              {/* Cover Image */}
              <div className="w-1/2 shrink-0">
                <img 
                  src={book.coverUrl || "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"} 
                  alt={book.title} 
                  className="w-full rounded-md shadow-[0_10px_20px_rgba(0,0,0,0.15)] aspect-[2/3] object-cover" 
                />
              </div>
              
              {/* Meta Info */}
              <div className="w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#3e2c45] mb-1 leading-tight">{book.title}</h2>
                <p className="text-brand-accent font-semibold text-sm mb-4">{book.author}</p>
                
                <div className="space-y-3 text-xs md:text-sm text-[#5a4860] font-medium">
                  <div className="flex items-center gap-3">
                    <BookOpen size={14} className="opacity-60" />
                    <span className="w-14 opacity-70">Genre</span>
                    <span className="truncate">{book.genre || 'Literature'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-[14px] h-[14px] border border-current rounded-sm opacity-60 flex items-center justify-center text-[8px] font-bold">P</div>
                    <span className="w-14 opacity-70">Pages</span>
                    <span>{book.pages || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="opacity-60" />
                    <span className="w-14 opacity-70">Published</span>
                    <span>{book.firstPublished || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star size={14} className="opacity-60" />
                    <span className="w-14 opacity-70">Rating</span>
                    <div className="flex text-brand-accent">
                      {[...Array(book.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="relative bg-[#f6eef1] p-5 rounded-lg mb-6 border border-[#eedcde] text-center">
              <Quote size={16} className="absolute top-2 left-2 text-[#d1a8b1] opacity-50" />
              <Quote size={16} className="absolute bottom-2 right-2 text-[#d1a8b1] opacity-50" />
              <p className="italic text-[#6b5565] font-serif text-sm md:text-base leading-relaxed px-4">
                {book.quote || "A journey of a thousand miles begins with a single step."}
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="font-bold text-[#3e2c45] mb-2 font-serif">About the Book</h3>
              <p className="text-[#5a4860] text-sm leading-relaxed text-justify">
                {book.about || "An insightful read that challenges your perspectives..."}
              </p>
            </div>
          </div>

          {/* Right Page */}
          <div className="w-full md:w-1/2 h-auto md:h-full shrink-0 bg-[#fcfaf5] p-6 md:p-10 flex flex-col overflow-visible md:overflow-y-auto no-scrollbar relative shadow-[-5px_0_15px_rgba(0,0,0,0.03)] z-10">
            {/* Page texture line */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 24px, #000 24px, #000 25px)' }}></div>
            
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#3e2c45] text-center mb-2">My Review</h2>
            <div className="flex items-center gap-2 justify-center mb-6 opacity-60">
              <div className="w-6 h-[1px] bg-[#3e2c45]"></div>
              <div className="rotate-45 w-1.5 h-1.5 bg-[#3e2c45]"></div>
              <div className="w-6 h-[1px] bg-[#3e2c45]"></div>
            </div>

            <p className="text-[#5a4860] text-sm md:text-base leading-loose whitespace-pre-line text-justify mb-8 flex-1">
              {book.review}
            </p>

            {/* Takeaway Block */}
            <div className="bg-[#fcf5f7] p-5 rounded-xl border border-[#f0e3e7] relative mt-auto mb-20 md:mb-0">
              <h4 className="font-bold text-[#3e2c45] mb-2 font-serif flex items-center gap-2">
                My Takeaway 🌿
              </h4>
              <p className="text-[#6b5565] text-sm italic pr-12">
                {book.takeaway || "The universe has your back. Trust the process and never give up."}
              </p>
              
              {/* Decorative Floral Graphic (Using absolute positioned flower styling) */}
              <img src="/contact-painting.png" alt="floral" className="absolute -bottom-6 -right-6 w-32 h-32 object-cover opacity-60 mix-blend-multiply drop-shadow-sm pointer-events-none" style={{ clipPath: 'circle(40% at 50% 50%)'}} />
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-6 z-50 pointer-events-none">
        
        {/* Prev Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); if (onPrev) onPrev(); }}
          className={`flex items-center gap-2 bg-white/60 dark:bg-black/60 hover:bg-white backdrop-blur-md px-4 py-2 rounded-full shadow-lg pointer-events-auto transition-all ${!onPrev ? 'opacity-0 cursor-default' : 'opacity-100'}`}
        >
          <ChevronLeft size={16} className="text-brand-text" />
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase font-bold text-brand-text/50 tracking-wider">Previous</span>
            <span className="text-sm font-semibold text-brand-text">Book</span>
          </div>
        </button>

        {/* Center Icon (Desktop) / Mobile Close Button */}
        <div className="hidden md:flex w-12 h-12 rounded-full bg-brand-accent text-white items-center justify-center shadow-[0_0_20px_rgba(255,182,193,0.5)] pointer-events-auto">
          <BookOpen strokeWidth={1.5} />
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); handleClose(); }}
          className="md:hidden flex items-center gap-2 bg-[#c95a70] text-white px-6 py-3 rounded-full shadow-2xl pointer-events-auto font-bold uppercase tracking-widest text-xs"
        >
          Close
        </button>

        {/* Next Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); if (onNext) onNext(); }}
          className={`flex items-center gap-2 bg-white/60 dark:bg-black/60 hover:bg-white backdrop-blur-md px-4 py-2 rounded-full shadow-lg pointer-events-auto transition-all ${!onNext ? 'opacity-0 cursor-default' : 'opacity-100'}`}
        >
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] uppercase font-bold text-brand-text/50 tracking-wider">Next</span>
            <span className="text-sm font-semibold text-brand-text">Book</span>
          </div>
          <ChevronRight size={16} className="text-brand-text" />
        </button>

      </div>

    </div>
  );
};

export default BookModal;
