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
    artworkId: "diaspora-migration",
    title: "Diaspora (Migration)",
    artist: 'Antipas "Biboy" Delotavo',
    label: "Filipino Workers' Lives in Paintings by Antipas 'Biboy' Delotavo | Global Voices",
    type: "Article / Artwork Reference",
    url: "https://globalvoices.org/2015/05/01/filipino-workers-lives-in-paintings-by-antipas-biboy-delotavo/",
  },
  {
    artworkId: "forgotten-island",
    title: "Forgotten Island",
    artist: "Unknown",
    label: "Forgotten Island video",
    type: "Video Reference",
    url: "https://www.youtube.com/watch?v=f7mFVeWnVLw",
  },
  {
    artworkId: "ma-rosa",
    title: "Ma’ Rosa",
    artist: "Renato “Rens” E. Tuzon",
    label: "Ma’ Rosa artwork",
    type: "Artwork Reference",
    url: "https://www.youtube.com/watch?v=JGUogkI7n4k",
  },
  {
    artworkId: "baston-ni-kabunian",
    title: "Baston ni Kabunian, Bilang pero di Mabilang",
    artist: "Rodel Tapaya",
    label: "Baston ni Kabunian artwork",
    type: "Artwork Reference",
    url: "https://www.singaporeartmuseum.sg/art-events/exhibitions/signature-art-prize-2011",
  },
  {
    artworkId: "our-islands",
    title: "Our Islands 11°16'58.4\"N 123°45'07.0\"E",
    artist: "Anonymous",
    label: "Our Islands photograph",
    type: "Photography Reference",
    url: "http://arts.timessquarenyc.org/times-square-arts/projects/midnight-moment/our-islands/index.aspx",
  },
  {
    artworkId: "filipinas-in-hong-kong",
    title: "Filipinas in Hong Kong",
    artist: "Pacita Abad",
    label: "Filipinas in Hong Kong artwork",
    type: "Artwork Reference",
    url: "https://pacitaabad.com/artworks/categories/4/9233-filipinas-in-hong-kong-1995/",
  },
  {
    artworkId: "here-lies-love",
    title: "Here Lies Love",
    artist: "David Byrne and Fatboy Slim",
    label: "Here Lies Love reference",
    type: "Video Reference",
    url: "https://davidbyrne.com/explore/here-lies-love",
  },
];

export const findArtworkSource = (artworkId: string) =>
  artworkSources.find((source) => source.artworkId === artworkId);
