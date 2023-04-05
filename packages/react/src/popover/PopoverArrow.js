import { getComputedStyle, isHTMLElement } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { usePopoverArrowStyle } from './styles';
import usePopover from './usePopover';

const PopoverArrow = forwardRef((
  {
    arrowHeight = 8,
    arrowWidth = 12,
    ...rest
  },
  ref,
) => {
  const {
    placement,
    popoverContentRef,
  } = usePopover();
  const styleProps = usePopoverArrowStyle({ arrowHeight, arrowWidth, placement });
  const colorStyleProps = (() => {
    const popoverContentEl = popoverContentRef?.current;
    if (isHTMLElement(popoverContentEl)) {
      // Compute the background color of the first direct child of the popover content and apply it to the popover arrow
      const computedStyle = getComputedStyle(popoverContentEl.firstChild);
      return {
        color: computedStyle?.backgroundColor,
      };
    }
    return {};
  })();

  return (
    <Box
      ref={ref}
      role="presentation"
      data-popper-arrow // This data attribute is used by the Popper.js library to identify the element to use as the arrow (refer to "popper/Popper.js")
      {...styleProps}
      {...colorStyleProps}
      {...rest}
    />
  );
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
