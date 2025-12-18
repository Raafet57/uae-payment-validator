import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Tooltip,
  IconButton,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapHoriz as MappingIcon,
  ExpandMore as ExpandIcon,
  Info as InfoIcon,
  CheckCircle as ExactIcon,
  RadioButtonChecked as CloseIcon,
  RadioButtonUnchecked as PartialIcon,
  Cancel as NoneIcon,
  AccountTree as TaxonomyIcon,
  Public as ISOIcon,
  AccountBalance as BOPIcon,
  Flag as UAEIcon,
} from '@mui/icons-material';
import {
  UAE_TAXONOMY_MAPPINGS,
  ISO_20022_CODES,
  IMF_BOP_CODES,
  UNDERLYING_PURPOSE_TAXONOMY,
  getMappingStatistics,
  getUAECodesByISO,
  getUAECodesByBOP,
  TaxonomyMapping,
} from '../data/taxonomyMapping';

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

const ConfidenceChip: React.FC<{ confidence: string }> = ({ confidence }) => {
  const config: Record<string, { color: 'success' | 'info' | 'warning' | 'error'; icon: React.ReactNode; label: string }> = {
    exact: { color: 'success', icon: <ExactIcon fontSize="small" />, label: 'Exact Match' },
    close: { color: 'info', icon: <CloseIcon fontSize="small" />, label: 'Close Match' },
    partial: { color: 'warning', icon: <PartialIcon fontSize="small" />, label: 'Partial Match' },
    none: { color: 'error', icon: <NoneIcon fontSize="small" />, label: 'No Match' },
  };

  const cfg = config[confidence] || config.none;
  return (
    <Chip
      icon={cfg.icon as React.ReactElement}
      label={cfg.label}
      size="small"
      color={cfg.color}
      variant="outlined"
    />
  );
};

const TaxonomyHarmonization: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [search, setSearch] = useState('');
  const [taxonomyFilter, setTaxonomyFilter] = useState<string>('');
  const [isoFilter, setIsoFilter] = useState<string>('');
  const [bopFilter, setBopFilter] = useState<string>('');
  const [selectedMapping, setSelectedMapping] = useState<TaxonomyMapping | null>(null);

  const stats = useMemo(() => getMappingStatistics(), []);

  // Filter mappings
  const filteredMappings = useMemo(() => {
    let mappings = UAE_TAXONOMY_MAPPINGS;

    if (search) {
      const searchLower = search.toLowerCase();
      mappings = mappings.filter(
        (m) =>
          m.uaeCode.toLowerCase().includes(searchLower) ||
          m.uaeName.toLowerCase().includes(searchLower) ||
          (m.isoCode && m.isoCode.toLowerCase().includes(searchLower)) ||
          (m.isoName && m.isoName.toLowerCase().includes(searchLower)) ||
          (m.bopCode && m.bopCode.toLowerCase().includes(searchLower)) ||
          (m.bopName && m.bopName.toLowerCase().includes(searchLower))
      );
    }

    if (taxonomyFilter) {
      mappings = mappings.filter((m) => m.taxonomyL0 === taxonomyFilter);
    }

    if (isoFilter) {
      mappings = mappings.filter((m) => m.isoCode === isoFilter);
    }

    if (bopFilter) {
      mappings = mappings.filter((m) => m.bopCode === bopFilter);
    }

    return mappings;
  }, [search, taxonomyFilter, isoFilter, bopFilter]);

  // Get unique ISO codes for filter
  const uniqueISOCodes = useMemo(() => {
    const codes = new Set(UAE_TAXONOMY_MAPPINGS.map((m) => m.isoCode).filter(Boolean));
    return Array.from(codes).sort();
  }, []);

  // Get unique BOP codes for filter
  const uniqueBOPCodes = useMemo(() => {
    const codes = new Set(UAE_TAXONOMY_MAPPINGS.map((m) => m.bopCode).filter(Boolean));
    return Array.from(codes).sort();
  }, []);

  const clearFilters = () => {
    setSearch('');
    setTaxonomyFilter('');
    setIsoFilter('');
    setBopFilter('');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TaxonomyIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Taxonomy Harmonization
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Map UAE proprietary purpose codes to ISO 20022 and IMF Balance of Payments standards
        </Typography>
      </Box>

      {/* Statistics Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <UAEIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                UAE Codes Mapped
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <ISOIcon color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                {stats.iso.coverage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ISO 20022 Coverage
              </Typography>
              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(stats.iso.coverage)}
                  color="secondary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <BOPIcon sx={{ fontSize: 40, color: '#C8A415' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                {stats.bop.coverage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                IMF BOP Coverage
              </Typography>
              <Box sx={{ mt: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(stats.bop.coverage)}
                  sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#C8A415' } }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <MappingIcon color="info" sx={{ fontSize: 40 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, my: 1 }}>
                {stats.iso.exact + stats.bop.exact}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Exact Matches
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="UAE Mappings" icon={<UAEIcon />} iconPosition="start" />
          <Tab label="ISO 20022 Codes" icon={<ISOIcon />} iconPosition="start" />
          <Tab label="IMF BOP Codes" icon={<BOPIcon />} iconPosition="start" />
          <Tab label="Taxonomy Tree" icon={<TaxonomyIcon />} iconPosition="start" />
        </Tabs>

        {/* Tab 0: UAE Mappings */}
        <TabPanel value={tabValue} index={0}>
          <CardContent>
            {/* Filters */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <TextField
                placeholder="Search codes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 250 }}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Taxonomy Category</InputLabel>
                <Select
                  value={taxonomyFilter}
                  onChange={(e) => setTaxonomyFilter(e.target.value)}
                  label="Taxonomy Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  <MenuItem value="INCOME">Income & Compensation</MenuItem>
                  <MenuItem value="TRADE">Trade in Goods</MenuItem>
                  <MenuItem value="SERVICES">Services</MenuItem>
                  <MenuItem value="INVESTMENT">Investment & Capital</MenuItem>
                  <MenuItem value="TRANSFERS">Transfers</MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>ISO Code</InputLabel>
                <Select
                  value={isoFilter}
                  onChange={(e) => setIsoFilter(e.target.value)}
                  label="ISO Code"
                >
                  <MenuItem value="">All ISO</MenuItem>
                  {uniqueISOCodes.map((code) => (
                    <MenuItem key={code} value={code!}>
                      {code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>BOP Code</InputLabel>
                <Select
                  value={bopFilter}
                  onChange={(e) => setBopFilter(e.target.value)}
                  label="BOP Code"
                >
                  <MenuItem value="">All BOP</MenuItem>
                  {uniqueBOPCodes.map((code) => (
                    <MenuItem key={code} value={code!}>
                      {code}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {(search || taxonomyFilter || isoFilter || bopFilter) && (
                <Button size="small" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {filteredMappings.length} of {UAE_TAXONOMY_MAPPINGS.length} mappings
            </Typography>

            {/* Mapping Table */}
            <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'white' }}>
                      UAE Code
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: 'primary.main', color: 'white' }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: 'secondary.main', color: 'white' }}>
                      ISO 20022
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: 'secondary.main', color: 'white' }}>
                      ISO Match
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#C8A415', color: 'white' }}>
                      IMF BOP
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#C8A415', color: 'white' }}>
                      BOP Match
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: 'info.main', color: 'white' }}>
                      Taxonomy
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMappings.map((mapping) => (
                    <TableRow
                      key={mapping.uaeCode}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setSelectedMapping(mapping)}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {mapping.uaeCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                          {mapping.uaeName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {mapping.isoCode || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <ConfidenceChip confidence={mapping.isoConfidence} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {mapping.bopCode || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <ConfidenceChip confidence={mapping.bopConfidence} />
                      </TableCell>
                      <TableCell>
                        <Chip label={mapping.taxonomyL0} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="View Details">
                          <IconButton size="small" onClick={() => setSelectedMapping(mapping)}>
                            <InfoIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </TabPanel>

        {/* Tab 1: ISO 20022 Codes */}
        <TabPanel value={tabValue} index={1}>
          <CardContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              ISO 20022 External Purpose Codes (ExternalPurpose1Code) are the international standard for payment purpose classification.
            </Alert>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Definition</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>UAE Codes Mapped</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(ISO_20022_CODES).map((iso) => {
                    const uaeCodes = getUAECodesByISO(iso.code);
                    return (
                      <TableRow key={iso.code} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                            {iso.code}
                          </Typography>
                        </TableCell>
                        <TableCell>{iso.name}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ maxWidth: 300 }}>
                            {iso.definition}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {uaeCodes.slice(0, 5).map((m) => (
                              <Chip
                                key={m.uaeCode}
                                label={m.uaeCode}
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedMapping(m)}
                              />
                            ))}
                            {uaeCodes.length > 5 && (
                              <Chip label={`+${uaeCodes.length - 5}`} size="small" color="primary" />
                            )}
                            {uaeCodes.length === 0 && (
                              <Typography variant="caption" color="text.disabled">
                                No mappings
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </TabPanel>

        {/* Tab 2: IMF BOP Codes */}
        <TabPanel value={tabValue} index={2}>
          <CardContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              IMF Balance of Payments (BPM6) codes are the basis for UAE Central Bank payment classification requirements.
            </Alert>
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>UAE Codes Mapped</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(IMF_BOP_CODES).map((bop) => {
                    const uaeCodes = getUAECodesByBOP(bop.code);
                    return (
                      <TableRow key={bop.code} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                            {bop.code}
                          </Typography>
                        </TableCell>
                        <TableCell>{bop.name}</TableCell>
                        <TableCell>
                          <Chip label={bop.category} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="text.secondary">
                            {bop.level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {uaeCodes.slice(0, 5).map((m) => (
                              <Chip
                                key={m.uaeCode}
                                label={m.uaeCode}
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedMapping(m)}
                              />
                            ))}
                            {uaeCodes.length > 5 && (
                              <Chip label={`+${uaeCodes.length - 5}`} size="small" color="primary" />
                            )}
                            {uaeCodes.length === 0 && (
                              <Typography variant="caption" color="text.disabled">
                                No mappings
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </TabPanel>

        {/* Tab 3: Taxonomy Tree */}
        <TabPanel value={tabValue} index={3}>
          <CardContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              The Underlying Purpose Taxonomy (UPT) provides a hierarchical classification system that bridges proprietary and international codes.
            </Alert>
            {['INCOME', 'TRADE', 'SERVICES', 'INVESTMENT', 'TRANSFERS'].map((l0) => {
              const l0Node = UNDERLYING_PURPOSE_TAXONOMY[l0];
              const l1Nodes = Object.values(UNDERLYING_PURPOSE_TAXONOMY).filter(
                (n) => n.parent === l0 && n.level === 'L1'
              );
              const l0Codes = UAE_TAXONOMY_MAPPINGS.filter((m) => m.taxonomyL0 === l0);

              return (
                <Accordion key={l0} defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <TaxonomyIcon color="primary" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{l0Node.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {l0Node.description}
                        </Typography>
                      </Box>
                      <Chip label={`${l0Codes.length} codes`} color="primary" size="small" />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {l1Nodes.map((l1) => {
                        const l1Codes = UAE_TAXONOMY_MAPPINGS.filter((m) => m.taxonomyL1 === l1.code);
                        return (
                          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={l1.code}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {l1.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                  {l1.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                  {l1Codes.slice(0, 8).map((m) => (
                                    <Chip
                                      key={m.uaeCode}
                                      label={m.uaeCode}
                                      size="small"
                                      variant="outlined"
                                      onClick={() => setSelectedMapping(m)}
                                      sx={{ cursor: 'pointer' }}
                                    />
                                  ))}
                                  {l1Codes.length > 8 && (
                                    <Chip label={`+${l1Codes.length - 8}`} size="small" color="primary" />
                                  )}
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </CardContent>
        </TabPanel>
      </Card>

      {/* Mapping Detail Dialog */}
      <Dialog open={!!selectedMapping} onClose={() => setSelectedMapping(null)} maxWidth="md" fullWidth>
        {selectedMapping && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <UAEIcon color="primary" />
                <Box>
                  <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                    {selectedMapping.uaeCode}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedMapping.uaeName}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                {/* ISO 20022 Mapping */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <ISOIcon color="secondary" />
                        <Typography variant="h6">ISO 20022</Typography>
                      </Box>
                      {selectedMapping.isoCode ? (
                        <>
                          <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                            {selectedMapping.isoCode}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {selectedMapping.isoName}
                          </Typography>
                          <ConfidenceChip confidence={selectedMapping.isoConfidence} />
                          {ISO_20022_CODES[selectedMapping.isoCode] && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                              {ISO_20022_CODES[selectedMapping.isoCode].definition}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Typography color="text.disabled">No ISO mapping</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* IMF BOP Mapping */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <BOPIcon sx={{ color: '#C8A415' }} />
                        <Typography variant="h6">IMF Balance of Payments</Typography>
                      </Box>
                      {selectedMapping.bopCode ? (
                        <>
                          <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                            {selectedMapping.bopCode}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {selectedMapping.bopName}
                          </Typography>
                          <ConfidenceChip confidence={selectedMapping.bopConfidence} />
                          {IMF_BOP_CODES[selectedMapping.bopCode] && (
                            <Typography variant="body2" sx={{ mt: 2 }}>
                              {IMF_BOP_CODES[selectedMapping.bopCode].description}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <Typography color="text.disabled">No BOP mapping (domestic only)</Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                {/* Taxonomy */}
                <Grid size={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <TaxonomyIcon color="info" />
                        <Typography variant="h6">Taxonomy Classification</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Chip
                          label={UNDERLYING_PURPOSE_TAXONOMY[selectedMapping.taxonomyL0]?.name || selectedMapping.taxonomyL0}
                          color="primary"
                        />
                        <MappingIcon color="disabled" />
                        <Chip
                          label={UNDERLYING_PURPOSE_TAXONOMY[selectedMapping.taxonomyL1]?.name || selectedMapping.taxonomyL1}
                          color="info"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Mapping Notes */}
                <Grid size={12}>
                  <Alert severity="info">
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Mapping Notes
                    </Typography>
                    <Typography variant="body2">{selectedMapping.mappingNotes}</Typography>
                  </Alert>
                </Grid>

                {/* Regulatory Basis */}
                <Grid size={12}>
                  <Alert severity="warning" icon={<BOPIcon />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Regulatory Basis
                    </Typography>
                    <Typography variant="body2">{selectedMapping.regulatoryBasis}</Typography>
                  </Alert>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedMapping(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TaxonomyHarmonization;
