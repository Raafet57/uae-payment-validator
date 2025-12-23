// ISO 20022 Middle Layer - Cross-Market Translation via ISO Codes
// This creates a "Rosetta Stone" for translating between UAE and India purpose codes

export interface ISOCode {
  code: string;
  name: string;
  definition: string;
  category: string;
}

export interface MarketCodeMapping {
  code: string;
  purpose: string;
  description: string;
  direction?: 'inward' | 'outward' | 'both';
}

export interface ISOMapping {
  isoCode: ISOCode;
  uaeCodes: MarketCodeMapping[];
  indiaCodes: MarketCodeMapping[];
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface TranslationResult {
  uaeCode: MarketCodeMapping;
  isoCode: ISOCode;
  indiaCodes: MarketCodeMapping[];
  confidence: 'high' | 'medium' | 'low';
  bidirectional: boolean;
}

// Key ISO 20022 Purpose Codes relevant to remittances
export const ISO_PURPOSE_CODES: Record<string, ISOCode> = {
  // Family & Personal Transfers
  FAMI: {
    code: 'FAMI',
    name: 'FamilySupport',
    definition: 'Transaction is related to a payment to a family member.',
    category: 'Personal Transfers',
  },
  DEPD: {
    code: 'DEPD',
    name: 'DependentSupportPayment',
    definition: 'Payment made to support a dependent (child support, alimony, etc.).',
    category: 'Personal Transfers',
  },

  // Salary & Employment
  SALA: {
    code: 'SALA',
    name: 'SalaryPayment',
    definition: 'Transaction is the payment of salaries.',
    category: 'Salary & Employment',
  },
  BONU: {
    code: 'BONU',
    name: 'BonusPayment',
    definition: 'Transaction is related to payment of a bonus.',
    category: 'Salary & Employment',
  },
  ALLW: {
    code: 'ALLW',
    name: 'Allowance',
    definition: 'Transaction is related to the payment of allowances.',
    category: 'Salary & Employment',
  },
  PAYR: {
    code: 'PAYR',
    name: 'Payroll',
    definition: 'Transaction is related to payroll.',
    category: 'Salary & Employment',
  },
  COMM: {
    code: 'COMM',
    name: 'Commission',
    definition: 'Transaction is payment of commission.',
    category: 'Salary & Employment',
  },

  // Pension & Social Security
  PENS: {
    code: 'PENS',
    name: 'PensionPayment',
    definition: 'Transaction is the payment of pension.',
    category: 'Pension & Benefits',
  },
  SSBE: {
    code: 'SSBE',
    name: 'SocialSecurityBenefit',
    definition: 'Transaction is a social security benefit payment.',
    category: 'Pension & Benefits',
  },
  BENE: {
    code: 'BENE',
    name: 'UnemploymentDisabilityBenefit',
    definition: 'Transaction is related to unemployment or disability benefit.',
    category: 'Pension & Benefits',
  },

  // Education
  EDUC: {
    code: 'EDUC',
    name: 'Education',
    definition: 'Transaction is related to a payment of education costs.',
    category: 'Education',
  },
  STDY: {
    code: 'STDY',
    name: 'Study',
    definition: 'Transaction is related to a payment for study costs.',
    category: 'Education',
  },

  // Medical & Health
  MDCS: {
    code: 'MDCS',
    name: 'MedicalServices',
    definition: 'Transaction is related to a payment of medical services.',
    category: 'Medical',
  },
  HLTI: {
    code: 'HLTI',
    name: 'HealthInsurance',
    definition: 'Transaction is related to a payment of health insurance.',
    category: 'Medical',
  },
  HLTC: {
    code: 'HLTC',
    name: 'HomeHealthCare',
    definition: 'Transaction is related to a payment of home health care.',
    category: 'Medical',
  },

  // Insurance
  INSU: {
    code: 'INSU',
    name: 'InsurancePremium',
    definition: 'Transaction is payment of an insurance premium.',
    category: 'Insurance',
  },
  LIFI: {
    code: 'LIFI',
    name: 'LifeInsurance',
    definition: 'Transaction is related to a payment of life insurance.',
    category: 'Insurance',
  },
  INSC: {
    code: 'INSC',
    name: 'PaymentOfInsuranceClaim',
    definition: 'Transaction is related to payment of an insurance claim.',
    category: 'Insurance',
  },

  // Trade & Goods
  GDDS: {
    code: 'GDDS',
    name: 'PurchaseSaleOfGoods',
    definition: 'Transaction is related to purchase and sale of goods.',
    category: 'Trade',
  },
  SUPP: {
    code: 'SUPP',
    name: 'SupplierPayment',
    definition: 'Transaction is related to a payment to a supplier.',
    category: 'Trade',
  },
  COMT: {
    code: 'COMT',
    name: 'ConsumerThirdPartyConsolidatedPayment',
    definition: 'A2A Software as a Service (SaaS) payment consolidating transactions.',
    category: 'Trade',
  },

  // Services
  CORT: {
    code: 'CORT',
    name: 'TradeSettlementPayment',
    definition: 'Transaction is related to settlement of a trade.',
    category: 'Services',
  },
  IVPT: {
    code: 'IVPT',
    name: 'InvoicePayment',
    definition: 'Transaction is the payment of an invoice.',
    category: 'Services',
  },
  FEES: {
    code: 'FEES',
    name: 'PaymentOfFees',
    definition: 'Transaction is the payment of fees.',
    category: 'Services',
  },

  // Loans & Credit
  LOAN: {
    code: 'LOAN',
    name: 'Loan',
    definition: 'Transaction is related to the transfer of a loan to a borrower.',
    category: 'Loans',
  },
  LOAR: {
    code: 'LOAR',
    name: 'LoanRepayment',
    definition: 'Transaction is related to the repayment of a loan to a lender.',
    category: 'Loans',
  },
  INTE: {
    code: 'INTE',
    name: 'Interest',
    definition: 'Transaction is the payment of interest.',
    category: 'Loans',
  },

  // Investment & Dividends
  DIVD: {
    code: 'DIVD',
    name: 'Dividend',
    definition: 'Transaction is the payment of dividends.',
    category: 'Investment',
  },
  INVS: {
    code: 'INVS',
    name: 'InvestmentAndSecurities',
    definition: 'Transaction is related to investment and securities.',
    category: 'Investment',
  },
  SAVG: {
    code: 'SAVG',
    name: 'Savings',
    definition: 'Transaction is a savings payment.',
    category: 'Investment',
  },

  // Taxes & Government
  TAXS: {
    code: 'TAXS',
    name: 'TaxPayment',
    definition: 'Transaction is the payment of taxes.',
    category: 'Tax & Government',
  },
  GOVT: {
    code: 'GOVT',
    name: 'GovernmentPayment',
    definition: 'Transaction is a payment to or from a government department.',
    category: 'Tax & Government',
  },
  TAXR: {
    code: 'TAXR',
    name: 'TaxRefund',
    definition: 'Transaction is the refund of taxes.',
    category: 'Tax & Government',
  },

  // Charity & Donations
  CHAR: {
    code: 'CHAR',
    name: 'CharityPayment',
    definition: 'Transaction is a payment for charity reasons.',
    category: 'Charity',
  },
  GIFT: {
    code: 'GIFT',
    name: 'Gift',
    definition: 'Transaction is the payment of a gift.',
    category: 'Charity',
  },

  // Rent & Property
  RENT: {
    code: 'RENT',
    name: 'Rent',
    definition: 'Transaction is the payment of rent.',
    category: 'Property',
  },
  BLDM: {
    code: 'BLDM',
    name: 'BuildingMaintenance',
    definition: 'Transaction is related to building maintenance.',
    category: 'Property',
  },

  // Transport
  TRPT: {
    code: 'TRPT',
    name: 'RoadPricing',
    definition: 'Transaction is for road pricing.',
    category: 'Transport',
  },
  AIRB: {
    code: 'AIRB',
    name: 'Air',
    definition: 'Transaction is for air transport.',
    category: 'Transport',
  },
  RLWY: {
    code: 'RLWY',
    name: 'Railway',
    definition: 'Transaction is for rail transport.',
    category: 'Transport',
  },

  // Other
  OTHR: {
    code: 'OTHR',
    name: 'Other',
    definition: 'Other payment purpose.',
    category: 'Other',
  },
};

// UAE to ISO Mappings
export const UAE_TO_ISO_MAPPINGS: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low' }> = {
  // Family & Remittances
  FAM: { iso: 'FAMI', confidence: 'high' },

  // Salary & Employment
  SAL: { iso: 'SALA', confidence: 'high' },
  BON: { iso: 'BONU', confidence: 'high' },
  ALW: { iso: 'ALLW', confidence: 'high' },
  COM: { iso: 'COMM', confidence: 'high' },
  ACM: { iso: 'COMM', confidence: 'medium' },
  COP: { iso: 'SALA', confidence: 'medium' },
  LAS: { iso: 'SALA', confidence: 'medium' },
  EOS: { iso: 'PENS', confidence: 'medium' },
  SAA: { iso: 'SALA', confidence: 'high' },

  // Education
  EDU: { iso: 'EDUC', confidence: 'high' },

  // Medical
  MED: { iso: 'MDCS', confidence: 'high' },

  // Insurance
  INS: { iso: 'INSU', confidence: 'high' },

  // Trade
  GDE: { iso: 'GDDS', confidence: 'high' },
  GDI: { iso: 'GDDS', confidence: 'high' },
  GMS: { iso: 'GDDS', confidence: 'medium' },

  // Services
  FIS: { iso: 'CORT', confidence: 'medium' },
  IFS: { iso: 'CORT', confidence: 'medium' },
  TCS: { iso: 'CORT', confidence: 'medium' },
  ITS: { iso: 'CORT', confidence: 'medium' },
  PMS: { iso: 'CORT', confidence: 'medium' },
  RDS: { iso: 'CORT', confidence: 'medium' },
  TTS: { iso: 'CORT', confidence: 'medium' },

  // Loans
  LIP: { iso: 'INTE', confidence: 'high' },
  LNC: { iso: 'FEES', confidence: 'medium' },
  LND: { iso: 'LOAN', confidence: 'high' },
  IID: { iso: 'INTE', confidence: 'high' },
  IOL: { iso: 'INTE', confidence: 'high' },

  // Investment
  DIV: { iso: 'DIVD', confidence: 'high' },
  DOE: { iso: 'DIVD', confidence: 'high' },
  IGD: { iso: 'DIVD', confidence: 'high' },
  CIN: { iso: 'INVS', confidence: 'medium' },

  // Tax & Government
  TAX: { iso: 'TAXS', confidence: 'high' },
  XAT: { iso: 'TAXR', confidence: 'high' },
  GRI: { iso: 'GOVT', confidence: 'medium' },
  GOS: { iso: 'GOVT', confidence: 'medium' },

  // Charity
  CHC: { iso: 'CHAR', confidence: 'high' },

  // Rent & Property
  REN: { iso: 'RENT', confidence: 'high' },

  // Transport
  ATS: { iso: 'AIRB', confidence: 'high' },
  OTS: { iso: 'TRPT', confidence: 'medium' },
  STS: { iso: 'TRPT', confidence: 'medium' },
};

// India to ISO Mappings (Outward - S codes)
export const INDIA_OUTWARD_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low' }> = {
  // Family & Remittances
  S1301: { iso: 'FAMI', confidence: 'high' },  // Family Maintenance/Savings
  S0023: { iso: 'FAMI', confidence: 'medium' }, // LRS Individual
  S1307: { iso: 'FAMI', confidence: 'medium' }, // Migrant Transfers

  // Education
  S0305: { iso: 'EDUC', confidence: 'high' },  // Travel for Education
  S1107: { iso: 'EDUC', confidence: 'high' },  // Education services

  // Medical
  S0304: { iso: 'MDCS', confidence: 'high' },  // Medical Treatment
  S1108: { iso: 'MDCS', confidence: 'high' },  // Health Services

  // Insurance & Pension
  S0601: { iso: 'LIFI', confidence: 'high' },  // Life Insurance
  S0603: { iso: 'INSU', confidence: 'high' },  // General Insurance
  S0607: { iso: 'INSC', confidence: 'high' },  // Insurance Claims
  S0611: { iso: 'PENS', confidence: 'high' },  // Pension

  // Charity & Donations
  S1302: { iso: 'GIFT', confidence: 'high' },  // Personal Gifts/Donations
  S1303: { iso: 'CHAR', confidence: 'high' },  // Religious/Charitable
  S1304: { iso: 'CHAR', confidence: 'high' },  // Govt/Charitable

  // Tax
  S1306: { iso: 'TAXS', confidence: 'high' },  // Taxes

  // Trade (Imports)
  S0101: { iso: 'GDDS', confidence: 'high' },  // Advance against imports
  S0102: { iso: 'GDDS', confidence: 'high' },  // Import settlement
  S0104: { iso: 'GDDS', confidence: 'medium' }, // Transit trade
  S0108: { iso: 'GDDS', confidence: 'medium' }, // Merchanting

  // Transport
  S0201: { iso: 'TRPT', confidence: 'medium' }, // Shipping surplus freight
  S0207: { iso: 'AIRB', confidence: 'high' },  // Airline freight
  S0203: { iso: 'TRPT', confidence: 'high' },  // Import Freight - Shipping
  S0209: { iso: 'AIRB', confidence: 'high' },  // Import Freight - Airlines

  // Investment
  S0003: { iso: 'INVS', confidence: 'high' },  // FDI abroad - equity
  S0001: { iso: 'INVS', confidence: 'high' },  // Portfolio abroad - equity

  // Loans & Interest
  S0011: { iso: 'LOAN', confidence: 'high' },  // Loans to NR
  S0012: { iso: 'LOAR', confidence: 'high' },  // Loan repayment
  S1402: { iso: 'INTE', confidence: 'high' },  // Interest on NR deposits
  S1403: { iso: 'INTE', confidence: 'high' },  // Interest on loans

  // Dividends
  S1408: { iso: 'DIVD', confidence: 'high' },  // FDI profit repatriation
  S1409: { iso: 'DIVD', confidence: 'high' },  // FDI dividends

  // Government
  S1201: { iso: 'GOVT', confidence: 'high' },  // Indian embassy maintenance
  S1202: { iso: 'GOVT', confidence: 'high' },  // Foreign embassy remittance
};

// India to ISO Mappings (Inward - P codes)
export const INDIA_INWARD_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low' }> = {
  // Family & Remittances - THE KEY ONES FOR UAE->INDIA
  P1301: { iso: 'FAMI', confidence: 'high' },  // Family Maintenance from NRIs
  P1307: { iso: 'FAMI', confidence: 'medium' }, // Migrant Transfers

  // Education
  P0305: { iso: 'EDUC', confidence: 'high' },  // Education receipts
  P1107: { iso: 'EDUC', confidence: 'high' },  // Education services

  // Medical
  P0304: { iso: 'MDCS', confidence: 'high' },  // Medical receipts
  P1108: { iso: 'MDCS', confidence: 'high' },  // Health services

  // Insurance & Pension
  P0601: { iso: 'LIFI', confidence: 'high' },  // Life Insurance
  P0607: { iso: 'INSC', confidence: 'high' },  // Insurance Claims
  P0611: { iso: 'PENS', confidence: 'high' },  // Pension receipts

  // Investment & Dividends
  P1408: { iso: 'DIVD', confidence: 'high' },  // FDI profit inward
  P1409: { iso: 'DIVD', confidence: 'high' },  // FDI dividends inward
  P1411: { iso: 'INTE', confidence: 'high' },  // Portfolio interest
  P1412: { iso: 'DIVD', confidence: 'high' },  // Portfolio dividends

  // Interest
  P1403: { iso: 'INTE', confidence: 'high' },  // Interest on loans
  P1405: { iso: 'INTE', confidence: 'high' },  // AD interest

  // Government
  P1201: { iso: 'GOVT', confidence: 'high' },  // Foreign embassy maintenance
  P1203: { iso: 'GOVT', confidence: 'high' },  // International institutions
};

// Combined ISO Mappings with both UAE and India codes
export const ISO_CROSS_MAPPINGS: ISOMapping[] = [
  // FAMILY SUPPORT - THE MAIN REMITTANCE USE CASE
  {
    isoCode: ISO_PURPOSE_CODES.FAMI,
    uaeCodes: [
      { code: 'FAM', purpose: 'Family Support (Workers\' remittances)', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'P1301', purpose: 'Family Maintenance/Savings - Receipt', description: 'Inward remittance from Indian non-residents towards family maintenance and savings', direction: 'inward' },
      { code: 'S1301', purpose: 'Family Maintenance/Savings - Payment', description: 'Remittance for family maintenance and savings', direction: 'outward' },
      { code: 'S0023', purpose: 'LRS - Individual Remittance', description: 'Remittances made under Liberalised Remittance Scheme (LRS) for Individuals', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Primary remittance code. UAE FAM maps directly to India P1301 (inward) for workers sending money home.',
  },

  // SALARY
  {
    isoCode: ISO_PURPOSE_CODES.SALA,
    uaeCodes: [
      { code: 'SAL', purpose: 'Salary (Compensation of employees)', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'SAA', purpose: 'Salary Advance', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'LAS', purpose: 'Leave Salary', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      // India doesn't have a direct salary receipt code for inward remittances
      // Workers typically use P1301 (Family Maintenance) for salary transfers home
    ],
    confidence: 'medium',
    notes: 'UAE has specific salary codes. India inward salary typically coded as P1301 (Family Maintenance).',
  },

  // EDUCATION
  {
    isoCode: ISO_PURPOSE_CODES.EDUC,
    uaeCodes: [
      { code: 'EDU', purpose: 'Educational Support', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0305', purpose: 'Travel for Education - Payment', description: 'Travel for education (including fees, hostel expenses etc.)', direction: 'outward' },
      { code: 'P0305', purpose: 'Travel for Education - Receipt', description: 'Travel for education including TCs purchased by educational institutions', direction: 'inward' },
      { code: 'S1107', purpose: 'Education Services - Payment', description: 'Education (e.g. fees for correspondence courses abroad)', direction: 'outward' },
      { code: 'P1107', purpose: 'Education Services - Receipt', description: 'Educational services (e.g. fees received for correspondence courses)', direction: 'inward' },
    ],
    confidence: 'high',
    notes: 'Good alignment. UAE EDU maps to India S0305/P0305 for education-related transfers.',
  },

  // MEDICAL
  {
    isoCode: ISO_PURPOSE_CODES.MDCS,
    uaeCodes: [
      { code: 'MED', purpose: 'Medical Treatment', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0304', purpose: 'Medical Treatment - Payment', description: 'Travel for medical treatment', direction: 'outward' },
      { code: 'P0304', purpose: 'Medical Treatment - Receipt', description: 'Travel for medical treatment including TCs purchased by hospitals', direction: 'inward' },
      { code: 'S1108', purpose: 'Health Service - Payment', description: 'Health Service payments', direction: 'outward' },
      { code: 'P1108', purpose: 'Health Service - Receipt', description: 'Health Service receipts', direction: 'inward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for medical transfers.',
  },

  // PENSION
  {
    isoCode: ISO_PURPOSE_CODES.PENS,
    uaeCodes: [
      { code: 'EOS', purpose: 'End of Service / Final Settlement', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0611', purpose: 'Periodic Pension - Payment', description: 'Periodic pension entitlements', direction: 'outward' },
      { code: 'P0611', purpose: 'Periodic Pension - Receipt', description: 'Periodic pension entitlements received', direction: 'inward' },
    ],
    confidence: 'medium',
    notes: 'UAE EOS is end-of-service gratuity. India has specific pension codes.',
  },

  // DIVIDENDS
  {
    isoCode: ISO_PURPOSE_CODES.DIVD,
    uaeCodes: [
      { code: 'DIV', purpose: 'Dividend Payouts From FI', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'DOE', purpose: 'Dividends on equity not intragroup', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'IGD', purpose: 'Dividends intragroup', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S1409', purpose: 'FDI Dividends - Payment', description: 'Remittance of dividends by FDI enterprises in India', direction: 'outward' },
      { code: 'P1409', purpose: 'FDI Dividends - Receipt', description: 'Inward remittance of dividends by Indian FDI Enterprises', direction: 'inward' },
      { code: 'S1412', purpose: 'Portfolio Dividends - Payment', description: 'Remittance of dividends on Portfolio Investment in India', direction: 'outward' },
      { code: 'P1412', purpose: 'Portfolio Dividends - Receipt', description: 'Inward remittance of dividends on Portfolio Investment', direction: 'inward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for dividend payments.',
  },

  // INTEREST
  {
    isoCode: ISO_PURPOSE_CODES.INTE,
    uaeCodes: [
      { code: 'LIP', purpose: 'Loan Interest Payments', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'IID', purpose: 'Interest on debt intragroup', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'IOL', purpose: 'Income on loans', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'IOD', purpose: 'Income on deposits', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S1402', purpose: 'Interest on NR Deposits - Payment', description: 'Remittance towards interest on Non-Resident deposits', direction: 'outward' },
      { code: 'S1403', purpose: 'Interest on Loans - Payment', description: 'Remittance towards interest on loans from Non-Residents', direction: 'outward' },
      { code: 'P1403', purpose: 'Interest on Loans - Receipt', description: 'Inward remittance towards interest on loans', direction: 'inward' },
      { code: 'S1411', purpose: 'Portfolio Interest - Payment', description: 'Remittance of interest income on Portfolio Investment', direction: 'outward' },
      { code: 'P1411', purpose: 'Portfolio Interest - Receipt', description: 'Inward remittance of interest income on Portfolio Investment', direction: 'inward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for interest payments.',
  },

  // CHARITY
  {
    isoCode: ISO_PURPOSE_CODES.CHAR,
    uaeCodes: [
      { code: 'CHC', purpose: 'Charitable Contributions (Charity and Aid)', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S1303', purpose: 'Religious/Charitable Donations - Payment', description: 'Remittance towards donations to religious and charitable institutions abroad', direction: 'outward' },
      { code: 'S1304', purpose: 'Government/Charitable - Payment', description: 'Remittance towards grants and donations to governments and charitable institutions', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for charity/donation transfers.',
  },

  // GIFTS
  {
    isoCode: ISO_PURPOSE_CODES.GIFT,
    uaeCodes: [
      // UAE doesn't have a specific gift code - uses CHC or FAM
    ],
    indiaCodes: [
      { code: 'S1302', purpose: 'Personal Gifts/Donations - Payment', description: 'Remittance towards personal gifts and donations', direction: 'outward' },
    ],
    confidence: 'medium',
    notes: 'India has specific gift code. UAE uses CHC (Charity) or FAM (Family) for gifts.',
  },

  // TAX
  {
    isoCode: ISO_PURPOSE_CODES.TAXS,
    uaeCodes: [
      { code: 'TAX', purpose: 'TAX Payment', description: 'Domestic Only', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S1306', purpose: 'Taxes - Payment', description: 'Remittance towards payment/refund of taxes', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for tax payments.',
  },

  // TRADE / GOODS
  {
    isoCode: ISO_PURPOSE_CODES.GDDS,
    uaeCodes: [
      { code: 'GDE', purpose: 'Goods Sold (Exports)', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'GDI', purpose: 'Goods Bought (Imports)', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'GMS', purpose: 'Processing repair and maintenance on goods', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0101', purpose: 'Advance against Imports - Payment', description: 'Advance payment against imports', direction: 'outward' },
      { code: 'S0102', purpose: 'Import Settlement - Payment', description: 'Payment towards imports- settlement of invoice', direction: 'outward' },
      { code: 'S0108', purpose: 'Merchanting - Payment', description: 'Goods acquired under merchanting', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for trade/goods transactions.',
  },

  // INSURANCE
  {
    isoCode: ISO_PURPOSE_CODES.INSU,
    uaeCodes: [
      { code: 'INS', purpose: 'Insurance services', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0603', purpose: 'General Insurance - Payment', description: 'Other general insurance premium including reinsurance premium', direction: 'outward' },
      { code: 'P0603', purpose: 'General Insurance - Receipt', description: 'General insurance premium receipts', direction: 'inward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for insurance.',
  },

  // LIFE INSURANCE
  {
    isoCode: ISO_PURPOSE_CODES.LIFI,
    uaeCodes: [
      // UAE uses INS for all insurance
    ],
    indiaCodes: [
      { code: 'S0601', purpose: 'Life Insurance - Payment', description: 'Life Insurance premium except term insurance', direction: 'outward' },
      { code: 'P0601', purpose: 'Life Insurance - Receipt', description: 'Life Insurance premium receipts', direction: 'inward' },
    ],
    confidence: 'medium',
    notes: 'India has specific life insurance code. UAE uses general INS.',
  },

  // GOVERNMENT
  {
    isoCode: ISO_PURPOSE_CODES.GOVT,
    uaeCodes: [
      { code: 'GRI', purpose: 'Government related income taxes, tariffs, etc.', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'GOS', purpose: 'Government goods and services embassies', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S1201', purpose: 'Indian Embassy Maintenance - Payment', description: 'Maintenance of Indian embassies abroad', direction: 'outward' },
      { code: 'S1202', purpose: 'Foreign Embassy Remittance - Payment', description: 'Remittances by foreign embassies in India', direction: 'outward' },
      { code: 'P1201', purpose: 'Foreign Embassy Maintenance - Receipt', description: 'Maintenance of foreign embassies in India', direction: 'inward' },
      { code: 'P1203', purpose: 'International Institutions - Receipt', description: 'Maintenance of international institutions in India', direction: 'inward' },
    ],
    confidence: 'medium',
    notes: 'Both markets have government-related codes.',
  },

  // INVESTMENT
  {
    isoCode: ISO_PURPOSE_CODES.INVS,
    uaeCodes: [
      { code: 'CIN', purpose: 'Commercial Investments', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'CEA', purpose: 'Equity/Fund/Capital - Company Abroad', description: 'Cross Border Only', direction: 'both' },
      { code: 'CEL', purpose: 'Equity/Fund/Capital - Company in UAE', description: 'Cross Border Only', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0003', purpose: 'FDI Abroad - Equity - Payment', description: 'Indian Direct investment abroad in equity Shares', direction: 'outward' },
      { code: 'S0001', purpose: 'Portfolio Abroad - Equity - Payment', description: 'Indian Portfolio investment abroad - in equity shares', direction: 'outward' },
      { code: 'S0006', purpose: 'FDI Repatriation - Equity - Payment', description: 'Repatriation of Foreign Direct Investment in equity shares', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for investment transactions.',
  },

  // LOANS
  {
    isoCode: ISO_PURPOSE_CODES.LOAN,
    uaeCodes: [
      { code: 'LND', purpose: 'Loan Disbursements From FI', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'LLA', purpose: 'Loans - Long-term - Abroad', description: 'Cross Border Only', direction: 'both' },
      { code: 'SLA', purpose: 'Loans - Short-term - Abroad', description: 'Cross Border Only', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0011', purpose: 'Loans to Non-Residents - Payment', description: 'Loans extended to Non-Residents', direction: 'outward' },
      { code: 'S0012', purpose: 'Loan Repayment - Long/Medium Term - Payment', description: 'Repayment of long and medium term loans', direction: 'outward' },
      { code: 'S0013', purpose: 'Loan Repayment - Short Term - Payment', description: 'Repayment of short term loans', direction: 'outward' },
    ],
    confidence: 'high',
    notes: 'Good alignment for loan transactions.',
  },

  // COMMISSION
  {
    isoCode: ISO_PURPOSE_CODES.COMM,
    uaeCodes: [
      { code: 'COM', purpose: 'Commission', description: 'Cross Border & Domestic', direction: 'both' },
      { code: 'ACM', purpose: 'Agency Commissions', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      { code: 'S0601', purpose: 'Commission on Exports - Payment', description: 'Commission agent charges on exports', direction: 'outward' },
      { code: 'S0605', purpose: 'Auxiliary Insurance Services - Payment', description: 'Auxiliary services including commission on insurance', direction: 'outward' },
    ],
    confidence: 'medium',
    notes: 'Commission codes exist in both, but categorized differently.',
  },

  // ALLOWANCE
  {
    isoCode: ISO_PURPOSE_CODES.ALLW,
    uaeCodes: [
      { code: 'ALW', purpose: 'Allowance', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      // India doesn't have a specific allowance code
      // Would typically be classified under P1301 (Family Maintenance) or SALA
    ],
    confidence: 'low',
    notes: 'UAE has specific allowance code. India uses broader categories.',
  },

  // BONUS
  {
    isoCode: ISO_PURPOSE_CODES.BONU,
    uaeCodes: [
      { code: 'BON', purpose: 'Bonus', description: 'Cross Border & Domestic', direction: 'both' },
    ],
    indiaCodes: [
      // India doesn't have a specific bonus code
      // Would typically be classified under P1301 (Family Maintenance)
    ],
    confidence: 'low',
    notes: 'UAE has specific bonus code. India uses broader categories.',
  },
];

// Helper function: Translate UAE code to India codes via ISO
export function translateUAEtoIndia(uaeCode: string): TranslationResult | null {
  // Find the ISO mapping for this UAE code
  const isoMapping = UAE_TO_ISO_MAPPINGS[uaeCode];
  if (!isoMapping) return null;

  // Find the cross-mapping entry
  const crossMapping = ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === isoMapping.iso);
  if (!crossMapping) return null;

  // Find the UAE code details
  const uaeCodeDetails = crossMapping.uaeCodes.find(c => c.code === uaeCode);
  if (!uaeCodeDetails) return null;

  return {
    uaeCode: uaeCodeDetails,
    isoCode: crossMapping.isoCode,
    indiaCodes: crossMapping.indiaCodes,
    confidence: isoMapping.confidence,
    bidirectional: crossMapping.indiaCodes.some(c => c.direction === 'inward'),
  };
}

// Helper function: Translate India code to UAE codes via ISO
export function translateIndiaToUAE(indiaCode: string): TranslationResult | null {
  // Check both inward and outward mappings
  let isoCode: string | null = null;
  let confidence: 'high' | 'medium' | 'low' = 'low';

  if (INDIA_INWARD_TO_ISO[indiaCode]) {
    isoCode = INDIA_INWARD_TO_ISO[indiaCode].iso;
    confidence = INDIA_INWARD_TO_ISO[indiaCode].confidence;
  } else if (INDIA_OUTWARD_TO_ISO[indiaCode]) {
    isoCode = INDIA_OUTWARD_TO_ISO[indiaCode].iso;
    confidence = INDIA_OUTWARD_TO_ISO[indiaCode].confidence;
  }

  if (!isoCode) return null;

  // Find the cross-mapping entry
  const crossMapping = ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === isoCode);
  if (!crossMapping) return null;

  // Find the India code details
  const indiaCodeDetails = crossMapping.indiaCodes.find(c => c.code === indiaCode);
  if (!indiaCodeDetails) return null;

  return {
    uaeCode: crossMapping.uaeCodes[0] || { code: 'N/A', purpose: 'No direct UAE equivalent', description: '' },
    isoCode: crossMapping.isoCode,
    indiaCodes: [indiaCodeDetails],
    confidence,
    bidirectional: crossMapping.uaeCodes.length > 0,
  };
}

// Get all mappings for a specific ISO code
export function getMappingsForISO(isoCode: string): ISOMapping | null {
  return ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === isoCode) || null;
}

// ============================================================================
// PAKISTAN ISO MAPPINGS (272 codes - SBP regulated)
// ============================================================================

export const PAKISTAN_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low'; direction?: 'inward' | 'outward' }> = {
  // Workers Remittances
  '9301': { iso: 'SALA', confidence: 'high', direction: 'inward' },  // Workers remittance - Wages
  '9302': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // Workers remittance - Savings
  '9303': { iso: 'PENS', confidence: 'high', direction: 'inward' },  // Workers remittance - Pensions
  '9304': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // Workers remittance - Other

  // Transport - Sea
  '9010': { iso: 'SEAB', confidence: 'high' },  // Sea Transport - Shipping earnings
  '9011': { iso: 'SEAB', confidence: 'high' },  // Sea Transport - Freight
  '9012': { iso: 'SEAB', confidence: 'medium' },  // Sea Transport - Port services
  '9013': { iso: 'SEAB', confidence: 'medium' },  // Sea Transport - Other

  // Transport - Air
  '9016': { iso: 'AIRB', confidence: 'high' },  // Air Transport - Airline earnings
  '9017': { iso: 'AIRB', confidence: 'high' },  // Air Transport - Freight
  '9018': { iso: 'AIRB', confidence: 'medium' },  // Air Transport - Other

  // Travel
  '9061': { iso: 'MDCS', confidence: 'high' },  // Health related travel
  '9071': { iso: 'EDUC', confidence: 'high' },  // Education - Students
  '9072': { iso: 'EDUC', confidence: 'high' },  // Education - Other
  '9081': { iso: 'TRVL', confidence: 'high' },  // Tourism - Pak nationals
  '9082': { iso: 'TRVL', confidence: 'high' },  // Tourism - Foreign nationals
  '9083': { iso: 'CHAR', confidence: 'medium' },  // Religious travel (Hajj)

  // Communication
  '9091': { iso: 'SCVE', confidence: 'medium' },  // Postal and Courier services
  '9092': { iso: 'SCVE', confidence: 'high' },  // Telecommunication services

  // Construction & Services
  '9121': { iso: 'SCVE', confidence: 'high' },  // Construction services
  '9122': { iso: 'SCVE', confidence: 'high' },  // Insurance services
  '9123': { iso: 'FEES', confidence: 'high' },  // Financial services
  '9124': { iso: 'SCVE', confidence: 'high' },  // Computer services
  '9125': { iso: 'LICF', confidence: 'high' },  // Royalties and license fees
  '9126': { iso: 'SCVE', confidence: 'high' },  // Other business services

  // Trade
  '9201': { iso: 'GDDS', confidence: 'high' },  // Merchandise - Exports
  '9202': { iso: 'GDDS', confidence: 'high' },  // Merchandise - Exports (other)
  '9211': { iso: 'GDDS', confidence: 'high' },  // Merchandise - Imports
  '9212': { iso: 'GDDS', confidence: 'high' },  // Merchandise - Imports (other)

  // Investment
  '9401': { iso: 'INVS', confidence: 'high' },  // Direct Investment - Equity
  '9402': { iso: 'INVS', confidence: 'high' },  // Direct Investment - Reinvested earnings
  '9403': { iso: 'LOAN', confidence: 'high' },  // Direct Investment - Debt
  '9411': { iso: 'SECU', confidence: 'high' },  // Portfolio - Equity
  '9412': { iso: 'SECU', confidence: 'high' },  // Portfolio - Debt

  // Income
  '9501': { iso: 'DIVI', confidence: 'high' },  // Dividends
  '9502': { iso: 'INTE', confidence: 'high' },  // Interest
  '9503': { iso: 'INTE', confidence: 'high' },  // Interest - Government
  '9504': { iso: 'DIVI', confidence: 'high' },  // Profits

  // Government
  '9601': { iso: 'GOVT', confidence: 'high' },  // Government receipts
  '9602': { iso: 'GOVT', confidence: 'high' },  // Government payments
  '9603': { iso: 'TAXS', confidence: 'high' },  // Taxes

  // Transfers
  '9701': { iso: 'CHAR', confidence: 'high' },  // Grants and donations
  '9702': { iso: 'FAMI', confidence: 'high' },  // Personal transfers
  '9703': { iso: 'PENS', confidence: 'high' },  // Pensions
};

// ============================================================================
// PHILIPPINES ISO MAPPINGS (199 codes - BSP regulated)
// ============================================================================

export const PHILIPPINES_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low'; direction?: 'inward' | 'outward' }> = {
  // OFW Remittances (Primary use case for UAE-PH corridor)
  '5201': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // OFW Remittance - Family support
  '5202': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // OFW Remittance - Savings
  '5203': { iso: 'SALA', confidence: 'high', direction: 'inward' },  // OFW Remittance - Salary
  '5204': { iso: 'PENS', confidence: 'high', direction: 'inward' },  // OFW Remittance - Pension

  // Donations/Gifts
  '5310': { iso: 'FAMI', confidence: 'high' },  // Donations/Gifts - Individual
  '5311': { iso: 'CHAR', confidence: 'high' },  // Donations/Gifts - Institution
  '5312': { iso: 'CHAR', confidence: 'high' },  // Donations/Gifts - Religious
  '5313': { iso: 'CHAR', confidence: 'medium' },  // Donations/Gifts - Other

  // Education
  '5132': { iso: 'EDUC', confidence: 'high' },  // Education expenses - Philippines
  '5133': { iso: 'EDUC', confidence: 'high' },  // Education expenses - Abroad
  '5137': { iso: 'EDUC', confidence: 'high' },  // Training expenses - Philippines
  '5138': { iso: 'EDUC', confidence: 'high' },  // Training expenses - Abroad

  // Medical
  '5701': { iso: 'MDCS', confidence: 'high' },  // Medical expenses
  '5702': { iso: 'MDCS', confidence: 'high' },  // Hospital expenses
  '5703': { iso: 'HLTI', confidence: 'high' },  // Health insurance

  // Travel
  '5141': { iso: 'TRVL', confidence: 'high' },  // Travel - Personal
  '5142': { iso: 'TRVL', confidence: 'high' },  // Travel - Business
  '5143': { iso: 'TRVL', confidence: 'high' },  // Travel - Tourism

  // Cards & Payments
  '5134': { iso: 'CCRD', confidence: 'high' },  // Credit Card Payment
  '5135': { iso: 'DCRD', confidence: 'high' },  // Debit Card Payment
  '5136': { iso: 'OTHR', confidence: 'medium' },  // Other card payments

  // Government
  '5140': { iso: 'GOVT', confidence: 'high' },  // Foreign Office maintenance
  '5144': { iso: 'GOVT', confidence: 'high' },  // Embassy expenses
  '5145': { iso: 'TAXS', confidence: 'high' },  // Tax payments

  // Subscriptions & Services
  '5175': { iso: 'SCVE', confidence: 'medium' },  // Local Publication Subscription
  '5176': { iso: 'SCVE', confidence: 'medium' },  // Foreign Publication Subscription
  '5177': { iso: 'SCVE', confidence: 'high' },  // Professional services

  // Investment
  '5301': { iso: 'INVS', confidence: 'high' },  // Real estate purchase
  '5302': { iso: 'INVS', confidence: 'high' },  // Real estate sale
  '5401': { iso: 'INVS', confidence: 'high' },  // Business capital
  '5402': { iso: 'SECU', confidence: 'high' },  // Stock investment
  '5403': { iso: 'SECU', confidence: 'high' },  // Bond investment

  // Loans
  '5501': { iso: 'LOAR', confidence: 'high' },  // Loan repayment
  '5502': { iso: 'LOAN', confidence: 'high' },  // Loan disbursement
  '5503': { iso: 'INTE', confidence: 'high' },  // Interest payment

  // Insurance
  '5601': { iso: 'INSU', confidence: 'high' },  // Insurance premium
  '5602': { iso: 'ICCP', confidence: 'high' },  // Insurance claim

  // Legal & Professional
  '5801': { iso: 'FEES', confidence: 'high' },  // Legal fees
  '5802': { iso: 'FEES', confidence: 'high' },  // Accounting fees
  '5803': { iso: 'COMM', confidence: 'high' },  // Commission

  // Trade
  '5901': { iso: 'GDDS', confidence: 'high' },  // Export proceeds
  '5902': { iso: 'GDDS', confidence: 'high' },  // Import payments
};

// ============================================================================
// BANGLADESH ISO MAPPINGS (666 codes - Bangladesh Bank regulated)
// Most complex market with highly granular categories
// ============================================================================

export const BANGLADESH_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low'; direction?: 'inward' | 'outward' }> = {
  // Workers Remittances (Primary inflow category)
  '1801': { iso: 'SALA', confidence: 'high', direction: 'inward' },  // Workers remittance - Wage earners
  '1802': { iso: 'SALA', confidence: 'high', direction: 'inward' },  // Workers remittance - Professionals
  '1803': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // Workers remittance - Other workers
  '1804': { iso: 'FAMI', confidence: 'high', direction: 'inward' },  // Workers remittance - Seamen
  '1805': { iso: 'FAMI', confidence: 'medium', direction: 'inward' },  // Workers remittance - Other

  // Sea Transport (Highly granular)
  '0010': { iso: 'SEAB', confidence: 'high' },  // Sea Transport - Passenger surplus (BSC)
  '0020': { iso: 'SEAB', confidence: 'high' },  // Sea Transport - Freight surplus (BSC)
  '0030': { iso: 'SEAB', confidence: 'high' },  // Sea Transport - Charter hire
  '0040': { iso: 'SEAB', confidence: 'medium' },  // Sea Transport - Port disbursement
  '0050': { iso: 'SEAB', confidence: 'medium' },  // Sea Transport - Agency commission
  '0060': { iso: 'SEAB', confidence: 'medium' },  // Sea Transport - Other

  // Air Transport
  '0110': { iso: 'AIRB', confidence: 'high' },  // Air Transport - Passenger surplus (Biman)
  '0120': { iso: 'AIRB', confidence: 'high' },  // Air Transport - Freight surplus (Biman)
  '0130': { iso: 'AIRB', confidence: 'high' },  // Air Transport - Private airlines
  '0140': { iso: 'AIRB', confidence: 'medium' },  // Air Transport - Airport services
  '0150': { iso: 'AIRB', confidence: 'medium' },  // Air Transport - Other

  // Road/Rail Transport
  '0210': { iso: 'TRPT', confidence: 'high' },  // Road Transport
  '0220': { iso: 'TRPT', confidence: 'high' },  // Rail Transport
  '0230': { iso: 'TRPT', confidence: 'medium' },  // Inland water transport

  // Travel
  '0301': { iso: 'TRVL', confidence: 'high' },  // Travel - Business
  '0302': { iso: 'TRVL', confidence: 'high' },  // Travel - Personal
  '0303': { iso: 'EDUC', confidence: 'high' },  // Travel - Education
  '0304': { iso: 'MDCS', confidence: 'high' },  // Travel - Medical
  '0305': { iso: 'CHAR', confidence: 'medium' },  // Travel - Religious (Hajj/Umrah)

  // Communication
  '0401': { iso: 'SCVE', confidence: 'high' },  // Postal services
  '0402': { iso: 'SCVE', confidence: 'high' },  // Courier services
  '0403': { iso: 'SCVE', confidence: 'high' },  // Telecommunication

  // Construction
  '0501': { iso: 'SCVE', confidence: 'high' },  // Construction abroad by BD entities
  '0502': { iso: 'SCVE', confidence: 'high' },  // Construction in BD by foreign

  // Insurance
  '0601': { iso: 'INSU', confidence: 'high' },  // Life insurance premium
  '0602': { iso: 'INSU', confidence: 'high' },  // Non-life insurance premium
  '0603': { iso: 'ICCP', confidence: 'high' },  // Insurance claims
  '0604': { iso: 'INSU', confidence: 'high' },  // Reinsurance

  // Financial Services
  '0701': { iso: 'FEES', confidence: 'high' },  // Banking charges
  '0702': { iso: 'FEES', confidence: 'high' },  // Brokerage fees
  '0703': { iso: 'FEES', confidence: 'high' },  // Fund management

  // Computer & IT
  '0801': { iso: 'SCVE', confidence: 'high' },  // Software services
  '0802': { iso: 'SCVE', confidence: 'high' },  // Hardware services
  '0803': { iso: 'SCVE', confidence: 'high' },  // Data processing
  '0804': { iso: 'SCVE', confidence: 'high' },  // IT consulting

  // Royalties & IP
  '0901': { iso: 'LICF', confidence: 'high' },  // Royalties
  '0902': { iso: 'LICF', confidence: 'high' },  // License fees
  '0903': { iso: 'LICF', confidence: 'high' },  // Franchise fees
  '0904': { iso: 'LICF', confidence: 'high' },  // Patent fees

  // Business Services
  '1001': { iso: 'SCVE', confidence: 'high' },  // Legal services
  '1002': { iso: 'SCVE', confidence: 'high' },  // Accounting services
  '1003': { iso: 'SCVE', confidence: 'high' },  // Management consulting
  '1004': { iso: 'SCVE', confidence: 'high' },  // Advertising
  '1005': { iso: 'SCVE', confidence: 'high' },  // Research & development
  '1006': { iso: 'SCVE', confidence: 'high' },  // Architectural services
  '1007': { iso: 'SCVE', confidence: 'high' },  // Engineering services
  '1008': { iso: 'COMM', confidence: 'high' },  // Commission on exports
  '1009': { iso: 'COMM', confidence: 'high' },  // Commission on imports

  // Trade - RMG (Ready Made Garments - key BD export)
  '2101': { iso: 'GDDS', confidence: 'high' },  // Exports - RMG
  '2102': { iso: 'GDDS', confidence: 'high' },  // Exports - Textiles
  '2103': { iso: 'GDDS', confidence: 'high' },  // Exports - Jute
  '2104': { iso: 'GDDS', confidence: 'high' },  // Exports - Leather
  '2105': { iso: 'GDDS', confidence: 'high' },  // Exports - Frozen food
  '2106': { iso: 'GDDS', confidence: 'high' },  // Exports - Pharmaceuticals
  '2107': { iso: 'GDDS', confidence: 'high' },  // Exports - Other

  // Trade - Imports
  '2201': { iso: 'GDDS', confidence: 'high' },  // Imports - Capital machinery
  '2202': { iso: 'GDDS', confidence: 'high' },  // Imports - Raw materials
  '2203': { iso: 'GDDS', confidence: 'high' },  // Imports - Petroleum
  '2204': { iso: 'GDDS', confidence: 'high' },  // Imports - Food grains
  '2205': { iso: 'GDDS', confidence: 'high' },  // Imports - Consumer goods
  '2206': { iso: 'GDDS', confidence: 'high' },  // Imports - Other

  // Investment
  '3101': { iso: 'INVS', confidence: 'high' },  // FDI - Equity investment
  '3102': { iso: 'INVS', confidence: 'high' },  // FDI - Reinvested earnings
  '3103': { iso: 'LOAN', confidence: 'high' },  // FDI - Intercompany loans
  '3201': { iso: 'SECU', confidence: 'high' },  // Portfolio investment
  '3202': { iso: 'SECU', confidence: 'high' },  // Portfolio - Bonds

  // Income
  '4101': { iso: 'DIVI', confidence: 'high' },  // Dividend repatriation
  '4102': { iso: 'DIVI', confidence: 'high' },  // Dividend - Portfolio
  '4201': { iso: 'DIVI', confidence: 'high' },  // Profit repatriation
  '4301': { iso: 'INTE', confidence: 'high' },  // Interest - Loans
  '4302': { iso: 'INTE', confidence: 'high' },  // Interest - Bonds
  '4303': { iso: 'INTE', confidence: 'high' },  // Interest - Deposits

  // Government
  '5001': { iso: 'GOVT', confidence: 'high' },  // Government grants received
  '5002': { iso: 'GOVT', confidence: 'high' },  // Government grants paid
  '5003': { iso: 'TAXS', confidence: 'high' },  // Tax payments

  // Education
  '5101': { iso: 'EDUC', confidence: 'high' },  // Education expenses abroad
  '5102': { iso: 'EDUC', confidence: 'high' },  // Education - tuition
  '5103': { iso: 'EDUC', confidence: 'high' },  // Education - living expenses

  // Transfers
  '6001': { iso: 'FAMI', confidence: 'high' },  // Personal transfers - Family
  '6002': { iso: 'CHAR', confidence: 'high' },  // Donations - Charitable
  '6003': { iso: 'CHAR', confidence: 'high' },  // Donations - Religious
  '6004': { iso: 'PENS', confidence: 'high' },  // Pension payments
};

// ============================================================================
// EGYPT ISO MAPPINGS (14 codes - CBE regulated)
// Simplest market - already uses ISO-like 4-letter codes
// ============================================================================

export const EGYPT_TO_ISO: Record<string, { iso: string; confidence: 'high' | 'medium' | 'low' }> = {
  'SALA': { iso: 'SALA', confidence: 'high' },  // Salary Payment
  'PENS': { iso: 'PENS', confidence: 'high' },  // Pensions Payment
  'SSBE': { iso: 'SSBE', confidence: 'high' },  // Social Security Benefit
  'PENG': { iso: 'PENS', confidence: 'high' },  // National Social Insurance
  'GOVT': { iso: 'GOVT', confidence: 'high' },  // Government Payment
  'LOAN': { iso: 'LOAN', confidence: 'high' },  // Loan Payments
  'SUPP': { iso: 'SUPP', confidence: 'high' },  // Supplier Benefit
  'CCRD': { iso: 'CCRD', confidence: 'high' },  // Credit Card Payment
  'CACC': { iso: 'ACCT', confidence: 'high' },  // Current Account
  'SCCD': { iso: 'GOVT', confidence: 'medium' },  // Suez Canal Certificate (unique)
  'DIVD': { iso: 'DIVI', confidence: 'high' },  // Dividends
  'INTR': { iso: 'INTE', confidence: 'high' },  // Interest
  'COMM': { iso: 'COMM', confidence: 'high' },  // Commission
  'OTHR': { iso: 'OTHR', confidence: 'high' },  // Other
};

// ============================================================================
// MULTI-MARKET CROSS MAPPINGS
// Extended to include all corridors
// ============================================================================

export interface MultiMarketMapping {
  isoCode: ISOCode;
  uaeCodes: MarketCodeMapping[];
  indiaCodes: MarketCodeMapping[];
  pakistanCodes: MarketCodeMapping[];
  philippinesCodes: MarketCodeMapping[];
  bangladeshCodes: MarketCodeMapping[];
  egyptCodes: MarketCodeMapping[];
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
}

export const MULTI_MARKET_MAPPINGS: MultiMarketMapping[] = [
  // FAMILY SUPPORT / REMITTANCES
  {
    isoCode: ISO_PURPOSE_CODES.FAMI,
    uaeCodes: [
      { code: 'FAM', purpose: 'Family Support (Workers remittances)', description: 'Cross Border & Domestic' },
    ],
    indiaCodes: [
      { code: 'P1301', purpose: 'Family Maintenance/Savings - Receipt', description: 'Inward from NRIs', direction: 'inward' },
      { code: 'S1301', purpose: 'Family Maintenance/Savings - Payment', description: 'Outward', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9302', purpose: 'Workers remittance - Savings', description: 'Inward remittances', direction: 'inward' },
      { code: '9304', purpose: 'Workers remittance - Other', description: 'Other remittances', direction: 'inward' },
      { code: '9702', purpose: 'Personal transfers', description: 'Personal transfers' },
    ],
    philippinesCodes: [
      { code: '5201', purpose: 'OFW Remittance - Family support', description: 'Overseas Filipino Worker family support', direction: 'inward' },
      { code: '5202', purpose: 'OFW Remittance - Savings', description: 'Overseas Filipino Worker savings', direction: 'inward' },
      { code: '5310', purpose: 'Donations/Gifts - Individual', description: 'Personal gifts' },
    ],
    bangladeshCodes: [
      { code: '1803', purpose: 'Workers remittance - Other', description: 'Other worker remittances', direction: 'inward' },
      { code: '6001', purpose: 'Personal transfers - Family', description: 'Family transfers' },
    ],
    egyptCodes: [],
    confidence: 'high',
    notes: 'Primary remittance code across all markets',
  },

  // SALARY
  {
    isoCode: ISO_PURPOSE_CODES.SALA,
    uaeCodes: [
      { code: 'SAL', purpose: 'Salary Payment', description: 'Regular salary payments' },
      { code: 'SAA', purpose: 'Salary Advance', description: 'Advance against salary' },
    ],
    indiaCodes: [],
    pakistanCodes: [
      { code: '9301', purpose: 'Workers remittance - Wages', description: 'Wage earner remittances', direction: 'inward' },
    ],
    philippinesCodes: [
      { code: '5203', purpose: 'OFW Remittance - Salary', description: 'OFW salary transfers', direction: 'inward' },
    ],
    bangladeshCodes: [
      { code: '1801', purpose: 'Workers remittance - Wage earners', description: 'Wage earner remittances', direction: 'inward' },
      { code: '1802', purpose: 'Workers remittance - Professionals', description: 'Professional remittances', direction: 'inward' },
    ],
    egyptCodes: [
      { code: 'SALA', purpose: 'Salary Payment', description: 'Salary and wage payments' },
    ],
    confidence: 'high',
    notes: 'Salary payments - India uses P1301 for salary transfers',
  },

  // EDUCATION
  {
    isoCode: ISO_PURPOSE_CODES.EDUC,
    uaeCodes: [
      { code: 'EDU', purpose: 'Educational Support', description: 'Education fees and expenses' },
    ],
    indiaCodes: [
      { code: 'S0305', purpose: 'Travel for Education - Payment', description: 'Education travel', direction: 'outward' },
      { code: 'P0305', purpose: 'Travel for Education - Receipt', description: 'Education receipts', direction: 'inward' },
      { code: 'S1107', purpose: 'Education Services - Payment', description: 'Education services', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9071', purpose: 'Education - Students', description: 'Student education expenses' },
      { code: '9072', purpose: 'Education - Other', description: 'Other education expenses' },
    ],
    philippinesCodes: [
      { code: '5132', purpose: 'Education expenses - Philippines', description: 'Local education' },
      { code: '5133', purpose: 'Education expenses - Abroad', description: 'Foreign education' },
      { code: '5137', purpose: 'Training expenses - Philippines', description: 'Local training' },
    ],
    bangladeshCodes: [
      { code: '0303', purpose: 'Travel - Education', description: 'Education travel' },
      { code: '5101', purpose: 'Education expenses abroad', description: 'Foreign education' },
      { code: '5102', purpose: 'Education - tuition', description: 'Tuition fees' },
    ],
    egyptCodes: [],
    confidence: 'high',
    notes: 'Education-related transfers',
  },

  // MEDICAL
  {
    isoCode: ISO_PURPOSE_CODES.MDCS,
    uaeCodes: [
      { code: 'MED', purpose: 'Medical Treatment', description: 'Medical expenses' },
    ],
    indiaCodes: [
      { code: 'S0304', purpose: 'Medical Treatment - Payment', description: 'Medical travel', direction: 'outward' },
      { code: 'P0304', purpose: 'Medical Treatment - Receipt', description: 'Medical receipts', direction: 'inward' },
      { code: 'S1108', purpose: 'Health Service - Payment', description: 'Health services', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9061', purpose: 'Health related travel', description: 'Medical treatment abroad' },
    ],
    philippinesCodes: [
      { code: '5701', purpose: 'Medical expenses', description: 'Medical treatment' },
      { code: '5702', purpose: 'Hospital expenses', description: 'Hospital bills' },
    ],
    bangladeshCodes: [
      { code: '0304', purpose: 'Travel - Medical', description: 'Medical travel' },
    ],
    egyptCodes: [],
    confidence: 'high',
    notes: 'Medical and health-related transfers',
  },

  // PENSION
  {
    isoCode: ISO_PURPOSE_CODES.PENS,
    uaeCodes: [
      { code: 'PEN', purpose: 'Pension', description: 'Pension payments' },
      { code: 'EOS', purpose: 'End of Service', description: 'Gratuity payments' },
    ],
    indiaCodes: [
      { code: 'S0611', purpose: 'Periodic Pension - Payment', description: 'Pension outward', direction: 'outward' },
      { code: 'P0611', purpose: 'Periodic Pension - Receipt', description: 'Pension inward', direction: 'inward' },
    ],
    pakistanCodes: [
      { code: '9303', purpose: 'Workers remittance - Pensions', description: 'Pension remittances', direction: 'inward' },
      { code: '9703', purpose: 'Pensions', description: 'Pension transfers' },
    ],
    philippinesCodes: [
      { code: '5204', purpose: 'OFW Remittance - Pension', description: 'OFW pension', direction: 'inward' },
    ],
    bangladeshCodes: [
      { code: '6004', purpose: 'Pension payments', description: 'Pension transfers' },
    ],
    egyptCodes: [
      { code: 'PENS', purpose: 'Pensions Payment', description: 'Pension disbursements' },
      { code: 'PENG', purpose: 'National Social Insurance', description: 'Social insurance' },
    ],
    confidence: 'high',
    notes: 'Pension and end-of-service payments',
  },

  // DIVIDENDS
  {
    isoCode: ISO_PURPOSE_CODES.DIVD,
    uaeCodes: [
      { code: 'DIV', purpose: 'Dividend Payouts', description: 'Dividend payments' },
      { code: 'DOE', purpose: 'Dividends on Equity', description: 'Equity dividends' },
      { code: 'IGD', purpose: 'Dividends Intragroup', description: 'Intragroup dividends' },
    ],
    indiaCodes: [
      { code: 'S1409', purpose: 'FDI Dividends - Payment', description: 'FDI dividend outward', direction: 'outward' },
      { code: 'P1409', purpose: 'FDI Dividends - Receipt', description: 'FDI dividend inward', direction: 'inward' },
      { code: 'P1412', purpose: 'Portfolio Dividends - Receipt', description: 'Portfolio dividends', direction: 'inward' },
    ],
    pakistanCodes: [
      { code: '9501', purpose: 'Dividends', description: 'Dividend payments' },
      { code: '9504', purpose: 'Profits', description: 'Profit repatriation' },
    ],
    philippinesCodes: [],
    bangladeshCodes: [
      { code: '4101', purpose: 'Dividend repatriation', description: 'FDI dividends' },
      { code: '4102', purpose: 'Dividend - Portfolio', description: 'Portfolio dividends' },
    ],
    egyptCodes: [
      { code: 'DIVD', purpose: 'Dividends', description: 'Dividend payments' },
    ],
    confidence: 'high',
    notes: 'Dividend payments across markets',
  },

  // TRADE / GOODS
  {
    isoCode: ISO_PURPOSE_CODES.GDDS,
    uaeCodes: [
      { code: 'GDE', purpose: 'Goods Sold (Export)', description: 'Export proceeds' },
      { code: 'GDI', purpose: 'Goods Bought (Import)', description: 'Import payments' },
    ],
    indiaCodes: [
      { code: 'S0101', purpose: 'Advance against Imports', description: 'Import advance', direction: 'outward' },
      { code: 'S0102', purpose: 'Import Settlement', description: 'Import payment', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9201', purpose: 'Merchandise - Exports', description: 'Export of goods' },
      { code: '9211', purpose: 'Merchandise - Imports', description: 'Import of goods' },
    ],
    philippinesCodes: [
      { code: '5901', purpose: 'Export proceeds', description: 'Export receipts' },
      { code: '5902', purpose: 'Import payments', description: 'Import payments' },
    ],
    bangladeshCodes: [
      { code: '2101', purpose: 'Exports - RMG', description: 'Ready made garments' },
      { code: '2102', purpose: 'Exports - Textiles', description: 'Textile exports' },
      { code: '2201', purpose: 'Imports - Capital machinery', description: 'Machinery imports' },
      { code: '2202', purpose: 'Imports - Raw materials', description: 'Raw material imports' },
    ],
    egyptCodes: [
      { code: 'SUPP', purpose: 'Supplier Benefit', description: 'Supplier payments' },
    ],
    confidence: 'high',
    notes: 'Trade in goods - exports and imports',
  },

  // CHARITY
  {
    isoCode: ISO_PURPOSE_CODES.CHAR,
    uaeCodes: [
      { code: 'CHC', purpose: 'Charitable Contributions', description: 'Charity and aid' },
    ],
    indiaCodes: [
      { code: 'S1303', purpose: 'Religious/Charitable Donations', description: 'Religious donations', direction: 'outward' },
      { code: 'S1304', purpose: 'Government/Charitable', description: 'Charitable grants', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9083', purpose: 'Religious travel', description: 'Hajj and religious' },
      { code: '9701', purpose: 'Grants and donations', description: 'Charitable donations' },
    ],
    philippinesCodes: [
      { code: '5311', purpose: 'Donations/Gifts - Institution', description: 'Institutional donations' },
      { code: '5312', purpose: 'Donations/Gifts - Religious', description: 'Religious donations' },
    ],
    bangladeshCodes: [
      { code: '0305', purpose: 'Travel - Religious', description: 'Hajj/Umrah travel' },
      { code: '6002', purpose: 'Donations - Charitable', description: 'Charitable donations' },
      { code: '6003', purpose: 'Donations - Religious', description: 'Religious donations' },
    ],
    egyptCodes: [],
    confidence: 'high',
    notes: 'Charitable and religious donations',
  },

  // INSURANCE
  {
    isoCode: ISO_PURPOSE_CODES.INSU,
    uaeCodes: [
      { code: 'INS', purpose: 'Insurance Services', description: 'Insurance premiums' },
    ],
    indiaCodes: [
      { code: 'S0603', purpose: 'General Insurance - Payment', description: 'Insurance premium', direction: 'outward' },
    ],
    pakistanCodes: [
      { code: '9122', purpose: 'Insurance services', description: 'Insurance' },
    ],
    philippinesCodes: [
      { code: '5601', purpose: 'Insurance premium', description: 'Insurance premium' },
    ],
    bangladeshCodes: [
      { code: '0601', purpose: 'Life insurance premium', description: 'Life insurance' },
      { code: '0602', purpose: 'Non-life insurance premium', description: 'General insurance' },
    ],
    egyptCodes: [],
    confidence: 'high',
    notes: 'Insurance premium payments',
  },

  // GOVERNMENT
  {
    isoCode: ISO_PURPOSE_CODES.GOVT,
    uaeCodes: [
      { code: 'GRI', purpose: 'Government Related Income', description: 'Government fees' },
      { code: 'GOS', purpose: 'Government Goods & Services', description: 'Embassy expenses' },
    ],
    indiaCodes: [
      { code: 'S1201', purpose: 'Indian Embassy Maintenance', description: 'Embassy maintenance', direction: 'outward' },
      { code: 'P1201', purpose: 'Foreign Embassy Maintenance', description: 'Embassy receipts', direction: 'inward' },
    ],
    pakistanCodes: [
      { code: '9601', purpose: 'Government receipts', description: 'Government receipts' },
      { code: '9602', purpose: 'Government payments', description: 'Government payments' },
    ],
    philippinesCodes: [
      { code: '5140', purpose: 'Foreign Office maintenance', description: 'Embassy expenses' },
      { code: '5144', purpose: 'Embassy expenses', description: 'Embassy costs' },
    ],
    bangladeshCodes: [
      { code: '5001', purpose: 'Government grants received', description: 'Government grants' },
      { code: '5002', purpose: 'Government grants paid', description: 'Government payments' },
    ],
    egyptCodes: [
      { code: 'GOVT', purpose: 'Government Payment', description: 'Government payments' },
      { code: 'SCCD', purpose: 'Suez Canal Certificate', description: 'Suez Canal related' },
    ],
    confidence: 'high',
    notes: 'Government-related payments',
  },
];

// ============================================================================
// TRANSLATION FUNCTIONS FOR ALL MARKETS
// ============================================================================

export interface MultiMarketTranslation {
  sourceMarket: string;
  sourceCode: MarketCodeMapping;
  isoCode: ISOCode;
  targetCodes: {
    market: string;
    codes: MarketCodeMapping[];
  }[];
  confidence: 'high' | 'medium' | 'low';
}

// Translate UAE code to any target market
export function translateUAEToMarket(uaeCode: string, targetMarket: 'IN' | 'PK' | 'PH' | 'BD' | 'EG'): MultiMarketTranslation | null {
  const isoMapping = UAE_TO_ISO_MAPPINGS[uaeCode];
  if (!isoMapping) return null;

  const crossMapping = MULTI_MARKET_MAPPINGS.find(m => m.isoCode.code === isoMapping.iso);
  if (!crossMapping) return null;

  const uaeCodeDetails = crossMapping.uaeCodes.find(c => c.code === uaeCode);
  if (!uaeCodeDetails) return null;

  let targetCodes: MarketCodeMapping[] = [];
  switch (targetMarket) {
    case 'IN': targetCodes = crossMapping.indiaCodes; break;
    case 'PK': targetCodes = crossMapping.pakistanCodes; break;
    case 'PH': targetCodes = crossMapping.philippinesCodes; break;
    case 'BD': targetCodes = crossMapping.bangladeshCodes; break;
    case 'EG': targetCodes = crossMapping.egyptCodes; break;
  }

  return {
    sourceMarket: 'AE',
    sourceCode: uaeCodeDetails,
    isoCode: crossMapping.isoCode,
    targetCodes: [{
      market: targetMarket,
      codes: targetCodes,
    }],
    confidence: isoMapping.confidence,
  };
}

// Translate from any market to UAE
export function translateToUAE(
  sourceCode: string,
  sourceMarket: 'IN' | 'PK' | 'PH' | 'BD' | 'EG'
): MultiMarketTranslation | null {
  let isoCode: string | null = null;
  let confidence: 'high' | 'medium' | 'low' = 'low';

  // Find ISO mapping based on source market
  switch (sourceMarket) {
    case 'IN':
      if (INDIA_INWARD_TO_ISO[sourceCode]) {
        isoCode = INDIA_INWARD_TO_ISO[sourceCode].iso;
        confidence = INDIA_INWARD_TO_ISO[sourceCode].confidence;
      } else if (INDIA_OUTWARD_TO_ISO[sourceCode]) {
        isoCode = INDIA_OUTWARD_TO_ISO[sourceCode].iso;
        confidence = INDIA_OUTWARD_TO_ISO[sourceCode].confidence;
      }
      break;
    case 'PK':
      if (PAKISTAN_TO_ISO[sourceCode]) {
        isoCode = PAKISTAN_TO_ISO[sourceCode].iso;
        confidence = PAKISTAN_TO_ISO[sourceCode].confidence;
      }
      break;
    case 'PH':
      if (PHILIPPINES_TO_ISO[sourceCode]) {
        isoCode = PHILIPPINES_TO_ISO[sourceCode].iso;
        confidence = PHILIPPINES_TO_ISO[sourceCode].confidence;
      }
      break;
    case 'BD':
      if (BANGLADESH_TO_ISO[sourceCode]) {
        isoCode = BANGLADESH_TO_ISO[sourceCode].iso;
        confidence = BANGLADESH_TO_ISO[sourceCode].confidence;
      }
      break;
    case 'EG':
      if (EGYPT_TO_ISO[sourceCode]) {
        isoCode = EGYPT_TO_ISO[sourceCode].iso;
        confidence = EGYPT_TO_ISO[sourceCode].confidence;
      }
      break;
  }

  if (!isoCode) return null;

  const crossMapping = MULTI_MARKET_MAPPINGS.find(m => m.isoCode.code === isoCode);
  if (!crossMapping) return null;

  // Find source code details
  let sourceCodeDetails: MarketCodeMapping | undefined;
  switch (sourceMarket) {
    case 'IN': sourceCodeDetails = crossMapping.indiaCodes.find(c => c.code === sourceCode); break;
    case 'PK': sourceCodeDetails = crossMapping.pakistanCodes.find(c => c.code === sourceCode); break;
    case 'PH': sourceCodeDetails = crossMapping.philippinesCodes.find(c => c.code === sourceCode); break;
    case 'BD': sourceCodeDetails = crossMapping.bangladeshCodes.find(c => c.code === sourceCode); break;
    case 'EG': sourceCodeDetails = crossMapping.egyptCodes.find(c => c.code === sourceCode); break;
  }

  if (!sourceCodeDetails) {
    sourceCodeDetails = { code: sourceCode, purpose: 'Unknown', description: '' };
  }

  return {
    sourceMarket,
    sourceCode: sourceCodeDetails,
    isoCode: crossMapping.isoCode,
    targetCodes: [{
      market: 'AE',
      codes: crossMapping.uaeCodes,
    }],
    confidence,
  };
}

// Get all available markets
export const AVAILABLE_MARKETS = ['AE', 'IN', 'PK', 'PH', 'BD', 'EG'] as const;
export type MarketCode = typeof AVAILABLE_MARKETS[number];

// Statistics
export const MAPPING_STATS = {
  totalISOCodes: Object.keys(ISO_PURPOSE_CODES).length,
  totalUAEMappings: Object.keys(UAE_TO_ISO_MAPPINGS).length,
  totalIndiaOutwardMappings: Object.keys(INDIA_OUTWARD_TO_ISO).length,
  totalIndiaInwardMappings: Object.keys(INDIA_INWARD_TO_ISO).length,
  totalPakistanMappings: Object.keys(PAKISTAN_TO_ISO).length,
  totalPhilippinesMappings: Object.keys(PHILIPPINES_TO_ISO).length,
  totalBangladeshMappings: Object.keys(BANGLADESH_TO_ISO).length,
  totalEgyptMappings: Object.keys(EGYPT_TO_ISO).length,
  totalCrossMappings: ISO_CROSS_MAPPINGS.length,
  totalMultiMarketMappings: 11, // Will be updated when MULTI_MARKET_MAPPINGS is populated
  highConfidenceMappings: ISO_CROSS_MAPPINGS.filter(m => m.confidence === 'high').length,
  mediumConfidenceMappings: ISO_CROSS_MAPPINGS.filter(m => m.confidence === 'medium').length,
  lowConfidenceMappings: ISO_CROSS_MAPPINGS.filter(m => m.confidence === 'low').length,
};
