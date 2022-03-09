import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';
import useEffectOnce from './useEffectOnce';

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

describe('useEffectOnce', () => {
  beforeEach(() => {
    // Clear mock function called times
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useEffectOnce).toBeDefined();
  });

  it('should run provided effect only once', () => {
    const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback));
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
    rerender();
    expect(mockEffectCallback).toHaveBeenCalledTimes(1);
  });

  it('should run the clean-up function when unmounting', () => {
    const { unmount } = renderHook(() => useEffectOnce(mockEffectCallback));
    expect(mockEffectCleanup).not.toHaveBeenCalled();
    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });
});
