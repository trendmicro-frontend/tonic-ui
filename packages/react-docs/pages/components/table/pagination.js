import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Space,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  Text,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { AngleLeftIcon, AngleRightIcon } from '@tonic-ui/react-icons';
import { ensureArray, ensureNumber } from 'ensure-type';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
      size: 150,
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
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const isTableScrollingEnabled = layout !== 'table';
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalCount = table.getCoreRowModel().rows.length;
  let tableStyleProps = {};

  if (isTableScrollingEnabled) {
    const headerHeight = 36;
    const cellHeight = 36;
    const footerHeight = 56;
    const rowsToDisplay = 10;
    tableStyleProps = {
      height: headerHeight + rowsToDisplay * cellHeight + footerHeight,
    };
  }

  return (
    <>
      <Box mb="4x" px="3x">
        <Text>Current page: {currentPage}</Text>
      </Box>
      <Table
        layout={layout}
        {...tableStyleProps}
      >
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
                      <Truncate>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </Truncate>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <ConditionalWrapper
          condition={isTableScrollingEnabled}
          wrapper={children => (
            <TableScrollbar
              height="100%"
              overflow="visible" // Make the scrollbar visible
            >
              {children}
            </TableScrollbar>
          )}
        >
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
        </ConditionalWrapper>
        <TablePagination
          count={totalCount}
          onPageChange={(nextPage) => {
            const pageIndex = Math.max(ensureNumber(nextPage) - 1, 0);
            table.setPageIndex(pageIndex);
          }}
          onRowsPerPageChange={(nextRowsPerPage) => {
            const pageSize = Math.max(ensureNumber(nextRowsPerPage), 1);
            table.setPageSize(pageSize);
          }}
        />
      </Table>
    </>
  );
};

const TablePagination = ({
  count,
  defaultPage = 1,
  defaultRowsPerPage: defaultRowsPerPageProp,
  onPageChange: onPageChangeProp,
  onRowsPerPageChange: onRowsPerPageChangeProp,
  page: pageProp,
  rowsPerPage: rowsPerPageProp,
  rowsPerPageOptions = [10, 25, 50, 100],
  showFirstButton = false,
  showLastButton = false,
}) => {
  const [colorStyle] = useColorStyle();
  const defaultRowsPerPage = defaultRowsPerPageProp ?? ensureArray(rowsPerPageOptions)[0];
  const [page, setPage] = useState(pageProp ?? defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageProp ?? defaultRowsPerPage);

  useEffect(() => {
    const isControlled = (pageProp !== undefined);
    if (isControlled) {
      setPage(pageProp);
    }
  }, [pageProp]);

  useEffect(() => {
    const isControlled = (rowsPerPageProp !== undefined);
    if (isControlled) {
      setRowsPerPage(rowsPerPageProp);
    }
  }, [rowsPerPageProp]);

  const onPageChange = useCallback((nextPage) => {
    const isControlled = (pageProp !== undefined);
    if (!isControlled) {
      setPage(nextPage);
    }

    if (typeof onPageChangeProp === 'function') {
      onPageChangeProp(nextPage);
    }
  }, [pageProp, onPageChangeProp]);

  const onRowsPerPageChange = useCallback((nextRowsPerPage) => {
    const isControlled = (rowsPerPageProp !== undefined);
    if (!isControlled) {
      setRowsPerPage(nextRowsPerPage);
    }

    if (typeof onRowsPerPageChangeProp === 'function') {
      onRowsPerPageChangeProp(nextRowsPerPage);
    }
  }, [rowsPerPageProp, onRowsPerPageChangeProp]);

  const totalPages = Math.ceil(count / rowsPerPage);
  const handlePageChange = (event) => {
    const nextPage = ensureNumber(event.target.value);
    if (nextPage <= 1) {
      onPageChange(1);
    } else if (nextPage >= totalPages) {
      onPageChange(totalPages);
    } else {
      onPageChange(nextPage);
    }
  };
  const handleRowsPerPageChange = (event) => {
    const nextRowsPerPage = ensureNumber(event.target.value);
    if (nextRowsPerPage > 0) {
      onPageChange(1);
      onRowsPerPageChange(nextRowsPerPage);
    }
  };
  const canPreviousPage = (page > 1);
  const canNextPage = (page < totalPages);

  return (
    <Flex
      alignItems="center"
      justifyContent="flex-end"
      backgroundColor={colorStyle.background.secondary}
      px="6x"
      py="3x"
    >
      <Text mr="2x">
        Total: {count}
      </Text>
      <Divider
        orientation="vertical"
        height="6x"
      />
      <Menu>
        <MenuButton variant="ghost">
          {rowsPerPage} per page
        </MenuButton>
        <MenuList
          onClick={handleRowsPerPageChange}
          width="100%"
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Divider
        orientation="vertical"
        height="6x"
      />
      <Space width="2x" />
      <Input
        width="10x"
        px={0}
        textAlign="center"
        onChange={handlePageChange}
        value={page}
      />
      <Space width="2x" />
      <Text>/</Text>
      <Space width="2x" />
      <Text>{totalPages}</Text>
      <Space width="2x" />
      <ButtonGroup
        variant="secondary"
        sx={{
          '> *:not(:first-of-type)': {
            marginLeft: -1
          }
        }}
      >
        <Button
          width="8x"
          disabled={!canPreviousPage}
          onClick={(event) => {
            onPageChange(page - 1);
          }}
        >
          <AngleLeftIcon />
        </Button>
        <Button
          width="8x"
          disabled={!canNextPage}
          onClick={(event) => {
            onPageChange(page + 1);
          }}
        >
          <AngleRightIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

const ConditionalWrapper = ({
  children,
  condition,
  wrapper,
}) => {
  return condition ? wrapper(children) : children;
};

export default App;
