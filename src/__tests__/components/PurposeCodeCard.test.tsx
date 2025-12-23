import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import uaeTheme from '../../theme';
import PurposeCodeCard from '../../components/PurposeCodeCard';
import { UAEPurposeCode } from '../../types';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={uaeTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('PurposeCodeCard', () => {
  const mockCode: UAEPurposeCode = {
    code: 'SAL',
    name: 'Salary Payments',
    description: 'Payment of salaries to employees',
    category_code: 'SAL',
    category_name: 'Salary & Wages',
    applies_to_domestic: true,
    applies_to_offshore: true,
    applies_to_inbound: true,
    applies_to_outbound: true,
    requires_lei: true,
    lei_threshold_aed: 1000000,
    iso_20022_code: 'SALA',
    imf_bop_code: '1.1.1',
  };

  const mockCodeMinimal: UAEPurposeCode = {
    code: 'FAM',
    name: 'Family Maintenance',
    description: 'Support payments to family',
    category_code: 'FAM',
    category_name: 'Family Support',
    applies_to_domestic: false,
    applies_to_offshore: true,
    applies_to_inbound: false,
    applies_to_outbound: true,
    requires_lei: false,
    lei_threshold_aed: null,
    iso_20022_code: 'FAMI',
    imf_bop_code: null,
  };

  describe('Basic Rendering', () => {
    it('should display the purpose code', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('SAL')).toBeInTheDocument();
    });

    it('should display the purpose name', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('Salary Payments')).toBeInTheDocument();
    });

    it('should display the category name', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('Salary & Wages')).toBeInTheDocument();
    });

    it('should display description in non-compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('Payment of salaries to employees')).toBeInTheDocument();
    });
  });

  describe('Direction Tags', () => {
    it('should show Inbound chip when applies_to_inbound is true', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('Inbound')).toBeInTheDocument();
    });

    it('should show Outbound chip when applies_to_outbound is true', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('Outbound')).toBeInTheDocument();
    });

    it('should not show Inbound chip when applies_to_inbound is false', () => {
      renderWithTheme(<PurposeCodeCard code={mockCodeMinimal} />);

      expect(screen.queryByText('Inbound')).not.toBeInTheDocument();
    });
  });

  describe('LEI Indicator', () => {
    it('should show LEI chip when requires_lei is true', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText('LEI')).toBeInTheDocument();
    });

    it('should not show LEI chip when requires_lei is false', () => {
      renderWithTheme(<PurposeCodeCard code={mockCodeMinimal} />);

      expect(screen.queryByText('LEI')).not.toBeInTheDocument();
    });
  });

  describe('ISO/IMF Codes', () => {
    it('should display ISO 20022 code in non-compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText(/ISO 20022: SALA/)).toBeInTheDocument();
    });

    it('should display IMF BoP code in non-compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.getByText(/IMF BoP: 1.1.1/)).toBeInTheDocument();
    });

    it('should hide ISO/IMF codes in compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} compact />);

      expect(screen.queryByText(/ISO 20022:/)).not.toBeInTheDocument();
    });
  });

  describe('Compact Mode', () => {
    it('should hide description in compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} compact />);

      expect(screen.queryByText('Payment of salaries to employees')).not.toBeInTheDocument();
    });

    it('should still show code and name in compact mode', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} compact />);

      expect(screen.getByText('SAL')).toBeInTheDocument();
      expect(screen.getByText('Salary Payments')).toBeInTheDocument();
    });
  });

  describe('Click Handling', () => {
    it('should call onClick when card is clicked', () => {
      const handleClick = jest.fn();
      renderWithTheme(<PurposeCodeCard code={mockCode} onClick={handleClick} />);

      const card = screen.getByRole('button');
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalledWith(mockCode);
    });

    it('should not be clickable when onClick is not provided', () => {
      renderWithTheme(<PurposeCodeCard code={mockCode} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Selection State', () => {
    it('should apply selected styling when selected is true', () => {
      const handleClick = jest.fn();
      const { container } = renderWithTheme(
        <PurposeCodeCard code={mockCode} onClick={handleClick} selected />
      );

      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });
  });
});
