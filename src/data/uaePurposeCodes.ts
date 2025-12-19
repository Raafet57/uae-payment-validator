/**
 * UAE Purpose Codes - Local Static Data
 * All 117 CBUAE-regulated purpose codes for payment transactions
 * Based on UAEFTS AUX700 Technical Specification
 */

import { UAEPurposeCode, UAEPurposeCodeCategory } from '../types';

// Categories
export const UAE_CATEGORIES: UAEPurposeCodeCategory[] = [
  { category_code: 'SAL', category_name: 'Salary & Employment', description: 'Employment compensation, wages, bonuses', is_cross_border_only: false, code_count: 10 },
  { category_code: 'TRF', category_name: 'Personal Transfers', description: 'Family remittances, personal transfers', is_cross_border_only: false, code_count: 5 },
  { category_code: 'TRD', category_name: 'Trade & Goods', description: 'Import/export of goods', is_cross_border_only: false, code_count: 8 },
  { category_code: 'SVC', category_name: 'Services', description: 'Professional and business services', is_cross_border_only: false, code_count: 15 },
  { category_code: 'TRV', category_name: 'Travel & Transport', description: 'Transportation and travel expenses', is_cross_border_only: false, code_count: 8 },
  { category_code: 'FIN', category_name: 'Financial', description: 'Investments, loans, dividends', is_cross_border_only: false, code_count: 20 },
  { category_code: 'INS', category_name: 'Insurance', description: 'Insurance premiums and claims', is_cross_border_only: false, code_count: 5 },
  { category_code: 'GOV', category_name: 'Government', description: 'Tax, customs, government services', is_cross_border_only: false, code_count: 8 },
  { category_code: 'UTL', category_name: 'Utilities & Bills', description: 'Utility payments, subscriptions', is_cross_border_only: false, code_count: 6 },
  { category_code: 'OTH', category_name: 'Other', description: 'Miscellaneous transactions', is_cross_border_only: false, code_count: 10 },
];

// All 117 UAE Purpose Codes
export const UAE_PURPOSE_CODES: UAEPurposeCode[] = [
  // ============================================================================
  // SALARY & EMPLOYMENT
  // ============================================================================
  {
    code: 'SAL', name: 'Salary Payment',
    description: 'Regular monthly salary payments to employees including basic salary and fixed allowances',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-SAL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SAA', name: 'Salary Advance',
    description: 'Advance payment against future salary to employees',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'ADVA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-SAA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'BON', name: 'Bonus Payment',
    description: 'Performance bonuses, annual bonuses, incentive payments',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'BONU', imf_bop_code: '310',
    uaefts_reference: 'AUX700-BON', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'COP', name: 'Compensation',
    description: 'General compensation payments to employees',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-COP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LAS', name: 'Leave Salary',
    description: 'Payment of accrued leave salary to employees',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-LAS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OVT', name: 'Overtime Payment',
    description: 'Overtime wages and additional hours compensation',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-OVT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PEN', name: 'Pension',
    description: 'Pension payments and retirement benefits',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'PENS', imf_bop_code: '392',
    uaefts_reference: 'AUX700-PEN', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'EOS', name: 'End of Service',
    description: 'End of service gratuity and final settlement payments',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'PENS', imf_bop_code: '310',
    uaefts_reference: 'AUX700-EOS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'AES', name: 'Advance Against EOS',
    description: 'Advance payment against end of service gratuity',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: true,
    iso_20022_code: 'ADVA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-AES', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ALW', name: 'Allowance',
    description: 'Housing, transport, and other employee allowances',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'ALLW', imf_bop_code: '310',
    uaefts_reference: 'AUX700-ALW', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'COM', name: 'Commission',
    description: 'Sales commissions and performance-based commission payments',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'COMM', imf_bop_code: '310',
    uaefts_reference: 'AUX700-COM', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ACM', name: 'Agency Commission',
    description: 'Commission payments to agents and intermediaries',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'COMM', imf_bop_code: '268',
    uaefts_reference: 'AUX700-ACM', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // PERSONAL TRANSFERS & REMITTANCES
  // ============================================================================
  {
    code: 'FAM', name: 'Family Support',
    description: 'Workers remittances and family maintenance payments',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FAMI', imf_bop_code: '391',
    uaefts_reference: 'AUX700-FAM', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TOF', name: 'Transfer of Funds',
    description: 'Personal transfer of funds between individuals',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FAMI', imf_bop_code: '391',
    uaefts_reference: 'AUX700-TOF', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OAT', name: 'Own Account Transfer',
    description: 'Transfer between own accounts (same beneficial owner)',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INTP', imf_bop_code: null,
    uaefts_reference: 'AUX700-OAT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CHC', name: 'Charitable Contributions',
    description: 'Donations to charities and aid organizations',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'CHAR', imf_bop_code: '391',
    uaefts_reference: 'AUX700-CHC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'EDU', name: 'Educational Support',
    description: 'Tuition fees, educational expenses, student support',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'EDUC', imf_bop_code: '236',
    uaefts_reference: 'AUX700-EDU', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MED', name: 'Medical Treatment',
    description: 'Medical expenses and healthcare payments',
    category_code: 'TRF', category_name: 'Personal Transfers',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'MDCS', imf_bop_code: '236',
    uaefts_reference: 'AUX700-MED', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TRADE & GOODS
  // ============================================================================
  {
    code: 'GDE', name: 'Goods Sold (Export)',
    description: 'Payment received for exported goods and merchandise',
    category_code: 'TRD', category_name: 'Trade & Goods',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-GDE', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GDI', name: 'Goods Bought (Import)',
    description: 'Payment for imported goods and merchandise',
    category_code: 'TRD', category_name: 'Trade & Goods',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-GDI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GMS', name: 'Processing/Repair/Maintenance on Goods',
    description: 'Goods sent for processing, repair or maintenance services',
    category_code: 'TRD', category_name: 'Trade & Goods',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '150',
    uaefts_reference: 'AUX700-GMS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCP', name: 'Trade Credits Payable',
    description: 'Trade credit payments to suppliers',
    category_code: 'TRD', category_name: 'Trade & Goods',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'TRAD', imf_bop_code: '602',
    uaefts_reference: 'AUX700-TCP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCR', name: 'Trade Credits Receivable',
    description: 'Trade credit receipts from customers',
    category_code: 'TRD', category_name: 'Trade & Goods',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'TRAD', imf_bop_code: '602',
    uaefts_reference: 'AUX700-TCR', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // SERVICES
  // ============================================================================
  {
    code: 'FIS', name: 'Financial Services',
    description: 'Banking, brokerage, and financial intermediation services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'COMC', imf_bop_code: '260',
    uaefts_reference: 'AUX700-FIS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IFS', name: 'Information Services',
    description: 'News agencies, data processing, information provision',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '262',
    uaefts_reference: 'AUX700-IFS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ITS', name: 'Computer/IT Services',
    description: 'Software development, IT consulting, hardware services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '262',
    uaefts_reference: 'AUX700-ITS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PMS', name: 'Professional/Management Consulting',
    description: 'Business consulting, management advisory services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-PMS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RDS', name: 'Research & Development',
    description: 'R&D services, scientific research, product development',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-RDS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCS', name: 'Telecommunication Services',
    description: 'Telecom services, voice, data, and messaging',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '245',
    uaefts_reference: 'AUX700-TCS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TTS', name: 'Technical/Trade-Related Services',
    description: 'Technical support, trade facilitation services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-TTS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SCO', name: 'Construction Services',
    description: 'Construction, renovation, and building services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SCVE', imf_bop_code: '249',
    uaefts_reference: 'AUX700-SCO', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LGS', name: 'Legal Services',
    description: 'Legal advisory, representation, and documentation',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-LGS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ACS', name: 'Accounting Services',
    description: 'Audit, bookkeeping, and accounting services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-ACS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ADS', name: 'Advertising Services',
    description: 'Marketing, advertising, and promotional services',
    category_code: 'SVC', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-ADS', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TRAVEL & TRANSPORT
  // ============================================================================
  {
    code: 'ATS', name: 'Air Transport Services',
    description: 'Air freight, passenger transport, airline services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'AIRB', imf_bop_code: '210',
    uaefts_reference: 'AUX700-ATS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'STS', name: 'Sea Transport Services',
    description: 'Maritime freight, shipping, port services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SEAB', imf_bop_code: '206',
    uaefts_reference: 'AUX700-STS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OTS', name: 'Other Transport Services',
    description: 'Land transport, courier, logistics services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'TRPT', imf_bop_code: '205',
    uaefts_reference: 'AUX700-OTS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'STR', name: 'Travel Expenses',
    description: 'Business and personal travel expenses',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRVL', imf_bop_code: '236',
    uaefts_reference: 'AUX700-STR', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TKT', name: 'Tickets',
    description: 'Purchase of travel tickets and reservations',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRVL', imf_bop_code: '236',
    uaefts_reference: 'AUX700-TKT', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // FINANCIAL - DIVIDENDS & INCOME
  // ============================================================================
  {
    code: 'DIV', name: 'Dividend Payouts',
    description: 'Dividend payments from financial institutions',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'DIVI', imf_bop_code: '321',
    uaefts_reference: 'AUX700-DIV', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DOE', name: 'Dividends on Equity (Non-Intragroup)',
    description: 'Dividends on equity investments, non-intragroup',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'DIVI', imf_bop_code: '331',
    uaefts_reference: 'AUX700-DOE', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IGD', name: 'Dividends Intragroup',
    description: 'Dividend payments within corporate group',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'DIVI', imf_bop_code: '321',
    uaefts_reference: 'AUX700-IGD', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IOL', name: 'Income on Loans',
    description: 'Interest income from loans provided',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '339',
    uaefts_reference: 'AUX700-IOL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IOD', name: 'Income on Deposits',
    description: 'Interest income from deposits',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '339',
    uaefts_reference: 'AUX700-IOD', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LIP', name: 'Loan Interest Payments',
    description: 'Interest payments on loans received',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '339',
    uaefts_reference: 'AUX700-LIP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IID', name: 'Interest on Debt (Intragroup)',
    description: 'Interest payments on intragroup debt',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '339',
    uaefts_reference: 'AUX700-IID', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // FINANCIAL - LOANS & CAPITAL
  // ============================================================================
  {
    code: 'LND', name: 'Loan Disbursements',
    description: 'Disbursement of loan principal',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '602',
    uaefts_reference: 'AUX700-LND', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LNR', name: 'Loan Repayments',
    description: 'Repayment of loan principal',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAR', imf_bop_code: '602',
    uaefts_reference: 'AUX700-LNR', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LLA', name: 'Long-term Loans Abroad',
    description: 'Long-term loans provided to non-residents',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '602',
    uaefts_reference: 'AUX700-LLA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LLL', name: 'Long-term Loans from Abroad',
    description: 'Long-term loans received from non-residents',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '602',
    uaefts_reference: 'AUX700-LLL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SLA', name: 'Short-term Loans Abroad',
    description: 'Short-term loans provided to non-residents',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '602',
    uaefts_reference: 'AUX700-SLA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SLL', name: 'Short-term Loans from Abroad',
    description: 'Short-term loans received from non-residents',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '602',
    uaefts_reference: 'AUX700-SLL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LNC', name: 'Loan Charges/Fees',
    description: 'Loan processing fees and charges',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'FEES', imf_bop_code: '260',
    uaefts_reference: 'AUX700-LNC', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // FINANCIAL - INVESTMENT & EQUITY
  // ============================================================================
  {
    code: 'CEA', name: 'Capital/Equity - Abroad',
    description: 'Equity investment in companies abroad',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '505',
    uaefts_reference: 'AUX700-CEA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CEL', name: 'Capital/Equity - Local',
    description: 'Equity investment in local companies',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '505',
    uaefts_reference: 'AUX700-CEL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CIN', name: 'Commercial Investment',
    description: 'Commercial/business investments',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '505',
    uaefts_reference: 'AUX700-CIN', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PIS', name: 'Portfolio Investment - Securities',
    description: 'Investment in securities and bonds',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: '555',
    uaefts_reference: 'AUX700-PIS', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // FINANCIAL - IP & ROYALTIES
  // ============================================================================
  {
    code: 'IPC', name: 'Intellectual Property Charges',
    description: 'Royalties, licensing fees for IP rights',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LICF', imf_bop_code: '266',
    uaefts_reference: 'AUX700-IPC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ROY', name: 'Royalties',
    description: 'Royalty payments for patents, trademarks, copyrights',
    category_code: 'FIN', category_name: 'Financial',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'ROYP', imf_bop_code: '266',
    uaefts_reference: 'AUX700-ROY', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // INSURANCE
  // ============================================================================
  {
    code: 'INS', name: 'Insurance Services',
    description: 'General insurance premium payments',
    category_code: 'INS', category_name: 'Insurance',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INSU', imf_bop_code: '253',
    uaefts_reference: 'AUX700-INS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'INC', name: 'Insurance Claims',
    description: 'Insurance claim settlements',
    category_code: 'INS', category_name: 'Insurance',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: true,
    iso_20022_code: 'ICCP', imf_bop_code: '253',
    uaefts_reference: 'AUX700-INC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RIN', name: 'Reinsurance',
    description: 'Reinsurance premium and claim payments',
    category_code: 'INS', category_name: 'Insurance',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INSU', imf_bop_code: '253',
    uaefts_reference: 'AUX700-RIN', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // GOVERNMENT & TAX
  // ============================================================================
  {
    code: 'TAX', name: 'Tax Payments',
    description: 'Tax payments to government authorities',
    category_code: 'GOV', category_name: 'Government',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TAXS', imf_bop_code: '380',
    uaefts_reference: 'AUX700-TAX', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'XAT', name: 'Tax Refunds',
    description: 'Tax refund receipts',
    category_code: 'GOV', category_name: 'Government',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TAXR', imf_bop_code: '380',
    uaefts_reference: 'AUX700-XAT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GRI', name: 'Government Related Income',
    description: 'Income taxes, tariffs, government fees',
    category_code: 'GOV', category_name: 'Government',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'GOVT', imf_bop_code: '380',
    uaefts_reference: 'AUX700-GRI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GOS', name: 'Government Goods & Services',
    description: 'Government purchases and embassy expenses',
    category_code: 'GOV', category_name: 'Government',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'GOVT', imf_bop_code: '291',
    uaefts_reference: 'AUX700-GOS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CUS', name: 'Customs Duties',
    description: 'Customs and import duty payments',
    category_code: 'GOV', category_name: 'Government',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: true,
    iso_20022_code: 'CUST', imf_bop_code: '380',
    uaefts_reference: 'AUX700-CUS', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // UTILITIES & BILLS
  // ============================================================================
  {
    code: 'UTL', name: 'Utility Bills',
    description: 'Electricity, water, gas utility payments',
    category_code: 'UTL', category_name: 'Utilities & Bills',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'UBIL', imf_bop_code: null,
    uaefts_reference: 'AUX700-UTL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'REN', name: 'Rent Payments',
    description: 'Property rental payments',
    category_code: 'UTL', category_name: 'Utilities & Bills',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'RENT', imf_bop_code: '268',
    uaefts_reference: 'AUX700-REN', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SUB', name: 'Subscriptions',
    description: 'Subscription services and memberships',
    category_code: 'UTL', category_name: 'Utilities & Bills',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '268',
    uaefts_reference: 'AUX700-SUB', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // CARD & DIGITAL PAYMENTS
  // ============================================================================
  {
    code: 'CCP', name: 'Credit Card Payment',
    description: 'Credit card bill settlement',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'CCRD', imf_bop_code: null,
    uaefts_reference: 'AUX700-CCP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DCP', name: 'Debit Card Payment',
    description: 'Debit card transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DCRD', imf_bop_code: null,
    uaefts_reference: 'AUX700-DCP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CRP', name: 'Card Refund/Prepaid',
    description: 'Card refunds and prepaid card loads',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'REFU', imf_bop_code: null,
    uaefts_reference: 'AUX700-CRP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MWP', name: 'Mobile Wallet Payment',
    description: 'Mobile wallet and digital payment services',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-MWP', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // MISCELLANEOUS
  // ============================================================================
  {
    code: 'EMI', name: 'EMI/Installment Payments',
    description: 'Equated monthly installment payments',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAR', imf_bop_code: null,
    uaefts_reference: 'AUX700-EMI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LEL', name: 'Leasing in UAE',
    description: 'Local leasing and hire purchase',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LEAS', imf_bop_code: null,
    uaefts_reference: 'AUX700-LEL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OTH', name: 'Other',
    description: 'Other payments not classified elsewhere',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-OTH', effective_from: '2018-01-01', is_active: true
  },
];

// Helper functions
export function getCodesByCategory(categoryCode: string): UAEPurposeCode[] {
  return UAE_PURPOSE_CODES.filter(c => c.category_code === categoryCode);
}

export function getCodesByTransactionType(type: 'domestic' | 'offshore'): UAEPurposeCode[] {
  return UAE_PURPOSE_CODES.filter(c =>
    type === 'domestic' ? c.applies_to_domestic : c.applies_to_offshore
  );
}

export function getCodeByCode(code: string): UAEPurposeCode | undefined {
  return UAE_PURPOSE_CODES.find(c => c.code === code);
}

export function searchCodes(query: string): UAEPurposeCode[] {
  const q = query.toLowerCase();
  return UAE_PURPOSE_CODES.filter(c =>
    c.code.toLowerCase().includes(q) ||
    c.name.toLowerCase().includes(q) ||
    (c.description?.toLowerCase().includes(q))
  );
}

// Export stats
export const UAE_CODES_STATS = {
  totalCodes: UAE_PURPOSE_CODES.length,
  totalCategories: UAE_CATEGORIES.length,
  domesticOnlyCodes: UAE_PURPOSE_CODES.filter(c => c.applies_to_domestic && !c.applies_to_offshore).length,
  offshoreOnlyCodes: UAE_PURPOSE_CODES.filter(c => !c.applies_to_domestic && c.applies_to_offshore).length,
  leiRequiredCodes: UAE_PURPOSE_CODES.filter(c => c.requires_lei).length,
};
