import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import uaeTheme from '../../theme';
import STPScoreGauge from '../../components/STPScoreGauge';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={uaeTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('STPScoreGauge', () => {
  describe('Score Display', () => {
    it('should display the score value', () => {
      renderWithTheme(<STPScoreGauge score={85} rating="high" />);

      expect(screen.getByText('85')).toBeInTheDocument();
    });

    it('should round decimal scores', () => {
      renderWithTheme(<STPScoreGauge score={85.7} rating="high" />);

      expect(screen.getByText('86')).toBeInTheDocument();
    });

    it('should display 0 score correctly', () => {
      renderWithTheme(<STPScoreGauge score={0} rating="low" />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should display 100 score correctly', () => {
      renderWithTheme(<STPScoreGauge score={100} rating="high" />);

      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('Rating Labels', () => {
    it('should display "High STP" for high rating', () => {
      renderWithTheme(<STPScoreGauge score={95} rating="high" />);

      expect(screen.getByText('High STP')).toBeInTheDocument();
    });

    it('should display "Medium STP" for medium rating', () => {
      renderWithTheme(<STPScoreGauge score={75} rating="medium" />);

      expect(screen.getByText('Medium STP')).toBeInTheDocument();
    });

    it('should display "Low STP" for low rating', () => {
      renderWithTheme(<STPScoreGauge score={50} rating="low" />);

      expect(screen.getByText('Low STP')).toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('should render with small size', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={85} rating="high" size="small" />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with medium size (default)', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={85} rating="high" />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render with large size', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={85} rating="high" size="large" />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Color Coding', () => {
    it('should render high score (>=90) correctly', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={95} rating="high" />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('95')).toBeInTheDocument();
    });

    it('should render medium score (70-89) correctly', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={75} rating="medium" />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    it('should render low score (<70) correctly', () => {
      const { container } = renderWithTheme(<STPScoreGauge score={50} rating="low" />);

      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle boundary score of 90', () => {
      renderWithTheme(<STPScoreGauge score={90} rating="high" />);

      expect(screen.getByText('90')).toBeInTheDocument();
      expect(screen.getByText('High STP')).toBeInTheDocument();
    });

    it('should handle boundary score of 70', () => {
      renderWithTheme(<STPScoreGauge score={70} rating="medium" />);

      expect(screen.getByText('70')).toBeInTheDocument();
      expect(screen.getByText('Medium STP')).toBeInTheDocument();
    });

    it('should handle boundary score of 69', () => {
      renderWithTheme(<STPScoreGauge score={69} rating="low" />);

      expect(screen.getByText('69')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible score text', () => {
      renderWithTheme(<STPScoreGauge score={85} rating="high" />);

      const scoreElement = screen.getByText('85');
      expect(scoreElement).toBeVisible();
    });

    it('should have accessible rating label', () => {
      renderWithTheme(<STPScoreGauge score={85} rating="high" />);

      const ratingElement = screen.getByText('High STP');
      expect(ratingElement).toBeVisible();
    });
  });
});
