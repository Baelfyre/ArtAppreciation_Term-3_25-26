import { useRef, useState, type CSSProperties } from "react";
import { VolumeX } from "lucide-react";

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
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${embedUrl}${separator}autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`;
};

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
  embedHeight,
  autoPlay = false,
}: ArtworkMediaEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  if (!embedUrl) return null;

  const resolvedEmbedUrl = withEmbedParams(embedUrl, autoPlay);
  const isSpotifyEmbed = provider === "spotify" || embedUrl.includes("open.spotify.com/embed/");
  const isYouTubeEmbed = embedUrl.includes("youtube.com/embed/");
  const frameClassName = isSpotifyEmbed ? "spotify-media-frame" : "aspect-video relative";
  const frameStyle = isSpotifyEmbed
    ? ({
        "--spotify-embed-height": `${embedHeight ?? 152}px`,
      } as CSSProperties)
    : undefined;
  const iframeAllow = isSpotifyEmbed
    ? "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

  const handleUnmute = () => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;
    setIsMuted(false);
    iframeRef.current.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    iframeRef.current.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[10]}', '*');
  };

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
          ref={iframeRef}
          src={resolvedEmbedUrl}
          title={`${title} playable media`}
          loading={autoPlay ? "eager" : "lazy"}
          allow={iframeAllow}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
        {isYouTubeEmbed && autoPlay && isMuted && (
          <button
            type="button"
            onClick={handleUnmute}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430]"
            aria-label="Unmute video"
          >
            <VolumeX className="h-3.5 w-3.5" />
            Unmute
          </button>
        )}
      </div>
    </div>
  );
};
