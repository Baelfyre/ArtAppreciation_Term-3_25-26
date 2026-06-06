import { MapPin } from "lucide-react";
import { curatedLocalArtworks } from "../data/curatedArtworks";
import { ArtworkEffectImage } from "./artwork/ArtworkEffectImage";

export const LocalArtCurationSection = () => (
  <section id="local-curation" className="local-curation-section relative z-10 py-16 md:py-24">
    <div className="gallery-section">
      <div className="mb-9 max-w-[46rem] md:mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4c430]">
          Local Art Curation
        </p>
        <h2 className="section-title text-[clamp(2rem,7vw,3rem)] font-semibold leading-tight text-white">
          Filipino Art at This Day and Age
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-slate-300">
          This section presents the local Filipino artworks researched for the Milestone 2
          curation. It complements the group artwork collection without replacing it.
        </p>
      </div>

      <div className="local-curation-grid">
        {curatedLocalArtworks.map((artwork) => (
          <article key={artwork.id} className="local-curation-card group">
            <div className="local-curation-visual">
              <ArtworkEffectImage artwork={artwork} compact />
            </div>

            <div className="local-curation-copy">
              <p className="local-curation-medium">{artwork.medium}</p>
              <h3 className="section-title mt-2 text-2xl font-semibold text-white">
                {artwork.title}
              </h3>
              <p className="mt-1 text-sm text-slate-300">{artwork.creator}</p>
              <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#f4c430]" aria-hidden="true" />
                {artwork.location.label}
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-slate-300">
                {artwork.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
