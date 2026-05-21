import type { GlobeMode } from "../../domain/GlobeMode";

interface GlobeModeToggleProps {
  mode: GlobeMode;
  onModeChange: (mode: GlobeMode) => void;
}

const modes: Array<{ value: GlobeMode; label: string }> = [
  { value: "international", label: "International" },
  { value: "local", label: "Local" },
];

export const GlobeModeToggle = ({ mode, onModeChange }: GlobeModeToggleProps) => {
  return (
    <div className="glass-panel pointer-events-auto absolute left-4 top-4 z-20 w-[min(21rem,calc(100%-2rem))] rounded-[1.35rem] p-3 shadow-2xl md:left-6 md:top-6">
      <div className="flag-accent absolute inset-x-0 top-0 h-px" />
      <div className="mb-3 px-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-300">
          Filipino Art Today
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Atlas view">
        {modes.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={mode === item.value}
            aria-pressed={mode === item.value}
            onClick={() => onModeChange(item.value)}
            className={`rounded-xl px-3 py-2 text-sm transition-all duration-300 ${
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
