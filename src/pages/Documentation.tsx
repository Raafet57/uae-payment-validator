import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Description as DocsIcon,
  Gavel as RulesIcon,
  AccountBalance as IBANIcon,
  Category as CategoryIcon,
  Warning as WarningIcon,
  AccountTree as TaxonomyIcon,
  Public as ISOIcon,
  SwapHoriz as MappingIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>
);

const Documentation: React.FC = () => {
  const [tab, setTab] = useState(0);

  const validationRules = [
    { rule: 'UAE_PPC_MANDATORY', description: 'Purpose code required for offshore', impact: -20, penalty: 1000 },
    { rule: 'UAE_PPC_VALID', description: 'Code must be in valid list', impact: -20, penalty: 1000 },
    { rule: 'UAE_PPC_TYPE_MATCH', description: 'Code must match transaction type', impact: -15, penalty: 1000 },
    { rule: 'UAE_IBAN_FORMAT', description: 'Valid UAE IBAN format', impact: -15, penalty: 1000 },
    { rule: 'UAE_IBAN_CHECKSUM', description: 'Valid IBAN checksum (MOD 97-10)', impact: -10, penalty: 0 },
    { rule: 'UAE_LEI_FORMAT', description: 'Valid 20-character LEI', impact: -20, penalty: 1000 },
    { rule: 'UAE_LEI_REQUIRED', description: 'LEI for high value (>=AED 1M)', impact: -25, penalty: 1000 },
    { rule: 'UAE_HIGH_VALUE', description: 'High value flag (>=AED 500K)', impact: -5, penalty: 0 },
  ];

  const categories = [
    { code: 'SAL', name: 'Salary and Compensation', count: 7, crossBorder: false },
    { code: 'FAM', name: 'Family Maintenance', count: 4, crossBorder: true },
    { code: 'GDE', name: 'Goods - Export', count: 4, crossBorder: true },
    { code: 'GDI', name: 'Goods - Import', count: 3, crossBorder: true },
    { code: 'SRV', name: 'Services', count: 8, crossBorder: false },
    { code: 'TRV', name: 'Travel', count: 4, crossBorder: true },
    { code: 'EDU', name: 'Education', count: 2, crossBorder: true },
    { code: 'MED', name: 'Medical', count: 2, crossBorder: true },
    { code: 'INV', name: 'Investment', count: 15, crossBorder: true },
    { code: 'DIV', name: 'Dividends', count: 4, crossBorder: false },
    { code: 'INT', name: 'Interest', count: 14, crossBorder: false },
    { code: 'LNR', name: 'Loan Related', count: 6, crossBorder: true },
    { code: 'CRD', name: 'Cards/Digital', count: 9, crossBorder: false },
    { code: 'RNT', name: 'Rent/Leasing', count: 6, crossBorder: false },
    { code: 'TAX', name: 'Tax', count: 3, crossBorder: true },
    { code: 'CHR', name: 'Charity', count: 2, crossBorder: true },
    { code: 'OTH', name: 'Other', count: 12, crossBorder: false },
  ];

  const bankCodes = [
    { code: '010', name: 'Central Bank of UAE' },
    { code: '019', name: 'First Abu Dhabi Bank' },
    { code: '030', name: 'Abu Dhabi Commercial Bank' },
    { code: '033', name: 'Emirates NBD' },
    { code: '035', name: 'Dubai Islamic Bank' },
    { code: '046', name: 'Commercial Bank of Dubai' },
    { code: '050', name: 'Mashreq Bank' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          UAEFTS Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reference guide for UAE payment validation and UAEFTS AUX700 compliance
        </Typography>
      </Box>

      {/* Tabs */}
      <Card>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<DocsIcon />} label="Overview" />
          <Tab icon={<RulesIcon />} label="Validation Rules" />
          <Tab icon={<CategoryIcon />} label="Categories" />
          <Tab icon={<IBANIcon />} label="IBAN Format" />
          <Tab icon={<TaxonomyIcon />} label="Taxonomy & Standards" />
          <Tab icon={<WarningIcon />} label="Penalties" />
        </Tabs>

        <CardContent>
          {/* Overview Tab */}
          <TabPanel value={tab} index={0}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              UAEFTS AUX700 Overview
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Document Reference</Typography>
              <Typography variant="body2">
                Technical Notes on Transaction Codes for Balance of Payments
                <br />
                Version: V2018-001-01 | Authority: Central Bank of UAE
              </Typography>
            </Alert>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>Key Requirements</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  <li>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Purpose codes are mandatory</strong> for all cross-border (offshore) payments
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>117 valid purpose codes</strong> organized in 17 categories
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>LEI required</strong> for high-value transactions (≥ AED 1,000,000)
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>IBAN validation</strong> for UAE accounts (AE + 21 digits)
                    </Typography>
                  </li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>Transaction Types</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Domestic</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Transactions within the UAE. Purpose codes are optional but recommended for tracking.
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Offshore / Cross-border</Typography>
                    <Typography variant="body2" color="text.secondary">
                      International transactions. Purpose codes are mandatory per UAEFTS AUX700.
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>Offshore Zones</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Zone</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Regulator</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell><Chip label="ADGM" size="small" /></TableCell>
                        <TableCell>Abu Dhabi Global Market</TableCell>
                        <TableCell>FSRA</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><Chip label="DIFC" size="small" /></TableCell>
                        <TableCell>Dubai International Financial Centre</TableCell>
                        <TableCell>DFSA</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </TabPanel>

          {/* Validation Rules Tab */}
          <TabPanel value={tab} index={1}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Validation Rules
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              Each validation failure impacts the STP score and may result in AED 1,000 penalty.
            </Alert>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Rule Code</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="center">STP Impact</TableCell>
                    <TableCell align="right">Penalty (AED)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validationRules.map((rule) => (
                    <TableRow key={rule.rule}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {rule.rule}
                        </Typography>
                      </TableCell>
                      <TableCell>{rule.description}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={rule.impact}
                          size="small"
                          color={rule.impact <= -20 ? 'error' : 'warning'}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {rule.penalty > 0 ? (
                          <Typography color="error.main" fontWeight={600}>
                            {rule.penalty.toLocaleString()}
                          </Typography>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              STP Scoring
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
              <Box sx={{ p: 2, bgcolor: 'success.50', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>≥90</Typography>
                <Typography variant="subtitle2">High STP</Typography>
                <Typography variant="caption" color="text.secondary">Likely automatic processing</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>≥70</Typography>
                <Typography variant="subtitle2">Medium STP</Typography>
                <Typography variant="caption" color="text.secondary">May require review</Typography>
              </Box>
              <Box sx={{ p: 2, bgcolor: 'error.50', borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'error.main' }}>&lt;70</Typography>
                <Typography variant="subtitle2">Low STP</Typography>
                <Typography variant="caption" color="text.secondary">Manual processing likely</Typography>
              </Box>
            </Box>
          </TabPanel>

          {/* Categories Tab */}
          <TabPanel value={tab} index={2}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Purpose Code Categories
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Category Name</TableCell>
                    <TableCell align="center">Code Count</TableCell>
                    <TableCell align="center">Cross-border Only</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((cat) => (
                    <TableRow key={cat.code}>
                      <TableCell>
                        <Chip label={cat.code} size="small" color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{cat.name}</TableCell>
                      <TableCell align="center">{cat.count}</TableCell>
                      <TableCell align="center">
                        {cat.crossBorder ? (
                          <Chip label="Yes" size="small" color="info" />
                        ) : (
                          <Chip label="No" size="small" variant="outlined" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* IBAN Format Tab */}
          <TabPanel value={tab} index={3}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              UAE IBAN Format
            </Typography>

            <Card variant="outlined" sx={{ mb: 3, p: 3, bgcolor: 'background.default' }}>
              <Box sx={{ fontFamily: 'monospace', fontSize: '1.25rem', mb: 2 }}>
                AE XX YYY ZZZZZZZZZZZZZZZZ
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
                <Chip label="AE" color="primary" size="small" />
                <Typography variant="body2">Country code (2 characters)</Typography>
                <Chip label="XX" color="secondary" size="small" />
                <Typography variant="body2">Check digits (2 digits)</Typography>
                <Chip label="YYY" color="info" size="small" />
                <Typography variant="body2">Bank code (3 digits)</Typography>
                <Chip label="ZZZ..." variant="outlined" size="small" />
                <Typography variant="body2">Account number (16 digits)</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                <strong>Total Length:</strong> 23 characters | <strong>Pattern:</strong> ^AE\d&#123;21&#125;$
              </Typography>
            </Card>

            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              UAE Bank Codes
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Bank Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankCodes.map((bank) => (
                    <TableRow key={bank.code}>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{bank.code}</TableCell>
                      <TableCell>{bank.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Alert severity="info" sx={{ mt: 2 }}>
              IBAN validation uses the MOD 97-10 algorithm per ISO 13616 standard.
            </Alert>
          </TabPanel>

          {/* Taxonomy & Standards Tab */}
          <TabPanel value={tab} index={4}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Taxonomy Harmonization & International Standards
            </Typography>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Regulatory Foundation</Typography>
              <Typography variant="body2">
                UAE purpose codes are derived from the IMF Balance of Payments Manual (BPM6) framework,
                ensuring international compatibility for cross-border payment statistics reporting.
              </Typography>
            </Alert>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MappingIcon color="primary" />
                  <Typography sx={{ fontWeight: 600 }}>Three-Layer Mapping System</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                  <Box sx={{ p: 2, bgcolor: 'primary.50', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>UAE Codes</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>117</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Proprietary codes mandated by CBUAE for domestic compliance
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: 'secondary.50', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>ISO 20022</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>~396</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ExternalPurpose1Code - international payment messaging standard
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: 'warning.50', borderRadius: 2, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>IMF BOP</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>~474</Typography>
                    <Typography variant="body2" color="text.secondary">
                      BPM6 codes for cross-border economic statistics
                    </Typography>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ISOIcon color="secondary" />
                  <Typography sx={{ fontWeight: 600 }}>ISO 20022 Coverage (~98%)</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Nearly all UAE codes map to ISO 20022 External Purpose Codes. The few exceptions are:
                </Typography>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>UAE Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Why No ISO Mapping</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>MWP</TableCell>
                        <TableCell>Mobile Wallet Payments</TableCell>
                        <TableCell>
                          <Chip label="Innovation Gap" size="small" color="info" sx={{ mr: 1 }} />
                          UAE-specific fintech channel not yet in ISO standard
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IBANIcon sx={{ color: '#C8A415' }} />
                  <Typography sx={{ fontWeight: 600 }}>IMF BOP Coverage (~90%) - Key Gaps</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Important:</strong> BOP (Balance of Payments) only tracks cross-border economic activity.
                    Domestic-only transactions and payment instruments have no BOP equivalent by design.
                  </Typography>
                </Alert>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>UAE Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Why No BOP Mapping</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>OAT</TableCell>
                        <TableCell>Own Account Transfer</TableCell>
                        <TableCell><Chip label="Domestic" size="small" variant="outlined" /></TableCell>
                        <TableCell>Same entity transfer - no cross-border economic activity</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>LEL</TableCell>
                        <TableCell>Leasing in UAE</TableCell>
                        <TableCell><Chip label="Domestic" size="small" variant="outlined" /></TableCell>
                        <TableCell>Domestic leasing - no international component</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>UTL</TableCell>
                        <TableCell>Utility Bill Payments</TableCell>
                        <TableCell><Chip label="Domestic" size="small" variant="outlined" /></TableCell>
                        <TableCell>Local consumption - typically domestic only</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>CCP</TableCell>
                        <TableCell>Corporate Card Payments</TableCell>
                        <TableCell><Chip label="Instrument" size="small" color="info" /></TableCell>
                        <TableCell>Settlement mechanism, not economic purpose</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>CRP</TableCell>
                        <TableCell>Credit Card Payment</TableCell>
                        <TableCell><Chip label="Instrument" size="small" color="info" /></TableCell>
                        <TableCell>Settlement mechanism, not economic purpose</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>DCP</TableCell>
                        <TableCell>Debit Card Payments</TableCell>
                        <TableCell><Chip label="Instrument" size="small" color="info" /></TableCell>
                        <TableCell>Settlement mechanism, not economic purpose</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>MWP</TableCell>
                        <TableCell>Mobile Wallet Payments</TableCell>
                        <TableCell><Chip label="Instrument" size="small" color="info" /></TableCell>
                        <TableCell>Digital payment channel, not economic purpose</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TaxonomyIcon color="info" />
                  <Typography sx={{ fontWeight: 600 }}>Key Regulatory Insights</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  <li>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Payment Instruments ≠ Economic Purpose:</strong> Card payments (CCP, CRP, DCP)
                      and mobile wallets (MWP) describe <em>how</em> you pay, not <em>why</em> you pay.
                      BOP tracks the underlying economic reason (trade, services, investment), not the payment rail.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>BOP = Cross-Border Only:</strong> The Balance of Payments framework specifically
                      measures international economic flows. Domestic transactions (own-account transfers, local
                      utilities, domestic leasing) are outside its scope by design.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      <strong>Innovation Gap:</strong> Mobile Wallet (MWP) represents an emerging fintech category
                      where UAE has created specific regulatory codes ahead of international standards. This is
                      common as countries innovate faster than global standardization bodies.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      <strong>Dual-Purpose Design:</strong> UAE codes serve both domestic compliance (all 117 codes)
                      and international reporting (~90% with BOP mapping). Understanding which codes apply to which
                      context is critical for exception handling.
                    </Typography>
                  </li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <MappingIcon fontSize="small" />
                Explore Mappings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Use the <strong>Taxonomy Harmonization</strong> page in the sidebar to explore the full
                mapping between UAE codes, ISO 20022, and IMF BOP standards with confidence levels and
                detailed regulatory notes.
              </Typography>
            </Box>
          </TabPanel>

          {/* Penalties Tab */}
          <TabPanel value={tab} index={5}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Penalty & Compliance Information
            </Typography>

            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Verification Status</Typography>
              <Typography variant="body2">
                The information below is based on publicly available CBUAE regulations. Always verify current
                requirements with official CBUAE sources or your compliance team before relying on this guidance.
              </Typography>
            </Alert>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>Purpose Code Violation Penalty (Confirmed)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>AED 1,000</Typography>
                  <Typography variant="body2">Per violation per transaction</Typography>
                </Alert>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Legal Basis:</strong> Notice No. CBUAE/BSD/N/2018/759 (23 May 2018) and
                  Circular No. 22/2021 (Regulation to Impose Financial Sanctions for Strict Liability Violations)
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Strict Liability:</strong> Once a violation is committed, the financial sanction is applied
                    automatically. No further enquiry, review, representations, or appeal process is applicable.
                  </Typography>
                </Alert>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Confirmed Violations:</Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  <li><Typography variant="body2">Missing purpose code on cross-border SWIFT payment</Typography></li>
                  <li><Typography variant="body2">Using invalid or unrecognized purpose code</Typography></li>
                  <li><Typography variant="body2">Failure to use designated TAG (77B) with correct purpose codes</Typography></li>
                  <li><Typography variant="body2">Merging or amending the official purpose code list</Typography></li>
                  <li><Typography variant="body2">Not providing customers with full unmodified purpose code list</Typography></li>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>LEI Requirements (Unverified)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Caution:</strong> The AED 1,000,000 LEI threshold could not be verified from official CBUAE
                    publications. Research indicates LEI is "becoming increasingly popular" but is "not a mandatory
                    requirement in the UAE just yet" (source: lei-worldwide.com).
                  </Typography>
                </Alert>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  The LEI requirement may be:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  <li><Typography variant="body2">Bank-specific internal policy</Typography></li>
                  <li><Typography variant="body2">Correspondent bank requirement</Typography></li>
                  <li><Typography variant="body2">Anticipated future CBUAE regulation</Typography></li>
                  <li><Typography variant="body2">Requirement from another jurisdiction (e.g., RBI mandates LEI for ≥₹50 crore)</Typography></li>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Recommendation:</strong> Verify LEI thresholds with your compliance team and CBUAE directly.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>Other Compliance Thresholds (Confirmed)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Threshold</TableCell>
                        <TableCell>Requirement</TableCell>
                        <TableCell>Legal Basis</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell><strong>≥ AED 3,500</strong></TableCell>
                        <TableCell>Full originator and beneficiary information required on cross-border wire transfers</TableCell>
                        <TableCell>AML-CFT Decision Articles 27-29</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>≥ AED 60,000</strong></TableCell>
                        <TableCell>Cash/bearer instruments declaration required when entering or leaving UAE</TableCell>
                        <TableCell>Cross-border movement regulations</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>All cross-border</strong></TableCell>
                        <TableCell>Purpose code mandatory in TAG 77B (or equivalent)</TableCell>
                        <TableCell>Notice CBUAE/BSD/N/2018/759</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>MT195 Query Mechanism</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  When purpose code information is missing from TAG 77B (or equivalent), the UAE Financial Institution
                  receiving the credit shall raise an <strong>MT195 query message</strong> to the Ordering Institution
                  to request the missing information.
                </Typography>
                <Alert severity="info">
                  <Typography variant="body2">
                    This means missing purpose codes will delay transaction processing while the query is resolved,
                    in addition to potential penalty exposure.
                  </Typography>
                </Alert>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 600 }}>New CBUAE Law (2025) - Major Regulatory Overhaul</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">Federal Decree Law No. 6 of 2025</Typography>
                  <Typography variant="body2">
                    Issued 8 September 2025 • Effective 16 September 2025 • <strong>Compliance deadline: 16 September 2026</strong>
                  </Typography>
                </Alert>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>What It Replaces:</Typography>
                <Box component="ul" sx={{ m: 0, pl: 3, mb: 2 }}>
                  <li><Typography variant="body2">Federal Decree Law No. 14 of 2018 (Central Bank & Financial Institutions)</Typography></li>
                  <li><Typography variant="body2">Federal Decree Law No. 48 of 2023 (Insurance Activities)</Typography></li>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Penalty Comparison (Old vs New):</Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Violation Type</TableCell>
                        <TableCell>2018 Law</TableCell>
                        <TableCell><strong>2025 Law</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Maximum administrative fine</TableCell>
                        <TableCell>AED 200 million</TableCell>
                        <TableCell><strong>AED 1 billion</strong> (5x increase)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Unlicensed activity (minimum)</TableCell>
                        <TableCell>Not specified</TableCell>
                        <TableCell><strong>AED 1 million minimum</strong></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Authorised Individual violation</TableCell>
                        <TableCell>AED 2 million</TableCell>
                        <TableCell><strong>AED 5 million</strong></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Criminal fine (unlicensed activity)</TableCell>
                        <TableCell>AED 50K - 200M</TableCell>
                        <TableCell><strong>AED 50K - 500M + imprisonment</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>Expanded Scope (Article 62):</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Now covers technology platforms that "facilitate, intermediate, or enable" financial services—including
                  payment platforms, digital wallets, and technology infrastructure providers. This significantly expands
                  who must comply with CBUAE regulations.
                </Typography>

                <Alert severity="warning">
                  <Typography variant="body2">
                    <strong>Action Required:</strong> All affected entities have until 16 September 2026 to regularise
                    licensing and compliance. The transition period may be extended at CBUAE's discretion.
                  </Typography>
                </Alert>
              </AccordionDetails>
            </Accordion>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>Official Sources</Typography>
              <Box component="ul" sx={{ m: 0, pl: 3 }}>
                <li><Typography variant="body2">CBUAE Rulebook: rulebook.centralbank.ae</Typography></li>
                <li><Typography variant="body2">UAEFTS Technical Notes: centralbank.ae/media/mbyhizie/technical-notes-on-transaction-codes-for-bop-en.pdf</Typography></li>
                <li><Typography variant="body2">Notice No. CBUAE/BSD/N/2018/759 (23 May 2018)</Typography></li>
                <li><Typography variant="body2">Circular No. 22/2021 - Strict Liability Violations</Typography></li>
                <li><Typography variant="body2">Federal Decree Law No. 6 of 2025</Typography></li>
              </Box>
            </Box>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Documentation;
