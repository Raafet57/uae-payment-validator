import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as PassIcon,
  Cancel as FailIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Lightbulb as RecommendationIcon,
} from '@mui/icons-material';
import { UAEValidationResponse, ValidationResult, Recommendation } from '../types';
import STPScoreGauge from './STPScoreGauge';

interface ValidationResultsProps {
  response: UAEValidationResponse;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ response }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <PassIcon sx={{ color: 'success.main', fontSize: 20 }} />;
      case 'fail':
        return <FailIcon sx={{ color: 'error.main', fontSize: 20 }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main', fontSize: 20 }} />;
      default:
        return <InfoIcon sx={{ color: 'info.main', fontSize: 20 }} />;
    }
  };

  const getStatusChip = (status: string) => {
    const colors: Record<string, 'success' | 'error' | 'warning' | 'info'> = {
      pass: 'success',
      fail: 'error',
      warning: 'warning',
      skipped: 'info',
    };
    return (
      <Chip
        label={status.toUpperCase()}
        color={colors[status] || 'default'}
        size="small"
        sx={{ minWidth: 80 }}
      />
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Summary Card */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
            {/* STP Score */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <STPScoreGauge score={response.stp_score} rating={response.stp_rating} size="large" />
              <Box>
                <Typography variant="h6" gutterBottom>
                  Validation Summary
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={`${response.summary.passed} Passed`}
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${response.summary.failed} Failed`}
                    color="error"
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`${response.summary.warnings} Warnings`}
                    color="warning"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>

            {/* Compliance Status */}
            <Box sx={{ textAlign: 'right' }}>
              <Chip
                label={response.summary.uaefts_compliant ? 'UAEFTS Compliant' : 'Non-Compliant'}
                color={response.summary.uaefts_compliant ? 'success' : 'error'}
                sx={{ mb: 1, fontWeight: 600 }}
              />
              {response.total_penalty_risk_aed > 0 && (
                <Typography variant="body2" color="error.main" sx={{ fontWeight: 600 }}>
                  Penalty Risk: {formatCurrency(response.total_penalty_risk_aed)}
                </Typography>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Quick Stats */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
            <Box>
              <Typography variant="caption" color="text.secondary">Purpose Code</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {response.purpose_code || 'Not provided'}
                {response.purpose_code_valid && <PassIcon sx={{ ml: 0.5, fontSize: 16, color: 'success.main' }} />}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Transaction Type</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {response.transaction_type}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">Direction</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                {response.transaction_direction}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">LEI Status</Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {response.lei_required ? (response.lei_provided ? 'Provided' : 'Required') : 'Not Required'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {response.recommendations.length > 0 && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <RecommendationIcon color="warning" />
              <Typography variant="h6">Recommendations</Typography>
            </Box>
            {response.recommendations.map((rec: Recommendation, index: number) => (
              <Alert
                key={index}
                severity={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'info'}
                sx={{ mb: 1 }}
              >
                <AlertTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={rec.priority.toUpperCase()}
                    color={getPriorityColor(rec.priority) as 'error' | 'warning' | 'info'}
                    size="small"
                  />
                  {rec.field_code}
                </AlertTitle>
                <Typography variant="body2">{rec.reason}</Typography>
                {rec.suggested_value && (
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                    Suggested: {rec.suggested_value}
                  </Typography>
                )}
                {rec.stp_improvement > 0 && (
                  <Typography variant="caption" color="success.main">
                    STP improvement: +{rec.stp_improvement} points
                  </Typography>
                )}
              </Alert>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Detailed Results */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Detailed Validation Results</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Rule</TableCell>
                  <TableCell>Field</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell align="right">STP Impact</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {response.results.map((result: ValidationResult, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      bgcolor: result.validation_status === 'fail' ? 'error.50' :
                               result.validation_status === 'warning' ? 'warning.50' : 'inherit'
                    }}
                  >
                    <TableCell>{getStatusIcon(result.validation_status)}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {result.rule_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {result.rule_code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={result.field_code} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {result.field_value || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {result.error_message && (
                        <Typography variant="body2" color="error.main">
                          {result.error_message}
                        </Typography>
                      )}
                      {result.remediation_suggestion && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {result.remediation_suggestion}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          color: result.stp_impact < 0 ? 'error.main' : 'text.secondary',
                          fontWeight: result.stp_impact < 0 ? 600 : 400,
                        }}
                      >
                        {result.stp_impact !== 0 ? result.stp_impact : '-'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      {/* Session Info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
        <Typography variant="caption">
          Session: {response.session_uuid}
        </Typography>
        <Typography variant="caption">
          Processing time: {response.processing_time_ms}ms
        </Typography>
      </Box>
    </Box>
  );
};

export default ValidationResults;
