// UAE Corridor Data - Real PPC codes from regulatory sources
// Data extracted from shared-data/ppc-codes/PPC codes 2025

export interface CorridorMarket {
  code: string;
  name: string;
  currency: string;
  flag: string;
  totalCodes: number;
  codeSetId: string;
  regulatoryBody: string;
  isoAligned: boolean;
  sampleCodes: MarketCode[];
  topCategories: Record<string, number>;
  remittanceRank?: number; // UAE outbound remittance ranking
  estimatedVolume?: string; // Estimated annual volume
}

export interface MarketCode {
  code: string;
  purpose: string;
  description: string;
  category: string;
}

export interface CorridorInfo {
  send: CorridorMarket;
  receive: CorridorMarket;
  complexity: 'low' | 'medium' | 'high' | 'very_high';
  commonUseCases: string[];
  challenges: string[];
}

// UAE - Source Market (113 codes)
export const UAE_MARKET: CorridorMarket = {
  code: 'AE',
  name: 'United Arab Emirates',
  currency: 'AED',
  flag: 'AE',
  totalCodes: 113,
  codeSetId: 'PPCAE',
  regulatoryBody: 'Central Bank of UAE (CBUAE)',
  isoAligned: false,
  topCategories: {
    'Loans & Credit': 12,
    'Equity & Investment': 15,
    'Services': 18,
    'Transfers & Remittances': 8,
    'Trade & Goods': 10,
    'Salary & Compensation': 6,
  },
  sampleCodes: [
    { code: 'FAM', purpose: 'Family Support (Workers\' remittances)', description: 'Cross Border & Domestic', category: 'Remittance' },
    { code: 'SAL', purpose: 'Salary (Compensation of employees)', description: 'Cross Border & Domestic', category: 'Payroll' },
    { code: 'GDE', purpose: 'Goods Sold (Exports in fob value)', description: 'Cross Border & Domestic', category: 'Trade' },
    { code: 'GDI', purpose: 'Goods Bought (Imports in cif value)', description: 'Cross Border & Domestic', category: 'Trade' },
    { code: 'EDU', purpose: 'Educational Support', description: 'Cross Border & Domestic', category: 'Services' },
    { code: 'EOS', purpose: 'End of Service / Final Settlement', description: 'Cross Border & Domestic', category: 'Payroll' },
    { code: 'ALW', purpose: 'Allowance', description: 'Cross Border & Domestic', category: 'Payroll' },
    { code: 'REN', purpose: 'Rent Payments', description: 'Cross Border & Domestic', category: 'Services' },
    { code: 'MED', purpose: 'Medical Treatment', description: 'Cross Border & Domestic', category: 'Services' },
    { code: 'INS', purpose: 'Insurance services', description: 'Cross Border & Domestic', category: 'Services' },
    { code: 'DIV', purpose: 'Dividend Payouts From FI', description: 'Cross Border & Domestic', category: 'Investment' },
    { code: 'LIP', purpose: 'Loan Interest Payments', description: 'Cross Border & Domestic', category: 'Loans' },
    { code: 'COM', purpose: 'Commission', description: 'Cross Border & Domestic', category: 'Fees' },
    { code: 'CHC', purpose: 'Charitable Contributions (Charity and Aid)', description: 'Cross Border & Domestic', category: 'Transfers' },
    { code: 'ITS', purpose: 'Computer services', description: 'Cross Border & Domestic', category: 'Services' },
  ],
};

// India - #1 UAE Remittance Corridor (303 codes)
export const INDIA_MARKET: CorridorMarket = {
  code: 'IN',
  name: 'India',
  currency: 'INR',
  flag: 'IN',
  totalCodes: 303,
  codeSetId: 'PPCIN',
  regulatoryBody: 'Reserve Bank of India (RBI)',
  isoAligned: false,
  remittanceRank: 1,
  estimatedVolume: '$20B+',
  topCategories: {
    'Other Business Services': 42,
    'Transport': 42,
    'Insurance and Pension Services': 20,
    'Primary Income': 18,
    'Telecom, Computer & Information': 17,
    'Personal, Cultural & Recreational': 16,
    'Secondary Income': 13,
    'Travel': 9,
  },
  sampleCodes: [
    { code: 'S0301', purpose: 'Remittance by foreign nationals - Personal', description: 'Remittance by non-residents towards family maintenance and savings', category: 'Remittance' },
    { code: 'S0302', purpose: 'Remittance to NRIs - Family Maintenance', description: 'Remittance towards family maintenance from India', category: 'Remittance' },
    { code: 'S0305', purpose: 'Remittance for education expenses', description: 'Payment for education fees, hostel, living expenses abroad', category: 'Education' },
    { code: 'S0101', purpose: 'Advance Payment against imports', description: 'Advance payment against imports made to countries other than Nepal and Bhutan', category: 'Trade' },
    { code: 'S0102', purpose: 'Payment towards imports - settlement', description: 'Payment towards imports- settlement of invoice other than Nepal and Bhutan', category: 'Trade' },
    { code: 'S0201', purpose: 'Transport - Shipping surplus freight', description: 'Payments for surplus freight/passenger fare by foreign shipping companies', category: 'Transport' },
    { code: 'S0501', purpose: 'Software services', description: 'Software exports/imports - development, maintenance, licensing', category: 'IT Services' },
    { code: 'S0306', purpose: 'Medical expenses', description: 'Remittance for medical treatment abroad', category: 'Medical' },
    { code: 'S0003', purpose: 'FDI - Equity abroad', description: 'Indian Direct investment abroad in equity shares', category: 'Investment' },
    { code: 'S0023', purpose: 'LRS - Liberalised Remittance Scheme', description: 'Remittances made under Liberalised Remittance Scheme for Individuals', category: 'Remittance' },
    { code: 'P0001', purpose: 'Inward remittance from Indian workers', description: 'Workers remittance received from Indians employed abroad', category: 'Remittance' },
    { code: 'P0003', purpose: 'Personal gifts and donations', description: 'Personal gifts and donations from abroad', category: 'Transfers' },
    { code: 'P0005', purpose: 'Pensions received', description: 'Pension received from abroad', category: 'Pension' },
    { code: 'S0401', purpose: 'Business travel', description: 'Travel expenses for business purposes', category: 'Travel' },
    { code: 'S0601', purpose: 'Commission on exports', description: 'Commission agent charges on exports', category: 'Services' },
  ],
};

// Pakistan - #2 UAE Remittance Corridor (272 codes)
export const PAKISTAN_MARKET: CorridorMarket = {
  code: 'PK',
  name: 'Pakistan',
  currency: 'PKR',
  flag: 'PK',
  totalCodes: 272,
  codeSetId: 'PPCPK',
  regulatoryBody: 'State Bank of Pakistan (SBP)',
  isoAligned: false,
  remittanceRank: 2,
  estimatedVolume: '$6B+',
  topCategories: {
    'Transport (Sea/Air/Road)': 35,
    'Travel': 28,
    'Workers Remittances': 22,
    'Communication Services': 15,
    'Insurance': 18,
    'Government Services': 12,
    'Investment Income': 20,
  },
  sampleCodes: [
    { code: '9301', purpose: 'Workers remittance - Wages', description: 'Remittances by Pakistani workers abroad', category: 'Remittance' },
    { code: '9302', purpose: 'Workers remittance - Savings', description: 'Savings remittances by Pakistani workers', category: 'Remittance' },
    { code: '9303', purpose: 'Workers remittance - Pensions', description: 'Pension remittances', category: 'Pension' },
    { code: '9010', purpose: 'Sea Transport - Shipping earnings', description: 'Earnings of Pak shipping Companies', category: 'Transport' },
    { code: '9016', purpose: 'Air Transport - Airline earnings', description: 'Earnings of Pakistan airlines', category: 'Transport' },
    { code: '9071', purpose: 'Education - Students', description: 'Education related travel for students', category: 'Education' },
    { code: '9061', purpose: 'Health related travel', description: 'Medical treatment abroad', category: 'Medical' },
    { code: '9081', purpose: 'Tourism - Pak nationals', description: 'Tourist travel by Pakistani nationals', category: 'Travel' },
    { code: '9083', purpose: 'Religious travel', description: 'Hajj and religious pilgrimage', category: 'Travel' },
    { code: '9091', purpose: 'Postal and Courier services', description: 'Communication services - postal', category: 'Services' },
    { code: '9121', purpose: 'Construction services', description: 'Construction and engineering services', category: 'Services' },
    { code: '9201', purpose: 'Merchandise - Exports', description: 'Export of goods', category: 'Trade' },
    { code: '9211', purpose: 'Merchandise - Imports', description: 'Import of goods', category: 'Trade' },
    { code: '9401', purpose: 'Direct Investment - Equity', description: 'Foreign direct investment in equity', category: 'Investment' },
    { code: '9501', purpose: 'Dividends', description: 'Dividend payments', category: 'Investment' },
  ],
};

// Philippines - #3 UAE Remittance Corridor (199 codes)
export const PHILIPPINES_MARKET: CorridorMarket = {
  code: 'PH',
  name: 'Philippines',
  currency: 'PHP',
  flag: 'PH',
  totalCodes: 199,
  codeSetId: 'PPCPH',
  regulatoryBody: 'Bangko Sentral ng Pilipinas (BSP)',
  isoAligned: false,
  remittanceRank: 3,
  estimatedVolume: '$4B+',
  topCategories: {
    'Donations/Gifts': 15,
    'Expenditures': 25,
    'Government-related Payments': 18,
    'Personal Remittances': 20,
    'Business Income': 12,
    'Investment': 10,
  },
  sampleCodes: [
    { code: '5310', purpose: 'Donations/Gifts - Individual', description: 'Donations paid to an individual', category: 'Remittance' },
    { code: '5311', purpose: 'Donations/Gifts - Institution', description: 'Donations paid to an institution', category: 'Charity' },
    { code: '5132', purpose: 'Education expenses - Philippines', description: 'For studying in the Philippines', category: 'Education' },
    { code: '5137', purpose: 'Training expenses - Philippines', description: 'For a seminar or training in the Philippines', category: 'Education' },
    { code: '5134', purpose: 'Credit Card Payment', description: 'Credit card expenditure payments', category: 'Payments' },
    { code: '5140', purpose: 'Foreign Office maintenance', description: 'Maintenance expenses of foreign offices in the Philippines', category: 'Government' },
    { code: '5175', purpose: 'Local Publication Subscription', description: 'Subscription payments for local publications', category: 'Services' },
    { code: '5201', purpose: 'OFW Remittance - Family support', description: 'Overseas Filipino Worker family support', category: 'Remittance' },
    { code: '5202', purpose: 'OFW Remittance - Savings', description: 'Overseas Filipino Worker savings', category: 'Remittance' },
    { code: '5301', purpose: 'Real estate purchase', description: 'Purchase of property in Philippines', category: 'Investment' },
    { code: '5401', purpose: 'Business capital', description: 'Capital for business ventures', category: 'Investment' },
    { code: '5501', purpose: 'Loan repayment', description: 'Payment of loans', category: 'Loans' },
    { code: '5601', purpose: 'Insurance premium', description: 'Insurance premium payments', category: 'Insurance' },
    { code: '5701', purpose: 'Medical expenses', description: 'Medical treatment payments', category: 'Medical' },
    { code: '5801', purpose: 'Legal fees', description: 'Legal service payments', category: 'Services' },
  ],
};

// Bangladesh - #4 UAE Remittance Corridor (666 codes - most complex!)
export const BANGLADESH_MARKET: CorridorMarket = {
  code: 'BD',
  name: 'Bangladesh',
  currency: 'BDT',
  flag: 'BD',
  totalCodes: 666,
  codeSetId: 'PPCBD',
  regulatoryBody: 'Bangladesh Bank',
  isoAligned: false,
  remittanceRank: 4,
  estimatedVolume: '$3B+',
  topCategories: {
    'Transportation (Sea/Air/Road)': 120,
    'Workers Remittances': 45,
    'Trade Services': 85,
    'Government Services': 40,
    'Financial Services': 55,
    'Professional Services': 35,
  },
  sampleCodes: [
    { code: '0010', purpose: 'Sea Transport - Passenger surplus', description: 'Surplus passage earnings by Bangladesh Shipping Corporation', category: 'Transport' },
    { code: '0020', purpose: 'Sea Transport - Freight surplus', description: 'Surplus freight remittances by Bangladesh Shipping Corporation', category: 'Transport' },
    { code: '0110', purpose: 'Air Transport - Passenger surplus', description: 'Surplus passage earnings received by Bangladesh Biman', category: 'Transport' },
    { code: '1801', purpose: 'Workers remittance - Wage earners', description: 'Remittances received from Bangladeshi wage earners', category: 'Remittance' },
    { code: '1802', purpose: 'Workers remittance - Professionals', description: 'Remittances by Bangladeshi professionals abroad', category: 'Remittance' },
    { code: '1803', purpose: 'Workers remittance - Other workers', description: 'Other worker remittances', category: 'Remittance' },
    { code: '2101', purpose: 'Exports - RMG (Ready Made Garments)', description: 'Export of ready made garments', category: 'Trade' },
    { code: '2102', purpose: 'Exports - Textiles', description: 'Export of textile products', category: 'Trade' },
    { code: '2201', purpose: 'Imports - Capital machinery', description: 'Import of capital machinery', category: 'Trade' },
    { code: '2202', purpose: 'Imports - Raw materials', description: 'Import of raw materials for industry', category: 'Trade' },
    { code: '3101', purpose: 'FDI - Equity investment', description: 'Foreign direct investment in equity', category: 'Investment' },
    { code: '3201', purpose: 'Portfolio investment', description: 'Portfolio investment inflows', category: 'Investment' },
    { code: '4101', purpose: 'Dividend repatriation', description: 'Repatriation of dividends', category: 'Investment' },
    { code: '4201', purpose: 'Profit repatriation', description: 'Repatriation of branch profits', category: 'Investment' },
    { code: '5101', purpose: 'Education expenses abroad', description: 'Payment for education abroad', category: 'Education' },
  ],
};

// Egypt - Regional Corridor (14 codes - simplest, almost ISO-aligned)
export const EGYPT_MARKET: CorridorMarket = {
  code: 'EG',
  name: 'Egypt',
  currency: 'EGP',
  flag: 'EG',
  totalCodes: 14,
  codeSetId: 'PPCEG',
  regulatoryBody: 'Central Bank of Egypt (CBE)',
  isoAligned: true, // Uses ISO-like codes
  remittanceRank: 5,
  estimatedVolume: '$2B+',
  topCategories: {
    'Salary & Wages': 2,
    'Government': 2,
    'Loans': 2,
    'Social Security': 2,
    'Other': 6,
  },
  sampleCodes: [
    { code: 'SALA', purpose: 'Salary Payment', description: 'Salary and wage payments', category: 'Payroll' },
    { code: 'PENS', purpose: 'Pensions Payment', description: 'Pension disbursements', category: 'Pension' },
    { code: 'SSBE', purpose: 'Social Security Benefit', description: 'Social security benefits', category: 'Social' },
    { code: 'PENG', purpose: 'National Social Insurance', description: 'National social insurance payment', category: 'Social' },
    { code: 'GOVT', purpose: 'Government Payment', description: 'Government related payments', category: 'Government' },
    { code: 'LOAN', purpose: 'Loan Payments', description: 'Loan disbursements and repayments', category: 'Loans' },
    { code: 'SUPP', purpose: 'Supplier Benefit', description: 'Supplier payments', category: 'Trade' },
    { code: 'CCRD', purpose: 'Credit Card Payment', description: 'Credit card payments', category: 'Payments' },
    { code: 'CACC', purpose: 'Current Account', description: 'Current account transfers', category: 'Banking' },
    { code: 'SCCD', purpose: 'Suez Canal Certificate of Deposit', description: 'Suez Canal related payments', category: 'Government' },
  ],
};

// All corridor markets
export const CORRIDOR_MARKETS: Record<string, CorridorMarket> = {
  AE: UAE_MARKET,
  IN: INDIA_MARKET,
  PK: PAKISTAN_MARKET,
  PH: PHILIPPINES_MARKET,
  BD: BANGLADESH_MARKET,
  EG: EGYPT_MARKET,
};

// Corridor complexity analysis
export const UAE_CORRIDORS: CorridorInfo[] = [
  {
    send: UAE_MARKET,
    receive: INDIA_MARKET,
    complexity: 'very_high',
    commonUseCases: [
      'Family maintenance remittances (FAM -> S0301/S0302)',
      'Salary transfers (SAL -> P0001)',
      'Education fees (EDU -> S0305)',
      'Medical expenses (MED -> S0306)',
      'Property investment (CIN -> S0003)',
    ],
    challenges: [
      'RBI requires specific purpose codes for LRS transactions',
      '303 India codes vs 113 UAE codes - no 1:1 mapping',
      'Both use proprietary codes (0% ISO alignment)',
      'Different categorization logic (UAE by transaction type, India by BOP category)',
      'India has separate inward (P-codes) and outward (S-codes) series',
    ],
  },
  {
    send: UAE_MARKET,
    receive: PAKISTAN_MARKET,
    complexity: 'high',
    commonUseCases: [
      'Worker remittances (FAM -> 9301)',
      'Salary transfers (SAL -> 9301)',
      'Education support (EDU -> 9071)',
      'Hajj/Religious travel (CHC -> 9083)',
      'Medical treatment (MED -> 9061)',
    ],
    challenges: [
      '272 Pakistan codes with complex numbering system',
      'SBP requires transaction direction in code selection',
      'Special codes for Hajj-related transfers',
      'Invisible receipts vs payments distinction',
    ],
  },
  {
    send: UAE_MARKET,
    receive: PHILIPPINES_MARKET,
    complexity: 'high',
    commonUseCases: [
      'OFW family support (FAM -> 5201)',
      'OFW savings (SAL -> 5202)',
      'Donations/Gifts (CHC -> 5310/5311)',
      'Education fees (EDU -> 5132)',
      'Property purchase (CIN -> 5301)',
    ],
    challenges: [
      'BSP tracks OFW remittances separately',
      '199 codes with expenditure-focused categorization',
      'Donations split between individual and institutional',
      'Government-related payments require special handling',
    ],
  },
  {
    send: UAE_MARKET,
    receive: BANGLADESH_MARKET,
    complexity: 'very_high',
    commonUseCases: [
      'Worker remittances (FAM -> 1801/1802)',
      'Salary transfers (SAL -> 1801)',
      'RMG export payments (GDI -> 2101)',
      'Education abroad (EDU -> 5101)',
    ],
    challenges: [
      'MOST COMPLEX: 666 codes - highest of all corridors',
      'Very granular transport categorization (sea/air/road/rail)',
      'Separate codes for Bangladesh Biman vs private airlines',
      'RMG (garments) industry has specialized codes',
      'Highly detailed descriptions required',
    ],
  },
  {
    send: UAE_MARKET,
    receive: EGYPT_MARKET,
    complexity: 'low',
    commonUseCases: [
      'Salary payments (SAL -> SALA)',
      'Pension transfers (EOS -> PENS)',
      'Government payments (GRI -> GOVT)',
      'Supplier payments (GDE/GDI -> SUPP)',
    ],
    challenges: [
      'Simplest corridor - only 14 codes',
      'Uses ISO-like code format (4 letters)',
      'Limited granularity may cause mapping ambiguity',
      'Suez Canal special code (SCCD) is unique',
    ],
  },
];

// Helper functions
export function getCorridorByDestination(destinationCode: string): CorridorInfo | undefined {
  return UAE_CORRIDORS.find(c => c.receive.code === destinationCode);
}

export function getComplexityColor(complexity: string): string {
  switch (complexity) {
    case 'low': return '#4caf50';
    case 'medium': return '#ff9800';
    case 'high': return '#f44336';
    case 'very_high': return '#9c27b0';
    default: return '#757575';
  }
}

export function getComplexityLabel(complexity: string): string {
  switch (complexity) {
    case 'low': return 'Low Complexity';
    case 'medium': return 'Medium Complexity';
    case 'high': return 'High Complexity';
    case 'very_high': return 'Very High Complexity';
    default: return 'Unknown';
  }
}

// Statistics
export const CORRIDOR_STATS = {
  totalMarkets: 6,
  totalCodes: 113 + 303 + 272 + 199 + 666 + 14, // 1,567 codes
  uaeOutboundRemittance: '$45B+ annually',
  topCorridorVolume: 'UAE -> India: $20B+',
  isoAlignedMarkets: 1, // Only Egypt
  proprietaryMarkets: 5, // UAE, India, Pakistan, Philippines, Bangladesh
};
