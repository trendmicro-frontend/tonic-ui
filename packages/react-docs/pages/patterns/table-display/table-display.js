import {
  getPaginationRowModel,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Flex,
  Truncate,
} from '@tonic-ui/react';
import { ensureNumber } from 'ensure-type';
import _ from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BaseTable from '@/components/BaseTable';
import TablePagination from '@/components/TablePagination';
import TableToolbar from './table-toolbar';

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
      header: 'Endpoint',
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      accessorKey: 'endpoint',
      size: 'auto',
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      cell: ({ getValue }) => {
        const detections = [...getValue()];
        return detections.length;
      },
      size: 150,
    },
    {
      header: 'Last Seen',
      accessorKey: 'lastSeen',
      cell: ({ getValue }) => {
        return getValue().toISOString();
      },
      size: 200,
    },
  ], []);

  const tableRef = useRef();

  const [rowSelection, setRowSelection] = useState({});
  const [totalCount, setTotalCount] = useState(data.length);

  const tableOptions = useMemo(() => ({
    defaultColumn: {
      minSize: 48,
    },
    state: {
      rowSelection,
    },

    // Pagination
    getPaginationRowModel: getPaginationRowModel(),

    // Row selection
    enableRowSelection: row => true, // enable row selection conditionally
    onRowSelectionChange: setRowSelection,
  }), [rowSelection]);

  useEffect(() => {
    const table = tableRef.current;
    setTotalCount(table ? table.getCoreRowModel().rows.length : 0);
  }, [tableRef.current]);

  const pageHeight = 600;

  return (
    <Flex
      flexDirection="column"
      height={pageHeight}
    >
      <Box flex="none" mb="2x">
        <TableToolbar />
      </Box>
      <Box flex="auto">
        <BaseTable
          layout={layout}
          variant={variant}
          columns={columns}
          data={data}
          tableOptions={tableOptions}
          tableRef={tableRef}
        />
      </Box>
      <Box flex="none">
        <TablePagination
          count={totalCount}
          onPageChange={(nextPage) => {
            const pageIndex = Math.max(ensureNumber(nextPage) - 1, 0);
            tableRef.current.setPageIndex(pageIndex);
          }}
          onRowsPerPageChange={(nextRowsPerPage) => {
            const pageSize = Math.max(ensureNumber(nextRowsPerPage), 1);
            tableRef.current.setPageSize(pageSize);
          }}
        />
      </Box>
    </Flex>
  );
};

export default App;
