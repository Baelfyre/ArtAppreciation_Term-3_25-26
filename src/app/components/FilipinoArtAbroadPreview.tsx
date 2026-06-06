import { Globe2 } from "lucide-react";
import type { Artwork } from "../domain/Artwork";
import { ArtworkEffectImage } from "./artwork/ArtworkEffectImage";

interface FilipinoArtAbroadPreviewProps {
  artwork: Artwork;
}

export const FilipinoArtAbroadPreview = ({ artwork }: FilipinoArtAbroadPreviewProps) => (
  <section id="filipino-art-abroad" className="relative z-10 py-16 md:py-24">
    <div className="gallery-section">
      <div className="mb-9 max-w-[44rem] md:mb-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4c430]">
          International Exhibit Feature
        </p>
        <h2 className="section-title text-[clamp(2rem,7vw,3rem)] font-semibold leading-tight text-white">
          Filipino Art Abroad
        </h2>
        <p className="mt-4 text-base font-light leading-relaxed text-slate-300">
          Filipino creativity also reaches international exhibit spaces through distinctive
          materials, stories, and contemporary practice.
        </p>
      </div>

      <div className="art-abroad-preview overflow-hidden rounded-[1.5rem]">
        <div className="art-abroad-effect-frame">
          <ArtworkEffectImage artwork={artwork} compact />
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
            The Coffee Maker
          </h2>
          <p className="mt-1 text-sm text-slate-300">Renato "Rens" E. Tuzon</p>

          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="museum-label-heading">Medium</dt>
              <dd className="mt-1 text-slate-200">Coffee on Paper</dd>
            </div>
            <div>
              <dt className="museum-label-heading">Context</dt>
              <dd className="mt-1 text-slate-200">
                Coffee Table Art Book International Exhibition, New Jersey, USA
              </dd>
            </div>
          </dl>

          <p className="mt-5 max-w-[42rem] text-sm font-light leading-relaxed text-slate-300">
            {artwork.description}
          </p>
        </div>
      </div>
    </div>
  </section>
);
