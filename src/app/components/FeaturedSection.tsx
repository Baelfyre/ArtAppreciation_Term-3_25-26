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
    <section id="featured" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Featured Collections</h2>
        <p className="text-slate-400 max-w-2xl font-light">
          Discover highlights from our global mapping project, showcasing some of the most 
          significant pieces of Filipino heritage housed in international institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((artifact) => (
          <div 
            key={artifact.id}
            className="group flex flex-col bg-[#0f172a] rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
              <ImageWithFallback 
                src={artifact.imageUrl} 
                alt={artifact.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 z-20">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-slate-200 font-medium tracking-wider uppercase">
                  {artifact.category}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-medium text-white mb-2 line-clamp-1">{artifact.name}</h3>
              <p className="text-sm text-slate-400 font-light line-clamp-2 mb-6 flex-grow">
                {artifact.description}
              </p>
              
              <button 
                onClick={() => {
                  document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth' });
                  onViewOnGlobe(artifact);
                }}
                className="flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors mt-auto"
              >
                View on Globe
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
