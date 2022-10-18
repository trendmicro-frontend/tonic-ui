import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useEffectOnceWhen from './useEffectOnceWhen';

describe('useEffectOnceWhen', () => {
  const useTestHook = () => {
    const [value, setValue] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    useEffectOnceWhen(() => {
      setValue(value => value + 1);
    }, isEnabled);

    return { value, setIsEnabled };
  };

  it('should be defined', () => {
    expect(useEffectOnceWhen).toBeDefined();
  });

  it('runs immediately after condition is met', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    act(() => {
      result.current.setIsEnabled(true);
    });
    expect(result.current.value).toBe(1);
  });

  it('does not run twice after condition is met', () => {
    const { result } = renderHook(() => useTestHook());
    expect(result.current.value).toBe(0);
    act(() => {
      result.current.setIsEnabled(true);
    });
    expect(result.current.value).toBe(1);
    act(() => {
      result.current.setIsEnabled(false);
    });
    act(() => {
      result.current.setIsEnabled(true);
    });
    expect(result.current.value).toBe(1);
  });
});
