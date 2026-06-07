import type { CSSProperties } from "react";
import type { LocalMapMarker } from "../../services/mapNavigationService";

interface PhilippinesMarkerProps {
  marker: LocalMapMarker;
  isSelected: boolean;
  isHighlighted?: boolean;
  onSelect: (marker: LocalMapMarker) => void;
}

const getLabelAlignmentClass = (marker: LocalMapMarker) => {
  if (marker.displayMapX >= 72) return "local-map-marker--label-left";
  if (marker.displayMapX <= 28) return "local-map-marker--label-right";
  return "";
};

export const PhilippinesMarker = ({
  marker,
  isSelected,
  isHighlighted = false,
  onSelect,
}: PhilippinesMarkerProps) => {
  const displayLabel = marker.artwork.location.city ?? marker.label;
  const labelAlignmentClass = getLabelAlignmentClass(marker);

  return (
    <button
      type="button"
      aria-label={`Open ${marker.artwork.title}`}
      title={marker.label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onSelect(marker);
      }}
      className={`local-map-marker absolute z-20 -translate-x-1/2 -translate-y-full ${
        isSelected ? "is-selected" : ""
      } ${isHighlighted ? "is-highlighted" : ""} ${labelAlignmentClass}`}
      style={{
        left: `${marker.displayMapX}%`,
        top: `${marker.displayMapY}%`,
        "--local-marker-color": marker.color,
      } as CSSProperties}
    >
      <span className="local-map-marker-icon" aria-hidden="true" />
      <span className="local-map-marker-label">{displayLabel}</span>
    </button>
  );
};
