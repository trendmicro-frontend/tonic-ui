import React from 'react';
import { useTable, useBlockLayout, useRowSelect } from 'react-table';
import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@trendmicro/react-styled-ui';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  return (
    <Checkbox
      ref={resolvedRef}
      indeterminate={indeterminate}
      {...rest}
    />
  );
});

function SelectableTable() {
  const columns = React.useMemo(() => [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'Event Type',
          accessor: 'eventType',
        },
      ],
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Affected Devices',
          accessor: 'affectedDevices',
        },
        {
          Header: 'Detections',
          accessor: 'detections',
        },
      ],
    },
  ], []);

  const data = React.useMemo(() => [
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useBlockLayout,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
          width: 41,
        },
        ...columns,
      ]);
    }
  );

  return (
    <>
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map(headerGroup => (
            <TableHeaderRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHeaderCell {...column.getHeaderProps()}>{column.render('Header')}</TableHeaderCell>
              ))}
            </TableHeaderRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}

export default SelectableTable;
