import React, { useState, useEffect } from 'react';
import { Palette, Heart, ChevronDown } from 'lucide-react';
import paintingsData from '../data/paintings.json';
import PaintingModal from './PaintingModal';

const categories = ['All', 'Watercolor', 'Acrylic', 'Digital', 'Sketches'];

const Paintings = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPaintings, setFilteredPaintings] = useState([]);
  const [selectedPaintingIndex, setSelectedPaintingIndex] = useState(null);
  
  useEffect(() => {
    // Ensuring component loads at top
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPaintings(paintingsData);
    } else {
      setFilteredPaintings(paintingsData.filter(p => p.category === activeCategory));
    }
  }, [activeCategory]);

  const handleOpenPainting = (index) => {
    setSelectedPaintingIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedPaintingIndex(null);
  };

  const handleNext = () => {
    if (selectedPaintingIndex !== null && selectedPaintingIndex < filteredPaintings.length - 1) {
      setSelectedPaintingIndex(selectedPaintingIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPaintingIndex !== null && selectedPaintingIndex > 0) {
      setSelectedPaintingIndex(selectedPaintingIndex - 1);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen relative z-10 w-full animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-12 flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-brand-text mb-6 flex items-center justify-center gap-4">
          🎨 Paintings
        </h1>
        
        {/* Decorative Divider */}
        <div className="flex items-center gap-3 justify-center mb-6 w-full max-w-md opacity-40">
          <div className="h-px bg-brand-text flex-1"></div>
          <div className="rotate-45 w-2 h-2 bg-brand-accent"></div>
          <div className="h-px bg-brand-text flex-1"></div>
        </div>
        
        <p className="text-lg md:text-xl text-brand-text/70 italic font-medium max-w-2xl text-center">
          A collection of moments, emotions and imagination captured with colors and strokes.
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex justify-center mb-16">
        <div className="glassmorphism rounded-full p-2 flex flex-wrap justify-center gap-2 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[#E39EB2] text-white shadow-md' 
                  : 'text-brand-text/70 hover:text-brand-text hover:bg-brand-text/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Paintings Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredPaintings.map((painting, idx) => (
          <div 
            key={painting.id}
            onClick={() => handleOpenPainting(idx)}
            className="break-inside-avoid glassmorphism rounded-2xl md:rounded-3xl p-4 cursor-pointer group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 relative overflow-hidden"
          >
            {/* Image Box */}
            <div className="rounded-xl md:rounded-2xl overflow-hidden mb-5 aspect-auto w-full">
              <img 
                src={painting.image} 
                alt={painting.title} 
                loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            
            {/* Info */}
            <div className="px-2 pb-2">
              <h3 className="text-xl font-bold text-brand-text mb-1 font-serif group-hover:text-[#c95a70] transition-colors">{painting.title}</h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-brand-text/50">{painting.category}</span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF8DA1]">
                  <Heart size={14} fill="#FF8DA1" className="group-hover:scale-110 transition-transform" />
                  <span>{painting.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPaintings.length === 0 && (
        <div className="text-center py-20 opacity-60">
          <Palette size={48} className="mx-auto mb-4 text-brand-text/30" />
          <p className="text-xl font-semibold">No paintings found in this category.</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredPaintings.length > 0 && (
        <div className="flex justify-center mt-16 pb-8">
          <button className="flex items-center gap-2 glassmorphism px-8 py-3 rounded-full text-brand-text hover:bg-brand-text/5 transition-colors text-sm font-bold group">
            Load More 
            <ChevronDown size={16} className="opacity-50 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Painting Modal */}
      {selectedPaintingIndex !== null && (
        <PaintingModal 
          painting={filteredPaintings[selectedPaintingIndex]}
          onClose={handleCloseModal}
          onNext={selectedPaintingIndex < filteredPaintings.length - 1 ? handleNext : null}
          onPrev={selectedPaintingIndex > 0 ? handlePrev : null}
        />
      )}

    </div>
  );
};

export default Paintings;
