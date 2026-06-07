import { type CSSProperties } from "react";
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

      <div className="relative mx-auto flex aspect-square w-full max-w-[15rem] items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/6 opacity-40" />
        <div className="absolute inset-[10%] rounded-full border border-white/6 opacity-25" />
        <div className="absolute inset-[22%] rounded-full border border-white/5 border-dashed opacity-40" />
        <div className="absolute inset-[36%] rounded-full border border-[#f4c430]/10 opacity-60" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,73,216,0.06),transparent_62%)]" />

        <div
          className="orbit-spin absolute inset-[3%]"
          style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" } as CSSProperties}
        >
          <div className="absolute left-[8%] top-[18%] -translate-x-1/2 -translate-y-1/2">
            <div className="orbit-counter" style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" } as CSSProperties}>
              <div className="glass-chip rounded-3xl p-4 shadow-xl">
                <Landmark className="h-6 w-6 text-[#f4c430]" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="orbit-spin-reverse absolute inset-[11%]"
          style={{ ["--orbit-duration" as "--orbit-duration"]: "20s" } as CSSProperties}
        >
          <div className="absolute right-[2%] top-[24%] translate-x-1/2 -translate-y-1/2">
            <div className="orbit-counter-reverse" style={{ ["--orbit-duration" as "--orbit-duration"]: "20s" } as CSSProperties}>
              <div className="glass-chip rounded-3xl p-4 shadow-xl">
                <MapPin className="h-5 w-5 text-[#b9162c]" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="orbit-spin absolute inset-[18%]"
          style={{ ["--orbit-duration" as "--orbit-duration"]: "18s" } as CSSProperties}
        >
          <div className="absolute bottom-[8%] right-[7%] translate-x-1/2 translate-y-1/2">
            <div className="orbit-counter" style={{ ["--orbit-duration" as "--orbit-duration"]: "18s" } as CSSProperties}>
              <div className="glass-chip rounded-3xl p-4 shadow-xl">
                <Fingerprint className="h-6 w-6 text-[#1d49d8]" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_55%,transparent_100%)] shadow-[0_0_80px_rgba(255,255,255,0.04)]">
          <Globe2 className="h-14 w-14 text-slate-100 stroke-[1.5]" />
        </div>
      </div>
    </div>
  </section>
);
