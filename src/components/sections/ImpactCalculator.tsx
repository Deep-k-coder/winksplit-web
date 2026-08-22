import React, { useState } from 'react';
import { Leaf, Trees, Wind, Sparkles, ArrowRight } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';
import { useCatalog } from '../../context/CatalogContext';

export const ImpactCalculator: React.FC = () => {
  const { openQuoteModal } = useCatalog();
  const [monthlyOrders, setMonthlyOrders] = useState<number>(5000);

  // Formulas
  // Average plastic packaging per meal = ~38 grams
  // Paper vs plastic CO2 reduction = ~45% less carbon lifecycle footprint
  // Plastic bottles/boxes diverted
  const plasticKgSaved = Math.round((monthlyOrders * 0.038 * 12));
  const plasticUnitsEliminated = Math.round(monthlyOrders * 2.2 * 12);
  const co2AvertedKg = Math.round(plasticKgSaved * 2.4);
  const equivalentTreesPlanted = Math.round(co2AvertedKg / 22);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-wink-ivory-200 via-wink-sand-light/50 to-wink-green-mint/30 rounded-3xl p-8 sm:p-12 border border-wink-kraft-light/40 shadow-paper-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Interactive Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wink-green text-white text-xs font-bold uppercase tracking-wider">
                <Leaf className="w-3.5 h-3.5 text-wink-sand" />
                <span>Sustainability Impact Calculator</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-wink-green-deep font-serif leading-tight">
                Calculate Your Plastic Reduction Footprint
              </h2>

              <p className="text-sm text-wink-charcoal-light leading-relaxed">
                Indian consumers increasingly prefer eco-conscious dining. See how much single-use plastic waste your café, cloud kitchen, or restaurant can divert each year by switching to WINKSPLIT paper packaging.
              </p>

              {/* Slider Control */}
              <div className="bg-white p-6 rounded-2xl border border-wink-kraft-light/40 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-wink-charcoal tracking-wider">
                    Monthly Orders / Takeaway Meals:
                  </span>
                  <span className="text-xl font-black font-mono text-wink-green-deep">
                    {formatNumber(monthlyOrders)} <span className="text-xs font-normal text-wink-charcoal-muted">/ month</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={500}
                  max={50000}
                  step={500}
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-wink-ivory-300 rounded-lg appearance-none cursor-pointer accent-wink-green"
                />

                <div className="flex justify-between text-[10px] text-wink-charcoal-muted font-mono font-medium">
                  <span>500 orders</span>
                  <span>10,000</span>
                  <span>25,000</span>
                  <span>50,000 orders/mo</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Metrics Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Metric 1 */}
                <div className="bg-white p-5 rounded-2xl border border-wink-kraft-light/40 shadow-paper-sm text-center">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2 font-bold">
                    🛡️
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-wink-green-deep">
                    {formatNumber(plasticKgSaved)} kg
                  </div>
                  <div className="text-xs font-semibold text-wink-charcoal mt-0.5">
                    Plastic Waste Prevented
                  </div>
                  <div className="text-[10px] text-wink-charcoal-muted mt-0.5">
                    Annual landfill reduction
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white p-5 rounded-2xl border border-wink-kraft-light/40 shadow-paper-sm text-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-wink-green-deep">
                    {formatNumber(plasticUnitsEliminated)}
                  </div>
                  <div className="text-xs font-semibold text-wink-charcoal mt-0.5">
                    Single-Use Plastics Replaced
                  </div>
                  <div className="text-[10px] text-wink-charcoal-muted mt-0.5">
                    Bowls, lids, and boxes diverted
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white p-5 rounded-2xl border border-wink-kraft-light/40 shadow-paper-sm text-center">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-2">
                    <Wind className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-wink-green-deep">
                    {formatNumber(co2AvertedKg)} kg
                  </div>
                  <div className="text-xs font-semibold text-wink-charcoal mt-0.5">
                    CO₂ Carbon Averted
                  </div>
                  <div className="text-[10px] text-wink-charcoal-muted mt-0.5">
                    Greener supply lifecycle
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white p-5 rounded-2xl border border-wink-kraft-light/40 shadow-paper-sm text-center">
                  <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center mx-auto mb-2">
                    <Trees className="w-5 h-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-wink-green-deep">
                    {formatNumber(equivalentTreesPlanted)}
                  </div>
                  <div className="text-xs font-semibold text-wink-charcoal mt-0.5">
                    Tree Offset Equivalent
                  </div>
                  <div className="text-[10px] text-wink-charcoal-muted mt-0.5">
                    Natural carbon sequestration
                  </div>
                </div>

              </div>

              {/* Bottom conversion CTA */}
              <div className="bg-wink-green-deep text-white p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <span className="text-xs font-bold text-wink-sand block">
                    Display Eco-Badges on your Zomato / Swiggy / In-store Menus
                  </span>
                  <span className="text-[11px] text-wink-ivory-300/80">
                    We provide partner eco-certificates and digital green badges.
                  </span>
                </div>
                <a
                  href="#contact"
                  className="px-4 py-2 rounded-xl bg-wink-kraft hover:bg-wink-kraft-medium text-white text-xs font-bold transition-transform hover:scale-105 whitespace-nowrap"
                >
                  Connect With Us
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
