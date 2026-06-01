import { Brush, Globe2, MapPin, Music2, Sparkles, User, X, type LucideIcon } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation, getArtworkCollectionLabel } from "../../services/artworkRepository";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ArtworkMediaEmbed } from "./ArtworkMediaEmbed";
import { PixelAcrossBordersReveal } from "./PixelAcrossBordersReveal";
import { AngCollageAssembly } from "./AngCollageAssembly";
import { JadlocTraditionToIdentity } from "./JadlocTraditionToIdentity";
import { ViloriaSplitCombine } from "./ViloriaSplitCombine";

interface ArtworkInfoPanelProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkInfoPanel = ({ artwork, onClose }: ArtworkInfoPanelProps) => {
  if (!artwork || (artwork.isPlaceholder && artwork.scope === "international")) return null;

  const locationLabel = formatArtworkLocation(artwork.location);
  const collectionLabel = getArtworkCollectionLabel(artwork);
  const hasPlayableMusic = artwork.mediaType === "music" && Boolean(artwork.embedUrl);

  return (
    <aside className="artwork-info-panel artwork-panel-slide glass-panel-strong curved-card-accent custom-scrollbar absolute z-30 overflow-x-hidden overflow-y-auto overscroll-contain shadow-2xl lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />

      <div className="relative grid min-h-full min-w-0 gap-3 p-3 pt-12 md:gap-4 md:p-4 md:pt-14 lg:h-full lg:grid-cols-[0.85fr_1.25fr_1fr] lg:overflow-hidden lg:p-5 lg:pt-14">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artwork panel"
          className="glass-chip absolute right-3 top-3 z-20 rounded-full p-2 text-white transition-colors hover:bg-black/[0.35] md:right-5 md:top-5"
        >
          <X className="h-4 w-4" />
        </button>

        <section className="glass-chip order-3 flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-4 lg:order-1">
          <div className="mb-3 min-w-0 md:mb-4">
            <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Location</p>
            <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">
              {artwork.scope === "local" ? "Philippines Map" : "Global Marker"}
            </h3>
          </div>

          <LocationPreview artwork={artwork} />

          <div className="mt-3 rounded-[1rem] border border-white/10 bg-black/15 p-3 md:mt-4 md:p-4">
            <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-slate-400 md:text-xs md:tracking-[0.2em]">Selected place</p>
            <p className="break-words text-sm leading-relaxed text-slate-200">{locationLabel}</p>
          </div>
        </section>

        <section className="order-1 flex min-h-0 min-w-0 flex-col rounded-[1.15rem] md:rounded-[1.35rem] lg:order-2">
          <div className="mb-3 flex items-center justify-between gap-3 md:mb-4 md:gap-4">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Artwork preview</p>
              <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">Focused Artwork</h3>
            </div>
            <span className="glass-chip-warm shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium capitalize text-white md:px-3 md:text-xs">
              {collectionLabel}
            </span>
          </div>

          <div
            className={`artwork-focus-frame flex-1 ${
              hasPlayableMusic ? "min-h-[21rem] md:min-h-[24rem]" : "min-h-[13rem] md:min-h-[18rem]"
            }`}
          >
            <ArtworkPreview artwork={artwork} />
          </div>
        </section>

        <section className="glass-chip custom-scrollbar order-2 flex min-h-0 min-w-0 flex-col rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-5 lg:order-3 lg:overflow-y-auto">
          <div className="mb-4 min-w-0 md:mb-5">
            <span className="glass-chip-warm mb-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize text-white md:mb-4 md:px-3 md:text-xs">
              {collectionLabel}
            </span>
            <h2 className="section-title break-words text-xl font-medium leading-tight text-white md:text-2xl">
              {artwork.title}
            </h2>
          </div>

          <div className="mb-5 grid gap-3">
            <InfoRow icon={User} label="Creator" value={artwork.creator} />
            <InfoRow icon={MapPin} label="Location" value={locationLabel} />
            <InfoRow icon={Brush} label="Medium" value={artwork.medium} />
            {artwork.locationBasis && (
              <InfoRow icon={MapPin} label="Location basis" value={artwork.locationBasis} />
            )}
          </div>

          <div className="space-y-4">
            <InfoBlock label="Description" value={artwork.description} />
            <InfoBlock label="Advocacy Connection" value={artwork.advocacyConnection} icon={Globe2} />
            <InfoBlock label="Elements" value={artwork.elements} icon={Sparkles} />
            <InfoBlock label="Principles" value={artwork.principles} />
          </div>
        </section>
      </div>
    </aside>
  );
};

const ArtworkPreview = ({ artwork }: { artwork: Artwork }) => {
  if (artwork.mediaType === "music" && artwork.embedUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center p-2 md:p-3">
        <ArtworkMediaEmbed
          embedUrl={artwork.embedUrl}
          title={artwork.title}
          provider={artwork.mediaProvider}
          embedHeight={artwork.embedHeight}
        />
      </div>
    );
  }

  if (artwork.mediaType === "music" && !artwork.imageUrl) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
        <span className="glass-chip-warm mb-4 flex h-14 w-14 items-center justify-center rounded-full">
          <Music2 className="h-6 w-6 text-[#f4c430]" />
        </span>
        <p className="section-title text-xl font-semibold text-white">{artwork.title}</p>
        <p className="mt-2 text-sm text-slate-300">{artwork.creator}</p>
      </div>
    );
  }

  if (artwork.id === "pixel-across-borders") {
    return <PixelAcrossBordersReveal src={artwork.imageUrl} alt={artwork.title} />;
  }

  if (artwork.id === "ang-these-pages-contain-a-universe") {
    return <AngCollageAssembly src={artwork.imageUrl} alt={artwork.title} />;
  }

  if (artwork.id === "jadloc-tradition-to-vivid-identity" && artwork.transitionImageUrl) {
    return (
      <JadlocTraditionToIdentity
        traditionSrc={artwork.imageUrl}
        vividSrc={artwork.transitionImageUrl}
        alt={artwork.title}
      />
    );
  }

  if (artwork.id === "viloria-work-life-balance") {
    return <ViloriaSplitCombine src={artwork.imageUrl} alt={artwork.title} />;
  }

  return <ImageWithFallback src={artwork.imageUrl} alt={artwork.title} className="artwork-focus-image" />;
};

interface LocationPreviewProps {
  artwork: Artwork;
}

const LocationPreview = ({ artwork }: LocationPreviewProps) => {
  const hasLocalMarker =
    typeof artwork.location.mapX === "number" && typeof artwork.location.mapY === "number";
  const hasCoordinates =
    typeof artwork.location.lat === "number" && typeof artwork.location.lng === "number";

  if (artwork.scope === "local") {
    return (
      <div className="relative min-h-[13.5rem] flex-1 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)] md:min-h-[17rem] lg:min-h-0">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
        <div className="relative mx-auto aspect-[702/1209] h-full max-h-[28rem] max-w-full">
          <img
            src="/resources/philippines.svg"
            alt="Philippines map"
            className="h-full w-full object-contain opacity-90 [filter:invert(94%)_sepia(13%)_saturate(620%)_hue-rotate(351deg)_brightness(103%)_contrast(94%)_drop-shadow(0_0_22px_rgba(244,196,48,0.18))]"
          />
          {hasLocalMarker && (
            <span
              className="local-map-marker is-selected absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${artwork.location.mapX}%`,
                top: `${artwork.location.mapY}%`,
              }}
            >
              <span className="local-map-marker-dot" />
              <span className="local-map-marker-label">{artwork.location.city ?? artwork.location.label}</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[13.5rem] flex-1 items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(29,73,216,0.28),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(244,196,48,0.12),transparent_48%),rgba(255,255,255,0.04)] md:min-h-[17rem] lg:min-h-0">
      <div className="absolute h-56 w-56 rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_28%,rgba(246,244,238,0.16),transparent_18%),linear-gradient(135deg,rgba(29,73,216,0.42),rgba(5,8,22,0.9)_58%,rgba(185,22,44,0.22))] shadow-[0_0_48px_rgba(29,73,216,0.22)]" />
      <div className="absolute h-40 w-40 rounded-full border border-[#f4c430]/20" />
      <div className="relative flex max-w-[13rem] flex-col items-center text-center">
        <span className="glass-chip-warm mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <MapPin className="h-5 w-5 text-[#f4c430]" />
        </span>
        <p className="text-sm font-medium text-white">{artwork.location.label}</p>
        {hasCoordinates && (
          <p className="mt-2 text-xs text-slate-400">
            {artwork.location.lat?.toFixed(2)}, {artwork.location.lng?.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
};

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="glass-chip flex min-w-0 items-start gap-3 rounded-[1.15rem] p-4 text-sm">
    <div className="glass-chip-warm mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
      <Icon className="h-4 w-4 text-[#f4c430]" />
    </div>
    <div className="min-w-0">
      <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="break-words text-slate-200">{value}</p>
    </div>
  </div>
);

interface InfoBlockProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

const InfoBlock = ({ label, value, icon: Icon }: InfoBlockProps) => (
  <div className="glass-chip min-w-0 rounded-[1.15rem] p-4">
    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#f4c430]" />}
      <span>{label}</span>
    </div>
    <p className="break-words text-sm font-light leading-relaxed text-slate-300">{value}</p>
  </div>
);
