import React from 'react';
import { Leaf, Award, Compass, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-wink-ivory-200 relative paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: About Content */}
          <div className="lg:col-span-7 space-y-6 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-extrabold uppercase tracking-wider shadow-sm border border-wink-green/20">
              <Leaf className="w-3.5 h-3.5" />
              <span>About WINKSPLIT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif leading-tight">
              Packaging for a Better, Greener Tomorrow.
            </h2>

            <p className="text-base sm:text-lg text-wink-charcoal-light leading-relaxed font-normal">
              <strong>WINKSPLIT</strong> is a modern Indian eco-friendly paper packaging brand headquartered in Surat, Gujarat, on a mission to empower food service and retail businesses with sustainable, practical, and affordable packaging alternatives.
            </p>

            <p className="text-xs sm:text-sm text-wink-charcoal-muted leading-relaxed">
              We engineer functional Paper Bottles, Heavy-Duty Plates, leak-proof Kraft Bowls, Takeaway Food Boxes, ultra-soft Table Napkins, and 3D Honeycomb Paper Rolls. We believe eco-conscious packaging must never compromise on grease-resistance, thermal retention, or cost effectiveness.
            </p>

            {/* Core Values / Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-5 rounded-3xl border-2 border-wink-kraft-light/30 shadow-paper-sm hover:shadow-paper-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-wink-green-mint text-wink-green flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-wink-green-deep">100% Unbleached Kraft</h4>
                </div>
                <p className="text-xs text-wink-charcoal-muted leading-relaxed">
                  Sourced from certified sustainably managed agro-forestry pulps with zero harmful bleach or toxic chlorine.
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border-2 border-wink-kraft-light/30 shadow-paper-sm hover:shadow-paper-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-wink-green-deep">Direct Indian B2B Hub</h4>
                </div>
                <p className="text-xs text-wink-charcoal-muted leading-relaxed">
                  Tailored specifically for Indian hospitality, cloud kitchens, QSRs, and emerging direct-to-consumer brands.
                </p>
              </div>
            </div>

          </div>

          {/* Right: Visual Storytelling Card */}
          <div className="lg:col-span-5 scroll-reveal">
            <div className="bg-white rounded-3xl p-8 sm:p-9 border-2 border-wink-kraft-light/40 shadow-paper-xl relative card-3d">
              <div className="space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-wink-green-deep text-wink-sand flex items-center justify-center shadow-lg">
                    <Award className="w-7 h-7 text-wink-kraft-gold" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                    Certified Standards
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-wink-green-deep font-serif">
                  The WINKSPLIT Quality Standard
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-wink-charcoal">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-wink-green shrink-0 mt-0.5" />
                    <span>Food Contact Safe & FSSAI Compliant bio-coatings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-wink-green shrink-0 mt-0.5" />
                    <span>Microwave safe & freezer tested (-20°C to 120°C).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-wink-green shrink-0 mt-0.5" />
                    <span>Biodegrades naturally in 90–180 days in organic soil compost.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-wink-green shrink-0 mt-0.5" />
                    <span>Transparent B2B selling rates with express Pan-India dispatch.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-wink-kraft-light/20 flex items-center justify-between text-xs font-mono text-wink-charcoal-muted">
                  <div className="flex items-center gap-1.5 font-bold text-wink-charcoal">
                    <MapPin className="w-3.5 h-3.5 text-wink-green" />
                    <span>Surat, Gujarat, India</span>
                  </div>
                  <span className="text-wink-green font-bold bg-wink-green-mint px-2.5 py-0.5 rounded-md">
                    WINKSPLIT HQ
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
