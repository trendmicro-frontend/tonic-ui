import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Box,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  Text,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import _ from 'lodash';
import React, { useMemo, useRef } from 'react';

const threatTypes = [
  'Virus/Malware',
  'Spyware/Grayware',
  'URL Filtering',
  'Web Reputation',
  'Network Virus',
  'Application Control',
];

const data = _.range(360).map((i) => {
  // Randomly pick a subset of threat types
  const detections = _.sampleSize(threatTypes, _.random(0, threatTypes.length));
  // Generate a random date within the past 30 days
  const lastSeen = new Date(Date.now() - _.random(0, 60 * 60 * 24 * 30 * 1000));
  return {
    id: i + 1,
    endpoint: `Endpoint ${i + 1}`,
    detections,
    lastSeen,
  };
});

const App = () => {
  const [colorStyle] = useColorStyle();
  const columns = useMemo(() => [
    {
      header: 'Endpoint',
      accessorKey: 'endpoint',
      size: 200,
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      cell: ({ getValue }) => {
        const detections = [...getValue()];
        return detections.length;
      },
      size: 100,
    },
    {
      header: 'Last Seen',
      accessorKey: 'lastSeen',
      cell: ({ getValue }) => getValue().toISOString(),
      size: 200,
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 80,
    },
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const scrollRef = useRef();
  const headerHeight = 36;
  const cellHeight = 36;
  const rowsToDisplay = 10;
  const tableStyleProps = {
    height: headerHeight + rowsToDisplay * cellHeight,
  };

  // https://tanstack.com/virtual/v3/docs/api/virtualizer
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => scrollRef.current?.firstChild,
    estimateSize: (index) => cellHeight,
    overscan: rowsToDisplay,
  });

  return (
    <>
      <Box mb="4x" px="3x">
        <Text>Total: {table.getRowModel().rows.length}</Text>
      </Box>
      <Table
        layout="flexbox"
        {...tableStyleProps}
      >
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
        <TableScrollbar
          ref={scrollRef}
          height="100%"
          overflow="visible" // Make the scrollbar visible
        >
          <Box
            position="relative"
            width="100%"
            style={{
              height: rowVirtualizer.getTotalSize(),
            }}
          >
            <TableBody>
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = table.getRowModel().rows[virtualRow.index];
                return (
                  <Box
                    key={virtualRow.key}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {row && (
                      <TableRow
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
                    )}
                  </Box>
                );
              })}
            </TableBody>
          </Box>
        </TableScrollbar>
      </Table>
    </>
  );
};

export default App;
