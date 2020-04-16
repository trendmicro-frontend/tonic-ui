import React from 'react';
import Icon from '../Icon';
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

  const closeIcon = (
    <Icon name="_core.close" size={iconSize} />
  );

  return (
    <IconButton
      color={color}
      icon={closeIcon}
      width={buttonSize}
      height={buttonSize}
      {...rest}
    />
  );
};

export default CloseButton;
