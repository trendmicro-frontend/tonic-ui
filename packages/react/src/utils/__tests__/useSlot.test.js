import { render, renderHook } from '@testing-library/react';
import { createRef, forwardRef } from 'react';
import { useSlot } from '../../slot';

const DefaultElement = forwardRef((props, ref) => <div ref={ref} {...props} />);
DefaultElement.displayName = 'DefaultElement';

const CustomElement = forwardRef((props, ref) => <span ref={ref} {...props} />);
CustomElement.displayName = 'CustomElement';

describe('useSlot', () => {
  it('should be defined', () => {
    expect(useSlot).toBeDefined();
  });

  describe('slot resolution', () => {
    it('returns the default slot element', () => {
      const { result } = renderHook(() => useSlot({
        slot: DefaultElement,
        slotProps: {},
      }));
      expect(result.current[0]).toBe(DefaultElement);
    });

    it('returns the overridden slot element', () => {
      const { result } = renderHook(() => useSlot({
        slot: CustomElement,
        slotProps: {},
      }));
      expect(result.current[0]).toBe(CustomElement);
    });
  });

  describe('props merging', () => {
    it('uses slotProps when props is not provided', () => {
      const { result } = renderHook(() => useSlot({
        slot: DefaultElement,
        slotProps: { 'data-foo': 'bar' },
      }));
      expect(result.current[1]['data-foo']).toBe('bar');
    });

    it('uses props when slotProps does not override', () => {
      const { result } = renderHook(() => useSlot({
        slot: DefaultElement,
        slotProps: {},
        props: { 'data-value': 'from-component' },
      }));
      expect(result.current[1]['data-value']).toBe('from-component');
    });

    it('slotProps wins over props for the same key', () => {
      const { result } = renderHook(() => useSlot({
        slot: DefaultElement,
        slotProps: { 'data-value': 'from-user' },
        props: { 'data-value': 'from-component' },
      }));
      expect(result.current[1]['data-value']).toBe('from-user');
    });

    it('props is optional — works without it', () => {
      const { result } = renderHook(() => useSlot({
        slot: DefaultElement,
        slotProps: { 'data-foo': 'bar' },
      }));
      expect(result.current[1]['data-foo']).toBe('bar');
    });
  });

  describe('ref merging', () => {
    it('merges props.ref and slotProps.ref onto the same element', () => {
      const propsRef = createRef();
      const slotPropsRef = createRef();

      const TestComponent = () => {
        const [ElementType, slotProps] = useSlot({
          slot: DefaultElement,
          slotProps: { ref: slotPropsRef },
          props: { ref: propsRef },
        });
        return <ElementType {...slotProps} />;
      };

      render(<TestComponent />);

      expect(propsRef.current).toBeInstanceOf(HTMLDivElement);
      expect(slotPropsRef.current).toBeInstanceOf(HTMLDivElement);
      expect(propsRef.current).toBe(slotPropsRef.current);
    });
  });

  describe('dev warnings', () => {
    it('logs an error when slot is not provided', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      renderHook(() => useSlot({
        name: 'transition',
        ownerName: 'TestOwner',
        slot: undefined,
        slotProps: {},
      }));
      expect(consoleSpy).toHaveBeenCalledWith(
        'useSlot: slots.transition is required but was not provided in TestOwner.'
      );
      consoleSpy.mockRestore();
    });

    it('does not warn when slotProps is undefined', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      renderHook(() => useSlot({
        name: 'transition',
        ownerName: 'TestOwner',
        slot: DefaultElement,
        slotProps: undefined,
      }));
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
