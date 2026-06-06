import { Compass, Fingerprint, Globe2, Landmark, MapPin } from "lucide-react";

const aboutPoints = [
  { text: "Diversity of modern Filipino art", icon: Globe2 },
  { text: "Evolution through new mediums", icon: Landmark },
  { text: "Art as representation of identity", icon: Fingerprint },
  { text: "Identity beyond borders", icon: MapPin },
];

export const AboutSection = () => (
  <section id="about" className="relative z-10 w-full border-t border-white/5 py-12 md:py-16">
    <div className="section-container grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
      <div className="max-w-[44rem]">
        <div className="glass-chip mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200">
          <Compass className="h-3.5 w-3.5 text-[#f4c430]" />
          Exhibit Overview
        </div>

        <h2 className="section-title text-[clamp(2rem,7vw,3rem)] font-semibold leading-tight text-white">
          About the Project
        </h2>

        <p className="mt-4 max-w-[42rem] text-base font-light leading-[1.65] text-slate-300">
          This project curates Filipino art in this day and age through group artworks, local art
          research, and international exhibit connections. It presents how Filipino creativity
          continues to evolve through personal stories, regional identity, family values, and new
          artistic mediums.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {aboutPoints.map(({ text, icon: Icon }) => (
            <li
              key={text}
              className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-slate-200"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#f4c430]" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="identity-hub compact-identity-hub relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/8 bg-[radial-gradient(circle_at_center,rgba(29,73,216,0.12),transparent_65%)]" />
        <div className="absolute inset-[12%] rounded-full border border-dashed border-[#f4c430]/20" />
        <div className="absolute inset-[28%] rounded-full border border-white/8" />
        <img
          src="/resources/philippines.svg"
          alt=""
          aria-hidden="true"
          className="philippines-hub-icon relative z-10 h-32 w-32 object-contain opacity-95"
        />
      </div>
    </div>
  </section>
);
