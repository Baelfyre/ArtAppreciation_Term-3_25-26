import type { GlobeMode } from "./GlobeMode";
import type { Location } from "./Location";

export interface Artwork {
  id: string;
  scope: GlobeMode;
  localCategory?: "groupMember" | "localArtist";
  markerType?: "groupMember" | "localArtist" | "toVerify";
  markerColor?: "yellow" | "blue" | "red";
  title: string;
  creator: string;
  medium: string;
  imageUrl: string;
  altText?: string;
  effect?:
    | "brush-stroke"
    | "slow-zoom"
    | "triangle-fusion"
    | "music-wave"
    | "lively-poster"
    | "coffee-ripple";
  transitionImageUrl?: string;
  mediaProvider?: "youtube" | "spotify";
  mediaType?: "music";
  embedUrl?: string;
  embedHeight?: number;
  comparisonGroupId?: string;
  comparisonRole?: "traditional" | "contemporary";
  comparisonLabel?: "Then" | "Now";
  pairedArtworkId?: string;
  locationBasis?: string;
  location: Location;
  description: string;
  advocacyConnection: string;
  elements: string;
  principles: string;
  featured?: boolean;
  isPlaceholder?: boolean;
}
