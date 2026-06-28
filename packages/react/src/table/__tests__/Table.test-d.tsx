import React, { createRef } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@tonic-ui/react';

// Basic usage
<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Header 1</TableCell>
      <TableCell>Header 2</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// With variant
<Table variant="default">
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>;

<Table variant="outline">
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// With layout
<Table layout="flexbox">
  <TableBody>
    <TableRow>
      <TableCell>Flexbox layout</TableCell>
    </TableRow>
  </TableBody>
</Table>;

<Table layout="table">
  <TableBody>
    <TableRow>
      <TableCell>Table layout</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// With size
<Table size="sm">
  <TableBody>
    <TableRow>
      <TableCell>Small</TableCell>
    </TableRow>
  </TableBody>
</Table>;

<Table size="md">
  <TableBody>
    <TableRow>
      <TableCell>Medium</TableCell>
    </TableRow>
  </TableBody>
</Table>;

<Table size="lg">
  <TableBody>
    <TableRow>
      <TableCell>Large</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// Ref
const tableRef = createRef<HTMLElement>();
<Table ref={tableRef}>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// Negative tests
// @ts-expect-error - 'striped' is not a valid variant for Table
<Table variant="striped">
  <TableBody>
    <TableRow>
      <TableCell>Invalid variant</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// @ts-expect-error - 'xl' is not a valid size for Table
<Table size="xl">
  <TableBody>
    <TableRow>
      <TableCell>Invalid size</TableCell>
    </TableRow>
  </TableBody>
</Table>;

// @ts-expect-error - 'grid' is not a valid layout for Table
<Table layout="grid">
  <TableBody>
    <TableRow>
      <TableCell>Invalid layout</TableCell>
    </TableRow>
  </TableBody>
</Table>;
