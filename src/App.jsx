import React, { useState, useEffect } from 'react';
import PetalRain from './components/PetalRain';
import Navbar from './components/Navbar';
import * as FaIcons from 'react-icons/fa';
import content from './data/content.json';

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
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower right hidden md:block" />
      {/* Mobile only left tulip */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left mobile-tulip md:hidden" />

      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center z-20 text-center px-4 relative mt-20">
        <h1 className="font-caveat text-6xl md:text-9xl mb-6 font-bold tracking-wider text-brand-text/90 drop-shadow-sm">
          {content.hero.name}
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl leading-relaxed mb-10 opacity-80 italic font-medium px-2">
          {content.hero.subtitle}
        </p>
        
        <div className="flex gap-4 glassmorphism px-8 py-4 rounded-3xl relative z-30">
          {content.socialLinks.map((social, idx) => {
            const IconComponent = FaIcons[social.icon] || FaIcons.FaCode;
            return (
              <a 
                key={idx}
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-brand-accent transition-all hover:scale-110 active:scale-95" 
                aria-label={social.platform}
              >
                <IconComponent size={24} />
              </a>
            );
          })}
        </div>
      </main>

    </div>
  );
}

export default App;