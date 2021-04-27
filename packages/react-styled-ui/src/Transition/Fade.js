import React, { forwardRef } from 'react';
import { Transition, animated } from 'react-spring';
import Box from '../Box';

const AnimatedBox = animated(Box);

const Fade = forwardRef((
  {
    in: toggle,
    show, // TODO: the show prop is deprecated and will be removed in the v1 release
    duration = 200,
    style,
    children,
    ...rest
  },
  ref,
) => {
  return (
    <Transition
      // TODO: the show prop is deprecated and will be removed in the v1 release
      items={!!toggle || !!show}
      config={{ duration }}
      from={{
        opacity: 0,
      }}
      enter={{
        opacity: 1,
      }}
      leave={{
        opacity: 0,
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
            willChange="opacity"
            {...rest}
          >
            {children}
          </AnimatedBox>
        );
      }}
    </Transition>
  );
});

Fade.displayName = 'Fade';

export default Fade;
