import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Sparkles, Layers, Box, Disc, Utensils, Scroll, Grid,
  ArrowRight, MessageSquare, Check, ShieldCheck, Tag, FileText, Info
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { CATEGORIES_LIST } from '../../data/products';
import { Product, ProductCategory } from '../../types/catalog';
import { generateWhatsAppLink } from '../../utils/whatsapp';

export const ProductCatalog: React.FC = () => {
  const { products, setSelectedProduct, openQuoteModal, addToQuote } = useCatalog();
  const [selectedCat, setSelectedCat] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPrintOnly, setCustomPrintOnly] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedGsm, setSelectedGsm] = useState<string>('all');

  // Compute available sizes across catalog
  const allAvailableSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => p.variants.forEach(v => set.add(v.sizeOrCapacity)));
    return Array.from(set);
  }, [products]);

  // Compute available GSMs across catalog
  const allAvailableGsms = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.gsmSummary) set.add(p.gsmSummary);
      p.variants.forEach(v => {
        if (v.gsm) set.add(v.gsm);
      });
    });
    return Array.from(set);
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCat !== 'all' && product.categoryId !== selectedCat) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSizes = product.availableSizesSummary.toLowerCase().includes(query);
        const matchesGsm = product.gsmSummary ? product.gsmSummary.toLowerCase().includes(query) : false;
        const matchesVariants = product.variants.some(v => 
          v.sizeOrCapacity.toLowerCase().includes(query) || 
          (v.gsm && v.gsm.toLowerCase().includes(query)) ||
          v.priceDisplay.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCat && !matchesDesc && !matchesSizes && !matchesGsm && !matchesVariants) {
          return false;
        }
      }
      // Custom Print only filter
      if (customPrintOnly && !product.customPrintAvailable) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all') {
        const hasSize = product.variants.some(v => v.sizeOrCapacity === selectedSize);
        if (!hasSize) return false;
      }
      // GSM filter
      if (selectedGsm !== 'all') {
        const hasGsm = (product.gsmSummary && product.gsmSummary === selectedGsm) ||
          product.variants.some(v => v.gsm === selectedGsm);
        if (!hasGsm) return false;
      }
      return true;
    });
  }, [products, selectedCat, searchQuery, customPrintOnly, selectedSize, selectedGsm]);

  return (
    <section id="products" className="py-20 bg-wink-ivory-100 relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Product Page Heading */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wink-green-mint text-wink-green-deep text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official WINKSPLIT Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-3">
              Eco-Friendly Packaging for Indian Businesses
            </h2>
            <p className="text-base sm:text-lg text-wink-charcoal-light font-normal max-w-2xl">
              Choose the right size, quantity and packaging solution for your business.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-sm shadow-paper-md transition-all hover:scale-105 shrink-0"
          >
            <FileText className="w-4 h-4 text-wink-sand" />
            <span>GET BULK QUOTE</span>
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-wink-kraft-light/30 shadow-paper-md mb-10 space-y-4">
          
          {/* Top Row: Search & Filters */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-wink-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name, size (e.g. 500 ml, 8 inch), GSM, or price..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-wink-kraft-light/40 bg-wink-ivory-50 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-wink-green focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-wink-charcoal-muted hover:text-wink-charcoal"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Checkboxes */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Custom Print Filter Toggle */}
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-wink-ivory-200 border border-wink-kraft-light/30 cursor-pointer text-xs font-semibold text-wink-charcoal select-none hover:bg-wink-ivory-300 transition-colors">
                <input
                  type="checkbox"
                  checked={customPrintOnly}
                  onChange={(e) => setCustomPrintOnly(e.target.checked)}
                  className="rounded text-wink-green focus:ring-wink-green w-4 h-4"
                />
                <span>Custom Printing</span>
              </label>

              {/* Size Selector */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-3 py-2 rounded-xl bg-wink-ivory-200 border border-wink-kraft-light/30 text-xs font-semibold text-wink-charcoal focus:outline-none focus:ring-2 focus:ring-wink-green"
              >
                <option value="all">All Sizes</option>
                {allAvailableSizes.map((sz) => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>

              {/* GSM Selector */}
              {allAvailableGsms.length > 0 && (
                <select
                  value={selectedGsm}
                  onChange={(e) => setSelectedGsm(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-wink-ivory-200 border border-wink-kraft-light/30 text-xs font-semibold text-wink-charcoal focus:outline-none focus:ring-2 focus:ring-wink-green"
                >
                  <option value="all">All GSM</option>
                  {allAvailableGsms.map((gsm) => (
                    <option key={gsm} value={gsm}>{gsm}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => setSelectedCat('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCat === 'all'
                  ? 'bg-wink-green text-white shadow-paper-sm scale-105'
                  : 'bg-wink-ivory-200 text-wink-charcoal-light hover:bg-wink-ivory-300 hover:text-wink-green'
              }`}
            >
              <span>All Products</span>
            </button>
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-wink-green text-white shadow-paper-sm scale-105'
                      : 'bg-wink-ivory-200 text-wink-charcoal-light hover:bg-wink-ivory-300 hover:text-wink-green'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-wink-kraft-light/30 shadow-paper-sm p-8 scroll-reveal">
            <Layers className="w-12 h-12 text-wink-kraft mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-bold text-wink-green-deep mb-1">No packaging products match your filter</h3>
            <p className="text-sm text-wink-charcoal-muted mb-4">Try resetting your filters to browse the complete WINKSPLIT catalog.</p>
            <button
              onClick={() => {
                setSelectedCat('all');
                setSearchQuery('');
                setCustomPrintOnly(false);
                setSelectedSize('all');
                setSelectedGsm('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-wink-green text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 scroll-reveal-stagger">
            {filteredProducts.map((product) => {
              const primaryVariant = product.variants[0];

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border-2 border-wink-kraft-light/40 shadow-paper-md hover:shadow-paper-xl transition-all duration-300 overflow-hidden flex flex-col group card-3d"
                >
                  {/* Product Image Box */}
                  <div 
                    onClick={() => setSelectedProduct(product)}
                    className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-wink-ivory-200 to-wink-sand-light/50 flex items-center justify-center p-6 cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain rounded-xl drop-shadow-md transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge: BULK PRICING AVAILABLE */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-wink-green-deep text-wink-ivory shadow-md uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-wink-sand" />
                        BULK PRICING AVAILABLE
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Product Name */}
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-xl font-bold text-wink-green-deep font-serif group-hover:text-wink-green transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-wink-charcoal-muted line-clamp-2 mt-1 mb-3">
                        {product.tagline}
                      </p>

                      {/* Specifications Box */}
                      <div className="bg-wink-ivory-100 rounded-2xl p-3.5 space-y-2 text-xs border border-wink-kraft-light/30 mb-3">
                        {/* Available Size */}
                        <div className="flex justify-between items-start">
                          <span className="text-wink-charcoal-muted font-medium">Available Size:</span>
                          <span className="font-bold text-wink-charcoal text-right max-w-[180px]">{product.availableSizesSummary}</span>
                        </div>

                        {/* GSM (where applicable) */}
                        {product.gsmSummary && (
                          <div className="flex justify-between items-center">
                            <span className="text-wink-charcoal-muted font-medium">GSM:</span>
                            <span className="font-bold text-wink-charcoal font-mono">{product.gsmSummary}</span>
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex justify-between items-center pt-1 border-t border-wink-kraft-light/20">
                          <span className="text-wink-charcoal-muted font-medium">Price:</span>
                          <span className="font-extrabold text-wink-green-deep text-sm font-mono">{primaryVariant.priceDisplay}</span>
                        </div>

                        {/* MOQ */}
                        <div className="flex justify-between items-center">
                          <span className="text-wink-charcoal-muted font-medium">MOQ:</span>
                          <span className="font-bold text-wink-green font-mono">{primaryVariant.moqDisplay}</span>
                        </div>
                      </div>
                    </div>

                    {/* Single Action Button: Product Details */}
                    <div className="pt-2 border-t border-wink-kraft-light/30">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="shimmer-btn w-full py-3.5 px-4 rounded-xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-xs sm:text-sm shadow-paper-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group/btn"
                      >
                        <span>Product Details</span>
                        <ArrowRight className="w-4 h-4 text-wink-sand transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
