import React from "react";
import { Globe2 } from "lucide-react";

const baybayinWords = [
  { glyphs: "ᜀᜅ᜔", label: "Ang" },
  { glyphs: "ᜊᜄᜓᜅ᜔", label: "Bagong" },
  { glyphs: "ᜌᜓᜄ᜔ᜆᜓ", label: "Yugto" },
  { glyphs: "ᜈᜅ᜔", label: "ng" },
  { glyphs: "ᜐᜒᜈᜒᜅ᜔", label: "Sining" },
  { glyphs: "ᜉᜒᜎᜒᜉᜒᜈᜓ", label: "Pilipino" },
] as const;

export const Hero = () => {
  return (
    <section className="museum-hero relative z-10 border-y border-white/5 pb-14 pt-28 md:pb-20 md:pt-32">
      <div className="hero-content flex flex-col items-center text-center">
        <div className="glass-chip-warm mb-6 inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] text-[#f4c430] md:mb-8 md:gap-3 md:px-5 md:text-sm md:tracking-[0.28em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f4c430] md:h-2 md:w-2" />
          MO-HUM034 Art Appreciation
        </div>

        <h1
          className="baybayin-title"
          aria-label="Ang Bagong Yugto ng Sining Pilipino"
        >
          {baybayinWords.map((word) => (
            <span key={word.label} className="baybayin-word">
              <span className="baybayin-glyph" lang="tl-Tglg" aria-hidden="true">
                {word.glyphs}
              </span>
              <span className="baybayin-label" aria-hidden="true">
                {word.label}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-translation-pill">
          Filipino Art in This Day and Age
        </div>

        <p className="hero-lede mb-8 max-w-4xl font-light text-slate-300 md:mb-10">
          A digital exhibition of evolving Filipino identity through local stories, contemporary
          creativity, and global connections.
        </p>

        <button
          onClick={() => document.getElementById("globe")?.scrollIntoView({ behavior: "smooth" })}
          className="hero-cta inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-base font-medium text-white md:gap-3 md:px-8 md:py-4 md:text-lg"
        >
          <Globe2 className="h-5 w-5" />
          Explore the Globe
        </button>
      </div>
    </section>
  );
};
