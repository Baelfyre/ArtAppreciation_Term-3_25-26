import { useEffect, type RefObject } from "react";
import type { Artwork } from "../domain/Artwork";
import type { GlobeMode } from "../domain/GlobeMode";
import { getGlobePointOfView } from "../services/mapNavigationService";

interface UseGlobeNavigationOptions {
  mode: GlobeMode;
  selectedArtwork: Artwork | null;
  isReady: boolean;
}

export const useGlobeNavigation = (
  globeRef: RefObject<any>,
  { mode, selectedArtwork, isReady }: UseGlobeNavigationOptions,
) => {
  useEffect(() => {
    if (!globeRef.current || !isReady) return;

    const controls = globeRef.current.controls();
    const view = getGlobePointOfView(mode, selectedArtwork);

    controls.autoRotate = mode === "international" && !selectedArtwork;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    globeRef.current.pointOfView(view, 1300);
  }, [globeRef, isReady, mode, selectedArtwork]);
};
