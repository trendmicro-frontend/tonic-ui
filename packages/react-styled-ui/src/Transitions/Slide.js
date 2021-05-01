import React, { forwardRef } from 'react';
import { Transition, animated } from 'react-spring';
import Box from '../Box';

const AnimatedBox = animated(Box);

// Easing function from d3-ease: https://github.com/d3/d3-ease/blob/master/src/exp.js
function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

const Slide = forwardRef((
  {
    in: isOpen,
    duration = 250,
    from,
    finalHeight = 'auto',
    finalWidth,
    style,
    children,
    ...rest
  },
  ref,
) => {
  const placements = {
    bottom: {
      maxWidth: '100vw',
      height: finalHeight,
      bottom: 0,
      left: 0,
      right: 0,
    },
    top: {
      maxWidth: '100vw',
      height: finalHeight,
      top: 0,
      left: 0,
      right: 0,
    },
    left: {
      ...(finalWidth && { maxWidth: finalWidth }),
      maxHeight: '100vh',
      left: 0,
      top: 0,
    },
    right: {
      ...(finalWidth && { maxWidth: finalWidth }),
      maxHeight: '100vh',
      right: 0,
      top: 0,
    },
  };

  const transitionOptions = {
    bottom: {
      offset: '100%',
      transform: y => `translateY(${y})`,
    },
    top: {
      offset: '-100%',
      transform: y => `translateY(${y})`,
    },
    left: {
      offset: '-100%',
      transform: x => `translateX(${x})`,
    },
    right: {
      offset: '100%',
      transform: x => `translateX(${x})`,
    },
  };

  const { offset, transform } = transitionOptions[from];

  return (
    <Transition
      items={!!isOpen}
      from={{
        opacity: 0,
        offset: offset,
        transform: transform(offset),
      }}
      enter={{
        opacity: 1,
        offset: '0%',
        transform: (from === 'top' || from === 'bottom') ? 'translateY(0)' : 'translateX(0)',
      }}
      leave={{
        opacity: 0,
        offset: offset,
        transform: transform(offset),
      }}
      config={{
        duration,
        easing: expOut,
      }}
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
            {...placements[from]}
            willChange="opacity, offset, transform"
            {...rest}
          >
            {children}
          </AnimatedBox>
        );
      }}
    </Transition>
  );
});

Slide.displayName = 'Slide';

export default Slide;
