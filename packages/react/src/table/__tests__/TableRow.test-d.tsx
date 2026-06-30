import React, { createRef } from 'react';
import { TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<TableRow>
  <TableCell>Cell 1</TableCell>
  <TableCell>Cell 2</TableCell>
</TableRow>;

// Ref
const rowRef = createRef<HTMLElement>();
<TableRow ref={rowRef}>
  <TableCell>Cell</TableCell>
</TableRow>;
