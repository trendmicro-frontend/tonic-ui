import {
  Dropdown,
  DropdownButton,
  useDefaultProps,
} from '@tonic-ui/react';
import { forwardRef } from 'react';

/**
 * Example: compatibility shim for legacy dropdown APIs.
 *
 * Copy this file into your app when a legacy dropdown uses `slots.toggle` /
 * `slotProps.toggle` / `children`.
 *
 * Not a package export. Kept in sync with
 * `packages/react/src/dropdown/__tests__/DropdownShim.js`, which pins the same
 * shim against the test suite.
 */
// - `slots.toggle` swaps the self-wiring toggle component (default: `DropdownButton`).
// - `slotProps.toggle` is passed directly to that component.
// - `children` provides the toggle content, falling back to `renderItem(value)`.
const DropdownShim = forwardRef((inProps, ref) => {
  const {
    children,
    slots = {},
    slotProps = {},
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DropdownShim' });

  const Toggle = slots.toggle ?? DropdownButton;
  const { toggle: toggleSlotProps, ...slotPropsRest } = { ...slotProps };

  return (
    <Dropdown
      ref={ref}
      renderToggle={({ renderItem, value }) => (
        <Toggle {...toggleSlotProps}>
          {children ?? renderItem(value)}
        </Toggle>
      )}
      slotProps={slotPropsRest}
      {...rest}
    />
  );
});

DropdownShim.displayName = 'DropdownShim';

export default DropdownShim;
