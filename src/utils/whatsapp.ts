import { WINKSPLIT_CONTACT } from '../data/products';

export interface WhatsAppOrderParams {
  productName?: string;
  sizeOrCapacity?: string;
  quantity?: number | string;
  customPrinting?: boolean | string;
  deliveryLocation?: string;
}

/**
 * Creates the official WINKSPLIT WhatsApp enquiry URL
 * Following the required message format:
 * 
 * Hello WINKSPLIT,
 * 
 * I am interested in:
 * 
 * Product: [Product]
 * Size: [Size]
 * Quantity: [Quantity]
 * Custom Printing: [Yes/No]
 * Delivery Location: [Location]
 * 
 * Please share your best bulk quotation.
 */
export function generateWhatsAppLink(params?: WhatsAppOrderParams): string {
  const phone = WINKSPLIT_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');

  if (!params || (!params.productName && !params.quantity)) {
    const defaultText = `Hello WINKSPLIT,

I am interested in:

Product: Eco-Friendly Paper Packaging
Size: All Available Sizes
Quantity: Bulk Order Enquiry
Custom Printing: Yes / Standard
Delivery Location: India

Please share your best bulk quotation.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`;
  }

  const customPrintText = typeof params.customPrinting === 'boolean' 
    ? (params.customPrinting ? 'Yes' : 'No')
    : (params.customPrinting || 'No');

  const message = `Hello WINKSPLIT,

I am interested in:

Product: ${params.productName || 'Eco-Friendly Paper Packaging'}
Size: ${params.sizeOrCapacity || 'Standard'}
Quantity: ${params.quantity || '1,000 units'}
Custom Printing: ${customPrintText}
Delivery Location: ${params.deliveryLocation || 'India'}

Please share your best bulk quotation.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generateCustomPrintWhatsAppLink(productName?: string, estQuantity?: number): string {
  const phone = WINKSPLIT_CONTACT.whatsappNumber.replace(/[^0-9]/g, '');
  const message = `Hello WINKSPLIT,

I am interested in:

Product: ${productName || 'Custom Printed Paper Packaging'}
Size: Standard / Custom
Quantity: ${estQuantity ? `${estQuantity} units` : '5,000 units'}
Custom Printing: Yes (Custom Logo & Brand Artwork)
Delivery Location: India

Please share your best bulk quotation.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
