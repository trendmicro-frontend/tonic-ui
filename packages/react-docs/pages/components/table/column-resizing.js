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
  Truncate,
  useColorMode,
} from '@tonic-ui/react';
import React, { forwardRef, useMemo, useRef, useState } from 'react';

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
  const [isHoveringOnTableHeader, setIsHoveringOnTableHeader] = useState(false);

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
        <TableHeader
          onMouseEnter={() => setIsHoveringOnTableHeader(true)}
          onMouseLeave={() => setIsHoveringOnTableHeader(false)}
        >
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const styleProps = {
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };
                const columnSizingInfo = table.getState().columnSizingInfo;
                const isResizing = (columnSizingInfo.isResizingColumn === header.column.id);
                const columnResizerStyle = {
                  height: (isHoveringOnTableHeader || isResizing)
                    ? tableRef.current?.clientHeight
                    : undefined,
                  transform: (columnResizeMode === 'onEnd' && isResizing)
                    ? `translateX(${columnSizingInfo.deltaOffset}px)`
                    : undefined,
                };
                return (
                  <TableHeaderCell
                    key={header.id}
                    position="relative"
                    {...styleProps}
                  >
                    {header.isPlaceholder ? null : (
                      <Truncate>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Truncate>
                    )}
                    {(header.column.columnDef.enableResizing !== false) && (
                      <ColumnResizer
                        isResizing={isResizing}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        style={columnResizerStyle}
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

const ColumnResizer = forwardRef((
  {
    isResizing,
    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const resizerBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const resizerBorderColor = {
    dark: 'gray:50',
    light: 'gray:70',
  }[colorMode];

  return (
    <Box
      boxSizing="content-box"
      position="absolute"
      right={0}
      top={0}
      height="100%"
      width="1x"
      cursor="col-resize"
      userSelect="none"
      touchAction="none"
      backgroundColor={isResizing ? resizerBackgroundColor : undefined}
      borderLeft={isResizing ? 1 : undefined}
      borderLeftColor={isResizing ? resizerBorderColor : undefined}
      _hover={{
        backgroundColor: resizerBackgroundColor,
        borderLeft: 1,
        borderLeftColor: resizerBorderColor,
      }}
      {...rest}
    />
  );
});
ColumnResizer.displayName = 'ColumnResizer';

export default App;
