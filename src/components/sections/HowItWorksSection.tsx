import React from 'react';
import { Package, CheckSquare, Send, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Packaging',
      description: 'Explore our eco-friendly paper bottles, plates, kraft bowls, takeaway boxes, napkins, or honeycomb rolls.',
      icon: Package,
    },
    {
      number: '02',
      title: 'Select Size & Capacity',
      description: 'Review transparent customer selling prices and MOQs, and specify optional custom logo printing.',
      icon: CheckSquare,
    },
    {
      number: '03',
      title: 'Request Your Quote',
      description: 'Submit an online quotation enquiry or message our sales desk directly on WhatsApp (+91 84016 95003).',
      icon: Send,
    },
    {
      number: '04',
      title: 'Direct Pan-India Dispatch',
      description: 'Receive your GST invoice and digital proof. We dispatch via express logistics straight to your door across India.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-wink-ivory-200 border border-wink-kraft/30 text-wink-kraft-dark text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-wink-kraft-gold" />
            <span>Seamless B2B Procurement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-wink-charcoal-light font-normal">
            Effortless paper packaging ordering designed for busy restaurant owners, caterers, and purchasing managers.
          </p>
        </div>

        {/* 4 Steps with Flowing Connecting Line */}
        <div className="relative">
          
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-1 bg-gradient-to-r from-wink-green-mint via-wink-green to-wink-green-mint -translate-y-10 z-0 opacity-40 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 scroll-reveal-stagger">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-wink-ivory-50 rounded-3xl p-6 sm:p-8 border-2 border-wink-kraft-light/30 shadow-paper-sm hover:shadow-paper-lg transition-all duration-300 card-3d flex flex-col justify-between group hover:border-wink-green/40"
                >
                  <div>
                    {/* Step Number & Icon Header */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-wink-green to-wink-kraft-dark">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white border border-wink-kraft-light/40 shadow-paper-sm flex items-center justify-center text-wink-green-deep group-hover:bg-wink-green group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-wink-green-deep mb-2 font-serif">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-wink-charcoal-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-wink-kraft-light/20 flex items-center justify-between text-[11px] font-bold text-wink-kraft-dark">
                    <span>Step {idx + 1} of 4</span>
                    <span className="w-2 h-2 rounded-full bg-wink-green/40 group-hover:bg-wink-green transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Quick CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-sm shadow-paper-md transition-all hover:scale-105"
          >
            <span>Connect With WINKSPLIT</span>
            <ArrowRight className="w-4 h-4 text-wink-sand" />
          </a>
        </div>

      </div>
    </section>
  );
};
