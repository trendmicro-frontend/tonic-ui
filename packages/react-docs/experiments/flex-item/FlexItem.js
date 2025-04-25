import { Box, OverflowTooltip } from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import { useFlexItemStyle } from './styles';

const FlexItem = forwardRef((
  {
    /**
     * The content of the component.
     */
    children,

    /**
     * Determines if the flex item has a fixed size (default is false).
     */
    fixed = false,

    /**
     * The props used for each slot inside.
     */
    slotProps = {},

    /**
     * The components used for each slot inside.
     */
    slots = {},

    /**
     * A boolean or string to conditionally show a tooltip with a label (default is true).
     */
    tooltip = false,

    ...rest
  },
  ref,
) => {
  const TooltipComponent = slots?.tooltip ?? OverflowTooltip;
  const styleProps = useFlexItemStyle({ fixed });

  // Determine the tooltip label:
  // If `tooltip` is not a boolean, use it as the label.
  // If `tooltip` is a boolean (true), use `children` as the label (i.e., the content of the flex item).
  const tooltipLabel = (typeof tooltip !== 'boolean') ? tooltip : children;

  return (
    <TooltipComponent
      PopperProps={{
        usePortal: true,
      }}
      disabled={!tooltip}
      label={tooltipLabel}
      maxWidth={320}
      {...slotProps?.tooltip}
    >
      {({ ref: truncateRef, style: truncateStyle }) => (
        <Box
          ref={truncateRef}
          {...truncateStyle}
          {...styleProps}
          {...rest}
        >
          {children}
        </Box>
      )}
    </TooltipComponent>
  );
});

FlexItem.displayName = 'FlexItem';

export default FlexItem;
