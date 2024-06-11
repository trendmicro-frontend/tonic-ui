import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  Flex,
  Icon,
  Space,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  useConst,
} from '@tonic-ui/react-hooks';
import { dataAttr } from '@tonic-ui/utils';
import _ from 'lodash';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import ColumnSettingsDrawer from './column-settings-drawer';

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

const App = () => {
  const theme = useTheme();
  const [colorStyle] = useColorStyle();
  const defaultColumnOrder = [
    'priority',
    'policy',
    'modifiedTime',
    'modifiedBy',
  ];
  const [columnOrder, setColumnOrder] = useState(defaultColumnOrder);
  const [columnVisibility, setColumnVisibility] = useState({
    'priority': true,
    'policy': true,
    'modifiedTime': true,
    'modifiedBy': true,
  });
  const data = useConst(() => [
    { id: 1, priority: 1, policy: 'Team Managers', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 2, priority: 2, policy: 'Marketing Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 3, priority: 3, policy: 'Sales Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 4, priority: 4, policy: 'Development Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 5, priority: 5, policy: 'IT Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 6, priority: null, policy: 'Server policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
    { id: 7, priority: null, policy: 'Endpoint policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
  ]);
  const columns = useConst(() => [
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      cell: ({ getValue }) => {
        const priority = getValue();
        return priority ?? '-';
      },
      size: 80,
      isPinned: true,
    },
    {
      id: 'policy',
      header: 'Policy',
      accessorKey: 'policy',
      size: 'auto',
      isPinned: false,
    },
    {
      id: 'modifiedTime',
      header: 'Last Modified',
      accessorKey: 'modifiedTime',
      cell: ({ getValue }) => {
        const mtime = getValue();
        const date = new Date(mtime);
        if (date.toString() === 'Invalid Date') {
          return '-';
        }
        return (
          <Truncate>
            {date.toLocaleString()}
          </Truncate>
        );
      },
      size: 'auto',
      isPinned: false,
    },
    {
      id: 'modifiedBy',
      header: 'Last Editor',
      accessorKey: 'modifiedBy',
      size: 'auto',
      isPinned: false,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 80,
    },
    state: {
      columnOrder,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const [tableWidth, setTableWidth] = useState(0);

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
              minSize, // minimum size (e.g. 80px)
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
            minSize, // minimum size (e.g. 80px)
          ),
        };
      });

    const totalFixedColumnSize = fixedColumns.reduce((acc, column) => acc + column.size, 0);
    const totalFlexColumnSize = flexColumns.reduce((acc, column) => acc + column.size, 0);

    let extraSpaceLeft = tableWidth - totalFixedColumnSize;

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
  const [isColumnSettingsDrawerOpen, setIsColumnSettingsDrawerOpen] = useState(false);

  /*
   * columns = [
   *   {
   *     id: <string>,
   *     label: <string>,
   *     isPinned: <boolean>,
   *     isVisible: <boolean>,
   *   }
   * ]
   */
  const orderedColumns = table.getState().columnOrder.map(columnId => {
    const column = table.getColumn(columnId);
    return {
      id: columnId,
      label: column.columnDef.header,
      isPinned: column.columnDef.isPinned,
      isVisible: table.getState().columnVisibility[columnId],
    };
  });

  const onUpdateColumns = useCallback((columns) => {
    const order = columns.map(column => column.id);
    const visibility = columns.reduce((acc, column) => {
      acc[column.id] = column.isVisible;
      return acc;
    }, {});
    setColumnOrder(order);
    setColumnVisibility(visibility);
  }, [setColumnOrder]);

  return (
    <>
      <ColumnSettingsDrawer
        columns={orderedColumns}
        defaultColumnOrder={defaultColumnOrder}
        onUpdateColumns={onUpdateColumns}
        isOpen={isColumnSettingsDrawerOpen}
        onClose={() => setIsColumnSettingsDrawerOpen(false)}
      />
      <Flex
        justifyContent="flex-end"
        mb="4x"
      >
        <Button
          variant="secondary"
          onClick={() => setIsColumnSettingsDrawerOpen(true)}
        >
          <Icon icon="columns" />
          <Space width="2x" />
          Customize Columns
        </Button>
      </Flex>
      <Box>
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
              sx={{
                // Hide the table if there is no column sizing state
                visibility: _.isEmpty(table.getState().columnSizing) ? 'hidden' : 'visible',

                width,
              }}
            >
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
                    data-selected={dataAttr(row.getIsSelected())}
                    _hover={{
                      backgroundColor: colorStyle.background.highlighted,
                    }}
                    _selected={{
                      backgroundColor: colorStyle.background.selected,
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
          )}
        </AutoSizer>
      </Box>
    </>
  );
};

export default App;
