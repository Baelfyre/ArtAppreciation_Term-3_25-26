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
    <div className="absolute right-6 top-6 z-10 w-96 max-h-[calc(100%-48px)] overflow-y-auto bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl custom-scrollbar animate-in slide-in-from-right-8 duration-500">
      <div className="relative h-56 w-full overflow-hidden rounded-t-2xl border-b border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white backdrop-blur-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <ImageWithFallback 
          src={artifact.imageUrl} 
          alt={artifact.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
            {artifact.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-medium text-white leading-tight mb-4">
          {artifact.name}
        </h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Origin</p>
              <p className="text-slate-200">{artifact.origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <Building2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-0.5">Current Location</p>
              <p className="text-slate-200">{artifact.institution}, {artifact.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Description</p>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {artifact.description}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Cultural Significance</p>
            <p className="text-slate-300 text-sm leading-relaxed font-light">
              {artifact.significance}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
