import type { Artwork } from "../domain/Artwork";
import { FeaturedCarousel } from "./featured/FeaturedCarousel";

interface FeaturedSectionProps {
  artworks: Artwork[];
  onViewArtwork: (artwork: Artwork) => void;
}

export const FeaturedSection = ({ artworks, onViewArtwork }: FeaturedSectionProps) => {
  return (
    <section id="featured" className="featured-preview-section py-12 md:py-16">
      <div className="gallery-section">
        <FeaturedCarousel artworks={artworks} onViewArtwork={onViewArtwork} />
      </div>
    </section>
  );
};
