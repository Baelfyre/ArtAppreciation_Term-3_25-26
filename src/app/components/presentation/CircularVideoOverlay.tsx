import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { cn } from "../ui/utils";

interface CircularVideoOverlayProps {
  isOpen: boolean;
  src: string | null;
  title: string;
  volume?: number;
  onClose?: () => void;
  className?: string;
  placeholderLabel?: string;
  playButtonLabel?: string;
  closeLabel?: string;
}

export const CircularVideoOverlay = ({
  isOpen,
  src,
  title,
  volume = 1,
  onClose,
  className,
  placeholderLabel = "Coming soon",
  playButtonLabel = "Play video",
  closeLabel = "Close video",
}: CircularVideoOverlayProps) => {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const clearCloseTimer = () => {
    if (closeTimerRef.current === null) return;
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const getCloseDelayMs = () => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return 180;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 180;
  };

  const requestClose = () => {
    if (!onClose || isClosing) return;

    const video = videoRef.current;
    video?.pause();
    setNeedsManualPlay(false);

    const closeDelayMs = getCloseDelayMs();
    if (closeDelayMs === 0) {
      onClose();
      return;
    }

    setIsClosing(true);
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      setIsClosing(false);
      onClose();
    }, closeDelayMs);
  };

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      return;
    }

    clearCloseTimer();
    setIsClosing(false);
  }, [isOpen]);

  useEffect(() => () => {
    clearCloseTimer();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src || !isOpen) {
      setNeedsManualPlay(false);
      return;
    }

    video.currentTime = 0;
    video.muted = false;
    video.volume = Math.min(Math.max(volume, 0), 1);

    const playPromise = video.play();
    playPromise?.catch(() => {
      setNeedsManualPlay(true);
    });

    return () => {
      video.pause();
      video.currentTime = 0;
      setNeedsManualPlay(false);
    };
  }, [isOpen, src, volume]);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest(".presentation-video-trigger")) {
        return;
      }

      if (!shellRef.current?.contains(event.target as Node)) {
        requestClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [isOpen, onClose, isClosing]);

  const handleManualPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.volume = Math.min(Math.max(volume, 0), 1);
    setNeedsManualPlay(false);
    void video.play().catch(() => {
      setNeedsManualPlay(true);
    });
  };

  const isPlaceholder = !src;
  const isVisible = isOpen && !isClosing;

  return (
    <div
      ref={shellRef}
      className={cn(
        "circular-video-overlay",
        isVisible && "is-open",
        isClosing && "is-closing",
        isPlaceholder && "is-placeholder",
        className,
      )}
      aria-hidden={!isVisible}
    >
      {onClose && isVisible && (
        <button
          type="button"
          onClick={requestClose}
          className="circular-video-overlay__close"
          aria-label={closeLabel}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      <div className="circular-video-overlay__frame">
        {isPlaceholder ? (
          <div className="circular-video-overlay__placeholder">
            <span className="circular-video-overlay__placeholder-icon" aria-hidden="true">
              <Play className="h-5 w-5" />
            </span>
            <span className="circular-video-overlay__placeholder-text">{placeholderLabel}</span>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={src ?? undefined}
              className="circular-video-overlay__video"
              playsInline
              preload="metadata"
              onEnded={requestClose}
            />
            {needsManualPlay && (
              <button
                type="button"
                onClick={handleManualPlay}
                className="circular-video-overlay__manual-play"
                aria-label={playButtonLabel}
              >
                <Play className="h-4 w-4" />
                <span>{playButtonLabel}</span>
              </button>
            )}
          </>
        )}
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
};
