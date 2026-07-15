import { ExternalLink, Link2Off } from "lucide-react";
import { artworkSources } from "../data/artworkSources";

export const ArtworkSourcesSection = () => (
  <section id="sources" className="relative z-10 pb-12 pt-4 md:pb-16 md:pt-6">
    <div className="section-container">
      <div className="source-group-card">
        <div className="source-group-heading">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4c430]">
              Reference Desk
            </p>
            <h2 className="section-title text-2xl font-semibold text-white md:text-3xl">
              Artwork Credits and Sources
            </h2>
          </div>
          <p className="max-w-[30rem] text-xs leading-relaxed text-slate-400">
            Artwork, video, exhibition, and comparative research references.
          </p>
        </div>

        <div className="source-list" role="list">
        {artworkSources.map((source, sourceIndex) => (
          <div key={`${source.artworkId}-${sourceIndex}`} className="source-list-row" role="listitem">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">{source.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{source.artist}</p>
            </div>
            <p className="source-list-type">{source.type}</p>

            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link source-list-action"
                aria-label={`View source for ${source.title} in a new tab`}
              >
                View Source
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="source-unverified source-list-action">
                <Link2Off className="h-4 w-4" />
                URL needs verification.
              </p>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  </section>
);
