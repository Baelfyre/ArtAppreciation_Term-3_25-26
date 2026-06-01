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

const hasGlobeCoordinates = (artwork: Artwork) =>
  typeof artwork.location.lat === "number" && typeof artwork.location.lng === "number";

export const getArtworkMarkerColor = (artwork: Artwork, index = 0) => {
  if (artwork.scope === "group") return "#f4c430";
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
  return artworks
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
      altitude: selectedArtwork.scope === "group" ? 0.95 : 1.2,
    };
  }

  if (mode === "group" || mode === "local") {
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
