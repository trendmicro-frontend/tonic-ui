import _get from 'lodash.get';
import React, { forwardRef } from 'react';
import SVGIcon from '../SVGIcon';
import useTheme from '../useTheme';

const Icon = forwardRef((
  {
    name,
    ...rest
  },
  ref
) => {
  const { icons = {} } = useTheme();
  const { path, ...restIconProps } = { ..._get(icons, name) };

  if (typeof path === 'string') {
    return (
      <SVGIcon
        dangerouslySetInnerHTML={{
          __html: path,
        }}
        {...restIconProps}
        {...rest}
      />
    );
  }

  return (
    <SVGIcon {...restIconProps} {...rest}>
      {path}
    </SVGIcon>
  );
});

Icon.displayName = 'Icon';

export default Icon;
