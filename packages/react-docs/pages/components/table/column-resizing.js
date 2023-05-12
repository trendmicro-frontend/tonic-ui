import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableColumnResizeHandle,
  Truncate,
  useColorMode,
} from '@tonic-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const App = () => {
  const tableRef = useRef();
  const [colorMode] = useColorMode();
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  const [columnResizeMode, setColumnResizeMode] = useState('onChange');
  const [resizeHandleHeight, setResizeHandleHeight] = useState('100%');

  // https://tanstack.com/table/v8/docs/api/features/column-sizing#column-def-options
  //
  // ```
  // enableResizing?: boolean
  // ```
  // Enables or disables column resizing for the column
  //
  // ```
  // size?: number
  // ```
  // The desired size for the column
  //
  // ```
  // minSize?: number
  // ```
  // The minimum allowed size for the column
  //
  // ```
  // maxSize?: number
  // ```
  // The maximum allowed size for the column
  //
  const columns = useMemo(() => [
    {
      header: 'Event Type',
      accessorKey: 'eventType',
      enableResizing: true,
      size: 240,
    },
    {
      header: 'Affected Devices',
      accessorKey: 'affectedDevices',
      enableResizing: true,
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      enableResizing: true,
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
      minSize: 40,
    },
    columnResizeMode,
    getCoreRowModel: getCoreRowModel(),
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'outline'; // One of: 'default', 'outline'

  useEffect(() => {
    const tableHeight = tableRef.current?.clientHeight;
    if (!tableHeight) {
      return;
    }

    if (variant === 'outline') {
      // Subtract 2px for the border
      setResizeHandleHeight(tableHeight - 2);
    } else {
      setResizeHandleHeight(tableHeight);
    }
  }, [variant]);

  return (
    <>
      <Box mb="4x" px="3x">
        <Menu>
          <MenuButton variant="secondary">
            Resize: {columnResizeMode}
          </MenuButton>
          <MenuList
            onClick={(event) => {
              const value = event.target.value;
              setColumnResizeMode(value);
            }}
            width="max-content"
          >
            <MenuItem value="onChange">
              Resize: onChange
            </MenuItem>
            <MenuItem value="onEnd">
              Resize: onEnd
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Table
        ref={tableRef}
        layout={layout}
        variant={variant}
      >
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const styleProps = {
                  position: 'relative',
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };
                const columnSizingInfo = table.getState().columnSizingInfo;
                const isResizingColumn = (columnSizingInfo.isResizingColumn === header.column.id);
                const resizeHandleStyle = {
                  // You must specify absolute positioning for the resize handle to work correctly
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: resizeHandleHeight,

                  // Use `transform: translateX()` to move the resize handle when `columnResizeMode` is 'onEnd'
                  transform: (columnResizeMode === 'onEnd' && isResizingColumn)
                    ? `translateX(${columnSizingInfo.deltaOffset}px)`
                    : undefined,
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
                    {(header.column.columnDef.enableResizing !== false) && (
                      <TableColumnResizeHandle
                        style={resizeHandleStyle}

                        // The following `onMouseDown` and `onTouchStart` props are required for the resize handle to work with `@tanstack/react-table`
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}

                        // The following `onResize`, `onResizeStart`, and `onResizeEnd` props can be used to update the column size when resizing
                        onResize={({ clientX, clientY }) => {
                          // Update the column size based on the current resizing coordinates
                        }}
                        onResizeStart={({ clientX, clientY }) => {
                          // Get the initial position of the resize handle when resizing starts
                        }}
                        onResizeEnd={({ clientX, clientY }) => {
                          // Get the final position of the resize handle when resizing ends
                        }}
                      />
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
                backgroundColor: hoverBackgroundColor,
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
