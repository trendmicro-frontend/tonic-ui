import { toCSSVariable } from '../toCSSVariable';

describe('toCSSVariable', () => {
  describe('Basic conversions', () => {
    it('should handle scale tokens', () => {
      expect(toCSSVariable('space.4x', { prefix: 'tonic' }))
        .toBe('--tonic-space-4x');
      expect(toCSSVariable('sizes.12x', { prefix: 'tonic' }))
        .toBe('--tonic-sizes-12x');
      expect(toCSSVariable('radii.sm', { prefix: 'tonic' }))
        .toBe('--tonic-radii-sm');
    });

    it('should convert spaces to underscores', () => {
      expect(toCSSVariable('colors.light gray', { prefix: 'tonic' }))
        .toBe('--tonic-colors-light_gray');
    });

    it('should preserve hyphens in token names', () => {
      expect(toCSSVariable('colors.blue-50', { prefix: 'tonic' }))
        .toBe('--tonic-colors-blue-50');
    });

    it('should work without prefix', () => {
      expect(toCSSVariable('colors.white.primary', {}))
        .toBe('--colors-white-primary');
    });

    it('should work with empty prefix', () => {
      expect(toCSSVariable('colors.white.primary', { prefix: '' }))
        .toBe('--colors-white-primary');
    });

    it('should handle empty name', () => {
      expect(toCSSVariable('', { prefix: 'tonic' }))
        .toBe('--tonic');
    });

    it('should handle custom delimiter', () => {
      expect(toCSSVariable('colors.white.primary', { prefix: 'custom', delimiter: '_' }))
        .toBe('--custom_colors_white_primary');
    });

    it('should preserve leading underscores for special tokens', () => {
      expect(toCSSVariable('colors._highlight', { prefix: 'tonic' }))
        .toBe('--tonic-colors-_highlight');
    });

    it('should preserve trailing underscores', () => {
      expect(toCSSVariable('colors.white_', { prefix: 'tonic' }))
        .toBe('--tonic-colors-white_');
    });

    it('should handle mixed separators', () => {
      expect(toCSSVariable('colors.red:60.dark', { prefix: 'tonic' }))
        .toBe('--tonic-colors-red_60-dark');
    });

    it('should replace non-alphanumeric with underscore', () => {
      expect(toCSSVariable('colors.test@value', { prefix: 'tonic' }))
        .toBe('--tonic-colors-test_value');
    });
  });

  describe('v3 color tokens', () => {
    const testCases = [
      ['colors.red:100', '--tonic-colors-red_100'],
      ['colors.red:90', '--tonic-colors-red_90'],
      ['colors.red:60', '--tonic-colors-red_60'],
      ['colors.blue:60', '--tonic-colors-blue_60'],
      ['colors.gray:50', '--tonic-colors-gray_50'],
      ['colors.white:emphasis', '--tonic-colors-white_emphasis'],
      ['colors.white:primary', '--tonic-colors-white_primary'],
      ['colors.white:secondary', '--tonic-colors-white_secondary'],
      ['colors.white:tertiary', '--tonic-colors-white_tertiary'],
      ['colors.black:emphasis', '--tonic-colors-black_emphasis'],
      ['colors.black:primary', '--tonic-colors-black_primary'],
      ['colors.black:secondary', '--tonic-colors-black_secondary'],
      ['colors.black:tertiary', '--tonic-colors-black_tertiary'],
    ];

    testCases.forEach(([input, expected]) => {
      it(`should convert ${input} to ${expected}`, () => {
        expect(toCSSVariable(input, { prefix: 'tonic' })).toBe(expected);
      });
    });
  });

  describe('v4 semantic color tokens', () => {
    const testCases = [
      // Text tokens
      ['colors.text.primary', '--tonic-colors-text-primary'],
      ['colors.text.secondary', '--tonic-colors-text-secondary'],
      ['colors.text.tertiary', '--tonic-colors-text-tertiary'],
      ['colors.text.accent', '--tonic-colors-text-accent'],
      ['colors.text.disabled', '--tonic-colors-text-disabled'],

      // Background tokens
      ['colors.background.low', '--tonic-colors-background-low'],
      ['colors.background.high', '--tonic-colors-background-high'],
      ['colors.background.highest', '--tonic-colors-background-highest'],

      // Border tokens
      ['colors.border.primary', '--tonic-colors-border-primary'],
      ['colors.border.secondary', '--tonic-colors-border-secondary'],
      ['colors.border.tertiary', '--tonic-colors-border-tertiary'],
      ['colors.border._primary.hovered', '--tonic-colors-border-_primary-hovered'],
      ['colors.border._primary.selected', '--tonic-colors-border-_primary-selected'],

      // Action tokens
      ['colors.actions.hovered', '--tonic-colors-actions-hovered'],
      ['colors.actions.selected', '--tonic-colors-actions-selected'],

      // Alert tokens
      ['colors.alert.riskLevel.high.text', '--tonic-colors-alert-riskLevel-high-text'],
      ['colors.alert.severity.critical.text', '--tonic-colors-alert-severity-critical-text'],

      // Internal tokens
      ['colors.text._fixed.dark.primary', '--tonic-colors-text-_fixed-dark-primary'],
      ['colors.text._fixed.light.primary', '--tonic-colors-text-_fixed-light-primary'],
      ['colors._highlight', '--tonic-colors-_highlight'],
    ];

    testCases.forEach(([input, expected]) => {
      it(`should convert ${input} to ${expected}`, () => {
        expect(toCSSVariable(input, { prefix: 'tonic' })).toBe(expected);
      });
    });
  });
});
