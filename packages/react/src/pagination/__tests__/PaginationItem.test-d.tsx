import React, { createRef } from 'react';
import { PaginationItem } from '@tonic-ui/react';

// Basic usage
<PaginationItem>1</PaginationItem>;

// With selected
<PaginationItem selected>1</PaginationItem>;

// With disabled
<PaginationItem disabled>...</PaginationItem>;

// With page
<PaginationItem page={1}>1</PaginationItem>;

// With type
<PaginationItem type="page">1</PaginationItem>;
<PaginationItem type="first">First</PaginationItem>;
<PaginationItem type="last">Last</PaginationItem>;
<PaginationItem type="previous">Prev</PaginationItem>;
<PaginationItem type="next">Next</PaginationItem>;
<PaginationItem type="start-ellipsis">...</PaginationItem>;
<PaginationItem type="end-ellipsis">...</PaginationItem>;

// With variant
<PaginationItem variant="ghost">1</PaginationItem>;

// With slot (custom icons)
<PaginationItem
  type="first"
  slot={{ first: <span>{'<<'}</span> }}
>
  First
</PaginationItem>;

// Ref
const paginationItemRef = createRef<HTMLButtonElement>();
<PaginationItem ref={paginationItemRef}>1</PaginationItem>;

// Negative tests
// @ts-expect-error - 'middle' is not a valid type for PaginationItem
<PaginationItem type="middle">Invalid type</PaginationItem>;
