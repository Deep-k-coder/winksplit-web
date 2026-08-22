import React, { useState, useEffect } from 'react';
import { Leaf, MessageSquare, FileText, Menu, X, Phone, ShoppingBag } from 'lucide-react';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useCatalog } from '../../context/CatalogContext';
import { WINKSPLIT_CONTACT } from '../../data/products';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openQuoteModal, quoteItems } = useCatalog();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-paper-md py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT: Official Brand Logo & Identity */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-paper-sm transition-transform group-hover:scale-105 overflow-hidden">
            <img 
              src="/images/logo.png" 
              alt="WINKSPLIT Official Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-wink-green-deep">
              {WINKSPLIT_CONTACT.brandName}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-wink-kraft-dark font-bold">
              {WINKSPLIT_CONTACT.tagline}
            </span>
          </div>
        </a>

        {/* CENTER: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase font-bold tracking-wider text-wink-charcoal-light hover:text-wink-green transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* RIGHT: CTAs & Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Secondary CTA: WhatsApp Us */}
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#128C7E] bg-white hover:bg-wink-green-subtle border border-[#25D366]/40 shadow-sm transition-all hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Us</span>
          </a>

          {/* Single Primary Action: Connect With Us */}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-wink-green hover:bg-wink-green-deep shadow-paper-sm transition-all hover:shadow-paper-md hover:scale-105 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-wink-sand" />
            <span>Connect With Us</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="#contact"
            className="p-2 rounded-lg bg-wink-green text-white"
            title="Connect with Us"
          >
            <Phone className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-wink-charcoal hover:bg-wink-ivory-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-nav border-t border-wink-kraft-light/20 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-wink-charcoal hover:text-wink-green hover:bg-wink-ivory-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-wink-kraft-light/20 flex flex-col gap-2.5">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center font-bold text-sm text-white bg-[#25D366] flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us directly</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center font-bold text-sm text-white bg-wink-green flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Connect With Us</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
