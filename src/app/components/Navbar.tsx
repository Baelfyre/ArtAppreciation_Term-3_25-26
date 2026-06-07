import { useState } from "react";
import { Compass, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { href: "#", label: "Home" },
    { href: "#featured", label: "Featured" },
    { href: "#globe", label: "Globe", accent: true },
    { href: "#about", label: "About" },
    { href: "#group-information", label: "Group" },
    { href: "#sources", label: "Sources" },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div className="glass-panel navbar-shell mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
        <a
          href="#"
          className="flex min-w-0 items-center gap-3 text-white md:gap-4"
          onClick={() => setIsMenuOpen(false)}
        >
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
        </a>

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

        <button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="glass-chip navbar-menu-toggle ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] lg:hidden"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="navbar-mobile-menu glass-panel mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-2 rounded-[1.25rem] p-3 text-sm text-slate-200/90 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-full px-3 py-2.5 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c430] ${
                item.accent
                  ? "glass-chip-warm text-white"
                  : "glass-chip hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
