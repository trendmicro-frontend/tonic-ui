import React, { forwardRef } from 'react';
import { Box } from '../box';
import {
  useSpinnerStyle,
  useSpinnerSVGBaseStyle,
  useSpinnerSVGTrackStyle,
  useSpinnerSVGLineStyle,
} from './styles';

const defaultSize = 'md';

const Spinner = forwardRef((
  {
    size = defaultSize,
    lineColor,
    lineWidth,
    trackColor,
    trackWidth,
    ...rest
  },
  ref,
) => {
  const styleProps = useSpinnerStyle({ size });
  const svgBaseStyleProps = useSpinnerSVGBaseStyle({ size });
  const svgTrackStyleProps = useSpinnerSVGTrackStyle({ size, trackColor, trackWidth });
  const svgLineStyleProps = useSpinnerSVGLineStyle({ size, lineColor, lineWidth });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      <Box
        as="svg"
        {...svgBaseStyleProps}
      >
        <Box
          as="circle"
          {...svgTrackStyleProps}
        />
        <Box
          as="circle"
          {...svgLineStyleProps}
        />
      </Box>
    </Box>
  );
});

Spinner.displayName = 'Spinner';

export default Spinner;
