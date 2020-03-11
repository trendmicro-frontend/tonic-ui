import React, { forwardRef } from 'react';
import { useSpring, animated } from 'react-spring';
import Box from '../Box';

const Fade = forwardRef(
  (
    {
      children,
      show = false,
      duration = 200,
      ...rest
    },
    ref,
  ) => {
    const springs = useSpring({
      config: { duration },
      opacity: show ? 1 : 0,
      from: { opacity: 0 },
    });
    const Component = animated(Box);
    return (
      <Component style={springs} ref={ref} {...rest}>
        {children}
      </Component>
    );
  },
);

Fade.displayName = 'Fade';

export default Fade;
