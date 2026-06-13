import type { Artwork } from "../../domain/Artwork";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  ArtworkEffectImage,
  type ArtworkMediaVariant,
} from "./ArtworkEffectImage";

interface ArtworkMediaProps {
  artwork: Artwork;
  variant: ArtworkMediaVariant;
}

const mediaFrameClasses: Record<ArtworkMediaVariant, string> = {
  featuredPreview: "featured-preview-media-frame",
  focusedPanel: "focused-artwork-media-frame",
  galleryCard: "gallery-artwork-media-frame",
  detailView: "detail-artwork-media-frame",
};

export const ArtworkMedia = ({ artwork, variant }: ArtworkMediaProps) => {
  const isCompact = variant === "featuredPreview" || variant === "galleryCard";

  return (
    <div className={`artwork-media-frame ${mediaFrameClasses[variant]}`}>
      {artwork.effect ? (
        <ArtworkEffectImage artwork={artwork} compact={isCompact} variant={variant} />
      ) : (
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.altText ?? artwork.title}
          className="artwork-media-image"
          loading={isCompact ? "lazy" : "eager"}
          decoding="async"
        />
      )}
    </div>
  );
};
