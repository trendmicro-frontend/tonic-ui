import React from 'react';
import Icon from '../Icon';

const TMIcon = React.forwardRef((
  {
    icon,
    size,
    ...props
  },
  ref
) => {
  if (size !== undefined) {
    if (typeof size === 'number') {
      size = `${size || 0}px`;
    }
  }
  return (
    <Icon
      ref={ref}
      icon={`_core.tmicon-${icon}`}
      size={size}
      {...props}
    />
  );
});

export default TMIcon;
