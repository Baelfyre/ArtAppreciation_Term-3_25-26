import { useEffect, useRef, type CSSProperties } from "react";

interface ArtworkMediaEmbedProps {
  embedUrl?: string;
  title: string;
  provider?: string;
  embedHeight?: number;
  autoPlay?: boolean;
}

const withEmbedParams = (embedUrl: string, autoPlay?: boolean) => {
  if (!embedUrl.includes("youtube.com/embed/")) return embedUrl;

  const url = new URL(embedUrl);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("enablejsapi", "1");

  if (origin) {
    url.searchParams.set("origin", origin);
  }

  if (autoPlay) {
    url.searchParams.set("autoplay", "1");
  }

  return url.toString();
};

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
  embedHeight,
  autoPlay = false,
}: ArtworkMediaEmbedProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  const sendYouTubeCommand = (func: string, args: unknown[] = []) => {
    if (!iframeRef.current?.contentWindow) return;

    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "*",
    );
  };

  const applyYouTubeAudio = () => {
    sendYouTubeCommand("setVolume", [5]);
    sendYouTubeCommand("unMute");

    if (autoPlay) {
      sendYouTubeCommand("playVideo");
    }
  };

  useEffect(() => {
    if (!isYouTubeEmbed) return;

    const timerId = window.setTimeout(applyYouTubeAudio, 900);
    return () => window.clearTimeout(timerId);
  }, [autoPlay, isYouTubeEmbed, resolvedEmbedUrl]);

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
          onLoad={isYouTubeEmbed ? applyYouTubeAudio : undefined}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
};
