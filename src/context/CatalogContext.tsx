import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, ProductCategory, FilterState, RFQItem } from '../types/catalog';
import { INITIAL_PRODUCTS } from '../data/products';

interface CatalogContextType {
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedProduct: Product | null;
  selectedVariant: ProductVariant | null;
  setSelectedProduct: (product: Product | null, variantId?: string) => void;
  setSelectedVariantId: (variantId: string) => void;
  
  // RFQ / Bulk Quote Management
  quoteItems: RFQItem[];
  addToQuote: (productOrItem: Product | RFQItem, variantId?: string, quantity?: number, customPrinting?: boolean) => void;
  removeFromQuote: (variantId: string) => void;
  updateQuoteItemQty: (variantId: string, quantity: number) => void;
  clearQuote: () => void;
  
  // Modals
  isProductModalOpen: boolean;
  setIsProductModalOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  
  // Catalog Management (for WINKSPLIT dynamic expansion)
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetCatalog: () => void;
  exportCatalogJSON: () => string;
  importCatalogJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'winksplit_catalog_v4';
const QUOTE_STORAGE_KEY = 'winksplit_quote_items_v1';

const initialFilterState: FilterState = {
  category: 'all',
  searchQuery: '',
  sizeOrCapacity: 'all',
  gsm: 'all',
  maxPrice: 3000,
  minMoq: 0,
  customPrintOnly: false,
  foodGradeOnly: false,
  oilResistantOnly: false,
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse catalog from local storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  const [quoteItems, setQuoteItems] = useState<RFQItem[]>(() => {
    try {
      const saved = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantIdState] = useState<string | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync products to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save catalog to local storage', e);
    }
  }, [products]);

  // Sync quote items
  useEffect(() => {
    try {
      localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quoteItems));
    } catch (e) {
      // ignore
    }
  }, [quoteItems]);

  const setSelectedProduct = (product: Product | null, variantId?: string) => {
    setSelectedProductState(product);
    if (product) {
      if (variantId && product.variants.some(v => v.id === variantId)) {
        setSelectedVariantIdState(variantId);
      } else if (product.variants.length > 0) {
        setSelectedVariantIdState(product.variants[0].id);
      }
      setIsProductModalOpen(true);
    } else {
      setIsProductModalOpen(false);
      setSelectedVariantIdState(null);
    }
  };

  const setSelectedVariantId = (variantId: string) => {
    setSelectedVariantIdState(variantId);
  };

  const selectedVariant = selectedProduct?.variants.find(v => v.id === selectedVariantId) || selectedProduct?.variants[0] || null;

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  // RFQ functions
  const addToQuote = (
    productOrItem: Product | RFQItem,
    variantId?: string,
    quantity?: number,
    customPrinting?: boolean
  ) => {
    let itemToAdd: RFQItem;

    if ('priceDisplay' in productOrItem && 'variantId' in productOrItem) {
      itemToAdd = productOrItem as RFQItem;
    } else {
      const product = productOrItem as Product;
      const variant = product.variants.find(v => v.id === variantId) || product.variants[0];
      itemToAdd = {
        productId: product.id,
        productName: product.name,
        variantId: variant.id,
        sizeOrCapacity: variant.sizeOrCapacity,
        quantity: quantity || variant.moq || 1000,
        unitPrice: variant.customerPrice,
        priceDisplay: variant.priceDisplay,
        priceUnit: variant.priceUnit,
        customPrinting: customPrinting || false,
      };
    }

    setQuoteItems(prev => {
      const index = prev.findIndex(item => item.variantId === itemToAdd.variantId);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity + itemToAdd.quantity };
        return updated;
      }
      return [...prev, itemToAdd];
    });
  };

  const removeFromQuote = (variantId: string) => {
    setQuoteItems(prev => prev.filter(item => item.variantId !== variantId));
  };

  const updateQuoteItemQty = (variantId: string, quantity: number) => {
    setQuoteItems(prev => prev.map(item => item.variantId === variantId ? { ...item, quantity } : item));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  // Dynamic Catalog Administration
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportCatalogJSON = () => {
    return JSON.stringify(products, null, 2);
  };

  const importCatalogJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].variants) {
        setProducts(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid catalog JSON', e);
    }
    return false;
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        filterState,
        setFilterState,
        selectedProduct,
        selectedVariant,
        setSelectedProduct,
        setSelectedVariantId,
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuoteItemQty,
        clearQuote,
        isProductModalOpen,
        setIsProductModalOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        isAdminModalOpen,
        setIsAdminModalOpen,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        exportCatalogJSON,
        importCatalogJSON,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
