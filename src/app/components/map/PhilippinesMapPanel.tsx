import type { MouseEvent } from "react";
import type { LocalMapMarker } from "../../services/mapNavigationService";
import { PhilippinesMarker } from "./PhilippinesMarker";

interface PhilippinesMapPanelProps {
  markers: LocalMapMarker[];
  activeMarkerId: string | null;
  selectedArtworkId: string | null;
  onSelectMarker: (marker: LocalMapMarker) => void;
}

export const PhilippinesMapPanel = ({
  markers,
  activeMarkerId,
  selectedArtworkId,
  onSelectMarker,
}: PhilippinesMapPanelProps) => {
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

      return !nearest || distance < nearest.distance ? { marker, distance } : nearest;
    }, null);

    if (nearestMarker && nearestMarker.distance <= 24) {
      event.preventDefault();
      event.stopPropagation();
      onSelectMarker(nearestMarker.marker);
    }
  };

  return (
    <section className="local-map-card philippines-map-panel" aria-label="Philippines map markers">
      <div className="pointer-events-none absolute inset-0 pattern-surface opacity-10" />
      <div className="philippines-map-stage">
        <div className="philippines-map-frame">
          <div
            className="philippines-map-plot"
            onClickCapture={handleMapClickCapture}
          >
            <img
              src="/resources/philippines.svg"
              alt="Philippines map"
              className="philippines-map-image"
            />

            {markers.map((marker) => (
              <PhilippinesMarker
                key={marker.id}
                marker={marker}
                isSelected={selectedArtworkId === marker.artwork.id}
                isHighlighted={activeMarkerId === marker.id}
                onSelect={onSelectMarker}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
