import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useLinearProgressRootStyle,
  useLinearProgressBarStyle,
} from './styles';

const defaultVariant = 'indeterminate';

/**
 * @typedef {Object} LinearProgressProps
 * @property {string | string[]} [color='blue:60'] - The color of the progress bar. It supports both default and custom theme colors.
 * @property {number | string} [height=4] - The height of the progress bar, in pixels.
 * @property {number} [min=0] - The minimum value of the progress indicator.
 * @property {number} [max=100] - The maximum value of the progress indicator.
 * @property {number} [value=0] - The value of the progress indicator for the determinate variant. Value between `min` and `max`.
 * @property {'indeterminate' | 'determinate'} [variant='indeterminate'] - The variant to use.
 * @property {number | string} [width] - The width of the progress bar, in pixels.
 */

/**
 * @type {ForwardRefComponent<'div', LinearProgressProps>}
 */
const LinearProgress = forwardRef((inProps, ref) => {
  const {
    size: sizeProp, // deprecated

    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = '_foreground.primary.active',
    min = 0,
    max = 100,
    value = 0,
    variant = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'LinearProgress' });
  const linearProgressRootStyleProps = useLinearProgressRootStyle();
  const linearProgressBarStyleProps = useLinearProgressBarStyle({ color, variant });
  const linearProgressRootProps = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: 'progressbar',
  };
  const linearProgressBarProps = {};

  { // deprecation warning
    const prefix = `${LinearProgress.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('size', {
        prefix,
        alternative: 'height',
        willRemove: true,
      });
    }, (sizeProp !== undefined));

    if (sizeProp !== undefined) {
      const height = {
        'xs': '1h',
        'sm': '1x', // default
        'md': '2x',
        'lg': '3x',
      }[sizeProp] ?? sizeProp;
      linearProgressRootStyleProps.height = height ?? linearProgressRootStyleProps.height;
    }
  }

  if (variant === 'determinate') {
    linearProgressRootProps['aria-valuemin'] = min;
    linearProgressRootProps['aria-valuemax'] = max;
    linearProgressRootProps['aria-valuenow'] = value;

    const clampedValue = Math.max(min, Math.min(value, max));
    const scale = (clampedValue - min) / (max - min);
    linearProgressBarProps.style = {
      clipPath: `inset(0 ${(1 - scale) * 100}% 0 0)`,
    };
  }

  return (
    <Box
      ref={ref}
      {...linearProgressRootProps}
      {...linearProgressRootStyleProps}
      {...rest}
    >
      <Box
        {...linearProgressBarProps}
        {...linearProgressBarStyleProps}
      />
    </Box>
  );
});

LinearProgress.displayName = 'LinearProgress';

export default LinearProgress;
