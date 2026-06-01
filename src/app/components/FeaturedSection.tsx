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
  const scopeOrder = { local: 0, international: 1 };
  const featured = [...artworks]
    .sort((a, b) => scopeOrder[a.scope] - scopeOrder[b.scope])
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
    <section id="featured" className="py-16 md:py-24">
      <div className="gallery-section">
        <div className="mb-9 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col text-center md:text-left">
            <div className="glass-chip-warm mb-4 inline-flex w-fit self-center rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white md:mb-5 md:self-start md:px-4 md:text-xs md:tracking-[0.32em]">
              Featured artworks
            </div>
            <h2 className="section-title mb-3 text-[clamp(1.85rem,7vw,2.35rem)] font-semibold leading-tight text-white md:mb-4 md:text-4xl">
              Filipino Art in This Day and Age
            </h2>
            <p className="mx-auto max-w-[38rem] text-base font-light leading-relaxed text-slate-300 md:mx-0">
              Explore group member artworks that show Filipino identity through diverse mediums,
              evolving styles, personal stories, and interactive transitions.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 md:justify-end">
            <button
              type="button"
              onClick={() => moveCarousel("previous")}
              className="featured-carousel-control min-w-0 flex-1 justify-center md:flex-none"
              aria-label="Move featured artworks backward"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => moveCarousel("next")}
              className="featured-carousel-control min-w-0 flex-1 justify-center md:flex-none"
              aria-label="Move featured artworks forward"
            >
              Forward
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div ref={carouselRef} className="featured-carousel -mx-4 overflow-x-auto px-4 md:-mx-6 md:px-6">
          <div className="featured-carousel-track flex w-max">
            {carouselGroups.map((groupIndex) => (
              <div key={groupIndex} className="featured-carousel-group flex gap-4 pr-4 md:gap-6 md:pr-6">
                {featured.map((artwork) => (
                  <div
                    key={`${artwork.id}-${groupIndex}`}
                    className="featured-carousel-card w-[min(19rem,82vw)] shrink-0 md:w-[20rem]"
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
