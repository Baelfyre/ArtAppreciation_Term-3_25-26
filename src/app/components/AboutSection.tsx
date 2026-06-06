import React from "react";
import { Globe2, Landmark, Fingerprint, MapPin, Compass } from "lucide-react";

const hubParticles = [
  { left: 18, top: 16, size: "0.1rem", duration: "28s", delay: "-4s", x: "10px", y: "-12px" },
  { left: 36, top: 9, size: "0.12rem", duration: "34s", delay: "-11s", x: "-8px", y: "14px" },
  { left: 69, top: 13, size: "0.11rem", duration: "30s", delay: "-17s", x: "12px", y: "10px" },
  { left: 84, top: 35, size: "0.16rem", duration: "38s", delay: "-6s", x: "-14px", y: "8px" },
  { left: 78, top: 64, size: "0.1rem", duration: "32s", delay: "-19s", x: "8px", y: "-13px" },
  { left: 57, top: 85, size: "0.14rem", duration: "36s", delay: "-9s", x: "-10px", y: "-8px" },
  { left: 29, top: 82, size: "0.1rem", duration: "29s", delay: "-15s", x: "13px", y: "8px" },
  { left: 13, top: 59, size: "0.13rem", duration: "35s", delay: "-3s", x: "-8px", y: "-12px" },
  { left: 24, top: 42, size: "0.09rem", duration: "31s", delay: "-21s", x: "8px", y: "12px" },
  { left: 45, top: 27, size: "0.11rem", duration: "39s", delay: "-13s", x: "-12px", y: "8px" },
  { left: 63, top: 45, size: "0.1rem", duration: "33s", delay: "-7s", x: "9px", y: "-11px" },
  { left: 43, top: 68, size: "0.12rem", duration: "37s", delay: "-24s", x: "-9px", y: "10px" },
];

const orbitalParticles = [
  { inset: "13%", tone: "gold", duration: "28s", delay: "-5s", reverse: false },
  { inset: "19%", tone: "blue", duration: "34s", delay: "-14s", reverse: true },
  { inset: "26%", tone: "warm", duration: "24s", delay: "-8s", reverse: false },
  { inset: "34%", tone: "white", duration: "38s", delay: "-18s", reverse: true },
  { inset: "8%", tone: "red", duration: "40s", delay: "-28s", reverse: false },
  { inset: "42%", tone: "gold", duration: "31s", delay: "-20s", reverse: true },
];

const connectionArcs = [
  {
    className: "identity-arc identity-arc--gold",
    d: "M50 50 C64 38 75 27 86 24",
    delay: "-3s",
    duration: "26s",
  },
  {
    className: "identity-arc identity-arc--blue",
    d: "M50 50 C33 40 23 31 13 27",
    delay: "-10s",
    duration: "32s",
  },
  {
    className: "identity-arc identity-arc--red",
    d: "M50 50 C63 58 72 68 82 76",
    delay: "-18s",
    duration: "34s",
  },
  {
    className: "identity-arc identity-arc--white",
    d: "M50 50 C39 61 29 70 18 78",
    delay: "-7s",
    duration: "29s",
  },
];

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
            Gallery Synthesis
          </h2>
          
          <div className="mx-auto max-w-[42rem] space-y-5 text-base font-light leading-relaxed text-slate-300 md:space-y-8 md:text-xl lg:mx-0">
            <p>
              This proposed gallery centers on <strong className="font-medium text-white">Filipino Art at This Day and Age</strong>.
              Each selected work uses a different art form to show how Filipino creativity continues
              to express place, values, community, and change.
            </p>
            <p>
              Local art helps us see that Filipino identity is still being shaped through place,
              memory, values, and creative expression.
            </p>
          </div>

          <ul className="mt-9 space-y-4 text-left md:mt-12 md:space-y-6">
            {[
              {
                text: <> <strong className="text-white font-medium">Regional identity</strong> through local stories </>,
                icon: Globe2
              },
              {
                text: <> <strong className="text-white font-medium">Creative change</strong> across art forms </>,
                icon: Landmark
              },
              {
                text: "Family and community values",
                icon: Fingerprint
              },
              {
                text: "Place, memory, and expression",
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
        <div className="identity-hub relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center md:max-w-[480px] lg:ml-auto">
          <div className="identity-starfield absolute inset-0" aria-hidden="true">
            {hubParticles.map((particle, index) => (
              <span
                key={index}
                className="identity-star"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  width: particle.size,
                  height: particle.size,
                  ["--particle-duration" as "--particle-duration"]: particle.duration,
                  ["--particle-delay" as "--particle-delay"]: particle.delay,
                  ["--particle-x" as "--particle-x"]: particle.x,
                  ["--particle-y" as "--particle-y"]: particle.y,
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 rounded-full border border-white/6 opacity-40" />
          <div className="absolute inset-[10%] rounded-full border border-white/6 opacity-25" />
          <div className="absolute inset-[22%] rounded-full border border-white/5 border-dashed opacity-40" />
          <div className="absolute inset-[36%] rounded-full border border-[#f4c430]/10 opacity-60" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(29,73,216,0.06),transparent_62%)]" />

          <svg
            className="identity-connection-arcs absolute inset-[4%] z-[4]"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            {connectionArcs.map((arc, index) => (
              <g key={index}>
                <path className={arc.className} d={arc.d} pathLength="1" vectorEffect="non-scaling-stroke" />
                <circle className={`${arc.className} identity-travel-light`} r="0.62">
                  <animateMotion dur={arc.duration} begin={arc.delay} repeatCount="indefinite" path={arc.d} />
                </circle>
              </g>
            ))}
          </svg>

          {orbitalParticles.map((particle, index) => (
            <div
              key={index}
              className={`identity-particle-orbit absolute ${particle.reverse ? "orbit-spin-reverse" : "orbit-spin"}`}
              style={{
                inset: particle.inset,
                ["--orbit-duration" as "--orbit-duration"]: particle.duration,
                animationDelay: particle.delay,
              }}
              aria-hidden="true"
            >
              <span className={`identity-orbit-dot identity-orbit-dot--${particle.tone}`} />
            </div>
          ))}

          <div
            className="orbit-spin absolute inset-[3%]"
            style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" }}
          >
            <div className="absolute left-[8%] top-[18%] -translate-x-1/2 -translate-y-1/2">
              <div
                className="orbit-counter"
                style={{ ["--orbit-duration" as "--orbit-duration"]: "24s" }}
              >
                <div
                  className="identity-support-icon glass-chip rounded-2xl shadow-xl"
                  style={{ ["--float-duration" as "--float-duration"]: "6.5s", animationDelay: "-1s" }}
                >
                  <Landmark className="h-5 w-5 text-[#f4c430]" />
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
                <div
                  className="identity-support-icon glass-chip rounded-2xl shadow-xl"
                  style={{ ["--float-duration" as "--float-duration"]: "7.25s", animationDelay: "-2.6s" }}
                >
                  <MapPin className="h-[1.15rem] w-[1.15rem] text-[#b9162c]" />
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
                <div
                  className="identity-support-icon glass-chip rounded-2xl shadow-xl"
                  style={{ ["--float-duration" as "--float-duration"]: "8s", animationDelay: "-4s" }}
                >
                  <Fingerprint className="h-5 w-5 text-[#1d49d8]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Abstract Orbital Rings */}
          <div className="identity-core relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_55%,transparent_100%)] shadow-[0_0_80px_rgba(255,255,255,0.04)] md:h-52 md:w-52">
            <div className="identity-core-glow absolute inset-[12%] rounded-full" aria-hidden="true" />
            <img
              src="/resources/philippines.svg"
              alt=""
              aria-hidden="true"
              className="philippines-hub-icon relative z-10 h-32 w-32 object-contain opacity-95 md:h-40 md:w-40"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
