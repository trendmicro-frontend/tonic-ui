import React, {
  forwardRef,
} from 'react';
import Box from '../Box';

const PopperArrow = forwardRef((
  {
    arrowAt,
    ...rest
  },
  ref,
) => {
  const placement = ['left', 'right', 'top', 'bottom'];

  if (placement.includes(arrowAt)) {
    const arrowPlacement = { [arrowAt]: '12px' };
    return (
      <Box
        ref={ref}
        data-arrow-style=""
        role="presentation"
        {...arrowPlacement}
        {...rest}
      />
    );
  }

  return (
    <Box
      ref={ref}
      data-popper-arrow=""
      data-arrow-style=""
      role="presentation"
      {...rest}
    />
  );
});

PopperArrow.displayName = 'PopperArrow';

export default PopperArrow;
