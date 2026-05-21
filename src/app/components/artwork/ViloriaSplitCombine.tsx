import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

type ViloriaPhase = "split" | "merge" | "done";

interface ViloriaSplitCombineProps {
  src: string;
  alt: string;
}

export const ViloriaSplitCombine = ({ src, alt }: ViloriaSplitCombineProps) => {
  const mergeTimeoutRef = useRef<number | null>(null);
  const doneTimeoutRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<ViloriaPhase>("done");

  useEffect(() => {
    return () => {
      if (mergeTimeoutRef.current !== null) window.clearTimeout(mergeTimeoutRef.current);
      if (doneTimeoutRef.current !== null) window.clearTimeout(doneTimeoutRef.current);
    };
  }, []);

  const playTransition = () => {
    if (mergeTimeoutRef.current !== null) window.clearTimeout(mergeTimeoutRef.current);
    if (doneTimeoutRef.current !== null) window.clearTimeout(doneTimeoutRef.current);

    setPhase("split");
    mergeTimeoutRef.current = window.setTimeout(() => setPhase("merge"), 900);
    doneTimeoutRef.current = window.setTimeout(() => setPhase("done"), 4300);
  };

  return (
    <div className="artwork-effect-shell artwork-effect-shell--portrait">
      <div
        className={`artwork-effect-stage viloria-split-stage phase-${phase}`}
        tabIndex={0}
        onPointerEnter={playTransition}
        onFocus={playTransition}
        aria-label="Hover or focus to merge Viloria artwork's two worlds"
      >
        <ImageWithFallback src={src} alt={alt} className="viloria-base-image" />

        {phase !== "done" && (
          <>
            <img src={src} alt="" aria-hidden="true" className="viloria-half viloria-half-left" />
            <img src={src} alt="" aria-hidden="true" className="viloria-half viloria-half-right" />

            <div className="viloria-collision-seam" aria-hidden="true" />
            <img src={src} alt="" aria-hidden="true" className="viloria-phase-echo viloria-phase-echo-left" />
            <img src={src} alt="" aria-hidden="true" className="viloria-phase-echo viloria-phase-echo-right" />
          </>
        )}

        <span className="artwork-effect-caption">
          {phase === "split" ? "Two worlds" : phase === "merge" ? "Combining" : "Hover to merge"}
        </span>
      </div>
    </div>
  );
};
