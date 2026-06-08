import { useEffect } from "react";
import { Brush, Globe2, MapPin, Music2, Sparkles, User, X, type LucideIcon } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation, getArtworkCollectionLabel } from "../../services/artworkRepository";
import { ArtworkEffectImage } from "./ArtworkEffectImage";
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
  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork || (artwork.isPlaceholder && artwork.scope === "international")) return null;

  const locationLabel = formatArtworkLocation(artwork.location);
  const collectionLabel = getArtworkCollectionLabel(artwork);
  const hasPlayableMusic = artwork.mediaType === "music" && Boolean(artwork.embedUrl);

  return (
    <>
      <div className="artwork-modal-backdrop" onClick={onClose} />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close artwork panel"
        className="artwork-panel-floating-close glass-chip rounded-full p-2.5 text-white shadow-lg transition-colors hover:bg-black/[0.35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430]"
      >
        <X className="h-4 w-4" />
      </button>
      <aside className="artwork-info-panel artwork-panel-slide glass-panel-strong curved-card-accent custom-scrollbar pointer-events-auto fixed overflow-x-hidden overflow-y-auto overscroll-contain shadow-2xl">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />

        <div className="artwork-panel-layout relative grid min-w-0 gap-3 p-3 pt-4 md:gap-4 md:p-4 md:pt-5 lg:p-5 lg:pt-5">
          <section className="artwork-panel-heading min-w-0 pr-12">
            <span className="glass-chip-warm mb-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize text-white md:mb-4 md:px-3 md:text-xs">
              {collectionLabel}
            </span>
            <h2 className="section-title break-words text-xl font-medium leading-tight text-white md:text-2xl">
              {artwork.title}
            </h2>
          </section>

          <section className="artwork-panel-section artwork-preview-section flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-4">
            <div className="artwork-panel-section-heading mb-3 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Artwork preview</p>
              <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">Focused Artwork</h3>
            </div>

            <div className={`artwork-focus-frame ${hasPlayableMusic ? "is-playable" : "is-visual"}`}>
              <ArtworkPreview artwork={artwork} />
            </div>
          </section>

          <section className="artwork-panel-section artwork-facts-section flex min-h-0 min-w-0 flex-col rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-4">
            <div className="artwork-panel-section-heading mb-3 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Artwork details</p>
              <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">Context &amp; Composition</h3>
            </div>

            <div className="grid gap-3">
              <InfoRow icon={User} label="Creator" value={artwork.creator} />
              <InfoRow icon={MapPin} label="Location" value={locationLabel} />
              <InfoRow icon={Brush} label="Medium" value={artwork.medium} />
            </div>

            <div className="mt-4 space-y-4">
              <InfoBlock label="Elements" value={artwork.elements} icon={Sparkles} />
              <InfoBlock label="Principles" value={artwork.principles} />
            </div>
          </section>

          <section className="artwork-panel-section artwork-story-section flex min-h-0 min-w-0 flex-col rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-4">
            <div className="artwork-panel-section-heading mb-3 min-w-0">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Artwork story</p>
              <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">Meaning &amp; Advocacy</h3>
            </div>

            <div className="space-y-4">
              <InfoBlock label="Description" value={artwork.description} />
              <InfoBlock label="Advocacy Connection" value={artwork.advocacyConnection} icon={Globe2} />
              {artwork.comparisonGroupId === "music-evolution" && (
                <MusicEvolutionComparison activeRole={artwork.comparisonRole} />
              )}
            </div>
          </section>

          <section className="artwork-panel-section artwork-location-section flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[1.15rem] p-3 md:rounded-[1.35rem] md:p-4">
            <div className="artwork-panel-section-heading mb-3 min-w-0 md:mb-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Location</p>
              <h3 className="section-title break-words text-lg font-semibold text-white md:text-xl">
                {artwork.scope === "local" ? "Philippines Map" : "Global Marker"}
              </h3>
            </div>

            <LocationPreview artwork={artwork} />
          </section>
        </div>
      </aside>
    </>
  );
};

const ArtworkPreview = ({ artwork }: { artwork: Artwork }) => {
  if (artwork.mediaType === "music" && artwork.embedUrl) {
    if (artwork.effect === "music-wave") {
      return (
        <div className="artwork-visual-effect effect-music-wave is-compact">
          <ArtworkMediaEmbed
            embedUrl={artwork.embedUrl}
            title={artwork.title}
            provider={artwork.mediaProvider}
            embedHeight={artwork.embedHeight}
          />
        </div>
      );
    }

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

  return <ArtworkEffectImage artwork={artwork} />;
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
      <div className="artwork-location-map-shell relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)]">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
        <div className="artwork-location-map-frame relative">
          <img
            src="/resources/philippines.svg"
            alt="Philippines map"
            className="h-full w-full object-contain opacity-90 [filter:invert(94%)_sepia(13%)_saturate(620%)_hue-rotate(351deg)_brightness(103%)_contrast(94%)_drop-shadow(0_0_22px_rgba(244,196,48,0.18))]"
          />
          {hasLocalMarker && (
            <button
              type="button"
              aria-label={`View location for ${artwork.title}`}
              className="local-map-marker is-selected absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${artwork.location.mapX}%`,
                top: `${artwork.location.mapY}%`,
              }}
            >
              <img
                src="/resources/Pin_loc.svg"
                alt=""
                aria-hidden="true"
                className="local-map-marker-icon"
              />
              <span className="local-map-marker-label">{artwork.location.city ?? artwork.location.label}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="artwork-location-map-shell relative flex items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/10 bg-[radial-gradient(circle_at_50%_42%,rgba(29,73,216,0.28),transparent_34%),radial-gradient(circle_at_50%_50%,rgba(244,196,48,0.12),transparent_48%),rgba(255,255,255,0.04)]">
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
  <div className="artwork-info-row flex min-w-0 items-start gap-2.5 text-[13px]">
    <div className="glass-chip-warm mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
      <Icon className="h-3.5 w-3.5 text-[#f4c430]" />
    </div>
    <div className="min-w-0">
      <p className="mb-0.5 text-[10px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="break-words leading-snug text-slate-200">{value}</p>
    </div>
  </div>
);

interface InfoBlockProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

const InfoBlock = ({ label, value, icon: Icon }: InfoBlockProps) => (
  <div className="artwork-info-block min-w-0">
    <div className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-400">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#f4c430]" />}
      <span>{label}</span>
    </div>
    <p className="break-words text-[13px] font-light leading-[1.5] text-slate-300">{value}</p>
  </div>
);

const MusicEvolutionComparison = ({
  activeRole,
}: {
  activeRole?: "traditional" | "contemporary";
}) => (
  <div className="artwork-info-block artwork-music-comparison min-w-0">
    <div className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-400">
      <Music2 className="h-3.5 w-3.5 text-[#f4c430]" />
      <span>Music evolution</span>
    </div>
    <p className="flex flex-wrap items-center gap-1.5 text-[11px] leading-snug text-slate-300">
      <span className={activeRole === "traditional" ? "font-semibold text-[#f4c430]" : ""}>
        Sa Ugoy ng Duyan
      </span>
      <span aria-hidden="true" className="text-slate-500">-&gt;</span>
      <span className={activeRole === "contemporary" ? "font-semibold text-[#f4c430]" : ""}>
        MAPA
      </span>
      <span className="text-slate-400">Traditional lullaby to modern OPM and P-pop.</span>
    </p>
  </div>
);
