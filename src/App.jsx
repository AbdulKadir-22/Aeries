import React, { useState, useEffect } from 'react';
import PetalRain from './components/PetalRain';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Shelf from './components/Shelf';
import Paintings from './components/Paintings';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const favicon = document.getElementById('favicon');
    if (darkMode) {
      document.documentElement.classList.add('dark');
      if (favicon) favicon.href = '/AA_dark.png';
    } else {
      document.documentElement.classList.remove('dark');
      if (favicon) favicon.href = '/AA_light.png';
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans transition-colors duration-500">
      <PetalRain />
      
      {/* Corner Tulips - keep on all pages or specific ones */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower right hidden md:block" />
      {/* Mobile only left tulip */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left mobile-tulip md:hidden" />

      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Render Pages based on path */}
      {currentPath === '/contact' && <Contact />}
      {currentPath === '/shelf' && <Shelf />}
      {currentPath === '/paintings' && <Paintings />}
      {(currentPath === '/' || currentPath === '') && <Hero />}
    </div>
  );
}

export default App;