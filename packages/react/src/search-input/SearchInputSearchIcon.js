import { SearchOIcon } from '@tonic-ui/react-icons';
import React, { forwardRef } from 'react';
import { Box } from '../box';
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
      {children ?? <SearchOIcon size="4x" />}
    </Box>
  );
});

SearchInputSearchIcon.displayName = 'SearchInputSearchIcon';

export default SearchInputSearchIcon;
