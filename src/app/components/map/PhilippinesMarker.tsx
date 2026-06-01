import type { LocalMapMarker } from "../../services/mapNavigationService";

interface PhilippinesMarkerProps {
  marker: LocalMapMarker;
  isSelected: boolean;
  onSelect: (marker: LocalMapMarker) => void;
}

export const PhilippinesMarker = ({ marker, isSelected, onSelect }: PhilippinesMarkerProps) => {
  const displayLabel = marker.artwork.location.city ?? marker.label;

  return (
    <button
      type="button"
      aria-label={`Open ${marker.artwork.title}`}
      title={marker.label}
      onClick={() => onSelect(marker)}
      className={`local-map-marker absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full ${
        isSelected ? "is-selected" : ""
      }`}
      style={{ left: `${marker.displayMapX}%`, top: `${marker.displayMapY}%` }}
    >
      <span className="local-map-marker-dot" />
      <span className="local-map-marker-label">{displayLabel}</span>
    </button>
  );
};
