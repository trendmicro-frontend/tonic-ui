import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Stack,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { dataAttr } from '@tonic-ui/utils';
import React, { Fragment, useMemo, useState } from 'react';

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
  const [columnVisibility, setColumnVisibility] = useState({});

  const columns = useMemo(() => [
    {
      header: 'Event Type',
      accessorKey: 'eventType',
      size: 240,
    },
    {
      header: 'Affected Devices',
      accessorKey: 'affectedDevices',
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
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
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <>
      <Box mb="4x" px="3x">
        <Flex
          display="inline-flex"
          flexDirection="column"
        >
          <Checkbox
            checked={table.getIsAllColumnsVisible()}
            indeterminate={table.getIsSomeColumnsVisible() && !table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          >
            Toggle All
          </Checkbox>
          <Divider my="2x" />
          <Stack spacing="1x">
            {table.getAllLeafColumns().map(column => {
              return (
                <Fragment key={column.id}>
                  <Checkbox
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  >
                    {column.columnDef.header}
                  </Checkbox>
                </Fragment>
              );
            })}
          </Stack>
        </Flex>
      </Box>
      <Table layout={layout}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const styleProps = {
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };
                return (
                  <TableHeaderCell
                    key={header.id}
                    {...styleProps}
                  >
                    {header.isPlaceholder ? null : (
                      <Truncate>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Truncate>
                    )}
                  </TableHeaderCell>
                );
              })}
            </TableHeaderRow>
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
                    <Truncate>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Truncate>
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
