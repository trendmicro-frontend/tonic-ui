import React, { forwardRef } from 'react';
import Box from '../Box';

const PopperArrow = forwardRef(({
  arrowAt,
  ...rest
}, ref) => {
  const arrowPlacements = ['left', 'right', 'top', 'bottom'];
  if (arrowPlacements.includes(arrowAt)) {
    const arrowPlacementStyle = {
      [arrowAt]: '12px',
    };
    return (
      <Box
        data-arrow-style=""
        role="presentation"
        {...arrowPlacementStyle}
        {...rest}
      />
    );
  }

  return (
    <Box
      data-popper-arrow=""
      data-arrow-style=""
      role="presentation"
      {...rest}
    />
  );
});

PopperArrow.displayName = 'PopperArrow';

export default PopperArrow;
