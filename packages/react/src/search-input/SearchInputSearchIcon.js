import React, { forwardRef } from 'react';
import { Box } from '../box';
import Icon from '../deprecated/Icon';
import { useSearchInputSearchIconStyle } from './styles';

const SearchInputSearchIcon = forwardRef((
  {
    children,
    variant,
    ...rest
  },
  ref,
) => {
  const styleProps = useSearchInputSearchIconStyle({ variant });

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {children ?? <Icon icon="search-o" />}
    </Box>
  );
});

SearchInputSearchIcon.displayName = 'SearchInputSearchIcon';

export default SearchInputSearchIcon;
