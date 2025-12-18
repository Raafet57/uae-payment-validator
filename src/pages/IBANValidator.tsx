import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  CheckCircle as ValidIcon,
  Cancel as InvalidIcon,
  Search as SearchIcon,
  AccountBalance as BankIcon,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { validationApi } from '../services/api';
import { IBANValidationResponse } from '../types';
import { formatIBAN, UAE_BANK_CODES } from '../utils/formatters';

const IBANValidator: React.FC = () => {
  const [iban, setIban] = useState('');
  const [result, setResult] = useState<IBANValidationResponse | null>(null);

  const validateMutation = useMutation({
    mutationFn: validationApi.validateIBAN,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = iban.replace(/\s/g, '').toUpperCase();
    if (cleaned.length > 0) {
      validateMutation.mutate(cleaned);
    }
  };

  const handleIBANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '').toUpperCase();
    if (value.length <= 23) {
      setIban(value);
      setResult(null);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          UAE IBAN Validator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Validate and parse UAE International Bank Account Numbers
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Validation Form */}
        <Box>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Enter UAE IBAN"
                  value={formatIBAN(iban)}
                  onChange={handleIBANChange}
                  placeholder="AE07 0331 2345 6789 0123 456"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BankIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: { fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: 1 },
                  }}
                  helperText={`${iban.length}/23 characters`}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={
                    validateMutation.isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  disabled={validateMutation.isPending || iban.length < 15}
                >
                  Validate IBAN
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  {result.is_valid ? (
                    <ValidIcon sx={{ fontSize: 48, color: 'success.main' }} />
                  ) : (
                    <InvalidIcon sx={{ fontSize: 48, color: 'error.main' }} />
                  )}
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {result.is_valid ? 'Valid UAE IBAN' : 'Invalid IBAN'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.formatted_iban || formatIBAN(result.iban)}
                    </Typography>
                  </Box>
                </Box>

                {result.error_message && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {result.error_message}
                  </Alert>
                )}

                {result.is_valid && (
                  <TableContainer>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, width: 140 }}>Country</TableCell>
                          <TableCell>United Arab Emirates (AE)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Check Digits</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{result.check_digits}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Bank Code</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{result.bank_code}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Bank Name</TableCell>
                          <TableCell>{result.bank_name || 'Unknown Bank'}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Account Number</TableCell>
                          <TableCell sx={{ fontFamily: 'monospace' }}>{result.account_number}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Info Panel */}
        <Box>
          {/* IBAN Format Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                UAE IBAN Format
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label="AE" size="small" color="primary" />
                  <Chip label="XX" size="small" color="secondary" />
                  <Chip label="YYY" size="small" color="info" />
                  <Chip label="ZZZZ..." size="small" variant="outlined" />
                </Box>
                <Typography variant="caption" component="div" sx={{ mt: 2 }}>
                  <strong>AE</strong> = Country Code (2 chars)
                </Typography>
                <Typography variant="caption" component="div">
                  <strong>XX</strong> = Check Digits (2 digits)
                </Typography>
                <Typography variant="caption" component="div">
                  <strong>YYY</strong> = Bank Code (3 digits)
                </Typography>
                <Typography variant="caption" component="div">
                  <strong>ZZZZ...</strong> = Account Number (16 digits)
                </Typography>
              </Box>
              <Alert severity="info" icon={false}>
                <Typography variant="body2">
                  <strong>Total Length:</strong> 23 characters
                </Typography>
                <Typography variant="body2">
                  <strong>Pattern:</strong> AE + 21 digits
                </Typography>
              </Alert>
            </CardContent>
          </Card>

          {/* UAE Banks Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                UAE Bank Codes
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Code</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Bank Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(UAE_BANK_CODES).map(([code, name]) => (
                      <TableRow key={code}>
                        <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {code}
                        </TableCell>
                        <TableCell>{name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Common UAE bank codes. Other codes may also be valid.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default IBANValidator;
