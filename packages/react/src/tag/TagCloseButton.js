import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { Icon } from '../icon';
import { useTagCloseButtonStyle } from './styles';

const TagCloseButton = forwardRef((props, ref) => {
  const closeButtonStyleProps = useTagCloseButtonStyle();

  return (
    <ButtonBase
      ref={ref}
      {...closeButtonStyleProps}
      {...props}
    >
      <Icon icon="close-s" />
    </ButtonBase>
  );
});

export default TagCloseButton;
