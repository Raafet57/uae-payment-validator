import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowForward as ArrowIcon,
  Flag as UAEIcon,
  Public as ISOIcon,
  CurrencyRupee as IndiaIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { TranslationResult, MarketCodeMapping } from '../data/isoMiddleLayer';

interface TranslationFlowDiagramProps {
  result: TranslationResult;
  direction: 'uae-to-india' | 'india-to-uae';
}

// Country flag component
const CountryFlag: React.FC<{ code: string; size?: number }> = ({ code, size = 32 }) => {
  const flagUrl = `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
  return (
    <img
      src={flagUrl}
      alt={code}
      style={{
        width: size,
        height: size * 0.75,
        objectFit: 'cover',
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};

// Confidence indicator
const ConfidenceIndicator: React.FC<{ confidence: string }> = ({ confidence }) => {
  const config: Record<string, { color: string; bgColor: string; icon: React.ReactNode; label: string }> = {
    high: {
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      icon: <CheckIcon sx={{ fontSize: 14 }} />,
      label: 'High Confidence'
    },
    exact: {
      color: '#2e7d32',
      bgColor: '#e8f5e9',
      icon: <CheckIcon sx={{ fontSize: 14 }} />,
      label: 'Exact Match'
    },
    medium: {
      color: '#ed6c02',
      bgColor: '#fff3e0',
      icon: <WarningIcon sx={{ fontSize: 14 }} />,
      label: 'Medium Confidence'
    },
    close: {
      color: '#ed6c02',
      bgColor: '#fff3e0',
      icon: <WarningIcon sx={{ fontSize: 14 }} />,
      label: 'Close Match'
    },
    low: {
      color: '#d32f2f',
      bgColor: '#ffebee',
      icon: <WarningIcon sx={{ fontSize: 14 }} />,
      label: 'Low Confidence'
    },
  };

  const cfg = config[confidence] || config.medium;

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
      px: 1,
      py: 0.25,
      borderRadius: 1,
      bgcolor: cfg.bgColor,
      color: cfg.color,
      fontSize: '0.75rem',
      fontWeight: 500,
    }}>
      {cfg.icon}
      {cfg.label}
    </Box>
  );
};

// Arrow connector with label
const FlowArrow: React.FC<{ label?: string; confidence?: string }> = ({ label, confidence }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 1,
    minWidth: 80,
  }}>
    {label && (
      <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, fontSize: '0.7rem' }}>
        {label}
      </Typography>
    )}
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }}>
      <Box sx={{
        width: 50,
        height: 2,
        bgcolor: confidence === 'high' || confidence === 'exact' ? 'success.main' :
                 confidence === 'medium' || confidence === 'close' ? 'warning.main' : 'grey.400',
        borderRadius: 1,
      }} />
      <ArrowIcon sx={{
        color: confidence === 'high' || confidence === 'exact' ? 'success.main' :
               confidence === 'medium' || confidence === 'close' ? 'warning.main' : 'grey.400',
        fontSize: 20,
        ml: -0.5,
      }} />
    </Box>
  </Box>
);

// Code box component
interface CodeBoxProps {
  title: string;
  code: string;
  name?: string;
  description?: string;
  icon: React.ReactNode;
  flag?: string;
  isPivot?: boolean;
  additionalCodes?: MarketCodeMapping[];
}

const CodeBox: React.FC<CodeBoxProps> = ({
  title,
  code,
  name,
  description,
  icon,
  flag,
  isPivot,
  additionalCodes,
}) => (
  <Paper
    elevation={isPivot ? 4 : 2}
    sx={{
      p: 2,
      minWidth: 180,
      maxWidth: 220,
      textAlign: 'center',
      border: isPivot ? '2px solid' : '1px solid',
      borderColor: isPivot ? 'primary.main' : 'divider',
      bgcolor: isPivot ? 'primary.50' : 'background.paper',
      position: 'relative',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: 4,
      },
    }}
  >
    {/* Header */}
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1.5 }}>
      {flag && <CountryFlag code={flag} size={24} />}
      {icon}
      <Typography variant="caption" fontWeight={600} color="text.secondary">
        {title}
      </Typography>
    </Box>

    <Divider sx={{ mb: 1.5 }} />

    {/* Code */}
    <Typography
      variant="h5"
      sx={{
        fontFamily: 'monospace',
        fontWeight: 700,
        color: isPivot ? 'primary.main' : 'text.primary',
        mb: 0.5,
      }}
    >
      {code}
    </Typography>

    {/* Name */}
    {name && (
      <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
        {name}
      </Typography>
    )}

    {/* Description */}
    {description && (
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
        {description}
      </Typography>
    )}

    {/* Additional codes (for India side with multiple matches) */}
    {additionalCodes && additionalCodes.length > 1 && (
      <Box sx={{ mt: 1.5 }}>
        <Divider sx={{ mb: 1 }} />
        <Typography variant="caption" color="text.secondary">
          Also maps to:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center', mt: 0.5 }}>
          {additionalCodes.slice(1).map((c, i) => (
            <Chip key={i} label={c.code} size="small" variant="outlined" />
          ))}
        </Box>
      </Box>
    )}

    {/* Pivot label */}
    {isPivot && (
      <Chip
        label="PIVOT LAYER"
        size="small"
        color="primary"
        sx={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.65rem',
          height: 20,
        }}
      />
    )}
  </Paper>
);

const TranslationFlowDiagram: React.FC<TranslationFlowDiagramProps> = ({ result, direction }) => {
  const isUAEtoIndia = direction === 'uae-to-india';

  return (
    <Box sx={{ py: 3 }}>
      {/* Title */}
      <Typography variant="h6" textAlign="center" sx={{ mb: 1, fontWeight: 600 }}>
        Translation Flow Visualization
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        ISO 20022 serves as the universal pivot layer for cross-border code translation
      </Typography>

      {/* Flow Diagram */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          flexWrap: 'nowrap',
          overflowX: 'auto',
          py: 2,
          px: 1,
        }}
      >
        {isUAEtoIndia ? (
          <>
            {/* UAE Code */}
            <CodeBox
              title="SOURCE"
              code={result.uaeCode.code}
              name={result.uaeCode.purpose}
              description={result.uaeCode.description}
              icon={<UAEIcon sx={{ color: '#006C35' }} />}
              flag="ae"
            />

            {/* Arrow to ISO */}
            <FlowArrow label="maps to" confidence={result.confidence} />

            {/* ISO 20022 Pivot */}
            <CodeBox
              title="ISO 20022"
              code={result.isoCode.code}
              name={result.isoCode.name}
              description={result.isoCode.definition}
              icon={<ISOIcon sx={{ color: 'primary.main' }} />}
              isPivot
            />

            {/* Arrow to India */}
            <FlowArrow label="translates to" confidence={result.confidence} />

            {/* India Code(s) */}
            <CodeBox
              title="TARGET"
              code={result.indiaCodes[0]?.code || 'N/A'}
              name={result.indiaCodes[0]?.purpose}
              icon={<IndiaIcon sx={{ color: '#FF9933' }} />}
              flag="in"
              additionalCodes={result.indiaCodes}
            />
          </>
        ) : (
          <>
            {/* India Code */}
            <CodeBox
              title="SOURCE"
              code={result.indiaCodes[0]?.code || 'N/A'}
              name={result.indiaCodes[0]?.purpose}
              icon={<IndiaIcon sx={{ color: '#FF9933' }} />}
              flag="in"
            />

            {/* Arrow to ISO */}
            <FlowArrow label="maps to" confidence={result.confidence} />

            {/* ISO 20022 Pivot */}
            <CodeBox
              title="ISO 20022"
              code={result.isoCode.code}
              name={result.isoCode.name}
              description={result.isoCode.definition}
              icon={<ISOIcon sx={{ color: 'primary.main' }} />}
              isPivot
            />

            {/* Arrow to UAE */}
            <FlowArrow label="translates to" confidence={result.confidence} />

            {/* UAE Code */}
            <CodeBox
              title="TARGET"
              code={result.uaeCode.code}
              name={result.uaeCode.purpose}
              description={result.uaeCode.description}
              icon={<UAEIcon sx={{ color: '#006C35' }} />}
              flag="ae"
            />
          </>
        )}
      </Box>

      {/* Confidence Summary */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
        gap: 2,
        flexWrap: 'wrap',
      }}>
        <ConfidenceIndicator confidence={result.confidence} />
        {result.indiaCodes.length > 1 && (
          <Chip
            label={`${result.indiaCodes.length} possible target codes`}
            size="small"
            variant="outlined"
            color="info"
          />
        )}
      </Box>

      {/* Legend */}
      <Box sx={{
        mt: 3,
        p: 2,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          How it works
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isUAEtoIndia ? (
            <>
              The <strong>UAE purpose code</strong> is first mapped to its corresponding <strong>ISO 20022 code</strong>
              (the international standard). This ISO code then serves as a "universal translator" to find
              matching <strong>India purpose codes</strong> used by RBI for inward/outward remittances.
            </>
          ) : (
            <>
              The <strong>India purpose code</strong> is first mapped to its corresponding <strong>ISO 20022 code</strong>
              (the international standard). This ISO code then serves as a "universal translator" to find
              the matching <strong>UAE purpose code</strong> required by CBUAE regulations.
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default TranslationFlowDiagram;
