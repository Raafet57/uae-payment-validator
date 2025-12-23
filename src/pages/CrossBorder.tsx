import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tabs,
  Tab,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  SwapHoriz as SwapIcon,
  Warning as WarningIcon,
  ArrowForward as ArrowIcon,
  FlightTakeoff as FlightIcon,
  CompareArrows as CompareIcon,
  Search as SearchIcon,
  Public as ISOIcon,
  AccountBalance as BOPIcon,
  Flag as UAEIcon,
} from '@mui/icons-material';
import {
  UAE_TO_ISO_MAPPINGS,
  INDIA_OUTWARD_TO_ISO,
  INDIA_INWARD_TO_ISO,
  ISO_CROSS_MAPPINGS,
  MULTI_MARKET_MAPPINGS,
  MAPPING_STATS,
  translateUAEtoIndia,
  translateIndiaToUAE,
  type MarketCodeMapping,
  type TranslationResult,
} from '../data/isoMiddleLayer';
import TranslationFlowDiagram from '../components/TranslationFlowDiagram';
import {
  UAE_TAXONOMY_MAPPINGS,
  getMappingStatistics,
} from '../data/taxonomyMapping';
import {
  UAE_CORRIDORS,
  CORRIDOR_MARKETS,
  CORRIDOR_STATS,
  getComplexityColor,
  getComplexityLabel,
} from '../data/corridorData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

// Flag component
const CountryFlag: React.FC<{ code: string; size?: number }> = ({ code, size = 24 }) => {
  const flagUrl = `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  return (
    <img
      src={flagUrl}
      alt={code}
      style={{ width: size, height: size * 0.75, objectFit: 'cover', borderRadius: 2 }}
    />
  );
};

// Confidence chip component
const ConfidenceChip: React.FC<{ confidence: string }> = ({ confidence }) => {
  const config: Record<string, { color: 'success' | 'warning' | 'error'; label: string }> = {
    high: { color: 'success', label: 'High' },
    exact: { color: 'success', label: 'Exact' },
    medium: { color: 'warning', label: 'Medium' },
    close: { color: 'warning', label: 'Close' },
    low: { color: 'error', label: 'Low' },
    partial: { color: 'error', label: 'Partial' },
  };
  const cfg = config[confidence] || { color: 'warning', label: confidence };
  return <Chip label={cfg.label} size="small" color={cfg.color} />;
};

// Build code options
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

const indiaCodeOptions = [
  ...Object.entries(INDIA_INWARD_TO_ISO).map(([code, mapping]) => ({
    code,
    iso: mapping.iso,
    confidence: mapping.confidence,
    direction: 'inward' as const,
  })),
  ...Object.entries(INDIA_OUTWARD_TO_ISO).map(([code, mapping]) => ({
    code,
    iso: mapping.iso,
    confidence: mapping.confidence,
    direction: 'outward' as const,
  })),
].filter((item, index, self) => self.findIndex(t => t.code === item.code) === index);

const CrossBorder: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  // Corridors tab state
  const [selectedCorridor, setSelectedCorridor] = useState<string>('IN');

  // Translator tab state
  const [translationDirection, setTranslationDirection] = useState<'uae-to-india' | 'india-to-uae'>('uae-to-india');
  const [selectedUAECode, setSelectedUAECode] = useState<typeof uaeCodeOptions[0] | null>(null);
  const [selectedIndiaCode, setSelectedIndiaCode] = useState<typeof indiaCodeOptions[0] | null>(null);
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);

  // Mapping tab state
  const [mappingSearch, setMappingSearch] = useState('');
  const [taxonomyFilter, setTaxonomyFilter] = useState<string>('');

  const corridorInfo = UAE_CORRIDORS.find(c => c.receive.code === selectedCorridor);
  const destinationMarket = CORRIDOR_MARKETS[selectedCorridor];
  const stats = getMappingStatistics();

  // Filtered taxonomy mappings
  const filteredMappings = useMemo(() => {
    let mappings = UAE_TAXONOMY_MAPPINGS;

    if (mappingSearch) {
      const search = mappingSearch.toLowerCase();
      mappings = mappings.filter(
        m =>
          m.uaeCode.toLowerCase().includes(search) ||
          m.uaeName.toLowerCase().includes(search) ||
          (m.isoCode && m.isoCode.toLowerCase().includes(search))
      );
    }

    if (taxonomyFilter) {
      mappings = mappings.filter(m => m.taxonomyL0 === taxonomyFilter);
    }

    return mappings;
  }, [mappingSearch, taxonomyFilter]);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Cross-Border Intelligence
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze corridors, translate codes, and explore taxonomy mappings
        </Typography>
      </Box>

      {/* Tabs */}
      <Card>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab icon={<FlightIcon />} iconPosition="start" label="Corridors" />
          <Tab icon={<SwapIcon />} iconPosition="start" label="Translate" />
          <Tab icon={<CompareIcon />} iconPosition="start" label="Full Mapping" />
        </Tabs>

        {/* Corridors Tab */}
        <TabPanel value={tabValue} index={0}>
          <CardContent>
            {/* Stats Overview */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                    {CORRIDOR_STATS.totalMarkets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Markets</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                    {CORRIDOR_STATS.totalCodes.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Total Codes</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                    {CORRIDOR_STATS.isoAlignedMarkets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">ISO Aligned</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
                    {CORRIDOR_STATS.proprietaryMarkets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">Proprietary</Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Corridor Selector */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Select Corridor
            </Typography>
            <ToggleButtonGroup
              value={selectedCorridor}
              exclusive
              onChange={(_, v) => v && setSelectedCorridor(v)}
              sx={{ mb: 3, flexWrap: 'wrap' }}
            >
              {UAE_CORRIDORS.map((corridor) => (
                <ToggleButton key={corridor.receive.code} value={corridor.receive.code} sx={{ px: 2 }}>
                  <CountryFlag code={corridor.receive.code} size={20} />
                  <Box sx={{ ml: 1 }}>{corridor.receive.code}</Box>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {/* Corridor Details */}
            {corridorInfo && destinationMarket && (
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CountryFlag code="ae" size={32} />
                  <ArrowIcon />
                  <CountryFlag code={corridorInfo.receive.code} size={32} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    UAE to {destinationMarket.name}
                  </Typography>
                  <Chip
                    label={getComplexityLabel(corridorInfo.complexity)}
                    size="small"
                    sx={{ bgcolor: getComplexityColor(corridorInfo.complexity), color: 'white' }}
                  />
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Purpose Codes</TableCell>
                          <TableCell>{destinationMarket.totalCodes}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Regulatory Body</TableCell>
                          <TableCell>{destinationMarket.regulatoryBody}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>ISO Aligned</TableCell>
                          <TableCell>
                            <Chip
                              label={destinationMarket.isoAligned ? 'Yes' : 'No'}
                              size="small"
                              color={destinationMarket.isoAligned ? 'success' : 'warning'}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    {corridorInfo.challenges.length > 0 && (
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          <WarningIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                          Common Challenges
                        </Typography>
                        {corridorInfo.challenges.slice(0, 3).map((challenge: string, i: number) => (
                          <Chip key={i} label={challenge} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                    )}
                  </Grid>
                </Grid>

                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Tip:</strong> Use the Translate tab to convert codes between UAE and {destinationMarket.name}
                </Alert>
              </Paper>
            )}

            {/* Full Cross-Market Mapping Table */}
            <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: 600 }}>
              <CompareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              ISO 20022 Cross-Market Mapping Table
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              This table shows how purpose codes map across all markets via ISO 20022 as the universal pivot layer.
              Each row represents a payment purpose that can be translated between any two markets.
            </Alert>

            {/* Mapping Statistics */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6" color="primary">{MAPPING_STATS.totalUAEMappings}</Typography>
                  <Typography variant="caption">UAE Codes</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6" color="warning.main">{MAPPING_STATS.totalIndiaOutwardMappings + MAPPING_STATS.totalIndiaInwardMappings}</Typography>
                  <Typography variant="caption">India Codes</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6" color="success.main">{MAPPING_STATS.totalPakistanMappings}</Typography>
                  <Typography variant="caption">Pakistan</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6" color="info.main">{MAPPING_STATS.totalPhilippinesMappings}</Typography>
                  <Typography variant="caption">Philippines</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6" color="secondary.main">{MAPPING_STATS.totalBangladeshMappings}</Typography>
                  <Typography variant="caption">Bangladesh</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }}>
                <Paper sx={{ p: 1.5, textAlign: 'center' }}>
                  <Typography variant="h6">{MAPPING_STATS.totalEgyptMappings}</Typography>
                  <Typography variant="caption">Egypt</Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Cross-Market Mapping Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'primary.main', color: 'white' }}>
                      <ISOIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                      ISO 20022
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'success.main', color: 'white' }}>
                      <CountryFlag code="ae" size={16} /> UAE
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'warning.main', color: 'white' }}>
                      <CountryFlag code="in" size={16} /> India
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'success.dark', color: 'white' }}>
                      <CountryFlag code="pk" size={16} /> Pakistan
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'info.main', color: 'white' }}>
                      <CountryFlag code="ph" size={16} /> Philippines
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'secondary.main', color: 'white' }}>
                      <CountryFlag code="bd" size={16} /> Bangladesh
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, bgcolor: 'grey.700', color: 'white' }}>
                      <CountryFlag code="eg" size={16} /> Egypt
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {MULTI_MARKET_MAPPINGS.map((mapping) => (
                    <TableRow key={mapping.isoCode.code} hover>
                      {/* ISO Code */}
                      <TableCell>
                        <Box>
                          <Chip label={mapping.isoCode.code} size="small" color="primary" />
                          <Typography variant="caption" display="block" color="text.secondary">
                            {mapping.isoCode.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      {/* UAE */}
                      <TableCell>
                        {mapping.uaeCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.uaeCodes.map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" color="success" />
                            ))}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                      {/* India */}
                      <TableCell>
                        {mapping.indiaCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.indiaCodes.slice(0, 3).map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" color="warning" />
                            ))}
                            {mapping.indiaCodes.length > 3 && (
                              <Chip label={`+${mapping.indiaCodes.length - 3}`} size="small" />
                            )}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                      {/* Pakistan */}
                      <TableCell>
                        {mapping.pakistanCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.pakistanCodes.slice(0, 2).map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" />
                            ))}
                            {mapping.pakistanCodes.length > 2 && (
                              <Chip label={`+${mapping.pakistanCodes.length - 2}`} size="small" />
                            )}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                      {/* Philippines */}
                      <TableCell>
                        {mapping.philippinesCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.philippinesCodes.slice(0, 2).map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" color="info" />
                            ))}
                            {mapping.philippinesCodes.length > 2 && (
                              <Chip label={`+${mapping.philippinesCodes.length - 2}`} size="small" />
                            )}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                      {/* Bangladesh */}
                      <TableCell>
                        {mapping.bangladeshCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.bangladeshCodes.slice(0, 2).map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" color="secondary" />
                            ))}
                            {mapping.bangladeshCodes.length > 2 && (
                              <Chip label={`+${mapping.bangladeshCodes.length - 2}`} size="small" />
                            )}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                      {/* Egypt */}
                      <TableCell>
                        {mapping.egyptCodes.length > 0 ? (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {mapping.egyptCodes.map((c, i) => (
                              <Chip key={i} label={c.code} size="small" variant="outlined" />
                            ))}
                          </Box>
                        ) : <Typography color="text.disabled">-</Typography>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {MULTI_MARKET_MAPPINGS.length} ISO 20022 codes with cross-market mappings
            </Typography>
          </CardContent>
        </TabPanel>

        {/* Translator Tab */}
        <TabPanel value={tabValue} index={1}>
          <CardContent>
            <Alert severity="info" sx={{ mb: 3 }}>
              Translate purpose codes between UAE and India using ISO 20022 as the universal pivot layer
            </Alert>

            {/* Direction Toggle */}
            <ToggleButtonGroup
              value={translationDirection}
              exclusive
              onChange={(_, v) => {
                if (v) {
                  setTranslationDirection(v);
                  setTranslationResult(null);
                }
              }}
              sx={{ mb: 3 }}
            >
              <ToggleButton value="uae-to-india">
                <CountryFlag code="ae" size={20} />
                <ArrowIcon sx={{ mx: 1 }} />
                <CountryFlag code="in" size={20} />
                <Box sx={{ ml: 1 }}>UAE to India</Box>
              </ToggleButton>
              <ToggleButton value="india-to-uae">
                <CountryFlag code="in" size={20} />
                <ArrowIcon sx={{ mx: 1 }} />
                <CountryFlag code="ae" size={20} />
                <Box sx={{ ml: 1 }}>India to UAE</Box>
              </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              {/* Input */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  {translationDirection === 'uae-to-india' ? 'UAE Code' : 'India Code'}
                </Typography>

                {translationDirection === 'uae-to-india' ? (
                  <Autocomplete
                    options={uaeCodeOptions}
                    value={selectedUAECode}
                    onChange={(_, v) => {
                      setSelectedUAECode(v);
                      setTranslationResult(null);
                      if (v) {
                        const result = translateUAEtoIndia(v.code);
                        setTranslationResult(result);
                      }
                    }}
                    getOptionLabel={(opt) => `${opt.code} - ${opt.purpose}`}
                    renderInput={(params) => (
                      <TextField {...params} label="Select UAE Purpose Code" />
                    )}
                  />
                ) : (
                  <Autocomplete
                    options={indiaCodeOptions}
                    value={selectedIndiaCode}
                    onChange={(_, v) => {
                      setSelectedIndiaCode(v);
                      setTranslationResult(null);
                      if (v) {
                        const result = translateIndiaToUAE(v.code);
                        setTranslationResult(result);
                      }
                    }}
                    getOptionLabel={(opt) => `${opt.code}`}
                    renderInput={(params) => (
                      <TextField {...params} label="Select India Purpose Code" />
                    )}
                  />
                )}
              </Paper>

              {/* Quick Result Summary */}
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                  Quick Summary
                </Typography>

                {translationResult ? (
                  <Box>
                    <Alert severity="success" sx={{ mb: 2 }}>
                      Translation found via ISO 20022: <strong>{translationResult.isoCode.code}</strong>
                    </Alert>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<UAEIcon />}
                        label={translationResult.uaeCode.code}
                        color="success"
                        variant="outlined"
                      />
                      <ArrowIcon sx={{ alignSelf: 'center', color: 'text.secondary' }} />
                      <Chip
                        icon={<ISOIcon />}
                        label={translationResult.isoCode.code}
                        color="primary"
                      />
                      <ArrowIcon sx={{ alignSelf: 'center', color: 'text.secondary' }} />
                      {translationResult.indiaCodes.slice(0, 3).map((tc: MarketCodeMapping, i: number) => (
                        <Chip key={i} label={tc.code} color="warning" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    Select a code to see translation
                  </Typography>
                )}
              </Paper>
            </Box>

            {/* Visual Flow Diagram */}
            {translationResult && (
              <Box sx={{ mt: 3 }}>
                <TranslationFlowDiagram
                  result={translationResult}
                  direction={translationDirection}
                />
              </Box>
            )}
          </CardContent>
        </TabPanel>

        {/* Full Mapping Tab */}
        <TabPanel value={tabValue} index={2}>
          <CardContent>
            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" color="primary">{stats.total}</Typography>
                  <Typography variant="caption">Total Codes</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" color="success.main">{stats.total - stats.iso.none}</Typography>
                  <Typography variant="caption">ISO Mapped</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5" color="secondary.main">{stats.total - stats.bop.none}</Typography>
                  <Typography variant="caption">BOP Mapped</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h5">{stats.iso.coverage}%</Typography>
                  <Typography variant="caption">Coverage</Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search codes..."
                value={mappingSearch}
                onChange={(e) => setMappingSearch(e.target.value)}
                size="small"
                sx={{ minWidth: 200 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Taxonomy</InputLabel>
                <Select
                  value={taxonomyFilter}
                  label="Taxonomy"
                  onChange={(e) => setTaxonomyFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Trade">Trade</MenuItem>
                  <MenuItem value="Services">Services</MenuItem>
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Transfers">Transfers</MenuItem>
                  <MenuItem value="Financial">Financial</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Mapping Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <UAEIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                      UAE Code
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <ISOIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                      ISO 20022
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <BOPIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                      IMF BOP
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Confidence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMappings.slice(0, 50).map((mapping) => (
                    <TableRow key={mapping.uaeCode} hover>
                      <TableCell>
                        <Typography sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {mapping.uaeCode}
                        </Typography>
                      </TableCell>
                      <TableCell>{mapping.uaeName}</TableCell>
                      <TableCell>
                        {mapping.isoCode ? (
                          <Chip label={mapping.isoCode} size="small" color="primary" variant="outlined" />
                        ) : (
                          <Typography color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {mapping.bopCode ? (
                          <Chip label={mapping.bopCode} size="small" color="secondary" variant="outlined" />
                        ) : (
                          <Typography color="text.secondary">-</Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <ConfidenceChip confidence={mapping.isoConfidence} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {filteredMappings.length > 50 && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Showing 50 of {filteredMappings.length} mappings
              </Typography>
            )}
          </CardContent>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default CrossBorder;
