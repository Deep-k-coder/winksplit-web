import React from 'react';
import { 
  ArrowRight, CheckCircle2, Shield, Leaf, Sparkles, Phone, 
  Award, Package, MapPin, Truck, Check, ShieldCheck, Factory, 
  Zap, Clock, FileText, BarChart3, Recycle
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { WINKSPLIT_CONTACT } from '../../data/products';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative min-h-[92vh] pt-28 sm:pt-32 pb-16 flex items-center overflow-hidden paper-texture">
      {/* Soft Ambient Radial Lights & Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-wink-kraft-light/25 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-breathe" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-wink-green-mint/35 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-breathe" />

      {/* Floating Organic Decorative Particles */}
      <div className="absolute top-20 right-12 text-wink-kraft/30 pointer-events-none animate-soft-float hidden sm:block">
        <Leaf className="w-8 h-8 rotate-45" />
      </div>
      <div className="absolute bottom-24 left-10 text-wink-green-mint pointer-events-none animate-soft-float-reverse hidden sm:block">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left: Cinematic Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left z-10 scroll-reveal">
            
            {/* Top Micro-Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-wink-kraft/30 text-wink-green-deep text-xs font-extrabold tracking-wide shadow-paper-sm backdrop-blur">
              <Sparkles className="w-3.5 h-3.5 text-wink-kraft-gold" />
              <span>Premium Eco-Packaging Brand</span>
              <span className="text-wink-kraft">|</span>
              <span className="text-wink-kraft-dark">Surat, Gujarat Hub</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-wink-green-deep tracking-tight leading-[1.12] font-serif">
              Smart Packaging. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-wink-green via-wink-green-emerald to-wink-kraft-dark">
                A Greener Choice.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-wink-charcoal-light max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              High-performance, food-grade paper packaging engineered for restaurants, cafés, cloud kitchens, and retail brands across India.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-2 gap-3 pt-1 max-w-md mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-wink-charcoal">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>100% Food-Safe & Leak Proof</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-wink-charcoal">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Custom Logo Printing Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-wink-charcoal">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Transparent Wholesale Selling Rates</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-wink-charcoal">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Pan-India Doorstep Logistics</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Primary CTA: Explore Products */}
              <a
                href="#products"
                className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-sm shadow-paper-lg hover:shadow-paper-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 text-wink-sand" />
              </a>

              {/* Secondary CTA: Connect With Us */}
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white hover:bg-wink-ivory-200 text-wink-green-deep border-2 border-wink-kraft/40 font-bold text-sm shadow-paper-sm transition-all transform hover:-translate-y-0.5"
              >
                <span>Connect With Us</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-wink-kraft-light/40 flex items-center justify-between sm:justify-start sm:gap-10 text-center sm:text-left">
              <div className="group cursor-default">
                <div className="text-xl sm:text-2xl font-black text-wink-green-deep font-mono group-hover:scale-105 transition-transform">500+</div>
                <div className="text-[11px] text-wink-charcoal-muted font-semibold">B2B Food Partners</div>
              </div>
              <div className="h-8 w-px bg-wink-kraft-light/40" />
              <div className="group cursor-default">
                <div className="text-xl sm:text-2xl font-black text-wink-green-deep font-mono group-hover:scale-105 transition-transform">100%</div>
                <div className="text-[11px] text-wink-charcoal-muted font-semibold">Plastic-Free Kraft</div>
              </div>
              <div className="h-8 w-px bg-wink-kraft-light/40" />
              <div className="group cursor-default">
                <div className="text-xl sm:text-2xl font-black text-wink-green-deep font-mono group-hover:scale-105 transition-transform">24–48h</div>
                <div className="text-[11px] text-wink-charcoal-muted font-semibold">Surat Hub Dispatch</div>
              </div>
            </div>

          </div>

          {/* Right: Eco Packaging Business & Sustainability Intelligence Showcase (NO Product Photos) */}
          <div className="lg:col-span-6 relative flex items-center justify-center scroll-reveal">
            
            <div className="w-full rounded-3xl bg-white/95 border-2 border-wink-kraft-light/50 p-6 sm:p-8 shadow-paper-xl backdrop-blur-md overflow-hidden card-3d relative">
              
              {/* Top Accent Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-wink-green via-wink-kraft-gold to-[#25D366]" />

              <div className="space-y-6">
                
                {/* 1. Header: Brand Logo & Live Facility Status */}
                <div className="flex items-center justify-between border-b border-wink-kraft-light/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-wink-ivory-100 border border-wink-kraft-light/40 flex items-center justify-center p-1.5 shadow-sm">
                      <img 
                        src="/images/logo.png" 
                        alt="WINKSPLIT Logo" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-wink-green-deep flex items-center gap-1.5">
                        WINKSPLIT Packaging Ecosystem
                      </h3>
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Surat Manufacturing Hub • Pan-India Supply</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 hidden sm:inline-block">
                    FSSAI Verified
                  </span>
                </div>

                {/* 2. Key Business Metrics & Capabilities Visual Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  
                  {/* Card 1: 100% Biodegradable */}
                  <div className="p-4 rounded-2xl bg-wink-ivory-100/90 border border-wink-kraft-light/30 space-y-1.5 hover:border-wink-green/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-wink-green-mint text-wink-green flex items-center justify-center">
                        <Recycle className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-wink-kraft-dark bg-wink-ivory-300 px-2 py-0.5 rounded-md">
                        Earth First
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-wink-green-deep font-mono">100% Organic</div>
                    <p className="text-[11px] text-wink-charcoal-muted leading-tight">
                      Unbleached virgin kraft fiber. Naturally decomposes in 90–180 days.
                    </p>
                  </div>

                  {/* Card 2: Food Safe Barrier */}
                  <div className="p-4 rounded-2xl bg-wink-ivory-100/90 border border-wink-kraft-light/30 space-y-1.5 hover:border-wink-green/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Leak-Proof
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-wink-green-deep font-mono">-20° to 120°C</div>
                    <p className="text-[11px] text-wink-charcoal-muted leading-tight">
                      Tested for hot curries, gravies, microwaves & deep freeze storage.
                    </p>
                  </div>

                  {/* Card 3: Custom Brand Printing */}
                  <div className="p-4 rounded-2xl bg-wink-ivory-100/90 border border-wink-kraft-light/30 space-y-1.5 hover:border-wink-green/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                        <Award className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                        HD Inks
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-wink-green-deep font-mono">Custom Branding</div>
                    <p className="text-[11px] text-wink-charcoal-muted leading-tight">
                      Vegetable food-contact ink printing for logos, sleeves & custom cartons.
                    </p>
                  </div>

                  {/* Card 4: Surat Pan-India Logistics */}
                  <div className="p-4 rounded-2xl bg-wink-ivory-100/90 border border-wink-kraft-light/30 space-y-1.5 hover:border-wink-green/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        Doorstep
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-wink-green-deep font-mono">Pan-India Supply</div>
                    <p className="text-[11px] text-wink-charcoal-muted leading-tight">
                      Direct freight from Surat, Gujarat with 100% GST invoice proformas.
                    </p>
                  </div>

                </div>

                {/* 3. Sustainable Supply Process Flow */}
                <div className="p-3.5 rounded-2xl bg-wink-green-deep text-white flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-wink-sand shrink-0" />
                    <div>
                      <span className="font-bold text-white block">Direct Factory B2B Supply</span>
                      <span className="text-[10px] text-wink-ivory-300">Zero Middlemen Markups • Transparent Selling Prices</span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="px-3 py-1.5 rounded-xl bg-wink-kraft hover:bg-wink-kraft-medium text-white text-[11px] font-bold shrink-0 transition-transform hover:scale-105"
                  >
                    Get Quote
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
