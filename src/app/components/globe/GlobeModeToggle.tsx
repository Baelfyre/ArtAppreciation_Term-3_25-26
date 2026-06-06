import type { GlobeMode } from "../../domain/GlobeMode";

interface GlobeModeToggleProps {
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
}

const modes: Array<{ value: GlobeMode; label: string }> = [
  { value: "local", label: "Local" },
  { value: "international", label: "International" },
];

export const GlobeModeToggle = ({ mode, onModeChange }: GlobeModeToggleProps) => {
  const activeCollectionLabel =
    mode === "local" ? "Local Art" : "International Art";

  return (
    <div className="globe-mode-toggle glass-panel curved-card-accent pointer-events-auto w-full max-w-[21rem] overflow-hidden rounded-[1rem] p-2.5 shadow-2xl md:self-start md:rounded-[1.35rem] md:p-3">
      <div className="mb-2 px-1 md:mb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300 md:text-[11px] md:tracking-[0.25em]">
          Art Curation
        </p>
        <p className="mt-1 text-xs font-medium leading-tight text-white md:text-sm">
          {activeCollectionLabel}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 md:gap-2" role="tablist" aria-label="Art curation category">
        {modes.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={mode === item.value}
            aria-pressed={mode === item.value}
            onClick={() => onModeChange(item.value)}
            className={`min-h-11 rounded-xl px-2 py-1.5 text-xs transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] md:px-3 md:py-2 md:text-sm ${
              mode === item.value
                ? "border border-[#f4c430]/70 bg-[linear-gradient(135deg,rgba(244,196,48,0.26),rgba(29,73,216,0.16))] text-white shadow-[0_0_0_1px_rgba(244,196,48,0.22),0_12px_26px_rgba(0,0,0,0.22)]"
                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
