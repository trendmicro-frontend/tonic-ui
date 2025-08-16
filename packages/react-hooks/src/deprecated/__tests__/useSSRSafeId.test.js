import { renderHook } from '@testing-library/react';
import useSSRSafeId from '../useSSRSafeId';

describe('useSSRSafeId', () => {
  it('should be defined', () => {
    expect(useSSRSafeId).toBeDefined();
    expect(typeof useSSRSafeId).toBe('function');
  });

  it('should return a string ID', () => {
    const { result } = renderHook(() => useSSRSafeId());

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe('string');
    expect(result.current).toMatch(/^\d+$/); // Should be a numeric string
  });

  it('should generate unique IDs for multiple instances', () => {
    const { result: result1 } = renderHook(() => useSSRSafeId());
    const { result: result2 } = renderHook(() => useSSRSafeId());
    const { result: result3 } = renderHook(() => useSSRSafeId());

    expect(result1.current).toBeDefined();
    expect(result2.current).toBeDefined();
    expect(result3.current).toBeDefined();

    // All IDs should be different
    expect(result1.current).not.toBe(result2.current);
    expect(result2.current).not.toBe(result3.current);
    expect(result1.current).not.toBe(result3.current);
  });

  it('should maintain stable IDs across re-renders', () => {
    const { result, rerender } = renderHook(() => useSSRSafeId());

    const firstId = result.current;
    expect(firstId).toBeDefined();

    // Re-render the hook
    rerender();

    // ID should remain the same
    expect(result.current).toBe(firstId);
  });

  it('should generate sequential numeric IDs', () => {
    const ids = [];

    // Create multiple hooks to test sequential generation
    for (let i = 0; i < 5; i++) {
      const { result } = renderHook(() => useSSRSafeId());
      if (result.current) {
        ids.push(parseInt(result.current, 10));
      }
    }

    expect(ids.length).toBe(5);

    // IDs should be sequential
    for (let i = 1; i < ids.length; i++) {
      expect(ids[i]).toBe(ids[i - 1] + 1);
    }
  });
});
