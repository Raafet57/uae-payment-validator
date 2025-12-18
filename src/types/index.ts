// UAE Validation Types

export interface UAEValidationRequest {
  transaction_type: 'domestic' | 'offshore';
  transaction_direction: 'inbound' | 'outbound';
  amount: number;
  currency: string;
  purpose_code?: string;
  debtor_iban?: string;
  creditor_iban?: string;
  debtor_lei?: string;
  creditor_lei?: string;
  remittance_info?: string;
  offshore_zone?: string;
  additional_fields?: Record<string, unknown>;
}

export interface ValidationResult {
  rule_code: string;
  rule_name: string;
  rule_category: string | null;
  field_code: string;
  field_value: string | null;
  validation_status: 'pass' | 'fail' | 'warning' | 'skipped';
  is_valid: boolean;
  error_code: string | null;
  error_message: string | null;
  uaefts_reference: string | null;
  remediation_suggestion: string | null;
  severity: 'error' | 'warning' | 'info' | null;
  stp_impact: number;
  penalty_amount_aed: number;
}

export interface Recommendation {
  recommendation_type: string;
  field_code: string;
  priority: 'high' | 'medium' | 'low';
  current_value: string | null;
  suggested_value?: string | null;
  reason: string;
  stp_improvement: number;
  penalty_avoided_aed: number;
}

export interface ValidationSummary {
  total_rules: number;
  passed: number;
  failed: number;
  warnings: number;
  errors: number;
  uaefts_compliant: boolean;
  amount_aed: number;
  is_high_value: boolean;
  lei_required: boolean;
  lei_provided: boolean;
}

export interface IBANDetails {
  iban: string | null;
  is_valid: boolean;
  bank_code: string | null;
  bank_name: string | null;
  account_number: string | null;
  check_digits: string | null;
  error_message: string | null;
}

export interface UAEValidationResponse {
  session_uuid: string;
  transaction_type: string;
  transaction_direction: string;
  purpose_code: string | null;
  purpose_code_valid: boolean;
  purpose_code_description: string | null;
  debtor_iban_valid: boolean;
  creditor_iban_valid: boolean;
  iban_details: {
    debtor: IBANDetails | null;
    creditor: IBANDetails | null;
  } | null;
  lei_required: boolean;
  lei_provided: boolean;
  stp_score: number;
  stp_rating: 'high' | 'medium' | 'low';
  violation_count: number;
  total_penalty_risk_aed: number;
  validation_status: string;
  results: ValidationResult[];
  recommendations: Recommendation[];
  summary: ValidationSummary;
  processing_time_ms: number | null;
  created_at: string;
}

// UAE Purpose Code Types

export interface UAEPurposeCodeCategory {
  category_code: string;
  category_name: string;
  description: string | null;
  is_cross_border_only: boolean;
  code_count: number;
}

export interface UAEPurposeCode {
  code: string;
  name: string;
  description: string | null;
  category_code: string;
  category_name: string;
  applies_to_domestic: boolean;
  applies_to_offshore: boolean;
  applies_to_inbound: boolean;
  applies_to_outbound: boolean;
  requires_lei: boolean;
  lei_threshold_aed: number | null;
  requires_supporting_docs: boolean;
  iso_20022_code: string | null;
  imf_bop_code: string | null;
  uaefts_reference: string | null;
  effective_from: string | null;
  is_active: boolean;
}

export interface UAEPurposeCodeListResponse {
  total: number;
  offset: number;
  limit: number;
  codes: UAEPurposeCode[];
  categories: UAEPurposeCodeCategory[];
}

export interface CodeFilterParams {
  category?: string;
  transaction_type?: 'domestic' | 'offshore';
  search?: string;
  requires_lei?: boolean;
  limit?: number;
  offset?: number;
}

// IBAN Types

export interface IBANValidationRequest {
  iban: string;
}

export interface IBANValidationResponse {
  iban: string;
  is_valid: boolean;
  formatted_iban: string | null;
  bank_code: string | null;
  bank_name: string | null;
  account_number: string | null;
  check_digits: string | null;
  error_message: string | null;
}

// Health Check Types

export interface HealthResponse {
  status: string;
  module: string;
  version: string;
  timestamp: string;
  config: {
    total_purpose_codes: number;
    total_categories: number;
    uaefts_version: string;
    regulatory_body: string;
  };
  features: string[];
}
