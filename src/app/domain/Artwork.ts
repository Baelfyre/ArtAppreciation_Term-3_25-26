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
  transitionImageUrl?: string;
  mediaProvider?: "youtube" | "spotify";
  mediaType?: "music";
  embedUrl?: string;
  embedHeight?: number;
  locationBasis?: string;
  location: Location;
  description: string;
  advocacyConnection: string;
  elements: string;
  principles: string;
  featured?: boolean;
  isPlaceholder?: boolean;
}
