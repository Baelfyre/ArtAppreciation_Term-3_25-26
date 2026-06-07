import type { CSSProperties } from "react";

interface ArtworkMediaEmbedProps {
  embedUrl?: string;
  title: string;
  provider?: string;
  embedHeight?: number;
}

const MAPA_YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/DDyr3DbTPtk?start=61";

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
  embedHeight,
}: ArtworkMediaEmbedProps) => {
  if (!embedUrl) return null;

  const resolvedEmbedUrl = title === "MAPA" ? MAPA_YOUTUBE_EMBED_URL : embedUrl;
  const resolvedProvider = title === "MAPA" ? "youtube" : provider;
  const isSpotifyEmbed = resolvedProvider === "spotify" || resolvedEmbedUrl.includes("open.spotify.com/embed/");
  const frameClassName = isSpotifyEmbed ? "spotify-media-frame" : "aspect-video";
  const frameStyle = isSpotifyEmbed
    ? ({
        "--spotify-embed-height": `${embedHeight ?? 152}px`,
      } as CSSProperties)
    : undefined;
  const iframeAllow = isSpotifyEmbed
    ? "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  return (
    <div className="artwork-media-embed overflow-hidden rounded-[1.15rem]">
      <div className="mb-2 flex items-center justify-between gap-3 px-1 text-xs uppercase tracking-wider text-slate-400">
        <span>Playable media</span>
        {resolvedProvider && <span className="text-[#f4c430]">{resolvedProvider}</span>}
      </div>
      <div
        className={`${frameClassName} overflow-hidden rounded-[12px] border border-white/10 bg-black/25`}
        style={frameStyle}
      >
        <iframe
          src={resolvedEmbedUrl}
          title={`${title} playable media`}
          loading="lazy"
          allow={iframeAllow}
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
};
