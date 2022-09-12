import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import {
  useSearchInputCloseButtonStyle,
} from './styles';

const SearchInputCloseButton = forwardRef((props, ref) => {
  const { size } = props;
  const styleProps = useSearchInputCloseButtonStyle({ size });

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

SearchInputCloseButton.displayName = 'SearchInputCloseButton';

export default SearchInputCloseButton;
