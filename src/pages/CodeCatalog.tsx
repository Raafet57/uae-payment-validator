import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Switch,
  FormControlLabel,
  Pagination,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  ContentCopy as CopyIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  Article as ArticleIcon,
  GridView as GridIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { codesApi } from '../services/api';
import { UAEPurposeCode } from '../types';
import { PurposeCodeCard } from '../components';
import { CODE_DESCRIPTIONS, CodeDescription, searchCodesByKeyword } from '../data/codeDescriptions';

const ITEMS_PER_PAGE = 12;

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

const CodeCatalog: React.FC = () => {
  // Tab state
  const [tabValue, setTabValue] = useState(0);

  // Browse tab state
  const [transactionType, setTransactionType] = useState<'domestic' | 'offshore' | null>(null);
  const [category, setCategory] = useState<string>('');
  const [browseSearch, setBrowseSearch] = useState('');
  const [requiresLei, setRequiresLei] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCode, setSelectedCode] = useState<UAEPurposeCode | null>(null);

  // Reference tab state
  const [refSearch, setRefSearch] = useState('');
  const [selectedRefCode, setSelectedRefCode] = useState<UAEPurposeCode | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    useCases: true,
    examples: true,
    mistakes: true,
    notes: false,
    related: false,
  });

  // Fetch all codes
  const { data: staticData, isLoading } = useQuery({
    queryKey: ['staticCodes'],
    queryFn: codesApi.getStaticCodes,
  });

  const allCodes = useMemo(() => {
    if (!staticData?.codes_by_category) return [];
    return Object.values(staticData.codes_by_category).flat();
  }, [staticData]);

  const categories = useMemo(() => {
    return staticData?.categories || [];
  }, [staticData]);

  // Browse tab: filtered codes
  const filteredCodes = useMemo(() => {
    let codes = allCodes;

    if (transactionType === 'domestic') {
      codes = codes.filter((code) => code.applies_to_domestic);
    } else if (transactionType === 'offshore') {
      codes = codes.filter((code) => code.applies_to_offshore);
    }

    if (category) {
      codes = codes.filter((code) => code.category_code === category);
    }

    if (browseSearch) {
      const searchLower = browseSearch.toLowerCase();
      codes = codes.filter(
        (code) =>
          code.code.toLowerCase().includes(searchLower) ||
          code.name.toLowerCase().includes(searchLower)
      );
    }

    if (requiresLei) {
      codes = codes.filter((code) => code.requires_lei);
    }

    return codes;
  }, [allCodes, transactionType, category, browseSearch, requiresLei]);

  const paginatedCodes = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredCodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCodes, page]);

  const totalPages = Math.ceil(filteredCodes.length / ITEMS_PER_PAGE);

  // Reference tab: search results
  const refSearchResults = useMemo(() => {
    if (!refSearch || refSearch.length < 2) return [];
    const matchingCodes = searchCodesByKeyword(refSearch);
    const apiMatches = allCodes.filter(code =>
      code.code.toLowerCase().includes(refSearch.toLowerCase()) ||
      code.name.toLowerCase().includes(refSearch.toLowerCase())
    );
    const allMatches = new Set([...matchingCodes, ...apiMatches.map(c => c.code)]);
    return Array.from(allMatches).slice(0, 10);
  }, [refSearch, allCodes]);

  const codeDescription: CodeDescription | null = useMemo(() => {
    if (!selectedRefCode) return null;
    return CODE_DESCRIPTIONS[selectedRefCode.code] || null;
  }, [selectedRefCode]);

  const relatedCodesDetails = useMemo(() => {
    if (!codeDescription?.relatedCodes) return [];
    return codeDescription.relatedCodes
      .map(code => allCodes.find(c => c.code === code))
      .filter(Boolean) as UAEPurposeCode[];
  }, [codeDescription, allCodes]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleCodeClick = (code: UAEPurposeCode) => {
    if (tabValue === 0) {
      setSelectedCode(code);
    } else {
      setSelectedRefCode(code);
    }
  };

  const switchToReference = (code: UAEPurposeCode) => {
    setSelectedCode(null);
    setSelectedRefCode(code);
    setTabValue(1);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Code Catalog
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and reference all 117 UAE purpose codes per UAEFTS AUX700
        </Typography>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, v) => setTabValue(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab icon={<GridIcon />} iconPosition="start" label="Browse" />
          <Tab icon={<ArticleIcon />} iconPosition="start" label="Reference" />
        </Tabs>

        {/* Browse Tab */}
        <TabPanel value={tabValue} index={0}>
          <CardContent>
            {/* Filters */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <TextField
                placeholder="Search codes..."
                value={browseSearch}
                onChange={(e) => {
                  setBrowseSearch(e.target.value);
                  setPage(1);
                }}
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

              <ToggleButtonGroup
                value={transactionType}
                exclusive
                onChange={(_, value) => {
                  setTransactionType(value);
                  setPage(1);
                }}
                size="small"
              >
                <ToggleButton value="domestic">
                  <DomesticIcon sx={{ mr: 0.5 }} /> Domestic
                </ToggleButton>
                <ToggleButton value="offshore">
                  <OffshoreIcon sx={{ mr: 0.5 }} /> Offshore
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat.category_code} value={cat.category_code}>
                      {cat.category_name} ({cat.code_count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={requiresLei}
                    onChange={(e) => {
                      setRequiresLei(e.target.checked);
                      setPage(1);
                    }}
                    size="small"
                  />
                }
                label="LEI Required"
              />
            </Box>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Showing {filteredCodes.length} of {allCodes.length} codes
            </Typography>

            {/* Code Grid */}
            {isLoading ? (
              <Alert severity="info">Loading codes...</Alert>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                      lg: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                  }}
                >
                  {paginatedCodes.map((code) => (
                    <PurposeCodeCard
                      key={code.code}
                      code={code}
                      onClick={() => handleCodeClick(code)}
                    />
                  ))}
                </Box>

                {totalPages > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                    />
                  </Box>
                )}
              </>
            )}
          </CardContent>
        </TabPanel>

        {/* Reference Tab */}
        <TabPanel value={tabValue} index={1}>
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '300px 1fr' }, gap: 3 }}>
              {/* Search Panel */}
              <Box>
                <TextField
                  fullWidth
                  placeholder="Search by code, name, or keyword..."
                  value={refSearch}
                  onChange={(e) => setRefSearch(e.target.value)}
                  size="small"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {refSearchResults.length > 0 && (
                  <List dense sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 2 }}>
                    {refSearchResults.map((code) => {
                      const codeObj = allCodes.find(c => c.code === code);
                      return (
                        <ListItem
                          key={code}
                          sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                          onClick={() => codeObj && setSelectedRefCode(codeObj)}
                        >
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                  {code}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {codeObj?.name}
                                </Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                )}

                {/* Quick select by category */}
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Browse by Category
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {categories.slice(0, 8).map((cat) => (
                    <Chip
                      key={cat.category_code}
                      label={cat.category_code}
                      size="small"
                      onClick={() => {
                        const firstCode = allCodes.find(c => c.category_code === cat.category_code);
                        if (firstCode) setSelectedRefCode(firstCode);
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Reference Content */}
              <Box>
                {!selectedRefCode ? (
                  <Alert severity="info">
                    Search for a code or select from the list to view detailed documentation.
                  </Alert>
                ) : (
                  <Box>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {selectedRefCode.code}
                      </Typography>
                      <Typography variant="h6">{selectedRefCode.name}</Typography>
                      <Tooltip title="Copy code">
                        <IconButton size="small" onClick={() => copyToClipboard(selectedRefCode.code)}>
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Chips */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                      <Chip
                        label={selectedRefCode.category_name}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {selectedRefCode.applies_to_domestic && (
                        <Chip icon={<DomesticIcon />} label="Domestic" size="small" />
                      )}
                      {selectedRefCode.applies_to_offshore && (
                        <Chip icon={<OffshoreIcon />} label="Offshore" size="small" />
                      )}
                      {selectedRefCode.requires_lei && (
                        <Chip label="LEI Required" size="small" color="warning" />
                      )}
                    </Box>

                    {codeDescription ? (
                      <>
                        {/* Use Cases */}
                        {codeDescription.useCases && codeDescription.useCases.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }}
                              onClick={() => toggleSection('useCases')}
                            >
                              <CheckIcon color="success" sx={{ mr: 1 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                                Valid Use Cases
                              </Typography>
                              {expandedSections.useCases ? <CollapseIcon /> : <ExpandIcon />}
                            </Box>
                            <Collapse in={expandedSections.useCases}>
                              <List dense>
                                {codeDescription.useCases.map((useCase, i) => (
                                  <ListItem key={i}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <CheckIcon fontSize="small" color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={useCase} />
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </Box>
                        )}

                        {/* Common Mistakes */}
                        {codeDescription.commonMistakes && codeDescription.commonMistakes.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }}
                              onClick={() => toggleSection('mistakes')}
                            >
                              <WarningIcon color="warning" sx={{ mr: 1 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                                Common Mistakes
                              </Typography>
                              {expandedSections.mistakes ? <CollapseIcon /> : <ExpandIcon />}
                            </Box>
                            <Collapse in={expandedSections.mistakes}>
                              <List dense>
                                {codeDescription.commonMistakes.map((mistake, i) => (
                                  <ListItem key={i}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <WarningIcon fontSize="small" color="warning" />
                                    </ListItemIcon>
                                    <ListItemText primary={mistake} />
                                  </ListItem>
                                ))}
                              </List>
                            </Collapse>
                          </Box>
                        )}

                        {/* Related Codes */}
                        {relatedCodesDetails.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mb: 1 }}
                              onClick={() => toggleSection('related')}
                            >
                              <InfoIcon color="info" sx={{ mr: 1 }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                                Related Codes
                              </Typography>
                              {expandedSections.related ? <CollapseIcon /> : <ExpandIcon />}
                            </Box>
                            <Collapse in={expandedSections.related}>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {relatedCodesDetails.map((code) => (
                                  <Chip
                                    key={code.code}
                                    label={`${code.code} - ${code.name}`}
                                    size="small"
                                    onClick={() => setSelectedRefCode(code)}
                                    sx={{ cursor: 'pointer' }}
                                  />
                                ))}
                              </Box>
                            </Collapse>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Alert severity="info">
                        Basic code information available. Detailed documentation coming soon.
                      </Alert>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </TabPanel>
      </Card>

      {/* Browse Code Detail Dialog */}
      <Dialog open={!!selectedCode} onClose={() => setSelectedCode(null)} maxWidth="sm" fullWidth>
        {selectedCode && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                  {selectedCode.code}
                </Typography>
                <Typography variant="subtitle1">{selectedCode.name}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell>{selectedCode.category_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Domestic</TableCell>
                    <TableCell>{selectedCode.applies_to_domestic ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Offshore</TableCell>
                    <TableCell>{selectedCode.applies_to_offshore ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>LEI Required</TableCell>
                    <TableCell>{selectedCode.requires_lei ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => switchToReference(selectedCode)} startIcon={<ArticleIcon />}>
                View Full Reference
              </Button>
              <Button onClick={() => setSelectedCode(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CodeCatalog;
