import React from 'react';
import { Leaf, MessageSquare, Mail, Phone, MapPin, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { WINKSPLIT_CONTACT } from '../../data/products';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useCatalog } from '../../context/CatalogContext';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wink-green-deep text-wink-ivory-200 pt-16 pb-12 border-t-4 border-wink-kraft-gold relative overflow-hidden">
      {/* Background Subtle Paper Fiber Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-wink-green-dark">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-wink-kraft-light/40 flex items-center justify-center p-1.5 overflow-hidden shadow-lg">
                <img 
                  src="/images/logo.png" 
                  alt="WINKSPLIT Official Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-serif">
                  WINKSPLIT
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-wink-sand">
                  Smart Packaging. A Greener Choice.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-wink-ivory-300/80 leading-relaxed max-w-sm">
              Smart, sustainable, and high-performance paper packaging solutions engineered for Indian restaurants, cafés, cloud kitchens, caterers, and retail businesses.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-bold bg-wink-green-dark text-wink-sand border border-wink-kraft/20 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Food-Grade Certified
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-bold bg-wink-green-dark text-wink-sand border border-wink-kraft/20 shadow-sm">
                <Award className="w-3.5 h-3.5 text-wink-kraft-gold" />
                FSSAI & FSC Compliant
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-wink-ivory-300/80">
              <li><a href="#home" className="hover:text-wink-sand transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Products Catalog</a></li>
              <li><a href="#about" className="hover:text-wink-sand transition-colors">About WINKSPLIT</a></li>
              <li><a href="#contact" className="hover:text-wink-sand transition-colors">Connect Desk</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Product Range
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-wink-ivory-300/80">
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Paper Bottles</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Heavy-Duty Paper Plates</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Kraft Salad & Meal Bowls</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Kraft Food Takeaway Boxes</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Table Napkins & Tissues</a></li>
              <li><a href="#products" className="hover:text-wink-sand transition-colors">Honeycomb Paper Rolls</a></li>
            </ul>
          </div>

          {/* Customer Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              B2B Desk & Support
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-wink-ivory-300/80">
              <li>
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#1EBE5D] font-bold transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                  <span>Phone & WhatsApp: {WINKSPLIT_CONTACT.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${WINKSPLIT_CONTACT.salesEmail}`}
                  className="flex items-center gap-2 hover:text-white transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-wink-kraft-light" />
                  <span>{WINKSPLIT_CONTACT.salesEmail}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-wink-ivory-300/70 pt-1">
                <MapPin className="w-4 h-4 text-wink-kraft-gold shrink-0 mt-0.5" />
                <span>Surat, Gujarat, India • Pan-India Express Logistics</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-wink-ivory-300/60">
          <p>© 2026 WINKSPLIT. All Rights Reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <span>GST Registered Invoicing</span>
            <span>Surat Logistics Hub</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
