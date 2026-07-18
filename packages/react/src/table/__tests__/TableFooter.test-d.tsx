import React, { createRef } from 'react';
import { TableFooter, TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<TableFooter>
  <TableRow>
    <TableCell>Footer</TableCell>
  </TableRow>
</TableFooter>;

// Ref
const footerRef = createRef<HTMLElement>();
<TableFooter ref={footerRef}>
  <TableRow>
    <TableCell>Footer</TableCell>
  </TableRow>
</TableFooter>;
