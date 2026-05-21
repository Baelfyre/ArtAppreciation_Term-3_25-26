import React, { useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ArtworkInfoPanel } from "./components/artwork/ArtworkInfoPanel";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { GlobeModeToggle } from "./components/globe/GlobeModeToggle";
import { GlobeView } from "./components/globe/GlobeView";
import { PhilippinesMapView } from "./components/map/PhilippinesMapView";
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

  const featuredArtworks = useMemo(() => artworkRepository.getFeatured(), []);
  const modeArtworks = useMemo(() => artworkRepository.getByMode(mode), [mode]);

  const handleModeChange = (nextMode: GlobeMode) => {
    selectMode(nextMode);
    clearSelection();
  };

  const handleSelectArtwork = (artwork: Artwork) => {
    selectMode(artwork.scope);

    if (artwork.isPlaceholder) {
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
        <Hero />

        <FeaturedSection
          artworks={featuredArtworks}
          onViewArtwork={handleSelectArtwork}
        />

        <section
          id="globe"
          className="relative mx-4 my-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_32px_120px_rgba(0,0,0,0.45)] md:mx-6 lg:mx-auto lg:max-w-[1500px]"
        >
          <div className="flag-accent absolute inset-x-0 top-0 h-px" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-40 w-40 bg-[rgba(244,196,48,0.10)] blur-3xl" />
            <div className="absolute inset-y-0 right-0 w-[35%] bg-[linear-gradient(180deg,rgba(29,73,216,0.18),transparent_42%,rgba(185,22,44,0.16))]" />
          </div>

          {/* Main 3D Globe Workspace */}
          <div className="relative h-[660px] md:h-[700px] lg:h-[740px]">
            <GlobeView
              mode={mode}
              artworks={modeArtworks}
              selectedArtwork={selectedArtwork}
              onSelectArtwork={handleSelectArtwork}
            />
            
            {/* Overlay UI Panels */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative mx-auto h-full w-full max-w-[1600px] pointer-events-none">
                <GlobeModeToggle mode={mode} onModeChange={handleModeChange} />

                {mode === "local" && (
                  <PhilippinesMapView
                    artworks={modeArtworks}
                    selectedArtwork={selectedArtwork}
                    onSelectArtwork={handleSelectArtwork}
                  />
                )}

                <div className="pointer-events-auto">
                  <ArtworkInfoPanel
                    artwork={selectedArtwork}
                    onClose={clearSelection}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
}
