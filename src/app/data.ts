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
  isPlaceholder?: boolean;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "intl-new-york-placeholder",
    name: "New York, United States",
    category: "International",
    origin: "Philippines",
    location: "New York, USA",
    institution: "Pseudo global marker",
    description: "Pseudo location marker.",
    significance: "",
    lat: 40.7128,
    lng: -74.0060,
    imageUrl: "",
    featured: true,
    isPlaceholder: true
  },
  {
    id: "intl-madrid-placeholder",
    name: "Madrid, Spain",
    category: "International",
    origin: "Philippines",
    location: "Madrid, Spain",
    institution: "Pseudo global marker",
    description: "Pseudo location marker.",
    significance: "",
    lat: 40.4168,
    lng: -3.7038,
    imageUrl: "",
    featured: true,
    isPlaceholder: true
  },
  {
    id: "intl-london-placeholder",
    name: "London, United Kingdom",
    category: "International",
    origin: "Philippines",
    location: "London, UK",
    institution: "Pseudo global marker",
    description: "Pseudo location marker.",
    significance: "",
    lat: 51.5074,
    lng: -0.1278,
    imageUrl: "",
    featured: true,
    isPlaceholder: true
  },
  {
    id: "intl-tokyo-placeholder",
    name: "Tokyo, Japan",
    category: "International",
    origin: "Philippines",
    location: "Tokyo, Japan",
    institution: "Pseudo global marker",
    description: "Pseudo location marker.",
    significance: "",
    lat: 35.6762,
    lng: 139.6503,
    imageUrl: "",
    featured: true,
    isPlaceholder: true
  }
];

export const CATEGORIES = ["All", "International", "Contemporary"];
