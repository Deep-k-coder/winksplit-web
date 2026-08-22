import React from 'react';
import { 
  Award, IndianRupee, Grid3X3, Palette, Truck, Headphones, 
  Sparkles, ShieldCheck, Check
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      title: 'Premium Quality Materials',
      description: 'Manufactured with high-GSM unbleached virgin kraft paperboard. 100% leak-proof, grease-resistant, and rigid enough for hot curries and heavy meals.',
      icon: Award,
      accent: 'bg-emerald-100 text-emerald-800',
    },
    {
      title: 'Direct Manufacturer Rates',
      description: 'Transparent selling prices with clear MOQs and full GST invoicing. No middlemen commissions or hidden freight markups.',
      icon: IndianRupee,
      accent: 'bg-amber-100 text-amber-800',
    },
    {
      title: 'Comprehensive Size Options',
      description: 'Multiple portion sizes across Paper Bottles, Plates, Kraft Bowls, Takeaway Food Boxes, Napkins, and Honeycomb Paper Rolls.',
      icon: Grid3X3,
      accent: 'bg-blue-100 text-blue-800',
    },
    {
      title: 'Custom Brand Printing',
      description: 'High-definition food-grade ink printing. Precision logo stamping, custom packaging boxes, and artwork support for restaurants and cafés.',
      icon: Palette,
      accent: 'bg-purple-100 text-purple-800',
    },
    {
      title: 'Pan-India Bulk Logistics',
      description: 'Centralized fulfillment hub in Surat, Gujarat with rapid express dispatch. Pallet, container, and recurring monthly scheduled deliveries.',
      icon: Truck,
      accent: 'bg-orange-100 text-orange-800',
    },
    {
      title: 'Unified Phone & WhatsApp Desk',
      description: 'Single direct helpline on Phone & WhatsApp (+91 84016 95003), sample testing boxes, custom size consultations, and fast quote responses.',
      icon: Headphones,
      accent: 'bg-teal-100 text-teal-800',
    },
  ];

  return (
    <section className="py-20 bg-wink-ivory-100 relative paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-wink-green/20">
            <Sparkles className="w-3.5 h-3.5 text-wink-kraft-gold" />
            <span>The WINKSPLIT Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-4">
            Why Indian Businesses Choose WINKSPLIT
          </h2>
          <p className="text-base sm:text-lg text-wink-charcoal-light font-normal">
            Trusted by 500+ restaurants, cafés, caterers, and retail brands across India for uncompromising packaging quality.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal-stagger">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-8 border-2 border-wink-kraft-light/30 shadow-paper-md hover:shadow-paper-xl transition-all duration-300 card-3d flex flex-col justify-between hover:border-wink-green/40 group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${f.accent} flex items-center justify-center mb-6 shadow-inner transition-transform group-hover:scale-110`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-wink-green-deep mb-2 font-serif">
                    {f.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-wink-charcoal-muted leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-wink-kraft-light/20 flex items-center gap-2 text-xs font-bold text-wink-green">
                  <Check className="w-4 h-4 text-wink-green" />
                  <span>WINKSPLIT Guaranteed Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
