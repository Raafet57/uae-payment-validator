import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
  Search as SearchIcon,
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Lightbulb as SuggestIcon,
  ContentCopy as CopyIcon,
  Replay as RetryIcon,
  Description as NoteIcon,
  ArrowForward as ArrowIcon,
  CompareArrows as CompareIcon,
} from '@mui/icons-material';
import { useQuery, useMutation } from '@tanstack/react-query';
import { codesApi, validationApi } from '../services/api';
import { UAEPurposeCode, UAEValidationRequest } from '../types';
import { STPScoreGauge } from '../components';

// Common UAE return reason codes
const RETURN_REASONS = [
  {
    code: 'AC01',
    name: 'Incorrect Account Number',
    description: 'Format of the account number specified is not correct',
    category: 'account',
  },
  {
    code: 'AC04',
    name: 'Closed Account',
    description: 'Account is closed',
    category: 'account',
  },
  {
    code: 'AC06',
    name: 'Blocked Account',
    description: 'Account specified is blocked, prohibiting posting of transactions against it',
    category: 'account',
  },
  {
    code: 'AM04',
    name: 'Insufficient Funds',
    description: 'Amount of funds available to cover specified message amount is insufficient',
    category: 'amount',
  },
  {
    code: 'BE01',
    name: 'Inconsistent with End Customer',
    description: 'Identification of end customer is not consistent with associated account number',
    category: 'beneficiary',
  },
  {
    code: 'FF01',
    name: 'Invalid File Format',
    description: 'Operation/transaction code, or sequence number, or date, is invalid',
    category: 'format',
  },
  {
    code: 'MD01',
    name: 'No Mandate',
    description: 'No valid mandate exists',
    category: 'mandate',
  },
  {
    code: 'MS03',
    name: 'Reason Not Specified',
    description: 'Reason not specified by end customer',
    category: 'other',
  },
  {
    code: 'RC01',
    name: 'Bank Identifier Incorrect',
    description: 'Bank identifier code specified in the message is incorrect',
    category: 'routing',
  },
  {
    code: 'RR01',
    name: 'Missing Debtor Account/ID',
    description: 'Specification of the debtor account or unique identification needed for reasons of regulatory requirements is insufficient or missing',
    category: 'regulatory',
  },
  {
    code: 'RR02',
    name: 'Missing Debtor Name/Address',
    description: 'Specification of the debtor name and/or address needed for regulatory requirements is insufficient or missing',
    category: 'regulatory',
  },
  {
    code: 'RR03',
    name: 'Missing Creditor Name/Address',
    description: 'Specification of the creditor name and/or address needed for regulatory requirements is insufficient or missing',
    category: 'regulatory',
  },
  {
    code: 'RR04',
    name: 'Regulatory Reason',
    description: 'Regulatory reason - Transaction not compliant with UAE regulations',
    category: 'regulatory',
  },
  {
    code: 'NARR',
    name: 'Narrative/Purpose Code Issue',
    description: 'Invalid or missing purpose code, or narrative does not match purpose',
    category: 'purpose',
  },
  {
    code: 'LEIR',
    name: 'LEI Required',
    description: 'Legal Entity Identifier required but not provided for high-value transaction',
    category: 'lei',
  },
  {
    code: 'PURC',
    name: 'Invalid Purpose Code',
    description: 'Purpose code is invalid or does not apply to this transaction type',
    category: 'purpose',
  },
  {
    code: 'IBAV',
    name: 'Invalid IBAN',
    description: 'IBAN format is invalid or checksum verification failed',
    category: 'account',
  },
];

const steps = [
  'Return Details',
  'Original Transaction',
  'Diagnosis',
  'Suggested Corrections',
  'Validate Correction',
];

interface OriginalTransaction {
  transaction_type: 'domestic' | 'offshore';
  transaction_direction: 'inbound' | 'outbound';
  amount: string;
  purpose_code: string;
  debtor_iban: string;
  creditor_iban: string;
  debtor_lei: string;
  creditor_lei: string;
  remittance_info: string;
}

interface DiagnosticResult {
  issue: string;
  severity: 'error' | 'warning' | 'info';
  field: string;
  explanation: string;
  suggestion: string;
}

const ExceptionInvestigation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [returnReason, setReturnReason] = useState<typeof RETURN_REASONS[0] | null>(null);
  const [customReturnMessage, setCustomReturnMessage] = useState('');
  const [originalTransaction, setOriginalTransaction] = useState<OriginalTransaction>({
    transaction_type: 'offshore',
    transaction_direction: 'outbound',
    amount: '',
    purpose_code: '',
    debtor_iban: '',
    creditor_iban: '',
    debtor_lei: '',
    creditor_lei: '',
    remittance_info: '',
  });
  const [correctedPurposeCode, setCorrectedPurposeCode] = useState<UAEPurposeCode | null>(null);
  const [correctedLei, setCorrectedLei] = useState({ debtor: '', creditor: '' });
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [showDiagnostics, setShowDiagnostics] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Fetch all purpose codes
  const { data: staticData } = useQuery({
    queryKey: ['staticCodes'],
    queryFn: codesApi.getStaticCodes,
  });

  const allCodes = useMemo(() => {
    if (!staticData?.codes_by_category) return [];
    return Object.values(staticData.codes_by_category).flat();
  }, [staticData]);

  // Filter codes based on transaction type
  const applicableCodes = useMemo(() => {
    return allCodes.filter((code) =>
      originalTransaction.transaction_type === 'domestic'
        ? code.applies_to_domestic
        : code.applies_to_offshore
    );
  }, [allCodes, originalTransaction.transaction_type]);

  // Find original purpose code details
  const originalPurposeCodeDetails = useMemo(() => {
    return allCodes.find((c) => c.code === originalTransaction.purpose_code);
  }, [allCodes, originalTransaction.purpose_code]);

  // Validate corrected transaction
  const validateMutation = useMutation({
    mutationFn: (data: UAEValidationRequest) => validationApi.validateTransaction(data),
  });

  // Generate diagnostic results based on return reason and transaction
  const diagnosticResults = useMemo((): DiagnosticResult[] => {
    const results: DiagnosticResult[] = [];

    if (!returnReason) return results;

    // Purpose code issues
    if (returnReason.category === 'purpose' || returnReason.code === 'NARR') {
      if (!originalTransaction.purpose_code) {
        results.push({
          issue: 'Missing Purpose Code',
          severity: 'error',
          field: 'purpose_code',
          explanation: 'The transaction was submitted without a purpose code. All UAE transactions require a valid purpose code per CBUAE regulations.',
          suggestion: 'Add a valid purpose code that matches the nature of the transaction.',
        });
      } else if (originalPurposeCodeDetails) {
        // Check if purpose code applies to transaction type
        const isApplicable = originalTransaction.transaction_type === 'domestic'
          ? originalPurposeCodeDetails.applies_to_domestic
          : originalPurposeCodeDetails.applies_to_offshore;

        if (!isApplicable) {
          results.push({
            issue: 'Purpose Code Not Applicable',
            severity: 'error',
            field: 'purpose_code',
            explanation: `Purpose code ${originalTransaction.purpose_code} (${originalPurposeCodeDetails.name}) is not valid for ${originalTransaction.transaction_type} transactions.`,
            suggestion: `Select a purpose code that is valid for ${originalTransaction.transaction_type} transactions.`,
          });
        }

        // Check direction applicability
        const directionApplicable = originalTransaction.transaction_direction === 'inbound'
          ? originalPurposeCodeDetails.applies_to_inbound
          : originalPurposeCodeDetails.applies_to_outbound;

        if (!directionApplicable) {
          results.push({
            issue: 'Purpose Code Direction Mismatch',
            severity: 'warning',
            field: 'purpose_code',
            explanation: `Purpose code ${originalTransaction.purpose_code} may not be appropriate for ${originalTransaction.transaction_direction} transactions.`,
            suggestion: `Verify the purpose code is suitable for ${originalTransaction.transaction_direction} transactions.`,
          });
        }
      } else if (originalTransaction.purpose_code && !originalPurposeCodeDetails) {
        results.push({
          issue: 'Invalid Purpose Code',
          severity: 'error',
          field: 'purpose_code',
          explanation: `The purpose code "${originalTransaction.purpose_code}" is not a recognized UAE purpose code.`,
          suggestion: 'Select a valid purpose code from the 117 approved UAE codes.',
        });
      }
    }

    // LEI issues
    if (returnReason.category === 'lei' || returnReason.code === 'LEIR') {
      const amount = parseFloat(originalTransaction.amount) || 0;
      const needsLei = amount >= 1000000 || originalPurposeCodeDetails?.requires_lei;

      if (needsLei && !originalTransaction.debtor_lei && !originalTransaction.creditor_lei) {
        results.push({
          issue: 'Missing LEI',
          severity: 'error',
          field: 'lei',
          explanation: `Transactions over AED 1,000,000 or with purpose codes requiring LEI must include Legal Entity Identifiers.${originalPurposeCodeDetails?.requires_lei ? ` Purpose code ${originalTransaction.purpose_code} requires LEI.` : ''}`,
          suggestion: 'Provide valid 20-character LEI codes for the debtor and/or creditor.',
        });
      }
    }

    // Account/IBAN issues
    if (returnReason.category === 'account' || returnReason.code === 'IBAV') {
      // Check debtor IBAN
      if (originalTransaction.debtor_iban) {
        const cleanIban = originalTransaction.debtor_iban.replace(/\s/g, '').toUpperCase();
        if (!cleanIban.startsWith('AE') || cleanIban.length !== 23) {
          results.push({
            issue: 'Invalid Debtor IBAN Format',
            severity: 'error',
            field: 'debtor_iban',
            explanation: 'UAE IBANs must start with "AE" followed by 21 digits (23 characters total).',
            suggestion: 'Verify the debtor IBAN format and correct any errors.',
          });
        }
      }

      // Check creditor IBAN for domestic
      if (originalTransaction.transaction_type === 'domestic' && originalTransaction.creditor_iban) {
        const cleanIban = originalTransaction.creditor_iban.replace(/\s/g, '').toUpperCase();
        if (!cleanIban.startsWith('AE') || cleanIban.length !== 23) {
          results.push({
            issue: 'Invalid Creditor IBAN Format',
            severity: 'error',
            field: 'creditor_iban',
            explanation: 'For domestic UAE transactions, creditor IBAN must be a valid UAE IBAN.',
            suggestion: 'Verify the creditor IBAN format and correct any errors.',
          });
        }
      }
    }

    // Regulatory issues
    if (returnReason.category === 'regulatory') {
      results.push({
        issue: 'Regulatory Compliance Issue',
        severity: 'warning',
        field: 'general',
        explanation: 'The transaction was returned due to regulatory compliance concerns. This may involve missing documentation, sanctions screening, or other compliance requirements.',
        suggestion: 'Review the full transaction details against CBUAE AUX700 requirements and verify all mandatory fields are properly populated.',
      });
    }

    return results;
  }, [returnReason, originalTransaction, originalPurposeCodeDetails]);

  // Suggest alternative purpose codes based on remittance info
  const suggestedCodes = useMemo(() => {
    if (!originalTransaction.remittance_info) return [];

    const searchTerms = originalTransaction.remittance_info.toLowerCase().split(/\s+/);
    const scored = applicableCodes.map((code) => {
      let score = 0;
      const codeText = `${code.name} ${code.description || ''} ${code.category_name}`.toLowerCase();

      searchTerms.forEach((term) => {
        if (term.length > 2 && codeText.includes(term)) {
          score += 1;
        }
      });

      return { code, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map((s) => s.code);
  }, [applicableCodes, originalTransaction.remittance_info]);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleValidateCorrection = () => {
    const request: UAEValidationRequest = {
      transaction_type: originalTransaction.transaction_type,
      transaction_direction: originalTransaction.transaction_direction,
      amount: parseFloat(originalTransaction.amount) || 0,
      currency: 'AED',
      purpose_code: correctedPurposeCode?.code || originalTransaction.purpose_code,
      debtor_iban: originalTransaction.debtor_iban,
      creditor_iban: originalTransaction.creditor_iban,
      debtor_lei: correctedLei.debtor || originalTransaction.debtor_lei,
      creditor_lei: correctedLei.creditor || originalTransaction.creditor_lei,
      remittance_info: originalTransaction.remittance_info,
    };

    validateMutation.mutate(request);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Exception Investigation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Diagnose and resolve returned UAE payment exceptions
        </Typography>
      </Box>

      {/* Progress Stepper */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        {/* Main Content */}
        <Box>
          {/* Step 1: Return Details */}
          {activeStep === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Return Information
                </Typography>

                <Autocomplete
                  options={RETURN_REASONS}
                  value={returnReason}
                  onChange={(_, value) => setReturnReason(value)}
                  getOptionLabel={(option) => `${option.code} - ${option.name}`}
                  groupBy={(option) => option.category.toUpperCase()}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {option.code} - {option.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Return Reason Code"
                      placeholder="Select or search return code..."
                      helperText="Select the return reason code from the payment system"
                    />
                  )}
                  sx={{ mb: 3 }}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Additional Return Message"
                  placeholder="Paste any additional error message or narrative from the return..."
                  value={customReturnMessage}
                  onChange={(e) => setCustomReturnMessage(e.target.value)}
                  helperText="Optional: Include any additional context from the return message"
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!returnReason}
                    endIcon={<ArrowIcon />}
                  >
                    Continue
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Original Transaction */}
          {activeStep === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Original Transaction Details
                </Typography>

                {/* Transaction Type & Direction */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <ToggleButtonGroup
                    value={originalTransaction.transaction_type}
                    exclusive
                    onChange={(_, value) =>
                      value && setOriginalTransaction((prev) => ({ ...prev, transaction_type: value }))
                    }
                    size="small"
                  >
                    <ToggleButton value="domestic">
                      <DomesticIcon sx={{ mr: 0.5 }} />
                      Domestic
                    </ToggleButton>
                    <ToggleButton value="offshore">
                      <OffshoreIcon sx={{ mr: 0.5 }} />
                      Offshore
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <ToggleButtonGroup
                    value={originalTransaction.transaction_direction}
                    exclusive
                    onChange={(_, value) =>
                      value && setOriginalTransaction((prev) => ({ ...prev, transaction_direction: value }))
                    }
                    size="small"
                  >
                    <ToggleButton value="inbound">Inbound</ToggleButton>
                    <ToggleButton value="outbound">Outbound</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    label="Amount (AED)"
                    type="number"
                    value={originalTransaction.amount}
                    onChange={(e) =>
                      setOriginalTransaction((prev) => ({ ...prev, amount: e.target.value }))
                    }
                    InputProps={{
                      startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                    }}
                  />

                  <Autocomplete
                    options={allCodes}
                    value={allCodes.find((c) => c.code === originalTransaction.purpose_code) || null}
                    onChange={(_, value) =>
                      setOriginalTransaction((prev) => ({
                        ...prev,
                        purpose_code: value?.code || '',
                      }))
                    }
                    getOptionLabel={(option) => `${option.code} - ${option.name}`}
                    renderInput={(params) => (
                      <TextField {...params} label="Purpose Code" />
                    )}
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    label="Debtor IBAN"
                    value={originalTransaction.debtor_iban}
                    onChange={(e) =>
                      setOriginalTransaction((prev) => ({ ...prev, debtor_iban: e.target.value }))
                    }
                    placeholder="AE..."
                  />
                  <TextField
                    label="Creditor IBAN"
                    value={originalTransaction.creditor_iban}
                    onChange={(e) =>
                      setOriginalTransaction((prev) => ({ ...prev, creditor_iban: e.target.value }))
                    }
                    placeholder="AE... or international IBAN"
                  />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 2 }}>
                  <TextField
                    label="Debtor LEI"
                    value={originalTransaction.debtor_lei}
                    onChange={(e) =>
                      setOriginalTransaction((prev) => ({ ...prev, debtor_lei: e.target.value }))
                    }
                    placeholder="20-character LEI"
                  />
                  <TextField
                    label="Creditor LEI"
                    value={originalTransaction.creditor_lei}
                    onChange={(e) =>
                      setOriginalTransaction((prev) => ({ ...prev, creditor_lei: e.target.value }))
                    }
                    placeholder="20-character LEI"
                  />
                </Box>

                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Remittance Information / Description"
                  value={originalTransaction.remittance_info}
                  onChange={(e) =>
                    setOriginalTransaction((prev) => ({ ...prev, remittance_info: e.target.value }))
                  }
                  placeholder="e.g., Payment for consulting services, Invoice #12345"
                  helperText="This will help suggest appropriate purpose codes"
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button variant="contained" onClick={handleNext} endIcon={<ArrowIcon />}>
                    Analyze
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Diagnosis */}
          {activeStep === 2 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Diagnostic Analysis
                  </Typography>
                  <IconButton onClick={() => setShowDiagnostics(!showDiagnostics)}>
                    {showDiagnostics ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={showDiagnostics}>
                  {diagnosticResults.length === 0 ? (
                    <Alert severity="info">
                      <AlertTitle>No Issues Detected</AlertTitle>
                      Based on the provided information, no specific issues were identified.
                      The return may be due to external factors not captured in the transaction data.
                    </Alert>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {diagnosticResults.map((result, index) => (
                        <Alert
                          key={index}
                          severity={result.severity}
                          icon={
                            result.severity === 'error' ? (
                              <ErrorIcon />
                            ) : result.severity === 'warning' ? (
                              <WarningIcon />
                            ) : undefined
                          }
                        >
                          <AlertTitle>{result.issue}</AlertTitle>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {result.explanation}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SuggestIcon fontSize="small" color="primary" />
                            <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                              {result.suggestion}
                            </Typography>
                          </Box>
                        </Alert>
                      ))}
                    </Box>
                  )}
                </Collapse>

                <Divider sx={{ my: 3 }} />

                {/* Return Context */}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Return Context
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, width: 180 }}>Return Code</TableCell>
                      <TableCell>
                        <Chip
                          label={returnReason?.code}
                          color="error"
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        {returnReason?.name}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {returnReason?.category}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                      <TableCell>{returnReason?.description}</TableCell>
                    </TableRow>
                    {customReturnMessage && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Additional Message</TableCell>
                        <TableCell>{customReturnMessage}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button variant="contained" onClick={handleNext} endIcon={<ArrowIcon />}>
                    View Suggestions
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Suggested Corrections */}
          {activeStep === 3 && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Suggested Corrections
                  </Typography>
                  <IconButton onClick={() => setShowSuggestions(!showSuggestions)}>
                    {showSuggestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>

                <Collapse in={showSuggestions}>
                  {/* Purpose Code Suggestions */}
                  {(returnReason?.category === 'purpose' || suggestedCodes.length > 0) && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        Suggested Purpose Codes
                      </Typography>

                      {suggestedCodes.length > 0 ? (
                        <List dense>
                          {suggestedCodes.map((code) => (
                            <ListItem
                              key={code.code}
                              sx={{
                                border: '1px solid',
                                borderColor:
                                  correctedPurposeCode?.code === code.code
                                    ? 'primary.main'
                                    : 'divider',
                                borderRadius: 1,
                                mb: 1,
                                cursor: 'pointer',
                                bgcolor:
                                  correctedPurposeCode?.code === code.code
                                    ? 'primary.50'
                                    : 'transparent',
                              }}
                              onClick={() => setCorrectedPurposeCode(code)}
                            >
                              <ListItemIcon>
                                {correctedPurposeCode?.code === code.code ? (
                                  <CheckIcon color="primary" />
                                ) : (
                                  <SuggestIcon color="action" />
                                )}
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography
                                      sx={{ fontFamily: 'monospace', fontWeight: 600 }}
                                    >
                                      {code.code}
                                    </Typography>
                                    <Typography>{code.name}</Typography>
                                  </Box>
                                }
                                secondary={code.description}
                              />
                              <Tooltip title="Copy code">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard(code.code);
                                  }}
                                >
                                  <CopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          Add remittance information to get purpose code suggestions based on
                          transaction description.
                        </Alert>
                      )}

                      <Autocomplete
                        options={applicableCodes}
                        value={correctedPurposeCode}
                        onChange={(_, value) => setCorrectedPurposeCode(value)}
                        getOptionLabel={(option) => `${option.code} - ${option.name}`}
                        groupBy={(option) => option.category_name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Or select manually"
                            placeholder="Search purpose codes..."
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    </Box>
                  )}

                  {/* LEI Corrections */}
                  {(returnReason?.category === 'lei' ||
                    (parseFloat(originalTransaction.amount) >= 1000000 &&
                      !originalTransaction.debtor_lei)) && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        LEI Information
                      </Typography>
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        Transactions over AED 1,000,000 require Legal Entity Identifiers (LEI).
                      </Alert>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <TextField
                          label="Corrected Debtor LEI"
                          value={correctedLei.debtor}
                          onChange={(e) =>
                            setCorrectedLei((prev) => ({ ...prev, debtor: e.target.value }))
                          }
                          placeholder="20-character LEI"
                          helperText="Format: 20 alphanumeric characters"
                        />
                        <TextField
                          label="Corrected Creditor LEI"
                          value={correctedLei.creditor}
                          onChange={(e) =>
                            setCorrectedLei((prev) => ({ ...prev, creditor: e.target.value }))
                          }
                          placeholder="20-character LEI"
                          helperText="Format: 20 alphanumeric characters"
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Comparison */}
                  {correctedPurposeCode && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                        <CompareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Before vs After
                      </Typography>
                      <Table size="small">
                        <TableBody>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 600, width: 150 }}>Field</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Original</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Corrected</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Purpose Code</TableCell>
                            <TableCell>
                              <Chip
                                label={originalTransaction.purpose_code || 'None'}
                                size="small"
                                color="error"
                              />
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={correctedPurposeCode.code}
                                size="small"
                                color="success"
                              />
                            </TableCell>
                          </TableRow>
                          {(correctedLei.debtor || correctedLei.creditor) && (
                            <>
                              <TableRow>
                                <TableCell>Debtor LEI</TableCell>
                                <TableCell>
                                  {originalTransaction.debtor_lei || 'None'}
                                </TableCell>
                                <TableCell>
                                  {correctedLei.debtor || originalTransaction.debtor_lei || 'None'}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell>Creditor LEI</TableCell>
                                <TableCell>
                                  {originalTransaction.creditor_lei || 'None'}
                                </TableCell>
                                <TableCell>
                                  {correctedLei.creditor ||
                                    originalTransaction.creditor_lei ||
                                    'None'}
                                </TableCell>
                              </TableRow>
                            </>
                          )}
                        </TableBody>
                      </Table>
                    </Box>
                  )}
                </Collapse>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={
                      !correctedPurposeCode &&
                      !correctedLei.debtor &&
                      !correctedLei.creditor
                    }
                    endIcon={<ArrowIcon />}
                  >
                    Validate Correction
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Validate Correction */}
          {activeStep === 4 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Validate Corrected Transaction
                </Typography>

                {!validateMutation.data && !validateMutation.isPending && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                      Click the button below to validate the corrected transaction before
                      resubmission.
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleValidateCorrection}
                      startIcon={<CheckIcon />}
                    >
                      Validate Correction
                    </Button>
                  </Box>
                )}

                {validateMutation.isPending && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ mt: 2 }}>Validating...</Typography>
                  </Box>
                )}

                {validateMutation.error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>Validation Failed</AlertTitle>
                    {(validateMutation.error as Error).message}
                  </Alert>
                )}

                {validateMutation.data && (
                  <Box>
                    {/* STP Score */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <STPScoreGauge
                        score={validateMutation.data.stp_score}
                        rating={validateMutation.data.stp_rating}
                      />
                    </Box>

                    {validateMutation.data.stp_score >= 90 ? (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        <AlertTitle>Correction Validated</AlertTitle>
                        The corrected transaction passes validation with a high STP score.
                        It is ready for resubmission.
                      </Alert>
                    ) : validateMutation.data.stp_score >= 70 ? (
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <AlertTitle>Partial Issues Remain</AlertTitle>
                        The correction improved the transaction but some issues remain.
                        Review the results below.
                      </Alert>
                    ) : (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        <AlertTitle>Validation Failed</AlertTitle>
                        The corrected transaction still has significant issues.
                        Review and make additional corrections.
                      </Alert>
                    )}

                    {/* Validation Summary */}
                    <Table size="small" sx={{ mb: 3 }}>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Purpose Code</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                validateMutation.data.purpose_code_valid
                                  ? 'Valid'
                                  : 'Invalid'
                              }
                              size="small"
                              color={
                                validateMutation.data.purpose_code_valid
                                  ? 'success'
                                  : 'error'
                              }
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>LEI Status</TableCell>
                          <TableCell>
                            {validateMutation.data.lei_required ? (
                              <Chip
                                label={
                                  validateMutation.data.lei_provided
                                    ? 'Provided'
                                    : 'Required but missing'
                                }
                                size="small"
                                color={
                                  validateMutation.data.lei_provided ? 'success' : 'error'
                                }
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                Not required
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Violations</TableCell>
                          <TableCell>
                            {validateMutation.data.violation_count === 0 ? (
                              <Chip label="None" size="small" color="success" />
                            ) : (
                              <Chip
                                label={`${validateMutation.data.violation_count} issues`}
                                size="small"
                                color="error"
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    {/* Resolution Notes */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                      <NoteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Resolution Notes
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      value={resolutionNotes}
                      onChange={(e) => setResolutionNotes(e.target.value)}
                      placeholder="Document the resolution actions taken, root cause, and any follow-up needed..."
                    />

                    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                      <Button
                        onClick={() => validateMutation.reset()}
                        startIcon={<RetryIcon />}
                      >
                        Re-validate
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<CopyIcon />}
                        onClick={() => {
                          const summary = `
Exception Resolution Summary
============================
Return Code: ${returnReason?.code} - ${returnReason?.name}
Original Purpose Code: ${originalTransaction.purpose_code}
Corrected Purpose Code: ${correctedPurposeCode?.code}
Validation Score: ${validateMutation.data?.stp_score}/100
Status: ${validateMutation.data?.stp_score >= 90 ? 'Ready for Resubmission' : 'Needs Review'}
Notes: ${resolutionNotes}
                          `.trim();
                          copyToClipboard(summary);
                        }}
                      >
                        Copy Resolution Summary
                      </Button>
                    </Box>
                  </Box>
                )}

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setActiveStep(0);
                      setReturnReason(null);
                      setCustomReturnMessage('');
                      setOriginalTransaction({
                        transaction_type: 'offshore',
                        transaction_direction: 'outbound',
                        amount: '',
                        purpose_code: '',
                        debtor_iban: '',
                        creditor_iban: '',
                        debtor_lei: '',
                        creditor_lei: '',
                        remittance_info: '',
                      });
                      setCorrectedPurposeCode(null);
                      setCorrectedLei({ debtor: '', creditor: '' });
                      setResolutionNotes('');
                      validateMutation.reset();
                    }}
                    startIcon={<RetryIcon />}
                  >
                    New Investigation
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Side Panel - Context */}
        <Box>
          {/* Return Reason Quick Reference */}
          {returnReason && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Return Reason
                </Typography>
                <Chip
                  label={returnReason.code}
                  color="error"
                  sx={{ mb: 1, fontWeight: 600 }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {returnReason.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {returnReason.description}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Original Transaction Summary */}
          {activeStep >= 2 && originalTransaction.purpose_code && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Original Transaction
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ py: 0.5, fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ py: 0.5, textTransform: 'capitalize' }}>
                        {originalTransaction.transaction_type}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ py: 0.5, fontWeight: 600 }}>Amount</TableCell>
                      <TableCell sx={{ py: 0.5 }}>
                        AED {parseFloat(originalTransaction.amount || '0').toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ py: 0.5, fontWeight: 600 }}>Code</TableCell>
                      <TableCell sx={{ py: 0.5, fontFamily: 'monospace' }}>
                        {originalTransaction.purpose_code}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Corrected Values */}
          {activeStep >= 3 && correctedPurposeCode && (
            <Card sx={{ bgcolor: 'success.50' }}>
              <CardContent>
                <Typography variant="subtitle2" color="success.dark" sx={{ mb: 1 }}>
                  Correction Applied
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'success.dark' }}
                  >
                    {correctedPurposeCode.code}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  {correctedPurposeCode.name}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ExceptionInvestigation;
