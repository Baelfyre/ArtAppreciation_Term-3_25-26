import { Clapperboard, Map, Music2, Palette, Shapes } from "lucide-react";

const routeItems = [
  {
    title: "Negros Occidental",
    detail: "Painting and mixed media",
    icon: Palette,
  },
  {
    title: "Davao",
    detail: "Public sculpture",
    icon: Shapes,
  },
  {
    title: "Modern OPM",
    detail: "Music",
    icon: Music2,
  },
  {
    title: "Philippine Cinema",
    detail: "Film",
    icon: Clapperboard,
  },
];

export const ProposedGalleryOverview = () => (
  <section id="gallery-map" className="relative z-10 py-14 md:py-20">
    <div className="gallery-section">
      <div className="glass-panel curved-card-accent overflow-hidden rounded-[1.5rem] p-5 md:rounded-[2rem] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
          <div>
            <span className="glass-chip-warm mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-[#f4c430]">
              <Map className="h-4 w-4" />
              Proposed Gallery Content
            </span>
            <h2 className="section-title text-3xl font-semibold leading-tight text-white md:text-4xl">
              The Proposed Gallery Map
            </h2>
            <p className="mt-4 max-w-[38rem] text-base font-light leading-relaxed text-slate-300 md:text-lg">
              This proposed gallery content shows how Filipino art today continues to express
              identity, values, region, family, community, and creative change through different
              local art forms.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {routeItems.map(({ title, detail, icon: Icon }, index) => (
              <article
                key={title}
                className="gallery-route-card rounded-[1.1rem] border border-white/10 bg-white/[0.045] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="glass-chip-warm flex h-9 w-9 items-center justify-center rounded-full">
                    <Icon className="h-4 w-4 text-[#f4c430]" />
                  </span>
                  <span className="text-xs font-medium text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="section-title text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-300">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
