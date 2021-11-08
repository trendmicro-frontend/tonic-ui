import { ensureString } from 'ensure-type';
import React, { forwardRef } from 'react';
import Box from '../Box';
import Icon from '../Icon';
import {
  useMenuIndicatorStyle,
} from './styles';
import useMenu from './useMenu';

const MenuIndicator = forwardRef((
  {
    disabled,
    ...props
  },
  ref,
) => {
  const {
    isOpen,
    placement,
  } = useMenu();
  const styleProps = useMenuIndicatorStyle();
  const direction = ensureString(placement).split('-')[0];
  const iconStyleProps = {
    transform: {
      top: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      bottom: isOpen ? 'rotate(-180deg)' : 'rotate(0deg)',
    }[direction],
    transition: 'transform 200ms ease-in-out', // FIXME
  };
  const iconName = {
    top: 'angle-up',
    bottom: 'angle-down',
    right: 'angle-right',
    left: 'angle-left',
  }[direction];

  return (
    <Box
      aria-disabled={disabled}
      {...styleProps}
      {...props}
    >
      <Icon width="4x" icon={iconName} {...iconStyleProps} />
    </Box>
  );
});

MenuIndicator.displayName = 'MenuIndicator';

export default MenuIndicator;
