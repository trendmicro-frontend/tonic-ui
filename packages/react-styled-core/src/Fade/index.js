import React, { forwardRef, useState } from 'react';
import { useTransition, animated, config } from 'react-spring'
import Box from '../Box';

const Fade = forwardRef(
  (
    {
      children,
      show,
      from = { opacity: 0 },
      enter = { opacity: 1 },
      leave = { opacity: 0 },
      duration = 200,
      ...rest
    },
    ref,
  ) => {
    const transitions = useTransition(show, null, {
      enter,
      leave,
      from,
      config: { ...config.default, duration },
    });
    const Component = animated(Box);
    return transitions.map(({ item, key, props }) => {
      if (item) {
        return (
          <Component key={key} style={props} ref={ref} {...rest}>
            {children}
          </Component>
        );
      }
      return null;
    });
  },
);

Fade.displayName = 'Fade';

export default Fade;
