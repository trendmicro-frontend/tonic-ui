import { useOnceWhen } from '@tonic-ui/react-hooks';
import { isNullish, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useLinearProgressRootStyle,
  useLinearProgressBarStyle,
} from './styles';

const defaultVariant = 'indeterminate';

const LinearProgress = forwardRef((inProps, ref) => {
  const {
    size: sizeProp, // deprecated

    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = 'blue:60',
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

    if (sizeProp) {
      const height = {
        'xs': '1h',
        'sm': '1x', // default
        'md': '2x',
        'lg': '3x',
      }[sizeProp] ?? sizeProp;
      linearProgressRootStyleProps.height = height;
    }
  }

  if (variant === 'determinate') {
    if ((process.env.NODE_ENV !== 'production') && isNullish(value)) {
      console.error(`You need to provide a value prop when using the determinate variant of ${LinearProgress.displayName}.`);
    }

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
