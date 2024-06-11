import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Code,
  DarkMode,
  Flex,
  Icon,
  LightMode,
  Space,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Tooltip,
  Truncate,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import React, { useEffect, useMemo, useState } from 'react';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
  const [sorting, setSorting] = useState([
    { id: 'eventType', desc: false },
  ]);
  const [enableSortingRemoval, toggleEnableSortingRemoval] = useToggle(false);

  useEffect(() => {
    if (enableSortingRemoval) {
      setSorting([]);
    }
  }, [enableSortingRemoval]);

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
      sorting,
    },
    // https://tanstack.com/table/v8/docs/api/features/sorting
    enableSorting: true, // Enables/Disables sorting for the table
    enableSortingRemoval, // Enables/Disables the ability to remove sorting for the table
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (nextSorting) => { // A function to be called with an `updaterFn` when `state.sorting` change
      setSorting(nextSorting);
    },
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const enableSortingRemovalTooltipLabel = (
    <Box p="1x">
      <Text>
        If <Code>true</Code> then changing sort order will circle like: `none` → `desc` → `asc` → `none` → ...
      </Text>
      <Text>
        If <Code>false</Code> then changing sort order will circle like: `none` → `desc` → `asc` → `desc` → `asc` → ...
      </Text>
    </Box>
  );

  return (
    <>
      <Box mb="4x" px="3x">
        <Checkbox
          checked={enableSortingRemoval}
          onChange={() => {
            toggleEnableSortingRemoval();
          }}
        >
          <Flex alignItems="center">
            Enable the ability to remove sorting for the table
            <Space width="2x" />
            <Tooltip
              label={colorMode === 'dark'
                ? <LightMode>{enableSortingRemovalTooltipLabel}</LightMode>
                : <DarkMode>{enableSortingRemovalTooltipLabel}</DarkMode>
              }
            >
              <Icon icon="info-o" />
            </Tooltip>
          </Flex>
        </Checkbox>
      </Box>
      <Table layout={layout}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                let styleProps = {
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };
                if (header.column.getCanSort()) {
                  styleProps = {
                    ...styleProps,
                    cursor: 'pointer',
                    userSelect: 'none',
                    _hover: {
                      backgroundColor: colorStyle.background.highlighted,
                    },
                  };
                }
                if (header.column.getIsSorted()) {
                  styleProps = {
                    ...styleProps,
                    color: colorStyle.color.emphasis,
                  };
                }
                return (
                  <TableHeaderCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    {...styleProps}
                  >
                    {header.isPlaceholder ? null : (
                      <Flex alignItems="center">
                        <Truncate>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Truncate>
                        {{
                          asc: (<Icon icon="sort-up" size={20}  ml="1x" />),
                          desc: (<Icon icon="sort-down" size={20} ml="1x" />),
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
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
              _hover={{
                backgroundColor: colorStyle.background.highlighted,
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
