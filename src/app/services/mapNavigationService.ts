import type { Artwork } from "../domain/Artwork";
import type { GlobeMode } from "../domain/GlobeMode";

export const PHILIPPINES_ORIGIN = {
  lat: 12.8797,
  lng: 121.774,
  label: "Philippines",
};

export interface GlobePointOfView {
  lat: number;
  lng: number;
  altitude: number;
}

export interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
  artwork: Artwork;
}

export interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  color: string;
  size: number;
  isOrigin: boolean;
  isSelected: boolean;
  artwork: Artwork | null;
}

export interface LocalMapMarker {
  id: string;
  label: string;
  mapX: number;
  mapY: number;
  displayMapX: number;
  displayMapY: number;
  artwork: Artwork;
}

const markerColors = ["#f4c430", "#86a7ff", "#b9162c", "#f6f4ee"];
const localMarkerCollisionDistance = 6;
const localMarkerOffsetX = 3.8;
const localMarkerOffsetY = 2.8;

const clampMapPercent = (value: number) => Math.min(96, Math.max(4, value));

const hasGlobeCoordinates = (artwork: Artwork) =>
  typeof artwork.location.lat === "number" && typeof artwork.location.lng === "number";

export const getArtworkMarkerColor = (artwork: Artwork, index = 0) => {
  if (artwork.scope === "local") return "#f4c430";
  return markerColors[index % markerColors.length];
};

export const prepareInternationalGlobeMarkers = (
  artworks: Artwork[],
  selectedArtwork: Artwork | null,
): GlobeMarker[] => {
  const markers = artworks.filter(hasGlobeCoordinates).map((artwork, index) => {
    const isSelected = selectedArtwork?.id === artwork.id;

    return {
      id: artwork.id,
      lat: artwork.location.lat as number,
      lng: artwork.location.lng as number,
      label: artwork.location.label,
      color: isSelected ? "#f4c430" : getArtworkMarkerColor(artwork, index),
      size: isSelected ? 1.4 : 1,
      isOrigin: false,
      isSelected,
      artwork,
    };
  });

  return [
    ...markers,
    {
      id: "philippines-origin",
      lat: PHILIPPINES_ORIGIN.lat,
      lng: PHILIPPINES_ORIGIN.lng,
      label: PHILIPPINES_ORIGIN.label,
      color: "#f59e0b",
      size: 1.2,
      isOrigin: true,
      isSelected: false,
      artwork: null,
    },
  ];
};

export const prepareInternationalConnectionArcs = (artworks: Artwork[]): GlobeArc[] =>
  artworks.filter(hasGlobeCoordinates).map((artwork, index) => ({
    startLat: PHILIPPINES_ORIGIN.lat,
    startLng: PHILIPPINES_ORIGIN.lng,
    endLat: artwork.location.lat as number,
    endLng: artwork.location.lng as number,
    color: [getArtworkMarkerColor(artwork, index), "#f4c430"],
    artwork,
  }));

export const prepareLocalMapMarkers = (artworks: Artwork[]): LocalMapMarker[] => {
  const markers = artworks
    .filter(
      (artwork) =>
        typeof artwork.location.mapX === "number" && typeof artwork.location.mapY === "number",
    )
    .map((artwork) => ({
      id: artwork.id,
      label: artwork.location.label,
      mapX: artwork.location.mapX as number,
      mapY: artwork.location.mapY as number,
      displayMapX: artwork.location.mapX as number,
      displayMapY: artwork.location.mapY as number,
      artwork,
    }));

  return markers.map((marker) => {
    const nearbyMarkers = markers.filter(
      (other) =>
        other.id !== marker.id &&
        Math.hypot(marker.mapX - other.mapX, marker.mapY - other.mapY) <
          localMarkerCollisionDistance,
    );

    if (nearbyMarkers.length === 0) return marker;

    const cluster = [marker, ...nearbyMarkers];
    const centerX = cluster.reduce((sum, item) => sum + item.mapX, 0) / cluster.length;
    const centerY = cluster.reduce((sum, item) => sum + item.mapY, 0) / cluster.length;

    return {
      ...marker,
      displayMapX: clampMapPercent(
        marker.mapX + (marker.mapX >= centerX ? localMarkerOffsetX : -localMarkerOffsetX),
      ),
      displayMapY: clampMapPercent(
        marker.mapY + (marker.mapY >= centerY ? localMarkerOffsetY : -localMarkerOffsetY),
      ),
    };
  });
};

export const getGlobePointOfView = (
  mode: GlobeMode,
  selectedArtwork: Artwork | null,
): GlobePointOfView => {
  if (
    typeof selectedArtwork?.location.lat === "number" &&
    typeof selectedArtwork.location.lng === "number"
  ) {
    return {
      lat: selectedArtwork.location.lat,
      lng: selectedArtwork.location.lng,
      altitude: selectedArtwork.scope === "local" ? 0.95 : 1.2,
    };
  }

  if (mode === "local") {
    return {
      lat: PHILIPPINES_ORIGIN.lat,
      lng: PHILIPPINES_ORIGIN.lng,
      altitude: 0.85,
    };
  }

  return {
    lat: 20,
    lng: 90,
    altitude: 2,
  };
};
