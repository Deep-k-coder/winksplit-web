import React from 'react';
import { Palette, Sparkles, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Printer } from 'lucide-react';
import { CustomPrintVisualizer } from '../3d/CustomPrintVisualizer';
import { generateCustomPrintWhatsAppLink } from '../../utils/whatsapp';
import { useCatalog } from '../../context/CatalogContext';

export const CustomPrintingSection: React.FC = () => {
  const { openQuoteModal } = useCatalog();

  const printCapabilities = [
    {
      title: 'Logo Printing',
      desc: 'High-definition single & multi-color logo printing with sharp edges on unbleached kraft and white paper.',
    },
    {
      title: 'Brand Colors & Inks',
      desc: '100% Food-grade water and vegetable-based certified inks that will not bleed or transfer odor.',
    },
    {
      title: 'Custom Artwork & Sleeves',
      desc: 'Full-bleed exterior packaging graphics, QR code menus, social handles, and brand storytelling.',
    },
    {
      title: 'Bulk Packaging',
      desc: 'Economical high-speed rotogravure & flexographic runs tailored for restaurants and retail chains.',
    },
    {
      title: 'Business Branding',
      desc: 'Turn everyday takeout into an unforgettable tactile brand touchpoint that customers love to post.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Share your logo/design',
      desc: 'Send your vector logo (AI/EPS/PDF/PNG) or branding brief via WhatsApp or our quote builder.',
    },
    {
      step: '02',
      title: 'Confirm size, material & quantity',
      desc: 'Select your preferred container capacity, kraft GSM grade, and volume requirements.',
    },
    {
      step: '03',
      title: 'Approve sample and place order',
      desc: 'Review digital 3D proof or pre-production sample before full batch production.',
    },
  ];

  return (
    <section id="custom-printing" className="py-20 bg-wink-ivory-200 relative overflow-hidden paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-bold uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5 text-wink-green" />
            <span>High-Definition Eco Branding</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-4">
            Make Your Packaging Your Brand.
          </h2>
          <p className="text-base sm:text-lg text-wink-charcoal-light font-normal leading-relaxed">
            Custom printing is available for selected packaging products. Elevate your customer unboxing experience with premium food-safe inks on unbleached kraft.
          </p>
        </div>

        {/* Interactive 3D Mockup Studio */}
        <div className="mb-16">
          <CustomPrintVisualizer />
        </div>

        {/* 3-Step Simple Process */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-wink-kraft-dark block mb-1">
              Streamlined B2B Workflow
            </span>
            <h3 className="text-2xl font-bold text-wink-green-deep font-serif">
              Simple 3-Step Printing Process
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {processSteps.map((s, idx) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-wink-kraft-light/30 shadow-paper-sm hover:shadow-paper-md transition-all relative card-3d"
              >
                <div className="w-12 h-12 rounded-xl bg-wink-green-deep text-wink-sand flex items-center justify-center font-bold font-mono text-base mb-4 shadow-sm">
                  {s.step}
                </div>
                <h4 className="text-base font-bold text-wink-green-deep mb-2">
                  {s.title}
                </h4>
                <p className="text-xs text-wink-charcoal-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Print Capabilities Grid & CTA */}
        <div className="bg-wink-green-deep text-white rounded-3xl p-8 sm:p-12 border border-wink-kraft shadow-paper-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-wink-sand">
                Custom Capabilities
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Eco-Friendly Ink & Food Safety Compliant
              </h3>
              <p className="text-xs sm:text-sm text-wink-ivory-300/90 leading-relaxed">
                We use organic, non-toxic, odorless food-contact compliant inks. Whether you need minimal single-color typography or full-color dynamic artwork, our precision packaging presses deliver consistent quality across every batch.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {printCapabilities.slice(0, 4).map((cap) => (
                  <div key={cap.title} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-white block">{cap.title}</span>
                      <span className="text-[11px] text-wink-ivory-300/70">{cap.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center space-y-4 text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 w-full max-w-sm">
                <Printer className="w-8 h-8 text-wink-sand mx-auto lg:ml-auto lg:mr-0 mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  Ready to Brand Your Packaging?
                </h4>
                <p className="text-xs text-wink-ivory-300/80 mb-4">
                  Send us your logo for a free digital proof and tailored B2B quotation.
                </p>

                <div className="space-y-2">
                  <a
                    href={generateCustomPrintWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Your Logo</span>
                  </a>

                  <a
                    href="#contact"
                    className="w-full py-3 px-4 rounded-xl bg-wink-kraft-medium hover:bg-wink-kraft text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Connect With WINKSPLIT</span>
                    <ArrowRight className="w-4 h-4" />
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
