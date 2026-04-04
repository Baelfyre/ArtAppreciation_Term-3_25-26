import React from "react";
import { CATEGORIES } from "../data";

interface FilterSidebarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const FilterSidebar = ({ selectedCategory, onSelectCategory }: FilterSidebarProps) => {
  return (
    <div className="absolute left-6 top-6 z-10 w-64 bg-[#020617]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
      <h3 className="text-white text-sm font-medium tracking-widest uppercase mb-5 opacity-80">
        Filter by Category
      </h3>
      <div className="flex flex-col gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
