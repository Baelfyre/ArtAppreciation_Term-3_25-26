import React from "react";
import { Globe2 } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative z-10 border-y border-white/5 px-6 pb-20 pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="glass-chip-warm mb-8 inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm uppercase tracking-[0.28em] text-[#f4c430]">
          <span className="h-2 w-2 rounded-full bg-[#f4c430]" />
          MO-HUM034 Art Appreciation
        </div>

        <h1 className="section-title mb-8 text-4xl font-semibold leading-[0.98] text-white md:text-6xl lg:text-7xl">
          Filipino Art in This Day and Age
          <br className="hidden md:block" />
          <span className="text-[#f4c430]">Identity Beyond Borders</span>
        </h1>

        <p className="mb-12 max-w-4xl text-xl font-light leading-relaxed text-slate-300 md:text-2xl">
          Explore a digital exhibition showing how Filipino art continues to evolve through diverse
          mediums, personal stories, local places, and global cultural connections.
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
