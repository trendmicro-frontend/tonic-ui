import { renderHook } from '@testing-library/react-hooks';
import { renderHook as renderHookSSR } from '@testing-library/react-hooks/server';
import useHydrated from './useHydrated';

describe('useHydrated', () => {
  it('should be defined', () => {
    expect(useHydrated).toBeDefined();
  });

  it('should return true if hydrated', () => {
    const { result } = renderHook(() => useHydrated());
    expect(result.current).toBe(true);
  });

  it('[SSR] should return false before hydration', () => {
    const { result } = renderHookSSR(() => useHydrated());
    expect(result.current).toBe(false);
  });

  it('[SSR] should return true after hydration', () => {
    const { hydrate, result } = renderHookSSR(() => useHydrated());
    expect(result.current).toBe(false);
    hydrate();
    expect(result.current).toBe(true);
  });
});
