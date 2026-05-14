import { useCallback, useState } from "react";
import type { Artwork } from "../domain/Artwork";

export const useArtworkSelection = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const selectArtwork = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedArtwork(null);
  }, []);

  return {
    selectedArtwork,
    selectArtwork,
    clearSelection,
  };
};
