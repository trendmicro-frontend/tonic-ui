import { renderHook } from '@testing-library/react-hooks';
import useLatest from './useLatest';

describe('useLatest', () => {
  it('should be defined', () => {
    expect(useLatest).toBeDefined();
  });

  it('should return a ref with the latest value for the initial render', () => {
    const { result } = renderHook(
      ({ value }) => useLatest(value),
      {
        initialProps: {
          value: 0,
        },
      },
    );
    expect(result.current).toEqual({ current: 0 });
  });

  it('should always return a ref with the latest value after each update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      {
        initialProps: {
          value: 0,
        },
      },
    );

    rerender({ value: 2 });
    expect(result.current).toEqual({ current: 2 });

    rerender({ value: 4 });
    expect(result.current).toEqual({ current: 4 });

    rerender({ value: 6 });
    expect(result.current).toEqual({ current: 6 });
  });
});
