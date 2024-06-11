import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TextLabel,
  Truncate,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

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
  const [columns, setColumns] = useState([
    {
      header: 'Event Type',
      accessorKey: 'eventType',
      size: 'auto',
    },
    {
      header: 'Affected Devices',
      accessorKey: 'affectedDevices',
      size: '25%',
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      size: 150,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 80,
    },
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
  const variant = 'default'; // One of: 'default', 'outline'

  return (
    <Box width="100%">
      {columns.map((column, columnIndex) => (
        <Box mb="4x" key={columnIndex}>
          <Box mb="2x">
            <TextLabel>
              {column.header}
            </TextLabel>
          </Box>
          <ButtonGroup
            variant="secondary"
            css={{
              '> *:not(:first-of-type)': {
                marginLeft: -1
              }
            }}
          >
            {['auto', '25%', 150].map(value => (
              <Button
                key={value}
                selected={value === columns[columnIndex].size}
                onClick={() => {
                  const newColumns = [
                    ...columns.slice(0, columnIndex),
                    {
                      ...columns[columnIndex],
                      size: value,
                    },
                    ...columns.slice(columnIndex + 1),
                  ];
                  setColumns(newColumns);
                }}
                minWidth="15x"
              >
                {value}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      ))}
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
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
};

export default App;
