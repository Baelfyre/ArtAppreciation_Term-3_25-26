export interface PresentationVideoConfig {
  id: string;
  label: string;
  title: string;
  src: string | null;
  volume: number;
  ariaLabel: string;
  placeholder?: boolean;
  placeholderLabel?: string;
}

export const globePresentationVideos = {
  intro: {
    id: "globe-intro",
    label: "Intro",
    title: "Intro presentation video",
    src: "/resources/International/Intro.mp4",
    volume: 1,
    ariaLabel: "Play intro video",
  },
  outro: {
    id: "globe-outro",
    label: "Outro",
    title: "Outro presentation video",
    src: "/resources/International/Outro.mp4",
    volume: 1,
    ariaLabel: "Play outro video",
  },
} satisfies Record<"intro" | "outro", PresentationVideoConfig>;

export const artworkPresentationVideos: Record<string, PresentationVideoConfig> = {
  "forgotten-island": {
    id: "artwork-forgotten-island",
    label: "Report clip",
    title: "Forgotten Island report video",
    src: "/resources/International/1-Forgotten-Island.mp4",
    volume: 1,
    ariaLabel: "Play artwork video for Forgotten Island",
  },
  "ma-rosa": {
    id: "artwork-ma-rosa",
    label: "Report clip",
    title: "Ma\u2019 Rosa report video",
    src: "/resources/International/2-MaRosa.mp4",
    volume: 1,
    ariaLabel: "Play artwork video for Ma\u2019 Rosa",
  },
  "baston-ni-kabunian": {
    id: "artwork-baston-ni-kabunian",
    label: "Video too large",
    title: "Baston ni Kabunian report video placeholder",
    src: null,
    volume: 1,
    ariaLabel: "Artwork video placeholder for Baston ni Kabunian",
    placeholder: true,
    placeholderLabel: "Video too large (>25MiB)",
  },
  "our-islands": {
    id: "artwork-our-islands",
    label: "Report clip",
    title: "Our Islands report video",
    src: "/resources/International/4-Our-Islands.mp4",
    volume: 1,
    ariaLabel: "Play artwork video for Our Islands",
  },
  "filipinas-in-hong-kong": {
    id: "artwork-filipinas-in-hong-kong",
    label: "Coming soon",
    title: "Filipinas in Hong Kong report video placeholder",
    src: null,
    volume: 1,
    ariaLabel: "Artwork video placeholder for Filipinas in Hong Kong",
    placeholder: true,
    placeholderLabel: "Coming soon",
  },
  "here-lies-love": {
    id: "artwork-here-lies-love",
    label: "Report clip",
    title: "Here Lies Love report video",
    src: "/resources/International/6-Here-Lies-Love.mp4",
    volume: 1,
    ariaLabel: "Play artwork video for Here Lies Love",
  },
};

export const getArtworkPresentationVideo = (artworkId: string) =>
  artworkPresentationVideos[artworkId] ?? null;
