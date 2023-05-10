import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
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
import React, { useMemo } from 'react';

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
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

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
      minSize: 40,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  // If you want to manage your own state and override the state manager, you can uncomment and modify the following code:
  /*
  const [state, setState] = React.useState(table.initialState);
  table.setOptions(prevOptions => ({
    ...prevOptions,
    state,
    onStateChange: setState,
  }));
  */

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
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
  );
};

export default App;
