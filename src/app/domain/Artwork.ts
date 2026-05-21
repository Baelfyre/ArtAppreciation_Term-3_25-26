import type { GlobeMode } from "./GlobeMode";
import type { Location } from "./Location";

export interface Artwork {
  id: string;
  scope: GlobeMode;
  title: string;
  creator: string;
  medium: string;
  imageUrl: string;
  transitionImageUrl?: string;
  location: Location;
  description: string;
  advocacyConnection: string;
  elements: string;
  principles: string;
  featured?: boolean;
  isPlaceholder?: boolean;
}
