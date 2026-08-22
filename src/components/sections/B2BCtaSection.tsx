import React from 'react';
import { Phone, MessageSquare, ArrowRight, Sparkles, ShieldCheck, MapPin, Award } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { WINKSPLIT_CONTACT } from '../../data/products';

export const B2BCtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-wink-ivory-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-wink-green-deep via-wink-green to-wink-green-dark p-8 sm:p-14 text-white shadow-2xl overflow-hidden border-2 border-wink-kraft-gold/30 scroll-reveal">
          {/* Subtle 3D background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-wink-kraft-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-wink-green-accent/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-wink-sand text-xs font-extrabold uppercase tracking-wider border border-white/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-wink-kraft-gold" />
              <span>Surat Manufacturing Hub • Enterprise & Wholesale Supply</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              Looking for Sustainable Packaging at Scale?
            </h2>

            <p className="text-base sm:text-lg text-wink-ivory-200 leading-relaxed max-w-2xl mx-auto font-normal">
              Tell us your product, size and quantity. Our commercial team in Surat, Gujarat will prepare your tailored B2B quotation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* Button 1: Connect With Us */}
              <a
                href="#contact"
                className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-wink-kraft hover:bg-wink-kraft-medium text-white font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-wink-sand" />
                <span>Connect With Us</span>
              </a>

              {/* Button 2: WhatsApp WINKSPLIT */}
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm sm:text-base shadow-xl transition-all hover:scale-105"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>WhatsApp WINKSPLIT ({WINKSPLIT_CONTACT.whatsappDisplay})</span>
              </a>
            </div>

            {/* Security and Trust Markers */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-wink-ivory-300/80">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Direct Manufacturer Rates
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                GST Invoice & PAN Compliance
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Pan-India Express Dispatch
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
