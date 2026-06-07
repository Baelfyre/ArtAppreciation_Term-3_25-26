import { internationalArtworks } from "../data/internationalArtworks";
import { localArtworks } from "../data/localArtworks";
import type { Artwork } from "../domain/Artwork";
import type { GlobeMode } from "../domain/GlobeMode";
import type { Location } from "../domain/Location";

const artworks = [...localArtworks, ...internationalArtworks];

export const artworkRepository = {
  getAll(): Artwork[] {
    return artworks;
  },

  getFeatured(): Artwork[] {
    return artworks.filter((artwork) => artwork.featured);
  },

  getByMode(mode: GlobeMode): Artwork[] {
    return artworks.filter((artwork) => artwork.scope === mode);
  },

  findById(id: string): Artwork | undefined {
    return artworks.find((artwork) => artwork.id === id);
  },
};

export const formatArtworkLocation = (location: Location) => {
  if (location.city && location.province) {
    return `${location.city}, ${location.province}, ${location.country}`;
  }

  if (location.city) {
    return `${location.city}, ${location.country}`;
  }

  return location.label;
};

export const getArtworkCollectionLabel = (
  artwork: Pick<Artwork, "scope" | "isPlaceholder" | "localCategory">,
) => {
  if (artwork.scope === "local" && artwork.localCategory === "localArtist") {
    return "Local Artist";
  }

  if (artwork.scope === "local") return "Group Artwork";

  return artwork.isPlaceholder ? "International Art" : "Art Abroad";
};
