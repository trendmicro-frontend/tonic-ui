import { renderHook } from '@testing-library/react-hooks';
import { renderHook as renderHookSSR } from '@testing-library/react-hooks/server';
import useMediaQuery from './useMediaQuery';

const createMockMediaMatcher = (matches) => (query) => ({
  matches: matches[query] ?? false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
});

describe('useMediaQuery', () => {
  const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  const originalMatchMedia = global.window.matchMedia;

  beforeEach(() => {
    // Clear mock function called times
    jest.clearAllMocks();

    global.window.matchMedia = createMockMediaMatcher({
      '(min-width: 640px)': true,
      '(min-width: 1024px)': false,
    });
  });

  afterEach(() => {
    global.window.matchMedia = originalMatchMedia;
  });

  it('should be defined', () => {
    expect(useMediaQuery).toBeDefined();
  });

  it('should return true if media query matches', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 640px)'));
    expect(result.current).toBe(true);
  });

  it('should return false if media query does not match', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1280px)'));
    expect(result.current).toBe(false);
  });

  it('[SSR] should console warn if default value is not provided', () => {
    // "window.matchMedia" is not available for the first render
    const matchMedia = global.window.matchMedia;
    global.window.matchMedia = undefined;

    const { hydrate, result } = renderHookSSR(() => useMediaQuery('(min-width: 640px)'));
    expect(consoleWarnSpy).toHaveBeenCalled();
    expect(result.current).toBe(false);
    global.window.matchMedia = matchMedia; // restore "window.matchMedia"
    hydrate();
    expect(result.current).toBe(true);
  });

  it('[SSR] should return default value before hydration', () => {
    const { result } = renderHookSSR(() => useMediaQuery('(min-width: 640px)', false));
    expect(consoleWarnSpy).not.toBeCalled();
    expect(result.current).toBe(false);
  });

  it('[SSR] should return media query result after hydration', () => {
    const { hydrate, result } = renderHookSSR(() => useMediaQuery('(min-width: 640px)', false));
    expect(consoleWarnSpy).not.toBeCalled();
    expect(result.current).toBe(false);
    hydrate();
    expect(result.current).toBe(true);
  });

  it('[SSR] should return media query result after hydration', () => {
    const { hydrate, result } = renderHookSSR(() => useMediaQuery('(min-width: 1280px)', true));
    expect(consoleWarnSpy).not.toBeCalled();
    expect(result.current).toBe(true);
    hydrate();
    expect(result.current).toBe(false);
  });
});
