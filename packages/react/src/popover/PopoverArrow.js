import { getComputedStyle, isHTMLElement } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePopoverArrowStyle } from './styles';
import usePopover from './usePopover';

const PopoverArrow = forwardRef((inProps, ref) => {
  const {
    arrowHeight = 8,
    arrowWidth = 12,
    sx,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'PopoverArrow' });
  const {
    placement,
    popoverContentRef,
  } = usePopover();
  const popoverContentEl = popoverContentRef?.current;
  const styleProps = usePopoverArrowStyle({ arrowHeight, arrowWidth });

  if (isHTMLElement(popoverContentEl)) {
    // Compute the background color of the first direct child of the popover content and apply it to the popover arrow
    const computedStyle = getComputedStyle(popoverContentEl.firstChild);
    styleProps.color = computedStyle?.backgroundColor;
  }

  return (
    <Box
      ref={ref}
      role="presentation"
      // The `data-popper-arrow` attribute is utilized by `popper/Popper.js` to designate the element used as the arrow
      data-popper-arrow
      // The `data-popper-placement` attribute is automatically updated by `popper/Popper.js` to reflect the popper's actual placement
      data-popper-placement={placement}
      sx={[
        styleProps,
        ...Array.isArray(sx) ? sx : [sx],
      ]}
      {...rest}
    />
  );
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
