import { useEffect, useState } from 'react';

const defaultSlot = {
  first: false,
  previous: true,
  next: true,
  last: false,
};

const usePagination = (props) => {
  const {
    boundaryCount = 1,
    count = 1,
    defaultPage: defaultPageProp = 1,
    disabled = false,
    onChange,
    page: pageProp,
    siblingCount = 1,
    slot: slotProp,
  } = { ...props };
  const [page, setPage] = useState(pageProp ?? defaultPageProp);
  const slot = {
    ...defaultSlot,
    ...slotProp,
  };

  useEffect(() => {
    const isControlled = (pageProp !== undefined);
    if (isControlled) {
      setPage(pageProp);
    }
  }, [pageProp]);

  const handleClickByPageNumber = (value) => (event) => {
    const isControlled = (pageProp !== undefined);
    if (!isControlled) {
      setPage(value);
    }

    if (typeof onChange === 'function') {
      onChange(value);
    }
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const paginationItems = [
    ...(slot.first ? [{ type: 'first' }] : []),
    ...(slot.previous ? [{ type: 'previous' }] : []),
    ...startPages.map(page => ({ type: 'page', value: page })),

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...((siblingStart > boundaryCount + 2)
      ? [{ type: 'start-ellipsis' }]
      : (boundaryCount + 1 < count - boundaryCount) ? [{ type: 'page', value: boundaryCount + 1 }] : []
    ),

    // Sibling pages
    ...range(siblingStart, siblingEnd).map(page => ({ type: 'page', value: page })),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...((siblingEnd < count - boundaryCount - 1)
      ? [{ type: 'end-ellipsis' }]
      : (count - boundaryCount > boundaryCount) ? [{ type: 'page', value: count - boundaryCount }] : []
    ),

    ...endPages.map(page => ({ type: 'page', value: page })),
    ...(slot.next ? [{ type: 'next' }] : []),
    ...(slot.last ? [{ type: 'last' }] : []),
  ];

  const mapPageTypeToPageNumber = (pageType) => {
    if (pageType === 'first') {
      return 1;
    }
    if (pageType === 'previous') {
      return Math.max(page - 1, 1);
    }
    if (pageType === 'start-ellipsis') {
      return Math.max(siblingStart - (siblingCount + 1), 1);
    }
    if (pageType === 'end-ellipsis') {
      return Math.min(siblingEnd + (siblingCount + 1), count);
    }
    if (pageType === 'next') {
      return Math.min(page + 1, count);
    }
    if (pageType === 'last') {
      return count;
    }
    return null;
  };

  const items = paginationItems.map(paginationItem => {
    if (paginationItem.type === 'page') {
      const isDisabled = !!disabled;
      const pageNumber = paginationItem.value;

      return {
        type: 'page',
        page: pageNumber,
        disabled: isDisabled,
        selected: paginationItem.value === page,
        onClick: handleClickByPageNumber(pageNumber),
      };
    }

    const isDisabled = !!disabled ||
      (['first', 'previous'].includes(paginationItem.type) && (page <= 1)) ||
      (['next', 'last'].includes(paginationItem.type) && (page >= count));
    const pageNumber = mapPageTypeToPageNumber(paginationItem.type);

    return {
      type: paginationItem.type,
      page: pageNumber,
      disabled: isDisabled,
      selected: false,
      onClick: handleClickByPageNumber(pageNumber),
    };
  });

  return {
    items,
  };
};

export default usePagination;
