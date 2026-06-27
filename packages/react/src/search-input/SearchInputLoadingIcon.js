import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Spinner } from '../spinner';
import { useSearchInputLoadingIconStyle } from './styles';

/**
 * @typedef {Object} SearchInputLoadingIconProps
 * @property {React.ReactNode} [children] -
 * @property {string} [variant] - The visual style of the loading icon.
 */

/**
 * @type {ForwardRefComponent<'div', SearchInputLoadingIconProps>}
 */
const SearchInputLoadingIcon = forwardRef((
  {
    children,
    variant,
    ...rest
  },
  ref,
) => {
  const styleProps = useSearchInputLoadingIconStyle({ variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {children ?? <Spinner size="xs" />}
    </Box>
  );
});

SearchInputLoadingIcon.displayName = 'SearchInputLoadingIcon';

export default SearchInputLoadingIcon;
