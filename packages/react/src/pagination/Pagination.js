import React, { Fragment, forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePaginationStyle } from './styles';
import PaginationItem from './PaginationItem';
import usePagination from './usePagination';

const Pagination = forwardRef((inProps, ref) => {
  const {
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
  } = useDefaultProps({ props: inProps, name: 'Pagination' });
  const { items } = usePagination({
    boundaryCount,
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
