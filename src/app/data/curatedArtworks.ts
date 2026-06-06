import type { Artwork } from "../domain/Artwork";

export const curatedLocalArtworks: Artwork[] = [
  {
    id: "curation-babaye-sa-banwa",
    scope: "local",
    localCategory: "localArtist",
    title: "Babaye sa Banwa",
    creator: "Maestro Nunelucio Alvarado",
    medium: "Acrylic on Canvas",
    imageUrl: "/resources/Babaye Sa Banwa.jpg",
    altText:
      "Babaye sa Banwa by Maestro Nunelucio Alvarado, an acrylic painting with a stylized Visayan figure, bold colors, and geometric patterns.",
    effect: "brush-stroke",
    location: {
      label: "Sagay City, Negros Occidental",
      city: "Sagay City",
      province: "Negros Occidental",
      country: "Philippines",
      lat: 10.9,
      lng: 123.4167,
    },
    description:
      "Regional identity, Visayan working-class realities, and local stories meet a bold contemporary visual language.",
    advocacyConnection:
      "The work shows how regional stories can remain visible and expressive in contemporary Filipino art.",
    elements: "Bold color, geometric lines, textile-like patterns, and expressive eyes.",
    principles: "Balance and emphasis organize the shapes and focal points.",
  },
  {
    id: "curation-wayfarer",
    scope: "local",
    localCategory: "localArtist",
    title: "Wayfarer",
    creator: "Dary Feril",
    medium: "Mixed Media on Canvas",
    imageUrl: "/resources/Wayfarer.png",
    altText:
      "Wayfarer by Dary Feril, a mixed media artwork showing a child figure walking through a colorful forest-like setting.",
    effect: "slow-zoom",
    location: {
      label: "Bacolod City, Negros Occidental",
      city: "Bacolod City",
      province: "Negros Occidental",
      country: "Philippines",
      lat: 10.6778,
      lng: 122.9069,
    },
    description:
      "A personal journey is expressed through organic forms, regional roots, and a modern mixed-media approach.",
    advocacyConnection:
      "The work connects personal identity with a contemporary Filipino visual language.",
    elements: "Fine lines, soft color, organic patterns, and human forms.",
    principles: "Balance and unity connect the figure with the surrounding forms.",
  },
  {
    id: "curation-the-durian",
    scope: "local",
    localCategory: "localArtist",
    title: "The Durian",
    creator: "Kublai Millan",
    medium: "Public Sculpture",
    imageUrl: "/resources/The Durian.jpg",
    altText:
      "The Durian by Kublai Millan, a public sculpture shaped like a durian and decorated with figures representing cultural communities.",
    effect: "triangle-fusion",
    location: {
      label: "Davao",
      city: "Davao City",
      country: "Philippines",
      lat: 7.0656,
      lng: 125.5978,
    },
    description:
      "The public sculpture turns a familiar regional symbol into a statement about Mindanao identity, pride, and cultural diversity.",
    advocacyConnection:
      "The work shows how public art can become a visible symbol of place and community.",
    elements: "Scale, texture, sculptural form, and repeated figures.",
    principles: "Emphasis and unity reinforce its public presence.",
  },
  {
    id: "curation-mapa",
    scope: "local",
    localCategory: "localArtist",
    title: "MAPA",
    creator: "SB19",
    medium: "Music, Vocals, and Melody",
    imageUrl: "",
    altText:
      "Music visualization for MAPA by SB19, representing modern OPM and Filipino gratitude toward parents.",
    effect: "music-wave",
    location: {
      label: "Philippines / Modern OPM",
      country: "Philippines",
      lat: 14.5958,
      lng: 120.9772,
    },
    description:
      "Modern OPM carries Filipino love, gratitude, and respect for parents to audiences across digital platforms.",
    advocacyConnection:
      "The song shows how enduring family values continue through contemporary Filipino music.",
    elements: "Melody, harmony, rhythm, emotional tone, and vocal unity.",
    principles: "Emphasis and unity carry its family-centered message.",
  },
  {
    id: "curation-call-me-mother",
    scope: "local",
    localCategory: "localArtist",
    title: "Call Me Mother",
    creator: "Jun Robles Lana",
    medium: "Film / Comedy-Drama",
    imageUrl: "/resources/Call Me Mother.jpg",
    altText:
      "Poster for Call Me Mother, a Filipino film by Jun Robles Lana featuring family, care, and parenthood.",
    effect: "lively-poster",
    location: {
      label: "Philippine Cinema",
      country: "Philippines",
      lat: 14.5995,
      lng: 120.9842,
    },
    description:
      "The film explores modern family, chosen parenthood, queer adoptive care, love, and responsibility.",
    advocacyConnection:
      "The film expands how family and parenthood can be represented in Philippine cinema.",
    elements: "Performance, dialogue, humor, contrast, and visual storytelling.",
    principles: "Contrast and emotion support a unified view of modern family.",
  },
];

export const coffeeMakerArtwork: Artwork = {
  id: "curation-the-coffee-maker",
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
    "The Coffee Maker shows how a Filipino artist can use an everyday material, coffee, as a contemporary art medium in an international exhibition context.",
  advocacyConnection:
    "The work presents Filipino experimentation and material creativity in an international exhibit space.",
  elements: "Value, contrast, texture, balance, and emphasis.",
  principles: "Coffee tones and paper texture create contrast and a clear focal point.",
};
