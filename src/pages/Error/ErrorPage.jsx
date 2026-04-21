import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Wind } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-brand-accent/20 rounded-full blur-xl"
            animate={{
              x: [Math.random() * 100 - 50 + 'vw', Math.random() * 100 - 50 + 'vw'],
              y: [Math.random() * 100 - 50 + 'vh', Math.random() * 100 - 50 + 'vh'],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 2.2, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 1.5 }
          }}
        >
          <div className="relative inline-block mb-8">
             <motion.div
               animate={{ 
                 rotate: [0, 5, -5, 0],
                 y: [0, -10, 0]
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20"
             >
               <img src="/corner_tulips.png" alt="Lost Tulip" className="w-40 h-40 object-contain mix-blend-multiply dark:mix-blend-screen opacity-100" />
             </motion.div>
             <motion.div 
               className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-brand-text/5 blur-md rounded-full"
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>

          <h1 className="text-8xl md:text-9xl font-serif italic text-brand-text/10 absolute -top-12 left-1/2 -translate-x-1/2 select-none">
            404
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-serif italic text-brand-text mb-6 relative z-10 leading-tight">
            Lost in Bloom
          </h2>
          
          <p className="text-brand-text/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            Even the most beautiful wanderers lose their way sometimes. This corner of the garden hasn't blossomed yet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link 
              to="/"
              className="flex items-center gap-2 px-8 py-4 bg-brand-text text-brand-bg rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-text/10 group"
            >
              <Home size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Back to Garden
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 bg-white/40 dark:bg-white/5 border border-brand-text/10 rounded-2xl font-bold hover:bg-white transition-all text-brand-text/70 hover:text-brand-text"
            >
              <ArrowLeft size={18} />
              Return Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Wind Effect */}
      <div className="absolute right-[-10%] top-[20%] opacity-10 pointer-events-none rotate-12">
        <Wind size={300} className="text-brand-text" />
      </div>
    </div>
  );
};

export default ErrorPage;
