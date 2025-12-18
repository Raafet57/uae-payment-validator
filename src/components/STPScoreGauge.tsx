import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface STPScoreGaugeProps {
  score: number;
  rating: 'high' | 'medium' | 'low';
  size?: 'small' | 'medium' | 'large';
}

const STPScoreGauge: React.FC<STPScoreGaugeProps> = ({ score, rating, size = 'medium' }) => {
  const dimensions = {
    small: { size: 80, thickness: 4, fontSize: '1.25rem', labelSize: '0.625rem' },
    medium: { size: 120, thickness: 5, fontSize: '1.75rem', labelSize: '0.75rem' },
    large: { size: 160, thickness: 6, fontSize: '2.25rem', labelSize: '0.875rem' },
  };

  const { size: circleSize, thickness, fontSize, labelSize } = dimensions[size];

  const getColor = () => {
    if (score >= 90) return '#006C35'; // UAE Green - High
    if (score >= 70) return '#F59E0B'; // Warning Yellow - Medium
    return '#CE1126'; // UAE Red - Low
  };

  const getRatingLabel = () => {
    switch (rating) {
      case 'high':
        return 'High STP';
      case 'medium':
        return 'Medium STP';
      case 'low':
        return 'Low STP';
      default:
        return 'Unknown';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={circleSize}
        thickness={thickness}
        sx={{ color: '#E5E7EB' }}
      />
      {/* Score circle */}
      <CircularProgress
        variant="determinate"
        value={score}
        size={circleSize}
        thickness={thickness}
        sx={{
          color: getColor(),
          position: 'absolute',
          left: 0,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h4"
          component="span"
          sx={{
            fontWeight: 700,
            color: getColor(),
            fontSize,
            lineHeight: 1,
          }}
        >
          {Math.round(score)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: labelSize,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          {getRatingLabel()}
        </Typography>
      </Box>
    </Box>
  );
};

export default STPScoreGauge;
