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

  return (
    <div className="local-map-fade pointer-events-auto absolute inset-x-4 bottom-6 top-28 z-10 mx-auto flex max-w-[34rem] flex-col rounded-[1.75rem] border border-white/14 bg-[rgba(5,8,22,0.54)] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl md:top-32 md:p-5 lg:left-1/2 lg:right-auto lg:w-[34rem] lg:-translate-x-1/2">
      <div className="flag-accent absolute inset-x-0 top-0 h-px" />
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#f4c430]">Local map</p>
          <h3 className="section-title text-2xl font-semibold text-white">Philippines</h3>
        </div>
        <span className="glass-chip rounded-full px-3 py-1 text-xs text-slate-200">
          {markers.length} marker
        </span>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_50%_20%,rgba(244,196,48,0.08),transparent_34%),rgba(255,255,255,0.04)]">
        <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
        <div className="relative mx-auto aspect-[702/1209] h-full max-h-[620px] max-w-full">
          <img
            src="/resources/philippines.svg"
            alt="Philippines map"
            className="h-full w-full object-contain opacity-90 [filter:invert(94%)_sepia(13%)_saturate(620%)_hue-rotate(351deg)_brightness(103%)_contrast(94%)_drop-shadow(0_0_22px_rgba(244,196,48,0.18))]"
          />

          {markers.map((marker) => (
            <PhilippinesMarker
              key={marker.id}
              marker={marker}
              isSelected={selectedArtwork?.id === marker.artwork.id}
              onSelect={handleSelectMarker}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
