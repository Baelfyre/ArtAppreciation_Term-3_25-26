import { Music2 } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ArtworkEffectImageProps {
  artwork: Artwork;
  compact?: boolean;
  variant?: ArtworkMediaVariant;
}

export type ArtworkMediaVariant =
  | "featuredPreview"
  | "focusedPanel"
  | "galleryCard"
  | "detailView";

const triangleFragments = ["left", "center", "right"] as const;
const musicBars = [42, 68, 52, 82, 58, 74, 46, 88, 62, 50, 76, 44];
const variantClasses: Record<ArtworkMediaVariant, string> = {
  featuredPreview: "artwork-visual-effect--featured-preview",
  focusedPanel: "artwork-visual-effect--focused-panel",
  galleryCard: "artwork-visual-effect--gallery",
  detailView: "artwork-visual-effect--detail",
};

export const ArtworkEffectImage = ({
  artwork,
  compact = false,
  variant = "galleryCard",
}: ArtworkEffectImageProps) => {
  const effect = artwork.effect ?? "slow-zoom";
  const alt = artwork.altText ?? artwork.title;
  const artworkEffectClass = `artwork-effect-${artwork.id}`;
  const variantClass = variantClasses[variant];

  if (effect === "music-wave" && artwork.imageUrl) {
    return (
      <div
        className={`artwork-visual-effect ${variantClass} effect-music-wave ${artworkEffectClass} ${compact ? "is-compact" : ""}`}
        tabIndex={compact ? -1 : 0}
      >
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={alt}
          className="artwork-visual-effect-image"
          loading={compact ? "lazy" : "eager"}
          decoding="async"
        />
      </div>
    );
  }

  if (effect === "music-wave" || !artwork.imageUrl) {
    const musicKicker = artwork.id === "local-mapa-sb19" ? "Modern OPM" : "Filipino Music";

    return (
      <div
        className={`artwork-visual-effect ${variantClass} effect-music-wave ${artworkEffectClass} ${compact ? "is-compact" : ""}`}
        tabIndex={compact ? -1 : 0}
        role="img"
        aria-label={alt}
      >
        <div className="music-wave-orbit" aria-hidden="true" />
        <Music2 className="music-wave-icon" aria-hidden="true" />
        <span className="music-wave-kicker">{musicKicker}</span>
        <div className="music-wave-bars" aria-hidden="true">
          {musicBars.map((height, index) => (
            <span key={index} style={{ height: `${height}%`, animationDelay: `${index * -0.08}s` }} />
          ))}
        </div>
        <div className="music-wave-copy">
          <strong>{artwork.title}</strong>
          <span>{artwork.creator}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`artwork-visual-effect ${variantClass} effect-${effect} ${artworkEffectClass} ${compact ? "is-compact" : ""}`}
      tabIndex={compact ? -1 : 0}
    >
      <ImageWithFallback
        src={artwork.imageUrl}
        alt={alt}
        className="artwork-visual-effect-image"
        loading={compact ? "lazy" : "eager"}
        decoding="async"
      />

      {effect === "triangle-fusion" && (
        <div className="triangle-fusion-layer" aria-hidden="true">
          {triangleFragments.map((fragment) => (
            <img
              key={fragment}
              src={artwork.imageUrl}
              alt=""
              className={`triangle-fusion-fragment triangle-fusion-fragment--${fragment}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}

      {effect === "brush-stroke" && (
        <div className="brush-stroke-layer" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}

      {effect === "lively-poster" && (
        <div className="lively-poster-shapes" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {effect === "coffee-ripple" && (
        <div className="coffee-ripple-layer" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
};
