import type { Artwork } from "../domain/Artwork";

export const localArtworks: Artwork[] = [
  {
    id: "pixel-across-borders",
    scope: "local",
    title: "Pixel Across Borders",
    creator: "James Lynelle Ongo",
    medium: "Excel-based digital pixel art",
    imageUrl: "/resources/Pixel Across Borders.jpeg",
    location: {
      label: "Bacolod City, Negros Occidental",
      city: "Bacolod City",
      province: "Negros Occidental",
      country: "Philippines",
      lat: 10.6765,
      lng: 122.9509,
      mapX: 62.5,
      mapY: 63,
    },
    description:
      "Pixel Across Borders represents Filipino identity connecting with the world through art, migration, and digital globalization.",
    advocacyConnection:
      "The artwork supports Filipino Identity Beyond Borders by showing how Filipino culture can be expressed through both traditional inspiration and modern digital tools.",
    elements:
      "The artwork uses strong colors, repeated square shapes, digital lines, and cultural patterns.",
    principles:
      "The design shows rhythm through repeated pixels, contrast between the warm Filipino cultural side and the blue global side, and unity because the small cells form one complete image.",
    featured: true,
  },
];
