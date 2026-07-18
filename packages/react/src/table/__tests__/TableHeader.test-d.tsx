import React, { createRef } from 'react';
import { TableHeader, TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<TableHeader>
  <TableRow>
    <TableCell>Header</TableCell>
  </TableRow>
</TableHeader>;

// Ref
const headerRef = createRef<HTMLElement>();
<TableHeader ref={headerRef}>
  <TableRow>
    <TableCell>Header</TableCell>
  </TableRow>
</TableHeader>;
