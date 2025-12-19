"""
UAE Payment Validators
IBAN validation and transaction validation engine.
"""

import re
import time
import uuid
from datetime import datetime
from typing import List, Dict, Optional
from dataclasses import dataclass

from app.constants import (
    UAE_BANK_CODES,
    UAE_IBAN_LENGTH,
    UAE_IBAN_COUNTRY_CODE,
    UAE_PURPOSE_CODES,
    UAE_PPC_CATEGORIES,
    PURPOSE_CODE_LOOKUP,
    UAE_LEI_THRESHOLD_AED,
    UAE_HIGH_VALUE_THRESHOLD_AED,
    UAE_PENALTY_PER_VIOLATION_AED,
)
from app.schemas import (
    UAEValidationRequest,
    UAEValidationResponse,
    UAEValidationResultDetail,
    UAEValidationSummary,
    UAERecommendation,
    UAEIBANDetails,
)


# =============================================================================
# IBAN VALIDATOR
# =============================================================================

class UAEIBANValidator:
    """UAE IBAN validation with MOD 97-10 checksum."""

    def validate(self, iban: Optional[str]) -> Dict:
        """
        Validate a UAE IBAN.

        Args:
            iban: The IBAN to validate

        Returns:
            Dict with validation results
        """
        if not iban:
            return {
                "is_valid": False,
                "error_message": "IBAN is required",
            }

        # Normalize
        iban = iban.upper().replace(" ", "").replace("-", "")

        # Check length
        if len(iban) != UAE_IBAN_LENGTH:
            return {
                "is_valid": False,
                "error_message": f"UAE IBAN must be {UAE_IBAN_LENGTH} characters (got {len(iban)})",
            }

        # Check country code
        if not iban.startswith(UAE_IBAN_COUNTRY_CODE):
            return {
                "is_valid": False,
                "error_message": f"UAE IBAN must start with '{UAE_IBAN_COUNTRY_CODE}'",
            }

        # Check format (AE + 21 digits)
        if not re.match(r"^AE\d{21}$", iban):
            return {
                "is_valid": False,
                "error_message": "UAE IBAN must be AE followed by 21 digits",
            }

        # Extract components
        check_digits = iban[2:4]
        bank_code = iban[4:7]
        account_number = iban[7:]

        # Validate checksum (MOD 97-10)
        if not self._validate_checksum(iban):
            return {
                "is_valid": False,
                "bank_code": bank_code,
                "account_number": account_number,
                "check_digits": check_digits,
                "error_message": "Invalid IBAN checksum",
            }

        # Lookup bank name
        bank_info = UAE_BANK_CODES.get(bank_code, {})
        bank_name = bank_info.get("name", "Unknown Bank")

        return {
            "is_valid": True,
            "iban": iban,
            "bank_code": bank_code,
            "bank_name": bank_name,
            "account_number": account_number,
            "check_digits": check_digits,
            "error_message": None,
        }

    def _validate_checksum(self, iban: str) -> bool:
        """Validate IBAN checksum using MOD 97-10 algorithm."""
        # Move first 4 chars to end
        rearranged = iban[4:] + iban[:4]

        # Convert letters to numbers (A=10, B=11, etc.)
        numeric = ""
        for char in rearranged:
            if char.isalpha():
                numeric += str(ord(char) - 55)
            else:
                numeric += char

        # Check if mod 97 == 1
        return int(numeric) % 97 == 1

    def format_iban(self, iban: str) -> str:
        """Format IBAN with spaces for readability."""
        iban = iban.upper().replace(" ", "").replace("-", "")
        return " ".join([iban[i:i + 4] for i in range(0, len(iban), 4)])


# =============================================================================
# VALIDATION RESULT (in-memory, no database)
# =============================================================================

@dataclass
class ValidationResult:
    """In-memory validation result."""

    rule_code: str
    rule_name: str
    rule_category: str
    field_code: str
    field_value: Optional[str]
    validation_status: str
    is_valid: bool
    error_code: Optional[str] = None
    error_message: Optional[str] = None
    uaefts_reference: Optional[str] = None
    remediation_suggestion: Optional[str] = None
    severity: str = "info"
    stp_impact: int = 0
    penalty_amount_aed: float = 0


# =============================================================================
# STATELESS VALIDATION ENGINE
# =============================================================================

class UAEValidationEngine:
    """
    Stateless UAE Payment Validation Engine.
    Uses in-memory constants - no database required.
    """

    def __init__(self):
        self.iban_validator = UAEIBANValidator()

    def validate(self, request: UAEValidationRequest) -> UAEValidationResponse:
        """Validate a UAE payment transaction."""
        start_time = time.time()
        session_uuid = str(uuid.uuid4())

        results: List[ValidationResult] = []

        # 1. Validate Purpose Code
        results.extend(self._validate_purpose_code(request))

        # 2. Validate IBANs
        results.extend(self._validate_ibans(request))

        # 3. Validate LEI requirements
        results.extend(self._validate_lei(request))

        # 4. Amount-based rules
        results.extend(self._validate_amount_rules(request))

        # 5. Calculate STP score
        stp_score, stp_rating = self._calculate_stp_score(results)
        violation_count = sum(
            1 for r in results if not r.is_valid and r.severity == "error"
        )
        penalty_risk = violation_count * UAE_PENALTY_PER_VIOLATION_AED

        # 6. Generate recommendations
        recommendations = self._generate_recommendations(results)

        # 7. Build response
        processing_time = int((time.time() - start_time) * 1000)

        return self._build_response(
            session_uuid=session_uuid,
            results=results,
            recommendations=recommendations,
            request=request,
            stp_score=stp_score,
            stp_rating=stp_rating,
            violation_count=violation_count,
            penalty_risk=penalty_risk,
            processing_time_ms=processing_time,
        )

    def _validate_purpose_code(self, request: UAEValidationRequest) -> List[ValidationResult]:
        """Validate purpose code."""
        results = []

        if request.transaction_type == "offshore":
            if not request.purpose_code:
                results.append(ValidationResult(
                    rule_code="UAE_PPC_MANDATORY",
                    rule_name="Purpose Code Mandatory for Cross-Border",
                    rule_category="mandatory",
                    field_code="purpose_code",
                    field_value=None,
                    validation_status="fail",
                    is_valid=False,
                    error_code="PPC_REQUIRED",
                    error_message="Purpose code is mandatory for offshore payments per UAEFTS AUX700",
                    uaefts_reference="AUX700 Section 4.1",
                    remediation_suggestion="Select a valid purpose code (e.g., SAL, FAM, GDE)",
                    severity="error",
                    stp_impact=-20,
                    penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED,
                ))
            else:
                results.extend(self._check_purpose_code_validity(request))
        elif request.purpose_code:
            results.extend(self._check_purpose_code_validity(request))

        return results

    def _check_purpose_code_validity(self, request: UAEValidationRequest) -> List[ValidationResult]:
        """Check if purpose code exists and is applicable."""
        results = []
        code_upper = request.purpose_code.upper()
        ppc = PURPOSE_CODE_LOOKUP.get(code_upper)

        if not ppc:
            results.append(ValidationResult(
                rule_code="UAE_PPC_VALID",
                rule_name="Purpose Code Validation",
                rule_category="enumeration",
                field_code="purpose_code",
                field_value=request.purpose_code,
                validation_status="fail",
                is_valid=False,
                error_code="PPC_INVALID",
                error_message=f"Purpose code '{request.purpose_code}' is not a valid UAE code",
                uaefts_reference="AUX700 Appendix A",
                remediation_suggestion="Use one of the 117 valid UAE codes (SAL, FAM, GDE, etc.)",
                severity="error",
                stp_impact=-20,
                penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED,
            ))
        else:
            applies_offshore = ppc.get("offshore", True)
            applies_domestic = ppc.get("domestic", False)

            if request.transaction_type == "offshore" and not applies_offshore:
                results.append(ValidationResult(
                    rule_code="UAE_PPC_APPLICABILITY",
                    rule_name="Purpose Code Applicability",
                    rule_category="enumeration",
                    field_code="purpose_code",
                    field_value=request.purpose_code,
                    validation_status="warning",
                    is_valid=False,
                    error_code="PPC_NOT_APPLICABLE",
                    error_message=f"'{request.purpose_code}' is not applicable for offshore transactions",
                    severity="warning",
                    stp_impact=-10,
                ))
            elif request.transaction_type == "domestic" and not applies_domestic:
                results.append(ValidationResult(
                    rule_code="UAE_PPC_APPLICABILITY",
                    rule_name="Purpose Code Applicability",
                    rule_category="enumeration",
                    field_code="purpose_code",
                    field_value=request.purpose_code,
                    validation_status="warning",
                    is_valid=False,
                    error_code="PPC_NOT_APPLICABLE_DOMESTIC",
                    error_message=f"'{request.purpose_code}' is typically for offshore, not domestic",
                    severity="warning",
                    stp_impact=-5,
                ))
            else:
                results.append(ValidationResult(
                    rule_code="UAE_PPC_VALID",
                    rule_name="Purpose Code Validation",
                    rule_category="enumeration",
                    field_code="purpose_code",
                    field_value=request.purpose_code,
                    validation_status="pass",
                    is_valid=True,
                    severity="info",
                ))

        return results

    def _validate_ibans(self, request: UAEValidationRequest) -> List[ValidationResult]:
        """Validate IBANs."""
        results = []

        if request.debtor_iban:
            validation = self.iban_validator.validate(request.debtor_iban)
            results.append(ValidationResult(
                rule_code="UAE_IBAN_DEBTOR",
                rule_name="Debtor IBAN Validation",
                rule_category="format",
                field_code="debtor_iban",
                field_value=request.debtor_iban,
                validation_status="pass" if validation["is_valid"] else "fail",
                is_valid=validation["is_valid"],
                error_code="IBAN_INVALID" if not validation["is_valid"] else None,
                error_message=validation.get("error_message"),
                uaefts_reference="AUX700 Section 3.2",
                remediation_suggestion="Provide valid UAE IBAN: AE + 21 digits" if not validation["is_valid"] else None,
                severity="error" if not validation["is_valid"] else "info",
                stp_impact=-15 if not validation["is_valid"] else 0,
                penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED if not validation["is_valid"] else 0,
            ))

        if request.creditor_iban:
            validation = self.iban_validator.validate(request.creditor_iban)
            results.append(ValidationResult(
                rule_code="UAE_IBAN_CREDITOR",
                rule_name="Creditor IBAN Validation",
                rule_category="format",
                field_code="creditor_iban",
                field_value=request.creditor_iban,
                validation_status="pass" if validation["is_valid"] else "fail",
                is_valid=validation["is_valid"],
                error_code="IBAN_INVALID" if not validation["is_valid"] else None,
                error_message=validation.get("error_message"),
                severity="error" if not validation["is_valid"] else "info",
                stp_impact=-15 if not validation["is_valid"] else 0,
                penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED if not validation["is_valid"] else 0,
            ))

        return results

    def _validate_lei(self, request: UAEValidationRequest) -> List[ValidationResult]:
        """Validate LEI requirements."""
        results = []
        lei_required = request.amount >= UAE_LEI_THRESHOLD_AED

        if lei_required:
            if not request.debtor_lei:
                results.append(ValidationResult(
                    rule_code="UAE_LEI_DEBTOR",
                    rule_name="Debtor LEI Required for High Value",
                    rule_category="threshold",
                    field_code="debtor_lei",
                    field_value=None,
                    validation_status="fail",
                    is_valid=False,
                    error_code="LEI_REQUIRED",
                    error_message=f"Debtor LEI required for transactions >= AED {UAE_LEI_THRESHOLD_AED:,}",
                    uaefts_reference="AUX700 Section 5.1",
                    remediation_suggestion="Provide a valid 20-character LEI",
                    severity="error",
                    stp_impact=-25,
                    penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED,
                ))
            elif not self._validate_lei_format(request.debtor_lei):
                results.append(ValidationResult(
                    rule_code="UAE_LEI_DEBTOR_FORMAT",
                    rule_name="Debtor LEI Format",
                    rule_category="format",
                    field_code="debtor_lei",
                    field_value=request.debtor_lei,
                    validation_status="fail",
                    is_valid=False,
                    error_code="LEI_FORMAT_INVALID",
                    error_message="LEI must be 20 alphanumeric characters",
                    severity="error",
                    stp_impact=-20,
                    penalty_amount_aed=UAE_PENALTY_PER_VIOLATION_AED,
                ))
            else:
                results.append(ValidationResult(
                    rule_code="UAE_LEI_DEBTOR",
                    rule_name="Debtor LEI Validation",
                    rule_category="format",
                    field_code="debtor_lei",
                    field_value=request.debtor_lei,
                    validation_status="pass",
                    is_valid=True,
                    severity="info",
                ))

        return results

    def _validate_lei_format(self, lei: str) -> bool:
        """Validate LEI format."""
        return bool(lei and re.match(r"^[A-Z0-9]{20}$", lei.upper()))

    def _validate_amount_rules(self, request: UAEValidationRequest) -> List[ValidationResult]:
        """Amount-based rules."""
        results = []

        if request.amount >= UAE_HIGH_VALUE_THRESHOLD_AED:
            results.append(ValidationResult(
                rule_code="UAE_HIGH_VALUE",
                rule_name="High Value Transaction Flag",
                rule_category="threshold",
                field_code="amount",
                field_value=str(request.amount),
                validation_status="warning",
                is_valid=True,
                error_message=f"High-value transaction (>= AED {UAE_HIGH_VALUE_THRESHOLD_AED:,})",
                severity="warning",
                stp_impact=-5,
            ))

        return results

    def _calculate_stp_score(self, results: List[ValidationResult]) -> tuple:
        """Calculate STP score."""
        base_score = 100

        for result in results:
            if not result.is_valid:
                base_score += result.stp_impact

        stp_score = max(0, min(100, base_score))

        if stp_score >= 90:
            stp_rating = "high"
        elif stp_score >= 70:
            stp_rating = "medium"
        else:
            stp_rating = "low"

        return stp_score, stp_rating

    def _generate_recommendations(self, results: List[ValidationResult]) -> List[UAERecommendation]:
        """Generate recommendations."""
        recommendations = []

        for result in results:
            if not result.is_valid and result.remediation_suggestion:
                recommendations.append(UAERecommendation(
                    recommendation_type="add_field" if not result.field_value else "correct_format",
                    field_code=result.field_code,
                    priority="high" if result.severity == "error" else "medium",
                    current_value=result.field_value,
                    reason=result.remediation_suggestion,
                    stp_improvement=abs(result.stp_impact),
                    penalty_avoided_aed=result.penalty_amount_aed,
                ))

        recommendations.sort(key=lambda x: (0 if x.priority == "high" else 1, -x.stp_improvement))
        return recommendations

    def _build_response(
        self,
        session_uuid: str,
        results: List[ValidationResult],
        recommendations: List[UAERecommendation],
        request: UAEValidationRequest,
        stp_score: float,
        stp_rating: str,
        violation_count: int,
        penalty_risk: float,
        processing_time_ms: int,
    ) -> UAEValidationResponse:
        """Build response."""
        # Purpose code details
        ppc_description = None
        ppc_valid = True
        if request.purpose_code:
            ppc = PURPOSE_CODE_LOOKUP.get(request.purpose_code.upper())
            if ppc:
                ppc_description = ppc["name"]
            else:
                ppc_valid = False

        # IBAN details
        debtor_iban_result = self.iban_validator.validate(request.debtor_iban) if request.debtor_iban else {"is_valid": True}
        creditor_iban_result = self.iban_validator.validate(request.creditor_iban) if request.creditor_iban else {"is_valid": True}

        lei_required = request.amount >= UAE_LEI_THRESHOLD_AED
        lei_provided = bool(request.debtor_lei or request.creditor_lei)

        # Summary
        total_rules = len(results)
        passed = sum(1 for r in results if r.is_valid)
        failed = sum(1 for r in results if not r.is_valid)
        errors = sum(1 for r in results if r.severity == "error" and not r.is_valid)
        warnings = sum(1 for r in results if r.severity == "warning" and not r.is_valid)

        summary = UAEValidationSummary(
            total_rules=total_rules,
            passed=passed,
            failed=failed,
            warnings=warnings,
            errors=errors,
            uaefts_compliant=errors == 0,
            amount_aed=request.amount,
            is_high_value=request.amount >= UAE_HIGH_VALUE_THRESHOLD_AED,
            lei_required=lei_required,
            lei_provided=lei_provided,
        )

        return UAEValidationResponse(
            session_uuid=session_uuid,
            transaction_type=request.transaction_type,
            transaction_direction=request.transaction_direction,
            purpose_code=request.purpose_code,
            purpose_code_valid=ppc_valid,
            purpose_code_description=ppc_description,
            debtor_iban_valid=debtor_iban_result["is_valid"],
            creditor_iban_valid=creditor_iban_result["is_valid"],
            iban_details={
                "debtor": UAEIBANDetails(**debtor_iban_result) if request.debtor_iban else None,
                "creditor": UAEIBANDetails(**creditor_iban_result) if request.creditor_iban else None,
            },
            lei_required=lei_required,
            lei_provided=lei_provided,
            stp_score=stp_score,
            stp_rating=stp_rating,
            violation_count=violation_count,
            total_penalty_risk_aed=penalty_risk,
            validation_status="completed",
            results=[
                UAEValidationResultDetail(
                    rule_code=r.rule_code,
                    rule_name=r.rule_name,
                    rule_category=r.rule_category,
                    field_code=r.field_code,
                    field_value=r.field_value,
                    validation_status=r.validation_status,
                    is_valid=r.is_valid,
                    error_code=r.error_code,
                    error_message=r.error_message,
                    uaefts_reference=r.uaefts_reference,
                    remediation_suggestion=r.remediation_suggestion,
                    severity=r.severity,
                    stp_impact=r.stp_impact,
                    penalty_amount_aed=r.penalty_amount_aed,
                )
                for r in results
            ],
            recommendations=recommendations,
            summary=summary,
            processing_time_ms=processing_time_ms,
            created_at=datetime.utcnow(),
        )
