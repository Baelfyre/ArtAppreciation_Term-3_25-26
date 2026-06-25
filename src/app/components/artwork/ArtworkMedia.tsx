import { Play } from "lucide-react";
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
      ) : artwork.imageUrl ? (
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.altText ?? artwork.title}
          className="artwork-media-image"
          loading={isCompact ? "lazy" : "eager"}
          decoding="async"
        />
      ) : artwork.mediaType === "video" ? (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_42%,rgba(29,73,216,0.18),rgba(5,8,22,0.88))] p-4 text-center">
          <span className="glass-chip-warm mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <Play className="h-5 w-5 fill-current text-[#f4c430]" />
          </span>
          <span className="max-w-[12rem] text-[10px] font-medium uppercase tracking-[0.2em] text-[#f4c430]">
            Watch Trailer
          </span>
        </div>
      ) : null}
    </div>
  );
};
