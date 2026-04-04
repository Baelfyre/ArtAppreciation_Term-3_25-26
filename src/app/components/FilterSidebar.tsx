import React from "react";
import { CATEGORIES } from "../data";

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const FilterSidebar = ({ selectedCategory, onSelectCategory }: FilterSidebarProps) => {
  return (
    <div className="glass-panel absolute left-4 top-4 z-10 w-[min(18rem,calc(100%-2rem))] rounded-[1.5rem] p-5 shadow-2xl md:left-6 md:top-6 md:w-72">
      <div className="flag-accent absolute inset-x-0 top-0 h-px" />
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium uppercase tracking-widest text-white/90">
          Filter by Category
        </h3>
        <span className="glass-chip rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-200">
          {CATEGORIES.length - 1} types
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-[linear-gradient(135deg,rgba(244,196,48,0.22),rgba(29,73,216,0.18))] border border-white/[0.18] text-white font-medium shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
                : "border border-transparent text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
