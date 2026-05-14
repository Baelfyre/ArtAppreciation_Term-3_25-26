import type { Artwork } from "../domain/Artwork";
import { ArtworkCard } from "./artwork/ArtworkCard";

interface FeaturedSectionProps {
  artworks: Artwork[];
  onViewArtwork: (artwork: Artwork) => void;
}

export const FeaturedSection = ({ artworks, onViewArtwork }: FeaturedSectionProps) => {
  const featured = artworks.slice(0, 5);
  const carouselGroups = [0, 1];

  return (
    <section id="featured" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="glass-chip-warm mb-5 inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white">
            Featured artworks
          </div>
          <h2 className="section-title mb-4 text-3xl font-semibold text-white md:text-4xl">
            Local and International Filipino Art
          </h2>
          <p className="max-w-2xl font-light text-slate-300">
            Explore Filipino identity through global heritage markers and a local digital artwork
            rooted in Bacolod City, Negros Occidental.
          </p>
        </div>

        <div className="featured-carousel -mx-6 overflow-hidden px-6">
          <div className="featured-carousel-track flex w-max">
            {carouselGroups.map((groupIndex) => (
              <div key={groupIndex} className="featured-carousel-group flex gap-6 pr-6">
                {featured.map((artwork) => (
                  <div
                    key={`${artwork.id}-${groupIndex}`}
                    className="featured-carousel-card w-[min(20rem,78vw)] shrink-0 md:w-[20rem]"
                  >
                    <ArtworkCard
                      artwork={artwork}
                      onSelect={onViewArtwork}
                      actionTabIndex={groupIndex === 1 ? -1 : undefined}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
