import React from "react";
import { Globe2, Landmark, Fingerprint, MapPin, Compass } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 w-full border-t border-white/5 py-16 md:py-24">
      <div className="section-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col text-center lg:text-left">
          <div className="glass-chip mb-6 inline-flex w-fit items-center gap-2 self-center rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200 md:mb-8 md:px-4 md:text-xs md:tracking-[0.24em] lg:self-start">
            <Compass className="w-3.5 h-3.5 text-[#f4c430]" />
            Exhibit Overview
          </div>
          
          <h2 className="section-title mb-5 text-[clamp(2rem,8vw,3rem)] font-semibold leading-tight text-white md:mb-8 md:text-6xl">
            About the Project
          </h2>
          
          <div className="mx-auto max-w-[42rem] space-y-5 text-base font-light leading-relaxed text-slate-300 md:space-y-8 md:text-xl lg:mx-0">
            <p>
              This project centers on <strong className="font-medium text-white">Filipino Art in This Day and Age</strong>:
              diversity, evolution, and identity. Each artwork uses a different medium and personal
              perspective to show how Filipino creativity continues to adapt in modern life.
            </p>
            <p>
              The exhibit also carries the idea of <strong className="font-medium text-white">Filipino Identity Beyond Borders</strong>.
              Local artworks are mapped to the artists’ places in the Philippines, while the wider
              globe concept shows how Filipino identity can connect across locations, cultures, and
              contemporary digital spaces.
            </p>
          </div>

          <ul className="mt-9 space-y-4 text-left md:mt-12 md:space-y-6">
            {[
              {
                text: <> <strong className="text-white font-medium">Diversity</strong> of modern Filipino art </>,
                icon: Globe2
              },
              {
                text: <> <strong className="text-white font-medium">Evolution</strong> through new mediums </>,
                icon: Landmark
              },
              {
                text: "Art as representation of identity",
                icon: Fingerprint
              },
              {
                text: "Identity beyond borders",
                icon: MapPin
              }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm leading-relaxed text-slate-200 md:gap-4 md:text-base">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#f4c430]/25 bg-[rgba(244,196,48,0.08)] md:h-10 md:w-10">
                  <item.icon className="h-4 w-4 text-[#f4c430]" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Visual Support */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center md:max-w-[480px] lg:ml-auto">
          <div className="absolute inset-0 rounded-full border border-white/6 opacity-40" />
          <div className="absolute inset-[10%] rounded-full border border-white/6 opacity-25" />
          <div className="absolute inset-[22%] rounded-full border border-white/5 border-dashed opacity-40" />
          <div className="absolute inset-[36%] rounded-full border border-[#f4c430]/10 opacity-60" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,73,216,0.06),transparent_62%)]" />

          <div
            className="orbit-spin absolute inset-[3%]"
            style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" }}
          >
            <div className="absolute left-[8%] top-[18%] -translate-x-1/2 -translate-y-1/2">
              <div
                className="orbit-counter"
                style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" }}
              >
                <div className="glass-chip rounded-3xl p-4 shadow-xl">
                  <Landmark className="h-6 w-6 text-[#f4c430]" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="orbit-spin-reverse absolute inset-[11%]"
            style={{ ["--orbit-duration" as "--orbit-duration"]: "20s" }}
          >
            <div className="absolute right-[2%] top-[24%] translate-x-1/2 -translate-y-1/2">
              <div
                className="orbit-counter-reverse"
                style={{ ["--orbit-duration" as "--orbit-duration"]: "20s" }}
              >
                <div className="glass-chip rounded-3xl p-4 shadow-xl">
                  <MapPin className="h-5 w-5 text-[#b9162c]" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="orbit-spin absolute inset-[18%]"
            style={{ ["--orbit-duration" as "--orbit-duration"]: "18s" }}
          >
            <div className="absolute bottom-[8%] right-[7%] translate-x-1/2 translate-y-1/2">
              <div
                className="orbit-counter"
                style={{ ["--orbit-duration" as "--orbit-duration"]: "18s" }}
              >
                <div className="glass-chip rounded-3xl p-4 shadow-xl">
                  <Fingerprint className="h-6 w-6 text-[#1d49d8]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Abstract Orbital Rings */}
          <div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_55%,transparent_100%)] shadow-[0_0_80px_rgba(255,255,255,0.04)]">
            <img
              src="/resources/philippines.svg"
              alt=""
              aria-hidden="true"
              className="philippines-hub-icon h-20 w-20 object-contain opacity-95 md:h-24 md:w-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
