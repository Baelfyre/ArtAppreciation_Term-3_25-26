import { useEffect, useMemo, useRef, useState } from "react";

const SOURCE_WIDTH = 1635;
const SOURCE_HEIGHT = 1556;
const SOURCE_CELL_SIZE = 8;
const STRIPE_COUNT = Math.round(SOURCE_WIDTH / SOURCE_CELL_SIZE);
const SOURCE_RATIO = SOURCE_WIDTH / SOURCE_HEIGHT;

interface PixelAcrossBordersRevealProps {
  src: string;
  alt: string;
}

interface StageSize {
  width: number;
  height: number;
}

export const PixelAcrossBordersReveal = ({ src, alt }: PixelAcrossBordersRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const playTimeoutRef = useRef<number | null>(null);
  const [stageSize, setStageSize] = useState<StageSize>({ width: 0, height: 0 });
  const [playKey, setPlayKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const stripeDelays = useMemo(
    () =>
      Array.from({ length: STRIPE_COUNT }, (_, index) => {
        const progress = index / Math.max(STRIPE_COUNT - 1, 1);
        const wave = Math.sin(progress * Math.PI * 2.6) * 0.08;
        return Math.max(0, progress * 1.15 + wave);
      }),
    [],
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateStageSize = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      const availableWidth = Math.max(width - 32, 0);
      const availableHeight = Math.max(height - 32, 0);

      if (!availableWidth || !availableHeight) {
        setStageSize({ width: 0, height: 0 });
        return;
      }

      const containerRatio = availableWidth / availableHeight;
      if (containerRatio > SOURCE_RATIO) {
        const nextHeight = availableHeight;
        setStageSize({ width: nextHeight * SOURCE_RATIO, height: nextHeight });
      } else {
        const nextWidth = availableWidth;
        setStageSize({ width: nextWidth, height: nextWidth / SOURCE_RATIO });
      }
    };

    updateStageSize();
    const observer = new ResizeObserver(updateStageSize);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (playTimeoutRef.current !== null) {
        window.clearTimeout(playTimeoutRef.current);
      }
    };
  }, []);

  const playReveal = () => {
    if (playTimeoutRef.current !== null) {
      window.clearTimeout(playTimeoutRef.current);
    }

    setPlayKey((current) => current + 1);
    setIsPlaying(true);
    playTimeoutRef.current = window.setTimeout(() => setIsPlaying(false), 4400);
  };

  return (
    <div ref={wrapperRef} className="pixel-across-reveal">
      <div
        className="pixel-across-reveal-stage"
        tabIndex={0}
        onPointerEnter={playReveal}
        onFocus={playReveal}
        aria-label="Hover or focus to reveal Pixel Across Borders with vertical blinds"
        style={{
          width: stageSize.width ? `${stageSize.width}px` : "100%",
          height: stageSize.height ? `${stageSize.height}px` : "100%",
        }}
      >
        <img src={src} alt={alt} className="pixel-across-reveal-image" />

        {isPlaying && (
          <div key={playKey} className="pixel-across-reveal-blinds" aria-hidden="true">
            {stripeDelays.map((delay, index) => (
              <span
                key={index}
                className="pixel-across-reveal-stripe"
                style={{
                  left: `${(index / STRIPE_COUNT) * 100}%`,
                  width: `${100 / STRIPE_COUNT + 0.02}%`,
                  animationDelay: `${delay.toFixed(3)}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="pixel-across-reveal-caption" aria-hidden="true">
          {isPlaying ? "Vertical blinds reveal" : "Hover to reveal"}
        </div>
      </div>
    </div>
  );
};
