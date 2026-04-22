import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import PetalRain from './PetalRain';
import Footer from './Footer';
import BackgroundMusic from './BackgroundMusic';

const Layout = ({ darkMode, setDarkMode }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // The Organic Bloom Animation (Entry Only)
  const bloomVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.96, 
      filter: "blur(12px)",
      y: 10
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 2.2,
        ease: [0.16, 1, 0.1, 1], // Very slow luxurious ease-out
        opacity: { duration: 1.5 }
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col font-sans transition-colors duration-500">
      <PetalRain />
      <BackgroundMusic isPlaying={isMusicPlaying} />
      
      {/* Global Theme Decorations */}
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower right hidden md:block" />
      <img src="/corner_tulips.png" alt="tulip decoration" className="corner-flower left mobile-tulip md:hidden" />

      {/* Navbar stays consistent */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Page Content injected here with Global Organic Bloom */}
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence>
          <motion.div
            key={location.pathname}
            variants={bloomVariants}
            initial="initial"
            animate="animate"
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!isHomePage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default Layout;

