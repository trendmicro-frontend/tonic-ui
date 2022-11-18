import React, { Fragment, forwardRef } from 'react';
import { Box } from '../box';
import { usePaginationStyle } from './styles';
import PaginationItem from './PaginationItem';
import usePagination from './usePagination';

const Pagination = forwardRef((
  {
    firstButton: firstButtonProp = false, // deprecated
    lastButton: lastButtonProp = false, // deprecated
    prevButton: prevButtonProp, // deprecated
    nextButton: nextButtonProp, // deprecated
    ellipsisLabel, // deprecated
    boundaryCount = 1,
    count = 1,
    defaultPage = 1,
    disabled,
    onChange,
    page,
    renderItem = (item) => <PaginationItem {...item} />,
    siblingCount = 1,
    slot,
    ...rest
  },
  ref,
) => {
  const { items } = usePagination({
    boundaryCount,
    componentName: Pagination.displayName,
    count,
    defaultPage,
    disabled,
    onChange,
    page,
    siblingCount,
    slot,
  });
  const styleProps = usePaginationStyle();

  return (
    <Box
      ref={ref}
      {...styleProps}
      {...rest}
    >
      {items.map((item, index) => (
        <Fragment key={`${item.type}-${item.page}`}>
          {renderItem({ ...item })}
        </Fragment>
      ))}
    </Box>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
