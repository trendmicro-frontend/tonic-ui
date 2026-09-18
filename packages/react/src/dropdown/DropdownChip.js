import { composeSx } from '@tonic-ui/utils/internal';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { Tag, TagCloseButton } from '../tag';
import DropdownToggle from './DropdownToggle';
import {
  useDropdownChipCloseButtonStyle,
  useDropdownChipPillStyle,
  useDropdownChipRootStyle,
} from './styles';

/**
 * @typedef {Object} DropdownChipProps
 * @property {React.ReactNode} [children] - The content of the dropdown chip.
 * @property {boolean} [disabled] - Whether the dropdown chip is disabled. Sets the disabled state on the pill and prevents menu activation.
 * @property {boolean} [isClosable] - Shows a close button on the right side of the chip.
 * @property {() => void} [onClose] - Called when the close button is clicked.
 */

/**
 * A chip-style dropdown toggle: a `Tag` pill that is itself the toggle.
 *
 * The whole pill is focusable and clickable, and it carries the `Tag` focus
 * ring. The close button (`isClosable`) is an overlay rendered next to the pill,
 * so it is a second focus stop instead of an interactive control nested inside
 * the toggle.
 *
 * `sx` and style props style the pill. `disabled` is forwarded to the toggle;
 * every other prop goes to the pill.
 *
 * @type {ForwardRefComponent<'div', DropdownChipProps>}
 */
const DropdownChip = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    isClosable,
    onClose,
    __sx: __sxProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DropdownChip' });
  const rootStyleProps = useDropdownChipRootStyle();
  const { sx: pillSxProps, overrides: pillOverrides } = useDropdownChipPillStyle({ disabled, isClosable });
  const closeButtonStyleProps = useDropdownChipCloseButtonStyle();

  return (
    <DropdownToggle disabled={disabled}>
      {({ getToggleProps }) => (
        <Box
          ref={ref}
          __sx={rootStyleProps}
        >
          <Tag
            {...getToggleProps()}
            disabled={disabled}
            {...pillOverrides}
            {...rest}
            __sx={composeSx(pillSxProps, __sxProp)}
          >
            {children}
          </Tag>
          {!!isClosable && (
            <TagCloseButton
              disabled={disabled}
              onClick={onClose}
              __sx={closeButtonStyleProps}
            />
          )}
        </Box>
      )}
    </DropdownToggle>
  );
});

DropdownChip.displayName = 'DropdownChip';

export default DropdownChip;
