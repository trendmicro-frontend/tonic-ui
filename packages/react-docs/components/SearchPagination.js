import {
  Pagination,
} from '@tonic-ui/react';
import { forwardRef } from 'react';

const SearchPagination = forwardRef((
  {
    count,
    page,
    onChange,
    ...rest
  },
  ref,
) => {
  return (
    <Pagination
      ref={ref}
      count={count}
      page={page}
      onChange={onChange}
      {...rest}
    />
  );
});

SearchPagination.displayName = 'SearchPagination';

export default SearchPagination;
