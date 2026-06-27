import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useSearchInputAdornmentStyle } from './styles';

/**
 * @typedef {Object} SearchInputAdornmentProps
 * @property {React.ReactNode} [children] -
 */

/**
 * @type {ForwardRefComponent<'div', SearchInputAdornmentProps>}
 */
const SearchInputAdornment = forwardRef((props, ref) => {
  const styleProps = useSearchInputAdornmentStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...props}
    />
  );
});

SearchInputAdornment.displayName = 'SearchInputAdornment';

export default SearchInputAdornment;
