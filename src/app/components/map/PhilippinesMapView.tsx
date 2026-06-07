import { useState, type CSSProperties, type MouseEvent } from "react";
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
  const [highlightedMarkerId, setHighlightedMarkerId] = useState<string | null>(null);
  const activeMarkerId = highlightedMarkerId ?? selectedArtwork?.id ?? null;
  const groupMemberMarkers = markers.filter((marker) => marker.artwork.localCategory !== "localArtist");
  const localArtistMarkers = markers.filter((marker) => marker.artwork.localCategory === "localArtist");

  const handleSelectMarker = (marker: LocalMapMarker) => {
    setHighlightedMarkerId(marker.id);
    onSelectArtwork(marker.artwork);
  };

  const handleMarkerIntent = (marker: LocalMapMarker) => {
    setHighlightedMarkerId(marker.id);
  };

  const handleClearMarkerIntent = (marker: LocalMapMarker) => {
    setHighlightedMarkerId((currentMarkerId) =>
      currentMarkerId === marker.id ? null : currentMarkerId,
    );
  };

  const handleMapClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest(".local-map-marker")) return;

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
      handleSelectMarker(nearestMarker.marker);
    }
  };

  return (
    <div className="local-map-panel local-map-fade curved-card-accent pointer-events-auto flex min-h-0 w-full max-w-[34rem] flex-1 flex-col overflow-hidden rounded-[1.25rem] border border-white/14 bg-[rgba(5,8,22,0.54)] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl md:rounded-[1.75rem] md:p-5 lg:max-w-[72rem]">
      <div className="mb-3 flex items-start justify-between gap-3 md:mb-4 md:gap-4">
        <div>
          <p className="globe-local-status-label mb-2 inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200 md:px-3 md:text-[11px] md:tracking-[0.22em]">
            Zooming Into the Philippines
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Local Artist</p>
          <h3 className="section-title text-xl font-semibold text-white md:text-2xl">Philippines Map</h3>
          <p className="mt-1 max-w-[18rem] text-xs leading-snug text-slate-300">
            Group artworks and local artists anchored to the Philippines.
          </p>
        </div>
        <span className="glass-chip shrink-0 rounded-full px-2.5 py-1 text-[11px] text-slate-200 md:px-3 md:text-xs">
          {markers.length} {markers.length === 1 ? "marker" : "markers"}
        </span>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2 text-[10px] leading-tight text-slate-200 md:mb-4 md:text-xs">
        <span className="glass-chip flex items-center gap-2 rounded-full px-2.5 py-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#f4c430]" />
          Group Artwork
        </span>
        <span className="glass-chip flex items-center gap-2 rounded-full px-2.5 py-1.5">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#86a7ff]" />
          Local Artist
        </span>
      </div>

      <div className="local-map-body relative min-h-0 flex-1 overflow-hidden rounded-[1rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)] md:rounded-[1.25rem]">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
        <div className="local-map-content relative grid h-full min-h-0 gap-3 overflow-hidden p-2 md:p-3">
          <LocalArtworkList
            title="Group Artwork"
            markers={groupMemberMarkers}
            activeMarkerId={activeMarkerId}
            className="local-map-list-left"
            onSelect={handleSelectMarker}
            onIntent={handleMarkerIntent}
            onClearIntent={handleClearMarkerIntent}
          />

          <div className="local-map-stage relative min-h-0 overflow-hidden rounded-[0.875rem]">
            <div
              className="local-map-zoom-stage relative mx-auto aspect-[702/1209] overflow-hidden"
              onClickCapture={handleMapClickCapture}
            >
              <img
                src="/resources/philippines.svg"
                alt="Philippines map"
                className="block h-full w-full max-h-full max-w-full object-contain object-center opacity-90 [filter:invert(94%)_sepia(13%)_saturate(620%)_hue-rotate(351deg)_brightness(103%)_contrast(94%)_drop-shadow(0_0_22px_rgba(244,196,48,0.18))]"
              />

              {markers.map((marker) => (
                <PhilippinesMarker
                  key={marker.id}
                  marker={marker}
                  isSelected={selectedArtwork?.id === marker.artwork.id}
                  isHighlighted={activeMarkerId === marker.id}
                  onSelect={handleSelectMarker}
                />
              ))}
            </div>
          </div>

          <LocalArtworkList
            title="Local Artist"
            markers={localArtistMarkers}
            activeMarkerId={activeMarkerId}
            className="local-map-list-right"
            onSelect={handleSelectMarker}
            onIntent={handleMarkerIntent}
            onClearIntent={handleClearMarkerIntent}
          />
        </div>
      </div>
    </div>
  );
};

interface LocalArtworkListProps {
  title: string;
  markers: LocalMapMarker[];
  activeMarkerId: string | null;
  className?: string;
  onSelect: (marker: LocalMapMarker) => void;
  onIntent: (marker: LocalMapMarker) => void;
  onClearIntent: (marker: LocalMapMarker) => void;
}

const LocalArtworkList = ({
  title,
  markers,
  activeMarkerId,
  className = "",
  onSelect,
  onIntent,
  onClearIntent,
}: LocalArtworkListProps) => (
  <section className={`local-map-side-list ${className}`} aria-label={title}>
    <p className="local-map-list-heading">{title}</p>
    <div className="grid gap-2">
      {markers.map((marker) => (
        <LocalArtworkListItem
          key={`${marker.id}-list`}
          marker={marker}
          isActive={activeMarkerId === marker.id}
          onSelect={onSelect}
          onIntent={onIntent}
          onClearIntent={onClearIntent}
        />
      ))}
    </div>
  </section>
);

interface LocalArtworkListItemProps {
  marker: LocalMapMarker;
  isActive: boolean;
  onSelect: (marker: LocalMapMarker) => void;
  onIntent: (marker: LocalMapMarker) => void;
  onClearIntent: (marker: LocalMapMarker) => void;
}

const LocalArtworkListItem = ({
  marker,
  isActive,
  onSelect,
  onIntent,
  onClearIntent,
}: LocalArtworkListItemProps) => (
  <button
    type="button"
    aria-label={`Open ${marker.artwork.title} at ${marker.artwork.location.city ?? marker.label}`}
    onMouseEnter={() => onIntent(marker)}
    onMouseLeave={() => onClearIntent(marker)}
    onPointerEnter={() => onIntent(marker)}
    onPointerLeave={() => onClearIntent(marker)}
    onFocus={() => onIntent(marker)}
    onFocusCapture={() => onIntent(marker)}
    onBlur={() => onClearIntent(marker)}
    onBlurCapture={() => onClearIntent(marker)}
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onSelect(marker);
    }}
    className={`local-map-list-row ${isActive ? "is-active" : ""}`}
    style={
      {
        "--list-accent": marker.color,
      } as CSSProperties
    }
  >
    <span className="local-map-list-dot" aria-hidden="true" />
    <span className="min-w-0">
      <span className="local-map-list-title">{marker.artwork.title}</span>
      <span className="local-map-list-meta">{marker.artwork.creator}</span>
      <span className="local-map-list-place">{marker.artwork.location.city ?? marker.label}</span>
    </span>
  </button>
);
