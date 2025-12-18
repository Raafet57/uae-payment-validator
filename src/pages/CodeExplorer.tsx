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
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  Close as CloseIcon,
  MenuBook as ReferenceIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { codesApi } from '../services/api';
import { UAEPurposeCode } from '../types';
import { PurposeCodeCard } from '../components';
import { CODE_DESCRIPTIONS } from '../data/codeDescriptions';

const ITEMS_PER_PAGE = 12;

const CodeExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<'domestic' | 'offshore' | null>(null);
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState('');
  const [requiresLei, setRequiresLei] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCode, setSelectedCode] = useState<UAEPurposeCode | null>(null);

  // Fetch all codes from static endpoint (no database needed)
  const { data: staticData, isLoading, isError } = useQuery({
    queryKey: ['staticCodes'],
    queryFn: codesApi.getStaticCodes,
  });

  // Flatten codes from codes_by_category into a single array
  const allCodes = useMemo(() => {
    if (!staticData?.codes_by_category) return [];
    return Object.values(staticData.codes_by_category).flat();
  }, [staticData]);

  // Filter codes client-side
  const filteredCodes = useMemo(() => {
    let codes = allCodes;

    // Filter by transaction type
    if (transactionType === 'domestic') {
      codes = codes.filter((code) => code.applies_to_domestic);
    } else if (transactionType === 'offshore') {
      codes = codes.filter((code) => code.applies_to_offshore);
    }

    // Filter by category
    if (category) {
      codes = codes.filter((code) => code.category_code === category);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      codes = codes.filter(
        (code) =>
          code.code.toLowerCase().includes(searchLower) ||
          code.name.toLowerCase().includes(searchLower) ||
          (code.description && code.description.toLowerCase().includes(searchLower))
      );
    }

    // Filter by LEI requirement
    if (requiresLei) {
      codes = codes.filter((code) => code.requires_lei);
    }

    return codes;
  }, [allCodes, transactionType, category, search, requiresLei]);

  // Paginate
  const paginatedCodes = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredCodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCodes, page]);

  const totalPages = Math.ceil(filteredCodes.length / ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleTypeChange = (_: React.MouseEvent, value: 'domestic' | 'offshore' | null) => {
    setTransactionType(value);
    setPage(1);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value || '');
    setPage(1);
  };

  const handleLEIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiresLei(e.target.checked);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const clearFilters = () => {
    setTransactionType(null);
    setCategory('');
    setSearch('');
    setRequiresLei(false);
    setPage(1);
  };

  const hasActiveFilters = search || transactionType || category || requiresLei;

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Purpose Code Explorer
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse and search all {staticData?.total_codes || 117} UAE purpose codes
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, flexWrap: 'wrap' }}>
            {/* Search */}
            <TextField
              placeholder="Search codes..."
              value={search}
              onChange={handleSearchChange}
              sx={{ minWidth: 250 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Transaction Type Filter */}
            <ToggleButtonGroup
              value={transactionType}
              exclusive
              onChange={handleTypeChange}
              size="small"
            >
              <ToggleButton value="domestic">
                <DomesticIcon sx={{ mr: 0.5 }} />
                Domestic
              </ToggleButton>
              <ToggleButton value="offshore">
                <OffshoreIcon sx={{ mr: 0.5 }} />
                Offshore
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Category Filter */}
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {staticData?.categories?.map((cat) => (
                  <MenuItem key={cat.category_code} value={cat.category_code}>
                    {cat.category_code} - {cat.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* LEI Filter */}
            <FormControlLabel
              control={
                <Switch
                  checked={requiresLei}
                  onChange={handleLEIChange}
                />
              }
              label="LEI Required"
            />
          </Box>

          {/* Active Filters */}
          {hasActiveFilters && (
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Active filters:
              </Typography>
              {search && (
                <Chip
                  label={`Search: ${search}`}
                  size="small"
                  onDelete={() => { setSearch(''); setPage(1); }}
                />
              )}
              {transactionType && (
                <Chip
                  label={transactionType}
                  size="small"
                  color="primary"
                  onDelete={() => { setTransactionType(null); setPage(1); }}
                />
              )}
              {category && (
                <Chip
                  label={`Category: ${category}`}
                  size="small"
                  color="secondary"
                  onDelete={() => { setCategory(''); setPage(1); }}
                />
              )}
              {requiresLei && (
                <Chip
                  label="LEI Required"
                  size="small"
                  color="warning"
                  onDelete={() => { setRequiresLei(false); setPage(1); }}
                />
              )}
              <Button size="small" onClick={clearFilters}>
                Clear all
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {isLoading && <LinearProgress sx={{ mb: 2 }} />}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load purpose codes. Please try again.
        </Alert>
      )}

      {staticData && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {paginatedCodes.length} of {filteredCodes.length} codes
              {hasActiveFilters && ` (${allCodes.length} total)`}
            </Typography>
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="small"
              />
            )}
          </Box>

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
              <PurposeCodeCard key={code.code} code={code} onClick={setSelectedCode} />
            ))}
          </Box>

          {paginatedCodes.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No codes found
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Try adjusting your filters
              </Typography>
            </Box>
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Code Detail Dialog */}
      <Dialog
        open={!!selectedCode}
        onClose={() => setSelectedCode(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedCode && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                  {selectedCode.code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedCode.name}
                </Typography>
              </Box>
              <Chip label={selectedCode.category_name} color="primary" />
            </DialogTitle>
            <DialogContent>
              {/* Detailed Description from Code Reference */}
              {CODE_DESCRIPTIONS[selectedCode.code] ? (
                <Box sx={{ mb: 3 }}>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    {CODE_DESCRIPTIONS[selectedCode.code].shortDescription}
                  </Alert>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {CODE_DESCRIPTIONS[selectedCode.code].detailedDescription.slice(0, 300)}
                    {CODE_DESCRIPTIONS[selectedCode.code].detailedDescription.length > 300 && '...'}
                  </Typography>
                  {CODE_DESCRIPTIONS[selectedCode.code].useCases.slice(0, 3).map((useCase, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <CheckIcon fontSize="small" color="success" />
                      <Typography variant="body2">{useCase}</Typography>
                    </Box>
                  ))}
                  <Button
                    size="small"
                    startIcon={<ReferenceIcon />}
                    onClick={() => navigate('/reference')}
                    sx={{ mt: 2 }}
                  >
                    View Full Reference
                  </Button>
                </Box>
              ) : selectedCode.description ? (
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedCode.description}
                </Typography>
              ) : null}

              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Category Code</TableCell>
                    <TableCell>{selectedCode.category_code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Domestic Transactions</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.applies_to_domestic ? 'Yes' : 'No'}
                        size="small"
                        color={selectedCode.applies_to_domestic ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Offshore Transactions</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.applies_to_offshore ? 'Yes' : 'No'}
                        size="small"
                        color={selectedCode.applies_to_offshore ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Inbound</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.applies_to_inbound ? 'Yes' : 'No'}
                        size="small"
                        color={selectedCode.applies_to_inbound ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Outbound</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.applies_to_outbound ? 'Yes' : 'No'}
                        size="small"
                        color={selectedCode.applies_to_outbound ? 'success' : 'default'}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>LEI Required</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.requires_lei ? 'Yes' : 'No'}
                        size="small"
                        color={selectedCode.requires_lei ? 'warning' : 'default'}
                      />
                      {selectedCode.lei_threshold_aed && (
                        <Typography variant="caption" sx={{ ml: 1 }}>
                          (Above AED {selectedCode.lei_threshold_aed.toLocaleString()})
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                  {selectedCode.iso_20022_code && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>ISO 20022 Code</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{selectedCode.iso_20022_code}</TableCell>
                    </TableRow>
                  )}
                  {selectedCode.imf_bop_code && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>IMF BoP Code</TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{selectedCode.imf_bop_code}</TableCell>
                    </TableRow>
                  )}
                  {selectedCode.uaefts_reference && (
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>UAEFTS Reference</TableCell>
                      <TableCell>{selectedCode.uaefts_reference}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell>
                      <Chip
                        label={selectedCode.is_active ? 'Active' : 'Inactive'}
                        size="small"
                        color={selectedCode.is_active ? 'success' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedCode(null)} startIcon={<CloseIcon />}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default CodeExplorer;
