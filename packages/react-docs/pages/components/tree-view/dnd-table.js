import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  OverflowTooltip,
  Space,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  Text,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  dataAttr,
} from '@tonic-ui/utils';
import { ensureArray, ensureNumber } from 'ensure-type';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'
import AutoSizer from 'react-virtualized-auto-sizer';
import iconDrag from './icons/icon-drag.svg';

const Draggable = ({
  canDrag: canDragProp,
  children,
  item: itemProp,
}) => {
  const [collectedProps, dragRef, dragPreviewRef] = useDrag({
    type: 'dnd',
    item: itemProp,
    canDrag: canDragProp,
    collect: (monitor) => {
      // DragSourceMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreviewRef]);

  return children({
    dragRef,
    isDragging: collectedProps.isDragging,
  });
};

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
const getTextWidth = (text, font) => {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width || 0;
};

const DndTable = ({
  node,
  data,
  ...rest
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const theme = useTheme();
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const selectedBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

  const [sorting, setSorting] = useState([
    { id: 'endpoint', desc: false },
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
      size: 40,
    },
    {
      header: () => (
        <OverflowTooltip label="Endpoint">
          Endpoint
        </OverflowTooltip>
      ),
      accessorKey: 'endpoint',
      cell: ({ getValue, row }) => {
        const value = getValue();
        return (
          <OverflowTooltip label={value}>
            {value}
          </OverflowTooltip>
        );
      },
      size: 'auto',
    },
    {
      header: () => (
        <OverflowTooltip label="Detections">
          Detections
        </OverflowTooltip>
      ),
      accessorKey: 'detections',
      cell: ({ getValue }) => {
        const detections = [...getValue()];
        const value = detections.length;
        return (
          <OverflowTooltip label={value}>
            {value}
          </OverflowTooltip>
        );
      },
      size: 'auto',
    },
    {
      header: () => (
        <OverflowTooltip label="Last Seen">
          Last Seen
        </OverflowTooltip>
      ),
      accessorKey: 'lastSeen',
      cell: ({ getValue }) => {
        const value = getValue().toISOString();
        return (
          <OverflowTooltip label={value}>
            {value}
          </OverflowTooltip>
        );
      },
      size: 'auto',
    },
  ], []);

  const table = useReactTable({
    data: ensureArray(data),
    columns,
    defaultColumn: {
      minSize: 40,
    },
    state: {
      rowSelection,
      sorting,
    },
    enableRowSelection: true, // enable row selection for all rows
    // enableRowSelection: row => row.original.detections > 0, // or enable row selection conditionally per row
    enableSorting: true, // Enables/Disables sorting for the table
    enableSortingRemoval: true, // Enables/Disables the ability to remove sorting for the table
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (nextSorting) => { // A function to be called with an `updaterFn` when `state.sorting` change
      setSorting(nextSorting);
    },
  });

  const [tableWidth, setTableWidth] = useState(0);

  useEffect(() => {
    table.resetRowSelection();
    table.resetPagination();
  }, [data, table]);

  useEffect(() => {
    if (!tableWidth) {
      return;
    }

    const gutterWidth = 12 + 12; // 12px padding on each side of the cell
    const tableHeaderCellFont = [
      theme.fontWeights.semibold,
      theme.fontSizes.sm,
      theme.fonts.base,
    ].join(' '); // => '600 14px "Segoe UI",-apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif'

    // Fixed columns are columns with a fixed size (e.g. 100 or '10%')
    const fixedColumns = table.getAllColumns()
      .filter(column => column.columnDef.size !== 'auto')
      .map(column => {
        const { id, columnDef } = column;
        const { minSize, size } = columnDef;

        // If the column size is a number, return the original size value
        if (typeof size === 'number') {
          return {
            id,
            size,
          };
        }

        // If the column size is a percentage, return the computed size value
        if (typeof size === 'string' && size.endsWith('%')) {
          const textWidth = (typeof columnDef.header === 'string')
            ? getTextWidth(columnDef.header, tableHeaderCellFont)
            : 0;
          const percentageWidth = tableWidth * parseFloat(size) / 100;

          return {
            id,
            size: Math.max(
              percentageWidth, // percentage of table width
              textWidth + gutterWidth, // text width with padding
              minSize, // minimum size (e.g. 40px)
            ),
          };
        }

        // Otherwise, return the minimum size value
        return {
          id,
          size: minSize,
        };
      });

    // Flexible columns are columns with a flexible size (e.g. 'auto')
    const flexColumns = table.getAllColumns()
      .filter(column => column.columnDef.size === 'auto')
      .map(column => {
        const { id, columnDef } = column;
        const { minSize } = columnDef;
        const textWidth = (typeof columnDef.header === 'string')
          ? getTextWidth(columnDef.header, tableHeaderCellFont)
          : 0;

        return {
          id,
          size: Math.max(
            textWidth + gutterWidth, // text width with padding
            minSize, // minimum size (e.g. 40px)
          ),
        };
      });

    const totalFixedColumnSize = fixedColumns.reduce((acc, column) => acc + column.size, 0);
    const totalFlexColumnSize = flexColumns.reduce((acc, column) => acc + column.size, 0);
    const resizerWidth = 12; // Width of the resizer element between the tree and the table

    let extraSpaceLeft = tableWidth - totalFixedColumnSize - resizerWidth;

    // Distribute extra space to fixed columns if flex columns are not present
    if ((flexColumns.length === 0) && (extraSpaceLeft > 0)) {
      const extraSpacePerColumn = extraSpaceLeft / fixedColumns.length;
      fixedColumns.forEach(column => {
        column.size = column.size + extraSpacePerColumn;
      });
      extraSpaceLeft = 0;
    }

    // Distribute extra space to flex columns if flex columns are present
    if ((flexColumns.length > 0) && (extraSpaceLeft > totalFlexColumnSize)) {
      /**
       * Assume that the extra space is 500px and the total flex column size is 400px:
       * > extraSpaceLeft = 500
       * > flexColumns = [ { size: 250 }, { size: 150 } ] // => Total size: 400px
       *
       * Iteration #0:
       * > column.size = Math.max(500 / (2 - 0), 250) = Math.max(250, 250) = 250
       * > extraSpaceLeft = 500 - 250 = 250
       *
       * Iteration #1:
       * > column.size = Math.max(250 / (2 - 1), 150) = Math.max(250, 150) = 250
       * > extraSpaceLeft = 250 - 250 = 0                         
       */
      flexColumns.forEach((column, index) => {
        column.size = Math.max(
          extraSpaceLeft / (flexColumns.length - index),
          column.size,
        );
        extraSpaceLeft -= column.size;
      });
    }

    const columnSizing = {};

    for (let i = 0; i < fixedColumns.length; i++) {
      const column = fixedColumns[i];
      columnSizing[column.id] = column.size;
    }
    for (let i = 0; i < flexColumns.length; i++) {
      const column = flexColumns[i];
      columnSizing[column.id] = column.size;
    }

    table.setColumnSizing(columnSizing);
  }, [columns, table, tableWidth, theme]);

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'default'; // One of: 'default', 'outline'
  const isTableScrollingEnabled = layout !== 'table';
  const totalCount = table.getCoreRowModel().rows.length;
  const getTableHeight = () => {
    if (isTableScrollingEnabled) {
      const headerHeight = 36;
      const cellHeight = 36;
      const footerHeight = 56;
      const rowsToDisplay = 10;
      return (headerHeight + rowsToDisplay * cellHeight + footerHeight);
    }
    return 'auto';
  };

  return (
    <Flex
      flexDirection="column"
      {...rest}
    >
      <Box flex="none" px="3x" py="2x">
        {node.name}
      </Box>
      <Box flex="auto">
        <AutoSizer
          disableHeight
          onResize={({ width }) => {
            if (tableWidth !== width) {
              setTableWidth(width);
            }
          }}
        >
          {({ width }) => (
            <Table
              layout={layout}
              variant={variant}
              sx={{
                // Hide the table if there is no column sizing state
                visibility: _.isEmpty(table.getState().columnSizing) ? 'hidden' : 'visible',
                height: getTableHeight(),
                width,
              }}
            >
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableHeaderRow
                    key={headerGroup.id}
                  >
                    <TableHeaderCell
                      sx={{
                        width: '2x',
                        pl: '3x',
                        pr: 0,
                      }}
                    />
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
                            backgroundColor: hoverBackgroundColor,
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
                              {flexRender(header.column.columnDef.header, header.getContext())}
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
                  {table.getRowModel().rows.map(row => {
                    return (
                      <Draggable
                        key={row.id}
                        item={() => {
                          const sourceNodeId = node.id;
                          const selectedRows = table.getSelectedRowModel().rows;
                          const rowIds = selectedRows.map(row => row.original.id);

                          return {
                            source: sourceNodeId,
                            data: rowIds,
                          };
                        }}
                      >
                        {({ dragRef, isDragging }) => {
                          const canDrag = row.getIsSelected();

                          return (
                            <TableRow
                              data-selected={dataAttr(row.getIsSelected())}
                              sx={{
                                position: 'relative',
                                _hover: {
                                  backgroundColor: hoverBackgroundColor,
                                },
                                _selected: {
                                  backgroundColor: selectedBackgroundColor,
                                },
                              }}
                            >
                              <TableCell
                                ref={dragRef}
                                sx={{
                                  width: '2x',
                                  pl: '3x',
                                  pr: 0,
                                  zIndex: canDrag ? 1 : undefined,
                                }}
                              >
                                <Image
                                  alt="draggable"
                                  src={iconDrag.src}
                                  sx={{
                                    cursor: 'move',
                                    visibility: row.getIsSelected() ? 'visible' : 'hidden',
                                    width: '2x',
                                    height: '4x',
                                  }}
                                />
                              </TableCell>
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
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        }}
                      </Draggable>
                    );
                  })}
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
          )}
        </AutoSizer>
      </Box>
    </Flex>
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
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
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
          <Icon icon="angle-left" />
        </Button>
        <Button
          width="8x"
          disabled={!canNextPage}
          onClick={(event) => {
            onPageChange(page + 1);
          }}
        >
          <Icon icon="angle-right" />
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

export default DndTable;
