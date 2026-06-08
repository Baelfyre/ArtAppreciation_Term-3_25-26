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
    type: "Article / Artwork Reference",
    url: "https://lifestyle.inquirer.net/131247/nunelucio-alvarado-and-the-courtship-of-babaye/",
  },
  {
    artworkId: "wayfarer",
    title: "Wayfarer",
    artist: "Dary Feril",
    label: "Wayfarer - Orange Project",
    type: "Gallery / Artwork Reference",
    url: "https://orangeproject.ph/wayfarer/",
  },
  {
    artworkId: "the-durian",
    title: "The Durian",
    artist: "Kublai Millan",
    label: "Encyclopedia of Philippine Art, Cultural Center of the Philippines",
    type: "CCP Encyclopedia of Philippine Art",
    url: "https://epa.culturalcenter.gov.ph/3/82/2173/",
  },
  {
    artworkId: "mapa",
    title: "MAPA",
    artist: "SB19",
    label: "MAPA official video/reference",
    type: "Music / Video Reference",
    url: "https://www.youtube.com/watch?v=DDyr3DbTPtk",
  },
  {
    artworkId: "sa-ugoy-ng-duyan",
    title: "Sa Ugoy ng Duyan",
    artist: "Lucio San Pedro and Levi Celerio",
    label: "Sa Ugoy ng Duyan reference",
    type: "Comparative Music Reference",
    url: "https://www.youtube.com/watch?v=HOwOuk0ElqI",
  },
  {
    artworkId: "call-me-mother",
    title: "Call Me Mother",
    artist: "Jun Robles Lana",
    label: "Call Me Mother video/reference",
    type: "Film Reference",
    url: "https://www.youtube.com/watch?v=cFZmGrP108E",
  },
  {
    artworkId: "the-coffee-maker",
    title: "The Coffee Maker",
    artist: 'Renato "Rens" E. Tuzon',
    label: "Coffee Table Art Book",
    type: "International Exhibition Reference",
    url: "https://www.coffeetableartbook.com/shopprints-HvJzJ/p/coffeemaker-by-renato-rens-e-tuzon",
  },
  {
    artworkId: "diaspora-migration",
    title: "Diaspora (Migration)",
    artist: 'Antipas "Biboy" Delotavo',
    label: "Filipino Workers' Lives in Paintings by Antipas 'Biboy' Delotavo | Global Voices",
    type: "Article / Artwork Reference",
    url: "https://globalvoices.org/2015/05/01/filipino-workers-lives-in-paintings-by-antipas-biboy-delotavo/",
  },
];

export const findArtworkSource = (artworkId: string) =>
  artworkSources.find((source) => source.artworkId === artworkId);
