import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
import { Box } from '../box';

const SVGIconBase = styled(Box)`
  flex-shrink: 0;
  backface-visibility: hidden;
  &:not(:root) {
    overflow: hidden;
  }
`;

const SVGIcon = forwardRef((
  {
    children,
    size = '4x',
    color = 'currentColor',
    role = 'presentation',
    focusable = false,
    viewBox = '0 0 16 16',
    ...rest
  },
  ref,
) => {
  return (
    <SVGIconBase
      aria-hidden={true}
      ref={ref}
      as="svg"
      width={size}
      height={size}
      fill={color}
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
});

SVGIcon.displayName = 'SVGIcon';

export default SVGIcon;
