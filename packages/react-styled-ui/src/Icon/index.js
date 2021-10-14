import { keyframes } from '@emotion/react';
import { ensurePlainObject } from 'ensure-type';
import _get from 'lodash.get';
import React, { forwardRef } from 'react';
import SVGIcon from '../SVGIcon';
import useTheme from '../useTheme';

const spinAnimation = keyframes`
  0% {
      transform: rotate(0deg)
  }
  to {
      transform: rotate(1turn)
  }
`;

const Icon = forwardRef((
  {
    icon,
    spin,
    ...rest
  },
  ref
) => {
  const { icons = {} } = useTheme();
  const tmicon = _get(icons, [`tmicon-${icon}`]);
  const { path, ...restIconProps } = ensurePlainObject(_get(icons, icon, tmicon));
  const styleProps = {};

  if (spin) {
    styleProps['animation'] = `${spinAnimation} 2s linear infinite`;
  };

  return (
    <SVGIcon
      ref={ref}
      {...styleProps}
      {...restIconProps}
      {...rest}
    >
      {path}
    </SVGIcon>
  );
});

Icon.displayName = 'Icon';

export default Icon;
