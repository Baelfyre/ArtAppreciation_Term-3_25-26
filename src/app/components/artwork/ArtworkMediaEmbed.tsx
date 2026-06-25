import type { CSSProperties } from "react";

interface ArtworkMediaEmbedProps {
  embedUrl?: string;
  title: string;
  provider?: string;
  embedHeight?: number;
  autoPlay?: boolean;
}

const withEmbedParams = (embedUrl: string, autoPlay?: boolean) => {
  if (!autoPlay || !embedUrl.includes("youtube.com/embed/")) return embedUrl;

  const separator = embedUrl.includes("?") ? "&" : "?";
  return `${embedUrl}${separator}autoplay=1&mute=1&playsinline=1&rel=0`;
};

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
  embedHeight,
  autoPlay = false,
}: ArtworkMediaEmbedProps) => {
  if (!embedUrl) return null;

  const resolvedEmbedUrl = withEmbedParams(embedUrl, autoPlay);
  const isSpotifyEmbed = provider === "spotify" || embedUrl.includes("open.spotify.com/embed/");
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
    <div className="artwork-media-embed w-full overflow-hidden rounded-[1.15rem]">
      <div className="mb-2 flex items-center justify-between gap-3 px-1 text-xs uppercase tracking-wider text-slate-400">
        <span>Playable media</span>
        {provider && <span className="text-[#f4c430]">{provider}</span>}
      </div>
      <div
        className={`${frameClassName} overflow-hidden rounded-[12px] border border-white/10 bg-black/25`}
        style={frameStyle}
      >
        <iframe
          src={resolvedEmbedUrl}
          title={`${title} playable media`}
          loading={autoPlay ? "eager" : "lazy"}
          allow={iframeAllow}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
};
