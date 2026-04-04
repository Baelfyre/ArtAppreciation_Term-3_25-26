import { useState } from "react";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  country: string;
  category: string;
  color: string;
}

interface MapViewProps {
  markers: MapMarker[];
  onMarkerClick: (markerId: string) => void;
}

export function MapView({ markers, onMarkerClick }: MapViewProps) {
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 1200 + 120;
    const y = ((90 - lat) / 180) * 500 + 50;
    return { x, y };
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-inner">
      {/* Decorative world map outline */}
      <svg viewBox="0 0 1440 600" className="w-full h-full">
        {/* World map background (simplified continents) */}
        <g opacity="0.08" fill="#0A4A9A">
          {/* North America */}
          <path d="M 200,150 Q 150,120 180,80 Q 220,60 280,90 Q 320,110 340,160 Q 330,200 300,220 Q 250,210 200,150 Z" />
          {/* South America */}
          <path d="M 320,280 Q 310,250 330,220 Q 360,240 370,280 Q 380,340 360,400 Q 340,420 320,400 Q 300,350 320,280 Z" />
          {/* Europe */}
          <path d="M 680,120 Q 720,100 760,110 Q 780,130 770,160 Q 750,180 720,170 Q 690,150 680,120 Z" />
          {/* Africa */}
          <path d="M 720,200 Q 740,180 770,190 Q 800,220 810,280 Q 800,360 770,400 Q 740,410 720,390 Q 710,320 720,200 Z" />
          {/* Asia */}
          <path d="M 880,120 Q 920,100 980,110 Q 1050,130 1100,160 Q 1120,200 1100,250 Q 1060,280 1000,270 Q 940,250 900,220 Q 870,180 880,120 Z" />
          {/* Australia */}
          <path d="M 1050,380 Q 1090,370 1140,390 Q 1160,420 1140,450 Q 1100,460 1060,440 Q 1040,410 1050,380 Z" />
        </g>

        {/* Grid lines */}
        <g stroke="#0A4A9A" strokeWidth="0.5" opacity="0.1">
          {[...Array(12)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={50 + i * 50} x2="1440" y2={50 + i * 50} />
          ))}
          {[...Array(12)].map((_, i) => (
            <line key={`v-${i}`} x1={120 + i * 120} y1="0" x2={120 + i * 120} y2="600" />
          ))}
        </g>

        {/* Connection lines from Philippines */}
        <g opacity="0.3" strokeWidth="1.5" strokeDasharray="4 4">
          {markers.map((marker) => {
            const start = projectCoordinates(12.8797, 121.7740); // Philippines
            const end = projectCoordinates(marker.lat, marker.lng);
            return (
              <line
                key={`line-${marker.id}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={marker.color}
              />
            );
          })}
        </g>

        {/* Philippines marker (origin) */}
        <g>
          {(() => {
            const pos = projectCoordinates(12.8797, 121.7740);
            return (
              <>
                <circle cx={pos.x} cy={pos.y} r="8" fill="#D4A830" stroke="white" strokeWidth="2" />
                <circle cx={pos.x} cy={pos.y} r="16" fill="none" stroke="#D4A830" strokeWidth="1" opacity="0.3" />
              </>
            );
          })()}
        </g>

        {/* Markers */}
        {markers.map((marker) => {
          const pos = projectCoordinates(marker.lat, marker.lng);
          const isHovered = hoveredMarker === marker.id;

          return (
            <g
              key={marker.id}
              onMouseEnter={() => setHoveredMarker(marker.id)}
              onMouseLeave={() => setHoveredMarker(null)}
              onClick={() => onMarkerClick(marker.id)}
              className="cursor-pointer transition-all"
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isHovered ? "10" : "6"}
                fill={marker.color}
                stroke="white"
                strokeWidth="2"
                className="transition-all"
              />
              {isHovered && (
                <>
                  <circle cx={pos.x} cy={pos.y} r="18" fill="none" stroke={marker.color} strokeWidth="2" opacity="0.5" />
                  <text
                    x={pos.x}
                    y={pos.y - 25}
                    textAnchor="middle"
                    className="fill-gray-900 text-sm pointer-events-none"
                    style={{ fontWeight: 500 }}
                  >
                    {marker.country}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-gray-200">
        <div className="text-sm text-gray-600 mb-2">Origin</div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-[#D4A830]"></div>
          <span className="text-sm text-gray-900">Philippines</span>
        </div>
        <div className="text-sm text-gray-600 mb-2">Categories</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0A4A9A]"></div>
            <span className="text-xs text-gray-700">Art / Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#B8414A]"></div>
            <span className="text-xs text-gray-700">Religious</span>
          </div>
        </div>
      </div>
    </div>
  );
}
