import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import Icon from '../deprecated/Icon';
import {
  useSearchInputClearButtonStyle,
} from './styles';

const SearchInputClearButton = forwardRef((
  {
    children,
    size,
    variant,
    ...rest
  },
  ref,
) => {
  const styleProps = useSearchInputClearButtonStyle({ size, variant });

  return (
    <ButtonBase
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {children ?? <Icon icon="close-s" />}
    </ButtonBase>
  );
});

SearchInputClearButton.displayName = 'SearchInputClearButton';

export default SearchInputClearButton;
