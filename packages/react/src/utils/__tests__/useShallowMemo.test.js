import { renderHook } from '@testing-library/react';
import useShallowMemo from '../useShallowMemo';

describe('useShallowMemo', () => {
  test('returns the same memoized function across re-renders', () => {
    const { result, rerender } = renderHook(() => useShallowMemo());
    const fn = result.current;
    rerender();
    expect(result.current).toBe(fn);
  });

  test('each hook instance has its own independent cache', () => {
    const { result: { current: firstShallowMemo } } = renderHook(() => useShallowMemo());
    const { result: { current: secondShallowMemo } } = renderHook(() => useShallowMemo());

    const a = firstShallowMemo({ color: 'red' });
    const b = secondShallowMemo({ color: 'blue' });

    // calling secondShallowMemo with different values should not affect firstShallowMemo's cache
    const a2 = firstShallowMemo({ color: 'red' });

    expect(a).toBe(a2);
    expect(a).not.toBe(b);
  });

  test('returns the same reference when inputs are shallowly equal, and a new reference when a value changes', () => {
    const { result } = renderHook(() => useShallowMemo());
    const shallowMemo = result.current;
    const state = { color: 'red', size: 'md' };

    const a = shallowMemo(state);
    const b = shallowMemo({ color: 'red', size: 'md' });
    const c = shallowMemo({ ...state });
    const d = shallowMemo({ ...state, color: 'blue' });

    expect(a).toBe(b);
    expect(b).toBe(c);
    expect(c).not.toBe(d);
  });

  test('returns a new reference when a function callback changes', () => {
    const { result } = renderHook(() => useShallowMemo());
    const shallowMemo = result.current;
    const onChangeA = jest.fn();
    const onChangeB = jest.fn();

    const a = shallowMemo({ onChange: onChangeA });
    const b = shallowMemo({ onChange: onChangeB });

    expect(a).not.toBe(b);
  });
});
