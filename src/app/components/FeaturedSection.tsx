import React from "react";
import { Artifact } from "../data";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FeaturedSectionProps {
  artifacts: Artifact[];
  onViewOnGlobe: (artifact: Artifact) => void;
}

export const FeaturedSection = ({ artifacts, onViewOnGlobe }: FeaturedSectionProps) => {
  const featured = artifacts.filter(a => a.featured).slice(0, 4);

  return (
    <section id="featured" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="glass-chip-warm mb-5 inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white">
            Featured artifacts
          </div>
          <h2 className="section-title mb-4 text-3xl font-semibold text-white md:text-4xl">
            Featured Collections
          </h2>
          <p className="max-w-2xl font-light text-slate-300">
            Discover highlights from our global mapping project, showcasing some of the most
            significant pieces of Filipino heritage housed in international institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((artifact) => (
            <article
              key={artifact.id}
              className="glass-panel group relative flex flex-col overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flag-accent absolute inset-x-0 top-0 z-20 h-px opacity-70" />
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,8,22,0.08),rgba(5,8,22,0.46))] transition-colors group-hover:bg-[linear-gradient(180deg,rgba(5,8,22,0.02),rgba(5,8,22,0.34))]" />
                <div className="pattern-surface absolute inset-0 z-10 opacity-20" />
              <ImageWithFallback 
                src={artifact.imageUrl} 
                alt={artifact.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 z-20">
                <span className="glass-chip-warm rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase text-white">
                  {artifact.category}
                </span>
              </div>
              </div>
              
              <div className="flex flex-grow flex-col p-5">
                <h3 className="section-title mb-2 text-lg font-medium text-white line-clamp-1">{artifact.name}</h3>
                <p className="mb-6 flex-grow text-sm font-light text-slate-300 line-clamp-3">
                  {artifact.description}
                </p>
                
                <button 
                  onClick={() => {
                    document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth' });
                    onViewOnGlobe(artifact);
                  }}
                  className="mt-auto flex items-center gap-2 text-sm font-medium text-[#f4c430] transition-colors hover:text-white"
                >
                  View on Globe
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
