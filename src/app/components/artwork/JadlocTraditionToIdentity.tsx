import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type JadlocPhase = "tradition" | "transitioning" | "vivid";

const DUST_PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  x: 8 + (index * 3.1) % 84,
  y: 10 + (index * 6.7) % 78,
  size: 1.2 + (index % 5) * 0.75,
  delay: (index * 0.06) % 1.9,
  dx: `${((index % 7) - 3) * 26}px`,
}));

interface JadlocTraditionToIdentityProps {
  traditionSrc: string;
  vividSrc: string;
  alt: string;
}

export const JadlocTraditionToIdentity = ({
  traditionSrc,
  vividSrc,
  alt,
}: JadlocTraditionToIdentityProps) => {
  const transitionTimeoutRef = useRef<number | null>(null);
  const vividTimeoutRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<JadlocPhase>("tradition");

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) window.clearTimeout(transitionTimeoutRef.current);
      if (vividTimeoutRef.current !== null) window.clearTimeout(vividTimeoutRef.current);
    };
  }, []);

  const clearTimers = () => {
    if (transitionTimeoutRef.current !== null) window.clearTimeout(transitionTimeoutRef.current);
    if (vividTimeoutRef.current !== null) window.clearTimeout(vividTimeoutRef.current);
  };

  const playTransition = () => {
    clearTimers();
    setPhase("tradition");
    transitionTimeoutRef.current = window.setTimeout(() => setPhase("transitioning"), 120);
    vividTimeoutRef.current = window.setTimeout(() => setPhase("vivid"), 2650);
  };

  const showTradition = () => {
    clearTimers();
    setPhase("tradition");
  };

  const showVivid = () => {
    clearTimers();
    setPhase("vivid");
  };

  return (
    <div className="artwork-effect-shell artwork-effect-shell--portrait">
      <div
        className={`artwork-effect-stage jadloc-transition-stage phase-${phase}`}
        tabIndex={0}
        onPointerEnter={playTransition}
        onFocus={playTransition}
        aria-label="Hover or focus to transition Jadloc artwork from charcoal to vivid identity"
      >
        <ImageWithFallback
          src={traditionSrc}
          alt="The Weight of Tradition"
          className="jadloc-artwork-image jadloc-tradition-image"
        />
        <ImageWithFallback
          src={vividSrc}
          alt={alt}
          className="jadloc-artwork-image jadloc-vivid-image"
        />

        {phase === "transitioning" && (
          <div className="jadloc-dust-layer" aria-hidden="true">
            {DUST_PARTICLES.map((particle, index) => (
              <span
                key={index}
                className="jadloc-dust-particle"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animationDelay: `${particle.delay}s`,
                  ["--dx" as string]: particle.dx,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="jadloc-mini-nav" aria-label="Jadloc artwork view navigation">
        <button type="button" onClick={showTradition} className={phase === "tradition" ? "is-active" : ""}>
          Tradition
        </button>
        <button type="button" onClick={showVivid} className={phase === "vivid" ? "is-active" : ""}>
          Vivid
        </button>
      </div>
    </div>
  );
};
