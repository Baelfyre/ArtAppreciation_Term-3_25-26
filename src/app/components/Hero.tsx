import React from "react";
import { Globe2 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative z-10 border-y border-white/5 px-6 pb-20 pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="glass-chip-warm mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm uppercase tracking-[0.28em] text-[#f4c430]">
          <span className="h-2 w-2 rounded-full bg-[#f4c430]" />
          Art Appreciation Project
        </div>

        <h1 className="section-title mb-8 text-5xl font-semibold leading-[0.95] text-white md:text-7xl lg:text-8xl">
          Mapping Filipino Heritage
          <br className="hidden md:block" />
          Abroad
        </h1>

        <p className="mb-12 max-w-4xl text-xl font-light leading-relaxed text-slate-300 md:text-2xl">
          Explore a globe-led digital exhibition of significant Filipino artifacts, artworks, and
          cultural objects currently housed in museums and collections globally.
        </p>

        <button
          onClick={() => document.getElementById("globe")?.scrollIntoView({ behavior: "smooth" })}
          className="glass-button inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-medium text-white"
        >
          <Globe2 className="h-5 w-5" />
          Explore the Globe
        </button>
      </div>
    </section>
  );
};
