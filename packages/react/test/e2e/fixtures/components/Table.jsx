/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableScrollbar } from '../../../../src';

const TableFixture = ({ record }) => {
  const headerRef = useRef(null);
  return (
    <Table layout="flexbox" width={260} height={240}>
      <TableHeader ref={headerRef} data-testid="table-header" overflow="hidden">
        <TableRow>
          {[0, 1, 2].map(column => <TableCell key={column} flex="none" width={180} height={36} data-testid={`header-${column}`}>Column {column}</TableCell>)}
        </TableRow>
      </TableHeader>
      <TableScrollbar
        height="100%"
        data-testid="table-scrollbar"
        onScroll={event => {
          headerRef.current.scrollLeft = event.target.scrollLeft;
          record({ type: 'scroll', left: event.target.scrollLeft, top: event.target.scrollTop });
        }}
      >
        <TableBody>
          {Array.from({ length: 16 }, (_, row) => (
            <TableRow key={row}>
              {[0, 1, 2].map(column => <TableCell key={column} flex="none" width={180} height={36} data-testid={`cell-${row}-${column}`}>Row {row}, column {column}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </TableScrollbar>
    </Table>
  );
};

export default TableFixture;
