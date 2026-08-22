import React, { useState, useEffect } from 'react';
import { 
  X, Check, CheckCircle2, Sparkles, MessageSquare, Phone, ShieldCheck, 
  Truck, ArrowRight, Printer, Info, Plus, Minus, Calculator, FileText
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { formatNumber } from '../../utils/formatters';
import { generateWhatsAppLink } from '../../utils/whatsapp';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    selectedVariant, 
    setSelectedProduct, 
    setSelectedVariantId, 
    isProductModalOpen,
    addToQuote,
    openQuoteModal
  } = useCatalog();

  const [quantity, setQuantity] = useState<number>(1000);
  const [includeCustomPrint, setIncludeCustomPrint] = useState<boolean>(false);
  const [deliveryLocation, setDeliveryLocation] = useState<string>('');

  // Sync initial quantity with variant MOQ
  useEffect(() => {
    if (selectedVariant) {
      setQuantity(selectedVariant.moq > 0 ? selectedVariant.moq : 1000);
    }
  }, [selectedVariant?.id]);

  if (!isProductModalOpen || !selectedProduct || !selectedVariant) return null;

  // Handle stepped quantity increments
  const handleStepQty = (step: number) => {
    setQuantity(prev => Math.max(selectedVariant.moq || 1, prev + step));
  };

  const handleRequestBulkQuote = () => {
    addToQuote(selectedProduct, selectedVariant.id, quantity, includeCustomPrint);
    setSelectedProduct(null);
    openQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-wink-charcoal/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-wink-kraft-light/50 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/90 hover:bg-white text-wink-charcoal-muted hover:text-wink-green-deep shadow-md backdrop-blur border border-wink-kraft-light/30 transition-all hover:scale-110"
          aria-label="Close Product Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Product Photography & Badges */}
          <div className="lg:col-span-6 bg-gradient-to-br from-wink-ivory-100 to-wink-sand-light/40 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-wink-kraft-light/30">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-wink-kraft-dark">
                  {selectedProduct.categoryName}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-wink-green-deep text-wink-ivory shadow-sm">
                  BULK PRICING AVAILABLE
                </span>
              </div>

              {/* Product Photography Showcase */}
              <div className="relative rounded-2xl overflow-hidden shadow-paper-md bg-white border border-wink-kraft-light/30 group">
                <div className="w-full h-[280px] sm:h-[340px] p-6 flex items-center justify-center bg-gradient-to-b from-wink-ivory-50 to-white overflow-hidden">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="max-h-full max-w-full object-contain rounded-xl drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg border border-wink-kraft-light/30 text-[11px] font-medium text-wink-charcoal flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Official WINKSPLIT Product Photo</span>
                </div>
              </div>
            </div>

            {/* Eco Highlights */}
            <div className="mt-6 pt-4 border-t border-wink-kraft-light/30 grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/80 p-2.5 rounded-xl border border-wink-kraft-light/20 shadow-sm">
                <div className="text-[11px] font-bold text-wink-green-deep">Food Grade</div>
                <div className="text-[10px] text-wink-charcoal-muted">FSSAI Compliant</div>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-wink-kraft-light/20 shadow-sm">
                <div className="text-[11px] font-bold text-wink-green-deep">100% Eco</div>
                <div className="text-[10px] text-wink-charcoal-muted">Biodegradable</div>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-wink-kraft-light/20 shadow-sm">
                <div className="text-[11px] font-bold text-wink-green-deep">Pan-India</div>
                <div className="text-[10px] text-wink-charcoal-muted">Direct Dispatch</div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Specifications, Custom Printing, Bulk Order & Actions */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5">
            
            <div>
              {/* Product Name */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-wink-green-deep font-serif">
                {selectedProduct.name}
              </h2>
              <p className="text-xs text-wink-charcoal-muted mt-1 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* 1. Size / Capacity Selector */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-wink-charcoal uppercase tracking-wider mb-2">
                  Select Size / Capacity
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedProduct.variants.map((v) => {
                    const isSelected = v.id === selectedVariant.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-wink-green text-white border-wink-green shadow-paper-sm scale-105'
                            : 'bg-wink-ivory-100 hover:bg-wink-ivory-200 text-wink-charcoal border-wink-kraft-light/40'
                        }`}
                      >
                        <span className="block text-xs font-bold">{v.sizeOrCapacity}</span>
                        <span className={`text-[11px] font-mono block mt-0.5 ${isSelected ? 'text-wink-sand' : 'text-wink-green-deep font-semibold'}`}>
                          {v.priceDisplay}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Key Specifications: Price, MOQ, GSM */}
              <div className="mt-4 bg-wink-ivory-100/90 rounded-2xl p-4 border border-wink-kraft-light/30 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-wink-charcoal-muted block text-[11px] font-medium">Selling Price:</span>
                    <span className="font-extrabold text-wink-green-deep text-base font-mono block">
                      {selectedVariant.priceDisplay}
                    </span>
                  </div>
                  <div>
                    <span className="text-wink-charcoal-muted block text-[11px] font-medium">Minimum Order (MOQ):</span>
                    <span className="font-bold text-wink-green font-mono block">
                      {selectedVariant.moqDisplay}
                    </span>
                  </div>
                </div>

                {/* GSM (where applicable) */}
                {(selectedVariant.gsm || selectedProduct.gsmSummary) && (
                  <div className="pt-2 border-t border-wink-kraft-light/20 flex justify-between items-center">
                    <span className="text-wink-charcoal-muted font-medium">GSM / Thickness:</span>
                    <span className="font-bold text-wink-charcoal font-mono">{selectedVariant.gsm || selectedProduct.gsmSummary}</span>
                  </div>
                )}

                {/* Pack Size (where applicable) */}
                {selectedVariant.packSize && (
                  <div className="pt-1 flex justify-between items-center">
                    <span className="text-wink-charcoal-muted font-medium">Pack Details:</span>
                    <span className="font-bold text-wink-charcoal">{selectedVariant.packSize}</span>
                  </div>
                )}
              </div>

              {/* 3. CUSTOM PRINTING AVAILABLE Box */}
              {selectedProduct.customPrintAvailable && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2">
                  <div className="flex items-center gap-2">
                    <Printer className="w-4 h-4 text-amber-800" />
                    <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      CUSTOM PRINTING AVAILABLE
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-amber-950/90 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      <span>Logo printing</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      <span>Brand artwork</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      <span>Custom packaging</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700" />
                      <span>Business branding</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-900 font-semibold pt-1">
                    Custom printing price available on quotation.
                  </p>
                  <p className="text-[10px] text-amber-800/80 italic">
                    *Printing/setup charges are quoted separately and not included in standard price.
                  </p>
                </div>
              )}

              {/* 4. Quantity Selector ([-] 100 [+], [-] 500 [+], [-] 1000 [+]) */}
              <div className="mt-4 pt-3 border-t border-wink-kraft-light/30">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-wink-charcoal uppercase tracking-wider flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5 text-wink-green" />
                    <span>Quantity Selector</span>
                  </label>
                  <span className="text-[11px] text-wink-charcoal-muted font-medium">
                    MOQ: {selectedVariant.moqDisplay}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Step Buttons: 100, 500, 1000 */}
                  <button
                    onClick={() => handleStepQty(-100)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    -100
                  </button>
                  <button
                    onClick={() => handleStepQty(-500)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    -500
                  </button>
                  <button
                    onClick={() => handleStepQty(-1000)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    -1000
                  </button>

                  <input
                    type="number"
                    min={selectedVariant.moq || 1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-3 py-2 text-center text-sm font-bold font-mono rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 focus:ring-2 focus:ring-wink-green focus:outline-none"
                  />

                  <button
                    onClick={() => handleStepQty(100)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    +100
                  </button>
                  <button
                    onClick={() => handleStepQty(500)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    +500
                  </button>
                  <button
                    onClick={() => handleStepQty(1000)}
                    className="px-2.5 py-2 rounded-xl bg-wink-ivory-200 hover:bg-wink-ivory-300 text-xs font-bold text-wink-charcoal transition-colors"
                  >
                    +1000
                  </button>
                </div>
              </div>

              {/* 5. Bulk Order Message Callout */}
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-wink-ivory-200 to-wink-sand-light/50 border border-wink-kraft-light/30 space-y-1">
                <p className="text-xs font-bold text-wink-green-deep">
                  Ordering in bulk?
                </p>
                <p className="text-[11px] text-wink-charcoal-muted leading-relaxed">
                  Get a customized quotation based on quantity, size, customization and delivery location.
                </p>
              </div>

            </div>

            {/* Action CTAs: [Request Bulk Quote] & [Order on WhatsApp] */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Request Bulk Quote */}
                <button
                  onClick={handleRequestBulkQuote}
                  className="w-full py-3.5 px-4 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <FileText className="w-4 h-4 text-wink-sand" />
                  <span>Request Bulk Quote</span>
                </button>

                {/* Order on WhatsApp */}
                <a
                  href={generateWhatsAppLink({
                    productName: selectedProduct.name,
                    sizeOrCapacity: selectedVariant.sizeOrCapacity,
                    quantity: `${quantity} ${selectedVariant.priceUnit}s`,
                    customPrinting: includeCustomPrint ? 'Yes (Logo / Custom Artwork)' : 'No',
                    deliveryLocation: deliveryLocation || 'India',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-wink-charcoal-muted pt-1">
                Direct WINKSPLIT Manufacturer Rates • Surat, Gujarat • GST Invoicing
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
