import React, { useState } from 'react';
import { 
  X, Plus, Edit2, Trash2, Download, Upload, RefreshCw, 
  Check, ShieldAlert, Settings, Save, Sparkles 
} from 'lucide-react';
import { useCatalog } from '../../context/CatalogContext';
import { Product, ProductVariant, ProductCategory } from '../../types/catalog';
import { formatINR } from '../../utils/formatters';

export const AdminCatalogModal: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    products, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    resetCatalog,
    exportCatalogJSON,
    importCatalogJSON
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<'products' | 'import-export'>('products');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // New Variant Form State inside an edited product
  const [newVariant, setNewVariant] = useState<Partial<ProductVariant>>({
    sizeOrCapacity: '',
    gsm: '300 GSM',
    customerPrice: 10,
    priceUnit: 'piece',
    moq: 1000,
    material: 'Virgin Food Grade Kraft Board',
    customPrintAvailable: true,
  });

  if (!isAdminModalOpen) return null;

  const currentProduct = products.find(p => p.id === editingProductId);

  const handleSaveProductChanges = (updated: Product) => {
    updateProduct(updated);
    setEditingProductId(null);
  };

  const handleAddNewVariantToProduct = () => {
    if (!currentProduct || !newVariant.sizeOrCapacity) return;
    
    const variantId = `var-${Date.now()}`;
    const variantToAdd: ProductVariant = {
      id: variantId,
      sizeOrCapacity: newVariant.sizeOrCapacity || 'Standard',
      gsm: newVariant.gsm || 'Food Grade Kraft',
      customerPrice: Number(newVariant.customerPrice) || 10,
      priceDisplay: `₹${Number(newVariant.customerPrice) || 10} / ${(newVariant.priceUnit as any) || 'piece'}`,
      priceUnit: (newVariant.priceUnit as any) || 'piece',
      moq: Number(newVariant.moq) || 1000,
      moqDisplay: `${(Number(newVariant.moq) || 1000).toLocaleString('en-IN')} ${(newVariant.priceUnit as any) || 'piece'}s`,
      material: newVariant.material || 'Virgin Kraft',
      customPrintAvailable: Boolean(newVariant.customPrintAvailable),
      leadTimeDays: 4,
    };

    const updated = {
      ...currentProduct,
      variants: [...currentProduct.variants, variantToAdd],
    };
    updateProduct(updated);
    
    // Reset variant form
    setNewVariant({
      sizeOrCapacity: '',
      gsm: '300 GSM',
      customerPrice: 10,
      priceUnit: 'piece',
      moq: 1000,
      material: 'Virgin Food Grade Kraft Board',
      customPrintAvailable: true,
    });
  };

  const handleDeleteVariant = (variantId: string) => {
    if (!currentProduct) return;
    if (currentProduct.variants.length <= 1) {
      alert('A product must have at least one variant.');
      return;
    }
    const updated = {
      ...currentProduct,
      variants: currentProduct.variants.filter(v => v.id !== variantId),
    };
    updateProduct(updated);
  };

  const handleExport = () => {
    const json = exportCatalogJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `winksplit_catalog_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleImport = () => {
    const success = importCatalogJSON(jsonInput);
    if (success) {
      setImportStatus('Catalog imported successfully!');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Error: Invalid JSON format.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl border border-wink-kraft-light/40 shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-wink-green-deep text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wink-green-emerald flex items-center justify-center">
              <Settings className="w-5 h-5 text-wink-sand" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">
                WINKSPLIT Product Catalog Manager
              </h2>
              <p className="text-xs text-wink-ivory-300/80">
                Easily update customer prices, add new sizes, configure GSM, and manage MOQs
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-wink-kraft-light/30 bg-wink-ivory-100 px-6 pt-2">
          <button
            onClick={() => { setActiveTab('products'); setEditingProductId(null); }}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-wink-green text-wink-green'
                : 'border-transparent text-wink-charcoal-muted hover:text-wink-charcoal'
            }`}
          >
            Manage Products & Variants ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('import-export')}
            className={`py-3 px-4 font-bold text-xs border-b-2 transition-all ${
              activeTab === 'import-export'
                ? 'border-wink-green text-wink-green'
                : 'border-transparent text-wink-charcoal-muted hover:text-wink-charcoal'
            }`}
          >
            Export / Import JSON Data
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {activeTab === 'products' && !editingProductId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-wink-charcoal">
                  Live WINKSPLIT Catalog Items
                </span>
                <button
                  onClick={resetCatalog}
                  className="text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Catalog</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-2xl border border-wink-kraft-light/40 bg-wink-ivory-50 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-wink-kraft-dark uppercase">
                          {p.categoryName}
                        </span>
                        <span className="text-[11px] font-mono text-wink-charcoal-muted">
                          {p.variants.length} variant(s)
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-wink-green-deep">{p.name}</h4>
                      <p className="text-xs text-wink-charcoal-muted line-clamp-1">{p.tagline}</p>
                    </div>

                    {/* Variants list preview */}
                    <div className="bg-white rounded-xl p-3 border border-wink-kraft-light/20 space-y-1 text-xs">
                      {p.variants.map((v) => (
                        <div key={v.id} className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-wink-charcoal">{v.sizeOrCapacity}</span>
                          <span className="font-mono text-wink-green font-bold">{formatINR(v.customerPrice)}/{v.priceUnit}</span>
                          <span className="text-wink-charcoal-muted">MOQ: {v.moq}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setEditingProductId(p.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-wink-green text-white text-xs font-bold hover:bg-wink-green-deep transition-colors flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Sizes & Prices</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Product Variant Editor View */}
          {activeTab === 'products' && editingProductId && currentProduct && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs uppercase font-bold text-wink-kraft-dark">Editing Product</span>
                  <h3 className="text-xl font-bold text-wink-green-deep">{currentProduct.name}</h3>
                </div>
                <button
                  onClick={() => setEditingProductId(null)}
                  className="px-3 py-1.5 rounded-xl bg-wink-ivory-200 text-xs font-bold text-wink-charcoal hover:bg-wink-ivory-300"
                >
                  Back to List
                </button>
              </div>

              {/* Existing Variants Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-wink-charcoal mb-3">
                  Current Variants ({currentProduct.variants.length})
                </h4>

                <div className="space-y-2.5">
                  {currentProduct.variants.map((v) => (
                    <div
                      key={v.id}
                      className="p-4 rounded-2xl bg-wink-ivory-50 border border-wink-kraft-light/30 grid grid-cols-1 sm:grid-cols-6 gap-3 items-center"
                    >
                      <div>
                        <label className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Size / Capacity</label>
                        <input
                          type="text"
                          value={v.sizeOrCapacity}
                          onChange={(e) => {
                            const updatedVariants = currentProduct.variants.map(item => item.id === v.id ? { ...item, sizeOrCapacity: e.target.value } : item);
                            updateProduct({ ...currentProduct, variants: updatedVariants });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">GSM / Spec</label>
                        <input
                          type="text"
                          value={v.gsm || ''}
                          onChange={(e) => {
                            const updatedVariants = currentProduct.variants.map(item => item.id === v.id ? { ...item, gsm: e.target.value } : item);
                            updateProduct({ ...currentProduct, variants: updatedVariants });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Customer Price (₹)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={v.customerPrice}
                          onChange={(e) => {
                            const updatedVariants = currentProduct.variants.map(item => item.id === v.id ? { ...item, customerPrice: parseFloat(e.target.value) || 0 } : item);
                            updateProduct({ ...currentProduct, variants: updatedVariants });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">Unit</label>
                        <select
                          value={v.priceUnit}
                          onChange={(e) => {
                            const updatedVariants = currentProduct.variants.map(item => item.id === v.id ? { ...item, priceUnit: e.target.value as any } : item);
                            updateProduct({ ...currentProduct, variants: updatedVariants });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                        >
                          <option value="piece">piece</option>
                          <option value="roll">roll</option>
                          <option value="pack">pack</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-wink-charcoal-muted block">MOQ</label>
                        <input
                          type="number"
                          step="100"
                          value={v.moq}
                          onChange={(e) => {
                            const updatedVariants = currentProduct.variants.map(item => item.id === v.id ? { ...item, moq: parseInt(e.target.value) || 1 } : item);
                            updateProduct({ ...currentProduct, variants: updatedVariants });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono font-bold bg-white"
                        />
                      </div>

                      <div className="text-right">
                        <button
                          onClick={() => handleDeleteVariant(v.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete variant"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Variant Box */}
              <div className="bg-wink-ivory-100/80 p-5 rounded-2xl border border-dashed border-wink-kraft-medium/50 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-wink-green-deep flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add New Variant to {currentProduct.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-wink-charcoal block mb-1">Size / Capacity *</label>
                    <input
                      type="text"
                      placeholder="e.g. 1200 ml, 14 inch"
                      value={newVariant.sizeOrCapacity}
                      onChange={(e) => setNewVariant({ ...newVariant, sizeOrCapacity: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-wink-charcoal block mb-1">GSM / Material</label>
                    <input
                      type="text"
                      placeholder="e.g. 350 GSM Kraft"
                      value={newVariant.gsm}
                      onChange={(e) => setNewVariant({ ...newVariant, gsm: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-wink-charcoal block mb-1">Price (₹)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="15.00"
                      value={newVariant.customerPrice}
                      onChange={(e) => setNewVariant({ ...newVariant, customerPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-wink-charcoal block mb-1">MOQ</label>
                    <input
                      type="number"
                      placeholder="1000"
                      value={newVariant.moq}
                      onChange={(e) => setNewVariant({ ...newVariant, moq: parseInt(e.target.value) || 1 })}
                      className="w-full px-3 py-2 rounded-lg border text-xs bg-white"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleAddNewVariantToProduct}
                      disabled={!newVariant.sizeOrCapacity}
                      className="w-full py-2 px-3 rounded-lg bg-wink-green hover:bg-wink-green-deep disabled:opacity-50 text-white font-bold text-xs transition-colors"
                    >
                      + Add Variant
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setEditingProductId(null)}
                  className="px-6 py-2.5 rounded-xl bg-wink-green text-white font-bold text-xs"
                >
                  Save & Return
                </button>
              </div>
            </div>
          )}

          {/* Import / Export Tab */}
          {activeTab === 'import-export' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-wink-green-deep mb-1">Backup or Restore Catalog</h4>
                <p className="text-xs text-wink-charcoal-muted">
                  Export the entire WINKSPLIT catalog JSON or paste updated data to deploy new seasonal pricing and SKUs.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="px-4 py-2.5 rounded-xl bg-wink-green text-white text-xs font-bold hover:bg-wink-green-deep transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Catalog Backup JSON</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-wink-charcoal">
                  Paste JSON to Import
                </label>
                <textarea
                  rows={8}
                  placeholder="Paste valid Product[] JSON here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full p-3 font-mono text-xs border rounded-xl bg-wink-ivory-50 focus:ring-2 focus:ring-wink-green"
                />

                {importStatus && (
                  <p className={`text-xs font-bold ${importStatus.includes('Error') ? 'text-red-600' : 'text-emerald-700'}`}>
                    {importStatus}
                  </p>
                )}

                <button
                  onClick={handleImport}
                  disabled={!jsonInput.trim()}
                  className="px-4 py-2 rounded-xl bg-wink-kraft hover:bg-wink-kraft-medium disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import & Apply Catalog</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
