import React from 'react';
import { ArrowUpRight, Building2, CheckCircle2, HeartHandshake, Leaf, PackageCheck, Sparkles, Users } from 'lucide-react';

const highlights = [
  { icon: Leaf, title: 'Eco-conscious', text: 'Paper-first packaging designed for businesses looking for more responsible alternatives.' },
  { icon: PackageCheck, title: 'Business-ready', text: 'Practical formats across bottles, plates, bowls, food boxes, napkins and honeycomb rolls.' },
  { icon: Building2, title: 'B2B focused', text: 'Clear sizes, MOQs and customer pricing built around real business ordering needs.' },
  { icon: HeartHandshake, title: 'Direct support', text: 'A simple path from product selection to bulk enquiry and custom-printing discussion.' },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-wink-ivory-200 py-20 sm:py-24 paper-texture">
      <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-wink-green-mint/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-wink-kraft-light/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 scroll-reveal">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-wink-green/20 bg-wink-green-mint px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-wink-green-deep shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About WINKSPLIT</span>
            </div>

            <h2 className="max-w-3xl font-serif text-4xl font-extrabold leading-[1.05] tracking-tight text-wink-green-deep sm:text-5xl lg:text-6xl">
              Better packaging for the businesses shaping tomorrow.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-wink-charcoal-light sm:text-lg">
              <strong className="text-wink-green-deep">WINKSPLIT</strong> is an Indian eco-friendly paper packaging brand focused on making sustainable packaging easier to source for modern businesses.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-wink-charcoal-muted sm:text-base">
              From everyday food-service packaging to bulk requirements and custom-printing conversations, WINKSPLIT brings product choice, transparent customer pricing and a straightforward B2B ordering experience into one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-wink-green-deep">
              {['Paper packaging', 'Bulk orders', 'Custom printing', 'B2B supply'].map((item) => (
                <span key={item} className="rounded-full border border-wink-kraft-light bg-white/80 px-4 py-2 shadow-paper-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 scroll-reveal">
            <div className="card-3d relative rounded-[2rem] border-2 border-wink-kraft-light/50 bg-white/90 p-6 shadow-paper-xl backdrop-blur-sm sm:p-8">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-wink-green">Our approach</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-wink-green-deep sm:text-3xl">Simple. Sustainable. Business-focused.</h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-wink-green-deep text-wink-kraft-gold shadow-lg">
                  <Leaf className="h-6 w-6" />
                </div>
              </div>

              <div className="space-y-3">
                {highlights.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="group rounded-2xl border border-wink-kraft-light/50 bg-wink-ivory-100/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-paper-md">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-wink-green-mint text-wink-green">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-wink-green-deep">{title}</h4>
                        <p className="mt-1 text-xs leading-5 text-wink-charcoal-muted">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-between border-t border-wink-kraft-light/40 pt-5">
                <div className="flex items-center gap-2 text-xs font-bold text-wink-charcoal">
                  <Users className="h-4 w-4 text-wink-green" />
                  <span>Built for growing Indian businesses</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-wink-green" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 scroll-reveal">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={`bottom-${title}`} className="rounded-3xl border border-wink-kraft-light/50 bg-white/75 p-5 shadow-paper-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-paper-md">
              <Icon className="h-5 w-5 text-wink-green" />
              <h4 className="mt-4 text-sm font-bold text-wink-green-deep">{title}</h4>
              <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-wink-charcoal-muted">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-wink-green" />
                <span>{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
