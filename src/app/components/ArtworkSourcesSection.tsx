import { ExternalLink, Link2Off } from "lucide-react";
import { artworkSources } from "../data/artworkSources";

export const ArtworkSourcesSection = () => (
  <section id="sources" className="relative z-10 py-12 md:py-16">
    <div className="section-container">
      <div className="mb-7 max-w-[42rem]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4c430]">
          Reference Desk
        </p>
        <h2 className="section-title text-3xl font-semibold text-white">
          Artwork Credits and Sources
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          References used for artwork images, videos, exhibition context, and comparative research.
        </p>
      </div>

      <div className="source-card-grid">
        {artworkSources.map((source) => (
          <article key={source.artworkId} className="source-card">
            <div>
              <p className="source-type">{source.type}</p>
              <h3 className="section-title mt-2 text-lg font-semibold text-white">{source.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{source.artist}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{source.label}</p>
            </div>

            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
                aria-label={`View source for ${source.title} in a new tab`}
              >
                View Source
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="source-unverified">
                <Link2Off className="h-4 w-4" />
                URL needs verification.
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
