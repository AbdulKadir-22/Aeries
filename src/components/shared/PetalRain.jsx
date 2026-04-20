import React, { useEffect, useState } from 'react';

const PetalRain = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Generate petals only on client side
    const petalCount = 25; // number of petals
    const newPetals = Array.from({ length: petalCount }).map((_, i) => {
      const size = Math.random() * 15 + 10; // 10px to 25px
      const left = Math.random() * 100; // 0% to 100%
      const animationDuration = Math.random() * 10 + 5; // 5s to 15s
      const animationDelay = Math.random() * 10; // 0s to 10s
      const driftX = Math.random() * 60 - 30; // -30px to 30px
      const opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
      
      return {
        id: i,
        size,
        left,
        animationDuration,
        animationDelay,
        driftX,
        opacity
      };
    });
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-[10%] animate-petal-fall"
          style={{
            left: `${petal.left}vw`,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            '--duration': `${petal.animationDuration}s`,
            '--delay': `${petal.animationDelay}s`,
            '--drift-x': `${petal.driftX}px`,
            '--petal-opacity': petal.opacity,
          }}
        >
          {/* Simple petal SVG */}
          <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-brand-accent">
            <path d="M50,0 C65,30 90,50 50,100 C10,50 35,30 50,0 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default PetalRain;
