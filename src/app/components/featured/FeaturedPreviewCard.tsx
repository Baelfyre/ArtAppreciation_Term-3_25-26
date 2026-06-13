import type { KeyboardEvent } from "react";
import type { Artwork } from "../../domain/Artwork";
import { ArtworkCard } from "../artwork/ArtworkCard";

export type FeaturedPanelPosition = "left" | "center" | "right";

interface FeaturedPreviewCardProps {
  artwork: Artwork;
  categoryLabel: string;
  itemCount: number;
  sampleIndex: number;
  position: FeaturedPanelPosition;
  onActivate: () => void;
  onOpenArtwork: (artwork: Artwork) => void;
}

export const FeaturedPreviewCard = ({
  artwork,
  categoryLabel,
  itemCount,
  sampleIndex,
  position,
  onActivate,
  onOpenArtwork,
}: FeaturedPreviewCardProps) => {
  const isActive = position === "center";
  const actionLabel = isActive
    ? `Open ${artwork.title} in the globe experience`
    : `Center ${categoryLabel} preview`;

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onActivate();
  };

  return (
    <article
      className={`featured-preview-panel is-${position}`}
      role="button"
      tabIndex={0}
      aria-label={actionLabel}
      aria-current={isActive ? "true" : undefined}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
    >
      <header className="featured-preview-header">
        <div>
          <p className="featured-preview-eyebrow">Collection Preview</p>
          <h3 className="featured-preview-title">{categoryLabel}</h3>
        </div>
        <span className="featured-preview-count" aria-label={`${itemCount} artworks`}>
          {String(sampleIndex + 1).padStart(2, "0")} / {String(itemCount).padStart(2, "0")}
        </span>
      </header>

      <div className="featured-preview-sample">
        <ArtworkCard
          artwork={artwork}
          onSelect={onOpenArtwork}
          variant="featuredPreview"
        />
      </div>
    </article>
  );
};
