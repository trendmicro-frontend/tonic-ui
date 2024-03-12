import React, { forwardRef, memo } from 'react';
import SVGIcon from '../SVGIcon';
import { useIconStyle } from '../styles';

const createSVGIcon = (svgIcon, options) => {
  const displayName = (typeof options === 'string') ? options : options?.displayName;
  const Component = forwardRef((
    {
      spin = false,
      sx,
      ...rest
    },
    ref,
  ) => {
    const styleProps = useIconStyle({ spin });
    return (
      <SVGIcon
        data-icon-name={displayName}
        ref={ref}
        sx={[
          styleProps,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      >
        {svgIcon}
      </SVGIcon>
    );
  });

  Component.displayName = displayName;

  return memo(Component);
};

export default createSVGIcon;
