import React from 'react';
import { CatalogProvider } from './context/CatalogContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingBtn } from './components/common/WhatsAppFloatingBtn';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { ScrollToTopBtn } from './components/common/ScrollToTopBtn';
import { useScrollReveal } from './hooks/useScrollEffects';

import { HeroSection } from './components/sections/HeroSection';
import { TrustSection } from './components/sections/TrustSection';
import { ProductCatalog } from './components/sections/ProductCatalog';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { B2BCtaSection } from './components/sections/B2BCtaSection';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';

import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { BulkQuoteModal } from './components/modals/BulkQuoteModal';

export const App: React.FC = () => {
  useScrollReveal();

  return (
    <CatalogProvider>
      <div className="min-h-screen bg-wink-ivory text-wink-charcoal flex flex-col selection:bg-wink-green-mint selection:text-wink-green-deep relative">
        {/* Scroll Progress Bar at Top */}
        <ScrollProgressBar />

        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* 1. Cinematic Hero */}
          <HeroSection />

          {/* 2. Trust Pillars */}
          <TrustSection />

          {/* 3. Products Catalog & Live Filters */}
          <ProductCatalog />

          {/* 4. Why WINKSPLIT 6-Pillar Grid */}
          <WhyUsSection />

          {/* 5. 4-Step Process Timeline */}
          <HowItWorksSection />

          {/* 6. Enterprise B2B CTA Banner */}
          <B2BCtaSection />

          {/* 7. About WINKSPLIT */}
          <AboutSection />

          {/* 8. B2B Contact & Quote Desk */}
          <ContactSection />
        </main>

        {/* Global Modals */}
        <ProductDetailModal />
        <BulkQuoteModal />

        {/* Floating Quick Actions */}
        <ScrollToTopBtn />
        <WhatsAppFloatingBtn />

        {/* Footer */}
        <Footer />
      </div>
    </CatalogProvider>
  );
};

export default App;
