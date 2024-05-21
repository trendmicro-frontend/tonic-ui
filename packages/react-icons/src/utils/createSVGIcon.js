import React, { forwardRef, memo } from 'react';
import SVGIcon from '../SVGIcon';

const createSVGIcon = (svgIcon, options) => {
  const displayName = (typeof options === 'string') ? options : options?.displayName;
  const Component = forwardRef((props, ref) => {
    return (
      <SVGIcon
        data-icon={displayName}
        ref={ref}
        {...props}
      >
        {svgIcon}
      </SVGIcon>
    );
  });

  Component.displayName = displayName;

  return memo(Component);
};

export default createSVGIcon;
