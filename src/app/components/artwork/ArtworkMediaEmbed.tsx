import type { CSSProperties } from "react";

interface ArtworkMediaEmbedProps {
  embedUrl?: string;
  title: string;
  provider?: string;
  embedHeight?: number;
}

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
  embedHeight,
}: ArtworkMediaEmbedProps) => {
  if (!embedUrl) return null;

  const isSpotifyEmbed = provider === "spotify" || embedUrl.includes("open.spotify.com/embed/");
  const frameClassName = isSpotifyEmbed ? "spotify-media-frame" : "aspect-video";
  const frameStyle = isSpotifyEmbed
    ? ({
        "--spotify-embed-height": `${embedHeight ?? 352}px`,
      } as CSSProperties)
    : undefined;
  const iframeAllow = isSpotifyEmbed
    ? "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  return (
    <div className="artwork-media-embed overflow-hidden rounded-[1.15rem]">
      <div className="mb-2 flex items-center justify-between gap-3 px-1 text-xs uppercase tracking-wider text-slate-400">
        <span>Playable media</span>
        {provider && <span className="text-[#f4c430]">{provider}</span>}
      </div>
      <div
        className={`${frameClassName} overflow-hidden rounded-[12px] border border-white/10 bg-black/25`}
        style={frameStyle}
      >
        <iframe
          src={embedUrl}
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
