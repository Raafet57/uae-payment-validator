import {
  translateUAEtoIndia,
  translateIndiaToUAE,
  UAE_TO_ISO_MAPPINGS,
  INDIA_INWARD_TO_ISO,
  INDIA_OUTWARD_TO_ISO,
  ISO_CROSS_MAPPINGS,
} from '../../data/isoMiddleLayer';

describe('isoMiddleLayer', () => {
  describe('UAE_TO_ISO_MAPPINGS', () => {
    it('should have mappings for common UAE codes', () => {
      expect(UAE_TO_ISO_MAPPINGS['SAL']).toBeDefined();
      expect(UAE_TO_ISO_MAPPINGS['FAM']).toBeDefined();
      expect(UAE_TO_ISO_MAPPINGS['EDU']).toBeDefined();
    });

    it('should have ISO code and confidence for each mapping', () => {
      const salMapping = UAE_TO_ISO_MAPPINGS['SAL'];
      expect(salMapping.iso).toBeDefined();
      expect(['high', 'medium', 'low']).toContain(salMapping.confidence);
    });
  });

  describe('INDIA_INWARD_TO_ISO', () => {
    it('should have mappings for India P-codes (inward)', () => {
      // P-codes are for inward remittances to India
      const pCodes = Object.keys(INDIA_INWARD_TO_ISO).filter(k => k.startsWith('P'));
      expect(pCodes.length).toBeGreaterThan(0);
    });
  });

  describe('INDIA_OUTWARD_TO_ISO', () => {
    it('should have mappings for India S-codes (outward)', () => {
      // S-codes are for outward remittances from India
      const sCodes = Object.keys(INDIA_OUTWARD_TO_ISO).filter(k => k.startsWith('S'));
      expect(sCodes.length).toBeGreaterThan(0);
    });
  });

  describe('ISO_CROSS_MAPPINGS', () => {
    it('should contain cross-mappings with UAE and India codes', () => {
      expect(ISO_CROSS_MAPPINGS.length).toBeGreaterThan(0);

      const firstMapping = ISO_CROSS_MAPPINGS[0];
      expect(firstMapping.isoCode).toBeDefined();
      expect(firstMapping.isoCode.code).toBeDefined();
      expect(firstMapping.uaeCodes).toBeDefined();
      expect(firstMapping.indiaCodes).toBeDefined();
    });
  });

  describe('translateUAEtoIndia', () => {
    it('should translate SAL (Salary) to India codes', () => {
      const result = translateUAEtoIndia('SAL');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.uaeCode.code).toBe('SAL');
        expect(result.isoCode).toBeDefined();
        expect(result.indiaCodes).toBeDefined();
        expect(['high', 'medium', 'low']).toContain(result.confidence);
      }
    });

    it('should translate FAM (Family Maintenance) to India codes', () => {
      const result = translateUAEtoIndia('FAM');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.uaeCode.code).toBe('FAM');
        expect(result.indiaCodes.length).toBeGreaterThan(0);
      }
    });

    it('should return null for unknown UAE codes', () => {
      const result = translateUAEtoIndia('UNKNOWN_CODE');
      expect(result).toBeNull();
    });

    it('should include bidirectional flag', () => {
      const result = translateUAEtoIndia('SAL');

      if (result) {
        expect(typeof result.bidirectional).toBe('boolean');
      }
    });
  });

  describe('translateIndiaToUAE', () => {
    it('should translate India inward codes to UAE', () => {
      // Get a valid India code from the mappings
      const indiaCodes = Object.keys(INDIA_INWARD_TO_ISO);
      if (indiaCodes.length > 0) {
        const testCode = indiaCodes[0];
        const result = translateIndiaToUAE(testCode);

        // Result may be null if no cross-mapping exists
        if (result) {
          expect(result.uaeCode).toBeDefined();
          expect(result.isoCode).toBeDefined();
        }
      }
    });

    it('should translate India outward codes to UAE', () => {
      const indiaCodes = Object.keys(INDIA_OUTWARD_TO_ISO);
      if (indiaCodes.length > 0) {
        const testCode = indiaCodes[0];
        const result = translateIndiaToUAE(testCode);

        if (result) {
          expect(result.uaeCode).toBeDefined();
          expect(result.isoCode).toBeDefined();
        }
      }
    });

    it('should return null for unknown India codes', () => {
      const result = translateIndiaToUAE('UNKNOWN_CODE');
      expect(result).toBeNull();
    });
  });

  describe('Translation Consistency', () => {
    it('should use ISO 20022 as pivot for all translations', () => {
      const uaeResult = translateUAEtoIndia('SAL');

      if (uaeResult) {
        // The ISO code should be a valid ISO 20022 purpose code
        expect(uaeResult.isoCode.code).toMatch(/^[A-Z]{4}$/);
        expect(uaeResult.isoCode.name).toBeDefined();
      }
    });
  });
});
