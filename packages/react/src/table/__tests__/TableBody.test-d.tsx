import React, { createRef } from 'react';
import { TableBody, TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<TableBody>
  <TableRow>
    <TableCell>Cell</TableCell>
  </TableRow>
</TableBody>;

// Ref
const bodyRef = createRef<HTMLElement>();
<TableBody ref={bodyRef}>
  <TableRow>
    <TableCell>Cell</TableCell>
  </TableRow>
</TableBody>;
