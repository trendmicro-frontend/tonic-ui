import { SVGIcon } from '@tonic-ui/react-icons';
import { ensureArray } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import { useDefaultProps } from '../default-props';
import { useIconStyle } from './styles';
import { useTheme } from '../theme';

const Icon = forwardRef((inProps, ref) => {
  const {
    children,
    icon: iconProp,
    spin = false,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Icon' });
  const theme = useTheme();
  const cachedIconRef = useRef([null, null]); // [iconKey, icon]

  const getIconFromTheme = (iconKey) => {
    const [cachedKey, cachedIcon] = cachedIconRef.current;

    // Return the cached icon if it matches the current key
    if (cachedKey === iconKey) {
      return cachedIcon;
    }

    // Find the icon in the theme's icon set
    const foundIcon = ensureArray(theme?.icons).find(([key]) => key === iconKey)?.[1];

    // Cache the found icon if it exists
    if (foundIcon) {
      cachedIconRef.current = [iconKey, foundIcon];
    }

    return foundIcon;
  };

  const icon = (typeof iconProp === 'string' && iconProp.length > 0)
    ? getIconFromTheme(iconProp) || children
    : children;

  const styleProps = useIconStyle({ spin });

  return (
    <SVGIcon
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {icon}
    </SVGIcon>
  );
});

Icon.displayName = 'Icon';

export default Icon;
