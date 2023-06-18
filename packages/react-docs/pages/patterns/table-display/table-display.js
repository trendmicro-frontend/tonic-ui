import {
  Box,
  Checkbox,
  Truncate,
} from '@tonic-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import BaseTable from '@/components/BaseTable';
import TableToolbar from './table-toolbar';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const App = () => {
  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'default'; // One of: 'default', 'outline'
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
    },
    {
      accessorKey: 'eventType',
      header: 'Event Type',
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 'auto',
    },
    {
      accessorKey: 'affectedDevices',
      header: 'Affected Devices',
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      accessorKey: 'detections',
      header: 'Detections',
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
  ], []);
  const [rowSelection, setRowSelection] = useState({});
  const tableOptions = useMemo(() => ({
    defaultColumn: {
      minSize: 48,
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enable row selection for all rows
    //enableRowSelection: row => row.original.detections > 0, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
  }), [rowSelection]);
  const tableRef = useRef();

  return (
    <>
      <Box mb="2x">
        <TableToolbar />
      </Box>
      <Box minHeight={500}>
        <BaseTable
          layout={layout}
          variant={variant}
          columns={columns}
          data={data}
          tableOptions={tableOptions}
          tableRef={tableRef}
        />
      </Box>
    </>
  );
};

export default App;
