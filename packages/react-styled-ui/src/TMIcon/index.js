import React from 'react';
import Icon from '../Icon';

const TMIcon = React.forwardRef((
  {
    name,
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
      name={`_core.tmicon-${name}`}
      size={size}
      {...props}
    />
  );
});

export default TMIcon;
