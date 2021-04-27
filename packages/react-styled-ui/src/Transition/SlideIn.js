import { get } from '@styled-system/core';
import { ensureFiniteNumber } from 'ensure-type';
import React, { forwardRef } from 'react';
import { Transition, animated } from 'react-spring';
import Box from '../Box';
import useTheme from '../useTheme';

const AnimatedBox = animated(Box);

const SlideIn = forwardRef((
  {
    in: toggle,
    offset = '4x',
    duration = 150,
    style,
    children,
    ...rest
  },
  ref,
) => {
  if (typeof offset === 'number') {
    offset = `${offset}px`; // Defaults to px
  } else {
    const { sizes } = useTheme();
    offset = get(sizes, offset) ?? offset;
  }

  return (
    <Transition
      items={!!toggle}
      config={{ duration }}
      from={{
        opacity: 0,
        transform: `translate3d(0, ${offset}, 0)`,
      }}
      enter={{
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
      }}
      leave={{
        opacity: 0,
        transform: `translate3d(0, ${offset}, 0)`,
      }}
      {...rest}
    >
      {(transitionStyle, item) => {
        if (!item) {
          return null;
        }

        return (
          <AnimatedBox
            ref={ref}
            style={{
              ...transitionStyle,
              ...style,
            }}
            willChange="opacity, transform"
            {...rest}
          >
            {children}
          </AnimatedBox>
        );
      }}
    </Transition>
  );
});

SlideIn.displayName = 'SlideIn';

export default SlideIn;
