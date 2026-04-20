import React from 'react';

const Contact = () => {
  return (
    <main className="flex-1 flex items-center justify-center z-20 px-4 relative mt-24 md:mt-20 mb-8 w-full h-full max-w-6xl mx-auto">
      <div className="glassmorphism rounded-3xl overflow-hidden flex flex-col md:flex-row w-full max-h-[85vh] md:max-h-[80vh]">
        
        {/* Left Side: Tulip Painting */}
        <div className="w-full md:w-5/12 h-48 md:h-auto relative overflow-hidden flex items-center justify-center bg-brand-text/5">
          {/* Glassmorphism overlay for the painting effect */}
          <div className="absolute inset-0 z-10 glassmorphism opacity-20 pointer-events-none"></div>
          <img 
            src="/contact-painting.png" 
            alt="Tulip Painting" 
            className="w-[120%] h-[120%] object-cover mix-blend-multiply dark:mix-blend-screen -mb-10 opacity-90"
          />
        </div>

        {/* Right Side: Contact Info & Form */}
        <div className="w-full md:w-7/12 p-6 md:p-10 flex flex-col justify-start overflow-y-auto no-scrollbar pb-8">
          <h2 className="font-caveat text-4xl md:text-5xl mb-4 font-bold tracking-wider text-brand-text drop-shadow-sm">
            Let's Connect
          </h2>
          
          <p className="text-base mb-6 opacity-80 italic font-medium leading-relaxed">
            Whether you have a project in mind, want to collaborate on a masterpiece, or simply wish to say hello, my inbox is always open.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-3 opacity-90">Why you should contact me:</h3>
            <ul className="space-y-3 md:space-y-2 opacity-85 text-sm md:text-base">
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">✧</span>
                <span><strong>Creative Synergy:</strong> We can create visually stunning and emotionally immersive experiences together.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">✧</span>
                <span><strong>Technical Excellence:</strong> Clean, maintainable, and highly performant code tailored to your needs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-accent font-bold mt-0.5">✧</span>
                <span><strong>Reliable Partner:</strong> Punctual delivery with transparent communication at every step.</span>
              </li>
            </ul>
          </div>

          <form className="flex flex-col gap-3 md:gap-4 mt-auto">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xs font-semibold opacity-75 ml-1 uppercase tracking-widest">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your elegant name" 
                className="w-full bg-white/20 dark:bg-black/20 border border-brand-text/10 rounded-2xl px-4 py-2.5 outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/30"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-semibold opacity-75 ml-1 uppercase tracking-widest">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="your@email.com" 
                className="w-full bg-white/20 dark:bg-black/20 border border-brand-text/10 rounded-2xl px-4 py-2.5 outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/30"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="text-xs font-semibold opacity-75 ml-1 uppercase tracking-widest">Message</label>
              <textarea 
                id="message" 
                rows="3"
                placeholder="How can we bloom together?" 
                className="w-full bg-white/20 dark:bg-black/20 border border-brand-text/10 rounded-2xl px-4 py-2.5 outline-none focus:border-brand-accent transition-colors placeholder:text-brand-text/30 resize-none"
              ></textarea>
            </div>
            <button 
              type="button" 
              className="mt-2 w-full bg-brand-text text-brand-bg font-bold py-3 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
        
      </div>
    </main>
  );
};

export default Contact;
