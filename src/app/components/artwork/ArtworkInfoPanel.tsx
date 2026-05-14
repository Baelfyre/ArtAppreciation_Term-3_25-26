import { Brush, Globe2, MapPin, Sparkles, User, X, type LucideIcon } from "lucide-react";
import type { Artwork } from "../../domain/Artwork";
import { formatArtworkLocation } from "../../services/artworkRepository";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ArtworkInfoPanelProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkInfoPanel = ({ artwork, onClose }: ArtworkInfoPanelProps) => {
  if (!artwork) return null;

  return (
    <aside className="artwork-panel-slide glass-panel-strong absolute right-4 top-4 z-30 w-[min(26rem,calc(100%-2rem))] max-h-[calc(100%-32px)] overflow-y-auto rounded-[1.5rem] shadow-2xl custom-scrollbar md:right-6 md:top-6 md:max-h-[calc(100%-48px)]">
      <div className="flag-accent absolute inset-x-0 top-0 z-30 h-px" />

      <div className="relative h-56 w-full overflow-hidden rounded-t-[1.5rem] border-b border-white/10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artwork panel"
          className="glass-chip absolute right-4 top-4 z-20 rounded-full p-2 text-white transition-colors hover:bg-black/[0.35]"
        >
          <X className="h-4 w-4" />
        </button>
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,22,0.08),rgba(5,8,22,0.74))]" />
        <div className="absolute bottom-4 left-4">
          <span className="glass-chip-warm rounded-full px-3 py-1 text-xs font-medium capitalize text-white">
            {artwork.scope}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h2 className="section-title mb-4 text-2xl font-medium leading-tight text-white">
          {artwork.title}
        </h2>

        <div className="mb-6 grid gap-3">
          <InfoRow icon={User} label="Creator" value={artwork.creator} />
          <InfoRow icon={MapPin} label="Location" value={formatArtworkLocation(artwork.location)} />
          <InfoRow icon={Brush} label="Medium" value={artwork.medium} />
        </div>

        <div className="space-y-4">
          <InfoBlock label="Description" value={artwork.description} />
          <InfoBlock label="Advocacy Connection" value={artwork.advocacyConnection} icon={Globe2} />
          <InfoBlock label="Elements" value={artwork.elements} icon={Sparkles} />
          <InfoBlock label="Principles" value={artwork.principles} />
        </div>
      </div>
    </aside>
  );
};

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const InfoRow = ({ icon: Icon, label, value }: InfoRowProps) => (
  <div className="glass-chip flex items-start gap-3 rounded-[1.15rem] p-4 text-sm">
    <div className="glass-chip-warm mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
      <Icon className="h-4 w-4 text-[#f4c430]" />
    </div>
    <div>
      <p className="mb-0.5 text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-slate-200">{value}</p>
    </div>
  </div>
);

interface InfoBlockProps {
  label: string;
  value: string;
  icon?: LucideIcon;
}

const InfoBlock = ({ label, value, icon: Icon }: InfoBlockProps) => (
  <div className="glass-chip rounded-[1.15rem] p-4">
    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400">
      {Icon && <Icon className="h-3.5 w-3.5 text-[#f4c430]" />}
      <span>{label}</span>
    </div>
    <p className="text-sm font-light leading-relaxed text-slate-300">{value}</p>
  </div>
);
