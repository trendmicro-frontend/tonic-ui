import React, { createRef } from 'react';
import { TableScrollbar, Table, TableBody, TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<TableScrollbar>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Cell</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableScrollbar>;

// Ref
const scrollbarRef = createRef<HTMLDivElement>();
<TableScrollbar ref={scrollbarRef}>
  <Table>
    <TableBody>
      <TableRow>
        <TableCell>Cell</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableScrollbar>;
