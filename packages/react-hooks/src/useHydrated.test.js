import { renderHook } from '@testing-library/react';
import useHydrated from './useHydrated';

describe('useHydrated', () => {
  it('should be defined', () => {
    expect(useHydrated).toBeDefined();
  });

  it('should return true if hydrated', () => {
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(true);
  });

  // FIXME: SSR is not yet supported
  // https://github.com/testing-library/react-testing-library/issues/1080
  // https://github.com/testing-library/react-testing-library/issues/561#issuecomment-594032426

  /*
  it('[SSR] should return false before hydration', () => {
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(false);
  });

  it('[SSR] should return true after hydration', () => {
    const { hydrate, result } = renderHook(() => useHydrated());
    expect(result.current).toBe(false);
    hydrate();
    expect(result.current).toBe(true);
  });
  */
});
