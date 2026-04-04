import React from "react";
import { Globe2, Landmark, Fingerprint, MapPin, Compass } from "lucide-react";

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 px-6 w-full border-t border-white/5 bg-gradient-to-b from-[#020617] to-black z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium tracking-widest uppercase mb-6 w-fit">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            Exhibit Overview
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            About the Project
          </h2>
          
          <div className="space-y-6 text-slate-400 font-light leading-relaxed text-lg">
            <p>
              This project maps Filipino arts, artifacts, and cultural heritage found around the world. It highlights not only where these objects are located, but also their <strong className="text-white font-medium">cultural meaning</strong>, historical context, and how <strong className="text-white font-medium">Filipino identity</strong> is represented and appreciated globally.
            </p>
            <p>
              Rather than focusing only on acquisition or ownership, the project emphasizes cultural visibility, preservation, and interpretation. It aims to show how Filipino heritage continues to exist and be valued across different countries.
            </p>
          </div>

          <ul className="mt-8 space-y-4">
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
              <li key={i} className="flex items-center gap-3 text-slate-300 font-light">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-amber-400" />
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Visual Support */}
        <div className="relative aspect-square max-w-[400px] mx-auto lg:ml-auto w-full flex items-center justify-center">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          
          {/* Abstract Orbital Rings */}
          <div className="absolute inset-4 border border-white/5 rounded-full pointer-events-none"></div>
          <div className="absolute inset-12 border border-white/5 rounded-full border-dashed pointer-events-none animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute inset-24 border border-amber-500/10 rounded-full pointer-events-none animate-[spin_40s_linear_infinite_reverse]"></div>

          {/* Center Orb */}
          <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-[#020617] to-slate-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-amber-500/5 blur-md"></div>
            <Globe2 className="w-12 h-12 text-slate-300 stroke-[1.5]" />
          </div>

          {/* Floating Element 1: Top Left */}
          <div className="absolute top-[15%] left-0 md:-left-4 z-20 bg-[#020617]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10 shadow-2xl animate-[bounce_6s_ease-in-out_infinite]">
            <Landmark className="w-6 h-6 text-amber-500" />
          </div>

          {/* Floating Element 2: Bottom Right */}
          <div className="absolute bottom-[20%] right-0 md:-right-4 z-20 bg-[#020617]/80 backdrop-blur-xl p-3.5 rounded-2xl border border-white/10 shadow-2xl animate-[bounce_5s_ease-in-out_infinite_reverse]">
            <Fingerprint className="w-6 h-6 text-blue-400" />
          </div>

          {/* Floating Element 3: Top Right */}
          <div className="absolute top-[25%] right-[5%] z-20 bg-[#020617]/80 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10 shadow-2xl animate-[bounce_7s_ease-in-out_infinite]">
            <MapPin className="w-5 h-5 text-slate-300" />
          </div>
        </div>

      </div>
    </section>
  );
};
