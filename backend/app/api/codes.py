"""
UAE Code Lookup API Endpoints
"""

from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List

from app.schemas import (
    UAEPurposeCodeResponse,
    UAEPurposeCodeListResponse,
    UAEPurposeCodeCategoryResponse,
    UAEPurposeCodeBulkResponse,
)
from app.constants import (
    UAE_PURPOSE_CODES,
    UAE_PPC_CATEGORIES,
    PURPOSE_CODE_LOOKUP,
    CODES_BY_CATEGORY,
)

router = APIRouter()


def _code_to_response(code_data: dict) -> UAEPurposeCodeResponse:
    """Convert raw code dict to response schema."""
    category_code = code_data.get("category", "OTH")
    return UAEPurposeCodeResponse(
        code=code_data["code"],
        name=code_data["name"],
        description=code_data.get("description"),
        category_code=category_code,
        category_name=UAE_PPC_CATEGORIES.get(category_code, "Other"),
        applies_to_domestic=code_data.get("domestic", False),
        applies_to_offshore=code_data.get("offshore", True),
        requires_lei=code_data.get("requires_lei", False),
        lei_threshold_aed=1_000_000 if code_data.get("requires_lei") else None,
    )


@router.get("/", response_model=UAEPurposeCodeListResponse)
async def list_purpose_codes(
    category: Optional[str] = Query(None, description="Filter by category code"),
    transaction_type: Optional[str] = Query(None, description="'domestic' or 'offshore'"),
    search: Optional[str] = Query(None, description="Search in code or name"),
    requires_lei: Optional[bool] = Query(None, description="Filter by LEI requirement"),
    limit: int = Query(100, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    """List UAE purpose codes with filters."""
    filtered_codes = UAE_PURPOSE_CODES.copy()

    if category:
        category_upper = category.upper()
        filtered_codes = [c for c in filtered_codes if c.get("category", "OTH") == category_upper]

    if transaction_type == "domestic":
        filtered_codes = [c for c in filtered_codes if c.get("domestic", False)]
    elif transaction_type == "offshore":
        filtered_codes = [c for c in filtered_codes if c.get("offshore", True)]

    if search:
        search_lower = search.lower()
        filtered_codes = [
            c for c in filtered_codes
            if search_lower in c["code"].lower() or search_lower in c["name"].lower()
        ]

    if requires_lei is not None:
        filtered_codes = [c for c in filtered_codes if c.get("requires_lei", False) == requires_lei]

    total = len(filtered_codes)
    filtered_codes = filtered_codes[offset:offset + limit]

    categories = [
        UAEPurposeCodeCategoryResponse(
            category_code=cat_code,
            category_name=cat_name,
            is_cross_border_only=cat_code in ["FAM", "TRV", "EDU", "MED", "CHR"],
            code_count=len(CODES_BY_CATEGORY.get(cat_code, [])),
        )
        for cat_code, cat_name in UAE_PPC_CATEGORIES.items()
    ]

    return UAEPurposeCodeListResponse(
        total=total,
        offset=offset,
        limit=limit,
        codes=[_code_to_response(c) for c in filtered_codes],
        categories=categories,
    )


@router.get("/static", response_model=UAEPurposeCodeBulkResponse)
async def get_static_codes():
    """Get all 117 UAE purpose codes grouped by category."""
    categories = [
        UAEPurposeCodeCategoryResponse(
            category_code=code,
            category_name=name,
            is_cross_border_only=code in ["FAM", "TRV", "EDU", "MED", "CHR"],
            code_count=len(CODES_BY_CATEGORY.get(code, [])),
        )
        for code, name in UAE_PPC_CATEGORIES.items()
    ]

    codes_by_category = {}
    for cat_code in UAE_PPC_CATEGORIES.keys():
        cat_codes = CODES_BY_CATEGORY.get(cat_code, [])
        if cat_codes:
            codes_by_category[cat_code] = [
                {
                    "code": c["code"],
                    "name": c["name"],
                    "category_code": c.get("category", "OTH"),
                    "category_name": UAE_PPC_CATEGORIES.get(c.get("category", "OTH"), "Other"),
                    "applies_to_domestic": c.get("domestic", False),
                    "applies_to_offshore": c.get("offshore", True),
                    "requires_lei": c.get("requires_lei", False),
                    "is_active": True,
                }
                for c in cat_codes
            ]

    return UAEPurposeCodeBulkResponse(
        total_codes=len(UAE_PURPOSE_CODES),
        total_categories=len(UAE_PPC_CATEGORIES),
        categories=categories,
        codes_by_category=codes_by_category,
    )


@router.get("/categories", response_model=List[UAEPurposeCodeCategoryResponse])
async def list_categories():
    """List all UAE purpose code categories."""
    return [
        UAEPurposeCodeCategoryResponse(
            category_code=cat_code,
            category_name=cat_name,
            description=f"UAE Payment Purpose Codes - {cat_name}",
            is_cross_border_only=cat_code in ["FAM", "TRV", "EDU", "MED", "CHR"],
            code_count=len(CODES_BY_CATEGORY.get(cat_code, [])),
        )
        for cat_code, cat_name in UAE_PPC_CATEGORIES.items()
    ]


@router.get("/{code}", response_model=UAEPurposeCodeResponse)
async def get_purpose_code(code: str):
    """Get details for a specific purpose code."""
    code_data = PURPOSE_CODE_LOOKUP.get(code.upper())

    if not code_data:
        raise HTTPException(status_code=404, detail=f"Purpose code '{code}' not found")

    return _code_to_response(code_data)
