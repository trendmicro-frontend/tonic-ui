import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps, warnRemovedProps } from '@tonic-ui/utils';
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
    color, // deprecated
    strokeWidth, // deprecated
    speed, // removed
    size = defaultSize,
    lineColor,
    lineWidth,
    trackColor,
    trackWidth,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Spinner.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('color', {
        prefix,
        alternative: 'lineColor',
        willRemove: true,
      });
    }, (color !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('strokeWidth', {
        prefix,
        alternative: ['lineWidth', 'trackWidth'],
        willRemove: true,
      });
    }, (strokeWidth !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('speed', {
        prefix,
      });
    }, (speed !== undefined));

    lineColor = lineColor ?? color; // TODO: color is deprecated
    lineWidth = lineWidth ?? strokeWidth; // TODO: strokeWidth is deprecated
    trackWidth = trackWidth ?? strokeWidth; // TODO: strokeWidth is deprecated
  }

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
