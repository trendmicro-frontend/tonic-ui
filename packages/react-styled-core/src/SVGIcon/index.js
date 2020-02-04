import React from 'react';
import styled from '@emotion/styled';
import { forwardRef } from "react";
import Box from '../Box';

const SVGIconBase = styled(Box)`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }
`;

const SVGIcon = forwardRef(
  (
    {
      children,
      size = '1em',
      color = 'currentColor',
      role = 'presentation',
      focusable = false,
      viewBox = '0 0 24 24',
      ...rest
    },
    ref,
  ) => {
    return (
      <SVGIconBase
        aria-hidden={true}
        ref={ref}
        as="svg"
        size={size}
        color={color}
        display="inline-block"
        verticalAlign="middle"
        viewBox={viewBox}
        focusable={focusable}
        role={role}
        {...rest}
      >
        {children}
      </SVGIconBase>
    );
  },
);

SVGIcon.displayName = 'SVGIcon';

export default SVGIcon;
