import { useState, type CSSProperties } from "react";
import type { Artwork } from "../../domain/Artwork";
import {
  prepareLocalMapMarkers,
  type LocalMapMarker,
} from "../../services/mapNavigationService";
import { PhilippinesMapPanel } from "./PhilippinesMapPanel";

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

  return (
    <div className="local-map-panel local-map-fade curved-card-accent pointer-events-auto flex min-h-0 w-full max-w-[34rem] flex-1 flex-col overflow-hidden rounded-[1.25rem] border border-white/14 bg-[rgba(5,8,22,0.54)] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl md:rounded-[1.75rem] md:p-5 lg:max-w-[72rem]">
      <div className="philippines-map-header mb-3 md:mb-4">
        <div className="philippines-map-header-context">
          <p className="globe-local-status-label inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200 md:px-3 md:text-[11px] md:tracking-[0.22em]">
            Zooming Into the Philippines
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">Local Artist</p>
        </div>
        <div className="philippines-map-header-copy">
          <h3 className="section-title text-xl font-semibold text-white md:text-2xl">Philippines Map</h3>
          <p className="mt-1 text-xs leading-snug text-slate-300">
            Group artworks and local artists anchored to the Philippines.
          </p>
        </div>
        <span className="philippines-map-header-count glass-chip shrink-0 rounded-full px-2.5 py-1 text-[11px] text-slate-200 md:px-3 md:text-xs">
          {markers.length} {markers.length === 1 ? "marker" : "markers"}
        </span>
      </div>

      <div className="local-map-body relative min-h-0 flex-1 overflow-hidden">
        <div className="local-map-content philippines-map-layout relative grid h-full min-h-0 gap-3 overflow-hidden">
          <LocalArtworkList
            title="Group Artwork"
            markers={groupMemberMarkers}
            activeMarkerId={activeMarkerId}
            className="local-map-list-left"
            onSelect={handleSelectMarker}
            onIntent={handleMarkerIntent}
            onClearIntent={handleClearMarkerIntent}
          />

          <PhilippinesMapPanel
            markers={markers}
            activeMarkerId={activeMarkerId}
            selectedArtworkId={selectedArtwork?.id ?? null}
            onSelectMarker={handleSelectMarker}
          />

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
  <details className={`local-map-card local-map-side-list ${className}`} aria-label={title} open>
    <summary className="local-map-list-summary">
      <span className="local-map-list-heading">{title}</span>
      <span className="local-map-list-count">
        {markers.length} {markers.length === 1 ? "item" : "items"}
      </span>
    </summary>
    <div className="local-map-list-items grid gap-2">
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
  </details>
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
