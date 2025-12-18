import React, { useState, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  CheckCircle as ValidIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { validationApi } from '../services/api';

interface IBANInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  onValidationResult?: (result: {
    is_valid: boolean;
    bank_name?: string | null;
    error_message?: string | null;
  }) => void;
}

const IBANInput: React.FC<IBANInputProps> = ({
  value,
  onChange,
  label = 'IBAN',
  error,
  helperText,
  required = false,
  disabled = false,
  onValidationResult,
}) => {
  const [bankName, setBankName] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateMutation = useMutation({
    mutationFn: validationApi.validateIBAN,
    onSuccess: (data) => {
      setIsValid(data.is_valid);
      setBankName(data.bank_name || null);
      setValidationError(data.error_message || null);
      onValidationResult?.({
        is_valid: data.is_valid,
        bank_name: data.bank_name,
        error_message: data.error_message,
      });
    },
    onError: () => {
      setIsValid(false);
      setValidationError('Validation service unavailable');
    },
  });

  // Format IBAN for display (add spaces every 4 characters)
  const formatIBAN = (iban: string): string => {
    const cleaned = iban.replace(/\s/g, '').toUpperCase();
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  // Clean IBAN for storage (remove spaces)
  const cleanIBAN = (iban: string): string => {
    return iban.replace(/\s/g, '').toUpperCase();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanIBAN(e.target.value);
    // Limit to 23 characters for UAE IBAN
    if (cleaned.length <= 23) {
      onChange(cleaned);
      // Reset validation state when typing
      setIsValid(null);
      setBankName(null);
      setValidationError(null);
    }
  };

  const handleBlur = () => {
    // Validate on blur if we have a value that looks like a complete IBAN
    if (value && value.length >= 15) {
      validateMutation.mutate(value);
    }
  };

  // Auto-validate when value changes and is complete UAE IBAN length
  useEffect(() => {
    if (value && value.length === 23 && value.startsWith('AE')) {
      const timeoutId = setTimeout(() => {
        validateMutation.mutate(value);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [value]);

  const getEndAdornment = () => {
    if (validateMutation.isPending) {
      return <CircularProgress size={20} />;
    }
    if (isValid === true) {
      return <ValidIcon sx={{ color: 'success.main' }} />;
    }
    if (isValid === false) {
      return <ErrorIcon sx={{ color: 'error.main' }} />;
    }
    return null;
  };

  const displayHelperText = () => {
    if (error) return error;
    if (validationError) return validationError;
    if (bankName) return `Bank: ${bankName}`;
    if (helperText) return helperText;
    return 'UAE format: AE + 21 digits';
  };

  return (
    <Box>
      <TextField
        fullWidth
        label={label}
        value={formatIBAN(value)}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!error || isValid === false}
        helperText={displayHelperText()}
        required={required}
        disabled={disabled}
        placeholder="AE07 0331 2345 6789 0123 456"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{getEndAdornment()}</InputAdornment>
          ),
          sx: {
            fontFamily: 'monospace',
            letterSpacing: 1,
          },
        }}
      />
      {isValid && bankName && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 0.5,
            color: 'success.main',
            fontWeight: 500,
          }}
        >
          Valid UAE IBAN
        </Typography>
      )}
    </Box>
  );
};

export default IBANInput;
