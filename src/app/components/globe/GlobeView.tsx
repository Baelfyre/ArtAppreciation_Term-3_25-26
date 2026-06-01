import { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import type { Artwork } from "../../domain/Artwork";
import type { GlobeMode } from "../../domain/GlobeMode";
import { useGlobeNavigation } from "../../hooks/useGlobeNavigation";
import {
  prepareInternationalConnectionArcs,
  prepareInternationalGlobeMarkers,
} from "../../services/mapNavigationService";

interface GlobeViewProps {
  mode: GlobeMode;
  artworks: Artwork[];
  selectedArtwork: Artwork | null;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const GlobeView = ({
  mode,
  artworks,
  selectedArtwork,
  onSelectArtwork,
}: GlobeViewProps) => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isPhilippinesFocused = mode === "group" || mode === "local";
  const globeStatusLabel =
    mode === "group"
      ? "Zooming into the Philippines"
      : mode === "local"
        ? "Milestone 2 Local Art Curation"
        : "From the Philippines to the world";

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const allowPageScroll = (event: WheelEvent) => {
      event.stopPropagation();
    };

    container.addEventListener("wheel", allowPageScroll, { capture: true, passive: true });

    return () => {
      container.removeEventListener("wheel", allowPageScroll, { capture: true });
    };
  }, []);

  useGlobeNavigation(globeRef, {
    mode,
    selectedArtwork,
    isReady: dimensions.width > 0,
  });

  const internationalArtworks = mode === "international" ? artworks : [];

  const arcsData = useMemo(
    () => prepareInternationalConnectionArcs(internationalArtworks),
    [internationalArtworks],
  );

  const markersData = useMemo(
    () => prepareInternationalGlobeMarkers(internationalArtworks, selectedArtwork),
    [internationalArtworks, selectedArtwork],
  );

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(29,73,216,0.2),transparent_26%),linear-gradient(180deg,#050816_0%,#09112c_48%,#04060f_100%)] transition-[filter,opacity] duration-700 ${
        isPhilippinesFocused ? "opacity-85 saturate-[0.85]" : "opacity-100"
      }`}
    >
      <div className="pattern-surface pointer-events-none absolute inset-0 opacity-20" />
      <div className="glass-chip pointer-events-none absolute left-1/2 top-[7.6rem] z-10 w-[calc(100%-2rem)] max-w-[26rem] -translate-x-1/2 rounded-full px-3 py-1.5 text-center text-[10px] uppercase leading-tight tracking-[0.12em] text-slate-200 md:px-4 md:py-2 md:text-xs md:tracking-[0.3em] lg:top-6 lg:w-auto">
        {globeStatusLabel}
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(29,73,216,0.10)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-[15%] h-48 w-48 rounded-full bg-[rgba(244,196,48,0.10)] blur-[90px]" />
      <div className="pointer-events-none absolute right-[12%] top-[20%] h-56 w-56 rounded-full bg-[rgba(185,22,44,0.10)] blur-[100px]" />

      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          showAtmosphere
          atmosphereColor="#5f82ff"
          atmosphereAltitude={0.18}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          arcsData={arcsData}
          arcStartLat={(d) => (d as any).startLat}
          arcStartLng={(d) => (d as any).startLng}
          arcEndLat={(d) => (d as any).endLat}
          arcEndLng={(d) => (d as any).endLng}
          arcColor={(d) => (d as any).color}
          arcDashLength={0.4}
          arcDashGap={4}
          arcDashInitialGap={() => Math.random() * 5}
          arcDashAnimateTime={2200}
          arcStroke={0.55}
          pointsData={markersData}
          pointLat={(d) => (d as any).lat}
          pointLng={(d) => (d as any).lng}
          pointColor={(d) => (d as any).color}
          pointAltitude={0.01}
          pointRadius={(d) => (d as any).size}
          pointsMerge={false}
          htmlElementsData={markersData}
          htmlElement={(d: any) => {
            const marker = d as (typeof markersData)[number];
            const el = document.createElement("div");
            el.className = "globe-html-marker flex flex-col items-center pointer-events-auto";
            el.style.transform = "translate(-50%, -100%) translateY(-10px)";

            const dot = document.createElement("div");
            dot.className = `globe-html-marker-dot${marker.isSelected ? " is-selected" : ""}${
              marker.isOrigin ? " is-origin" : ""
            }`;
            dot.style.backgroundColor = marker.color;
            dot.style.color = marker.color;
            dot.style.boxShadow = `0 0 18px ${marker.color}`;

            if (marker.isOrigin) {
              const label = document.createElement("div");
              label.textContent = "Philippines";
              label.className = "globe-html-origin-label";
              label.style.color = "var(--heritage-gold)";
              label.style.background = "rgba(5, 8, 22, 0.55)";
              label.style.borderColor = "rgba(244, 196, 48, 0.28)";
              el.appendChild(label);
            }

            el.appendChild(dot);

            if (marker.artwork) {
              const label = document.createElement("div");
              label.textContent = marker.label;
              label.className = "globe-html-marker-label";
              el.appendChild(label);

              if (marker.artwork.isPlaceholder) {
                el.title = `${marker.label} placeholder marker`;
              } else {
                el.classList.add("cursor-pointer");
                el.onclick = () => onSelectArtwork(marker.artwork as Artwork);
              }
            }

            return el;
          }}
        />
      )}
    </div>
  );
};
