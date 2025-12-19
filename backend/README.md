# UAE Payment Validator - Backend

Stateless FastAPI backend for UAE payment validation against UAEFTS AUX700.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/uae/codes/` | GET | List all 117 purpose codes |
| `/api/v1/uae/codes/{code}` | GET | Get specific code details |
| `/api/v1/uae/codes/categories` | GET | List all 20 categories |
| `/api/v1/uae/validation/validate` | POST | Validate a transaction |
| `/api/v1/uae/validation/validate-iban` | POST | Validate IBAN only |
| `/api/v1/uae/health/` | GET | Health check |

## Features

- **117 UAE Purpose Codes** - Complete UAEFTS AUX700 catalog
- **IBAN Validation** - MOD 97-10 checksum with bank lookup
- **LEI Validation** - Required for transactions >= AED 1,000,000
- **STP Scoring** - 0-100 score with rating (high/medium/low)
- **Penalty Assessment** - AED 1,000 per violation per Circular 22/2021

## Architecture

**Fully stateless** - No database required. All data served from in-memory constants.

```
backend/
├── app/
│   ├── main.py          # FastAPI application
│   ├── constants.py     # 117 purpose codes + bank codes
│   ├── schemas.py       # Pydantic models
│   ├── validators.py    # IBAN + validation engine
│   └── api/
│       ├── codes.py     # Code endpoints
│       ├── validation.py # Validation endpoints
│       └── health.py    # Health endpoint
└── requirements.txt
```

## Example Request

```bash
curl -X POST http://localhost:8000/api/v1/uae/validation/validate \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_type": "offshore",
    "transaction_direction": "outbound",
    "amount": 50000,
    "currency": "AED",
    "purpose_code": "SAL",
    "debtor_iban": "AE070331234567890123456"
  }'
```

## Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
