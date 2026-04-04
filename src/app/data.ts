export const PH_COORDS = { lat: 12.8797, lng: 121.7740, label: "Philippines" };

export interface Artifact {
  id: string;
  name: string;
  category: string;
  origin: string;
  location: string;
  institution: string;
  description: string;
  significance: string;
  lat: number;
  lng: number;
  imageUrl: string;
  featured?: boolean;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "surigao-gold",
    name: "Surigao Gold Treasures",
    category: "Historical",
    origin: "Surigao, Philippines",
    location: "New York, USA",
    institution: "Metropolitan Museum of Art",
    description: "An extraordinary collection of pre-colonial gold objects, including ceremonial masks, jewelry, and ritual vessels.",
    significance: "Demonstrates the advanced metallurgical skills and complex social hierarchy of pre-colonial Philippine societies.",
    lat: 40.7128,
    lng: -74.0060,
    imageUrl: "https://images.unsplash.com/photo-1561584485-9a0d05fc8194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxpcGlubyUyMG11c2V1bSUyMGFydGlmYWN0JTIwZ29sZHxlbnwxfHx8fDE3NzUzMDM0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  },
  {
    id: "santo-nino",
    name: "Antique Santo Niño",
    category: "Religious",
    origin: "Cebu, Philippines",
    location: "Madrid, Spain",
    institution: "Museo Nacional de Antropología",
    description: "A meticulously carved wooden figure of the Child Jesus, adorned with intricate vestments and gold detailing.",
    significance: "Represents the deep syncretism of Spanish Catholicism and local Filipino animist traditions.",
    lat: 40.4168,
    lng: -3.7038,
    imageUrl: "https://images.unsplash.com/photo-1771442582562-e7843c4871db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHJlbGlnaW91cyUyMHNjdWxwdHVyZSUyMGZpZ3VyZXxlbnwxfHx8fDE3NzUzMDM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  },
  {
    id: "bontoc-textile",
    name: "Ceremonial Ikat Blanket",
    category: "Indigenous",
    origin: "Cordillera, Philippines",
    location: "London, UK",
    institution: "British Museum",
    description: "A vibrant, handwoven textile featuring geometric patterns created using the traditional warp-ikat dyeing technique.",
    significance: "Showcases the enduring weaving traditions of the Igorot people and their cultural narratives woven into the fabric.",
    lat: 51.5074,
    lng: -0.1278,
    imageUrl: "https://images.unsplash.com/photo-1599302994569-6fd86e9529e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwdGV4dGlsZSUyMHdlYXZpbmclMjBwaGlsaXBwaW5lc3xlbnwxfHx8fDE3NzUzMDM0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  },
  {
    id: "murillo-velarde",
    name: "Murillo Velarde Map",
    category: "Art",
    origin: "Manila, Philippines",
    location: "Tokyo, Japan",
    institution: "Tokyo National Museum",
    description: "An early, incredibly detailed hydrographical and chorographical map of the Philippine archipelago from 1734.",
    significance: "Often called the 'Mother of all Philippine Maps,' it is crucial for establishing the historical territorial extent of the Philippines.",
    lat: 35.6762,
    lng: 139.6503,
    imageUrl: "https://images.unsplash.com/photo-1706448561051-9b91fc91fe64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBoaXN0b3JpY2FsJTIwYW50aXF1ZSUyMG1hcCUyMGJvb2t8ZW58MXx8fHwxNzc1MzAzNDY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  }
];

export const CATEGORIES = ["All", "Art", "Religious", "Indigenous", "Historical", "Contemporary"];
