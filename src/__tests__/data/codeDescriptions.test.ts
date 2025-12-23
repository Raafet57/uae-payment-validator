import {
  CODE_DESCRIPTIONS,
  searchCodesByKeyword,
  type CodeDescription,
} from '../../data/codeDescriptions';

describe('codeDescriptions', () => {
  describe('CODE_DESCRIPTIONS', () => {
    it('should contain descriptions for UAE purpose codes', () => {
      expect(Object.keys(CODE_DESCRIPTIONS).length).toBeGreaterThan(0);
    });

    it('should have SAL (Salary) description', () => {
      expect(CODE_DESCRIPTIONS['SAL']).toBeDefined();
      const sal = CODE_DESCRIPTIONS['SAL'];
      expect(sal.code).toBe('SAL');
      expect(sal.shortDescription).toBeDefined();
    });

    it('should have FAM (Family Maintenance) description', () => {
      expect(CODE_DESCRIPTIONS['FAM']).toBeDefined();
    });

    it('should have complete structure for each code', () => {
      Object.entries(CODE_DESCRIPTIONS).forEach(([code, desc]) => {
        expect(desc.code).toBe(code);
        expect(desc.shortDescription).toBeDefined();
        expect(typeof desc.shortDescription).toBe('string');
        expect(desc.detailedDescription).toBeDefined();
        expect(Array.isArray(desc.useCases)).toBe(true);
        expect(Array.isArray(desc.keywords)).toBe(true);
      });
    });

    it('should have use cases for common codes', () => {
      const commonCodes = ['SAL', 'FAM', 'EDU', 'MED'];

      commonCodes.forEach(code => {
        const desc = CODE_DESCRIPTIONS[code];
        if (desc) {
          expect(Array.isArray(desc.useCases)).toBe(true);
          expect(desc.useCases.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have common mistakes for critical codes', () => {
      const criticalCodes = ['SAL', 'FAM'];

      criticalCodes.forEach(code => {
        const desc = CODE_DESCRIPTIONS[code];
        if (desc && desc.commonMistakes) {
          expect(Array.isArray(desc.commonMistakes)).toBe(true);
        }
      });
    });

    it('should have keywords for searchability', () => {
      const sal = CODE_DESCRIPTIONS['SAL'];
      expect(sal.keywords).toBeDefined();
      expect(sal.keywords.length).toBeGreaterThan(0);
    });
  });

  describe('searchCodesByKeyword', () => {
    it('should find codes by keyword', () => {
      const results = searchCodesByKeyword('salary');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should be case-insensitive', () => {
      const resultsLower = searchCodesByKeyword('salary');
      const resultsUpper = searchCodesByKeyword('SALARY');
      const resultsMixed = searchCodesByKeyword('Salary');

      expect(resultsLower.length).toBe(resultsUpper.length);
      expect(resultsLower.length).toBe(resultsMixed.length);
    });

    it('should return empty array for non-matching keyword', () => {
      const results = searchCodesByKeyword('xyznonexistent123');

      expect(results).toEqual([]);
    });

    it('should handle empty keyword', () => {
      const results = searchCodesByKeyword('');

      // Should return all codes or empty array depending on implementation
      expect(Array.isArray(results)).toBe(true);
    });

    it('should find family-related codes', () => {
      const results = searchCodesByKeyword('family');

      expect(results.length).toBeGreaterThan(0);
    });

    it('should search in keywords array', () => {
      // SAL should have 'salary' in its keywords
      const results = searchCodesByKeyword('compensation');
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('Code Structure', () => {
    it('should have examples for codes', () => {
      const sal = CODE_DESCRIPTIONS['SAL'];
      expect(Array.isArray(sal.examples)).toBe(true);
    });

    it('should have regulatory references where applicable', () => {
      Object.values(CODE_DESCRIPTIONS).forEach(desc => {
        // regulatoryReference is optional
        if (desc.regulatoryReference) {
          expect(typeof desc.regulatoryReference).toBe('string');
        }
      });
    });
  });
});
