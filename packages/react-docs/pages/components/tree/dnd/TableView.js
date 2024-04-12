import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Flex,
  OverflowTooltip,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import { SVGIcon, SortUpIcon, SortDownIcon } from '@tonic-ui/react-icons';
import {
  dataAttr,
} from '@tonic-ui/utils';
import { ensureArray, ensureNumber } from 'ensure-type';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import TablePagination from '@/components/TablePagination';
import ConditionalWrapper from './ConditionalWrapper';
import Draggable from './Draggable';
import DragIcon from './icons/drag.svg';

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

const Component = ({
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

  const nodeLabel = node.label;

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
        {nodeLabel}
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
                  <TableRow
                    key={headerGroup.id}
                  >
                    <TableCell
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
                        <TableCell
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          {...styleProps}
                        >
                          {header.isPlaceholder ? null : (
                            <Flex alignItems="center">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: (<SortUpIcon size={20} ml="1x" />),
                                desc: (<SortDownIcon size={20} ml="1x" />),
                              }[header.column.getIsSorted()] ?? null}
                            </Flex>
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
                                <SVGIcon
                                  alt="draggable"
                                  as={DragIcon}
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

export default Component;
