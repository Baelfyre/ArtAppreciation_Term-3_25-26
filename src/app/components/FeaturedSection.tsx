import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Artwork } from "../domain/Artwork";
import { ArtworkCard } from "./artwork/ArtworkCard";

interface FeaturedSectionProps {
  artworks: Artwork[];
  onViewArtwork: (artwork: Artwork) => void;
}

export const FeaturedSection = ({ artworks, onViewArtwork }: FeaturedSectionProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const featured = [...artworks]
    .sort((a, b) => {
      if (a.scope === b.scope) return 0;
      return a.scope === "local" ? -1 : 1;
    })
    .slice(0, 5);
  const carouselGroups = [0, 1];

  const moveCarousel = (direction: "previous" | "next") => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector<HTMLElement>(".featured-carousel-card");
    const cardWidth = firstCard?.offsetWidth ?? 320;
    const gap = 24;
    const offset = direction === "next" ? cardWidth + gap : -(cardWidth + gap);

    carousel.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="featured" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col text-center md:text-left">
            <div className="glass-chip-warm mb-5 inline-flex w-fit self-center rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white md:self-start">
              Featured artworks
            </div>
            <h2 className="section-title mb-4 text-3xl font-semibold text-white md:text-4xl">
              Filipino Art in This Day and Age
            </h2>
            <p className="max-w-2xl font-light text-slate-300">
              Explore local artworks that show Filipino identity through diverse mediums,
              evolving styles, personal stories, and interactive transitions.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => moveCarousel("previous")}
              className="featured-carousel-control"
              aria-label="Move featured artworks backward"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => moveCarousel("next")}
              className="featured-carousel-control"
              aria-label="Move featured artworks forward"
            >
              Forward
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={carouselRef} className="featured-carousel -mx-6 overflow-x-auto px-6">
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
