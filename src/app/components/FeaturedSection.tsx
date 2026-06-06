import type { Artwork } from "../domain/Artwork";
import { ArtworkCard } from "./artwork/ArtworkCard";

interface FeaturedSectionProps {
  artworks: Artwork[];
  onViewArtwork: (artwork: Artwork) => void;
}

export const FeaturedSection = ({ artworks, onViewArtwork }: FeaturedSectionProps) => {
  const localArtworks = artworks.filter((artwork) => artwork.scope === "local").slice(0, 5);

  return (
    <section id="featured" className="py-16 md:py-24">
      <div className="gallery-section">
        <div className="mb-9 flex flex-col text-center md:mb-12 md:text-left">
          <div className="glass-chip-warm mb-4 inline-flex w-fit self-center rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white md:mb-5 md:self-start md:px-4 md:text-xs md:tracking-[0.32em]">
            Selected Artworks for the Proposed Local Gallery
          </div>
          <h2 className="section-title mb-3 text-[clamp(1.85rem,7vw,2.35rem)] font-semibold leading-tight text-white md:mb-4 md:text-4xl">
            Five Main Local Artworks
          </h2>
          <p className="mx-auto max-w-[42rem] text-base font-light leading-relaxed text-slate-300 md:mx-0">
            Painting, mixed media, public sculpture, music, and film show how Filipino art today
            carries local identity, family values, community, and creative change.
          </p>
        </div>

        <div className="local-artwork-grid">
          {localArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSelect={onViewArtwork}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
