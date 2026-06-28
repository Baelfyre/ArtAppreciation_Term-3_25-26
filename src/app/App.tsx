import React, { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ArtworkInfoPanel } from "./components/artwork/ArtworkInfoPanel";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { ArtworkSourcesSection } from "./components/ArtworkSourcesSection";
import { GlobeModeToggle } from "./components/globe/GlobeModeToggle";
import { GlobeView } from "./components/globe/GlobeView";
import { PhilippinesMapView } from "./components/map/PhilippinesMapView";
import { CircularVideoOverlay } from "./components/presentation/CircularVideoOverlay";
import { VideoTrigger } from "./components/presentation/VideoTrigger";
import { globePresentationVideos } from "./data/presentationVideos";
import type { Artwork } from "./domain/Artwork";
import { useArtworkSelection } from "./hooks/useArtworkSelection";
import { useViewMode } from "./hooks/useViewMode";
import { artworkRepository } from "./services/artworkRepository";
import type { GlobeMode } from "./domain/GlobeMode";

// Suppress THREE.Clock deprecation warning from react-globe.gl
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Clock: This module has been deprecated')) {
    return;
  }
  // Some versions of Three.js use console.error or console.warn for deprecation
  originalWarn(...args);
};
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Clock: This module has been deprecated')) {
    return;
  }
  originalError(...args);
};

export default function App() {
  const { mode, selectMode } = useViewMode("international");
  const { selectedArtwork, selectArtwork, clearSelection } = useArtworkSelection();
  const [activePresentationVideoId, setActivePresentationVideoId] = useState<string | null>(null);

  const featuredArtworks = useMemo(() => artworkRepository.getFeatured(), []);
  const modeArtworks = useMemo(() => artworkRepository.getByMode(mode), [mode]);
  const modeLayoutClass = mode === "local" ? "is-local-mode" : "is-international-mode";

  useEffect(() => {
    const scrollToHash = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;

      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(targetId))?.scrollIntoView({ block: "start" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  useEffect(() => {
    setActivePresentationVideoId(null);
  }, [mode, selectedArtwork?.id]);

  const handleModeChange = (nextMode: GlobeMode) => {
    setActivePresentationVideoId(null);
    selectMode(nextMode);
    clearSelection();
  };

  const handleSelectArtwork = (artwork: Artwork) => {
    setActivePresentationVideoId(null);
    selectMode(artwork.scope);

    if (artwork.isPlaceholder && artwork.scope === "international") {
      clearSelection();
      return;
    }

    selectArtwork(artwork);
  };

  return (
    <div className="heritage-shell min-h-screen text-slate-200 selection:bg-amber-500/30 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[rgba(244,196,48,0.18)] blur-[120px]" />
        <div className="absolute right-[-5rem] top-[-2rem] h-[30rem] w-[30rem] rounded-full bg-[rgba(29,73,216,0.18)] blur-[150px]" />
        <div className="absolute bottom-[-8rem] right-[10%] h-[22rem] w-[22rem] rounded-full bg-[rgba(185,22,44,0.18)] blur-[130px]" />
      </div>

      <Navbar />
      
      <main className="relative z-10">
        <div className="museum-intro">
          <Hero />

          <section
            id="globe"
            className={`globe-section-inner ${modeLayoutClass} curved-card-accent relative my-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_32px_120px_rgba(0,0,0,0.45)]`}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-40 w-40 bg-[rgba(244,196,48,0.10)] blur-3xl" />
              <div className="absolute inset-y-0 right-0 w-[35%] bg-[linear-gradient(180deg,rgba(29,73,216,0.18),transparent_42%,rgba(185,22,44,0.16))]" />
            </div>

            {/* Main 3D Globe Workspace */}
            <div className={`globe-workspace ${modeLayoutClass} relative`}>
              <GlobeView
                mode={mode}
                artworks={modeArtworks}
                selectedArtwork={selectedArtwork}
                onSelectArtwork={handleSelectArtwork}
                onSelectPhilippines={() => handleModeChange("local")}
              />

              {/* Overlay UI Panels */}
              <div className={`globe-overlay-host ${modeLayoutClass} absolute inset-0 pointer-events-none`}>
                <div
                  className={`globe-overlay-shell relative mx-auto h-full w-full max-w-[1200px] pointer-events-none ${
                    selectedArtwork ? "has-selected-artwork" : ""
                  }`}
                >
                  <div className="globe-control-stack pointer-events-none">
                    <GlobeModeToggle mode={mode} onModeChange={handleModeChange} />

                    {mode === "local" && (
                      <PhilippinesMapView
                        artworks={modeArtworks}
                        selectedArtwork={selectedArtwork}
                        onSelectArtwork={handleSelectArtwork}
                      />
                    )}
                  </div>

                  {mode === "international" && (
                    <>
                      <CurationPlaceholderPanel />
                      <div className="globe-presentation-layer">
                        <VideoTrigger
                          label={globePresentationVideos.intro.label}
                          ariaLabel={globePresentationVideos.intro.ariaLabel}
                          title={globePresentationVideos.intro.label}
                          variant="globe"
                          active={activePresentationVideoId === globePresentationVideos.intro.id}
                          className="globe-presentation-trigger globe-presentation-trigger--intro"
                          onClick={() =>
                            setActivePresentationVideoId((current) =>
                              current === globePresentationVideos.intro.id
                                ? null
                                : globePresentationVideos.intro.id,
                            )
                          }
                        />
                        <CircularVideoOverlay
                          isOpen={activePresentationVideoId === globePresentationVideos.intro.id}
                          src={globePresentationVideos.intro.src}
                          title={globePresentationVideos.intro.title}
                          volume={globePresentationVideos.intro.volume}
                          onClose={() => setActivePresentationVideoId(null)}
                          className="globe-presentation-overlay globe-presentation-overlay--intro"
                          playButtonLabel="Play intro video"
                        />

                        <VideoTrigger
                          label={globePresentationVideos.outro.label}
                          ariaLabel={globePresentationVideos.outro.ariaLabel}
                          title={globePresentationVideos.outro.label}
                          variant="globe"
                          active={activePresentationVideoId === globePresentationVideos.outro.id}
                          className="globe-presentation-trigger globe-presentation-trigger--outro"
                          onClick={() =>
                            setActivePresentationVideoId((current) =>
                              current === globePresentationVideos.outro.id
                                ? null
                                : globePresentationVideos.outro.id,
                            )
                          }
                        />
                        <CircularVideoOverlay
                          isOpen={activePresentationVideoId === globePresentationVideos.outro.id}
                          src={globePresentationVideos.outro.src}
                          title={globePresentationVideos.outro.title}
                          volume={globePresentationVideos.outro.volume}
                          onClose={() => setActivePresentationVideoId(null)}
                          className="globe-presentation-overlay globe-presentation-overlay--outro"
                          playButtonLabel="Play outro video"
                        />
                      </div>
                    </>
                  )}

                  <div className="artwork-panel-layer pointer-events-none">
                    <ArtworkInfoPanel
                      artwork={selectedArtwork}
                      onClose={clearSelection}
                      activePresentationVideoId={activePresentationVideoId}
                      onOpenPresentationVideo={setActivePresentationVideoId}
                      onClosePresentationVideo={() => setActivePresentationVideoId(null)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <FeaturedSection
            artworks={featuredArtworks}
            onViewArtwork={handleSelectArtwork}
          />
        </div>

        <AboutSection />

        <Footer />

        <ArtworkSourcesSection />
      </main>
    </div>
  );
}

const curationPlaceholders = {
  international: {
    eyebrow: "Identity Beyond Borders",
    title: "Global Filipino Art",
    body: "Explore the wider globe, then continue below to the main exhibition collection.",
  },
} satisfies Record<Extract<GlobeMode, "international">, {
  eyebrow: string;
  title: string;
  body: string;
}>;

const CurationPlaceholderPanel = () => {
  const placeholder = curationPlaceholders.international;

  return (
    <aside className="international-curation-placeholder local-map-fade curved-card-accent pointer-events-auto absolute inset-x-4 bottom-4 z-10 mx-auto max-w-[22rem] overflow-hidden rounded-[1.15rem] border border-white/14 bg-[rgba(5,8,22,0.62)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[22rem] md:rounded-[1.35rem] md:p-5 lg:bottom-6 lg:right-6">
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#f4c430] md:text-[11px] md:tracking-[0.24em]">
        {placeholder.eyebrow}
      </p>
      <h3 className="section-title text-xl font-semibold leading-tight text-white md:text-2xl">
        {placeholder.title}
      </h3>
      <p className="mt-3 text-sm font-light leading-relaxed text-slate-300">
        {placeholder.body}
      </p>
    </aside>
  );
};
