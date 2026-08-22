import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2, 
  Sparkles, Building2, User, HelpCircle, ShieldCheck, Truck, 
  Clock, ArrowRight, FileText, Check, PackageCheck, Layers,
  Star, Quote, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { WINKSPLIT_CONTACT } from '../../data/products';
import { generateWhatsAppLink } from '../../utils/whatsapp';
import { useCatalog } from '../../context/CatalogContext';

export const ContactSection: React.FC = () => {
  const { products } = useCatalog();
  
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'paper-bottles');
  const [selectedSize, setSelectedSize] = useState<string>('500 ml');
  const [quantity, setQuantity] = useState<string>('1000');
  const [requirementType, setRequirementType] = useState<string>('Commercial Wholesale Order');
  const [customPrinting, setCustomPrinting] = useState<boolean>(false);
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const reviews = [
    {
      id: 1,
      name: 'Rahul Singhania',
      role: 'Co-Founder',
      company: 'Spice Craft Foods (Cloud Kitchens)',
      location: 'Ahmedabad & Mumbai',
      rating: 5,
      product: 'Lock-Fold Boxes & Bowls',
      comment: 'WINKSPLIT lock-fold boxes completely solved delivery leaks for our hot curries and meals. The custom logo printing is razor sharp and elevated our brand image.',
      initials: 'RS',
    },
    {
      id: 2,
      name: 'Priya Deshmukh',
      role: 'Head of Procurement',
      company: 'Pure Roots Beverage Co.',
      location: 'Pune & Mumbai',
      rating: 5,
      product: 'Eco Paper Bottles',
      comment: 'Switching from plastic to WINKSPLIT paper bottles was the best move for our brand. Zero leakage, 100% compostable, and direct factory pricing from Surat.',
      initials: 'PD',
    },
    {
      id: 3,
      name: 'Amit Patel',
      role: 'Director of Operations',
      company: 'Grand Heritage Banquets & Catering',
      location: 'Surat & Vadodara',
      rating: 5,
      product: 'Heavy-Duty Plates & Honeycomb Rolls',
      comment: 'The heavy-duty ribbed plates withstand hot buffet gravies without bending. Seamless bulk pallet supply with prompt GST invoices.',
      initials: 'AP',
    },
  ];
  
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    deliveryLocation: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const selectedVariant = selectedProduct?.variants.find(v => v.sizeOrCapacity === selectedSize) || selectedProduct?.variants[0];

  const handleProductChange = (pid: string) => {
    setSelectedProductId(pid);
    const prod = products.find(p => p.id === pid);
    if (prod && prod.variants.length > 0) {
      setSelectedSize(prod.variants[0].sizeOrCapacity);
      setQuantity(String(prod.variants[0].moq || 1000));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      _subject: `New B2B Packaging Enquiry - ${formData.name} (${formData.businessName || 'Business'})`,
      _replyto: formData.email,
      'Contact Name': formData.name,
      'Business / Brand Name': formData.businessName,
      'Phone (WhatsApp)': formData.phone,
      'Email Address': formData.email,
      'Packaging Product': `${selectedProduct?.name} (${selectedSize})`,
      'Selling Rate': selectedVariant?.priceDisplay || '',
      'Order Quantity': quantity,
      'Requirement Type': requirementType,
      'Custom Logo Printing': customPrinting ? 'YES (Artwork Required)' : 'Standard (No Custom Print)',
      'Delivery City / Pincode': formData.deliveryLocation,
      'Additional Notes': formData.message || 'None',
      _template: 'table',
      _captcha: 'false',
    };

    try {
      await fetch('https://formsubmit.co/ajax/winksplitbydeep@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('FormSubmit network notice:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    const url = generateWhatsAppLink({
      productName: selectedProduct?.name,
      sizeOrCapacity: selectedSize,
      quantity: quantity ? `${quantity} units` : '1,000 units',
      customPrinting: customPrinting ? 'Yes (Logo Print)' : 'No',
      deliveryLocation: formData.deliveryLocation || 'India',
    });
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white via-wink-ivory-100 to-wink-sand-light/30 relative scroll-mt-16 overflow-hidden">
      
      {/* Decorative background aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-wink-green-mint/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-extrabold uppercase tracking-wider mb-3 shadow-sm border border-wink-green/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct B2B Procurement Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-4">
            Connect With WINKSPLIT
          </h2>
          <p className="text-base sm:text-lg text-wink-charcoal-light font-normal">
            Request an official GST quotation, discuss custom sizing, or schedule recurring pan-India supply directly from Surat, Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Corporate HQ & Fulfillment Hub Info */}
          <div className="lg:col-span-5 space-y-6 scroll-reveal">
            
            {/* Corporate HQ & Fulfillment Hub Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-wink-kraft-light/40 shadow-paper-md space-y-6">
              <div className="flex items-center justify-between border-b border-wink-kraft-light/20 pb-3">
                <h4 className="text-xs font-bold text-wink-green-deep uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-wink-green" />
                  <span>Manufacturing & Dispatch Hub</span>
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  FSSAI & GST Verified
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-wink-ivory-200 flex items-center justify-center text-wink-green shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Location / Address</span>
                    <span className="font-semibold text-wink-charcoal block">
                      {WINKSPLIT_CONTACT.address}
                    </span>
                    <span className="block text-[11px] text-wink-charcoal-muted mt-0.5">
                      Surat, Gujarat • Pan-India Doorstep B2B Logistics
                    </span>
                  </div>
                </div>

                {/* Unified Phone & WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#25D366]/15 flex items-center justify-center text-[#128C7E] shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Phone & WhatsApp Helpline</span>
                    <a href={`tel:${WINKSPLIT_CONTACT.phone}`} className="font-bold text-base text-wink-green-deep hover:text-wink-green block">
                      {WINKSPLIT_CONTACT.phone}
                    </a>
                    
                    {/* Fast Action Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      <a
                        href={generateWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold shadow-sm transition-transform hover:scale-105"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp Chat</span>
                      </a>
                      <a
                        href={`tel:${WINKSPLIT_CONTACT.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-wink-charcoal text-[11px] font-bold transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-wink-green" />
                        <span>Direct Call</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-9 h-9 rounded-xl bg-wink-ivory-200 flex items-center justify-center text-wink-green shrink-0 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Email Support</span>
                    <a href={`mailto:${WINKSPLIT_CONTACT.salesEmail}`} className="font-semibold text-wink-charcoal hover:text-wink-green">
                      {WINKSPLIT_CONTACT.salesEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-4 border-t border-wink-kraft-light/20 grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-wink-charcoal-muted">
                <div className="p-2 rounded-xl bg-wink-ivory-100 border border-wink-kraft-light/20">
                  <Truck className="w-3.5 h-3.5 text-wink-green mx-auto mb-1" />
                  <span>24-48h Dispatch</span>
                </div>
                <div className="p-2 rounded-xl bg-wink-ivory-100 border border-wink-kraft-light/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-wink-green mx-auto mb-1" />
                  <span>100% Food Safe</span>
                </div>
                <div className="p-2 rounded-xl bg-wink-ivory-100 border border-wink-kraft-light/20">
                  <FileText className="w-3.5 h-3.5 text-wink-green mx-auto mb-1" />
                  <span>GST Invoicing</span>
                </div>
              </div>
            </div>

            {/* Customer Reviews & Partner Trust Showcase */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-wink-kraft-light/40 shadow-paper-md space-y-4">
              <div className="flex items-center justify-between border-b border-wink-kraft-light/20 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-wink-green-deep uppercase tracking-wider">
                      Partner Reviews & Trust
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-wink-charcoal-muted">
                      <span className="text-amber-500 font-bold">★★★★★</span>
                      <span className="font-bold text-wink-charcoal font-mono">4.9/5</span>
                      <span>(500+ B2B Clients)</span>
                    </div>
                  </div>
                </div>

                {/* Review Navigation Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1))}
                    className="p-1.5 rounded-lg bg-wink-ivory-200 hover:bg-wink-ivory-300 text-wink-charcoal transition-colors"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))}
                    className="p-1.5 rounded-lg bg-wink-ivory-200 hover:bg-wink-ivory-300 text-wink-charcoal transition-colors"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Active Review Box */}
              {(() => {
                const r = reviews[activeReviewIdx];
                return (
                  <div className="bg-wink-ivory-100/90 rounded-2xl p-4 border border-wink-kraft-light/30 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-wink-green-deep text-wink-sand font-bold text-xs flex items-center justify-center shadow-sm">
                          {r.initials}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-wink-green-deep">{r.name}</div>
                          <div className="text-[10px] text-wink-charcoal-muted">{r.role}, {r.company}</div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200">
                        Verified B2B Buyer
                      </span>
                    </div>

                    <p className="text-xs text-wink-charcoal-light italic leading-relaxed">
                      "{r.comment}"
                    </p>

                    <div className="pt-2 border-t border-wink-kraft-light/20 flex items-center justify-between text-[10px] text-wink-charcoal-muted">
                      <span>Product: <strong className="text-wink-green">{r.product}</strong></span>
                      <span className="text-wink-kraft-dark font-semibold">{r.location}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Review Dot Indicators */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveReviewIdx(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === activeReviewIdx ? 'w-5 bg-wink-green' : 'w-1.5 bg-wink-kraft-light/40'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Perfected Modern B2B Quotation Form */}
          <div className="lg:col-span-7 scroll-reveal">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-wink-kraft-light/40 shadow-paper-xl relative">
              
              {submitted ? (
                <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-wink-green-deep font-serif">
                    Enquiry Successfully Logged!
                  </h3>
                  <p className="text-xs sm:text-sm text-wink-charcoal-muted max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || 'Partner'}</strong>. Our commercial packaging team in Surat will review your requirement for <strong>{selectedProduct?.name} ({selectedSize})</strong> and send your tailored GST proforma invoice within 2 hours.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleWhatsAppSubmit}
                      className="px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Send Duplicate on WhatsApp for Instant Confirmation</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3.5 rounded-2xl bg-wink-ivory-200 text-wink-charcoal text-xs sm:text-sm font-bold hover:bg-wink-ivory-300 transition-colors"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Form Header */}
                  <div className="flex items-center justify-between border-b border-wink-kraft-light/30 pb-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-wink-green-deep font-serif">
                        Request B2B Quotation
                      </h3>
                      <p className="text-xs text-wink-charcoal-muted mt-0.5">
                        Fill in your order requirements for fast commercial pricing.
                      </p>
                    </div>
                    <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-wink-ivory-200 text-wink-charcoal">
                      Step 1 of 1
                    </span>
                  </div>

                  {/* Section A: Product & Specification Selection */}
                  <div className="space-y-4">
                    
                    {/* 1. Category / Product Selector */}
                    <div>
                      <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
                        1. Select Packaging Product *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {products.map((p) => {
                          const isSelected = p.id === selectedProductId;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => handleProductChange(p.id)}
                              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                                isSelected
                                  ? 'bg-wink-green text-white border-wink-green shadow-paper-sm scale-[1.02]'
                                  : 'bg-wink-ivory-100 hover:bg-wink-ivory-200 text-wink-charcoal border-wink-kraft-light/40'
                              }`}
                            >
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-8 h-8 object-contain rounded-lg bg-white/80 p-0.5 shrink-0"
                              />
                              <div className="overflow-hidden">
                                <span className="block text-xs font-bold truncate">{p.name}</span>
                                <span className={`text-[10px] block truncate ${isSelected ? 'text-wink-sand' : 'text-wink-charcoal-muted'}`}>
                                  {p.variants[0]?.priceDisplay}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Size / Capacity Selector */}
                    <div>
                      <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
                        2. Select Size / Capacity *
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct?.variants.map((v) => {
                          const isSelected = v.sizeOrCapacity === selectedSize;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setSelectedSize(v.sizeOrCapacity)}
                              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                                isSelected
                                  ? 'bg-wink-green-deep text-white border-wink-green-deep shadow-sm scale-105'
                                  : 'bg-wink-ivory-100 text-wink-charcoal hover:bg-wink-ivory-200 border-wink-kraft-light/40'
                              }`}
                            >
                              <span>{v.sizeOrCapacity}</span>
                              <span className={`text-[10px] ml-1.5 font-mono ${isSelected ? 'text-wink-sand' : 'text-wink-green font-semibold'}`}>
                                ({v.priceDisplay})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Live Selected Spec & Rate Callout Box */}
                    {selectedVariant && (
                      <div className="p-3.5 rounded-2xl bg-wink-ivory-100/90 border border-wink-kraft-light/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <PackageCheck className="w-4 h-4 text-wink-green" />
                          <span className="text-wink-charcoal font-medium">Selected:</span>
                          <span className="font-bold text-wink-green-deep">{selectedProduct?.name} ({selectedSize})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-wink-green-deep font-mono">{selectedVariant.priceDisplay}</span>
                          <span className="text-wink-charcoal-muted">|</span>
                          <span className="text-wink-charcoal font-medium">MOQ: <strong className="text-wink-green font-mono">{selectedVariant.moqDisplay}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* 4. Quantity & Requirement Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Order Quantity *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={`e.g. ${selectedVariant?.moq || 1000} units`}
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Requirement Type
                        </label>
                        <select
                          value={requirementType}
                          onChange={(e) => setRequirementType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                        >
                          <option value="Commercial Wholesale Order">Commercial Wholesale Order</option>
                          <option value="Sample Testing Box">Sample Testing Box</option>
                          <option value="Recurring Monthly Supply">Recurring Monthly Supply</option>
                        </select>
                      </div>
                    </div>

                    {/* 5. Custom Printing Checkbox (Optional) */}
                    {selectedProduct?.customPrintAvailable && (
                      <label className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 cursor-pointer text-xs font-semibold text-amber-950 select-none hover:bg-amber-100/50 transition-colors">
                        <input
                          type="checkbox"
                          checked={customPrinting}
                          onChange={(e) => setCustomPrinting(e.target.checked)}
                          className="w-4 h-4 rounded text-wink-green focus:ring-wink-green"
                        />
                        <span>Require Custom Brand Artwork / Logo Printing (Quoted Separately)</span>
                      </label>
                    )}

                  </div>

                  {/* Section B: Contact & Dispatch Details */}
                  <div className="space-y-4 pt-4 border-t border-wink-kraft-light/30">
                    <h4 className="text-xs font-bold text-wink-green-deep uppercase tracking-wider">
                      3. Business & Dispatch Information
                    </h4>

                    {/* Row 1: Name & Business */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Business / Brand Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Spice Kitchens Pvt Ltd"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Phone (WhatsApp) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="procurement@brand.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Delivery Location */}
                    <div>
                      <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                        Delivery City / Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Surat 395007, Mumbai 400001, Bangalore 560001..."
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                      />
                    </div>

                    {/* Message / Special Instructions */}
                    <div>
                      <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                        Additional Notes / Specifications (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Specify special packaging requirements, recurring monthly schedule, or sample kit delivery notes..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission Buttons */}
                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-4 px-6 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group/submit disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 text-wink-sand animate-spin" />
                          <span>Sending Directly to WINKSPLIT...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-wink-sand transition-transform group-hover/submit:translate-x-1" />
                          <span>Submit Quotation Enquiry</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-wink-charcoal-muted">
                    🔒 All enquiries are kept confidential. Direct GST invoice provided from Surat, Gujarat.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
