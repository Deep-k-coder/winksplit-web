/**
 * Formats numbers into Indian Rupee (INR ₹) format
 */
export function formatINR(amount: number, decimals: number = 2): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  
  // If whole number and decimals not strictly requested as > 0
  const isWhole = Number.isInteger(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWhole && decimals === 0 ? 0 : decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  return formatted;
}

export function formatPricePerUnit(price: number, unit: string): string {
  const formatted = formatINR(price, price < 5 ? 2 : 2);
  return `${formatted} / ${unit}`;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}
