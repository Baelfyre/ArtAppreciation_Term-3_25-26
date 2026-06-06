import React from "react";
import { Globe2 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative z-10 border-y border-white/5 pb-16 pt-28 md:pb-20 md:pt-32">
      <div className="hero-content flex flex-col items-center text-center">
        <div className="glass-chip-warm mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] text-[#f4c430] md:mb-8 md:gap-3 md:px-5 md:text-sm md:tracking-[0.28em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4c430] md:h-2 md:w-2" />
          MO-HUM034 Art Appreciation
        </div>

        <h1 className="hero-title section-title mb-6 font-semibold text-white md:mb-8">
          <span className="hero-title-main">Filipino Art at This Day and Age</span>
          <span className="hero-title-accent">Content for Our Proposed Local Art Virtual Gallery</span>
        </h1>

        <p className="hero-lede mb-9 max-w-4xl font-light text-slate-300 md:mb-12">
          Explore selected local artworks that express identity, values, region, family, community,
          and creative change across different Filipino art forms.
        </p>

        <button
          onClick={() => document.getElementById("gallery-map")?.scrollIntoView({ behavior: "smooth" })}
          className="glass-button hero-cta inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-base font-medium text-white md:gap-3 md:px-8 md:py-4 md:text-lg"
        >
          <Globe2 className="h-5 w-5" />
          Explore Proposed Gallery
        </button>
      </div>
    </section>
  );
};
