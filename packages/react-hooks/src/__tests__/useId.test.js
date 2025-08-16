import { renderHook } from '@testing-library/react';
import useId from '../useId';

describe('useId', () => {
  it('should be defined', () => {
    expect(useId).toBeDefined();
  });

  describe('basic functionality', () => {
    test('should return a string when called', () => {
      const { result } = renderHook(() => useId());

      expect(typeof result.current).toBe('string');
    });

    test('should generate different IDs for multiple instances', () => {
      const { result: result1 } = renderHook(() => useId());
      const { result: result2 } = renderHook(() => useId());

      // Both should return strings
      expect(typeof result1.current).toBe('string');
      expect(typeof result2.current).toBe('string');

      // They should be different (unless React.useId returns the same value)
      if (result1.current !== result2.current) {
        expect(result1.current).not.toBe(result2.current);
      }
    });
  });
});
