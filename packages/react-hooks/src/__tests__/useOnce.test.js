import { act, renderHook } from '@testing-library/react';
import { useRef, useState } from 'react';
import { useOnce } from '..';

describe('useOnce', () => {
  const useTestHook = () => {
    const [value, setValue] = useState(0);
    const callTimes = useRef(0);

    useOnce(() => {
      callTimes.current++;
    }, (value > 0));

    return { value, setValue, callTimes };
  };

  it('should be defined', () => {
    expect(useOnce).toBeDefined();
  });

  it('runs immediately before the first render', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    expect(result.current.callTimes.current).toBe(1);
    act(() => {
      result.current.setValue(value => value + 1);
    });
    expect(result.current.value).toBe(1);
    expect(result.current.callTimes.current).toBe(1);
  });

  it('does not run twice', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    expect(result.current.callTimes.current).toBe(1);
    act(() => {
      result.current.setValue(value => value + 1);
    });
    expect(result.current.value).toBe(1);
    expect(result.current.callTimes.current).toBe(1);
    act(() => {
      result.current.setValue(value => value + 1);
    });
    expect(result.current.value).toBe(2);
    expect(result.current.callTimes.current).toBe(1);
  });
});
