import { keyframes } from '@emotion/react';
import { SVGIcon } from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { forwardRef } from 'react';
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
    children,
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

  if (typeof icon === 'string') {
    const result = ensureArray(theme?.icons).find(iconEntry => iconEntry?.[0] === icon);
    children = result?.[1] ?? children;
  }

  return (
    <SVGIcon
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {children}
    </SVGIcon>
  );
});

Icon.displayName = 'Icon';

export default Icon;
