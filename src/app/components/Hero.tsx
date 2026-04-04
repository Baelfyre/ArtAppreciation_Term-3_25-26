import React from "react";
import { Globe2 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 text-center z-10">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Art Appreciation Project
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6">
          Filipino Art and Culture <br className="hidden md:block"/> Across the World
        </h1>
        <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Explore a curated digital exhibition of significant Filipino artifacts, 
          artworks, and historical objects currently housed in museums and collections globally.
        </p>
        <button 
          onClick={() => document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm transition-all shadow-lg hover:shadow-white/10 font-medium"
        >
          <Globe2 className="w-5 h-5" />
          Explore the Globe
        </button>
      </div>
    </section>
  );
};
