import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { dataAttr } from '@tonic-ui/utils';
import React, { useMemo, useState } from 'react';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const App = () => {
  const [colorStyle] = useColorStyle();
  const [rowSelection, setRowSelection] = useState({});
  const columns = useMemo(() => [
    {
      id: 'selection',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      minSize: 48,
      size: 48,
      style: {
        px: '4x',
      },
    },
    {
      accessorKey: 'eventType',
      header: () => (
        <Truncate>
          Event Type
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 240,
    },
    {
      accessorKey: 'affectedDevices',
      header: () => (
        <Truncate>
          Affected Devices
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      accessorKey: 'detections',
      header: () => (
        <Truncate>
          Detections
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 80,
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enable row selection for all rows
    // enableRowSelection: row => row.original.detections > 0, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const selectedRowCount = Object.keys(rowSelection).length;

  return (
    <>
      <Box mb="4x" px="3x">
        <Text>
          {selectedRowCount} selected
        </Text>
      </Box>
      <Table layout={layout}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const styleProps = {
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };
                return (
                  <TableCell
                    key={header.id}
                    {...styleProps}
                  >
                    {header.isPlaceholder ? null : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-selected={dataAttr(row.getIsSelected())}
              _hover={{
                backgroundColor: colorStyle.background.highlighted,
              }}
              _selected={{
                backgroundColor: colorStyle.background.selected,
              }}
            >
              {row.getVisibleCells().map(cell => {
                const styleProps = {
                  minWidth: cell.column.columnDef.minSize,
                  width: cell.column.getSize(),
                  ...cell.column.columnDef.style,
                };
                return (
                  <TableCell
                    key={cell.id}
                    {...styleProps}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default App;
