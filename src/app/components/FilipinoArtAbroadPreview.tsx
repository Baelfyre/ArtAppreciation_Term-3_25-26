import { Globe2 } from "lucide-react";
import type { Artwork } from "../domain/Artwork";
import { ArtworkEffectImage } from "./artwork/ArtworkEffectImage";

interface FilipinoArtAbroadPreviewProps {
  artwork: Artwork;
}

export const FilipinoArtAbroadPreview = ({ artwork }: FilipinoArtAbroadPreviewProps) => (
  <section id="filipino-art-abroad" className="relative z-10 py-12 md:py-16">
    <div className="gallery-section">
      <div className="mb-7 max-w-[40rem] md:mb-9">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4c430]">
          International Exhibit Feature
        </p>
        <h2 className="section-title text-[clamp(2rem,7vw,3rem)] font-semibold leading-tight text-white">
          Filipino Art Abroad
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-slate-300">
          Filipino creativity reaches international exhibit spaces through distinctive materials
          and contemporary practice.
        </p>
      </div>

      <div className="art-abroad-preview overflow-hidden rounded-[1.5rem]">
        <div className="art-abroad-effect-frame">
          <ArtworkEffectImage artwork={artwork} compact variant="detailView" />
          <span className="international-preview-badge">
            <Globe2 className="h-4 w-4" />
            International Exhibit Preview
          </span>
        </div>

        <div className="international-wall-label">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#f4c430]">
            Featured in an International Exhibition
          </p>
          <h2 className="section-title mt-2 text-3xl font-semibold text-white">
            {artwork.title}
          </h2>
          <p className="mt-1 text-sm text-slate-300">{artwork.creator}</p>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="museum-label-heading">Medium</dt>
              <dd className="mt-1 text-slate-200">{artwork.medium}</dd>
            </div>
            <div>
              <dt className="museum-label-heading">Context</dt>
              <dd className="mt-1 text-slate-200">
                {artwork.location.label}
              </dd>
            </div>
          </dl>

          <p className="mt-4 max-w-[36rem] text-sm font-light leading-relaxed text-slate-300">
            {artwork.description}
          </p>
        </div>
      </div>
    </div>
  </section>
);
