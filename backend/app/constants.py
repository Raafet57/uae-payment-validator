"""
UAE Payment Purpose Code Constants
Based on UAEFTS AUX700 Technical Specification

Central Bank of UAE regulatory requirements for payment purpose codes.
All 117 codes included.
"""

from typing import Dict, List

# =============================================================================
# THRESHOLDS
# =============================================================================

UAE_LEI_THRESHOLD_AED: int = 1_000_000
UAE_HIGH_VALUE_THRESHOLD_AED: int = 500_000
UAE_PENALTY_PER_VIOLATION_AED: float = 1_000.0

# =============================================================================
# IBAN VALIDATION
# =============================================================================

UAE_IBAN_LENGTH: int = 23
UAE_IBAN_COUNTRY_CODE: str = "AE"
UAE_IBAN_PATTERN: str = r"^AE\d{21}$"

# =============================================================================
# UAE BANK CODES (Central Bank of UAE assignments)
# =============================================================================

UAE_BANK_CODES: Dict[str, Dict[str, str]] = {
    "010": {"name": "Central Bank of UAE", "swift": "CBAUAEAA"},
    "013": {"name": "Abu Dhabi Islamic Bank", "swift": "ABDIAEAD"},
    "015": {"name": "Arab Bank", "swift": "ARABAEAA"},
    "017": {"name": "Bank of Baroda", "swift": "BARBAEAA"},
    "019": {"name": "First Abu Dhabi Bank", "swift": "FABAAEAD"},
    "020": {"name": "Banque Misr", "swift": "BMISAEAA"},
    "023": {"name": "Citibank", "swift": "CITIAEAA"},
    "027": {"name": "HSBC Bank Middle East", "swift": "BBMEAEAD"},
    "030": {"name": "Abu Dhabi Commercial Bank", "swift": "ADCBAEAA"},
    "033": {"name": "Emirates NBD", "swift": "EBILAEAD"},
    "035": {"name": "Dubai Islamic Bank", "swift": "DUIBAEAD"},
    "038": {"name": "National Bank of Fujairah", "swift": "NBFUAEAF"},
    "040": {"name": "National Bank of Ras Al-Khaimah", "swift": "NABORAKX"},
    "042": {"name": "National Bank of Umm Al Qaiwain", "swift": "NBQAEAD"},
    "044": {"name": "Sharjah Islamic Bank", "swift": "NBSHAEAS"},
    "046": {"name": "Commercial Bank of Dubai", "swift": "CBDUAEAD"},
    "048": {"name": "Standard Chartered Bank", "swift": "SCBLAEAA"},
    "050": {"name": "Mashreq Bank", "swift": "BOMLAEAD"},
    "055": {"name": "Union National Bank", "swift": "UBNEAEAD"},
    "060": {"name": "Emirates Islamic Bank", "swift": "MEBIUAED"},
    "070": {"name": "Ajman Bank", "swift": "AJMBAEAD"},
    "080": {"name": "Al Hilal Bank", "swift": "HLALAEAA"},
}

# =============================================================================
# PURPOSE CODE CATEGORIES (20 categories)
# =============================================================================

UAE_PPC_CATEGORIES: Dict[str, str] = {
    "SAL": "Salary and Compensation",
    "FAM": "Family Maintenance and Remittances",
    "GDE": "Goods - Export",
    "GDI": "Goods - Import",
    "SRV": "Services",
    "TRV": "Travel",
    "EDU": "Education",
    "MED": "Medical and Healthcare",
    "INV": "Investment",
    "DIV": "Dividends",
    "INT": "Interest",
    "RNT": "Rent and Leasing",
    "PEN": "Pension",
    "TAX": "Tax",
    "INS": "Insurance",
    "CHR": "Charity and Donations",
    "LNR": "Loan Related",
    "CPT": "Capital Transfer",
    "CRD": "Cards and Digital Payments",
    "OTH": "Other",
}

# =============================================================================
# ALL 117 UAE PURPOSE CODES
# Based on UAEFTS AUX700 and CBUAE regulations
# =============================================================================

UAE_PURPOSE_CODES: List[Dict] = [
    # Salary and Compensation (7 codes)
    {"code": "SAL", "name": "Salary Payment", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "SAA", "name": "Salary Advance", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "BON", "name": "Bonus Payment", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "COP", "name": "Compensation", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "LAS", "name": "Leave Salary", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "PEN", "name": "Pension", "category": "SAL", "domestic": True, "offshore": True},
    {"code": "OVT", "name": "Overtime", "category": "SAL", "domestic": True, "offshore": True},

    # Family Maintenance (4 codes)
    {"code": "FAM", "name": "Family Support (Workers Remittances)", "category": "FAM", "domestic": False, "offshore": True},
    {"code": "TOF", "name": "Transfer of Funds Between Persons", "category": "FAM", "domestic": True, "offshore": True},
    {"code": "OAT", "name": "Own Account Transfer", "category": "FAM", "domestic": True, "offshore": True},
    {"code": "AE015", "name": "Family Support", "category": "FAM", "domestic": False, "offshore": True},

    # Goods - Export/Import (7 codes)
    {"code": "GDE", "name": "Goods Sold (Export)", "category": "GDE", "domestic": False, "offshore": True},
    {"code": "GDI", "name": "Goods Bought (Import)", "category": "GDI", "domestic": False, "offshore": True},
    {"code": "GMS", "name": "Processing Repair and Maintenance on Goods", "category": "GDE", "domestic": False, "offshore": True},
    {"code": "GOS", "name": "Government Goods and Services", "category": "GDE", "domestic": True, "offshore": True},
    {"code": "PIP", "name": "Profits on Islamic Products", "category": "GDE", "domestic": True, "offshore": True},
    {"code": "TCP", "name": "Trade Credits and Advances Payable", "category": "GDI", "domestic": False, "offshore": True},
    {"code": "TCR", "name": "Trade Credits and Advances Receivable", "category": "GDE", "domestic": False, "offshore": True},

    # Services (11 codes)
    {"code": "AE001", "name": "Consulting Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "AE002", "name": "Legal Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "IFS", "name": "Information Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "ITS", "name": "Computer Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "PMS", "name": "Professional and Management Consulting", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "RDS", "name": "Research and Development Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "TCS", "name": "Telecommunication Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "TTS", "name": "Technical Trade-Related Business Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "FIS", "name": "Financial Services", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "COM", "name": "Commission", "category": "SRV", "domestic": True, "offshore": True},
    {"code": "ACM", "name": "Agency Commissions", "category": "SRV", "domestic": True, "offshore": True},

    # Travel and Transport (4 codes)
    {"code": "ATS", "name": "Air Transport", "category": "TRV", "domestic": False, "offshore": True},
    {"code": "STS", "name": "Sea Transport", "category": "TRV", "domestic": False, "offshore": True},
    {"code": "STR", "name": "Travel", "category": "TRV", "domestic": False, "offshore": True},
    {"code": "OTS", "name": "Other Modes of Transport", "category": "TRV", "domestic": False, "offshore": True},

    # Education (2 codes)
    {"code": "EDU", "name": "Educational Support", "category": "EDU", "domestic": False, "offshore": True},
    {"code": "TKT", "name": "Tickets", "category": "EDU", "domestic": False, "offshore": True},

    # Charity (2 codes)
    {"code": "CHC", "name": "Charitable Contributions", "category": "CHR", "domestic": False, "offshore": True},
    {"code": "ALW", "name": "Allowance", "category": "CHR", "domestic": True, "offshore": True},

    # Dividends (4 codes)
    {"code": "DIV", "name": "Dividend Payouts from FI", "category": "DIV", "domestic": True, "offshore": True},
    {"code": "DOE", "name": "Dividends on Equity Not Intragroup", "category": "DIV", "domestic": False, "offshore": True},
    {"code": "IGD", "name": "Dividends Intragroup", "category": "DIV", "domestic": False, "offshore": True},
    {"code": "AE025", "name": "Investment Income - Dividends", "category": "DIV", "domestic": False, "offshore": True},

    # Interest (14 codes)
    {"code": "IOL", "name": "Income on Loans", "category": "INT", "domestic": True, "offshore": True},
    {"code": "IOD", "name": "Income on Deposits", "category": "INT", "domestic": True, "offshore": True},
    {"code": "IPC", "name": "Charges for Use of Intellectual Property", "category": "INT", "domestic": True, "offshore": True},
    {"code": "IGT", "name": "Inter Group Transfer", "category": "INT", "domestic": True, "offshore": True},
    {"code": "IID", "name": "Interest on Debt Intragroup", "category": "INT", "domestic": False, "offshore": True},
    {"code": "IRP", "name": "Interest Rate Swap Payments", "category": "INT", "domestic": False, "offshore": True},
    {"code": "IRW", "name": "Interest Rate Unwind Payments", "category": "INT", "domestic": False, "offshore": True},
    {"code": "ISL", "name": "Interest on Securities > 1 Year", "category": "INT", "domestic": False, "offshore": True},
    {"code": "ISS", "name": "Interest on Securities < 1 Year", "category": "INT", "domestic": False, "offshore": True},
    {"code": "LIP", "name": "Loan Interest Payments", "category": "INT", "domestic": True, "offshore": True},
    {"code": "LNC", "name": "Loan Charges", "category": "INT", "domestic": True, "offshore": True},
    {"code": "LND", "name": "Loan Disbursements from FI", "category": "INT", "domestic": True, "offshore": True},
    {"code": "DLF", "name": "Debt Instruments Intragroup - Foreign Deposits", "category": "INT", "domestic": False, "offshore": True},
    {"code": "LDL", "name": "Debt Instruments Intragroup - UAE Deposits", "category": "INT", "domestic": True, "offshore": False},

    # Loans (6 codes)
    {"code": "LLA", "name": "Long-term Loans to Non-Residents", "category": "LNR", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "LLL", "name": "Long-term Foreign Loans to Residents", "category": "LNR", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "SLA", "name": "Short-term Loans to Non-Residents", "category": "LNR", "domestic": False, "offshore": True},
    {"code": "SLL", "name": "Short-term Foreign Loans to Residents", "category": "LNR", "domestic": False, "offshore": True},
    {"code": "PRP", "name": "Profit Rate Swap Payments", "category": "LNR", "domestic": False, "offshore": True},
    {"code": "PRW", "name": "Profit Rate Unwind Payments", "category": "LNR", "domestic": False, "offshore": True},

    # Investment (16 codes)
    {"code": "CEA", "name": "Equity in Company Abroad - Residents", "category": "INV", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "CEL", "name": "Equity in Company Abroad - Non-Residents", "category": "INV", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "FSA", "name": "Equity Shares in Foreign Companies", "category": "INV", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "FSL", "name": "Equity Shares in UAE Companies", "category": "INV", "domestic": True, "offshore": False, "requires_lei": True},
    {"code": "FIA", "name": "Investment Fund Shares - Foreign", "category": "INV", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "FIL", "name": "Investment Fund Shares - UAE", "category": "INV", "domestic": True, "offshore": False, "requires_lei": True},
    {"code": "DLA", "name": "Foreign Debt Securities > 1 Year", "category": "INV", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "DSA", "name": "Foreign Debt Securities < 1 Year", "category": "INV", "domestic": False, "offshore": True},
    {"code": "DLL", "name": "Resident Debt Securities > 1 Year", "category": "INV", "domestic": True, "offshore": False},
    {"code": "DSL", "name": "Resident Debt Securities < 1 Year", "category": "INV", "domestic": True, "offshore": False},
    {"code": "DSF", "name": "Debt Instruments Intragroup - Foreign Securities", "category": "INV", "domestic": False, "offshore": True},
    {"code": "LDS", "name": "Debt Instruments Intragroup - UAE Securities", "category": "INV", "domestic": True, "offshore": False},
    {"code": "FDA", "name": "Financial Derivatives - Foreign", "category": "INV", "domestic": False, "offshore": True},
    {"code": "FDL", "name": "Financial Derivatives - UAE", "category": "INV", "domestic": True, "offshore": False},
    {"code": "ISH", "name": "Income on Investment Fund Shares", "category": "INV", "domestic": True, "offshore": True},
    {"code": "CIN", "name": "Commercial Investments", "category": "INV", "domestic": True, "offshore": True},

    # Cards and Digital Payments (9 codes)
    {"code": "CCP", "name": "Corporate Card Payments", "category": "CRD", "domestic": True, "offshore": True},
    {"code": "CRP", "name": "Credit Card Payment", "category": "CRD", "domestic": True, "offshore": True},
    {"code": "DCP", "name": "Debit Card Payments", "category": "CRD", "domestic": True, "offshore": True},
    {"code": "MWI", "name": "Mobile Wallet Cash-in", "category": "CRD", "domestic": True, "offshore": False},
    {"code": "MWO", "name": "Mobile Wallet Cash-out", "category": "CRD", "domestic": True, "offshore": False},
    {"code": "MWP", "name": "Mobile Wallet Payments", "category": "CRD", "domestic": True, "offshore": True},
    {"code": "SVI", "name": "Stored Value Card Cash-in", "category": "CRD", "domestic": True, "offshore": False},
    {"code": "SVO", "name": "Stored Value Card Cash-out", "category": "CRD", "domestic": True, "offshore": False},
    {"code": "SVP", "name": "Stored Value Card Payments", "category": "CRD", "domestic": True, "offshore": True},

    # Rent and Real Estate (6 codes)
    {"code": "LEA", "name": "Leasing Abroad", "category": "RNT", "domestic": False, "offshore": True},
    {"code": "LEL", "name": "Leasing in UAE", "category": "RNT", "domestic": True, "offshore": False},
    {"code": "RNT", "name": "Rent Payments", "category": "RNT", "domestic": True, "offshore": True},
    {"code": "PRR", "name": "Profits or Rents on Real Estate", "category": "RNT", "domestic": True, "offshore": True},
    {"code": "PPA", "name": "Purchase Real Estate Abroad from Residents", "category": "RNT", "domestic": False, "offshore": True, "requires_lei": True},
    {"code": "PPL", "name": "Purchase Real Estate in UAE from Non-Residents", "category": "RNT", "domestic": True, "offshore": False},

    # Insurance (1 code)
    {"code": "INS", "name": "Insurance Services", "category": "INS", "domestic": True, "offshore": True},

    # Tax (3 codes)
    {"code": "GRI", "name": "Government Related - Taxes, Tariffs, Capital Transfers", "category": "TAX", "domestic": True, "offshore": True},
    {"code": "TAX", "name": "Tax Payment (Domestic Only)", "category": "TAX", "domestic": True, "offshore": False},
    {"code": "XAT", "name": "Tax Refund", "category": "TAX", "domestic": True, "offshore": True},

    # Personal Accounts (2 codes)
    {"code": "AFA", "name": "Personal Resident Bank Account Abroad", "category": "OTH", "domestic": False, "offshore": True},
    {"code": "AFL", "name": "Personal Non-Resident Bank Account in UAE", "category": "OTH", "domestic": True, "offshore": False},

    # Reversals and Corrections (7 codes)
    {"code": "RDA", "name": "Reverse Debt Instruments Abroad", "category": "OTH", "domestic": False, "offshore": True},
    {"code": "RDL", "name": "Reverse Debt Instruments in UAE", "category": "OTH", "domestic": True, "offshore": False},
    {"code": "REA", "name": "Reverse Equity Share Abroad", "category": "OTH", "domestic": False, "offshore": True},
    {"code": "REL", "name": "Reverse Equity Share in UAE", "category": "OTH", "domestic": True, "offshore": False},
    {"code": "RFS", "name": "Repos on Foreign Securities", "category": "OTH", "domestic": False, "offshore": True},
    {"code": "RLS", "name": "Repos on Securities Issued by Residents", "category": "OTH", "domestic": True, "offshore": False},
    {"code": "POR", "name": "Refunds/Reversals on IPO Subscriptions", "category": "OTH", "domestic": True, "offshore": True},

    # Miscellaneous (12 codes)
    {"code": "AES", "name": "Advance Payment Against EOS", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "CBP", "name": "Cross Border Payments", "category": "OTH", "domestic": False, "offshore": True},
    {"code": "EMI", "name": "Equated Monthly Installments", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "EOS", "name": "End of Service / Final Settlement", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "IPO", "name": "IPO Subscriptions", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "MCR", "name": "Monetary Claim Reimbursements", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "PIN", "name": "Personal Investments", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "POS", "name": "POS Merchant Settlement", "category": "OTH", "domestic": True, "offshore": False},
    {"code": "SCO", "name": "Construction", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "UFP", "name": "Unclaimed Funds Placement", "category": "OTH", "domestic": True, "offshore": False},
    {"code": "UTL", "name": "Utility Bill Payments", "category": "OTH", "domestic": True, "offshore": True},
    {"code": "OTH", "name": "Other Payments", "category": "OTH", "domestic": True, "offshore": True},
]

# =============================================================================
# LOOKUP STRUCTURES (built at import time for O(1) access)
# =============================================================================

PURPOSE_CODE_LOOKUP: Dict[str, Dict] = {
    code["code"].upper(): code for code in UAE_PURPOSE_CODES
}

CODES_BY_CATEGORY: Dict[str, List[Dict]] = {}
for code in UAE_PURPOSE_CODES:
    cat = code.get("category", "OTH")
    if cat not in CODES_BY_CATEGORY:
        CODES_BY_CATEGORY[cat] = []
    CODES_BY_CATEGORY[cat].append(code)
