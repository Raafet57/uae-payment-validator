import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Grid,
  Chip,
  Paper,
  Divider,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  SwapHoriz as SwapIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ArrowForward as ArrowIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  UAE_TO_ISO_MAPPINGS,
  INDIA_OUTWARD_TO_ISO,
  INDIA_INWARD_TO_ISO,
  ISO_CROSS_MAPPINGS,
  MAPPING_STATS,
  translateUAEtoIndia,
  translateIndiaToUAE,
  type TranslationResult,
} from '../data/isoMiddleLayer';

// Build UAE code options for autocomplete
const uaeCodeOptions = Object.entries(UAE_TO_ISO_MAPPINGS).map(([code, mapping]) => {
  const crossMapping = ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === mapping.iso);
  const uaeDetails = crossMapping?.uaeCodes.find(c => c.code === code);
  return {
    code,
    purpose: uaeDetails?.purpose || code,
    description: uaeDetails?.description || '',
    iso: mapping.iso,
    confidence: mapping.confidence,
  };
});

// Build India code options (both inward and outward)
const indiaCodeOptions = [
  ...Object.entries(INDIA_INWARD_TO_ISO).map(([code, mapping]) => {
    const crossMapping = ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === mapping.iso);
    const indiaDetails = crossMapping?.indiaCodes.find(c => c.code === code);
    return {
      code,
      purpose: indiaDetails?.purpose || code,
      description: indiaDetails?.description || '',
      iso: mapping.iso,
      confidence: mapping.confidence,
      direction: 'inward' as const,
    };
  }),
  ...Object.entries(INDIA_OUTWARD_TO_ISO).map(([code, mapping]) => {
    const crossMapping = ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === mapping.iso);
    const indiaDetails = crossMapping?.indiaCodes.find(c => c.code === code);
    return {
      code,
      purpose: indiaDetails?.purpose || code,
      description: indiaDetails?.description || '',
      iso: mapping.iso,
      confidence: mapping.confidence,
      direction: 'outward' as const,
    };
  }),
].filter((item, index, self) =>
  self.findIndex(t => t.code === item.code) === index
);

const getConfidenceColor = (confidence: string) => {
  switch (confidence) {
    case 'high': return 'success';
    case 'medium': return 'warning';
    case 'low': return 'error';
    default: return 'default';
  }
};

const getConfidenceIcon = (confidence: string): React.ReactElement | undefined => {
  switch (confidence) {
    case 'high': return <CheckIcon fontSize="small" />;
    case 'medium': return <WarningIcon fontSize="small" />;
    case 'low': return <ErrorIcon fontSize="small" />;
    default: return undefined;
  }
};

const CorridorTranslator: React.FC = () => {
  const [sourceMarket, setSourceMarket] = useState<'uae' | 'india'>('uae');
  const [, setSelectedCode] = useState<string | null>(null);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);

  const handleMarketChange = (_: React.MouseEvent<HTMLElement>, newMarket: 'uae' | 'india' | null) => {
    if (newMarket !== null) {
      setSourceMarket(newMarket);
      setSelectedCode(null);
      setTranslationResult(null);
    }
  };

  const handleCodeSelect = (code: string | null) => {
    setSelectedCode(code);
    if (code) {
      if (sourceMarket === 'uae') {
        setTranslationResult(translateUAEtoIndia(code));
      } else {
        setTranslationResult(translateIndiaToUAE(code));
      }
    } else {
      setTranslationResult(null);
    }
  };

  const codeOptions = sourceMarket === 'uae' ? uaeCodeOptions : indiaCodeOptions;

  // Get ISO mapping details for display
  const isoMapping = useMemo(() => {
    if (!translationResult) return null;
    return ISO_CROSS_MAPPINGS.find(m => m.isoCode.code === translationResult.isoCode.code);
  }, [translationResult]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Corridor Code Translator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Translate purpose codes between UAE and India using ISO 20022 as the universal pivot layer
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {MAPPING_STATS.totalISOCodes}
            </Typography>
            <Typography variant="body2">ISO 20022 Codes</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#006C35', color: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {MAPPING_STATS.totalUAEMappings}
            </Typography>
            <Typography variant="body2">UAE Mappings</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#FF9933', color: 'white' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {MAPPING_STATS.totalIndiaInwardMappings + MAPPING_STATS.totalIndiaOutwardMappings}
            </Typography>
            <Typography variant="body2">India Mappings</Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
              {MAPPING_STATS.highConfidenceMappings}
            </Typography>
            <Typography variant="body2" color="text.secondary">High Confidence</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Translator Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Source Market Selection */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Select Source Market
              </Typography>
              <ToggleButtonGroup
                value={sourceMarket}
                exclusive
                onChange={handleMarketChange}
                sx={{ mb: 2 }}
              >
                <ToggleButton value="uae" sx={{ px: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 24, height: 16, display: 'flex' }}>
                      <Box sx={{ flex: 1, bgcolor: '#006C35' }} />
                      <Box sx={{ flex: 1, bgcolor: '#FFFFFF', border: '1px solid #ddd' }} />
                      <Box sx={{ flex: 1, bgcolor: '#000000' }} />
                      <Box sx={{ flex: 1, bgcolor: '#CE1126' }} />
                    </Box>
                    UAE
                  </Box>
                </ToggleButton>
                <ToggleButton value="india" sx={{ px: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 24, height: 16, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ flex: 1, bgcolor: '#FF9933' }} />
                      <Box sx={{ flex: 1, bgcolor: '#FFFFFF', border: '1px solid #ddd' }} />
                      <Box sx={{ flex: 1, bgcolor: '#138808' }} />
                    </Box>
                    India
                  </Box>
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>

            {/* Code Selection */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Autocomplete
                options={codeOptions}
                getOptionLabel={(option) => `${option.code} - ${option.purpose}`}
                renderOption={(props, option) => {
                  const { key, ...otherProps } = props;
                  return (
                    <li key={key} {...otherProps}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <>
                              <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                                {option.code}
                              </Typography>
                              <Chip
                                size="small"
                                label={option.confidence}
                                color={getConfidenceColor(option.confidence) as 'success' | 'warning' | 'error'}
                                sx={{ height: 20, fontSize: '0.7rem' }}
                              />
                              {'direction' in option && option.direction && (
                                <Chip
                                  size="small"
                                  label={String(option.direction)}
                                  variant="outlined"
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                              )}
                            </>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {option.purpose}
                          </Typography>
                        </>
                      </Box>
                    </li>
                  );
                }}
                onChange={(_, value) => handleCodeSelect(value?.code || null)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`${sourceMarket === 'uae' ? 'UAE' : 'India'} Purpose Code`}
                    placeholder={`Search ${sourceMarket === 'uae' ? 'UAE' : 'India'} codes...`}
                  />
                )}
                fullWidth
              />
            </Grid>

            {/* Arrow */}
            <Grid size={{ xs: 12, md: 2 }} sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <ArrowIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography variant="caption" color="text.secondary">
                  via ISO
                </Typography>
                <ArrowIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </Box>
            </Grid>

            {/* Destination */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  bgcolor: translationResult ? 'background.paper' : 'grey.50',
                  minHeight: 80,
                }}
              >
                {translationResult ? (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {sourceMarket === 'uae' ? 'India' : 'UAE'} Equivalent(s)
                    </Typography>
                    {sourceMarket === 'uae' ? (
                      translationResult.indiaCodes.length > 0 ? (
                        translationResult.indiaCodes.map((code, idx) => (
                          <Box key={idx} sx={{ mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                                {code.code}
                              </Typography>
                              {code.direction && (
                                <Chip
                                  size="small"
                                  label={code.direction}
                                  color={code.direction === 'inward' ? 'success' : 'info'}
                                  sx={{ height: 20, fontSize: '0.7rem' }}
                                />
                              )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {code.purpose}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Typography color="text.secondary">No direct India equivalent</Typography>
                      )
                    ) : (
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                            {translationResult.uaeCode.code}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {translationResult.uaeCode.purpose}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Select a code to see translations
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Translation Details */}
      {translationResult && (
        <Grid container spacing={3}>
          {/* ISO Pivot */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SwapIcon color="primary" />
                  ISO 20022 Pivot
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 2, color: 'white', mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    {translationResult.isoCode.code}
                  </Typography>
                  <Typography variant="body2">
                    {translationResult.isoCode.name}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {translationResult.isoCode.definition}
                </Typography>
                <Chip
                  label={translationResult.isoCode.category}
                  size="small"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Confidence & Notes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InfoIcon color="primary" />
                  Mapping Quality
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Confidence Level
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {getConfidenceIcon(translationResult.confidence)}
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: `${getConfidenceColor(translationResult.confidence)}.main`,
                        textTransform: 'capitalize',
                      }}
                    >
                      {translationResult.confidence}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={
                      translationResult.confidence === 'high' ? 100 :
                      translationResult.confidence === 'medium' ? 66 : 33
                    }
                    color={getConfidenceColor(translationResult.confidence) as 'success' | 'warning' | 'error'}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Bidirectional
                  </Typography>
                  <Chip
                    icon={translationResult.bidirectional ? <CheckIcon /> : <ErrorIcon />}
                    label={translationResult.bidirectional ? 'Yes - Works both ways' : 'Limited direction'}
                    color={translationResult.bidirectional ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>

                {isoMapping?.notes && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    {isoMapping.notes}
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Thunes Context */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%', bgcolor: 'primary.dark', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Thunes Impact
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    STP Risk Assessment
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {translationResult.confidence === 'high' ? (
                      'Low risk - Direct semantic match between markets. High auto-routing potential.'
                    ) : translationResult.confidence === 'medium' ? (
                      'Medium risk - Partial alignment. May require manual review for high-value transactions.'
                    ) : (
                      'High risk - Weak alignment. Consider fallback codes or manual intervention.'
                    )}
                  </Typography>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    Recommended Action
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {translationResult.confidence === 'high' ? (
                      'Auto-translate with confidence. Include ISO code in SWIFT MT103 field 70.'
                    ) : translationResult.confidence === 'medium' ? (
                      'Validate against transaction context. Consider enriching with additional metadata.'
                    ) : (
                      'Flag for compliance review. Use generic fallback code if necessary.'
                    )}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* All Mappings Table */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Complete Cross-Market Mapping Table
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            All {ISO_CROSS_MAPPINGS.length} ISO 20022 categories with UAE and India code equivalents
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 700 }}>ISO Code</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>UAE Codes</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>India Codes</TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: 'center' }}>Confidence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ISO_CROSS_MAPPINGS.map((mapping) => (
                  <TableRow
                    key={mapping.isoCode.code}
                    hover
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <TableCell>
                      <Tooltip title={mapping.isoCode.definition}>
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                            {mapping.isoCode.code}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {mapping.isoCode.name}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip label={mapping.isoCode.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      {mapping.uaeCodes.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {mapping.uaeCodes.map((code, idx) => (
                            <Tooltip key={idx} title={code.purpose}>
                              <Chip
                                label={code.code}
                                size="small"
                                sx={{ bgcolor: '#006C35', color: 'white', fontFamily: 'monospace' }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          No direct mapping
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {mapping.indiaCodes.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {mapping.indiaCodes.map((code, idx) => (
                            <Tooltip key={idx} title={`${code.purpose} (${code.direction})`}>
                              <Chip
                                label={code.code}
                                size="small"
                                sx={{ bgcolor: '#FF9933', color: 'white', fontFamily: 'monospace' }}
                              />
                            </Tooltip>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          No direct mapping
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        icon={getConfidenceIcon(mapping.confidence)}
                        label={mapping.confidence}
                        color={getConfidenceColor(mapping.confidence) as 'success' | 'warning' | 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Key Insight */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Why ISO 20022 as Middle Layer?
        </Typography>
        <Typography variant="body2">
          ISO 20022 is the emerging global standard for financial messaging (SWIFT, SEPA, FedNow, India NEFT/RTGS).
          By mapping proprietary codes to ISO, Thunes can achieve semantic interoperability across markets without
          maintaining N×N bilateral mappings. This is especially powerful for the UAE→India corridor where FAM (UAE)
          directly maps to P1301 (India inward) via FAMI (ISO), enabling high STP rates for family remittances.
        </Typography>
      </Alert>
    </Box>
  );
};

export default CorridorTranslator;
