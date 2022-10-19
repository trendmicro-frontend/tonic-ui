import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { usePrevious } from '..';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  it('should return previous state', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      return {
        count,
        setCount,
        prevCount: usePrevious(count),
      };
    });
    expect(result.current.prevCount).toBe(undefined);

    act(() => {
      result.current.setCount(2);
    });
    expect(result.current.prevCount).toBe(0);

    act(() => {
      result.current.setCount(4);
    });
    expect(result.current.prevCount).toBe(2);

    act(() => {
      result.current.setCount(6);
    });
    expect(result.current.prevCount).toBe(4);
  });
});
