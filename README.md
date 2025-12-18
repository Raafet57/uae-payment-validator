# UAE Payment Validator

A comprehensive React application for validating UAE payment transactions against CBUAE (Central Bank of UAE) regulations, including UAEFTS AUX700 purpose codes, IBAN validation, and regulatory compliance checking.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)
![MUI](https://img.shields.io/badge/MUI-6-007fff.svg)

## Features

### Core Validation
- **Transaction Validator** - Validate payments against UAEFTS rules with real-time STP scoring
- **IBAN Validator** - UAE IBAN format validation with bank code lookup
- **Purpose Code Explorer** - Browse and search all 117 UAE purpose codes

### Exception Handling
- **Exception Investigation** - 5-step workflow for diagnosing returned payments
- **Return Reason Codes** - 17 common UAE return codes (AC01, NARR, LEIR, etc.)
- **Suggested Corrections** - AI-powered recommendations for fixing rejected transactions

### Reference & Documentation
- **Code Reference** - Detailed descriptions, use cases, and examples for all 117 codes
- **Taxonomy Harmonization** - Map UAE codes to ISO 20022 and IMF BOP standards
- **Compliance Documentation** - UAEFTS AUX700 rules, penalties, and regulatory updates

### Regulatory Intelligence
- **ISO 20022 Mapping** - ~98% coverage with confidence indicators
- **IMF BOP Mapping** - ~90% coverage for cross-border reporting
- **2025 CBUAE Law Updates** - Federal Decree Law No. 6/2025 penalty information

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/uae-payment-validator.git
cd uae-payment-validator

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_UAE_API_URL=http://localhost:8000/api/v1/uae" > .env

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_UAE_API_URL` | Backend API URL | `http://localhost:8000/api/v1/uae` |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx       # Main layout with navigation
│   ├── PurposeCodeCard.tsx
│   ├── STPScoreGauge.tsx
│   └── IBANInput.tsx
├── pages/               # Route pages
│   ├── Dashboard.tsx
│   ├── TransactionValidator.tsx
│   ├── ExceptionInvestigation.tsx
│   ├── IBANValidator.tsx
│   ├── CodeExplorer.tsx
│   ├── CodeReference.tsx
│   ├── TaxonomyHarmonization.tsx
│   └── Documentation.tsx
├── data/                # Static data files
│   ├── codeDescriptions.ts    # 117 code descriptions
│   └── taxonomyMapping.ts     # ISO/BOP mappings
├── services/            # API client
│   └── api.ts
├── types/               # TypeScript interfaces
│   └── index.ts
└── theme.ts             # UAE-branded MUI theme
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript 5** - Type safety
- **Material-UI 6** - Component library
- **React Router 6** - Navigation
- **TanStack Query 5** - Data fetching
- **Axios** - HTTP client

## Regulatory References

This application implements validation rules based on:

- **UAEFTS AUX700** - Technical Notes on Transaction Codes for BOP
- **Notice CBUAE/BSD/N/2018/759** - Cross-border reporting requirements
- **Circular 22/2021** - Strict liability violations
- **Federal Decree Law No. 6/2025** - New CBUAE regulatory framework

## Screenshots

### Dashboard
Overview of UAE payment validation with quick access to all features.

### Transaction Validator
Real-time validation with STP scoring and compliance checking.

### Taxonomy Harmonization
Visual mapping between UAE, ISO 20022, and IMF BOP codes.

## API Backend

This frontend is designed to work with a FastAPI backend. The backend provides:
- Purpose code validation endpoints
- IBAN validation with bank lookup
- Transaction validation with STP scoring
- Static code data endpoints

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is provided for informational and educational purposes only. Always verify regulatory requirements with official CBUAE sources and your compliance team. The penalty and compliance information is based on publicly available regulations and may not reflect the most current requirements.

## Acknowledgments

- Central Bank of UAE (CBUAE) for regulatory documentation
- ISO 20022 for international payment standards
- IMF for Balance of Payments classification framework
