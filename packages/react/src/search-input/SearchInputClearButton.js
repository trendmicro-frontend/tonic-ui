import { CloseSIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';
import { ButtonBase } from '../button';
import {
  useSearchInputClearButtonStyle,
} from './styles';

/**
 * @typedef {Object} SearchInputClearButtonProps
 * @property {React.ReactNode} [children] -
 * @property {'sm' | 'md' | 'lg'} [size] - The size of the clear button.
 * @property {string} [variant] - The variant style of the clear button.
 */

/**
 * @type {ForwardRefComponent<'button', SearchInputClearButtonProps>}
 */
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
