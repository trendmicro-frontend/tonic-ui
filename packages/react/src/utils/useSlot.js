import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';

/**
 * An internal hook to create a Tonic UI slot.
 *
 * Returns a tuple `[ElementType, mergedProps]` where:
 * - `ElementType` is the resolved element type for this slot
 * - `mergedProps` are the fully merged props to spread onto `<ElementType />`
 *
 * Props are merged in this order (later wins):
 *   props → slotProps
 *
 * @param {object} options
 * @param {string} [options.name] - Slot name (e.g. 'transition', 'popper') — used in dev error messages
 * @param {string} [options.ownerDisplayName] - Parent component displayName — used in dev error messages
 * @param {object} [options.props] - Internal props set by the component (including ref); user's slotProps take precedence
 * @param {React.ElementType} options.slot - Resolved element type (caller resolves slots/fallback before calling)
 * @param {object} options.slotProps - Resolved props for this slot (caller resolves slotProps[name] before calling)
 * @returns {[React.ElementType, object]}
 */
const useSlot = (options) => {
  const {
    name,
    ownerDisplayName,
    props,
    slot,
    slotProps,
  } = options;

  const slotPropsLabel = name ? `slotProps.${name}` : 'slotProps';
  const suffix = ownerDisplayName ? ` in ${ownerDisplayName}.` : '.';
  useOnceWhen(() => {
    console.error(`useSlot: slot is required but was not provided${suffix}`);
  }, process.env.NODE_ENV !== 'production' && slot === undefined);
  useOnceWhen(() => {
    console.error(`useSlot: ${slotPropsLabel} is required but was not provided${suffix}`);
  }, process.env.NODE_ENV !== 'production' && slotProps === undefined);

  const { ref: propsRef, ...restProps } = props ?? {};
  const { ref: slotRef, ...restSlotProps } = slotProps ?? {};
  const mergedRef = useMergeRefs(propsRef, slotRef);

  return [slot, { ...restProps, ...restSlotProps, ref: mergedRef }];
};

export default useSlot;
