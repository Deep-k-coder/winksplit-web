import React from 'react';
import { Leaf, Truck, Printer, IndianRupee, ShieldCheck, Sparkles, Award } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustPillars = [
    {
      title: '100% Eco-Friendly',
      subtitle: 'Zero Plastic & Backyard Compostable',
      description: 'Engineered from unbleached virgin and bamboo kraft fibers certified for natural composting and food safety.',
      icon: Leaf,
      badge: 'Zero Plastic',
      accentColor: 'text-wink-green',
      bgColor: 'bg-wink-green-mint',
    },
    {
      title: 'Bulk Supply Logistics',
      subtitle: 'High-Volume Production Dispatch',
      description: 'Pan-India scheduled pallet and container shipments with 24–48h dispatch from our Surat fulfillment hub.',
      icon: Truck,
      badge: 'Pan-India',
      accentColor: 'text-wink-kraft-dark',
      bgColor: 'bg-amber-100/60',
    },
    {
      title: 'Custom Brand Printing',
      subtitle: 'Food-Safe HD Ink Artwork',
      description: 'Certified food-contact inks with precision logo stamping, custom sleeve wrap, and custom packaging boxes.',
      icon: Printer,
      badge: 'Brand Ready',
      accentColor: 'text-emerald-700',
      bgColor: 'bg-emerald-100/60',
    },
    {
      title: 'Direct B2B Pricing',
      subtitle: 'Direct Factory Selling Rates',
      description: 'Transparent selling prices with clear MOQs, bulk discounts, and 100% GST input tax credit invoicing.',
      icon: IndianRupee,
      badge: 'Direct Rates',
      accentColor: 'text-wink-green-deep',
      bgColor: 'bg-wink-ivory-300',
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white/80 border-y border-wink-kraft-light/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-wink-ivory-200 border border-wink-kraft/30 text-wink-kraft-dark text-[11px] font-bold uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-wink-kraft-gold" />
            <span>Built For Food & Retail Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-wink-green-deep font-serif">
            Packaging designed for modern Indian businesses.
          </h2>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white/90 rounded-3xl p-6 border-2 border-wink-kraft-light/30 shadow-paper-sm hover:shadow-paper-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-wink-green/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${pillar.bgColor} flex items-center justify-center shadow-inner transition-transform group-hover:scale-110`}>
                      <Icon className={`w-6 h-6 ${pillar.accentColor}`} />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-wink-ivory-200 text-wink-charcoal border border-wink-kraft-light/30">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-wink-green-deep mb-0.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-wink-kraft-dark mb-2">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-wink-charcoal-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-wink-kraft-light/20 flex items-center gap-1.5 text-[11px] font-bold text-wink-green">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>WINKSPLIT Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
