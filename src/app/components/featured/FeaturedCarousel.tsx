import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
  type TouchEvent,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import {
  FeaturedPreviewCard,
  type FeaturedPanelPosition,
} from "./FeaturedPreviewCard";

interface FeaturedCarouselProps {
  artworks: Artwork[];
  onViewArtwork: (artwork: Artwork) => void;
}

type FeaturedCategoryId = "group" | "localResearch" | "international";

interface FeaturedCategory {
  id: FeaturedCategoryId;
  label: string;
  artworks: Artwork[];
}

const initialSampleIndices: Record<FeaturedCategoryId, number> = {
  group: 0,
  localResearch: 0,
  international: 0,
};

const AUTO_ADVANCE_MS = 4200;
const SAMPLE_SWAP_DELAY_MS = 220;

export const FeaturedCarousel = ({ artworks, onViewArtwork }: FeaturedCarouselProps) => {
  const [activePanelIndex, setActivePanelIndex] = useState(1);
  const [sampleIndices, setSampleIndices] = useState(initialSampleIndices);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStart = useRef({ x: 0, y: 0 });
  const transitionTimer = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const categories = useMemo<FeaturedCategory[]>(
    () => [
      {
        id: "group",
        label: "Group Artworks",
        artworks: artworks.filter(
          (artwork) => artwork.scope === "local" && artwork.localCategory === "groupMember",
        ),
      },
      {
        id: "localResearch",
        label: "Local Art Research",
        artworks: artworks.filter(
          (artwork) => artwork.scope === "local" && artwork.localCategory === "localArtist",
        ),
      },
      {
        id: "international",
        label: "International Exhibit",
        artworks: artworks.filter(
          (artwork) => artwork.scope === "international" && artwork.featured,
        ),
      },
    ],
    [artworks],
  );

  const advanceSamples = useCallback(
    (step: 1 | -1) => {
      setSampleIndices((currentIndices) =>
        categories.reduce<Record<FeaturedCategoryId, number>>(
          (nextIndices, category) => {
            const itemCount = category.artworks.length;
            nextIndices[category.id] =
              itemCount > 1
                ? (currentIndices[category.id] + step + itemCount) % itemCount
                : 0;
            return nextIndices;
          },
          { ...currentIndices },
        ),
      );
    },
    [categories],
  );

  const moveCarousel = useCallback(
    (direction: "previous" | "next") => {
      const step: 1 | -1 = direction === "next" ? 1 : -1;
      setIsTransitioning(true);
      setActivePanelIndex(
        (currentIndex) => (currentIndex + step + categories.length) % categories.length,
      );

      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }

      transitionTimer.current = window.setTimeout(() => {
        advanceSamples(step);
        setIsTransitioning(false);
      }, SAMPLE_SWAP_DELAY_MS);
    },
    [advanceSamples, categories.length],
  );

  useEffect(() => {
    return () => {
      if (transitionTimer.current) {
        window.clearTimeout(transitionTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncMotionPreference();
    mediaQuery.addEventListener("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;

    const intervalId = window.setInterval(() => moveCarousel("next"), AUTO_ADVANCE_MS);
    return () => window.clearInterval(intervalId);
  }, [isPaused, moveCarousel, prefersReducedMotion]);

  const getPanelPosition = (panelIndex: number): FeaturedPanelPosition => {
    const offset = (panelIndex - activePanelIndex + categories.length) % categories.length;
    if (offset === 0) return "center";
    return offset === 1 ? "right" : "left";
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsPaused(false);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    didSwipe.current = false;
    setIsPaused(true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - touchStart.current.x;
    const verticalDistance = touch.clientY - touchStart.current.y;

    if (
      Math.abs(horizontalDistance) >= 45 &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance)
    ) {
      didSwipe.current = true;
      moveCarousel(horizontalDistance < 0 ? "next" : "previous");
    }

    setIsPaused(false);
  };

  const activatePanel = (panelIndex: number, artwork: Artwork) => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }

    if (panelIndex !== activePanelIndex) {
      setActivePanelIndex(panelIndex);
      return;
    }

    document.getElementById("globe")?.scrollIntoView({ behavior: "smooth" });
    onViewArtwork(artwork);
  };

  const activeCategory = categories[activePanelIndex];
  const activeArtwork =
    activeCategory.artworks[sampleIndices[activeCategory.id] % activeCategory.artworks.length];

  return (
    <>
      <div className="featured-museum-card">
        <div className="featured-collection-copy">
          <div className="featured-collection-label">The Collection</div>
          <h2 className="featured-collection-heading section-title">
            <span className="block">One Collection.</span>
            <span className="block">Many Stories.</span>
          </h2>
          <div className="featured-collection-rule" aria-hidden="true" />
          <p className="featured-collection-description">
            Explore group artworks, local art research, and an international exhibit through one
            continuous museum collection.
          </p>

          <div className="featured-collection-controls">
            <button
              type="button"
              onClick={() => moveCarousel("previous")}
              className="featured-carousel-control"
              aria-label="Show previous featured artwork previews"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              type="button"
              onClick={() => moveCarousel("next")}
              className="featured-carousel-control"
              aria-label="Show next featured artwork previews"
            >
              Forward
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className={`featured-preview-stage ${isTransitioning ? "is-transitioning" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={handleBlur}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Featured artwork category previews"
        >
          <div className="featured-preview-floor" aria-hidden="true" />
          {categories.map((category, panelIndex) => {
            const sampleIndex = sampleIndices[category.id] % category.artworks.length;
            const artwork = category.artworks[sampleIndex];

            return (
              <FeaturedPreviewCard
                key={category.id}
                artwork={artwork}
                categoryLabel={category.label}
                itemCount={category.artworks.length}
                sampleIndex={sampleIndex}
                position={getPanelPosition(panelIndex)}
                onActivate={() => activatePanel(panelIndex, artwork)}
                onOpenArtwork={onViewArtwork}
              />
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {activeCategory.label}: {activeArtwork.title}
      </p>
    </>
  );
};
