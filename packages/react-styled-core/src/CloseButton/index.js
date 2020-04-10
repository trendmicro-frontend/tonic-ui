import React from 'react';
import IconButton from '../IconButton';

const sizes = {
  lg: {
    button: '10x',
    icon: '5x',
  },
  md: {
    button: '8x',
    icon: '4x',
  },
  sm: {
    button: '6x',
    icon: '4x',
  },
};

const CloseButton = ({
  size = 'md',
  color,
  ...rest
}) => {
  const buttonSize = sizes[size] && sizes[size].button;
  const iconSize = sizes[size] && sizes[size].icon;

  return (
    <IconButton
      color={color}
      icon="_core.close"
      iconSize={iconSize}
      width={buttonSize}
      height={buttonSize}
      {...rest}
    />
  );
};

export default CloseButton;
