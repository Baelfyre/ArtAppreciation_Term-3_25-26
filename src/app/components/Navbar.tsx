import React from "react";
import { Compass } from "lucide-react";

export const Navbar = () => {
  const navItems = [
    { href: "#", label: "Home" },
    { href: "#featured", label: "Featured" },
    { href: "#globe", label: "Globe", accent: true },
    { href: "#local-curation", label: "Local Art" },
    { href: "#filipino-art-abroad", label: "Art Abroad" },
    { href: "#about", label: "About" },
    { href: "#sources", label: "Sources" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3 text-white md:gap-4">
          <div className="glass-chip-warm flex h-9 w-9 shrink-0 items-center justify-center rounded-full md:h-10 md:w-10">
            <Compass className="h-4.5 w-4.5 text-[#f4c430] md:h-5 md:w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[9px] uppercase tracking-[0.18em] text-slate-300/80 md:text-[10px] md:tracking-[0.35em]">
              Contemporary Filipino art
            </p>
            <span className="section-title block truncate text-sm tracking-wide md:text-base">
              Identity Beyond Borders
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-1 text-xs text-slate-200/85 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`min-h-11 rounded-full px-3 py-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] ${
                item.accent
                  ? "glass-chip-warm text-white"
                  : "glass-chip hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
