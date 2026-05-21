import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const ANG_PIECES = [
  { clip: "polygon(0% 0%, 20% 0%, 20% 100%, 0% 100%)", tx: "-140%", ty: "0%", rot: "-2deg", delay: "0s" },
  { clip: "polygon(20% 0%, 60% 0%, 60% 42%, 20% 42%)", tx: "0%", ty: "-140%", rot: "1.8deg", delay: "0.28s" },
  { clip: "polygon(60% 0%, 100% 0%, 100% 52%, 60% 52%)", tx: "120%", ty: "-80%", rot: "-1.4deg", delay: "0.52s" },
  { clip: "polygon(20% 42%, 60% 42%, 60% 100%, 20% 100%)", tx: "-90%", ty: "120%", rot: "2.2deg", delay: "0.75s" },
  { clip: "polygon(60% 52%, 100% 52%, 100% 100%, 60% 100%)", tx: "140%", ty: "70%", rot: "-0.8deg", delay: "0.95s" },
  { clip: "polygon(24% 73%, 58% 73%, 58% 100%, 24% 100%)", tx: "0%", ty: "150%", rot: "0.6deg", delay: "1.18s" },
];

interface AngCollageAssemblyProps {
  src: string;
  alt: string;
}

export const AngCollageAssembly = ({ src, alt }: AngCollageAssemblyProps) => {
  const settleTimeoutRef = useRef<number | null>(null);
  const frameTimeoutRef = useRef<number | null>(null);
  const [playKey, setPlayKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAssembled, setIsAssembled] = useState(true);

  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
      if (frameTimeoutRef.current !== null) window.clearTimeout(frameTimeoutRef.current);
    };
  }, []);

  const playAssembly = () => {
    if (settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current);
    if (frameTimeoutRef.current !== null) window.clearTimeout(frameTimeoutRef.current);

    setPlayKey((current) => current + 1);
    setIsPlaying(true);
    setIsAssembled(false);

    frameTimeoutRef.current = window.setTimeout(() => setIsAssembled(true), 40);
    settleTimeoutRef.current = window.setTimeout(() => setIsPlaying(false), 4300);
  };

  return (
    <div className="artwork-effect-shell artwork-effect-shell--landscape">
      <div
        className="artwork-effect-stage artwork-effect-stage--ang"
        tabIndex={0}
        onPointerEnter={playAssembly}
        onFocus={playAssembly}
        aria-label="Hover or focus to assemble Ang collage artwork"
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          className="artwork-effect-image"
          style={{ opacity: isPlaying ? 0 : 1, transition: "opacity 0.5s ease" }}
        />

        {isPlaying && (
          <div key={playKey} className="ang-collage-layer" aria-hidden="true">
            {ANG_PIECES.map((piece, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="ang-collage-piece"
                style={{
                  clipPath: piece.clip,
                  transform: isAssembled
                    ? "translate(0%, 0%) rotate(0deg)"
                    : `translate(${piece.tx}, ${piece.ty}) rotate(${piece.rot})`,
                  opacity: isAssembled ? 1 : 0,
                  transition: `transform 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${piece.delay}, opacity 0.42s ease ${piece.delay}`,
                }}
              />
            ))}
          </div>
        )}

        <span className="artwork-effect-caption">{isPlaying ? "Collage assembly" : "Hover to assemble"}</span>
      </div>
    </div>
  );
};
