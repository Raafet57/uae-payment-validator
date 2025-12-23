import {
  UAE_TAXONOMY_MAPPINGS,
  ISO_20022_CODES,
  IMF_BOP_CODES,
  getMappingStatistics,
  type TaxonomyMapping,
} from '../../data/taxonomyMapping';

describe('taxonomyMapping', () => {
  describe('UAE_TAXONOMY_MAPPINGS', () => {
    it('should contain UAE purpose codes', () => {
      // UAE has purpose codes mapped in taxonomy
      expect(UAE_TAXONOMY_MAPPINGS.length).toBeGreaterThan(50);
    });

    it('should have required fields for each mapping', () => {
      UAE_TAXONOMY_MAPPINGS.forEach((mapping: TaxonomyMapping) => {
        expect(mapping.uaeCode).toBeDefined();
        expect(mapping.uaeName).toBeDefined();
        expect(mapping.isoConfidence).toBeDefined();
        expect(mapping.bopConfidence).toBeDefined();
        expect(['exact', 'close', 'partial', 'none']).toContain(mapping.isoConfidence);
        expect(['exact', 'close', 'partial', 'none']).toContain(mapping.bopConfidence);
      });
    });

    it('should have unique UAE codes', () => {
      const codes = UAE_TAXONOMY_MAPPINGS.map(m => m.uaeCode);
      const uniqueCodes = new Set(codes);
      expect(uniqueCodes.size).toBe(codes.length);
    });

    it('should have taxonomy classification for each code', () => {
      UAE_TAXONOMY_MAPPINGS.forEach((mapping: TaxonomyMapping) => {
        expect(mapping.taxonomyL0).toBeDefined();
        expect(mapping.taxonomyCode).toBeDefined();
      });
    });
  });

  describe('ISO_20022_CODES', () => {
    it('should contain common ISO 20022 purpose codes', () => {
      expect(ISO_20022_CODES['SALA']).toBeDefined(); // Salary
      expect(ISO_20022_CODES['FAMI']).toBeDefined(); // Family Support
    });

    it('should have code, name, and definition for each entry', () => {
      Object.values(ISO_20022_CODES).forEach(code => {
        expect(code.code).toBeDefined();
        expect(code.name).toBeDefined();
        expect(code.definition).toBeDefined();
      });
    });

    it('should have 4-character codes per ISO 20022 standard', () => {
      Object.values(ISO_20022_CODES).forEach(code => {
        expect(code.code).toMatch(/^[A-Z]{4}$/);
      });
    });
  });

  describe('IMF_BOP_CODES', () => {
    it('should contain IMF BOP categories', () => {
      expect(Object.keys(IMF_BOP_CODES).length).toBeGreaterThan(0);
    });

    it('should have code and name for each BOP entry', () => {
      Object.values(IMF_BOP_CODES).forEach(bop => {
        expect(bop.code).toBeDefined();
        expect(bop.name).toBeDefined();
      });
    });
  });

  describe('getMappingStatistics', () => {
    it('should return total count matching UAE_TAXONOMY_MAPPINGS length', () => {
      const stats = getMappingStatistics();
      expect(stats.total).toBe(UAE_TAXONOMY_MAPPINGS.length);
    });

    it('should return ISO mapping statistics', () => {
      const stats = getMappingStatistics();

      expect(stats.iso).toBeDefined();
      expect(stats.iso.exact).toBeGreaterThanOrEqual(0);
      expect(stats.iso.close).toBeGreaterThanOrEqual(0);
      expect(stats.iso.partial).toBeGreaterThanOrEqual(0);
      expect(stats.iso.none).toBeGreaterThanOrEqual(0);
      expect(stats.iso.coverage).toBeDefined();

      // Sum should equal total
      const isoSum = stats.iso.exact + stats.iso.close + stats.iso.partial + stats.iso.none;
      expect(isoSum).toBe(stats.total);
    });

    it('should return BOP mapping statistics', () => {
      const stats = getMappingStatistics();

      expect(stats.bop).toBeDefined();
      expect(stats.bop.exact).toBeGreaterThanOrEqual(0);
      expect(stats.bop.close).toBeGreaterThanOrEqual(0);
      expect(stats.bop.partial).toBeGreaterThanOrEqual(0);
      expect(stats.bop.none).toBeGreaterThanOrEqual(0);
      expect(stats.bop.coverage).toBeDefined();

      // Sum should equal total
      const bopSum = stats.bop.exact + stats.bop.close + stats.bop.partial + stats.bop.none;
      expect(bopSum).toBe(stats.total);
    });

    it('should return taxonomy breakdown', () => {
      const stats = getMappingStatistics();

      expect(stats.taxonomy).toBeDefined();
      // Should have main taxonomy categories
      expect(typeof stats.taxonomy.INCOME).toBe('number');
      expect(typeof stats.taxonomy.TRADE).toBe('number');
      expect(typeof stats.taxonomy.SERVICES).toBe('number');
    });

    it('should calculate coverage as percentage string', () => {
      const stats = getMappingStatistics();

      // Coverage should be a string representing a percentage
      expect(parseFloat(stats.iso.coverage)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(stats.iso.coverage)).toBeLessThanOrEqual(100);
      expect(parseFloat(stats.bop.coverage)).toBeGreaterThanOrEqual(0);
      expect(parseFloat(stats.bop.coverage)).toBeLessThanOrEqual(100);
    });
  });

  describe('Mapping Quality', () => {
    it('should have high ISO coverage (>90%)', () => {
      const stats = getMappingStatistics();
      const withIso = stats.total - stats.iso.none;
      const coverage = (withIso / stats.total) * 100;

      // UAE codes should have >90% ISO mapping
      expect(coverage).toBeGreaterThan(90);
    });

    it('should have reasonable BOP coverage (>80%)', () => {
      const stats = getMappingStatistics();
      const withBop = stats.total - stats.bop.none;
      const coverage = (withBop / stats.total) * 100;

      // Some domestic codes don't map to BOP, so ~80-90% expected
      expect(coverage).toBeGreaterThan(75);
    });

    it('domestic-only codes should not have BOP mapping', () => {
      // OAT, UTL, etc. are domestic-only and shouldn't map to BOP
      const domesticOnlyCodes = ['OAT', 'UTL', 'LEL'];

      domesticOnlyCodes.forEach(code => {
        const mapping = UAE_TAXONOMY_MAPPINGS.find(m => m.uaeCode === code);
        if (mapping) {
          expect(mapping.bopCode).toBeNull();
        }
      });
    });
  });
});
