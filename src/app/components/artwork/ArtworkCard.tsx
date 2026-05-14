import { ArrowRight } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation } from "../../services/artworkRepository";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  actionTabIndex?: number;
}

export const ArtworkCard = ({ artwork, onSelect, actionTabIndex }: ArtworkCardProps) => {
  return (
    <article className="glass-panel group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="flag-accent absolute inset-x-0 top-0 z-20 h-px opacity-70" />
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,8,22,0.08),rgba(5,8,22,0.46))] transition-colors group-hover:bg-[linear-gradient(180deg,rgba(5,8,22,0.02),rgba(5,8,22,0.34))]" />
        <div className="pattern-surface absolute inset-0 z-10 opacity-20" />
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3 z-20">
          <span className="glass-chip-warm rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            {artwork.scope}
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-5">
        <h3 className="section-title mb-2 line-clamp-1 text-lg font-medium text-white">
          {artwork.title}
        </h3>
        <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#f4c430]">
          {formatArtworkLocation(artwork.location)}
        </p>
        <p className="mb-6 line-clamp-3 flex-grow text-sm font-light text-slate-300">
          {artwork.description}
        </p>

        <button
          type="button"
          tabIndex={actionTabIndex}
          onClick={() => {
            document.getElementById("globe")?.scrollIntoView({ behavior: "smooth" });
            onSelect(artwork);
          }}
          className="mt-auto flex items-center gap-2 text-sm font-medium text-[#f4c430] transition-colors hover:text-white"
        >
          View Experience
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};
