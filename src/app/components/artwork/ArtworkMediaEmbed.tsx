interface ArtworkMediaEmbedProps {
  embedUrl?: string;
  title: string;
  provider?: string;
}

export const ArtworkMediaEmbed = ({
  embedUrl,
  title,
  provider,
}: ArtworkMediaEmbedProps) => {
  if (!embedUrl) return null;

  return (
    <div className="artwork-media-embed glass-chip overflow-hidden rounded-[1.15rem] p-3">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs uppercase tracking-wider text-slate-400">
        <span>Playable media</span>
        {provider && <span className="text-[#f4c430]">{provider}</span>}
      </div>
      <div className="aspect-video overflow-hidden rounded-[0.95rem] border border-white/10 bg-black/25">
        <iframe
          src={embedUrl}
          title={`${title} playable media`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    </div>
  );
};
