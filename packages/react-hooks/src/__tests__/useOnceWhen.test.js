import { act, renderHook } from '@testing-library/react';
import { useRef, useState } from 'react';
import { useOnceWhen } from '..';

describe('useOnceWhen', () => {
  const useTestHook = () => {
    const [value, setValue] = useState(0);
    const callTimes = useRef(0);

    useOnceWhen(() => {
      callTimes.current++;
    }, (value > 0));

    return { value, setValue, callTimes };
  };

  it('should be defined', () => {
    expect(useOnceWhen).toBeDefined();
  });

  it('runs immediately before render if the condition is true', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    expect(result.current.callTimes.current).toBe(0);
    act(() => {
      result.current.setValue(value => value + 1);
    });
    expect(result.current.value).toBe(1);
    expect(result.current.callTimes.current).toBe(1);
  });

  it('does not run twice even if the condition is true', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    expect(result.current.callTimes.current).toBe(0);
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
