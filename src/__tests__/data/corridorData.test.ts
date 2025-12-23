import {
  UAE_CORRIDORS,
  CORRIDOR_MARKETS,
  CORRIDOR_STATS,
  getComplexityColor,
  getComplexityLabel,
  UAE_MARKET,
} from '../../data/corridorData';

describe('corridorData', () => {
  describe('UAE_MARKET', () => {
    it('should have correct UAE market data', () => {
      expect(UAE_MARKET.code).toBe('AE');
      expect(UAE_MARKET.name).toBe('United Arab Emirates');
      expect(UAE_MARKET.currency).toBe('AED');
      expect(UAE_MARKET.totalCodes).toBeGreaterThan(100);
    });

    it('should have regulatory body defined', () => {
      expect(UAE_MARKET.regulatoryBody).toBeDefined();
      expect(UAE_MARKET.regulatoryBody).toContain('CBUAE');
    });
  });

  describe('CORRIDOR_MARKETS', () => {
    it('should contain major remittance destinations', () => {
      expect(CORRIDOR_MARKETS['IN']).toBeDefined(); // India
      expect(CORRIDOR_MARKETS['PK']).toBeDefined(); // Pakistan
      expect(CORRIDOR_MARKETS['PH']).toBeDefined(); // Philippines
    });

    it('should have complete market data for each destination', () => {
      Object.entries(CORRIDOR_MARKETS).forEach(([code, market]) => {
        expect(market.code).toBe(code);
        expect(market.name).toBeDefined();
        expect(market.currency).toBeDefined();
        expect(market.totalCodes).toBeGreaterThan(0);
        expect(market.regulatoryBody).toBeDefined();
      });
    });

    it('should have ISO alignment flag', () => {
      Object.values(CORRIDOR_MARKETS).forEach(market => {
        expect(typeof market.isoAligned).toBe('boolean');
      });
    });
  });

  describe('UAE_CORRIDORS', () => {
    it('should have corridors for major destinations', () => {
      expect(UAE_CORRIDORS.length).toBeGreaterThan(0);

      const destinations = UAE_CORRIDORS.map(c => c.receive.code);
      expect(destinations).toContain('IN'); // India corridor
    });

    it('should have UAE as send market for all corridors', () => {
      UAE_CORRIDORS.forEach(corridor => {
        expect(corridor.send.code).toBe('AE');
      });
    });

    it('should have complexity rating for each corridor', () => {
      UAE_CORRIDORS.forEach(corridor => {
        expect(['low', 'medium', 'high', 'very_high']).toContain(corridor.complexity);
      });
    });

    it('should have challenges listed for each corridor', () => {
      UAE_CORRIDORS.forEach(corridor => {
        expect(Array.isArray(corridor.challenges)).toBe(true);
        expect(corridor.challenges.length).toBeGreaterThan(0);
      });
    });

    it('should have common use cases for each corridor', () => {
      UAE_CORRIDORS.forEach(corridor => {
        expect(Array.isArray(corridor.commonUseCases)).toBe(true);
        expect(corridor.commonUseCases.length).toBeGreaterThan(0);
      });
    });

    it('India corridor should have very_high complexity', () => {
      const indiaCorridor = UAE_CORRIDORS.find(c => c.receive.code === 'IN');

      expect(indiaCorridor).toBeDefined();
      if (indiaCorridor) {
        expect(indiaCorridor.complexity).toBe('very_high');
      }
    });
  });

  describe('CORRIDOR_STATS', () => {
    it('should have total markets count', () => {
      expect(CORRIDOR_STATS.totalMarkets).toBeGreaterThan(0);
    });

    it('should have total codes count', () => {
      expect(CORRIDOR_STATS.totalCodes).toBeGreaterThan(1000);
    });

    it('should have ISO aligned and proprietary market counts', () => {
      expect(CORRIDOR_STATS.isoAlignedMarkets).toBeGreaterThanOrEqual(0);
      expect(CORRIDOR_STATS.proprietaryMarkets).toBeGreaterThan(0);

      // Sum should equal total markets
      expect(CORRIDOR_STATS.isoAlignedMarkets + CORRIDOR_STATS.proprietaryMarkets)
        .toBe(CORRIDOR_STATS.totalMarkets);
    });
  });

  describe('getComplexityColor', () => {
    it('should return green for low complexity', () => {
      const color = getComplexityColor('low');
      expect(color).toBe('#4caf50');
    });

    it('should return orange for medium complexity', () => {
      const color = getComplexityColor('medium');
      expect(color).toBe('#ff9800');
    });

    it('should return red for high complexity', () => {
      const color = getComplexityColor('high');
      expect(color).toBe('#f44336');
    });

    it('should return purple for very_high complexity', () => {
      const color = getComplexityColor('very_high');
      expect(color).toBe('#9c27b0');
    });

    it('should return grey for unknown complexity', () => {
      const color = getComplexityColor('unknown');
      expect(color).toBe('#757575');
    });
  });

  describe('getComplexityLabel', () => {
    it('should return "Low Complexity" for low', () => {
      expect(getComplexityLabel('low')).toBe('Low Complexity');
    });

    it('should return "Medium Complexity" for medium', () => {
      expect(getComplexityLabel('medium')).toBe('Medium Complexity');
    });

    it('should return "High Complexity" for high', () => {
      expect(getComplexityLabel('high')).toBe('High Complexity');
    });

    it('should return "Very High Complexity" for very_high', () => {
      expect(getComplexityLabel('very_high')).toBe('Very High Complexity');
    });

    it('should return "Unknown" for unknown input', () => {
      expect(getComplexityLabel('unknown')).toBe('Unknown');
    });
  });
});
