import React, { createRef, useState } from 'react';
import { Pagination, PaginationItem } from '@tonic-ui/react';

// Basic usage
<Pagination count={10} />;

// With page (controlled) - NO manual type annotations
<Pagination page={1} count={10} onChange={(page) => console.log(page)} />;

// With defaultPage
<Pagination defaultPage={1} count={10} />;

// With boundaryCount
<Pagination count={10} boundaryCount={2} />;

// With siblingCount
<Pagination count={10} siblingCount={2} />;

// With disabled
<Pagination count={10} disabled />;

// With slot
<Pagination
  count={10}
  slot={{ first: true, last: true, previous: true, next: true }}
/>;

<Pagination
  count={10}
  slot={{ first: false, last: false }}
/>;

// With renderItem - NO manual type annotations
<Pagination
  count={10}
  renderItem={(props) => <PaginationItem {...props} />}
/>;

// Controlled with useState — pass setter directly
function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Pagination page={currentPage} count={10} onChange={setCurrentPage} />
  );
}

// Ref
const paginationRef = createRef<HTMLDivElement>();
<Pagination ref={paginationRef} count={10} />;
