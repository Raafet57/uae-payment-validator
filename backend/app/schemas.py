"""
UAE Payment Validator Schemas
Pydantic models for request/response validation.
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional, List, Dict, Any
from datetime import datetime
import re


# =============================================================================
# REQUEST SCHEMAS
# =============================================================================

class UAEValidationRequest(BaseModel):
    """Request schema for UAE transaction validation."""

    transaction_type: str = Field(
        ...,
        description="Type of transaction: 'domestic' or 'offshore'",
        pattern="^(domestic|offshore)$"
    )
    transaction_direction: str = Field(
        ...,
        description="Direction: 'inbound' or 'outbound'",
        pattern="^(inbound|outbound)$"
    )
    amount: float = Field(..., gt=0, description="Transaction amount")
    currency: str = Field(default="AED", max_length=3)
    purpose_code: Optional[str] = Field(
        None,
        description="UAE purpose code (e.g., SAL, FAM)"
    )
    debtor_iban: Optional[str] = Field(None, description="Debtor's UAE IBAN")
    creditor_iban: Optional[str] = Field(None, description="Creditor's UAE IBAN")
    debtor_lei: Optional[str] = Field(None, description="Debtor's LEI (20 chars)")
    creditor_lei: Optional[str] = Field(None, description="Creditor's LEI (20 chars)")
    remittance_info: Optional[str] = Field(None, max_length=140)

    @field_validator("purpose_code")
    @classmethod
    def validate_purpose_code_format(cls, v):
        if v is not None:
            if not re.match(r"^[A-Z0-9]{2,5}$", v.upper()):
                raise ValueError("purpose_code must be 2-5 alphanumeric characters")
            return v.upper()
        return v


class UAEIBANValidationRequest(BaseModel):
    """Request schema for standalone IBAN validation."""

    iban: str = Field(..., description="UAE IBAN to validate")


# =============================================================================
# RESPONSE SCHEMAS
# =============================================================================

class UAEValidationResultDetail(BaseModel):
    """Individual validation rule result."""

    rule_code: str
    rule_name: str
    rule_category: str
    field_code: str
    field_value: Optional[str] = None
    validation_status: str
    is_valid: bool
    error_code: Optional[str] = None
    error_message: Optional[str] = None
    uaefts_reference: Optional[str] = None
    remediation_suggestion: Optional[str] = None
    severity: str = "info"
    stp_impact: float = 0
    penalty_amount_aed: float = 0


class UAERecommendation(BaseModel):
    """Recommendation for improving STP score."""

    recommendation_type: str
    field_code: str
    priority: str
    current_value: Optional[str] = None
    suggested_value: Optional[str] = None
    reason: str
    stp_improvement: int = 0
    penalty_avoided_aed: float = 0


class UAEValidationSummary(BaseModel):
    """Summary of validation results."""

    total_rules: int
    passed: int
    failed: int
    warnings: int
    errors: int
    uaefts_compliant: bool
    amount_aed: float
    is_high_value: bool
    lei_required: bool
    lei_provided: bool


class UAEIBANDetails(BaseModel):
    """IBAN validation details."""

    iban: Optional[str] = None
    is_valid: bool = False
    bank_code: Optional[str] = None
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    check_digits: Optional[str] = None
    error_message: Optional[str] = None


class UAEValidationResponse(BaseModel):
    """Response schema for UAE transaction validation."""

    session_uuid: str
    transaction_type: str
    transaction_direction: str
    purpose_code: Optional[str] = None
    purpose_code_valid: bool = True
    purpose_code_description: Optional[str] = None
    debtor_iban_valid: bool = True
    creditor_iban_valid: bool = True
    iban_details: Dict[str, Optional[UAEIBANDetails]] = {}
    lei_required: bool = False
    lei_provided: bool = False
    stp_score: float
    stp_rating: str
    violation_count: int
    total_penalty_risk_aed: float
    validation_status: str
    results: List[UAEValidationResultDetail]
    recommendations: List[UAERecommendation]
    summary: UAEValidationSummary
    processing_time_ms: int
    created_at: datetime


class UAEIBANValidationResponse(BaseModel):
    """Response schema for standalone IBAN validation."""

    iban: str
    is_valid: bool
    formatted_iban: Optional[str] = None
    bank_code: Optional[str] = None
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    check_digits: Optional[str] = None
    error_message: Optional[str] = None


# =============================================================================
# CODE SCHEMAS
# =============================================================================

class UAEPurposeCodeResponse(BaseModel):
    """Purpose code details."""

    code: str
    name: str
    description: Optional[str] = None
    category_code: str
    category_name: str
    applies_to_domestic: bool
    applies_to_offshore: bool
    applies_to_inbound: bool = True
    applies_to_outbound: bool = True
    requires_lei: bool = False
    lei_threshold_aed: Optional[int] = None
    is_active: bool = True


class UAEPurposeCodeCategoryResponse(BaseModel):
    """Purpose code category."""

    category_code: str
    category_name: str
    description: Optional[str] = None
    is_cross_border_only: bool = False
    code_count: int = 0


class UAEPurposeCodeListResponse(BaseModel):
    """Paginated list of purpose codes."""

    total: int
    offset: int
    limit: int
    codes: List[UAEPurposeCodeResponse]
    categories: List[UAEPurposeCodeCategoryResponse]


class UAEPurposeCodeBulkResponse(BaseModel):
    """Bulk response with all codes grouped by category."""

    total_codes: int
    total_categories: int
    categories: List[UAEPurposeCodeCategoryResponse]
    codes_by_category: Dict[str, List[Dict[str, Any]]]


# =============================================================================
# HEALTH SCHEMAS
# =============================================================================

class HealthResponse(BaseModel):
    """Health check response."""

    status: str
    module: str = "uae"
    version: str = "1.0.0"
    timestamp: datetime
    config: Dict[str, Any]
    features: List[str]
