import React from "react";

const groupMembers = ["Ang, Monica", "Jadloc, Ly-anne", "Ongo, James", "Viloria, Robert"];

export const Footer = () => {
  return (
    <section id="group-information" className="relative z-10 py-10 md:py-12">
      <div className="group-info-footer glass-panel curved-card-accent section-container relative overflow-hidden rounded-[1.35rem] px-5 py-6 sm:px-6">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="footer-label mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f4c430]">
              MO-HUM034 Art Appreciation
            </p>
            <h2 className="section-title text-2xl font-semibold text-white md:text-3xl">
              Group Information
            </h2>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                Course: <span className="text-white">MO-HUM034</span>
              </p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                Section: <span className="text-white">A1101</span>
              </p>
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                Group <span className="text-white">15</span>
              </p>
            </div>
          </div>

          <div className="md:min-w-[20rem]">
            <p className="footer-label mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4c430]">
              Members
            </p>
            <ul className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
              {groupMembers.map((member) => (
                <li key={member} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-5 border-t border-white/10 pt-4 text-xs font-light leading-relaxed text-slate-400">
          Art Appreciation Project | <span className="text-slate-200">Mapping Filipino Cultural Presence Globally</span>
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          Interactive 3D Globe Interface &copy; {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};
