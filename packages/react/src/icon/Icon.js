import { keyframes } from '@emotion/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
import { isValidElementType } from 'react-is';
import { useTheme } from '../theme';

const cwSpin = keyframes`
  0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(1turn)
  }
`;

const ccwSpin = keyframes`
  0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(-1turn)
  }
`;

const Icon = forwardRef((
  {
    icon,
    spin = false,
    ...rest
  },
  ref
) => {
  const theme = useTheme();
  const styleProps = {
    animation: (() => {
      if (spin === 'ccw') {
        return `${ccwSpin} 2s linear infinite`;
      }
      if (spin === 'cw' || spin === true) {
        return `${cwSpin} 2s linear infinite`;
      }
      return undefined;
    })(),
  };

  let svgElement = null;

  if (typeof icon === 'string') {
    const result = ensureArray(theme?.icons).find(iconEntry => iconEntry?.[0] === icon);
    svgElement = result?.[1];
  }

  return (
    <SVGIcon
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {svgElement}
    </SVGIcon>
  );
});

Icon.displayName = 'Icon';

export default Icon;
