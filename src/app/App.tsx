import React, { useState, useMemo, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { GlobeView } from "./components/GlobeView";
import { FilterSidebar } from "./components/FilterSidebar";
import { InfoPanel } from "./components/InfoPanel";
import { FeaturedSection } from "./components/FeaturedSection";
import { Footer } from "./components/Footer";
import { ARTIFACTS, Artifact } from "./data";

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const filteredArtifacts = useMemo(() => {
    if (selectedCategory === "All") return ARTIFACTS;
    return ARTIFACTS.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectArtifact = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <AboutSection />

        <section id="globe" className="relative w-full h-[800px] border-y border-white/5 bg-black">
          {/* Main 3D Globe Workspace */}
          <GlobeView 
            artifacts={filteredArtifacts} 
            selectedArtifact={selectedArtifact}
            onSelectArtifact={handleSelectArtifact} 
          />
          
          {/* Overlay UI Panels */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="relative w-full h-full max-w-[1600px] mx-auto pointer-events-none">
              <div className="pointer-events-auto">
                <FilterSidebar 
                  selectedCategory={selectedCategory} 
                  onSelectCategory={setSelectedCategory} 
                />
              </div>
              <div className="pointer-events-auto">
                <InfoPanel 
                  artifact={selectedArtifact} 
                  onClose={() => setSelectedArtifact(null)} 
                />
              </div>
            </div>
          </div>
        </section>

        <FeaturedSection 
          artifacts={ARTIFACTS} 
          onViewOnGlobe={handleSelectArtifact} 
        />
      </main>

      <Footer />
    </div>
  );
}
