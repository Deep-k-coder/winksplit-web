import React, { useState } from 'react';
import { Layers, ShieldCheck, Check, MessageSquare, ArrowRight, FileText, Info } from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';

export const MoqPricingSection: React.FC = () => {
  const { products, setSelectedProduct, openQuoteModal, addToQuote } = useCatalog();
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');

  // Flatten all variants for the table
  const allRows = products.flatMap((p) =>
    p.variants.map((v) => ({
      productId: p.id,
      productName: p.name,
      categoryName: p.categoryName,
      categoryId: p.categoryId,
      size: v.sizeOrCapacity,
      gsm: v.gsm || p.gsmSummary || 'Food-Grade Kraft',
      packSize: v.packSize,
      moq: v.moq,
      moqDisplay: v.moqDisplay,
      price: v.customerPrice,
      priceDisplay: v.priceDisplay,
      priceUnit: v.priceUnit,
      customPrint: v.customPrintAvailable,
      productObj: p,
      variantId: v.id,
    }))
  );

  const filteredRows = selectedFilterCategory === 'all'
    ? allRows
    : allRows.filter((r) => r.categoryId === selectedFilterCategory);

  return (
    <section id="moq-pricing" className="py-20 bg-white relative scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wink-ivory-300 text-wink-kraft-deep text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Official Price List & MOQ Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wink-green-deep tracking-tight font-serif mb-4">
            Product Pricing & Minimum Order Quantity
          </h2>
          <p className="text-base sm:text-lg text-wink-charcoal-light font-normal">
            Direct customer-facing pricing in INR (₹). Bulk pricing available for wholesale orders.
          </p>
        </div>

        {/* Category Filters for Table */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {[
            { id: 'all', name: 'All Products' },
            { id: 'paper-bottles', name: 'Paper Bottles' },
            { id: 'paper-plates', name: 'Paper Plates' },
            { id: 'kraft-bowls', name: 'Kraft Paper Bowls' },
            { id: 'kraft-boxes', name: 'Kraft Food Boxes' },
            { id: 'napkins-tissue', name: 'Napkin / Tissue' },
            { id: 'honeycomb-rolls', name: 'Honeycomb Paper Roll' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedFilterCategory === cat.id
                  ? 'bg-wink-green-deep text-white shadow-sm'
                  : 'bg-wink-ivory-200 text-wink-charcoal-muted hover:bg-wink-ivory-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* MOQ & Price Table */}
        <div className="bg-wink-ivory-50 rounded-3xl border-2 border-wink-kraft-light/40 shadow-paper-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-wink-green-deep text-wink-ivory-100 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Product</th>
                  <th className="py-4 px-4">Size / Capacity</th>
                  <th className="py-4 px-4">GSM / Spec</th>
                  <th className="py-4 px-4 text-center">Selling Price</th>
                  <th className="py-4 px-4 text-center">MOQ</th>
                  <th className="py-4 px-4 text-center">Custom Printing</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-wink-kraft-light/20 bg-white">
                {filteredRows.map((row, idx) => (
                  <tr
                    key={`${row.productId}-${row.size}-${idx}`}
                    className="hover:bg-wink-ivory-100/70 transition-colors"
                  >
                    {/* Product Name */}
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-wink-green-deep">
                      <button
                        onClick={() => setSelectedProduct(row.productObj, row.variantId)}
                        className="hover:underline text-left"
                      >
                        {row.productName}
                      </button>
                      <span className="block text-[11px] font-normal text-wink-kraft-dark">
                        {row.categoryName}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 font-semibold text-wink-charcoal">
                      {row.size}
                      {row.packSize && <span className="block text-[10px] text-wink-charcoal-muted font-normal">({row.packSize})</span>}
                    </td>

                    {/* GSM */}
                    <td className="py-3.5 px-4 text-wink-charcoal-muted text-xs">
                      {row.gsm}
                    </td>

                    {/* Selling Price */}
                    <td className="py-3.5 px-4 text-center font-mono font-extrabold text-wink-green-deep">
                      {row.priceDisplay}
                    </td>

                    {/* MOQ */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-wink-green">
                      {row.moqDisplay}
                    </td>

                    {/* Custom Printing */}
                    <td className="py-3.5 px-4 text-center">
                      {row.customPrint ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="text-[11px] text-wink-charcoal-muted">Standard Only</span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <button
                        onClick={() => setSelectedProduct(row.productObj, row.variantId)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-wink-green text-white hover:bg-wink-green-deep transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Callout Banner */}
          <div className="p-6 bg-gradient-to-r from-wink-ivory-200 via-wink-sand-light to-wink-ivory-200 border-t border-wink-kraft-light/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-wink-green-deep text-wink-sand flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-wink-green-deep">
                  Ordering in bulk? Get a customized quotation based on quantity, size, customization and delivery location.
                </p>
                <p className="text-xs text-wink-charcoal-muted">
                  Pan-India doorstep dispatch • GST Invoicing • Custom wholesale pricing available.
                </p>
              </div>
            </div>

            <button
              onClick={() => openQuoteModal()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-wink-green hover:bg-wink-green-deep text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap hover:scale-105 shrink-0"
            >
              <span>GET BULK QUOTE</span>
              <ArrowRight className="w-4 h-4 text-wink-sand" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
