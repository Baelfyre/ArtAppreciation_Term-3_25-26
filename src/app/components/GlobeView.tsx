import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { Artifact, PH_COORDS } from '../data';

const CATEGORY_COLORS: Record<string, string> = {
  Art: '#f4c430',
  Religious: '#b9162c',
  Indigenous: '#f6f4ee',
  Historical: '#1d49d8',
  Contemporary: '#86a7ff',
  International: '#86a7ff',
};

interface GlobeViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  selectedArtifact: Artifact | null;
}

export const GlobeView = ({ artifacts, onSelectArtifact, selectedArtifact }: GlobeViewProps) => {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const getArtifactColor = (artifact: Artifact) => CATEGORY_COLORS[artifact.category] ?? '#86a7ff';

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ lat: 20, lng: 90, altitude: 2 }, 1000);
    }
  }, []);

  // When an artifact is selected, fly to it
  useEffect(() => {
    if (globeRef.current && selectedArtifact) {
      globeRef.current.controls().autoRotate = false;
      globeRef.current.pointOfView(
        { lat: selectedArtifact.lat, lng: selectedArtifact.lng, altitude: 1.2 }, 
        1500
      );
    } else if (globeRef.current && !selectedArtifact) {
      globeRef.current.controls().autoRotate = true;
    }
  }, [selectedArtifact]);

  const arcsData = useMemo(() => {
    return artifacts.map(artifact => ({
      startLat: PH_COORDS.lat,
      startLng: PH_COORDS.lng,
      endLat: artifact.lat,
      endLng: artifact.lng,
      color: [getArtifactColor(artifact), '#f4c430'],
      artifact
    }));
  }, [artifacts]);

  const markersData = useMemo(() => {
    const markers = artifacts.map(artifact => ({
      lat: artifact.lat,
      lng: artifact.lng,
      size: selectedArtifact?.id === artifact.id ? 1.5 : 1,
      color: selectedArtifact?.id === artifact.id ? '#f4c430' : getArtifactColor(artifact),
      artifact,
      isOrigin: false
    }));

    // Add Philippines as origin
    markers.push({
      lat: PH_COORDS.lat,
      lng: PH_COORDS.lng,
      size: 1.2,
      color: '#f59e0b',
      artifact: null as any,
      isOrigin: true
    });

    return markers;
  }, [artifacts, selectedArtifact]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 h-full w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(29,73,216,0.2),transparent_26%),linear-gradient(180deg,#050816_0%,#09112c_48%,#04060f_100%)]"
    >
      <div className="pattern-surface absolute inset-0 opacity-20 pointer-events-none"></div>
      <div className="pointer-events-none absolute left-1/2 top-6 z-10 -translate-x-1/2 glass-chip rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
        From the Philippines to the world
      </div>

      {/* Background radial glow to simulate atmosphere */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(29,73,216,0.10)] blur-[120px]"></div>
      <div className="pointer-events-none absolute bottom-10 left-[15%] h-48 w-48 rounded-full bg-[rgba(244,196,48,0.10)] blur-[90px]"></div>
      <div className="pointer-events-none absolute right-[12%] top-[20%] h-56 w-56 rounded-full bg-[rgba(185,22,44,0.10)] blur-[100px]"></div>

      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          showAtmosphere={true}
          atmosphereColor="#5f82ff"
          atmosphereAltitude={0.18}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          arcsData={arcsData}
          arcStartLat={d => (d as any).startLat}
          arcStartLng={d => (d as any).startLng}
          arcEndLat={d => (d as any).endLat}
          arcEndLng={d => (d as any).endLng}
          arcColor={d => (d as any).color}
          arcDashLength={0.4}
          arcDashGap={4}
          arcDashInitialGap={() => Math.random() * 5}
          arcDashAnimateTime={2000}
          arcStroke={0.5}
          pointsData={markersData}
          pointLat={d => (d as any).lat}
          pointLng={d => (d as any).lng}
          pointColor={d => (d as any).color}
          pointAltitude={0.01}
          pointRadius={d => (d as any).size}
          pointsMerge={false}
          htmlElementsData={markersData}
          htmlElement={(d: any) => {
            const el = document.createElement('div');
            el.className = 'flex flex-col items-center pointer-events-auto';
            el.style.transform = `translate(-50%, -100%) translateY(-10px)`;
            
            const dot = document.createElement('div');
            dot.style.width = d.isOrigin ? '12px' : '8px';
            dot.style.height = d.isOrigin ? '12px' : '8px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = d.color;
            dot.style.boxShadow = `0 0 15px ${d.color}`;
            dot.style.border = '2px solid rgba(246, 244, 238, 0.95)';
            
            if (d.isOrigin) {
              const label = document.createElement('div');
              label.textContent = 'Philippines';
              label.className = 'mt-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md';
              label.style.color = 'var(--heritage-gold)';
              label.style.background = 'rgba(5, 8, 22, 0.55)';
              label.style.borderColor = 'rgba(244, 196, 48, 0.28)';
              el.appendChild(label);
            }
            
            el.appendChild(dot);
            
            if (!d.isOrigin) {
              const label = document.createElement('div');
              label.textContent = d.artifact.location;
              label.className = 'mt-2 max-w-36 rounded-full border border-white/12 bg-[rgba(5,8,22,0.68)] px-2.5 py-1 text-center text-[11px] font-medium leading-tight text-slate-100 backdrop-blur-md';
              el.appendChild(label);
            }

            if (!d.isOrigin && !d.artifact.isPlaceholder) {
              el.classList.add('cursor-pointer');
              el.onclick = () => onSelectArtifact(d.artifact);
            }
            
            return el;
          }}
        />
      )}
    </div>
  );
};
