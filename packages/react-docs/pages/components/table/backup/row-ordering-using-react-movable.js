import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Flex,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import {
  useToggle,
} from '@tonic-ui/react-hooks';
import { dataAttr } from '@tonic-ui/utils';
import React, { useMemo, useState } from 'react';
import { List, arrayMove } from 'react-movable';
import HandleIcon from './icons/icon-handle';

const DragHandleIcon = ({ sx, ...rest }) => {
  return (
    <Flex
      sx={[
        {
          '[role="row"]:hover > [role="cell"] &': {
            opacity: 1,
          },
          opacity: 0,
          cursor: 'move',
          px: '1x',
          width: '4x',
          position: 'absolute',
          left: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <HandleIcon />
    </Flex>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [data, setData] = useState([
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ]);
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
      minSize: 48,
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enable row selection for all rows
    // enableRowSelection: row => row.original.detections > 0, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const [enableRowOrderingByDraggingTableRow, toggleEnableRowOrderingByDraggingTableRow] = useToggle(true);
  const selectedRowCount = Object.keys(rowSelection).length;
  const rows = table.getRowModel().rows;

  return (
    <>
      <Box mb="4x" px="3x">
        <Checkbox
          checked={enableRowOrderingByDraggingTableRow}
          onChange={() => {
            toggleEnableRowOrderingByDraggingTableRow();
          }}
        >
          <Flex alignItems="center">
            Enable reordering of rows by dragging the entire table row
          </Flex>
        </Checkbox>
      </Box>
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
        <List
          lockVertically={true}
          values={rows}
          onChange={({ oldIndex, newIndex }) => {
            // Update the data
            setData(arrayMove(data, oldIndex, newIndex));

            // Update the row selection state
            const oldRowSelectionValues = rows.map((value, key) => rowSelection[key]);
            const newRowSelectionValues = arrayMove(oldRowSelectionValues, oldIndex, newIndex);
            const newRowSelection = newRowSelectionValues.reduce((acc, value, key) => {
              if (value !== undefined) {
                acc[key] = value;
              }
              return acc;
            }, {});
            setRowSelection(newRowSelection);
          }}
          renderList={({ children, props, isDragged }) => {
            return (
              <TableBody {...props}>{children}</TableBody>
            );
          }}
          renderItem={({ value: row, props, isDragged, isOutOfBounds }) => {
            return (
              <TableRow
                key={row.id}
                data-selected={dataAttr(row.getIsSelected())}
                sx={{
                  cursor: isDragged ? 'move' : undefined,
                  _hover: {
                    backgroundColor: isDragged ? 'gray:70' : colorStyle.background.highlighted,
                  },
                  _selected: {
                    backgroundColor: isDragged ? 'gray:70' : colorStyle.background.selected,
                  },
                }}
                {...props}
              >
                {row.getVisibleCells().map(cell => {
                  const styleProps = {
                    minWidth: cell.column.columnDef.minSize,
                    width: cell.column.getSize(),
                    ...cell.column.columnDef.style,
                  };

                  if (cell.column.id === 'selection') {
                    return (
                      <TableCell
                        key={cell.id}
                        sx={{
                          ...styleProps,
                          position: 'relative',
                        }}
                      >
                        <Flex alignItems="center">
                          <DragHandleIcon
                            {...{
                              // Mark any node with the `data-movable-handle` attribute if you wish you wish to use it as a DnD handle.
                              // The rest of renderItem will be then ignored and not start the drag and drop.
                              'data-movable-handle': enableRowOrderingByDraggingTableRow ? undefined : '',
                            }}
                          />
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Flex>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={cell.id}
                      sx={{
                        ...styleProps,
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          }}
        />
      </Table>
    </>
  );
};

export default App;
