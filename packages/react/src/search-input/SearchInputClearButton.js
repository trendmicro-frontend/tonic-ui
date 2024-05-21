import { CloseSIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
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
      {children ?? <CloseSIcon size="4x" />}
    </ButtonBase>
  );
});

SearchInputClearButton.displayName = 'SearchInputClearButton';

export default SearchInputClearButton;
