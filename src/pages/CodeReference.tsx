import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Autocomplete,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Tooltip,
  Collapse,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Lightbulb as TipIcon,
  Link as LinkIcon,
  ContentCopy as CopyIcon,
  ExpandMore as ExpandIcon,
  ExpandLess as CollapseIcon,
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  Article as ArticleIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { codesApi } from '../services/api';
import { UAEPurposeCode } from '../types';
import { CODE_DESCRIPTIONS, CodeDescription, searchCodesByKeyword } from '../data/codeDescriptions';

const CodeReference: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<UAEPurposeCode | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    useCases: true,
    examples: true,
    mistakes: true,
    notes: false,
    related: false,
  });

  // Fetch all codes from static endpoint
  const { data: staticData } = useQuery({
    queryKey: ['staticCodes'],
    queryFn: codesApi.getStaticCodes,
  });

  const allCodes = useMemo(() => {
    if (!staticData?.codes_by_category) return [];
    return Object.values(staticData.codes_by_category).flat();
  }, [staticData]);

  // Get description for selected code
  const codeDescription: CodeDescription | null = useMemo(() => {
    if (!selectedCode) return null;
    return CODE_DESCRIPTIONS[selectedCode.code] || null;
  }, [selectedCode]);

  // Search results based on keyword
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];

    // First search in our descriptions
    const matchingCodes = searchCodesByKeyword(searchQuery);

    // Also search in the API codes
    const apiMatches = allCodes.filter(code =>
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (code.description && code.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Combine and deduplicate
    const allMatches = new Set([...matchingCodes, ...apiMatches.map(c => c.code)]);
    return Array.from(allMatches).slice(0, 10);
  }, [searchQuery, allCodes]);

  // Get related codes details
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

  const handleCodeSelect = (code: string) => {
    const found = allCodes.find(c => c.code === code);
    if (found) {
      setSelectedCode(found);
      setSearchQuery('');
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Purpose Code Reference
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive guide to all 117 UAE purpose codes with detailed descriptions, use cases, and examples
        </Typography>
      </Box>

      {/* Search */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Autocomplete
            freeSolo
            options={allCodes}
            value={selectedCode}
            onChange={(_, value) => {
              if (typeof value === 'object' && value !== null) {
                setSelectedCode(value);
              }
            }}
            inputValue={searchQuery}
            onInputChange={(_, value) => setSearchQuery(value)}
            getOptionLabel={(option) =>
              typeof option === 'string' ? option : `${option.code} - ${option.name}`
            }
            groupBy={(option) => typeof option === 'string' ? '' : option.category_name}
            filterOptions={(options, { inputValue }) => {
              const query = inputValue.toLowerCase();
              return options.filter(option => {
                if (typeof option === 'string') return false;
                return (
                  option.code.toLowerCase().includes(query) ||
                  option.name.toLowerCase().includes(query) ||
                  (option.description && option.description.toLowerCase().includes(query)) ||
                  (CODE_DESCRIPTIONS[option.code]?.keywords.some(k => k.includes(query)))
                );
              });
            }}
            renderOption={(props, option) => {
              if (typeof option === 'string') return null;
              const desc = CODE_DESCRIPTIONS[option.code];
              return (
                <Box component="li" {...props} key={option.code}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {option.code}
                      </Typography>
                      <Typography variant="body2">{option.name}</Typography>
                    </Box>
                    {desc && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        {desc.shortDescription}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {option.applies_to_domestic && (
                      <Chip label="Domestic" size="small" color="primary" variant="outlined" />
                    )}
                    {option.applies_to_offshore && (
                      <Chip label="Offshore" size="small" color="secondary" variant="outlined" />
                    )}
                  </Box>
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search by code, name, description, or keyword..."
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                helperText="Try searching for 'salary', 'remittance', 'investment', or enter a code like 'SAL'"
              />
            )}
          />

          {/* Quick keyword search results */}
          {searchQuery.length >= 2 && searchResults.length > 0 && !selectedCode && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Codes matching "{searchQuery}":
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {searchResults.map(code => (
                  <Chip
                    key={code}
                    label={code}
                    onClick={() => handleCodeSelect(code)}
                    sx={{ cursor: 'pointer', fontFamily: 'monospace' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Code Details */}
      {selectedCode && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
          {/* Main Content */}
          <Box>
            {/* Code Header */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="h3" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}>
                        {selectedCode.code}
                      </Typography>
                      <Tooltip title="Copy code">
                        <IconButton size="small" onClick={() => copyToClipboard(selectedCode.code)}>
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {selectedCode.name}
                    </Typography>
                  </Box>
                  <Chip label={selectedCode.category_name} color="primary" />
                </Box>

                {/* Short description */}
                {codeDescription && (
                  <Alert severity="info" icon={<ArticleIcon />} sx={{ mb: 2 }}>
                    {codeDescription.shortDescription}
                  </Alert>
                )}

                {/* Transaction type badges */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedCode.applies_to_domestic && (
                    <Chip
                      icon={<DomesticIcon />}
                      label="Domestic Transactions"
                      color="success"
                      variant="outlined"
                    />
                  )}
                  {selectedCode.applies_to_offshore && (
                    <Chip
                      icon={<OffshoreIcon />}
                      label="Offshore Transactions"
                      color="info"
                      variant="outlined"
                    />
                  )}
                  {selectedCode.requires_lei && (
                    <Chip
                      label="LEI Required"
                      color="warning"
                      variant="outlined"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>

            {/* Detailed Description */}
            {codeDescription && (
              <>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Detailed Description
                    </Typography>
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {codeDescription.detailedDescription}
                    </Typography>
                  </CardContent>
                </Card>

                {/* Use Cases */}
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => toggleSection('useCases')}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        When to Use This Code
                      </Typography>
                      <IconButton size="small">
                        {expandedSections.useCases ? <CollapseIcon /> : <ExpandIcon />}
                      </IconButton>
                    </Box>
                    <Collapse in={expandedSections.useCases}>
                      <List dense sx={{ mt: 1 }}>
                        {codeDescription.useCases.map((useCase, index) => (
                          <ListItem key={index}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckIcon color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={useCase} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </CardContent>
                </Card>

                {/* Examples */}
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                      onClick={() => toggleSection('examples')}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Examples
                      </Typography>
                      <IconButton size="small">
                        {expandedSections.examples ? <CollapseIcon /> : <ExpandIcon />}
                      </IconButton>
                    </Box>
                    <Collapse in={expandedSections.examples}>
                      <List dense sx={{ mt: 1 }}>
                        {codeDescription.examples.map((example, index) => (
                          <ListItem key={index} sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <TipIcon color="primary" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={example}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </CardContent>
                </Card>

                {/* Common Mistakes */}
                {codeDescription.commonMistakes && codeDescription.commonMistakes.length > 0 && (
                  <Card sx={{ mb: 2, borderColor: 'warning.main', borderWidth: 1, borderStyle: 'solid' }}>
                    <CardContent>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => toggleSection('mistakes')}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'warning.dark' }}>
                          Common Mistakes to Avoid
                        </Typography>
                        <IconButton size="small">
                          {expandedSections.mistakes ? <CollapseIcon /> : <ExpandIcon />}
                        </IconButton>
                      </Box>
                      <Collapse in={expandedSections.mistakes}>
                        <List dense sx={{ mt: 1 }}>
                          {codeDescription.commonMistakes.map((mistake, index) => (
                            <ListItem key={index}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <WarningIcon color="warning" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText
                                primary={mistake}
                                primaryTypographyProps={{ color: 'warning.dark' }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </CardContent>
                  </Card>
                )}

                {/* Notes */}
                {codeDescription.notes && codeDescription.notes.length > 0 && (
                  <Card sx={{ mb: 2 }}>
                    <CardContent>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => toggleSection('notes')}
                      >
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Important Notes
                        </Typography>
                        <IconButton size="small">
                          {expandedSections.notes ? <CollapseIcon /> : <ExpandIcon />}
                        </IconButton>
                      </Box>
                      <Collapse in={expandedSections.notes}>
                        <List dense sx={{ mt: 1 }}>
                          {codeDescription.notes.map((note, index) => (
                            <ListItem key={index}>
                              <ListItemIcon sx={{ minWidth: 36 }}>
                                <InfoIcon color="info" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={note} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {/* No detailed description available */}
            {!codeDescription && (
              <Alert severity="info" sx={{ mb: 2 }}>
                Detailed description not yet available for this code. Basic information is shown in the sidebar.
              </Alert>
            )}
          </Box>

          {/* Sidebar */}
          <Box>
            {/* Quick Info */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                  Quick Reference
                </Typography>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>Category</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>{selectedCode.category_code}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>Domestic</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>
                        <Chip
                          label={selectedCode.applies_to_domestic ? 'Yes' : 'No'}
                          size="small"
                          color={selectedCode.applies_to_domestic ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>Offshore</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>
                        <Chip
                          label={selectedCode.applies_to_offshore ? 'Yes' : 'No'}
                          size="small"
                          color={selectedCode.applies_to_offshore ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>Inbound</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>
                        <Chip
                          label={selectedCode.applies_to_inbound ? 'Yes' : 'No'}
                          size="small"
                          color={selectedCode.applies_to_inbound ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>Outbound</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>
                        <Chip
                          label={selectedCode.applies_to_outbound ? 'Yes' : 'No'}
                          size="small"
                          color={selectedCode.applies_to_outbound ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>LEI Required</TableCell>
                      <TableCell sx={{ border: 0, py: 1 }}>
                        <Chip
                          label={selectedCode.requires_lei ? 'Yes' : 'No'}
                          size="small"
                          color={selectedCode.requires_lei ? 'warning' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                    {selectedCode.lei_threshold_aed && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>LEI Threshold</TableCell>
                        <TableCell sx={{ border: 0, py: 1 }}>
                          AED {selectedCode.lei_threshold_aed.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    )}
                    {selectedCode.iso_20022_code && (
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, border: 0, py: 1 }}>ISO 20022</TableCell>
                        <TableCell sx={{ border: 0, py: 1, fontFamily: 'monospace' }}>
                          {selectedCode.iso_20022_code}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Keywords */}
            {codeDescription?.keywords && (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <TagIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Keywords
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {codeDescription.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                        onClick={() => setSearchQuery(keyword)}
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            )}

            {/* Related Codes */}
            {relatedCodesDetails.length > 0 && (
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LinkIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Related Codes
                    </Typography>
                  </Box>
                  <List dense disablePadding>
                    {relatedCodesDetails.map(code => (
                      <ListItem
                        key={code.code}
                        sx={{
                          cursor: 'pointer',
                          borderRadius: 1,
                          mb: 0.5,
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                        onClick={() => setSelectedCode(code)}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                {code.code}
                              </Typography>
                            </Box>
                          }
                          secondary={code.name}
                          secondaryTypographyProps={{ variant: 'caption' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {/* Regulatory Reference */}
            {codeDescription?.regulatoryReference && (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Regulatory Reference
                  </Typography>
                  <Typography variant="body2">
                    {codeDescription.regulatoryReference}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      )}

      {/* No code selected */}
      {!selectedCode && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <ArticleIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Select a Purpose Code
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Search for a code above to view its detailed description, use cases, and examples
            </Typography>

            {/* Popular codes quick access */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                Most Common Codes
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                {['SAL', 'FAM', 'GDI', 'GDE', 'AE001', 'ITS', 'RNT', 'EOS', 'TOF', 'EDU'].map(code => (
                  <Button
                    key={code}
                    variant="outlined"
                    size="small"
                    onClick={() => handleCodeSelect(code)}
                    sx={{ fontFamily: 'monospace' }}
                  >
                    {code}
                  </Button>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CodeReference;
