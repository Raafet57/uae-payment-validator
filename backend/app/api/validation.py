"""
UAE Validation API Endpoints
"""

from fastapi import APIRouter

from app.schemas import (
    UAEValidationRequest,
    UAEValidationResponse,
    UAEIBANValidationRequest,
    UAEIBANValidationResponse,
)
from app.validators import UAEValidationEngine, UAEIBANValidator

router = APIRouter()

# Singleton instances (stateless, safe to reuse)
validator = UAEValidationEngine()
iban_validator = UAEIBANValidator()


@router.post("/validate", response_model=UAEValidationResponse)
async def validate_uae_transaction(request: UAEValidationRequest):
    """
    Validate a UAE payment transaction against UAEFTS AUX700 rules.

    Performs comprehensive validation including:
    - Purpose code validation (mandatory for offshore)
    - UAE IBAN format validation (AE + 21 digits)
    - LEI requirements for high-value transactions (>= AED 1,000,000)
    - STP score calculation
    - Penalty risk assessment
    """
    return validator.validate(request)


@router.post("/validate-iban", response_model=UAEIBANValidationResponse)
async def validate_iban(request: UAEIBANValidationRequest):
    """
    Validate a UAE IBAN independently.

    UAE IBAN Format: AE + 2 check digits + 3 bank code + 16 account number
    Total: 23 characters
    """
    result = iban_validator.validate(request.iban)

    return UAEIBANValidationResponse(
        iban=request.iban,
        is_valid=result["is_valid"],
        formatted_iban=iban_validator.format_iban(request.iban) if result["is_valid"] else None,
        bank_code=result.get("bank_code"),
        bank_name=result.get("bank_name"),
        account_number=result.get("account_number"),
        check_digits=result.get("check_digits"),
        error_message=result.get("error_message"),
    )
