/**
 * UAE Purpose Codes - Complete 117 CBUAE-regulated purpose codes
 * Based on UAEFTS AUX700 Technical Specification
 * Synced from backend/app/modules/uae/constants.py
 */

import { UAEPurposeCode, UAEPurposeCodeCategory } from '../types';

// Categories
export const UAE_CATEGORIES: UAEPurposeCodeCategory[] = [
  { category_code: 'SAL', category_name: 'Salary & Employment', description: 'Employment compensation, wages, bonuses', is_cross_border_only: false, code_count: 7 },
  { category_code: 'FAM', category_name: 'Family & Remittances', description: 'Family remittances, personal transfers', is_cross_border_only: false, code_count: 4 },
  { category_code: 'GDE', category_name: 'Trade - Export', description: 'Export of goods', is_cross_border_only: true, code_count: 5 },
  { category_code: 'GDI', category_name: 'Trade - Import', description: 'Import of goods', is_cross_border_only: true, code_count: 2 },
  { category_code: 'SRV', category_name: 'Services', description: 'Professional and business services', is_cross_border_only: false, code_count: 13 },
  { category_code: 'TRV', category_name: 'Travel & Transport', description: 'Transportation and travel expenses', is_cross_border_only: true, code_count: 4 },
  { category_code: 'EDU', category_name: 'Education', description: 'Education fees and expenses', is_cross_border_only: true, code_count: 2 },
  { category_code: 'CHR', category_name: 'Charity', description: 'Charitable contributions', is_cross_border_only: false, code_count: 2 },
  { category_code: 'DIV', category_name: 'Dividends', description: 'Dividend payments', is_cross_border_only: false, code_count: 4 },
  { category_code: 'INT', category_name: 'Interest', description: 'Interest and loan income', is_cross_border_only: false, code_count: 14 },
  { category_code: 'LNR', category_name: 'Loans', description: 'Loan disbursements and repayments', is_cross_border_only: true, code_count: 6 },
  { category_code: 'INV', category_name: 'Investment', description: 'Equity and securities investments', is_cross_border_only: false, code_count: 15 },
  { category_code: 'CRD', category_name: 'Cards & Digital', description: 'Card and digital payments', is_cross_border_only: false, code_count: 9 },
  { category_code: 'RNT', category_name: 'Rent & Real Estate', description: 'Rent and property transactions', is_cross_border_only: false, code_count: 6 },
  { category_code: 'TAX', category_name: 'Tax & Government', description: 'Tax and government payments', is_cross_border_only: false, code_count: 3 },
  { category_code: 'INS', category_name: 'Insurance', description: 'Insurance premiums and claims', is_cross_border_only: false, code_count: 1 },
  { category_code: 'OTH', category_name: 'Other', description: 'Miscellaneous transactions', is_cross_border_only: false, code_count: 20 },
];

// All 117 UAE Purpose Codes
export const UAE_PURPOSE_CODES: UAEPurposeCode[] = [
  // ============================================================================
  // SALARY & EMPLOYMENT (7 codes)
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
    code: 'PEN', name: 'Pension',
    description: 'Pension payments and retirement benefits',
    category_code: 'SAL', category_name: 'Salary & Employment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'PENS', imf_bop_code: '310',
    uaefts_reference: 'AUX700-PEN', effective_from: '2018-01-01', is_active: true
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

  // ============================================================================
  // FAMILY & REMITTANCES (4 codes)
  // ============================================================================
  {
    code: 'FAM', name: 'Family Support (Workers Remittances)',
    description: 'Support payments to family members abroad, workers remittances',
    category_code: 'FAM', category_name: 'Family & Remittances',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FAMI', imf_bop_code: '391',
    uaefts_reference: 'AUX700-FAM', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TOF', name: 'Transfer of Funds Between Persons',
    description: 'Personal fund transfers between individuals',
    category_code: 'FAM', category_name: 'Family & Remittances',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRPT', imf_bop_code: '391',
    uaefts_reference: 'AUX700-TOF', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OAT', name: 'Own Account Transfer',
    description: 'Transfer between own accounts (domestic only)',
    category_code: 'FAM', category_name: 'Family & Remittances',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'ACCT', imf_bop_code: null,
    uaefts_reference: 'AUX700-OAT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'AE015', name: 'Family Support',
    description: 'General family support payments',
    category_code: 'FAM', category_name: 'Family & Remittances',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FAMI', imf_bop_code: '391',
    uaefts_reference: 'AUX700-AE015', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TRADE - EXPORT (5 codes)
  // ============================================================================
  {
    code: 'GDE', name: 'Goods Sold (Export)',
    description: 'Payment for export of goods',
    category_code: 'GDE', category_name: 'Trade - Export',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-GDE', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GMS', name: 'Processing Repair and Maintenance on Goods',
    description: 'Payments for processing, repair and maintenance services on goods',
    category_code: 'GDE', category_name: 'Trade - Export',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-GMS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'GOS', name: 'Government Goods and Services',
    description: 'Government-related goods and services transactions',
    category_code: 'GDE', category_name: 'Trade - Export',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'GOVT', imf_bop_code: '200',
    uaefts_reference: 'AUX700-GOS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PIP', name: 'Profits on Islamic Products',
    description: 'Profit sharing on Islamic financial products',
    category_code: 'GDE', category_name: 'Trade - Export',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-PIP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCR', name: 'Trade Credits and Advances Receivable',
    description: 'Trade credits and advances to be received',
    category_code: 'GDE', category_name: 'Trade - Export',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-TCR', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TRADE - IMPORT (2 codes)
  // ============================================================================
  {
    code: 'GDI', name: 'Goods Bought (Import)',
    description: 'Payment for import of goods',
    category_code: 'GDI', category_name: 'Trade - Import',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-GDI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCP', name: 'Trade Credits and Advances Payable',
    description: 'Trade credits and advances to be paid',
    category_code: 'GDI', category_name: 'Trade - Import',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'GDDS', imf_bop_code: '110',
    uaefts_reference: 'AUX700-TCP', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // SERVICES (13 codes)
  // ============================================================================
  {
    code: 'AE001', name: 'Consulting Services',
    description: 'Professional consulting services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-AE001', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'AE002', name: 'Legal Services',
    description: 'Legal and advisory services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-AE002', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IFS', name: 'Information Services',
    description: 'Information and data services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-IFS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ITS', name: 'Computer Services',
    description: 'IT and computer-related services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-ITS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PMS', name: 'Professional and Management Consulting',
    description: 'Professional and management consulting services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-PMS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RDS', name: 'Research and Development Services',
    description: 'R&D and scientific services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-RDS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TCS', name: 'Telecommunication Services',
    description: 'Telecommunication and communication services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '245',
    uaefts_reference: 'AUX700-TCS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TTS', name: 'Technical Trade-Related Business Services',
    description: 'Technical and trade-related business services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '260',
    uaefts_reference: 'AUX700-TTS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FIS', name: 'Financial Services',
    description: 'Financial intermediation services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FEES', imf_bop_code: '260',
    uaefts_reference: 'AUX700-FIS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'COM', name: 'Commission',
    description: 'Commission payments for services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'COMM', imf_bop_code: '260',
    uaefts_reference: 'AUX700-COM', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ACM', name: 'Agency Commissions',
    description: 'Agency and brokerage commissions',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'COMM', imf_bop_code: '260',
    uaefts_reference: 'AUX700-ACM', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'INS', name: 'Insurance Services',
    description: 'Insurance premiums and services',
    category_code: 'INS', category_name: 'Insurance',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INSU', imf_bop_code: '253',
    uaefts_reference: 'AUX700-INS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CIN', name: 'Commercial Investments',
    description: 'Commercial investment-related services',
    category_code: 'SRV', category_name: 'Services',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INVS', imf_bop_code: '330',
    uaefts_reference: 'AUX700-CIN', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TRAVEL & TRANSPORT (4 codes)
  // ============================================================================
  {
    code: 'ATS', name: 'Air Transport',
    description: 'Air transportation services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'AIRB', imf_bop_code: '210',
    uaefts_reference: 'AUX700-ATS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'STS', name: 'Sea Transport',
    description: 'Sea transportation services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SEAB', imf_bop_code: '205',
    uaefts_reference: 'AUX700-STS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'STR', name: 'Travel',
    description: 'General travel expenses',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRVL', imf_bop_code: '236',
    uaefts_reference: 'AUX700-STR', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OTS', name: 'Other Modes of Transport',
    description: 'Other transportation services',
    category_code: 'TRV', category_name: 'Travel & Transport',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRPT', imf_bop_code: '215',
    uaefts_reference: 'AUX700-OTS', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // EDUCATION (2 codes)
  // ============================================================================
  {
    code: 'EDU', name: 'Educational Support',
    description: 'Education fees and related expenses',
    category_code: 'EDU', category_name: 'Education',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'EDUC', imf_bop_code: '236',
    uaefts_reference: 'AUX700-EDU', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TKT', name: 'Tickets',
    description: 'Travel tickets and bookings',
    category_code: 'EDU', category_name: 'Education',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TRVL', imf_bop_code: '236',
    uaefts_reference: 'AUX700-TKT', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // CHARITY (2 codes)
  // ============================================================================
  {
    code: 'CHC', name: 'Charitable Contributions',
    description: 'Donations and charitable contributions',
    category_code: 'CHR', category_name: 'Charity',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'CHAR', imf_bop_code: '391',
    uaefts_reference: 'AUX700-CHC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ALW', name: 'Allowance',
    description: 'Allowance payments',
    category_code: 'CHR', category_name: 'Charity',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-ALW', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // DIVIDENDS (4 codes)
  // ============================================================================
  {
    code: 'DIV', name: 'Dividend Payouts from FI',
    description: 'Dividend payments from financial institutions',
    category_code: 'DIV', category_name: 'Dividends',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-DIV', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DOE', name: 'Dividends on Equity Not Intragroup',
    description: 'Dividend payments on equity (not intragroup)',
    category_code: 'DIV', category_name: 'Dividends',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-DOE', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IGD', name: 'Dividends Intragroup',
    description: 'Intragroup dividend payments',
    category_code: 'DIV', category_name: 'Dividends',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-IGD', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'AE025', name: 'Investment Income - Dividends',
    description: 'Investment income from dividends',
    category_code: 'DIV', category_name: 'Dividends',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-AE025', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // INTEREST (14 codes)
  // ============================================================================
  {
    code: 'IOL', name: 'Income on Loans',
    description: 'Interest income from loans',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IOL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IOD', name: 'Income on Deposits',
    description: 'Interest income from deposits',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IOD', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IPC', name: 'Charges for Use of Intellectual Property',
    description: 'Royalties and license fees for intellectual property',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LICF', imf_bop_code: '266',
    uaefts_reference: 'AUX700-IPC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IGT', name: 'Inter Group Transfer',
    description: 'Intragroup transfers',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTC', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IGT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IID', name: 'Interest on Debt Intragroup',
    description: 'Interest on intragroup debt',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IID', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IRP', name: 'Interest Rate Swap Payments',
    description: 'Interest rate swap transactions',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IRP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IRW', name: 'Interest Rate Unwind Payments',
    description: 'Interest rate swap unwind transactions',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: '320',
    uaefts_reference: 'AUX700-IRW', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ISL', name: 'Interest on Securities > 1 Year',
    description: 'Interest on long-term securities',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-ISL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ISS', name: 'Interest on Securities < 1 Year',
    description: 'Interest on short-term securities',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-ISS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LIP', name: 'Loan Interest Payments',
    description: 'Interest payments on loans',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INTE', imf_bop_code: '320',
    uaefts_reference: 'AUX700-LIP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LNC', name: 'Loan Charges',
    description: 'Loan processing and service charges',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'FEES', imf_bop_code: '260',
    uaefts_reference: 'AUX700-LNC', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LND', name: 'Loan Disbursements from FI',
    description: 'Loan disbursements from financial institutions',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAN', imf_bop_code: '410',
    uaefts_reference: 'AUX700-LND', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DLF', name: 'Debt Instruments Intragroup - Foreign Deposits',
    description: 'Intragroup debt instruments - foreign deposits',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: '410',
    uaefts_reference: 'AUX700-DLF', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LDL', name: 'Debt Instruments Intragroup - UAE Deposits',
    description: 'Intragroup debt instruments - UAE deposits',
    category_code: 'INT', category_name: 'Interest',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-LDL', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // LOANS (6 codes)
  // ============================================================================
  {
    code: 'LLA', name: 'Long-term Loans to Non-Residents',
    description: 'Long-term loan disbursements to non-residents',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '410',
    uaefts_reference: 'AUX700-LLA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LLL', name: 'Long-term Foreign Loans to Residents',
    description: 'Long-term foreign loan disbursements to residents',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'LOAN', imf_bop_code: '410',
    uaefts_reference: 'AUX700-LLL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SLA', name: 'Short-term Loans to Non-Residents',
    description: 'Short-term loan disbursements to non-residents',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAN', imf_bop_code: '410',
    uaefts_reference: 'AUX700-SLA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SLL', name: 'Short-term Foreign Loans to Residents',
    description: 'Short-term foreign loan disbursements to residents',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAN', imf_bop_code: '410',
    uaefts_reference: 'AUX700-SLL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PRP', name: 'Profit Rate Swap Payments',
    description: 'Islamic profit rate swap transactions',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: '410',
    uaefts_reference: 'AUX700-PRP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PRW', name: 'Profit Rate Unwind Payments',
    description: 'Islamic profit rate swap unwind transactions',
    category_code: 'LNR', category_name: 'Loans',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: '410',
    uaefts_reference: 'AUX700-PRW', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // INVESTMENT - EQUITY & SECURITIES (15 codes)
  // ============================================================================
  {
    code: 'CEA', name: 'Equity in Company Abroad - Residents',
    description: 'Resident investment in foreign company equity',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '510',
    uaefts_reference: 'AUX700-CEA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CEL', name: 'Equity in Company Abroad - Non-Residents',
    description: 'Non-resident investment in foreign company equity',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '510',
    uaefts_reference: 'AUX700-CEL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FSA', name: 'Equity Shares in Foreign Companies',
    description: 'Purchase of shares in foreign companies',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: '610',
    uaefts_reference: 'AUX700-FSA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FSL', name: 'Equity Shares in UAE Companies',
    description: 'Purchase of shares in UAE companies',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-FSL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FIA', name: 'Investment Fund Shares - Foreign',
    description: 'Investment in foreign fund shares',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: '610',
    uaefts_reference: 'AUX700-FIA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FIL', name: 'Investment Fund Shares - UAE',
    description: 'Investment in UAE fund shares',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-FIL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DLA', name: 'Foreign Debt Securities > 1 Year',
    description: 'Purchase of long-term foreign debt securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'SECU', imf_bop_code: '620',
    uaefts_reference: 'AUX700-DLA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DSA', name: 'Foreign Debt Securities < 1 Year',
    description: 'Purchase of short-term foreign debt securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: '620',
    uaefts_reference: 'AUX700-DSA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DLL', name: 'Resident Debt Securities > 1 Year',
    description: 'Purchase of long-term UAE debt securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-DLL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DSL', name: 'Resident Debt Securities < 1 Year',
    description: 'Purchase of short-term UAE debt securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-DSL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DSF', name: 'Debt Instruments Intragroup - Foreign Securities',
    description: 'Intragroup debt instruments - foreign securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: '620',
    uaefts_reference: 'AUX700-DSF', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LDS', name: 'Debt Instruments Intragroup - UAE Securities',
    description: 'Intragroup debt instruments - UAE securities',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-LDS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FDA', name: 'Financial Derivatives - Foreign',
    description: 'Foreign financial derivatives transactions',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: '710',
    uaefts_reference: 'AUX700-FDA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'FDL', name: 'Financial Derivatives - UAE',
    description: 'UAE financial derivatives transactions',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'HEDG', imf_bop_code: null,
    uaefts_reference: 'AUX700-FDL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'ISH', name: 'Income on Investment Fund Shares',
    description: 'Income from investment fund shares',
    category_code: 'INV', category_name: 'Investment',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DIVI', imf_bop_code: '330',
    uaefts_reference: 'AUX700-ISH', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // CARDS & DIGITAL PAYMENTS (9 codes)
  // ============================================================================
  {
    code: 'CCP', name: 'Corporate Card Payments',
    description: 'Corporate credit card payments',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'CCRD', imf_bop_code: null,
    uaefts_reference: 'AUX700-CCP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CRP', name: 'Credit Card Payment',
    description: 'Personal credit card payments',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'CCRD', imf_bop_code: null,
    uaefts_reference: 'AUX700-CRP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'DCP', name: 'Debit Card Payments',
    description: 'Debit card payments',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'DCRD', imf_bop_code: null,
    uaefts_reference: 'AUX700-DCP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MWI', name: 'Mobile Wallet Cash-in',
    description: 'Mobile wallet top-up (domestic only)',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-MWI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MWO', name: 'Mobile Wallet Cash-out',
    description: 'Mobile wallet withdrawal (domestic only)',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-MWO', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MWP', name: 'Mobile Wallet Payments',
    description: 'Mobile wallet payments',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-MWP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SVI', name: 'Stored Value Card Cash-in',
    description: 'Prepaid card top-up (domestic only)',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-SVI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SVO', name: 'Stored Value Card Cash-out',
    description: 'Prepaid card withdrawal (domestic only)',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-SVO', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SVP', name: 'Stored Value Card Payments',
    description: 'Prepaid card payments',
    category_code: 'CRD', category_name: 'Cards & Digital',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-SVP', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // RENT & REAL ESTATE (6 codes)
  // ============================================================================
  {
    code: 'LEA', name: 'Leasing Abroad',
    description: 'Leasing payments for assets abroad',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '260',
    uaefts_reference: 'AUX700-LEA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'LEL', name: 'Leasing in UAE',
    description: 'Leasing payments for assets in UAE (domestic only)',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-LEL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RNT', name: 'Rent Payments',
    description: 'Rent and lease payments for property',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'RENT', imf_bop_code: '260',
    uaefts_reference: 'AUX700-RNT', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PRR', name: 'Profits or Rents on Real Estate',
    description: 'Profits and rental income from real estate',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'RENT', imf_bop_code: '330',
    uaefts_reference: 'AUX700-PRR', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PPA', name: 'Purchase Real Estate Abroad from Residents',
    description: 'Purchase of foreign real estate by residents',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: true,
    iso_20022_code: 'INVS', imf_bop_code: '510',
    uaefts_reference: 'AUX700-PPA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PPL', name: 'Purchase Real Estate in UAE from Non-Residents',
    description: 'Purchase of UAE real estate by non-residents',
    category_code: 'RNT', category_name: 'Rent & Real Estate',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INVS', imf_bop_code: null,
    uaefts_reference: 'AUX700-PPL', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // TAX & GOVERNMENT (3 codes)
  // ============================================================================
  {
    code: 'GRI', name: 'Government Related - Taxes, Tariffs, Capital Transfers',
    description: 'Government taxes, tariffs, and related transfers',
    category_code: 'TAX', category_name: 'Tax & Government',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TAXS', imf_bop_code: '200',
    uaefts_reference: 'AUX700-GRI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'TAX', name: 'Tax Payment (Domestic Only)',
    description: 'Domestic tax payments',
    category_code: 'TAX', category_name: 'Tax & Government',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TAXS', imf_bop_code: null,
    uaefts_reference: 'AUX700-TAX', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'XAT', name: 'Tax Refund',
    description: 'Tax refund payments',
    category_code: 'TAX', category_name: 'Tax & Government',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'TAXS', imf_bop_code: '200',
    uaefts_reference: 'AUX700-XAT', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // OTHER - REVERSALS & CORRECTIONS (7 codes)
  // ============================================================================
  {
    code: 'RDA', name: 'Reverse Debt Instruments Abroad',
    description: 'Reversal of foreign debt instrument transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '620',
    uaefts_reference: 'AUX700-RDA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RDL', name: 'Reverse Debt Instruments in UAE',
    description: 'Reversal of UAE debt instrument transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-RDL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'REA', name: 'Reverse Equity Share Abroad',
    description: 'Reversal of foreign equity share transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '610',
    uaefts_reference: 'AUX700-REA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'REL', name: 'Reverse Equity Share in UAE',
    description: 'Reversal of UAE equity share transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-REL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RFS', name: 'Repos on Foreign Securities',
    description: 'Repurchase agreements on foreign securities',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: '410',
    uaefts_reference: 'AUX700-RFS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'RLS', name: 'Repos on Securities Issued by Residents',
    description: 'Repurchase agreements on UAE securities',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: true, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: null,
    uaefts_reference: 'AUX700-RLS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'POR', name: 'Refunds/Reversals on IPO Subscriptions',
    description: 'Refunds and reversals for IPO subscriptions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '610',
    uaefts_reference: 'AUX700-POR', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // OTHER - PERSONAL ACCOUNTS (2 codes)
  // ============================================================================
  {
    code: 'AFA', name: 'Personal Resident Bank Account Abroad',
    description: 'Personal resident bank account held abroad',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'ACCT', imf_bop_code: '410',
    uaefts_reference: 'AUX700-AFA', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'AFL', name: 'Personal Non-Resident Bank Account in UAE',
    description: 'Personal non-resident bank account in UAE',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'ACCT', imf_bop_code: null,
    uaefts_reference: 'AUX700-AFL', effective_from: '2018-01-01', is_active: true
  },

  // ============================================================================
  // OTHER - MISCELLANEOUS (11 codes)
  // ============================================================================
  {
    code: 'AES', name: 'Advance Payment Against EOS',
    description: 'Advance payment against end of service benefits',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-AES', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'CBP', name: 'Cross Border Payments',
    description: 'General cross-border payment transfers',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: false, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '391',
    uaefts_reference: 'AUX700-CBP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'EMI', name: 'Equated Monthly Installments',
    description: 'EMI loan repayments',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'LOAR', imf_bop_code: '410',
    uaefts_reference: 'AUX700-EMI', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'EOS', name: 'End of Service / Final Settlement',
    description: 'End of service gratuity and final settlement',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SALA', imf_bop_code: '310',
    uaefts_reference: 'AUX700-EOS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'IPO', name: 'IPO Subscriptions',
    description: 'Initial public offering subscriptions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'SECU', imf_bop_code: '610',
    uaefts_reference: 'AUX700-IPO', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'MCR', name: 'Monetary Claim Reimbursements',
    description: 'Monetary claim reimbursements and settlements',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '391',
    uaefts_reference: 'AUX700-MCR', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'PIN', name: 'Personal Investments',
    description: 'Personal investment transactions',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'INVS', imf_bop_code: '510',
    uaefts_reference: 'AUX700-PIN', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'POS', name: 'POS Merchant Settlement',
    description: 'Point of sale merchant settlements (domestic only)',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-POS', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'SCO', name: 'Construction',
    description: 'Construction services and contracts',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: 1000000,
    requires_supporting_docs: false,
    iso_20022_code: 'SCVE', imf_bop_code: '249',
    uaefts_reference: 'AUX700-SCO', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'UFP', name: 'Unclaimed Funds Placement',
    description: 'Placement of unclaimed funds (domestic only)',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: false,
    applies_to_inbound: true, applies_to_outbound: false,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-UFP', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'UTL', name: 'Utility Bill Payments',
    description: 'Utility bill payments (electricity, water, etc.)',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: false, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: null,
    uaefts_reference: 'AUX700-UTL', effective_from: '2018-01-01', is_active: true
  },
  {
    code: 'OTH', name: 'Other Payments',
    description: 'Other miscellaneous payments not classified elsewhere',
    category_code: 'OTH', category_name: 'Other',
    applies_to_domestic: true, applies_to_offshore: true,
    applies_to_inbound: true, applies_to_outbound: true,
    requires_lei: false, lei_threshold_aed: null,
    requires_supporting_docs: false,
    iso_20022_code: 'OTHR', imf_bop_code: '391',
    uaefts_reference: 'AUX700-OTH', effective_from: '2018-01-01', is_active: true
  },
];

// Helper function to get code by code string
export const getCodeByCode = (code: string): UAEPurposeCode | undefined => {
  return UAE_PURPOSE_CODES.find(c => c.code === code);
};

// Helper function to get codes by category
export const getCodesByCategory = (categoryCode: string): UAEPurposeCode[] => {
  return UAE_PURPOSE_CODES.filter(c => c.category_code === categoryCode);
};

// Statistics
export const UAE_CODE_STATS = {
  totalCodes: UAE_PURPOSE_CODES.length,
  domesticCodes: UAE_PURPOSE_CODES.filter(c => c.applies_to_domestic).length,
  offshoreCodes: UAE_PURPOSE_CODES.filter(c => c.applies_to_offshore).length,
  codesRequiringLEI: UAE_PURPOSE_CODES.filter(c => c.requires_lei).length,
  categories: UAE_CATEGORIES.length,
};
