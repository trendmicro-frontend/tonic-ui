import React, { forwardRef } from 'react';
import { Transition, animated } from 'react-spring';
import Box from '../Box';

const AnimatedBox = animated(Box);

const Scale = forwardRef((
  {
    in: toggle,
    initialScale = 0.97,
    duration = 150,
    style,
    children,
    ...rest
  },
  ref,
) => {
  return (
    <Transition
      items={!!toggle}
      config={{ duration }}
      from={{
        opacity: 0,
        transform: `scale(${initialScale})`,
      }}
      enter={{
        opacity: 1,
        transform: 'scale(1)',
      }}
      leave={{
        opacity: 0,
        transform: `scale(${initialScale})`,
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

Scale.displayName = 'Scale';

export default Scale;
