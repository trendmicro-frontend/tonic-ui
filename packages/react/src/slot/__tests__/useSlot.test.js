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
});
