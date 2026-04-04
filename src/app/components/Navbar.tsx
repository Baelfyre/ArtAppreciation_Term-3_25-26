import React from "react";
import { Compass } from "lucide-react";

export const Navbar = () => {
  const navItems = [
    { href: "#", label: "Home" },
    { href: "#featured", label: "Featured" },
    { href: "#globe", label: "Globe", accent: true },
    { href: "#about", label: "About" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 md:px-6">
        <div className="flex items-center gap-4 text-white">
          <div className="glass-chip-warm flex h-10 w-10 items-center justify-center rounded-full">
            <Compass className="h-5 w-5 text-[#f4c430]" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300/80">
              Interactive atlas
            </p>
            <span className="section-title text-sm tracking-wide md:text-base">
              Mapping Filipino Heritage Abroad
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-200/85 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 transition-all duration-300 ${
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
