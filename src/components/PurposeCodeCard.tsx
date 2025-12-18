import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  SwapHoriz as DomesticIcon,
  Public as OffshoreIcon,
  ArrowDownward as InboundIcon,
  ArrowUpward as OutboundIcon,
  VerifiedUser as LEIIcon,
} from '@mui/icons-material';
import { UAEPurposeCode } from '../types';

interface PurposeCodeCardProps {
  code: UAEPurposeCode;
  onClick?: (code: UAEPurposeCode) => void;
  selected?: boolean;
  compact?: boolean;
}

const PurposeCodeCard: React.FC<PurposeCodeCardProps> = ({
  code,
  onClick,
  selected = false,
  compact = false,
}) => {
  const getCategoryColor = (categoryCode: string): string => {
    const colors: Record<string, string> = {
      SAL: '#006C35', // UAE Green
      FAM: '#8B5CF6', // Purple
      GDE: '#0284C7', // Blue
      GDI: '#0369A1', // Darker Blue
      SRV: '#C8A415', // UAE Gold
      TRV: '#F59E0B', // Orange
      EDU: '#10B981', // Green
      MED: '#EF4444', // Red
      INV: '#6366F1', // Indigo
      DIV: '#8B5CF6', // Purple
      INT: '#14B8A6', // Teal
      LNR: '#F97316', // Orange
      CRD: '#EC4899', // Pink
      RNT: '#84CC16', // Lime
      TAX: '#64748B', // Slate
      CHR: '#F43F5E', // Rose
      OTH: '#6B7280', // Gray
    };
    return colors[categoryCode] || '#6B7280';
  };

  const cardContent = (
    <CardContent sx={{ p: compact ? 1.5 : 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box>
          <Typography
            variant={compact ? 'subtitle1' : 'h6'}
            sx={{
              fontWeight: 700,
              fontFamily: 'monospace',
              color: getCategoryColor(code.category_code),
            }}
          >
            {code.code}
          </Typography>
          <Chip
            label={code.category_name}
            size="small"
            sx={{
              mt: 0.5,
              bgcolor: `${getCategoryColor(code.category_code)}15`,
              color: getCategoryColor(code.category_code),
              fontWeight: 500,
              fontSize: '0.7rem',
            }}
          />
        </Box>

        {/* Applicability Icons */}
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {code.applies_to_domestic && (
            <Tooltip title="Domestic">
              <DomesticIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            </Tooltip>
          )}
          {code.applies_to_offshore && (
            <Tooltip title="Offshore/Cross-border">
              <OffshoreIcon sx={{ fontSize: 18, color: 'primary.main' }} />
            </Tooltip>
          )}
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          mb: compact ? 0 : 1,
          color: 'text.primary',
        }}
      >
        {code.name}
      </Typography>

      {!compact && code.description && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {code.description}
        </Typography>
      )}

      {/* Tags */}
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: compact ? 1 : 0 }}>
        {code.applies_to_inbound && (
          <Chip
            icon={<InboundIcon sx={{ fontSize: 14 }} />}
            label="Inbound"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.65rem', height: 22 }}
          />
        )}
        {code.applies_to_outbound && (
          <Chip
            icon={<OutboundIcon sx={{ fontSize: 14 }} />}
            label="Outbound"
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.65rem', height: 22 }}
          />
        )}
        {code.requires_lei && (
          <Tooltip title={code.lei_threshold_aed ? `Required for >= AED ${code.lei_threshold_aed.toLocaleString()}` : 'LEI Required'}>
            <Chip
              icon={<LEIIcon sx={{ fontSize: 14 }} />}
              label="LEI"
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem', height: 22 }}
            />
          </Tooltip>
        )}
      </Box>

      {/* ISO/IMF codes */}
      {!compact && (code.iso_20022_code || code.imf_bop_code) && (
        <Box sx={{ mt: 1.5, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            {code.iso_20022_code && `ISO 20022: ${code.iso_20022_code}`}
            {code.iso_20022_code && code.imf_bop_code && ' | '}
            {code.imf_bop_code && `IMF BoP: ${code.imf_bop_code}`}
          </Typography>
        </Box>
      )}
    </CardContent>
  );

  if (onClick) {
    return (
      <Card
        sx={{
          border: selected ? '2px solid' : '1px solid',
          borderColor: selected ? 'primary.main' : 'divider',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 4px 12px rgba(0, 108, 53, 0.15)',
          },
        }}
      >
        <CardActionArea onClick={() => onClick(code)}>
          {cardContent}
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {cardContent}
    </Card>
  );
};

export default PurposeCodeCard;
