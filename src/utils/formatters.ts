// UAE Currency Formatter
export const formatAED = (amount: number): string => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-AE').format(num);
};

// Format IBAN with spaces
export const formatIBAN = (iban: string): string => {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

// Clean IBAN (remove spaces)
export const cleanIBAN = (iban: string): string => {
  return iban.replace(/\s/g, '').toUpperCase();
};

// Validate UAE IBAN format
export const isValidUAEIBANFormat = (iban: string): boolean => {
  const cleaned = cleanIBAN(iban);
  return /^AE\d{21}$/.test(cleaned);
};

// Format LEI
export const formatLEI = (lei: string): string => {
  const cleaned = lei.replace(/\s/g, '').toUpperCase();
  if (cleaned.length !== 20) return cleaned;
  // Format: XXXX XXXX XXXX XXXX XXXX
  return cleaned.replace(/(.{4})/g, '$1 ').trim();
};

// Validate LEI format (20 alphanumeric characters)
export const isValidLEIFormat = (lei: string): boolean => {
  const cleaned = lei.replace(/\s/g, '').toUpperCase();
  return /^[A-Z0-9]{20}$/.test(cleaned);
};

// Format percentage
export const formatPercent = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals)}%`;
};

// Format date/time
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

// Format date only
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-AE', {
    dateStyle: 'medium',
  }).format(date);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Get STP rating color
export const getSTPRatingColor = (score: number): string => {
  if (score >= 90) return '#006C35'; // UAE Green
  if (score >= 70) return '#F59E0B'; // Warning
  return '#CE1126'; // UAE Red
};

// Get STP rating label
export const getSTPRatingLabel = (rating: 'high' | 'medium' | 'low'): string => {
  const labels = {
    high: 'High STP - Likely automatic processing',
    medium: 'Medium STP - May require manual review',
    low: 'Low STP - Manual processing likely',
  };
  return labels[rating] || 'Unknown';
};

// UAE Bank codes
export const UAE_BANK_CODES: Record<string, string> = {
  '010': 'Central Bank of UAE',
  '019': 'First Abu Dhabi Bank',
  '030': 'Abu Dhabi Commercial Bank',
  '033': 'Emirates NBD',
  '035': 'Dubai Islamic Bank',
  '046': 'Commercial Bank of Dubai',
  '050': 'Mashreq Bank',
};

// Get bank name from IBAN
export const getBankNameFromIBAN = (iban: string): string | null => {
  const cleaned = cleanIBAN(iban);
  if (!isValidUAEIBANFormat(cleaned)) return null;
  const bankCode = cleaned.substring(4, 7);
  return UAE_BANK_CODES[bankCode] || null;
};
