import { Fragment, forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { usePaginationStyle } from './styles';
import PaginationItem from './PaginationItem';
import usePagination from './usePagination';

/**
 * @typedef {Object} PaginationProps
 * @property {number} [boundaryCount=1] - Number of always visible pages at the beginning and end.
 * @property {number} [count=1] - Total number of pages.
 * @property {number} [defaultPage=1] - The page selected by default when the component is uncontrolled.
 * @property {boolean} [disabled=false] - If `true`, the component is disabled.
 * @property {(page: number) => void} [onChange] - Callback fired when the page is changed. Signature: `function(page: number) => void`
 * @property {number} [page] - The current page.
 * @property {(props: { type: 'page' | 'first' | 'last' | 'previous' | 'next' | 'start-ellipsis' | 'end-ellipsis'; page: number; isSelected: boolean; onClick: React.MouseEventHandler<HTMLButtonElement> }) => React.ReactNode} [renderItem] - Render the item. Signature: `function(props) => ReactNode`
 * @property {number} [siblingCount=1] - Number of always visible pages before and after the current page.
 * @property {{ first?: boolean, last?: boolean, previous?: boolean, next?: boolean }} [slot] - Whether to render the first-page, last-page, previous-page, and next-page buttons.
 */

/**
 * @type {ForwardRefComponent<'div', PaginationProps>}
 */
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
