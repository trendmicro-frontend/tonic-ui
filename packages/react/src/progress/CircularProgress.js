import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useCircularProgressRootStyle,
  useCircularProgressSVGStyle,
  useCircularProgressTrackStyle,
  useCircularProgressIndicatorStyle,
} from './styles';

const defaultSize = 48;
const defaultThickness = 4;
const defaultVariant = 'indeterminate';

const CircularProgressRoot = (props) => <Box {...props} />;
const CircularProgressSVG = (props) => <Box as="svg" {...props} />;
const CircularProgressTrack = (props) => <Box as="circle" {...props} />;
const CircularProgressIndicator = (props) => <Box as="circle" {...props} />;

/**
 * @typedef {Object} CircularProgressProps
 * @property {string} [color='blue:60'] - The color of the circular progress. It supports both default and custom theme colors.
 * @property {number} [min=0] - The minimum value of the progress indicator.
 * @property {number} [max=100] - The maximum value of the progress indicator.
 * @property {number} [size=48] - The diameter of the circular progress, in pixels.
 * @property {number} [thickness=4] - The thickness of the circular progress, in pixels.
 * @property {number} [value=0] - The value of the progress indicator for the determinate variant. Value between `min` and `max`.
 * @property {'indeterminate' | 'determinate'} [variant='indeterminate'] - The variant to use.
 */

/**
 * @type {ForwardRefComponent<'div', CircularProgressProps>}
 */
const CircularProgress = forwardRef((inProps, ref) => {
  const {
    trackColor: trackColorProp, // deprecated

    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = 'blue:60',
    min = 0,
    max = 100,
    size = defaultSize,
    thickness = defaultThickness,
    value = 0,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'CircularProgress' });

  { // deprecation warning
    const prefix = `${CircularProgress.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('trackColor', {
        prefix,
        alternative: 'sx={{ "svg circle:first-of-type": { color: trackColor } }}',
        willRemove: true,
      });
    }, (trackColorProp !== undefined));
  }

  const clampedValue = Math.max(min, Math.min(value, max));
  const scale = (clampedValue - min) / (max - min);
  const circularProgressRootStyleProps = useCircularProgressRootStyle({
    size,
    variant,
  });
  const circularProgressSVGStyleProps = useCircularProgressSVGStyle({
    size,
  });
  const circularProgressTrackStyleProps = useCircularProgressTrackStyle({
    size,
    thickness,
    trackColor: trackColorProp, // deprecated
  });
  const circularProgressIndicatorStyleProps = useCircularProgressIndicatorStyle({
    color,
    scale, // between 0 and 1 inclusive (0 ≤ scale ≤ 1)
    size,
    thickness,
    variant,
  });

  const circularProgressRootProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: 'progressbar',
  };

  if (variant === 'determinate') {
    circularProgressRootProps['aria-valuemin'] = min;
    circularProgressRootProps['aria-valuemax'] = max;
    circularProgressRootProps['aria-valuenow'] = value;
  }

  return (
    <CircularProgressRoot
      ref={ref}
      {...circularProgressRootProps}
      {...circularProgressRootStyleProps}
      {...rest}
    >
      <CircularProgressSVG
        {...circularProgressSVGStyleProps}
      >
        <CircularProgressTrack
          {...circularProgressTrackStyleProps}
        />
        <CircularProgressIndicator
          {...circularProgressIndicatorStyleProps}
        />
      </CircularProgressSVG>
    </CircularProgressRoot>
  );
});

CircularProgress.displayName = 'CircularProgress';

export default CircularProgress;
