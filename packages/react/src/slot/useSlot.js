import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { composeSx } from '@tonic-ui/utils/internal';

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
 * Two channels are *composed* rather than replaced, because both are meant to stack:
 * - `ref` is merged via `useMergeRefs` (component ref + caller ref both fire).
 * - `__sx` is merged via `composeSx` (the component's base styling stays below the caller's
 *   slot `__sx`), so a `slotProps.__sx` can no longer silently clobber the base. `__sx` is
 *   only emitted when at least one side provides it, so non-Box slot elements don't receive
 *   a spurious `__sx`.
 *
 * @param {object} options
 * @param {string} [options.name] - Slot name (e.g. 'root') — identifies the slot in dev error messages
 * @param {string} [options.ownerName] - Parent component displayName — used in dev error messages
 * @param {object} [options.props] - Internal props set by the component (including ref and base `__sx`); user's slotProps take precedence (ref/`__sx` are merged, not replaced)
 * @param {React.ElementType} options.slot - Resolved element type (caller resolves slots/fallback before calling)
 * @param {object} options.slotProps - Resolved props for this slot (caller resolves slotProps[name] before calling)
 * @returns {[React.ElementType, object]}
 */
const useSlot = (options) => {
  const {
    name,
    ownerName,
    props,
    slot,
    slotProps,
  } = options;

  { // Assertion check
    const slotLabel = name ? `slots.${name}` : 'slot element';
    const suffix = ownerName ? ` in ${ownerName}.` : '.';
    useOnceWhen(() => {
      console.error(`useSlot: ${slotLabel} is required but was not provided${suffix}`);
    }, process.env.NODE_ENV !== 'production' && slot === undefined);
  }

  const { ref: propsRef, __sx: propsSx, ...restProps } = props ?? {};
  const { ref: slotRef, __sx: slotSx, ...restSlotProps } = slotProps ?? {};
  const mergedRef = useMergeRefs(propsRef, slotRef);

  const mergedProps = { ...restProps, ...restSlotProps, ref: mergedRef };
  if (propsSx !== undefined || slotSx !== undefined) {
    mergedProps.__sx = composeSx(propsSx, slotSx);
  }

  return [slot, mergedProps];
};

export default useSlot;
