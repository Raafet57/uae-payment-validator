"""
UAE Payment Validator - Backend API

A self-contained, stateless FastAPI backend for UAE payment validation.
No database required - all data served from in-memory constants.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import codes, validation, health

# Create FastAPI app
app = FastAPI(
    title="UAE Payment Validator API",
    description="""
## UAE Payment Validation API

Validate UAE payment transactions against UAEFTS AUX700 regulations.

### Features
- **117 Purpose Codes** - Complete UAE PPC catalog
- **IBAN Validation** - UAE format with bank lookup
- **LEI Validation** - For high-value transactions
- **STP Scoring** - Straight-through processing assessment
- **Penalty Assessment** - CBUAE violation risk

### Regulatory Compliance
- UAEFTS AUX700 Technical Notes
- CBUAE Notice BSD/N/2018/759
- Circular 22/2021 (AED 1,000/violation)

### Stateless Architecture
No database required. All 117 purpose codes served from memory.
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    codes.router,
    prefix="/api/v1/uae/codes",
    tags=["Purpose Codes"],
)

app.include_router(
    validation.router,
    prefix="/api/v1/uae/validation",
    tags=["Validation"],
)

app.include_router(
    health.router,
    prefix="/api/v1/uae/health",
    tags=["Health"],
)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": "UAE Payment Validator API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/v1/uae/health/",
        "endpoints": {
            "codes": "/api/v1/uae/codes/",
            "validation": "/api/v1/uae/validation/validate",
            "iban": "/api/v1/uae/validation/validate-iban",
        },
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
