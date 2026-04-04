import React from "react";
import { Globe2, Landmark, Fingerprint, MapPin, Compass } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="relative z-10 w-full border-t border-white/5 px-6 py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col">
          <div className="glass-chip mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-200">
            <Compass className="w-3.5 h-3.5 text-[#f4c430]" />
            Exhibit Overview
          </div>
          
          <h2 className="section-title mb-8 text-4xl font-semibold text-white md:text-6xl">
            About the Project
          </h2>
          
          <div className="space-y-8 text-xl font-light leading-relaxed text-slate-300">
            <p>
              This project weaves together a global tapestry of Filipino arts, artifacts, and
              cultural heritage found around the world. It highlights not only where these objects
              are located, but also their <strong className="font-medium text-white">cultural meaning</strong>,
              historical context, and how <strong className="font-medium text-white">Filipino identity</strong>{" "}
              is represented and appreciated globally.
            </p>
            <p>
              Rather than focusing only on acquisition or ownership, the project emphasizes
              cultural visibility, preservation, and interpretation. It aims to show how Filipino
              heritage continues to exist and be valued across different countries.
            </p>
          </div>

          <ul className="mt-12 space-y-6">
            {[
              {
                text: <> <strong className="text-white font-medium">Global presence</strong> of Filipino culture </>,
                icon: Globe2
              },
              {
                text: <> <strong className="text-white font-medium">Cultural meaning</strong> and interpretation </>,
                icon: Landmark
              },
              {
                text: "Art as representation of identity",
                icon: Fingerprint
              },
              {
                text: "Appreciation across borders",
                icon: MapPin
              }
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-slate-200">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#f4c430]/25 bg-[rgba(244,196,48,0.08)]">
                  <item.icon className="h-4 w-4 text-[#f4c430]" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Visual Support */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center lg:ml-auto">
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
            <Globe2 className="h-14 w-14 text-slate-100 stroke-[1.5]" />
          </div>
        </div>
      </div>
    </section>
  );
};
