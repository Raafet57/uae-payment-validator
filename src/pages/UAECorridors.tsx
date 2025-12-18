import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  FlightTakeoff as FlightIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingIcon,
  CompareArrows as CompareIcon,
  Category as CategoryIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  UAE_MARKET,
  CORRIDOR_MARKETS,
  UAE_CORRIDORS,
  CORRIDOR_STATS,
  getComplexityColor,
  getComplexityLabel,
} from '../data/corridorData';

// Flag component using country codes
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

const UAECorridors: React.FC = () => {
  const [selectedCorridor, setSelectedCorridor] = useState<string>('IN');

  const corridorInfo = UAE_CORRIDORS.find(c => c.receive.code === selectedCorridor);
  const destinationMarket = CORRIDOR_MARKETS[selectedCorridor];

  const handleCorridorChange = (_: React.MouseEvent<HTMLElement>, newCorridor: string | null) => {
    if (newCorridor) {
      setSelectedCorridor(newCorridor);
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          UAE Remittance Corridors
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze purpose code complexity across UAE's top remittance destinations.
          Real regulatory data from {CORRIDOR_STATS.totalMarkets} markets, {CORRIDOR_STATS.totalCodes.toLocaleString()} codes.
        </Typography>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {CORRIDOR_STATS.totalMarkets}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Corridor Markets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                {CORRIDOR_STATS.totalCodes.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total PPC Codes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#f44336' }}>
                {CORRIDOR_STATS.proprietaryMarkets}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Proprietary Systems
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>
                {CORRIDOR_STATS.isoAlignedMarkets}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ISO-Aligned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Corridor Selector */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlightIcon color="primary" />
            Select Destination Corridor
          </Typography>
          <ToggleButtonGroup
            value={selectedCorridor}
            exclusive
            onChange={handleCorridorChange}
            sx={{ flexWrap: 'wrap', gap: 1 }}
          >
            {Object.entries(CORRIDOR_MARKETS)
              .filter(([code]) => code !== 'AE')
              .map(([code, market]) => (
                <ToggleButton
                  key={code}
                  value={code}
                  sx={{
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <CountryFlag code={code} size={20} />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {market.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {market.totalCodes} codes
                    </Typography>
                  </Box>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Corridor Comparison */}
      {corridorInfo && destinationMarket && (
        <>
          {/* Complexity Alert */}
          <Alert
            severity={corridorInfo.complexity === 'low' ? 'success' : corridorInfo.complexity === 'very_high' ? 'error' : 'warning'}
            sx={{ mb: 3 }}
            icon={corridorInfo.complexity === 'very_high' ? <WarningIcon /> : undefined}
          >
            <AlertTitle>
              {getComplexityLabel(corridorInfo.complexity)} - UAE to {destinationMarket.name}
            </AlertTitle>
            {corridorInfo.complexity === 'very_high' && (
              <>Both markets use proprietary code systems with no ISO alignment. Manual mapping required.</>
            )}
            {corridorInfo.complexity === 'high' && (
              <>Significant complexity due to different categorization approaches between markets.</>
            )}
            {corridorInfo.complexity === 'low' && (
              <>{destinationMarket.name} uses ISO-like codes, making mapping more straightforward.</>
            )}
          </Alert>

          {/* Side-by-Side Comparison */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* UAE Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', borderTop: 4, borderColor: 'primary.main' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CountryFlag code="AE" size={32} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {UAE_MARKET.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {UAE_MARKET.regulatoryBody}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Total Codes</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>{UAE_MARKET.totalCodes}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Code Set</Typography>
                      <Typography variant="h6">{UAE_MARKET.codeSetId}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Currency</Typography>
                      <Typography variant="h6">{UAE_MARKET.currency}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">ISO Aligned</Typography>
                      <Chip
                        label={UAE_MARKET.isoAligned ? 'Yes' : 'No'}
                        color={UAE_MARKET.isoAligned ? 'success' : 'error'}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>Sample UAE Codes</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 250 }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Purpose</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {UAE_MARKET.sampleCodes.slice(0, 8).map((code) => (
                          <TableRow key={code.code} hover>
                            <TableCell>
                              <Chip label={code.code} size="small" color="primary" variant="outlined" />
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem' }}>{code.purpose}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Destination Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ height: '100%', borderTop: 4, borderColor: 'secondary.main' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <CountryFlag code={destinationMarket.code} size={32} />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {destinationMarket.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {destinationMarket.regulatoryBody}
                      </Typography>
                    </Box>
                    {destinationMarket.remittanceRank && (
                      <Chip
                        label={`#${destinationMarket.remittanceRank} Corridor`}
                        color="secondary"
                        size="small"
                        sx={{ ml: 'auto' }}
                      />
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Total Codes</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>{destinationMarket.totalCodes}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Code Set</Typography>
                      <Typography variant="h6">{destinationMarket.codeSetId}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">Currency</Typography>
                      <Typography variant="h6">{destinationMarket.currency}</Typography>
                    </Grid>
                    <Grid size={6}>
                      <Typography variant="body2" color="text.secondary">ISO Aligned</Typography>
                      <Chip
                        label={destinationMarket.isoAligned ? 'Yes' : 'No'}
                        color={destinationMarket.isoAligned ? 'success' : 'error'}
                        size="small"
                      />
                    </Grid>
                  </Grid>

                  {destinationMarket.estimatedVolume && (
                    <Box sx={{ mt: 2, p: 1.5, bgcolor: 'secondary.light', borderRadius: 1 }}>
                      <Typography variant="body2" color="secondary.dark">
                        <TrendingIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                        Estimated Annual Volume: <strong>{destinationMarket.estimatedVolume}</strong>
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" gutterBottom>Sample {destinationMarket.name} Codes</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 250 }}>
                    <Table size="small" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700 }}>Code</TableCell>
                          <TableCell sx={{ fontWeight: 700 }}>Purpose</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {destinationMarket.sampleCodes.slice(0, 8).map((code) => (
                          <TableRow key={code.code} hover>
                            <TableCell>
                              <Chip label={code.code} size="small" color="secondary" variant="outlined" />
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.75rem' }}>{code.purpose}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Complexity Meter */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CompareIcon color="primary" />
                Corridor Complexity Analysis
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Code Ratio: {UAE_MARKET.totalCodes} UAE vs {destinationMarket.totalCodes} {destinationMarket.code}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {(destinationMarket.totalCodes / UAE_MARKET.totalCodes).toFixed(1)}x
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((destinationMarket.totalCodes / 700) * 100, 100)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getComplexityColor(corridorInfo.complexity),
                    }
                  }}
                />
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckIcon color="success" fontSize="small" />
                    Common Use Cases
                  </Typography>
                  <List dense>
                    {corridorInfo.commonUseCases.map((useCase, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={useCase}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningIcon color="warning" fontSize="small" />
                    Key Challenges
                  </Typography>
                  <List dense>
                    {corridorInfo.challenges.map((challenge, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemText
                          primary={challenge}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Category Comparison */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                    <CategoryIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                    UAE Code Categories
                  </Typography>
                  {Object.entries(UAE_MARKET.topCategories).map(([category, count]) => (
                    <Box key={category} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{category}</Typography>
                        <Typography variant="body2" color="text.secondary">{count}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(count / 20) * 100}
                        sx={{ height: 4, borderRadius: 2 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 700 }}>
                    <CategoryIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} />
                    {destinationMarket.name} Code Categories
                  </Typography>
                  {Object.entries(destinationMarket.topCategories).slice(0, 6).map(([category, count]) => (
                    <Box key={category} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">{category}</Typography>
                        <Typography variant="body2" color="text.secondary">{count}</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(count / 50) * 100}
                        color="secondary"
                        sx={{ height: 4, borderRadius: 2 }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}

      {/* All Corridors Summary */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All UAE Corridors Summary
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Destination</TableCell>
                  <TableCell align="center">Codes</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">ISO Aligned</TableCell>
                  <TableCell align="center">Est. Volume</TableCell>
                  <TableCell>Regulatory Body</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {UAE_CORRIDORS.map((corridor) => (
                  <TableRow
                    key={corridor.receive.code}
                    hover
                    selected={corridor.receive.code === selectedCorridor}
                    onClick={() => setSelectedCorridor(corridor.receive.code)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CountryFlag code={corridor.receive.code} size={20} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {corridor.receive.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={corridor.receive.totalCodes} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getComplexityLabel(corridor.complexity).replace(' Complexity', '')}
                        size="small"
                        sx={{
                          bgcolor: getComplexityColor(corridor.complexity),
                          color: 'white',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {corridor.receive.isoAligned ? (
                        <CheckIcon color="success" />
                      ) : (
                        <Typography variant="body2" color="text.secondary">No</Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2">
                        {corridor.receive.estimatedVolume || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {corridor.receive.regulatoryBody}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Data Source Note */}
      <Alert severity="info" sx={{ mt: 3 }} icon={<InfoIcon />}>
        <AlertTitle>Data Source</AlertTitle>
        Code data sourced from official regulatory publications: CBUAE UAEFTS AUX700, RBI Master Direction,
        SBP FE Manual, BSP Circulars, Bangladesh Bank Guidelines, and CBE regulations.
        Code counts and categorizations are based on 2024-2025 regulatory datasets.
      </Alert>
    </Box>
  );
};

export default UAECorridors;
