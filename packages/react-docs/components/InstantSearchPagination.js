import {
  Pagination,
} from '@tonic-ui/react';
import React, { forwardRef } from 'react';
import {
  usePagination,
} from 'react-instantsearch-core';

/**
 * See https://www.algolia.com/doc/api-reference/widgets/use-instantsearch/react-hooks/
 */
const InstantSearchPagination = forwardRef((props, ref) => {
  const {
    currentRefinement,
    nbPages,
    refine,
  } = usePagination();

  const page = currentRefinement + 1;

  return (
    <Pagination
      ref={ref}
      count={nbPages}
      page={page}
      onChange={(event, page) => {
        const nextRefinement = (page - 1);
        refine(nextRefinement);
      }}
      {...props}
    />
  );
});

InstantSearchPagination.displayName = 'InstantSearchPagination';

export default InstantSearchPagination;
