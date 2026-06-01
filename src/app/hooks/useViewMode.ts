import { useCallback, useState } from "react";
import type { GlobeMode } from "../domain/GlobeMode";

export const useViewMode = (initialMode: GlobeMode = "group") => {
  const [mode, setMode] = useState<GlobeMode>(initialMode);

  const selectMode = useCallback((nextMode: GlobeMode) => {
    setMode(nextMode);
  }, []);

  return {
    mode,
    selectMode,
  };
};
