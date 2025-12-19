"""
UAE Health Check API Endpoints
"""

from fastapi import APIRouter
from datetime import datetime

from app.schemas import HealthResponse
from app.constants import UAE_PURPOSE_CODES, UAE_PPC_CATEGORIES

router = APIRouter()


@router.get("/", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        module="uae",
        version="1.0.0",
        timestamp=datetime.utcnow(),
        config={
            "total_purpose_codes": len(UAE_PURPOSE_CODES),
            "total_categories": len(UAE_PPC_CATEGORIES),
            "uaefts_version": "AUX700 V2018-001-01",
            "regulatory_body": "Central Bank of UAE",
        },
        features=[
            "purpose_code_validation",
            "iban_validation",
            "lei_validation",
            "stp_scoring",
            "penalty_assessment",
        ],
    )
