import { usePagination } from '@tonic-ui/react';

function UsePaginationExample() {
  // With options
  const pagination = usePagination({
    count: 10,
    page: 1,
    boundaryCount: 2,
    siblingCount: 1,
    disabled: false,
    onChange: (page) => { /* noop */ },
    slot: { first: true, previous: true, next: true, last: true },
  });

  // Access items array
  const items = pagination.items;

  // Access item properties
  const firstItem = items[0];
  if (firstItem) {
    const type = firstItem.type;
    const page = firstItem.page;
    const disabled = firstItem.disabled;
    const selected = firstItem.selected;

    // Call onClick
    firstItem.onClick({} as React.MouseEvent);
  }

  return null;
}

function UsePaginationDefaults() {
  // Without options (all defaults)
  const pagination = usePagination();
  const items = pagination.items;

  return null;
}
