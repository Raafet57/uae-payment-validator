import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  CheckCircle as ValidateIcon,
  AccountBalance as IBANIcon,
  Search as ExploreIcon,
  Description as DocsIcon,
  TrendingUp as TrendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { codesApi, healthApi } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: healthApi.getHealth,
  });

  const { data: staticCodes, isLoading: codesLoading } = useQuery({
    queryKey: ['staticCodes'],
    queryFn: codesApi.getStaticCodes,
  });

  const quickActions = [
    {
      title: 'Validate Transaction',
      description: 'Check UAEFTS compliance for payments',
      icon: <ValidateIcon sx={{ fontSize: 40 }} />,
      path: '/validate',
      color: '#006C35',
    },
    {
      title: 'IBAN Validator',
      description: 'Verify UAE bank account numbers',
      icon: <IBANIcon sx={{ fontSize: 40 }} />,
      path: '/iban',
      color: '#0284C7',
    },
    {
      title: 'Code Explorer',
      description: 'Browse 117 UAE purpose codes',
      icon: <ExploreIcon sx={{ fontSize: 40 }} />,
      path: '/codes',
      color: '#C8A415',
    },
    {
      title: 'Documentation',
      description: 'UAEFTS AUX700 compliance guide',
      icon: <DocsIcon sx={{ fontSize: 40 }} />,
      path: '/docs',
      color: '#6B7280',
    },
  ];

  const complianceRules = [
    {
      title: 'Purpose Code Required',
      description: 'Mandatory for all offshore payments',
      impact: 'AED 1,000 penalty per violation',
    },
    {
      title: 'LEI for High Value',
      description: 'Required for transactions >= AED 1,000,000',
      impact: 'Reject or manual review',
    },
    {
      title: 'Valid UAE IBAN',
      description: 'Format: AE + 21 digits',
      impact: 'STP failure',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          UAE Payment Validator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          UAEFTS AUX700 compliant payment validation for the United Arab Emirates
        </Typography>
      </Box>

      {/* API Status Alert */}
      {health?.status === 'healthy' ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          API Connected - {health.config?.total_purpose_codes || 117} purpose codes loaded
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 3 }}>
          API connection unavailable. Some features may be limited.
        </Alert>
      )}

      {/* Stats Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Typography variant="overline" sx={{ opacity: 0.8 }}>
              Purpose Codes
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              {codesLoading ? '...' : staticCodes?.total_codes || 117}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              UAEFTS registered codes
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Categories
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              {codesLoading ? '...' : staticCodes?.total_categories || 17}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Payment categories
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              LEI Threshold
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main' }}>
              1M
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AED high-value limit
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Penalty
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main' }}>
              1K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AED per violation
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Quick Actions
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        {quickActions.map((action) => (
          <Card
            key={action.path}
            sx={{
              height: '100%',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 8px 24px ${action.color}25`,
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate(action.path)}
              sx={{ height: '100%', p: 2 }}
            >
              <Box sx={{ color: action.color, mb: 2 }}>{action.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {action.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {action.description}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* Two Column Layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {/* Compliance Rules */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <WarningIcon color="warning" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Key Compliance Rules
              </Typography>
            </Box>
            {complianceRules.map((rule, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  borderLeft: '4px solid',
                  borderColor: 'warning.main',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {rule.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {rule.description}
                </Typography>
                <Chip
                  label={rule.impact}
                  size="small"
                  color="error"
                  variant="outlined"
                />
              </Box>
            ))}
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <TrendingIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Purpose Code Categories
              </Typography>
            </Box>
            {codesLoading ? (
              <LinearProgress />
            ) : (
              <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                {staticCodes?.categories?.slice(0, 8).map((category) => (
                  <Box
                    key={category.category_code}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {category.category_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.category_code}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`${category.code_count} codes`}
                        size="small"
                        variant="outlined"
                      />
                      {category.is_cross_border_only && (
                        <Chip
                          label="Cross-border"
                          size="small"
                          color="primary"
                        />
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: 'pointer', fontWeight: 500 }}
                onClick={() => navigate('/codes')}
              >
                View all {staticCodes?.total_categories || 17} categories
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Footer Info */}
      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Based on UAEFTS AUX700 V2018-001-01 specifications by the Central Bank of UAE
        </Typography>
        <Typography variant="caption" color="text.secondary">
          For official documentation, visit{' '}
          <a href="https://www.centralbank.ae" target="_blank" rel="noopener noreferrer">
            centralbank.ae
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
