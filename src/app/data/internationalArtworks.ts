import type { Artwork } from "../domain/Artwork";

export const internationalArtworks: Artwork[] = [
  {
    id: "the-coffee-maker",
    scope: "international",
    title: "The Coffee Maker",
    creator: 'Renato "Rens" E. Tuzon',
    medium: "Coffee on Paper",
    imageUrl: "/resources/The Coffee Maker.png",
    altText:
      "The Coffee Maker by Renato Rens E. Tuzon, a coffee-on-paper artwork showing a man pouring coffee.",
    effect: "coffee-ripple",
    location: {
      label: "Coffee Table Art Book International Exhibition, New Jersey, USA",
      country: "United States",
      lat: 40.0583,
      lng: -74.4057,
    },
    locationBasis: "Featured in an International Exhibition",
    description:
      "A Filipino artist transforms an unconventional everyday material into art in an international exhibit context.",
    advocacyConnection:
      "Reserved for the International Gallery Direction as an example of Filipino art reaching an international exhibition space.",
    elements: "Value, contrast, texture, balance, and emphasis.",
    principles: "Coffee tones and paper texture create contrast, balance, and a clear focal point.",
  },
];
