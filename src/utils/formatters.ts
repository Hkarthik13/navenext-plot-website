/**
 * Indian currency and real estate formatting utilities
 */

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  if (amount >= 10000000) {
    const crores = amount / 10000000;
    return `₹${crores.toFixed(crores % 1 === 0 ? 1 : 2)} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 1 : 2)} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatIndianNumber(num: number): string {
  if (isNaN(num)) return '0';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatSqFt(sqft: number): string {
  return `${formatIndianNumber(sqft)} sq.ft`;
}

export function formatPricePerSqFt(pricePerSqFt: number): string {
  return `₹${formatIndianNumber(pricePerSqFt)} / sq.ft`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}
