/* eslint-disable react/jsx-no-bind */
import { forwardRef } from 'react';
import { useDefaultProps } from '../../default-props';
import DropdownButton from '../DropdownButton';
import Dropdown from '../Dropdown';

/**
 * @typedef {import('../Dropdown').DropdownProps} DropdownShimProps
 */

/**
 * Compatibility shim that exposes the legacy dropdown on top of the `Dropdown`.
 *
 * - `slots.toggle` swaps the self-wiring toggle component (defaults to
 *   `DropdownButton`). It must own its menu wiring through the surrounding context.
 * - `slotProps.toggle` is passed directly to the swapped toggle component.
 * - `children` becomes the toggle content, falling back to `renderItem(value)` when
 *   absent (same contract as `Dropdown` — `renderItem` must be null-safe before any
 *   selection, or provide `children`).
 *
 * Everything else forwards to `Dropdown` unchanged.
 * A consumer-provided `renderToggle` bypasses the shim toggle entirely.
 *
 * @type {ForwardRefComponent<'div', DropdownShimProps>}
 */
const DropdownShim = forwardRef((inProps, ref) => {
  const {
    children,
    slots = {},
    slotProps = {},
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DropdownShim' });

  const Toggle = slots.toggle ?? DropdownButton;
  const { toggle: toggleSlotProps, ...slotPropsRest } = { ...slotProps };

  // The shim's renderToggle closes over slots.toggle / slotProps.toggle / children
  const renderToggle = ({ renderItem, value }) => (
    <Toggle {...toggleSlotProps}>
      {children ?? renderItem(value)}
    </Toggle>
  );

  return (
    <Dropdown
      ref={ref}
      renderToggle={renderToggle}
      slotProps={slotPropsRest}
      {...rest}
    />
  );
});

DropdownShim.displayName = 'DropdownShim';

export default DropdownShim;
