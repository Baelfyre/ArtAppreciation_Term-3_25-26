import React from "react";

const groupMembers = ["Ang, Monica", "Jadloc, Ly-anne", "Ongo, James", "Viloria, Robert"];

export const Footer = () => {
  return (
    <footer className="relative z-10 pb-12 pt-16">
      <div className="group-info-footer glass-panel curved-card-accent section-container relative overflow-hidden rounded-[1.75rem] px-6 py-8 sm:px-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="footer-label mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f4c430]">
              MO-HUM034 Art Appreciation
            </p>
            <h2 className="section-title text-3xl font-semibold text-white md:text-4xl">
              Group Information
            </h2>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-300">
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                Section: <span className="text-white">A1101</span>
              </p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                Group <span className="text-white">15</span>
              </p>
            </div>
          </div>

          <div className="md:min-w-[18rem]">
            <p className="footer-label mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c430]">
              Members
            </p>
            <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-2 md:grid-cols-1">
              {groupMembers.map((member) => (
                <li key={member} className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-5 text-sm font-light text-slate-400">
          Art Appreciation Project | <span className="text-slate-200">Mapping Filipino Cultural Presence Globally</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Interactive 3D Globe Interface &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
