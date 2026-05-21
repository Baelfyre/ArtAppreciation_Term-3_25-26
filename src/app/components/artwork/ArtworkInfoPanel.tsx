import { Brush, Globe2, MapPin, Sparkles, User, X, type LucideIcon } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation } from "../../services/artworkRepository";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PixelAcrossBordersReveal } from "./PixelAcrossBordersReveal";
import { AngCollageAssembly } from "./AngCollageAssembly";
import { JadlocTraditionToIdentity } from "./JadlocTraditionToIdentity";
import { ViloriaSplitCombine } from "./ViloriaSplitCombine";

interface ArtworkInfoPanelProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkInfoPanel = ({ artwork, onClose }: ArtworkInfoPanelProps) => {
  if (!artwork || artwork.isPlaceholder) return null;

  const locationLabel = formatArtworkLocation(artwork.location);

  return (
    <aside className="artwork-panel-slide glass-panel-strong absolute bottom-4 left-4 right-4 top-28 z-30 overflow-hidden rounded-[1.75rem] shadow-2xl md:bottom-6 md:left-6 md:right-6 md:top-32">
      <div className="flag-accent absolute inset-x-0 top-0 z-30 h-px" />
      <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />

      <div className="relative grid h-full gap-4 overflow-y-auto p-4 pt-14 custom-scrollbar lg:grid-cols-[0.85fr_1.25fr_1fr] lg:overflow-hidden lg:p-5 lg:pt-14">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artwork panel"
          className="glass-chip absolute right-4 top-4 z-20 rounded-full p-2 text-white transition-colors hover:bg-black/[0.35] md:right-5 md:top-5"
        >
          <X className="h-4 w-4" />
        </button>

        <section className="glass-chip order-3 flex min-h-[17rem] flex-col overflow-hidden rounded-[1.35rem] p-4 lg:order-1 lg:min-h-0">
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#f4c430]">Location</p>
            <h3 className="section-title text-xl font-semibold text-white">
              {artwork.scope === "local" ? "Philippine Local Map" : "Global Marker"}
            </h3>
          </div>

          <LocationPreview artwork={artwork} />

          <div className="mt-4 rounded-[1rem] border border-white/10 bg-black/15 p-4">
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">Selected place</p>
            <p className="text-sm leading-relaxed text-slate-200">{locationLabel}</p>
          </div>
        </section>

        <section className="order-1 flex min-h-[22rem] flex-col rounded-[1.35rem] lg:order-2 lg:min-h-0">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#f4c430]">Artwork preview</p>
              <h3 className="section-title text-xl font-semibold text-white">Focused Artwork</h3>
            </div>
            <span className="glass-chip-warm rounded-full px-3 py-1 text-xs font-medium capitalize text-white">
              {artwork.scope}
            </span>
          </div>

          <div className="artwork-focus-frame min-h-[18rem] flex-1">
            <ArtworkPreview artwork={artwork} />
          </div>
        </section>

        <section className="glass-chip custom-scrollbar order-2 flex min-h-[20rem] flex-col rounded-[1.35rem] p-5 lg:order-3 lg:min-h-0 lg:overflow-y-auto">
          <div className="mb-5">
            <span className="glass-chip-warm mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize text-white">
              {artwork.scope}
            </span>
            <h2 className="section-title text-2xl font-medium leading-tight text-white">
              {artwork.title}
            </h2>
          </div>

          <div className="mb-5 grid gap-3">
            <InfoRow icon={User} label="Creator" value={artwork.creator} />
            <InfoRow icon={MapPin} label="Location" value={locationLabel} />
            <InfoRow icon={Brush} label="Medium" value={artwork.medium} />
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
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)]">
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
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(29,73,216,0.28),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(244,196,48,0.12),transparent_48%),rgba(255,255,255,0.04)]">
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
  <div className="glass-chip flex items-start gap-3 rounded-[1.15rem] p-4 text-sm">
    <div className="glass-chip-warm mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
      <Icon className="h-4 w-4 text-[#f4c430]" />
    </div>
    <div>
      <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-slate-200">{value}</p>
    </div>
  </div>
);

interface InfoBlockProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

const InfoBlock = ({ label, value, icon: Icon }: InfoBlockProps) => (
  <div className="glass-chip rounded-[1.15rem] p-4">
    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#f4c430]" />}
      <span>{label}</span>
    </div>
    <p className="text-sm font-light leading-relaxed text-slate-300">{value}</p>
  </div>
);
