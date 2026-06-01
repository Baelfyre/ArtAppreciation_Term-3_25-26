import type { GlobeMode } from "../../domain/GlobeMode";

interface GlobeModeToggleProps {
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
}

const modes: Array<{
  value: GlobeMode;
  mobileLabel: string;
  desktopLabel: string;
}> = [
  { value: "group", mobileLabel: "Group Art", desktopLabel: "Group Members' Art" },
  { value: "local", mobileLabel: "Local Art", desktopLabel: "Local Art" },
  { value: "international", mobileLabel: "International", desktopLabel: "International Art" },
];

export const GlobeModeToggle = ({ mode, onModeChange }: GlobeModeToggleProps) => {
  const activeCollectionLabel =
    modes.find((item) => item.value === mode)?.desktopLabel ?? "Art Curation";

  return (
    <div className="glass-panel curved-card-accent pointer-events-auto absolute left-1/2 top-3 z-20 w-[calc(100%-1.5rem)] max-w-[28rem] -translate-x-1/2 overflow-hidden rounded-[1rem] p-2.5 shadow-2xl md:left-6 md:top-6 md:w-[min(28rem,calc(100%-3rem))] md:translate-x-0 md:rounded-[1.35rem] md:p-3">
      <div className="mb-2 px-1 md:mb-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300 md:text-[11px] md:tracking-[0.25em]">
          Art Curation
        </p>
        <p className="mt-1 text-xs font-medium leading-tight text-white md:text-sm">
          {activeCollectionLabel}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-1.5 md:gap-2" role="tablist" aria-label="Art curation category">
        {modes.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={mode === item.value}
            aria-pressed={mode === item.value}
            onClick={() => onModeChange(item.value)}
            className={`rounded-xl px-1.5 py-1.5 text-[11px] transition-all duration-300 md:px-3 md:py-2 md:text-sm ${
              mode === item.value
                ? "border border-[#f4c430]/70 bg-[linear-gradient(135deg,rgba(244,196,48,0.26),rgba(29,73,216,0.16))] text-white shadow-[0_0_0_1px_rgba(244,196,48,0.22),0_12px_26px_rgba(0,0,0,0.22)]"
                : "border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <span className="md:hidden">{item.mobileLabel}</span>
            <span className="hidden md:inline">{item.desktopLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
