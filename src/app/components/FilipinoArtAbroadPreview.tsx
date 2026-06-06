import { ArrowRight, Globe2 } from "lucide-react";
import type { Artwork } from "../domain/Artwork";
import { ArtworkEffectImage } from "./artwork/ArtworkEffectImage";

interface FilipinoArtAbroadPreviewProps {
  artwork: Artwork;
  onViewArtwork: (artwork: Artwork) => void;
}

export const FilipinoArtAbroadPreview = ({
  artwork,
  onViewArtwork,
}: FilipinoArtAbroadPreviewProps) => (
  <section id="filipino-art-abroad" className="relative z-10 py-16 md:py-24">
    <div className="gallery-section">
      <div className="art-abroad-preview glass-panel curved-card-accent overflow-hidden rounded-[1.5rem] p-5 md:rounded-[2rem] md:p-8">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="glass-chip-warm mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-[#f4c430]">
              <Globe2 className="h-4 w-4" />
              International Exhibit Feature
            </span>
            <h2 className="section-title text-3xl font-semibold leading-tight text-white md:text-4xl">
              Next Direction: Filipino Art Abroad
            </h2>
            <p className="mt-4 max-w-[42rem] text-base font-light leading-relaxed text-slate-300 md:text-lg">
              Some Filipino artworks also reach international exhibit spaces. One example reserved
              for the next gallery direction is <strong className="font-medium text-white">The Coffee Maker</strong> by
              Renato "Rens" E. Tuzon, a coffee-on-paper artwork connected to an international
              exhibition context.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Featured in the Coffee Table Art Book International Exhibition, New Jersey, USA.
            </p>
            <button
              type="button"
              onClick={() => {
                onViewArtwork(artwork);
                document.getElementById("globe")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="glass-button mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white"
            >
              View Filipino Art Abroad
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="art-abroad-effect-frame">
            <ArtworkEffectImage artwork={artwork} />
          </div>
        </div>
      </div>
    </div>
  </section>
);
