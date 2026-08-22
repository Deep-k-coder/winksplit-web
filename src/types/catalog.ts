export type ProductCategory = 
  | 'paper-bottles'
  | 'paper-plates'
  | 'kraft-bowls'
  | 'kraft-boxes'
  | 'napkins-tissue'
  | 'honeycomb-rolls';

export interface ProductVariant {
  id: string;
  sizeOrCapacity: string; // e.g. "250 ml", "6 inch", "1-Ply", "20 inch × 50 m"
  gsm?: string; // e.g. "80 GSM", "Heavy-Duty Ribbed Kraft"
  packSize?: string; // e.g. "100 sheets", "50 sheets"
  customerPrice: number; // Numeric representation for calculation (e.g. min range or fixed price)
  priceDisplay: string; // Exact format: e.g. "₹29–35 / piece", "₹2.49 / piece", "₹120–135 / pack", "₹499 / roll", "GET QUOTE"
  priceUnit: 'piece' | 'roll' | 'pack';
  moq: number; // Numeric MOQ
  moqDisplay: string; // Exact format: e.g. "1,000 pieces", "100 packs", "1 roll for sample / wholesale orders available", "Depends on customization"
  dimensions?: string;
  material: string;
  customPrintAvailable: boolean;
  customPrintMoq?: number;
  leadTimeDays?: number;
}

export interface Product {
  id: string;
  categoryId: ProductCategory;
  categoryName: string;
  name: string;
  tagline: string;
  description: string;
  availableSizesSummary: string; // e.g. "250 ml, 500 ml, 750 ml"
  gsmSummary?: string; // e.g. "80 GSM", "Heavy-Duty Virgin Kraft"
  priceSummary: string; // e.g. "₹29–35 / piece", "Starting at ₹2.49 / piece"
  moqSummary: string; // e.g. "1,000 pieces", "100 packs", "1 roll"
  customPrintAvailable: boolean;
  features: string[];
  bestFor: string[];
  imageUrl: string;
  badge?: string; // "BULK PRICING AVAILABLE"
  variants: ProductVariant[];
  foodGrade: boolean;
  compostable: boolean;
  oilResistant: boolean;
  hotColdFriendly: boolean;
  ecoScore: number; // 1-100
}

export interface FilterState {
  category: ProductCategory | 'all';
  searchQuery: string;
  sizeOrCapacity: string;
  gsm: string;
  maxPrice: number;
  minMoq: number;
  customPrintOnly: boolean;
  foodGradeOnly: boolean;
  oilResistantOnly: boolean;
}

export interface RFQItem {
  productId: string;
  productName: string;
  variantId: string;
  sizeOrCapacity: string;
  quantity: number;
  unitPrice: number;
  priceDisplay: string;
  priceUnit: string;
  customPrinting: boolean;
}

export interface QuoteRequestData {
  items: RFQItem[];
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  cityPincode: string;
  businessType: string;
  customLogoNotes?: string;
  timeline: string;
  notes?: string;
}
