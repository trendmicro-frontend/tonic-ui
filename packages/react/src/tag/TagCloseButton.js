import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import { useTagCloseButtonStyle } from './styles';

const TagCloseButton = forwardRef((props, ref) => {
  const closeButtonStyleProps = useTagCloseButtonStyle();

  return (
    <ButtonBase
      ref={ref}
      {...closeButtonStyleProps}
      {...props}
    />
  );
});

export default TagCloseButton;
