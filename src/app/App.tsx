import React, { useEffect, useMemo } from "react";
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
  const { mode, selectMode } = useViewMode("group");
  const { selectedArtwork, selectArtwork, clearSelection } = useArtworkSelection();

  const featuredArtworks = useMemo(() => artworkRepository.getFeatured(), []);
  const modeArtworks = useMemo(() => artworkRepository.getByMode(mode), [mode]);

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
          className="globe-section-inner curved-card-accent relative my-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/30 shadow-[0_32px_120px_rgba(0,0,0,0.45)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-0 top-0 h-40 w-40 bg-[rgba(244,196,48,0.10)] blur-3xl" />
            <div className="absolute inset-y-0 right-0 w-[35%] bg-[linear-gradient(180deg,rgba(29,73,216,0.18),transparent_42%,rgba(185,22,44,0.16))]" />
          </div>

          {/* Main 3D Globe Workspace */}
          <div className="globe-workspace relative">
            <GlobeView
              mode={mode}
              artworks={modeArtworks}
              selectedArtwork={selectedArtwork}
              onSelectArtwork={handleSelectArtwork}
            />
            
            {/* Overlay UI Panels */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="relative mx-auto h-full w-full max-w-[1200px] pointer-events-none">
                <GlobeModeToggle mode={mode} onModeChange={handleModeChange} />

                {mode === "group" && (
                  <PhilippinesMapView
                    artworks={modeArtworks}
                    selectedArtwork={selectedArtwork}
                    onSelectArtwork={handleSelectArtwork}
                  />
                )}

                {(mode === "local" || mode === "international") && (
                  <CurationPlaceholderPanel mode={mode} />
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

const curationPlaceholders = {
  local: {
    eyebrow: "Milestone 2",
    title: "Local Art Curation",
    body: "Local Filipino artworks will be curated here for Milestone 2.",
  },
  international: {
    eyebrow: "Terminal Assessment",
    title: "International Art Curation",
    body: "International artworks connected to Filipino identity beyond borders will be curated here for the Terminal Assessment.",
  },
} satisfies Record<Extract<GlobeMode, "local" | "international">, {
  eyebrow: string;
  title: string;
  body: string;
}>;

interface CurationPlaceholderPanelProps {
  mode: Extract<GlobeMode, "local" | "international">;
}

const CurationPlaceholderPanel = ({ mode }: CurationPlaceholderPanelProps) => {
  const placeholder = curationPlaceholders[mode];

  return (
    <aside className="local-map-fade curved-card-accent pointer-events-auto absolute inset-x-3 top-40 z-10 mx-auto max-w-[28rem] overflow-hidden rounded-[1.25rem] border border-white/14 bg-[rgba(5,8,22,0.58)] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl md:inset-x-4 md:top-40 md:rounded-[1.75rem] md:p-6 lg:left-auto lg:right-6 lg:top-32 lg:w-[28rem]">
      <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[#f4c430] md:text-[11px] md:tracking-[0.28em]">
        {placeholder.eyebrow}
      </p>
      <h3 className="section-title text-2xl font-semibold leading-tight text-white md:text-3xl">
        {placeholder.title}
      </h3>
      <p className="mt-4 text-sm font-light leading-relaxed text-slate-300 md:text-base">
        {placeholder.body}
      </p>
    </aside>
  );
};
