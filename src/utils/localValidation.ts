/**
 * Local Transaction Validation
 * Validates UAE payment transactions without backend API
 */

import { UAEValidationRequest, UAEValidationResponse, ValidationResult, Recommendation } from '../types';
import { UAE_PURPOSE_CODES } from '../data/uaePurposeCodes';

// UAE Bank Codes for IBAN validation
const UAE_BANK_CODES: Record<string, string> = {
  '033': 'Emirates NBD',
  '046': 'Abu Dhabi Commercial Bank',
  '044': 'First Abu Dhabi Bank',
  '035': 'Mashreq Bank',
  '019': 'Dubai Islamic Bank',
  '024': 'National Bank of Fujairah',
  '020': 'Emirates Islamic Bank',
  '028': 'Commercial Bank of Dubai',
  '017': 'RAKBANK',
  '016': 'Sharjah Islamic Bank',
  '034': 'Arab Bank',
  '041': 'HSBC Middle East',
  '042': 'Standard Chartered',
  '011': 'National Bank of Abu Dhabi',
  '013': 'Habib Bank AG Zurich',
  '015': 'Bank of Baroda',
  '026': 'United Arab Bank',
  '038': 'Abu Dhabi Islamic Bank',
};

// Validate UAE IBAN
export function validateUAEIBAN(iban: string): {
  isValid: boolean;
  bankCode?: string;
  bankName?: string;
  accountNumber?: string;
  error?: string;
} {
  if (!iban) {
    return { isValid: false, error: 'IBAN is required' };
  }

  const cleanIban = iban.replace(/\s/g, '').toUpperCase();

  // Check UAE format: AE + 2 check digits + 3 bank code + 16 account
  if (!/^AE\d{21}$/.test(cleanIban)) {
    if (!cleanIban.startsWith('AE')) {
      return { isValid: false, error: 'IBAN must start with AE for UAE' };
    }
    if (cleanIban.length !== 23) {
      return { isValid: false, error: `IBAN must be 23 characters (got ${cleanIban.length})` };
    }
    return { isValid: false, error: 'Invalid IBAN format' };
  }

  const bankCode = cleanIban.substring(4, 7);
  const bankName = UAE_BANK_CODES[bankCode] || 'Unknown Bank';
  const accountNumber = cleanIban.substring(7);

  // Validate checksum (MOD 97-10)
  const rearranged = cleanIban.substring(4) + cleanIban.substring(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (char) =>
    (char.charCodeAt(0) - 55).toString()
  );

  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i])) % 97;
  }

  if (remainder !== 1) {
    return { isValid: false, bankCode, bankName, error: 'Invalid IBAN checksum' };
  }

  return { isValid: true, bankCode, bankName, accountNumber };
}

// Validate LEI format (20 alphanumeric characters)
export function validateLEI(lei: string): { isValid: boolean; error?: string } {
  if (!lei) return { isValid: true }; // LEI is optional unless required

  const cleanLei = lei.replace(/\s/g, '').toUpperCase();

  if (cleanLei.length !== 20) {
    return { isValid: false, error: 'LEI must be exactly 20 characters' };
  }

  if (!/^[A-Z0-9]{20}$/.test(cleanLei)) {
    return { isValid: false, error: 'LEI must contain only alphanumeric characters' };
  }

  return { isValid: true };
}

// Calculate STP Score
function calculateSTPScore(results: ValidationResult[]): number {
  const totalImpact = results.reduce((sum, r) => sum + r.stp_impact, 0);
  return Math.max(0, Math.min(100, 100 - totalImpact));
}

// Main validation function
export function validateTransactionLocally(
  request: UAEValidationRequest
): UAEValidationResponse {
  const results: ValidationResult[] = [];
  const recommendations: Recommendation[] = [];
  let violationCount = 0;
  let totalPenaltyRisk = 0;

  const purposeCode = request.purpose_code
    ? UAE_PURPOSE_CODES.find((c) => c.code === request.purpose_code)
    : null;

  // 1. Purpose Code Validation
  if (request.transaction_type === 'offshore') {
    if (!request.purpose_code) {
      results.push({
        rule_code: 'PPC001',
        rule_name: 'Purpose Code Required',
        rule_category: 'Purpose Code',
        field_code: 'purpose_code',
        field_value: null,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'MISSING_PURPOSE_CODE',
        error_message: 'Purpose code is mandatory for offshore transactions',
        uaefts_reference: 'AUX700-3.1',
        remediation_suggestion: 'Select an appropriate purpose code from the dropdown',
        severity: 'error',
        stp_impact: 30,
        penalty_amount_aed: 1000,
      });
      violationCount++;
      totalPenaltyRisk += 1000;

      recommendations.push({
        recommendation_type: 'MISSING_FIELD',
        field_code: 'purpose_code',
        priority: 'high',
        current_value: null,
        suggested_value: 'FAM (for family remittances) or appropriate code',
        reason: 'Purpose code is required for offshore transactions per CBUAE regulations',
        stp_improvement: 30,
        penalty_avoided_aed: 1000,
      });
    } else if (!purposeCode) {
      results.push({
        rule_code: 'PPC002',
        rule_name: 'Purpose Code Valid',
        rule_category: 'Purpose Code',
        field_code: 'purpose_code',
        field_value: request.purpose_code,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'INVALID_PURPOSE_CODE',
        error_message: `Unknown purpose code: ${request.purpose_code}`,
        uaefts_reference: 'AUX700-3.2',
        remediation_suggestion: 'Select a valid CBUAE purpose code',
        severity: 'error',
        stp_impact: 25,
        penalty_amount_aed: 1000,
      });
      violationCount++;
      totalPenaltyRisk += 1000;
    } else if (!purposeCode.applies_to_offshore) {
      results.push({
        rule_code: 'PPC003',
        rule_name: 'Purpose Code Applicability',
        rule_category: 'Purpose Code',
        field_code: 'purpose_code',
        field_value: request.purpose_code,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'CODE_NOT_FOR_OFFSHORE',
        error_message: `Code ${request.purpose_code} is not valid for offshore transactions`,
        uaefts_reference: 'AUX700-3.3',
        remediation_suggestion: 'Select a code that applies to offshore/cross-border transactions',
        severity: 'error',
        stp_impact: 25,
        penalty_amount_aed: 1000,
      });
      violationCount++;
      totalPenaltyRisk += 1000;
    } else {
      results.push({
        rule_code: 'PPC001',
        rule_name: 'Purpose Code Valid',
        rule_category: 'Purpose Code',
        field_code: 'purpose_code',
        field_value: request.purpose_code,
        validation_status: 'pass',
        is_valid: true,
        error_code: null,
        error_message: null,
        uaefts_reference: 'AUX700-3.1',
        remediation_suggestion: null,
        severity: null,
        stp_impact: 0,
        penalty_amount_aed: 0,
      });
    }
  } else if (purposeCode && !purposeCode.applies_to_domestic) {
    results.push({
      rule_code: 'PPC004',
      rule_name: 'Purpose Code Applicability',
      rule_category: 'Purpose Code',
      field_code: 'purpose_code',
      field_value: request.purpose_code || null,
      validation_status: 'warning',
      is_valid: true,
      error_code: 'CODE_NOT_FOR_DOMESTIC',
      error_message: `Code ${request.purpose_code} is typically used for offshore transactions`,
      uaefts_reference: 'AUX700-3.3',
      remediation_suggestion: 'Consider using a domestic-appropriate code like OAT',
      severity: 'warning',
      stp_impact: 5,
      penalty_amount_aed: 0,
    });
  }

  // 2. Amount Validation
  if (!request.amount || request.amount <= 0) {
    results.push({
      rule_code: 'AMT001',
      rule_name: 'Amount Required',
      rule_category: 'Amount',
      field_code: 'amount',
      field_value: String(request.amount || 0),
      validation_status: 'fail',
      is_valid: false,
      error_code: 'INVALID_AMOUNT',
      error_message: 'Transaction amount must be greater than zero',
      uaefts_reference: 'AUX700-4.1',
      remediation_suggestion: 'Enter a valid transaction amount',
      severity: 'error',
      stp_impact: 20,
      penalty_amount_aed: 0,
    });
    violationCount++;
  } else {
    results.push({
      rule_code: 'AMT001',
      rule_name: 'Amount Valid',
      rule_category: 'Amount',
      field_code: 'amount',
      field_value: String(request.amount),
      validation_status: 'pass',
      is_valid: true,
      error_code: null,
      error_message: null,
      uaefts_reference: 'AUX700-4.1',
      remediation_suggestion: null,
      severity: null,
      stp_impact: 0,
      penalty_amount_aed: 0,
    });
  }

  // 3. LEI Validation
  const isHighValue = request.amount >= 1000000;
  const leiRequired = isHighValue || (purposeCode?.requires_lei ?? false);

  if (leiRequired && !request.debtor_lei) {
    results.push({
      rule_code: 'LEI001',
      rule_name: 'LEI Required',
      rule_category: 'LEI',
      field_code: 'debtor_lei',
      field_value: null,
      validation_status: 'fail',
      is_valid: false,
      error_code: 'MISSING_LEI',
      error_message: isHighValue
        ? 'LEI is required for transactions >= AED 1,000,000'
        : `LEI is required for purpose code ${request.purpose_code}`,
      uaefts_reference: 'AUX700-5.1',
      remediation_suggestion: 'Provide the 20-character Legal Entity Identifier',
      severity: 'error',
      stp_impact: 15,
      penalty_amount_aed: 1000,
    });
    violationCount++;
    totalPenaltyRisk += 1000;

    recommendations.push({
      recommendation_type: 'MISSING_LEI',
      field_code: 'debtor_lei',
      priority: 'high',
      current_value: null,
      reason: 'LEI is mandatory for high-value transactions and certain purpose codes',
      stp_improvement: 15,
      penalty_avoided_aed: 1000,
    });
  } else if (request.debtor_lei) {
    const leiValidation = validateLEI(request.debtor_lei);
    if (!leiValidation.isValid) {
      results.push({
        rule_code: 'LEI002',
        rule_name: 'LEI Format Valid',
        rule_category: 'LEI',
        field_code: 'debtor_lei',
        field_value: request.debtor_lei,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'INVALID_LEI_FORMAT',
        error_message: leiValidation.error || 'Invalid LEI format',
        uaefts_reference: 'AUX700-5.2',
        remediation_suggestion: 'Provide a valid 20-character alphanumeric LEI',
        severity: 'error',
        stp_impact: 10,
        penalty_amount_aed: 500,
      });
      violationCount++;
      totalPenaltyRisk += 500;
    } else {
      results.push({
        rule_code: 'LEI002',
        rule_name: 'LEI Format Valid',
        rule_category: 'LEI',
        field_code: 'debtor_lei',
        field_value: request.debtor_lei,
        validation_status: 'pass',
        is_valid: true,
        error_code: null,
        error_message: null,
        uaefts_reference: 'AUX700-5.2',
        remediation_suggestion: null,
        severity: null,
        stp_impact: 0,
        penalty_amount_aed: 0,
      });
    }
  }

  // 4. IBAN Validation - Debtor
  if (request.debtor_iban) {
    const ibanResult = validateUAEIBAN(request.debtor_iban);
    if (!ibanResult.isValid) {
      results.push({
        rule_code: 'IBAN001',
        rule_name: 'Debtor IBAN Valid',
        rule_category: 'IBAN',
        field_code: 'debtor_iban',
        field_value: request.debtor_iban,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'INVALID_IBAN',
        error_message: ibanResult.error || 'Invalid IBAN format',
        uaefts_reference: 'AUX700-6.1',
        remediation_suggestion: 'Enter a valid UAE IBAN (AE + 21 digits)',
        severity: 'error',
        stp_impact: 20,
        penalty_amount_aed: 500,
      });
      violationCount++;
      totalPenaltyRisk += 500;
    } else {
      results.push({
        rule_code: 'IBAN001',
        rule_name: 'Debtor IBAN Valid',
        rule_category: 'IBAN',
        field_code: 'debtor_iban',
        field_value: request.debtor_iban,
        validation_status: 'pass',
        is_valid: true,
        error_code: null,
        error_message: null,
        uaefts_reference: 'AUX700-6.1',
        remediation_suggestion: null,
        severity: null,
        stp_impact: 0,
        penalty_amount_aed: 0,
      });
    }
  }

  // 5. IBAN Validation - Creditor
  if (request.creditor_iban) {
    const ibanResult = validateUAEIBAN(request.creditor_iban);
    if (!ibanResult.isValid) {
      results.push({
        rule_code: 'IBAN002',
        rule_name: 'Creditor IBAN Valid',
        rule_category: 'IBAN',
        field_code: 'creditor_iban',
        field_value: request.creditor_iban,
        validation_status: 'fail',
        is_valid: false,
        error_code: 'INVALID_IBAN',
        error_message: ibanResult.error || 'Invalid IBAN format',
        uaefts_reference: 'AUX700-6.2',
        remediation_suggestion: 'Enter a valid UAE IBAN (AE + 21 digits)',
        severity: 'error',
        stp_impact: 20,
        penalty_amount_aed: 500,
      });
      violationCount++;
      totalPenaltyRisk += 500;
    } else {
      results.push({
        rule_code: 'IBAN002',
        rule_name: 'Creditor IBAN Valid',
        rule_category: 'IBAN',
        field_code: 'creditor_iban',
        field_value: request.creditor_iban,
        validation_status: 'pass',
        is_valid: true,
        error_code: null,
        error_message: null,
        uaefts_reference: 'AUX700-6.2',
        remediation_suggestion: null,
        severity: null,
        stp_impact: 0,
        penalty_amount_aed: 0,
      });
    }
  }

  // Calculate STP Score
  const stpScore = calculateSTPScore(results);
  const stpRating: 'high' | 'medium' | 'low' =
    stpScore >= 90 ? 'high' : stpScore >= 70 ? 'medium' : 'low';

  // Build response
  const response: UAEValidationResponse = {
    session_uuid: `local-${Date.now()}`,
    transaction_type: request.transaction_type,
    transaction_direction: request.transaction_direction,
    purpose_code: request.purpose_code || null,
    purpose_code_valid: purposeCode !== null && purposeCode !== undefined,
    purpose_code_description: purposeCode?.name || null,
    debtor_iban_valid: request.debtor_iban ? validateUAEIBAN(request.debtor_iban).isValid : true,
    creditor_iban_valid: request.creditor_iban ? validateUAEIBAN(request.creditor_iban).isValid : true,
    iban_details: null,
    lei_required: leiRequired,
    lei_provided: !!request.debtor_lei,
    stp_score: stpScore,
    stp_rating: stpRating,
    violation_count: violationCount,
    total_penalty_risk_aed: totalPenaltyRisk,
    validation_status: violationCount === 0 ? 'VALID' : 'INVALID',
    results,
    recommendations,
    summary: {
      total_rules: results.length,
      passed: results.filter((r) => r.validation_status === 'pass').length,
      failed: results.filter((r) => r.validation_status === 'fail').length,
      warnings: results.filter((r) => r.validation_status === 'warning').length,
      errors: results.filter((r) => r.severity === 'error').length,
      uaefts_compliant: violationCount === 0,
      amount_aed: request.amount,
      is_high_value: isHighValue,
      lei_required: leiRequired,
      lei_provided: !!request.debtor_lei,
    },
    processing_time_ms: 5,
    created_at: new Date().toISOString(),
  };

  return response;
}
