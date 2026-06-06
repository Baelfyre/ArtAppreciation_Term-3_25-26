export interface ArtworkSource {
  artworkId: string;
  title: string;
  artist: string;
  label: string;
  type: string;
  url?: string;
}

export const artworkSources: ArtworkSource[] = [
  {
    artworkId: "babaye-sa-banwa",
    title: "Babaye sa Banwa",
    artist: "Maestro Nunelucio Alvarado",
    label: "Nunelucio Alvarado and the courtship of 'Babaye' | Lifestyle.INQ",
    type: "Article / Artwork reference",
  },
  {
    artworkId: "wayfarer",
    title: "Wayfarer",
    artist: "Dary Feril",
    label: "Wayfarer - Orange Project",
    type: "Gallery / Artwork reference",
  },
  {
    artworkId: "the-durian",
    title: "The Durian",
    artist: "Kublai Millan",
    label: "Encyclopedia of Philippine Art, Cultural Center of the Philippines",
    type: "Artwork reference",
    url: "https://epa.culturalcenter.gov.ph/3/82/2173/",
  },
  {
    artworkId: "mapa",
    title: "MAPA",
    artist: "SB19",
    label: "MAPA official video/reference",
    type: "Video / Music reference",
    url: "https://www.youtube.com/watch?v=DDyr3DbTPtk",
  },
  {
    artworkId: "sa-ugoy-ng-duyan",
    title: "Sa Ugoy ng Duyan",
    artist: "Lucio San Pedro and Levi Celerio",
    label: "Sa Ugoy ng Duyan reference",
    type: "Comparative music reference",
    url: "https://www.youtube.com/watch?v=HOwOuk0ElqI",
  },
  {
    artworkId: "call-me-mother",
    title: "Call Me Mother",
    artist: "Jun Robles Lana",
    label: "Call Me Mother video/reference",
    type: "Film reference",
    url: "https://www.youtube.com/watch?v=cFZmGrP108E",
  },
  {
    artworkId: "the-coffee-maker",
    title: "The Coffee Maker",
    artist: 'Renato "Rens" E. Tuzon',
    label: "Coffee Table Art Book",
    type: "International exhibition / artwork reference",
    url: "https://www.coffeetableartbook.com/shopprints-HvJzJ/p/coffeemaker-by-renato-rens-e-tuzon",
  },
];

export const findArtworkSource = (artworkId: string) =>
  artworkSources.find((source) => source.artworkId === artworkId);
