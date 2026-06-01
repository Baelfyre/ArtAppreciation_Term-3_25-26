import { ArrowRight, MapPin } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation } from "../../services/artworkRepository";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  actionTabIndex?: number;
}

export const ArtworkCard = ({ artwork, onSelect, actionTabIndex }: ArtworkCardProps) => {
  const isPlaceholder = artwork.isPlaceholder;

  return (
    <article
      className={`glass-panel artwork-card group relative flex h-full flex-col overflow-hidden rounded-[1.35rem] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 md:rounded-[1.75rem] ${
        isPlaceholder ? "international-placeholder-card" : ""
      }`}
    >
      <div className="flag-accent absolute inset-x-0 top-0 z-20 h-px opacity-70" />
      <div className="relative h-44 overflow-hidden md:h-48">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(5,8,22,0.08),rgba(5,8,22,0.46))] transition-colors group-hover:bg-[linear-gradient(180deg,rgba(5,8,22,0.02),rgba(5,8,22,0.34))]" />
        <div className="pattern-surface absolute inset-0 z-10 opacity-20" />
        {isPlaceholder ? (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_42%,rgba(244,196,48,0.16),transparent_32%),linear-gradient(135deg,rgba(29,73,216,0.18),rgba(5,8,22,0.88))]">
            <div className="flex flex-col items-center text-center">
              <span className="glass-chip-warm mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                <MapPin className="h-5 w-5 text-[#f4c430]" />
              </span>
              <span className="max-w-[12rem] text-xs uppercase tracking-[0.22em] text-slate-300">
                Pseudo location
              </span>
            </div>
          </div>
        ) : (
          <ImageWithFallback
            src={artwork.imageUrl}
            alt={artwork.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute left-3 top-3 z-20">
          <span className="glass-chip-warm rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            {isPlaceholder ? "placeholder" : artwork.scope}
          </span>
        </div>
      </div>

      <div className="flex flex-grow flex-col p-4 md:p-5">
        <h3 className="section-title mb-2 line-clamp-2 text-lg font-medium leading-snug text-white">
          {artwork.title}
        </h3>
        <p className="mb-2 text-[11px] uppercase leading-snug tracking-[0.14em] text-[#f4c430] md:text-xs md:tracking-[0.18em]">
          {formatArtworkLocation(artwork.location)}
        </p>
        <p className="mb-5 line-clamp-3 flex-grow text-sm font-light leading-relaxed text-slate-300 md:mb-6">
          {isPlaceholder
            ? "International marker only. Full artwork details will be added later."
            : artwork.description}
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
          {isPlaceholder ? "Show Marker" : "View Experience"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};
