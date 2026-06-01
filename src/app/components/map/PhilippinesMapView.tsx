import type { CSSProperties, MouseEvent } from "react";
import type { Artwork } from "../../domain/Artwork";
import {
  prepareLocalMapMarkers,
  type LocalMapMarker,
} from "../../services/mapNavigationService";
import { PhilippinesMarker } from "./PhilippinesMarker";

interface PhilippinesMapViewProps {
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const PhilippinesMapView = ({
  artworks,
  selectedArtwork,
  onSelectArtwork,
}: PhilippinesMapViewProps) => {
  const markers = prepareLocalMapMarkers(artworks);

  const handleSelectMarker = (marker: LocalMapMarker) => {
    onSelectArtwork(marker.artwork);
  };

  const handleMapClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - bounds.left;
    const clickY = event.clientY - bounds.top;

    const nearestMarker = markers.reduce<{
      marker: LocalMapMarker;
      distance: number;
    } | null>((nearest, marker) => {
      const markerX = (marker.displayMapX / 100) * bounds.width;
      const markerY = (marker.displayMapY / 100) * bounds.height;
      const distance = Math.hypot(clickX - markerX, clickY - markerY);

      if (!nearest || distance < nearest.distance) {
        return { marker, distance };
      }

      return nearest;
    }, null);

    if (nearestMarker && nearestMarker.distance <= 24) {
      event.preventDefault();
      event.stopPropagation();
      onSelectArtwork(nearestMarker.marker.artwork);
    }
  };

  return (
    <div className="local-map-panel local-map-fade curved-card-accent pointer-events-auto absolute inset-x-3 bottom-3 top-40 z-10 mx-auto flex max-w-[34rem] flex-col overflow-hidden rounded-[1.25rem] border border-white/14 bg-[rgba(5,8,22,0.54)] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl md:inset-x-4 md:bottom-6 md:top-40 md:rounded-[1.75rem] md:p-5 lg:left-1/2 lg:right-auto lg:top-32 lg:w-[min(64rem,calc(100%-3rem))] lg:max-w-none lg:-translate-x-1/2">
      <div className="mb-3 flex items-start justify-between gap-3 md:mb-4 md:gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Local Art</p>
          <h3 className="section-title text-xl font-semibold text-white md:text-2xl">Philippines Map</h3>
          <p className="mt-1 max-w-[18rem] text-xs leading-snug text-slate-300">
            Group Members' Art and researched Filipino art
          </p>
        </div>
        <span className="glass-chip shrink-0 rounded-full px-2.5 py-1 text-[11px] text-slate-200 md:px-3 md:text-xs">
          {markers.length} {markers.length === 1 ? "marker" : "markers"}
        </span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-[10px] leading-tight text-slate-200 md:mb-4 md:text-xs">
        <span className="glass-chip flex items-center gap-2 rounded-full px-2.5 py-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#f4c430]" />
          Group Members' Art
        </span>
        <span className="glass-chip flex items-center gap-2 rounded-full px-2.5 py-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#86a7ff]" />
          Local Artist Research
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)] md:rounded-[1.25rem]">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
        <div className="relative flex h-full min-h-0 flex-col">
          <div className="local-map-stage relative min-h-[17rem] flex-1 overflow-visible px-2 py-2 lg:px-[15rem] lg:py-3">
            <div
              className="relative mx-auto aspect-[702/1209] h-full max-h-[620px] max-w-full overflow-visible"
              onClickCapture={handleMapClickCapture}
            >
              <img
                src="/resources/philippines.svg"
                alt="Philippines map"
                className="h-full w-full object-contain opacity-90 [filter:invert(94%)_sepia(13%)_saturate(620%)_hue-rotate(351deg)_brightness(103%)_contrast(94%)_drop-shadow(0_0_22px_rgba(244,196,48,0.18))]"
              />

              <svg
                className="local-map-leaders pointer-events-none absolute inset-0 z-10 hidden overflow-visible lg:block"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {markers.map((marker, index) => {
                  const placement = getCalloutPlacement(marker.id, index);

                  return (
                    <line
                      key={`${marker.id}-leader`}
                      x1={marker.displayMapX}
                      y1={marker.displayMapY}
                      x2={placement.lineX}
                      y2={placement.lineY}
                      stroke={marker.color}
                      strokeWidth="0.34"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {markers.map((marker) => (
                <PhilippinesMarker
                  key={marker.id}
                  marker={marker}
                  isSelected={selectedArtwork?.id === marker.artwork.id}
                  onSelect={handleSelectMarker}
                />
              ))}

              <div className="hidden lg:block">
                {markers.map((marker, index) => (
                  <PhilippinesMapCallout
                    key={`${marker.id}-callout`}
                    marker={marker}
                    placement={getCalloutPlacement(marker.id, index)}
                    isSelected={selectedArtwork?.id === marker.artwork.id}
                    onSelect={handleSelectMarker}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="local-map-mobile-list border-t border-white/10 p-2 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {markers.map((marker) => (
                <PhilippinesMapMobileItem
                  key={`${marker.id}-mobile`}
                  marker={marker}
                  isSelected={selectedArtwork?.id === marker.artwork.id}
                  onSelect={handleSelectMarker}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CalloutPlacement {
  side: "left" | "right";
  x: number;
  y: number;
  lineX: number;
  lineY: number;
}

const calloutPlacements: Record<string, CalloutPlacement> = {
  "pixel-across-borders": { side: "left", x: -8, y: 58, lineX: -5, lineY: 58 },
  "ang-these-pages-contain-a-universe": { side: "right", x: 108, y: 82, lineX: 105, lineY: 82 },
  "jadloc-tradition-to-vivid-identity": { side: "right", x: 108, y: 62, lineX: 105, lineY: 62 },
  "viloria-work-life-balance": { side: "left", x: -8, y: 34, lineX: -5, lineY: 34 },
  "local-mapa-sb19": { side: "right", x: 108, y: 22, lineX: 105, lineY: 22 },
  "local-sa-ugoy-ng-duyan": { side: "right", x: 108, y: 42, lineX: 105, lineY: 42 },
};

const fallbackPlacements: CalloutPlacement[] = [
  { side: "left", x: -8, y: 44, lineX: -5, lineY: 44 },
  { side: "right", x: 108, y: 44, lineX: 105, lineY: 44 },
  { side: "left", x: -8, y: 66, lineX: -5, lineY: 66 },
  { side: "right", x: 108, y: 66, lineX: 105, lineY: 66 },
];

const getCalloutPlacement = (markerId: string, index: number) =>
  calloutPlacements[markerId] ?? fallbackPlacements[index % fallbackPlacements.length];

interface PhilippinesMapCalloutProps {
  marker: LocalMapMarker;
  placement: CalloutPlacement;
  isSelected: boolean;
  onSelect: (marker: LocalMapMarker) => void;
}

const PhilippinesMapCallout = ({
  marker,
  placement,
  isSelected,
  onSelect,
}: PhilippinesMapCalloutProps) => {
  const categoryLabel = getLocalCategoryLabel(marker);
  const cityLabel = marker.artwork.location.city ?? marker.label;

  return (
    <button
      type="button"
      aria-label={`Open ${marker.artwork.title}`}
      onClick={() => onSelect(marker)}
      className={`local-map-callout is-${placement.side} ${isSelected ? "is-selected" : ""}`}
      style={
        {
          "--callout-x": `${placement.x}%`,
          "--callout-y": `${placement.y}%`,
          "--callout-accent": marker.color,
        } as CSSProperties
      }
    >
      <span className="local-map-callout-badge">{categoryLabel}</span>
      <span className="local-map-callout-title">{marker.artwork.title}</span>
      <span className="local-map-callout-meta">{marker.artwork.creator}</span>
      <span className="local-map-callout-place">{cityLabel}</span>
    </button>
  );
};

interface PhilippinesMapMobileItemProps {
  marker: LocalMapMarker;
  isSelected: boolean;
  onSelect: (marker: LocalMapMarker) => void;
}

const PhilippinesMapMobileItem = ({
  marker,
  isSelected,
  onSelect,
}: PhilippinesMapMobileItemProps) => (
  <button
    type="button"
    aria-label={`Open ${marker.artwork.title}`}
    onClick={() => onSelect(marker)}
    className={`local-map-mobile-card ${isSelected ? "is-selected" : ""}`}
    style={
      {
        "--callout-accent": marker.color,
      } as CSSProperties
    }
  >
    <span className="local-map-callout-badge">{getLocalCategoryLabel(marker)}</span>
    <span className="local-map-callout-title">{marker.artwork.title}</span>
    <span className="local-map-callout-meta">{marker.artwork.creator}</span>
    <span className="local-map-callout-place">{marker.artwork.location.city ?? marker.label}</span>
  </button>
);

const getLocalCategoryLabel = (marker: LocalMapMarker) =>
  marker.artwork.localCategory === "localArtist" ? "Local Artist Research" : "Group Members' Art";
