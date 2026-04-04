import React from "react";
import { Artifact } from "../data";
import { MapPin, Building2, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface InfoPanelProps {
  artifact: Artifact | null;
  onClose: () => void;
}

export const InfoPanel = ({ artifact, onClose }: InfoPanelProps) => {
  if (!artifact) return null;

  return (
    <div className="glass-panel-strong absolute right-4 top-4 z-10 w-[min(24rem,calc(100%-2rem))] max-h-[calc(100%-32px)] overflow-y-auto rounded-[1.5rem] shadow-2xl custom-scrollbar animate-in slide-in-from-right-8 duration-500 md:right-6 md:top-6 md:max-h-[calc(100%-48px)] md:w-96">
      <div className="flag-accent absolute inset-x-0 top-0 z-30 h-px" />

      <div className="relative h-56 w-full overflow-hidden rounded-t-[1.5rem] border-b border-white/10">
        <button 
          onClick={onClose}
          className="glass-chip absolute right-4 top-4 z-20 rounded-full p-2 text-white transition-colors hover:bg-black/[0.35]"
        >
          <X className="w-4 h-4" />
        </button>
        <ImageWithFallback 
          src={artifact.imageUrl} 
          alt={artifact.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.08),rgba(5,8,22,0.7))]" />
        <div className="absolute bottom-4 left-4">
          <span className="glass-chip-warm rounded-full px-3 py-1 text-xs font-medium text-white">
            {artifact.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="section-title mb-4 text-2xl font-medium leading-tight text-white">
          {artifact.name}
        </h2>
        
        <div className="mb-6 grid gap-3">
          <div className="glass-chip flex items-start gap-3 rounded-[1.25rem] p-4 text-sm">
            <div className="glass-chip-warm mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
              <MapPin className="h-4 w-4 text-[#f4c430]" />
            </div>
            <div>
              <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">Origin</p>
              <p className="text-slate-200">{artifact.origin}</p>
            </div>
          </div>
          <div className="glass-chip flex items-start gap-3 rounded-[1.25rem] p-4 text-sm">
            <div className="glass-chip flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(29,73,216,0.16)]">
              <Building2 className="h-4 w-4 text-[#1d49d8]" />
            </div>
            <div>
              <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">Current Location</p>
              <p className="text-slate-200">{artifact.institution}, {artifact.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-chip rounded-[1.25rem] p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Description</p>
            <p className="text-sm font-light leading-relaxed text-slate-300">
              {artifact.description}
            </p>
          </div>
          <div className="glass-chip rounded-[1.25rem] p-4">
            <p className="mb-2 text-xs uppercase tracking-wider text-slate-400">Cultural Significance</p>
            <p className="text-sm font-light leading-relaxed text-slate-300">
              {artifact.significance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
