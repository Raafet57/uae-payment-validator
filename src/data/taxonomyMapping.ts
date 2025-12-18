/**
 * UAE Purpose Code Taxonomy Harmonization
 *
 * This file maps UAE proprietary purpose codes to:
 * 1. ISO 20022 External Purpose Codes (ExternalPurpose1Code)
 * 2. IMF Balance of Payments (BOP) Standard Codes
 * 3. Underlying Purpose Taxonomy (UPT) categories
 *
 * Based on CBUAE regulations which derive from IMF BPM6 manual.
 */

// ============================================================================
// ISO 20022 Purpose Codes (ExternalPurpose1Code)
// ============================================================================

export interface ISO20022Code {
  code: string;
  name: string;
  definition: string;
  codeSet: string;
  status: string;
}

export const ISO_20022_CODES: Record<string, ISO20022Code> = {
  // Cash Management
  ACCT: { code: 'ACCT', name: 'AccountManagement', definition: 'Transaction moves funds between 2 accounts of same account holder at the same bank.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  CASH: { code: 'CASH', name: 'CashManagementTransfer', definition: 'Transaction is a general cash management instruction.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  INTC: { code: 'INTC', name: 'IntraCompanyPayment', definition: 'Transaction is an intra-company payment between two companies belonging to the same group.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  INTP: { code: 'INTP', name: 'IntraPartyPayment', definition: 'Transaction is a payment between two accounts belonging to the same party.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Salary & Payroll
  SALA: { code: 'SALA', name: 'SalaryPayment', definition: 'Transaction is the payment of salaries.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  BONU: { code: 'BONU', name: 'BonusPayment', definition: 'Transaction is a bonus payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  PENS: { code: 'PENS', name: 'PensionPayment', definition: 'Transaction is the payment of pension.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  SSBE: { code: 'SSBE', name: 'SocialSecurityBenefit', definition: 'Transaction is a social security benefit payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  PAYR: { code: 'PAYR', name: 'Payroll', definition: 'Transaction is related to the payment of payroll.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  ALLW: { code: 'ALLW', name: 'Allowance', definition: 'Transaction is the payment of allowances.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Trade & Goods
  GDDS: { code: 'GDDS', name: 'PurchaseSaleOfGoods', definition: 'Transaction is related to purchase and sale of goods.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  GDSV: { code: 'GDSV', name: 'PurchaseSaleOfGoodsAndServices', definition: 'Transaction is related to purchase and sale of goods and services.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  TRAD: { code: 'TRAD', name: 'TradeServices', definition: 'Transaction is related to trade services.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Services
  SCVE: { code: 'SCVE', name: 'PurchaseSaleOfServices', definition: 'Transaction is related to purchase and sale of services.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  COMC: { code: 'COMC', name: 'CommercialPayment', definition: 'Transaction is a payment for commercial purposes.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  SUPP: { code: 'SUPP', name: 'SupplierPayment', definition: 'Transaction is related to a payment to a supplier.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Travel & Transport
  TRVL: { code: 'TRVL', name: 'TravelPayment', definition: 'Transaction is the payment of travel related expenses.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  AIRB: { code: 'AIRB', name: 'AirTransport', definition: 'Transaction is related to air transport.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  SEAB: { code: 'SEAB', name: 'SeaTransport', definition: 'Transaction is related to sea transport.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  TRPT: { code: 'TRPT', name: 'TransportPayment', definition: 'Transaction is the payment of transport costs.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Financial
  DIVI: { code: 'DIVI', name: 'Dividend', definition: 'Transaction is the payment of dividends.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  INTE: { code: 'INTE', name: 'Interest', definition: 'Transaction is the payment of interest.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  LOAN: { code: 'LOAN', name: 'LoanPayment', definition: 'Transaction is related to the payment of a loan.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  LOAR: { code: 'LOAR', name: 'LoanRepayment', definition: 'Transaction is related to the repayment of a loan.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  SECU: { code: 'SECU', name: 'Securities', definition: 'Transaction is the payment of securities.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  INVS: { code: 'INVS', name: 'InvestmentAndSecurities', definition: 'Transaction is related to investment and securities.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Insurance
  INSU: { code: 'INSU', name: 'InsurancePremium', definition: 'Transaction is a payment of an insurance premium.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  ICCP: { code: 'ICCP', name: 'InsuranceClaim', definition: 'Transaction is an insurance claim payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Tax & Government
  TAXS: { code: 'TAXS', name: 'TaxPayment', definition: 'Transaction is the payment of taxes.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  TAXR: { code: 'TAXR', name: 'TaxRefund', definition: 'Transaction is a tax refund.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  GOVT: { code: 'GOVT', name: 'GovernmentPayment', definition: 'Transaction is a payment to or from a government department.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  CUST: { code: 'CUST', name: 'CustomsPayment', definition: 'Transaction is payment of customs duties.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Utilities & Bills
  ELEC: { code: 'ELEC', name: 'Electricity', definition: 'Transaction is for electricity bill payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  WTER: { code: 'WTER', name: 'Water', definition: 'Transaction is for water bill payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  GASB: { code: 'GASB', name: 'GasBill', definition: 'Transaction is for gas bill payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  PHON: { code: 'PHON', name: 'TelephoneBill', definition: 'Transaction is for telephone bill payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  UBIL: { code: 'UBIL', name: 'UtilitiesBill', definition: 'Transaction is for utilities bill payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Education
  EDUC: { code: 'EDUC', name: 'Education', definition: 'Transaction is for education-related payment.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  STDY: { code: 'STDY', name: 'Study', definition: 'Transaction is related to a payment for study costs.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Medical
  MDCS: { code: 'MDCS', name: 'MedicalServices', definition: 'Transaction is related to the payment for medical services.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  HLTI: { code: 'HLTI', name: 'HealthInsurance', definition: 'Transaction is related to health insurance.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Property & Rent
  RENT: { code: 'RENT', name: 'RentPayment', definition: 'Transaction is the payment of rent.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  LEAS: { code: 'LEAS', name: 'LeasePayment', definition: 'Transaction is related to a payment of a lease.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  RLWY: { code: 'RLWY', name: 'RealtyPayment', definition: 'Transaction is related to a payment on a property.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Royalties & IP
  LICF: { code: 'LICF', name: 'LicenseFee', definition: 'Transaction is the payment of a license fee.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  ROYP: { code: 'ROYP', name: 'RoyaltyPayment', definition: 'Transaction is the payment of royalties.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Charity & Family
  CHAR: { code: 'CHAR', name: 'CharityPayment', definition: 'Transaction is a payment to a charity.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  ALMY: { code: 'ALMY', name: 'AlimonyPayment', definition: 'Transaction is the payment of alimony.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  FAMI: { code: 'FAMI', name: 'FamilyMaintenance', definition: 'Transaction is related to a payment for family maintenance.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Fees & Commissions
  COMM: { code: 'COMM', name: 'Commission', definition: 'Transaction is the payment of commission.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  FEES: { code: 'FEES', name: 'Fees', definition: 'Transaction is the payment of fees.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  BKFE: { code: 'BKFE', name: 'BankingFees', definition: 'Transaction is related to payment of bank loan fees.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Cards & Digital
  CCRD: { code: 'CCRD', name: 'CreditCardPayment', definition: 'Transaction is a payment of credit card bill.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  DCRD: { code: 'DCRD', name: 'DebitCardPayment', definition: 'Transaction is a payment via debit card.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },

  // Miscellaneous
  OTHR: { code: 'OTHR', name: 'Other', definition: 'Other payment purpose.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  REFU: { code: 'REFU', name: 'Refund', definition: 'Transaction is the payment of a refund.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  ADVA: { code: 'ADVA', name: 'AdvancePayment', definition: 'Transaction is the payment of an advance.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
  RCPT: { code: 'RCPT', name: 'ReceiptPayment', definition: 'Transaction is related to a receipt.', codeSet: 'ExternalPurpose1Code', status: 'Registered' },
};

// ============================================================================
// IMF Balance of Payments Codes (BPM6)
// ============================================================================

export interface IMFBOPCode {
  code: string;
  name: string;
  category: string;
  level: string;
  parentCode: string | null;
  description: string;
}

export const IMF_BOP_CODES: Record<string, IMFBOPCode> = {
  // Current Account - Goods
  '100': { code: '100', name: 'Goods', category: 'Current Account', level: 'category', parentCode: '993', description: 'Trade in goods including merchandise processing repairs and gold' },
  '110': { code: '110', name: 'General merchandise', category: 'Goods', level: 'subcategory', parentCode: '100', description: 'Standard trade in goods as recorded in customs statistics' },
  '150': { code: '150', name: 'Goods for processing', category: 'Goods', level: 'subcategory', parentCode: '100', description: 'Goods sent abroad or received for processing without change of ownership' },
  '160': { code: '160', name: 'Repairs on goods', category: 'Goods', level: 'subcategory', parentCode: '100', description: 'Repair work on goods including ships aircraft and other equipment' },
  '170': { code: '170', name: 'Goods procured in ports', category: 'Goods', level: 'subcategory', parentCode: '100', description: 'Fuel supplies provisions and stores purchased by transport operators' },

  // Current Account - Services
  '200': { code: '200', name: 'Services', category: 'Current Account', level: 'category', parentCode: '993', description: 'International transactions in services' },
  '205': { code: '205', name: 'Transportation services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'All modes of transport for passengers freight and other purposes' },
  '206': { code: '206', name: 'Sea transport', category: 'Services', level: 'detail', parentCode: '205', description: 'Maritime transport services' },
  '210': { code: '210', name: 'Air transport', category: 'Services', level: 'detail', parentCode: '205', description: 'Air transport services' },
  '236': { code: '236', name: 'Travel services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Goods and services acquired by travelers' },
  '245': { code: '245', name: 'Communications services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Telecommunications and postal services' },
  '249': { code: '249', name: 'Construction services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Construction and installation project work' },
  '253': { code: '253', name: 'Insurance services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Life and non-life insurance services' },
  '260': { code: '260', name: 'Financial services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Financial intermediation and auxiliary services' },
  '262': { code: '262', name: 'Computer and information services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Hardware software and data processing services' },
  '266': { code: '266', name: 'Royalties and license fees', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Use of intellectual property rights' },
  '268': { code: '268', name: 'Other business services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Merchanting trade-related services and other' },
  '287': { code: '287', name: 'Personal cultural recreational', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Audio-visual education health and other personal services' },
  '291': { code: '291', name: 'Government services', category: 'Services', level: 'subcategory', parentCode: '200', description: 'Government goods and services not classified elsewhere' },

  // Primary Income
  '300': { code: '300', name: 'Primary Income', category: 'Current Account', level: 'category', parentCode: '993', description: 'Compensation of employees investment income and rent' },
  '310': { code: '310', name: 'Compensation of employees', category: 'Income', level: 'subcategory', parentCode: '300', description: 'Wages salaries and other benefits' },
  '320': { code: '320', name: 'Investment income', category: 'Income', level: 'subcategory', parentCode: '300', description: 'Returns on financial assets' },
  '321': { code: '321', name: 'Direct investment income', category: 'Income', level: 'detail', parentCode: '320', description: 'Income on direct investment capital' },
  '331': { code: '331', name: 'Portfolio investment income', category: 'Income', level: 'detail', parentCode: '320', description: 'Dividends interest on portfolio investment' },
  '339': { code: '339', name: 'Other investment income', category: 'Income', level: 'detail', parentCode: '320', description: 'Interest on loans deposits and other accounts' },

  // Secondary Income (Current Transfers)
  '379': { code: '379', name: 'Secondary Income', category: 'Current Account', level: 'category', parentCode: '993', description: 'Current transfers without quid pro quo' },
  '380': { code: '380', name: 'General government transfers', category: 'Transfers', level: 'subcategory', parentCode: '379', description: 'Government grants taxes fines etc' },
  '390': { code: '390', name: 'Other sectors transfers', category: 'Transfers', level: 'subcategory', parentCode: '379', description: 'Personal remittances and other transfers' },
  '391': { code: '391', name: 'Personal transfers', category: 'Transfers', level: 'detail', parentCode: '390', description: 'Workers remittances and other household transfers' },
  '392': { code: '392', name: 'Other current transfers', category: 'Transfers', level: 'detail', parentCode: '390', description: 'Non-life insurance claims pensions etc' },

  // Capital Account
  '400': { code: '400', name: 'Capital Account', category: 'Capital', level: 'category', parentCode: null, description: 'Capital transfers and non-produced non-financial assets' },
  '430': { code: '430', name: 'Capital transfers', category: 'Capital', level: 'subcategory', parentCode: '400', description: 'Debt forgiveness migrants transfers etc' },

  // Financial Account
  '500': { code: '500', name: 'Financial Account', category: 'Financial', level: 'category', parentCode: null, description: 'Transactions in financial assets and liabilities' },
  '505': { code: '505', name: 'Direct investment', category: 'Financial', level: 'subcategory', parentCode: '500', description: 'Cross-border investment for lasting interest' },
  '555': { code: '555', name: 'Portfolio investment', category: 'Financial', level: 'subcategory', parentCode: '500', description: 'Cross-border investment in securities' },
  '602': { code: '602', name: 'Other investment', category: 'Financial', level: 'subcategory', parentCode: '500', description: 'Loans deposits trade credits etc' },
};

// ============================================================================
// Underlying Purpose Taxonomy (L0-L3 Hierarchy)
// ============================================================================

export interface TaxonomyNode {
  code: string;
  name: string;
  level: 'L0' | 'L1' | 'L2' | 'L3';
  parent: string | null;
  description: string;
}

export const UNDERLYING_PURPOSE_TAXONOMY: Record<string, TaxonomyNode> = {
  // L0 - Root Categories
  'INCOME': { code: 'INCOME', name: 'Income & Compensation', level: 'L0', parent: null, description: 'Employment income, salaries, wages, and benefits' },
  'TRADE': { code: 'TRADE', name: 'Trade in Goods', level: 'L0', parent: null, description: 'Import and export of physical goods' },
  'SERVICES': { code: 'SERVICES', name: 'Services', level: 'L0', parent: null, description: 'Cross-border service transactions' },
  'INVESTMENT': { code: 'INVESTMENT', name: 'Investment & Capital', level: 'L0', parent: null, description: 'Financial investments and capital flows' },
  'TRANSFERS': { code: 'TRANSFERS', name: 'Transfers', level: 'L0', parent: null, description: 'Remittances, gifts, and other transfers' },

  // L1 - Sub-Categories
  'SAL_WAGE': { code: 'SAL_WAGE', name: 'Salaries & Wages', level: 'L1', parent: 'INCOME', description: 'Regular employment compensation' },
  'BENEFITS': { code: 'BENEFITS', name: 'Benefits & Allowances', level: 'L1', parent: 'INCOME', description: 'Non-wage compensation and benefits' },
  'GOODS_EXP': { code: 'GOODS_EXP', name: 'Goods Export', level: 'L1', parent: 'TRADE', description: 'Export of merchandise' },
  'GOODS_IMP': { code: 'GOODS_IMP', name: 'Goods Import', level: 'L1', parent: 'TRADE', description: 'Import of merchandise' },
  'PROF_SVC': { code: 'PROF_SVC', name: 'Professional Services', level: 'L1', parent: 'SERVICES', description: 'Consulting, legal, technical services' },
  'FIN_SVC': { code: 'FIN_SVC', name: 'Financial Services', level: 'L1', parent: 'SERVICES', description: 'Banking, insurance, investment services' },
  'TRANSPORT': { code: 'TRANSPORT', name: 'Transport Services', level: 'L1', parent: 'SERVICES', description: 'Air, sea, and land transport' },
  'TRAVEL': { code: 'TRAVEL', name: 'Travel & Tourism', level: 'L1', parent: 'SERVICES', description: 'Travel-related expenses' },
  'EQUITY': { code: 'EQUITY', name: 'Equity Investment', level: 'L1', parent: 'INVESTMENT', description: 'Shares and equity stakes' },
  'DEBT': { code: 'DEBT', name: 'Debt & Loans', level: 'L1', parent: 'INVESTMENT', description: 'Loans, bonds, and debt instruments' },
  'PROPERTY': { code: 'PROPERTY', name: 'Real Property', level: 'L1', parent: 'INVESTMENT', description: 'Real estate investments' },
  'FAMILY': { code: 'FAMILY', name: 'Family Remittances', level: 'L1', parent: 'TRANSFERS', description: 'Personal family support' },
  'CHARITY': { code: 'CHARITY', name: 'Charity & Donations', level: 'L1', parent: 'TRANSFERS', description: 'Charitable contributions' },
};

// ============================================================================
// UAE Code to ISO/BOP/Taxonomy Mapping
// ============================================================================

export interface TaxonomyMapping {
  uaeCode: string;
  uaeName: string;

  // ISO 20022 Mapping
  isoCode: string | null;
  isoName: string | null;
  isoConfidence: 'exact' | 'close' | 'partial' | 'none';

  // IMF BOP Mapping
  bopCode: string | null;
  bopName: string | null;
  bopConfidence: 'exact' | 'close' | 'partial' | 'none';

  // Underlying Purpose Taxonomy
  taxonomyCode: string;
  taxonomyL0: string;
  taxonomyL1: string;

  // Mapping metadata
  mappingNotes: string;
  regulatoryBasis: string;
}

export const UAE_TAXONOMY_MAPPINGS: TaxonomyMapping[] = [
  // ============================================================================
  // SALARY AND COMPENSATION
  // ============================================================================
  {
    uaeCode: 'SAL', uaeName: 'Salary Payment',
    isoCode: 'SALA', isoName: 'SalaryPayment', isoConfidence: 'exact',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'SAL_WAGE', taxonomyL0: 'INCOME', taxonomyL1: 'SAL_WAGE',
    mappingNotes: 'Direct mapping to ISO SALA and BOP 310',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'SAA', uaeName: 'Salary Advance',
    isoCode: 'ADVA', isoName: 'AdvancePayment', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'close',
    taxonomyCode: 'SAL_WAGE', taxonomyL0: 'INCOME', taxonomyL1: 'SAL_WAGE',
    mappingNotes: 'Advance payment against salary - maps to general advance in ISO',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'BON', uaeName: 'Bonus Payment',
    isoCode: 'BONU', isoName: 'BonusPayment', isoConfidence: 'exact',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'Direct mapping to ISO BONU and BOP 310',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'COP', uaeName: 'Compensation',
    isoCode: 'SALA', isoName: 'SalaryPayment', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'General compensation - maps to salary in ISO',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'LAS', uaeName: 'Leave Salary',
    isoCode: 'SALA', isoName: 'SalaryPayment', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'Leave salary is a form of wage payment',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'PEN', uaeName: 'Pension',
    isoCode: 'PENS', isoName: 'PensionPayment', isoConfidence: 'exact',
    bopCode: '392', bopName: 'Other current transfers', bopConfidence: 'exact',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'Direct mapping to ISO PENS',
    regulatoryBasis: 'UAEFTS AUX700 - Pension'
  },
  {
    uaeCode: 'OVT', uaeName: 'Overtime',
    isoCode: 'SALA', isoName: 'SalaryPayment', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'SAL_WAGE', taxonomyL0: 'INCOME', taxonomyL1: 'SAL_WAGE',
    mappingNotes: 'Overtime is part of wages - no specific ISO code',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'EOS', uaeName: 'End of Service',
    isoCode: 'SSBE', isoName: 'SocialSecurityBenefit', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'close',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'End of service gratuity - UAE specific',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'AES', uaeName: 'Advance Against EOS',
    isoCode: 'ADVA', isoName: 'AdvancePayment', isoConfidence: 'close',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'partial',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'Advance against future gratuity',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },
  {
    uaeCode: 'ALW', uaeName: 'Allowance',
    isoCode: 'ALLW', isoName: 'Allowance', isoConfidence: 'exact',
    bopCode: '310', bopName: 'Compensation of employees', bopConfidence: 'exact',
    taxonomyCode: 'BENEFITS', taxonomyL0: 'INCOME', taxonomyL1: 'BENEFITS',
    mappingNotes: 'Direct mapping to ISO ALLW',
    regulatoryBasis: 'UAEFTS AUX700 - Employment Payments'
  },

  // ============================================================================
  // FAMILY MAINTENANCE & REMITTANCES
  // ============================================================================
  {
    uaeCode: 'FAM', uaeName: 'Family Support (Workers Remittances)',
    isoCode: 'FAMI', isoName: 'FamilyMaintenance', isoConfidence: 'exact',
    bopCode: '391', bopName: 'Personal transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Workers remittances - core BOP category 391',
    regulatoryBasis: 'UAEFTS AUX700 - Personal Transfers, IMF BPM6 391'
  },
  {
    uaeCode: 'TOF', uaeName: 'Transfer of Funds Between Persons',
    isoCode: 'FAMI', isoName: 'FamilyMaintenance', isoConfidence: 'close',
    bopCode: '391', bopName: 'Personal transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Person-to-person transfer',
    regulatoryBasis: 'UAEFTS AUX700 - Personal Transfers'
  },
  {
    uaeCode: 'OAT', uaeName: 'Own Account Transfer',
    isoCode: 'ACCT', isoName: 'AccountManagement', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Own account transfer - not BOP relevant (same entity)',
    regulatoryBasis: 'UAEFTS AUX700 - Account Management'
  },
  {
    uaeCode: 'AE015', uaeName: 'Family Support',
    isoCode: 'FAMI', isoName: 'FamilyMaintenance', isoConfidence: 'exact',
    bopCode: '391', bopName: 'Personal transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Alternative code for family support',
    regulatoryBasis: 'UAEFTS AUX700 - Personal Transfers'
  },

  // ============================================================================
  // TRADE - GOODS EXPORT/IMPORT
  // ============================================================================
  {
    uaeCode: 'GDE', uaeName: 'Goods Sold (Export)',
    isoCode: 'GDDS', isoName: 'PurchaseSaleOfGoods', isoConfidence: 'exact',
    bopCode: '110', bopName: 'General merchandise', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_EXP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_EXP',
    mappingNotes: 'Export of merchandise goods - BOP 110',
    regulatoryBasis: 'UAEFTS AUX700 - Trade, IMF BPM6 110'
  },
  {
    uaeCode: 'GDI', uaeName: 'Goods Bought (Import)',
    isoCode: 'GDDS', isoName: 'PurchaseSaleOfGoods', isoConfidence: 'exact',
    bopCode: '110', bopName: 'General merchandise', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_IMP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_IMP',
    mappingNotes: 'Import of merchandise goods - BOP 110',
    regulatoryBasis: 'UAEFTS AUX700 - Trade, IMF BPM6 110'
  },
  {
    uaeCode: 'GMS', uaeName: 'Processing Repair Maintenance on Goods',
    isoCode: 'GDDS', isoName: 'PurchaseSaleOfGoods', isoConfidence: 'close',
    bopCode: '160', bopName: 'Repairs on goods', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_EXP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_EXP',
    mappingNotes: 'Repairs on goods - specific BOP 160',
    regulatoryBasis: 'UAEFTS AUX700 - Trade, IMF BPM6 160'
  },
  {
    uaeCode: 'GOS', uaeName: 'Government Goods and Services',
    isoCode: 'GOVT', isoName: 'GovernmentPayment', isoConfidence: 'exact',
    bopCode: '291', bopName: 'Government services', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_EXP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_EXP',
    mappingNotes: 'Government procurement - BOP 291',
    regulatoryBasis: 'UAEFTS AUX700 - Government'
  },
  {
    uaeCode: 'TCP', uaeName: 'Trade Credits Payable',
    isoCode: 'TRAD', isoName: 'TradeServices', isoConfidence: 'close',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_IMP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_IMP',
    mappingNotes: 'Trade credit - financial account item',
    regulatoryBasis: 'UAEFTS AUX700 - Trade Finance'
  },
  {
    uaeCode: 'TCR', uaeName: 'Trade Credits Receivable',
    isoCode: 'TRAD', isoName: 'TradeServices', isoConfidence: 'close',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'GOODS_EXP', taxonomyL0: 'TRADE', taxonomyL1: 'GOODS_EXP',
    mappingNotes: 'Trade credit receivable - financial account',
    regulatoryBasis: 'UAEFTS AUX700 - Trade Finance'
  },

  // ============================================================================
  // SERVICES
  // ============================================================================
  {
    uaeCode: 'AE001', uaeName: 'Consulting Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Professional consulting - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services, IMF BPM6 268'
  },
  {
    uaeCode: 'AE002', uaeName: 'Legal Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Legal services - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'IFS', uaeName: 'Information Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'close',
    bopCode: '262', bopName: 'Computer and information services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Information services - BOP 262',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'ITS', uaeName: 'Computer Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'close',
    bopCode: '262', bopName: 'Computer and information services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'IT/Computer services - BOP 262',
    regulatoryBasis: 'UAEFTS AUX700 - Services, IMF BPM6 262'
  },
  {
    uaeCode: 'PMS', uaeName: 'Professional and Management Consulting',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Management consulting - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'RDS', uaeName: 'Research and Development Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'close',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'R&D services - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'TCS', uaeName: 'Telecommunication Services',
    isoCode: 'PHON', isoName: 'TelephoneBill', isoConfidence: 'close',
    bopCode: '245', bopName: 'Communications services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Telecom services - BOP 245',
    regulatoryBasis: 'UAEFTS AUX700 - Services, IMF BPM6 245'
  },
  {
    uaeCode: 'TTS', uaeName: 'Technical Trade-Related Services',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'close',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Trade-related technical services - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'FIS', uaeName: 'Financial Services',
    isoCode: 'FEES', isoName: 'Fees', isoConfidence: 'close',
    bopCode: '260', bopName: 'Financial services', bopConfidence: 'exact',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Financial services - BOP 260',
    regulatoryBasis: 'UAEFTS AUX700 - Financial Services, IMF BPM6 260'
  },
  {
    uaeCode: 'SCO', uaeName: 'Construction',
    isoCode: 'SCVE', isoName: 'PurchaseSaleOfServices', isoConfidence: 'close',
    bopCode: '249', bopName: 'Construction services', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Construction services - BOP 249',
    regulatoryBasis: 'UAEFTS AUX700 - Construction, IMF BPM6 249'
  },

  // ============================================================================
  // TRANSPORT & TRAVEL
  // ============================================================================
  {
    uaeCode: 'ATS', uaeName: 'Air Transport',
    isoCode: 'AIRB', isoName: 'AirTransport', isoConfidence: 'exact',
    bopCode: '210', bopName: 'Air transport', bopConfidence: 'exact',
    taxonomyCode: 'TRANSPORT', taxonomyL0: 'SERVICES', taxonomyL1: 'TRANSPORT',
    mappingNotes: 'Air transport - BOP 210',
    regulatoryBasis: 'UAEFTS AUX700 - Transport, IMF BPM6 210'
  },
  {
    uaeCode: 'STS', uaeName: 'Sea Transport',
    isoCode: 'SEAB', isoName: 'SeaTransport', isoConfidence: 'exact',
    bopCode: '206', bopName: 'Sea transport', bopConfidence: 'exact',
    taxonomyCode: 'TRANSPORT', taxonomyL0: 'SERVICES', taxonomyL1: 'TRANSPORT',
    mappingNotes: 'Sea transport - BOP 206',
    regulatoryBasis: 'UAEFTS AUX700 - Transport, IMF BPM6 206'
  },
  {
    uaeCode: 'OTS', uaeName: 'Other Modes of Transport',
    isoCode: 'TRPT', isoName: 'TransportPayment', isoConfidence: 'exact',
    bopCode: '205', bopName: 'Transportation services', bopConfidence: 'exact',
    taxonomyCode: 'TRANSPORT', taxonomyL0: 'SERVICES', taxonomyL1: 'TRANSPORT',
    mappingNotes: 'Other transport - BOP 205',
    regulatoryBasis: 'UAEFTS AUX700 - Transport'
  },
  {
    uaeCode: 'STR', uaeName: 'Travel',
    isoCode: 'TRVL', isoName: 'TravelPayment', isoConfidence: 'exact',
    bopCode: '236', bopName: 'Travel services', bopConfidence: 'exact',
    taxonomyCode: 'TRAVEL', taxonomyL0: 'SERVICES', taxonomyL1: 'TRAVEL',
    mappingNotes: 'Travel expenses - BOP 236',
    regulatoryBasis: 'UAEFTS AUX700 - Travel, IMF BPM6 236'
  },

  // ============================================================================
  // EDUCATION & CHARITY
  // ============================================================================
  {
    uaeCode: 'EDU', uaeName: 'Educational Support',
    isoCode: 'EDUC', isoName: 'Education', isoConfidence: 'exact',
    bopCode: '287', bopName: 'Personal cultural recreational', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Education expenses - BOP 287',
    regulatoryBasis: 'UAEFTS AUX700 - Education, IMF BPM6 287'
  },
  {
    uaeCode: 'TKT', uaeName: 'Tickets',
    isoCode: 'TRVL', isoName: 'TravelPayment', isoConfidence: 'close',
    bopCode: '236', bopName: 'Travel services', bopConfidence: 'close',
    taxonomyCode: 'TRAVEL', taxonomyL0: 'SERVICES', taxonomyL1: 'TRAVEL',
    mappingNotes: 'Ticket purchases - travel related',
    regulatoryBasis: 'UAEFTS AUX700 - Travel'
  },
  {
    uaeCode: 'CHC', uaeName: 'Charitable Contributions',
    isoCode: 'CHAR', isoName: 'CharityPayment', isoConfidence: 'exact',
    bopCode: '392', bopName: 'Other current transfers', bopConfidence: 'exact',
    taxonomyCode: 'CHARITY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'CHARITY',
    mappingNotes: 'Charitable donations - BOP 392',
    regulatoryBasis: 'UAEFTS AUX700 - Transfers'
  },

  // ============================================================================
  // INVESTMENT - DIVIDENDS & INTEREST
  // ============================================================================
  {
    uaeCode: 'DIV', uaeName: 'Dividend Payouts',
    isoCode: 'DIVI', isoName: 'Dividend', isoConfidence: 'exact',
    bopCode: '331', bopName: 'Portfolio investment income', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Dividend payments - BOP 331',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income, IMF BPM6 331'
  },
  {
    uaeCode: 'DOE', uaeName: 'Dividends on Equity',
    isoCode: 'DIVI', isoName: 'Dividend', isoConfidence: 'exact',
    bopCode: '331', bopName: 'Portfolio investment income', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Equity dividends - BOP 331',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income'
  },
  {
    uaeCode: 'IGD', uaeName: 'Dividends Intragroup',
    isoCode: 'DIVI', isoName: 'Dividend', isoConfidence: 'exact',
    bopCode: '321', bopName: 'Direct investment income', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Intragroup dividends - BOP 321 (direct investment)',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income, IMF BPM6 321'
  },
  {
    uaeCode: 'IOL', uaeName: 'Income on Loans',
    isoCode: 'INTE', isoName: 'Interest', isoConfidence: 'exact',
    bopCode: '339', bopName: 'Other investment income', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Loan interest income - BOP 339',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income'
  },
  {
    uaeCode: 'IOD', uaeName: 'Income on Deposits',
    isoCode: 'INTE', isoName: 'Interest', isoConfidence: 'exact',
    bopCode: '339', bopName: 'Other investment income', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Deposit interest - BOP 339',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income'
  },
  {
    uaeCode: 'LIP', uaeName: 'Loan Interest Payments',
    isoCode: 'INTE', isoName: 'Interest', isoConfidence: 'exact',
    bopCode: '339', bopName: 'Other investment income', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Loan interest payments - BOP 339',
    regulatoryBasis: 'UAEFTS AUX700 - Financial'
  },
  {
    uaeCode: 'IPC', uaeName: 'Charges for Intellectual Property',
    isoCode: 'LICF', isoName: 'LicenseFee', isoConfidence: 'exact',
    bopCode: '266', bopName: 'Royalties and license fees', bopConfidence: 'exact',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'IP royalties - BOP 266',
    regulatoryBasis: 'UAEFTS AUX700 - Services, IMF BPM6 266'
  },

  // ============================================================================
  // LOANS & CREDIT
  // ============================================================================
  {
    uaeCode: 'LLA', uaeName: 'Long-term Loans to Non-Residents',
    isoCode: 'LOAN', isoName: 'LoanPayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Long-term cross-border lending - BOP 602',
    regulatoryBasis: 'UAEFTS AUX700 - Loans, IMF BPM6 602'
  },
  {
    uaeCode: 'LLL', uaeName: 'Long-term Foreign Loans to Residents',
    isoCode: 'LOAN', isoName: 'LoanPayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Long-term borrowing - BOP 602',
    regulatoryBasis: 'UAEFTS AUX700 - Loans'
  },
  {
    uaeCode: 'SLA', uaeName: 'Short-term Loans to Non-Residents',
    isoCode: 'LOAN', isoName: 'LoanPayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Short-term cross-border lending - BOP 602',
    regulatoryBasis: 'UAEFTS AUX700 - Loans'
  },
  {
    uaeCode: 'SLL', uaeName: 'Short-term Foreign Loans to Residents',
    isoCode: 'LOAN', isoName: 'LoanPayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Short-term borrowing - BOP 602',
    regulatoryBasis: 'UAEFTS AUX700 - Loans'
  },
  {
    uaeCode: 'LND', uaeName: 'Loan Disbursements',
    isoCode: 'LOAN', isoName: 'LoanPayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'exact',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Loan disbursement - BOP 602',
    regulatoryBasis: 'UAEFTS AUX700 - Loans'
  },
  {
    uaeCode: 'LNC', uaeName: 'Loan Charges',
    isoCode: 'BKFE', isoName: 'BankingFees', isoConfidence: 'exact',
    bopCode: '260', bopName: 'Financial services', bopConfidence: 'exact',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Loan fees - financial services BOP 260',
    regulatoryBasis: 'UAEFTS AUX700 - Financial Services'
  },

  // ============================================================================
  // EQUITY & SECURITIES
  // ============================================================================
  {
    uaeCode: 'CEA', uaeName: 'Equity in Company Abroad',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'exact',
    bopCode: '505', bopName: 'Direct investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'FDI outward - BOP 505',
    regulatoryBasis: 'UAEFTS AUX700 - Investment, IMF BPM6 505'
  },
  {
    uaeCode: 'CEL', uaeName: 'Equity in Company Abroad - Non-Residents',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'exact',
    bopCode: '505', bopName: 'Direct investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'FDI - BOP 505',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'FSA', uaeName: 'Equity Shares in Foreign Companies',
    isoCode: 'SECU', isoName: 'Securities', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Portfolio equity - BOP 555',
    regulatoryBasis: 'UAEFTS AUX700 - Investment, IMF BPM6 555'
  },
  {
    uaeCode: 'FSL', uaeName: 'Equity Shares in UAE Companies',
    isoCode: 'SECU', isoName: 'Securities', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Local portfolio equity - BOP 555',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'FIA', uaeName: 'Investment Fund Shares - Foreign',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Fund investment - BOP 555',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'FIL', uaeName: 'Investment Fund Shares - UAE',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'close',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Local fund investment - BOP 555',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'ISH', uaeName: 'Income on Investment Fund Shares',
    isoCode: 'DIVI', isoName: 'Dividend', isoConfidence: 'exact',
    bopCode: '331', bopName: 'Portfolio investment income', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Fund income distribution - BOP 331',
    regulatoryBasis: 'UAEFTS AUX700 - Investment Income'
  },
  {
    uaeCode: 'IPO', uaeName: 'IPO Subscriptions',
    isoCode: 'SECU', isoName: 'Securities', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'exact',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'IPO subscription - BOP 555',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },

  // ============================================================================
  // INSURANCE
  // ============================================================================
  {
    uaeCode: 'INS', uaeName: 'Insurance Services',
    isoCode: 'INSU', isoName: 'InsurancePremium', isoConfidence: 'exact',
    bopCode: '253', bopName: 'Insurance services', bopConfidence: 'exact',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Insurance services - BOP 253',
    regulatoryBasis: 'UAEFTS AUX700 - Insurance, IMF BPM6 253'
  },

  // ============================================================================
  // RENT & PROPERTY
  // ============================================================================
  {
    uaeCode: 'RNT', uaeName: 'Rent Payments',
    isoCode: 'RENT', isoName: 'RentPayment', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'close',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'Rent payments - ISO RENT',
    regulatoryBasis: 'UAEFTS AUX700 - Property'
  },
  {
    uaeCode: 'LEA', uaeName: 'Leasing Abroad',
    isoCode: 'LEAS', isoName: 'LeasePayment', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'Cross-border leasing - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Leasing'
  },
  {
    uaeCode: 'LEL', uaeName: 'Leasing in UAE',
    isoCode: 'LEAS', isoName: 'LeasePayment', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'Domestic leasing - not BOP relevant',
    regulatoryBasis: 'UAEFTS AUX700 - Leasing'
  },
  {
    uaeCode: 'PRR', uaeName: 'Profits/Rents on Real Estate',
    isoCode: 'RENT', isoName: 'RentPayment', isoConfidence: 'exact',
    bopCode: '320', bopName: 'Investment income', bopConfidence: 'close',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'Property rental income',
    regulatoryBasis: 'UAEFTS AUX700 - Property'
  },
  {
    uaeCode: 'PPA', uaeName: 'Purchase Real Estate Abroad',
    isoCode: 'RLWY', isoName: 'RealtyPayment', isoConfidence: 'exact',
    bopCode: '505', bopName: 'Direct investment', bopConfidence: 'close',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'Foreign property purchase',
    regulatoryBasis: 'UAEFTS AUX700 - Property'
  },
  {
    uaeCode: 'PPL', uaeName: 'Purchase Real Estate in UAE',
    isoCode: 'RLWY', isoName: 'RealtyPayment', isoConfidence: 'exact',
    bopCode: '505', bopName: 'Direct investment', bopConfidence: 'close',
    taxonomyCode: 'PROPERTY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'PROPERTY',
    mappingNotes: 'UAE property purchase from non-resident',
    regulatoryBasis: 'UAEFTS AUX700 - Property'
  },

  // ============================================================================
  // TAX & GOVERNMENT
  // ============================================================================
  {
    uaeCode: 'TAX', uaeName: 'Tax Payment',
    isoCode: 'TAXS', isoName: 'TaxPayment', isoConfidence: 'exact',
    bopCode: '380', bopName: 'General government transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Tax payments - BOP 380',
    regulatoryBasis: 'UAEFTS AUX700 - Tax, IMF BPM6 380'
  },
  {
    uaeCode: 'XAT', uaeName: 'Tax Refund',
    isoCode: 'TAXR', isoName: 'TaxRefund', isoConfidence: 'exact',
    bopCode: '380', bopName: 'General government transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Tax refund - BOP 380',
    regulatoryBasis: 'UAEFTS AUX700 - Tax'
  },
  {
    uaeCode: 'GRI', uaeName: 'Government Related',
    isoCode: 'GOVT', isoName: 'GovernmentPayment', isoConfidence: 'exact',
    bopCode: '380', bopName: 'General government transfers', bopConfidence: 'exact',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Government transfers - BOP 380',
    regulatoryBasis: 'UAEFTS AUX700 - Government'
  },

  // ============================================================================
  // UTILITIES
  // ============================================================================
  {
    uaeCode: 'UTL', uaeName: 'Utility Bill Payments',
    isoCode: 'UBIL', isoName: 'UtilitiesBill', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'PROF_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'PROF_SVC',
    mappingNotes: 'Utility payments - typically domestic',
    regulatoryBasis: 'UAEFTS AUX700 - Utilities'
  },

  // ============================================================================
  // CARDS & DIGITAL
  // ============================================================================
  {
    uaeCode: 'CCP', uaeName: 'Corporate Card Payments',
    isoCode: 'CCRD', isoName: 'CreditCardPayment', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Corporate card - settlement mechanism',
    regulatoryBasis: 'UAEFTS AUX700 - Cards'
  },
  {
    uaeCode: 'CRP', uaeName: 'Credit Card Payment',
    isoCode: 'CCRD', isoName: 'CreditCardPayment', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Credit card settlement',
    regulatoryBasis: 'UAEFTS AUX700 - Cards'
  },
  {
    uaeCode: 'DCP', uaeName: 'Debit Card Payments',
    isoCode: 'DCRD', isoName: 'DebitCardPayment', isoConfidence: 'exact',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Debit card settlement',
    regulatoryBasis: 'UAEFTS AUX700 - Cards'
  },
  {
    uaeCode: 'MWP', uaeName: 'Mobile Wallet Payments',
    isoCode: null, isoName: null, isoConfidence: 'none',
    bopCode: null, bopName: null, bopConfidence: 'none',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Mobile wallet - UAE specific digital payment',
    regulatoryBasis: 'UAEFTS AUX700 - Digital Payments'
  },

  // ============================================================================
  // FEES & COMMISSIONS
  // ============================================================================
  {
    uaeCode: 'COM', uaeName: 'Commission',
    isoCode: 'COMM', isoName: 'Commission', isoConfidence: 'exact',
    bopCode: '260', bopName: 'Financial services', bopConfidence: 'close',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Commission payments',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },
  {
    uaeCode: 'ACM', uaeName: 'Agency Commissions',
    isoCode: 'COMM', isoName: 'Commission', isoConfidence: 'exact',
    bopCode: '268', bopName: 'Other business services', bopConfidence: 'exact',
    taxonomyCode: 'FIN_SVC', taxonomyL0: 'SERVICES', taxonomyL1: 'FIN_SVC',
    mappingNotes: 'Agency commission - BOP 268',
    regulatoryBasis: 'UAEFTS AUX700 - Services'
  },

  // ============================================================================
  // MISCELLANEOUS
  // ============================================================================
  {
    uaeCode: 'OTH', uaeName: 'Other Payments',
    isoCode: 'OTHR', isoName: 'Other', isoConfidence: 'exact',
    bopCode: '392', bopName: 'Other current transfers', bopConfidence: 'close',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Catch-all code',
    regulatoryBasis: 'UAEFTS AUX700 - Other'
  },
  {
    uaeCode: 'EMI', uaeName: 'Equated Monthly Installments',
    isoCode: 'LOAR', isoName: 'LoanRepayment', isoConfidence: 'exact',
    bopCode: '602', bopName: 'Other investment', bopConfidence: 'close',
    taxonomyCode: 'DEBT', taxonomyL0: 'INVESTMENT', taxonomyL1: 'DEBT',
    mappingNotes: 'Loan EMI payments',
    regulatoryBasis: 'UAEFTS AUX700 - Loans'
  },
  {
    uaeCode: 'MCR', uaeName: 'Monetary Claim Reimbursements',
    isoCode: 'REFU', isoName: 'Refund', isoConfidence: 'exact',
    bopCode: '392', bopName: 'Other current transfers', bopConfidence: 'close',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Reimbursements',
    regulatoryBasis: 'UAEFTS AUX700 - Miscellaneous'
  },
  {
    uaeCode: 'POR', uaeName: 'Refunds on IPO',
    isoCode: 'REFU', isoName: 'Refund', isoConfidence: 'exact',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'close',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'IPO refund',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'CBP', uaeName: 'Cross Border Payments',
    isoCode: 'OTHR', isoName: 'Other', isoConfidence: 'partial',
    bopCode: '392', bopName: 'Other current transfers', bopConfidence: 'partial',
    taxonomyCode: 'FAMILY', taxonomyL0: 'TRANSFERS', taxonomyL1: 'FAMILY',
    mappingNotes: 'Generic cross-border - needs specific classification',
    regulatoryBasis: 'UAEFTS AUX700 - Cross-border'
  },
  {
    uaeCode: 'PIN', uaeName: 'Personal Investments',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'close',
    bopCode: '555', bopName: 'Portfolio investment', bopConfidence: 'close',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Personal investment',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'CIN', uaeName: 'Commercial Investments',
    isoCode: 'INVS', isoName: 'InvestmentAndSecurities', isoConfidence: 'close',
    bopCode: '505', bopName: 'Direct investment', bopConfidence: 'close',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Commercial investment',
    regulatoryBasis: 'UAEFTS AUX700 - Investment'
  },
  {
    uaeCode: 'IGT', uaeName: 'Inter Group Transfer',
    isoCode: 'INTC', isoName: 'IntraCompanyPayment', isoConfidence: 'exact',
    bopCode: '321', bopName: 'Direct investment income', bopConfidence: 'close',
    taxonomyCode: 'EQUITY', taxonomyL0: 'INVESTMENT', taxonomyL1: 'EQUITY',
    mappingNotes: 'Intercompany transfer - ISO INTC',
    regulatoryBasis: 'UAEFTS AUX700 - Intercompany'
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get mapping for a UAE code
 */
export function getUAEMapping(uaeCode: string): TaxonomyMapping | undefined {
  return UAE_TAXONOMY_MAPPINGS.find(m => m.uaeCode === uaeCode);
}

/**
 * Get all UAE codes mapped to a specific ISO code
 */
export function getUAECodesByISO(isoCode: string): TaxonomyMapping[] {
  return UAE_TAXONOMY_MAPPINGS.filter(m => m.isoCode === isoCode);
}

/**
 * Get all UAE codes mapped to a specific BOP code
 */
export function getUAECodesByBOP(bopCode: string): TaxonomyMapping[] {
  return UAE_TAXONOMY_MAPPINGS.filter(m => m.bopCode === bopCode);
}

/**
 * Get mapping statistics
 */
export function getMappingStatistics() {
  const total = UAE_TAXONOMY_MAPPINGS.length;

  const isoStats = {
    exact: UAE_TAXONOMY_MAPPINGS.filter(m => m.isoConfidence === 'exact').length,
    close: UAE_TAXONOMY_MAPPINGS.filter(m => m.isoConfidence === 'close').length,
    partial: UAE_TAXONOMY_MAPPINGS.filter(m => m.isoConfidence === 'partial').length,
    none: UAE_TAXONOMY_MAPPINGS.filter(m => m.isoConfidence === 'none').length,
  };

  const bopStats = {
    exact: UAE_TAXONOMY_MAPPINGS.filter(m => m.bopConfidence === 'exact').length,
    close: UAE_TAXONOMY_MAPPINGS.filter(m => m.bopConfidence === 'close').length,
    partial: UAE_TAXONOMY_MAPPINGS.filter(m => m.bopConfidence === 'partial').length,
    none: UAE_TAXONOMY_MAPPINGS.filter(m => m.bopConfidence === 'none').length,
  };

  const taxonomyStats = {
    INCOME: UAE_TAXONOMY_MAPPINGS.filter(m => m.taxonomyL0 === 'INCOME').length,
    TRADE: UAE_TAXONOMY_MAPPINGS.filter(m => m.taxonomyL0 === 'TRADE').length,
    SERVICES: UAE_TAXONOMY_MAPPINGS.filter(m => m.taxonomyL0 === 'SERVICES').length,
    INVESTMENT: UAE_TAXONOMY_MAPPINGS.filter(m => m.taxonomyL0 === 'INVESTMENT').length,
    TRANSFERS: UAE_TAXONOMY_MAPPINGS.filter(m => m.taxonomyL0 === 'TRANSFERS').length,
  };

  return {
    total,
    iso: {
      ...isoStats,
      coverage: ((isoStats.exact + isoStats.close) / total * 100).toFixed(1),
    },
    bop: {
      ...bopStats,
      coverage: ((bopStats.exact + bopStats.close) / total * 100).toFixed(1),
    },
    taxonomy: taxonomyStats,
  };
}
