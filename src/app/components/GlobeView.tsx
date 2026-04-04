import React, { useEffect, useRef, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { Artifact, PH_COORDS } from '../data';

interface GlobeViewProps {
  artifacts: Artifact[];
  onSelectArtifact: (artifact: Artifact) => void;
  selectedArtifact: Artifact | null;
}

export const GlobeView = ({ artifacts, onSelectArtifact, selectedArtifact }: GlobeViewProps) => {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
      color: ['#0ea5e9', '#f59e0b'],
      artifact
    }));
  }, [artifacts]);

  const markersData = useMemo(() => {
    const markers = artifacts.map(artifact => ({
      lat: artifact.lat,
      lng: artifact.lng,
      size: selectedArtifact?.id === artifact.id ? 1.5 : 1,
      color: selectedArtifact?.id === artifact.id ? '#f59e0b' : '#38bdf8',
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
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#020617] via-[#010928] to-[#020617] overflow-hidden"
    >
      {/* Background radial glow to simulate atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
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
            el.className = 'flex flex-col items-center pointer-events-auto cursor-pointer';
            el.style.transform = `translate(-50%, -100%) translateY(-10px)`;
            
            const dot = document.createElement('div');
            dot.style.width = d.isOrigin ? '12px' : '8px';
            dot.style.height = d.isOrigin ? '12px' : '8px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = d.color;
            dot.style.boxShadow = `0 0 15px ${d.color}`;
            dot.style.border = '2px solid white';
            
            if (d.isOrigin) {
              const label = document.createElement('div');
              label.textContent = 'Philippines';
              label.className = 'text-amber-500 font-semibold text-xs mt-1 drop-shadow-md whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-500/30';
              el.appendChild(label);
            }
            
            el.appendChild(dot);
            
            if (!d.isOrigin) {
              el.onclick = () => onSelectArtifact(d.artifact);
            }
            
            return el;
          }}
        />
      )}
    </div>
  );
};
