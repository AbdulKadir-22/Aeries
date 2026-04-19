import React, { useState, useEffect } from 'react';
import PetalRain from './components/PetalRain';
import { Sun, Moon } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaCode } from 'react-icons/fa';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans transition-colors duration-500">
      <PetalRain />
      
      {/* Corner Tulips */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower right" />

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 glassmorphism rounded-full px-6 py-3 flex items-center justify-between">
        <div className="font-serif italic font-bold text-2xl tracking-wide w-12 h-12 rounded-full border-2 border-current flex items-center justify-center opacity-80">
          AA
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-90 tracking-wide">
          <a href="#" className="hover:text-brand-accent transition-colors">Home</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Projects</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Paintings</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Skills</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Shelf</a>
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center p-1 w-16 h-8 rounded-full glassmorphism relative overflow-hidden cursor-pointer hover:border-brand-accent transition-colors"
          aria-label="Toggle Dark Mode"
        >
          <div className="flex justify-between items-center w-full px-1 text-current opacity-60">
            <Sun size={14} />
            <Moon size={14} />
          </div>
          <div className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-current transition-transform duration-300 ease-in-out flex items-center justify-center ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}>
          </div>
        </button>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center z-20 text-center px-4 relative mt-20">
        <h1 className="font-caveat text-7xl md:text-9xl mb-6 font-bold tracking-wider text-brand-text/90 drop-shadow-sm">
          Alfisha Ansari
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl leading-relaxed mb-10 opacity-80 italic font-medium">
          Crafting the designs from the bottom of my heart, while blooming myself through discipline and wisdom
        </p>
        
        <div className="flex gap-4 glassmorphism px-8 py-4 rounded-3xl">
          <a href="#" className="p-2 hover:text-brand-accent transition-all hover:scale-110 active:scale-95" aria-label="GitHub">
            <FaGithub size={24} />
          </a>
          <a href="#" className="p-2 hover:text-brand-accent transition-all hover:scale-110 active:scale-95" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="#" className="p-2 hover:text-brand-accent transition-all hover:scale-110 active:scale-95" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="p-2 hover:text-brand-accent transition-all hover:scale-110 active:scale-95" aria-label="Code">
            <FaCode size={24} />
          </a>
        </div>
      </main>

    </div>
  );
}

export default App;