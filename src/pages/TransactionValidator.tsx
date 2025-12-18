import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Autocomplete,
  InputAdornment,
  FormControl,
  FormLabel,
  Divider,
  Alert,
  CircularProgress,
  Collapse,
} from '@mui/material';
import {
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  ArrowDownward as InboundIcon,
  ArrowUpward as OutboundIcon,
  Send as ValidateIcon,
  Refresh as ResetIcon,
} from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { validationApi, codesApi } from '../services/api';
import { UAEValidationRequest, UAEPurposeCode } from '../types';
import { IBANInput, ValidationResults } from '../components';

const TransactionValidator: React.FC = () => {
  const [formData, setFormData] = useState<UAEValidationRequest>({
    transaction_type: 'offshore',
    transaction_direction: 'outbound',
    amount: 0,
    currency: 'AED',
    purpose_code: '',
    debtor_iban: '',
    creditor_iban: '',
    debtor_lei: '',
    creditor_lei: '',
    remittance_info: '',
  });

  const [selectedCode, setSelectedCode] = useState<UAEPurposeCode | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch purpose codes for autocomplete
  const { data: codesData } = useQuery({
    queryKey: ['codes', formData.transaction_type],
    queryFn: () => codesApi.getCodes({ transaction_type: formData.transaction_type, limit: 200 }),
  });

  // Filter codes based on transaction type
  const availableCodes = useMemo(() => {
    if (!codesData?.codes) return [];
    return codesData.codes.filter((code) => {
      if (formData.transaction_type === 'domestic') {
        return code.applies_to_domestic;
      }
      return code.applies_to_offshore;
    });
  }, [codesData, formData.transaction_type]);

  // Validation mutation
  const validateMutation = useMutation({
    mutationFn: validationApi.validateTransaction,
    onSuccess: () => {
      setShowResults(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(false);
    validateMutation.mutate(formData);
  };

  const handleReset = () => {
    setFormData({
      transaction_type: 'offshore',
      transaction_direction: 'outbound',
      amount: 0,
      currency: 'AED',
      purpose_code: '',
      debtor_iban: '',
      creditor_iban: '',
      debtor_lei: '',
      creditor_lei: '',
      remittance_info: '',
    });
    setSelectedCode(null);
    setShowResults(false);
    validateMutation.reset();
  };

  const handleCodeChange = (_: React.SyntheticEvent, value: UAEPurposeCode | null) => {
    setSelectedCode(value);
    setFormData((prev) => ({
      ...prev,
      purpose_code: value?.code || '',
    }));
  };

  // Determine if LEI fields should be highlighted (high value transaction)
  const isHighValue = formData.amount >= 1000000;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Transaction Validator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Validate UAE payment transactions against UAEFTS AUX700 requirements
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3 }}>
        {/* Validation Form */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Transaction Type */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Transaction Type</FormLabel>
                <ToggleButtonGroup
                  value={formData.transaction_type}
                  exclusive
                  onChange={(_, value) => {
                    if (value) {
                      setFormData((prev) => ({ ...prev, transaction_type: value }));
                      setSelectedCode(null);
                    }
                  }}
                  fullWidth
                >
                  <ToggleButton value="domestic" sx={{ py: 1.5 }}>
                    <DomesticIcon sx={{ mr: 1 }} />
                    Domestic
                  </ToggleButton>
                  <ToggleButton value="offshore" sx={{ py: 1.5 }}>
                    <OffshoreIcon sx={{ mr: 1 }} />
                    Offshore / Cross-border
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              {/* Transaction Direction */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Direction</FormLabel>
                <ToggleButtonGroup
                  value={formData.transaction_direction}
                  exclusive
                  onChange={(_, value) => {
                    if (value) setFormData((prev) => ({ ...prev, transaction_direction: value }));
                  }}
                  fullWidth
                >
                  <ToggleButton value="inbound" sx={{ py: 1.5 }}>
                    <InboundIcon sx={{ mr: 1 }} />
                    Inbound
                  </ToggleButton>
                  <ToggleButton value="outbound" sx={{ py: 1.5 }}>
                    <OutboundIcon sx={{ mr: 1 }} />
                    Outbound
                  </ToggleButton>
                </ToggleButtonGroup>
              </FormControl>

              <Divider sx={{ my: 3 }} />

              {/* Amount and Currency */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2, mb: 3 }}>
                <TextField
                  label="Amount"
                  type="number"
                  value={formData.amount || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))
                  }
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                  }}
                  helperText={isHighValue ? 'High value - LEI required' : ''}
                  error={isHighValue && !formData.debtor_lei}
                />
                <TextField
                  label="Currency"
                  value={formData.currency}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, currency: e.target.value.toUpperCase() }))
                  }
                  required
                />
              </Box>

              {/* Purpose Code */}
              <Autocomplete
                options={availableCodes}
                getOptionLabel={(option) => `${option.code} - ${option.name}`}
                value={selectedCode}
                onChange={handleCodeChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Purpose Code"
                    required={formData.transaction_type === 'offshore'}
                    helperText={
                      formData.transaction_type === 'offshore'
                        ? 'Required for offshore transactions'
                        : 'Optional for domestic transactions'
                    }
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.code}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {option.code} - {option.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.category_name}
                      </Typography>
                    </Box>
                  </li>
                )}
                sx={{ mb: 3 }}
              />

              <Divider sx={{ my: 3 }} />

              {/* IBAN Fields */}
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Account Information
              </Typography>

              <Box sx={{ mb: 3 }}>
                <IBANInput
                  label="Debtor IBAN (Sender)"
                  value={formData.debtor_iban || ''}
                  onChange={(value) => setFormData((prev) => ({ ...prev, debtor_iban: value }))}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <IBANInput
                  label="Creditor IBAN (Recipient)"
                  value={formData.creditor_iban || ''}
                  onChange={(value) => setFormData((prev) => ({ ...prev, creditor_iban: value }))}
                />
              </Box>

              {/* LEI Fields - Highlighted for high value */}
              <Collapse in={isHighValue || !!formData.debtor_lei || !!formData.creditor_lei}>
                <Alert
                  severity={isHighValue && !formData.debtor_lei ? 'warning' : 'info'}
                  sx={{ mb: 2 }}
                >
                  {isHighValue
                    ? 'LEI is required for transactions >= AED 1,000,000'
                    : 'LEI is optional for this transaction amount'}
                </Alert>

                <TextField
                  fullWidth
                  label="Debtor LEI"
                  value={formData.debtor_lei || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      debtor_lei: e.target.value.toUpperCase().slice(0, 20),
                    }))
                  }
                  placeholder="20-character Legal Entity Identifier"
                  sx={{ mb: 2 }}
                  error={isHighValue && !formData.debtor_lei}
                  InputProps={{
                    sx: { fontFamily: 'monospace' },
                  }}
                />

                <TextField
                  fullWidth
                  label="Creditor LEI"
                  value={formData.creditor_lei || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      creditor_lei: e.target.value.toUpperCase().slice(0, 20),
                    }))
                  }
                  placeholder="20-character Legal Entity Identifier"
                  sx={{ mb: 3 }}
                  InputProps={{
                    sx: { fontFamily: 'monospace' },
                  }}
                />
              </Collapse>

              {/* Remittance Info */}
              <TextField
                fullWidth
                label="Remittance Information"
                value={formData.remittance_info || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, remittance_info: e.target.value }))
                }
                multiline
                rows={2}
                placeholder="Additional payment details..."
                sx={{ mb: 3 }}
              />

              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={
                    validateMutation.isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <ValidateIcon />
                    )
                  }
                  disabled={validateMutation.isPending}
                  sx={{ flex: 1 }}
                >
                  {validateMutation.isPending ? 'Validating...' : 'Validate Transaction'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ResetIcon />}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Box>
          {validateMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Validation failed. Please check your connection and try again.
            </Alert>
          )}

          {showResults && validateMutation.data && (
            <ValidationResults response={validateMutation.data} />
          )}

          {!showResults && !validateMutation.isPending && (
            <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ValidateIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  Fill in the form and click "Validate Transaction"
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Results will appear here
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TransactionValidator;
