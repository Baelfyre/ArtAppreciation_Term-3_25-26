import React from "react";
import { Compass } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white">
          <Compass className="w-6 h-6 text-amber-500" />
          <span className="font-medium tracking-wide">Mapping Filipino Heritage Abroad</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#" className="hover:text-amber-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
          <a href="#globe" className="text-amber-500 font-medium">Globe</a>
          <a href="#featured" className="hover:text-amber-400 transition-colors">Featured</a>
        </div>
      </div>
    </nav>
  );
};
