import { renderHook } from '@testing-library/react';
import useSlot from '../useSlot';

describe('useSlot', () => {
  it('does not warn when slotProps is omitted (slotProps.<name> is undefined)', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderHook(() => useSlot({
      name: 'root',
      ownerName: 'InputControl',
      props: {},
      slot: 'div',
      slotProps: undefined,
    }));
    expect(consoleErrorSpy).not.toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('warns when slot is missing, naming the slot and the owner', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    renderHook(() => useSlot({
      name: 'root',
      ownerName: 'InputControl',
      props: {},
      slot: undefined,
      slotProps: {},
    }));
    expect(consoleErrorSpy).toHaveBeenCalledWith('useSlot: slots.root is required but was not provided in InputControl.');
    consoleErrorSpy.mockRestore();
  });

  it('merges props then slotProps (slotProps wins on conflict)', () => {
    const { result } = renderHook(() => useSlot({
      name: 'root',
      props: { id: 'internal', 'data-shared': 'old' },
      slot: 'div',
      slotProps: { 'data-foo': 'bar', 'data-shared': 'new' },
    }));
    const [Element, mergedProps] = result.current;
    expect(Element).toBe('div');
    expect(mergedProps.id).toBe('internal'); // internal prop preserved
    expect(mergedProps['data-foo']).toBe('bar'); // slotProps-only key applied
    expect(mergedProps['data-shared']).toBe('new'); // conflict: slotProps wins
  });

  it('composes __sx from props and slotProps (base stays below the caller override)', () => {
    const { result } = renderHook(() => useSlot({
      name: 'root',
      props: { __sx: { color: 'red' } },
      slot: 'div',
      slotProps: { __sx: { color: 'blue' } },
    }));
    const [, mergedProps] = result.current;
    // Array composition, not object merge: both sides survive, caller last.
    expect(mergedProps.__sx).toEqual([{ color: 'red' }, { color: 'blue' }]);
  });

  it('emits __sx when only props provides it', () => {
    const { result } = renderHook(() => useSlot({
      name: 'root',
      props: { __sx: { color: 'red' } },
      slot: 'div',
      slotProps: {},
    }));
    const [, mergedProps] = result.current;
    expect(mergedProps.__sx).toEqual([{ color: 'red' }]);
  });

  it('emits __sx when only slotProps provides it', () => {
    const { result } = renderHook(() => useSlot({
      name: 'root',
      props: {},
      slot: 'div',
      slotProps: { __sx: { color: 'blue' } },
    }));
    const [, mergedProps] = result.current;
    expect(mergedProps.__sx).toEqual([{ color: 'blue' }]);
  });

  it('does not emit a __sx key when neither side provides one', () => {
    const { result } = renderHook(() => useSlot({
      name: 'root',
      props: { id: 'internal' },
      slot: 'div',
      slotProps: { 'data-foo': 'bar' },
    }));
    const [, mergedProps] = result.current;
    expect(mergedProps).not.toHaveProperty('__sx');
  });
});
