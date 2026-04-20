import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';
import content from '../data/content.json';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50 glassmorphism rounded-full px-6 py-3 flex items-center justify-between">
        <div className="w-12 h-12 flex items-center justify-center opacity-90 transition-opacity hover:opacity-100">
          <img src={darkMode ? "/AA_dark.png" : "/AA_light.png"} alt="Logo" className="w-full h-full object-contain drop-shadow-sm rounded-full " />
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-90 tracking-wide">
          {content.navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', link.href);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="hover:text-brand-accent transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center p-1 w-16 h-8 rounded-full glassmorphism relative overflow-hidden cursor-pointer hover:border-brand-accent transition-colors hidden md:flex"
            aria-label="Toggle Dark Mode"
          >
            <div className="flex justify-between items-center w-full px-1 text-current opacity-60">
              <Sun size={14} />
              <Moon size={14} />
            </div>
            <div className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-current transition-transform duration-300 ease-in-out flex items-center justify-center ${darkMode ? 'translate-x-8' : 'translate-x-0'}`}>
            </div>
          </button>
          
          {/* Mobile Menu Buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 opacity-80 hover:text-brand-accent"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 opacity-80 hover:text-brand-accent"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-24 right-4 w-64 glassmorphism shadow-2xl rounded-3xl p-6 z-40 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs uppercase tracking-widest opacity-50 font-semibold">Menu</span>
            <Search size={16} className="opacity-50" />
          </div>
          <div className="flex flex-col gap-6">
            {content.navLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', link.href);
                  window.dispatchEvent(new Event('popstate'));
                  setMobileMenuOpen(false);
                }}
                className="text-lg opacity-80 hover:opacity-100 hover:text-brand-accent transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
