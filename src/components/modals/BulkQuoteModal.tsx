import React, { useState } from 'react';
import { 
  X, Trash2, MessageSquare, Send, CheckCircle2, Plus, 
  ArrowRight, ShieldCheck, FileText, Building2, User, 
  Phone, Mail, MapPin, PackageCheck, Loader2
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { formatINR } from '../../utils/formatters';
import { WINKSPLIT_CONTACT } from '../../data/products';

export const BulkQuoteModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    setIsQuoteModalOpen, 
    quoteItems, 
    removeFromQuote, 
    updateQuoteItemQty, 
    clearQuote,
    products,
    addToQuote
  } = useCatalog();

  const [form, setForm] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    cityPincode: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmitRFQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedId = 'WS-RFQ-' + Math.floor(100000 + Math.random() * 900000);
    setQuoteId(generatedId);

    const itemsSummary = quoteItems.length > 0 
      ? quoteItems.map((it, idx) => `${idx + 1}. ${it.productName} (${it.sizeOrCapacity}) - Qty: ${it.quantity} units | Rate: ${it.priceDisplay} ${it.customPrinting ? '[Custom Logo Print]' : ''}`).join('\n')
      : 'General B2B Inquiry';

    const payload = {
      _subject: `New Bulk RFQ Quote Request #${generatedId} - ${form.fullName} (${form.businessName || 'Business'})`,
      _replyto: form.email,
      'RFQ Quote ID': generatedId,
      'Contact Name': form.fullName,
      'Business / Restaurant Name': form.businessName,
      'Phone (WhatsApp)': form.phone,
      'Email Address': form.email,
      'Delivery City / Pincode': form.cityPincode,
      'Selected Packaging Items': itemsSummary,
      'Special Notes': form.notes || 'None',
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
      console.warn('FormSubmit RFQ network notice:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSend = () => {
    const phone = WINKSPLIT_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
    
    let itemsText = '';
    if (quoteItems.length > 0) {
      itemsText = quoteItems.map((it, idx) => 
        `• ${it.productName} (${it.sizeOrCapacity}) - ${it.quantity} units ${it.customPrinting ? '[With Logo Print]' : ''} [Rate: ${it.priceDisplay || formatINR(it.unitPrice)}]`
      ).join('\n');
    } else {
      itemsText = 'Bulk paper packaging order enquiry';
    }

    const message = `Hello WINKSPLIT,

I am interested in:

Product Requirement:
${itemsText}

Business Details:
Contact Name: ${form.fullName || 'Business Owner'}
Business Name: ${form.businessName || 'Brand / Restaurant'}
Delivery Location: ${form.cityPincode || 'India'}
Notes: ${form.notes || 'Please share your best bulk quotation.'}

Please share your best bulk quotation.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-wink-charcoal/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl border-2 border-wink-kraft-light/50 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-wink-green-deep text-white p-5 sm:p-7 flex items-center justify-between border-b border-wink-green-accent/20">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-wink-green-mint/20 border border-wink-green-mint/30 flex items-center justify-center text-wink-sand">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold font-serif">
                B2B Bulk Quotation Builder
              </h2>
              <p className="text-xs text-wink-ivory-300/80">
                Direct manufacturer pricing from Surat, Gujarat • GST Invoicing
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsQuoteModalOpen(false);
              setSubmitted(false);
            }}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {submitted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-wink-green-deep font-serif">
                Quotation Request #{quoteId} Logged!
              </h3>
              <p className="text-xs sm:text-sm text-wink-charcoal-muted max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{form.fullName || 'Partner'}</strong>. Our sales desk in Surat has received your itemized requirement and will send your official GST quotation within 2 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="px-6 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Direct to WhatsApp for Instant Confirmation</span>
                </button>
                <button
                  onClick={() => {
                    clearQuote();
                    setIsQuoteModalOpen(false);
                    setSubmitted(false);
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-wink-ivory-200 text-wink-charcoal text-xs sm:text-sm font-bold hover:bg-wink-ivory-300 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Selected Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-wink-green-deep uppercase tracking-wider flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-wink-green" />
                    <span>1. Selected Packaging Items ({quoteItems.length})</span>
                  </h3>
                  {quoteItems.length > 0 && (
                    <button
                      onClick={clearQuote}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                  )}
                </div>

                {quoteItems.length === 0 ? (
                  <div className="text-center py-8 bg-wink-ivory-100/90 rounded-2xl border-2 border-dashed border-wink-kraft-light/50 p-6 space-y-3">
                    <p className="text-sm font-bold text-wink-green-deep">No items added to your quotation list yet</p>
                    <p className="text-xs text-wink-charcoal-muted max-w-md mx-auto">
                      Click below to quickly add popular WINKSPLIT products:
                    </p>
                    
                    {/* Quick Add Product Chips */}
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {products.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addToQuote(p)}
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-wink-ivory-200 text-wink-charcoal border border-wink-kraft-light/40 text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5 text-wink-green" />
                          <span>{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {quoteItems.map((item) => (
                      <div
                        key={item.variantId}
                        className="bg-wink-ivory-50 rounded-2xl p-4 border border-wink-kraft-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-wink-green/40 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-wink-green-deep">{item.productName}</span>
                            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-wink-ivory-300 text-wink-charcoal">
                              {item.sizeOrCapacity}
                            </span>
                            {item.customPrinting && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                                Logo Print
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-wink-green font-mono font-bold block mt-0.5">
                            Selling Price: {item.priceDisplay}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Quantity control */}
                          <div className="flex items-center gap-1.5">
                            <label className="text-xs font-semibold text-wink-charcoal-muted">Qty:</label>
                            <input
                              type="number"
                              min={100}
                              step={100}
                              value={item.quantity}
                              onChange={(e) => updateQuoteItemQty(item.variantId, Math.max(10, parseInt(e.target.value) || 100))}
                              className="w-24 px-2.5 py-1.5 text-xs font-mono font-bold border border-wink-kraft-light/40 bg-white rounded-xl text-center focus:ring-2 focus:ring-wink-green focus:outline-none"
                            />
                          </div>

                          <button
                            onClick={() => removeFromQuote(item.variantId)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Contact Form */}
              <form onSubmit={handleSubmitRFQ} className="space-y-4 border-t border-wink-kraft-light/30 pt-6">
                <h3 className="text-xs font-bold text-wink-green-deep uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-wink-green" />
                  <span>2. Business & Dispatch Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                      Business / Restaurant Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bombay Tacos & Bowls"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                      Phone (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                      placeholder="procurement@brand.in"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                      City & Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Surat 395007"
                      value={form.cityPincode}
                      onChange={(e) => setForm({ ...form, cityPincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none"
                    />
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-1">
                    Special Packaging Requirements / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on required custom printing, delivery deadlines, or sample requirements..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:ring-2 focus:ring-wink-green focus:outline-none resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 text-wink-sand animate-spin" />
                        <span>Sending to WINKSPLIT...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit RFQ Quote Request</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Direct WhatsApp Quote</span>
                  </button>
                </div>

              </form>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
