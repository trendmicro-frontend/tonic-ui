import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Collapse,
  Flex,
  Grid,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  Text,
  TextLabel,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import { dataAttr } from '@tonic-ui/utils';
import React, { Fragment, forwardRef, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

/**
 * Assign a value to a ref function or object.
 *
 * @param ref the ref to assign to
 * @param value the value
 */
const assignRef = (ref, value) => {
  if (ref === null || ref === undefined) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
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

const ConditionalWrapper = ({
  children,
  condition,
  wrapper,
}) => {
  return condition ? wrapper(children) : children;
};

const BaseTable = forwardRef((
  {
    columns,
    data,
    layout = 'flexbox', // One of: 'flexbox', 'table'
    variant = 'default', // One of: 'default', 'outline'

    // TanStack Table
    tableOptions,
    tableRef,

    ...rest
  },
  ref,
) => {
  const [colorMode] = useColorMode();
  const theme = useTheme();
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const selectedBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];
  const renderExpandedRow = ({ row }) => {
    const tableBorderColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const dividerColor = {
      dark: 'gray:60',
      light: 'gray:30',
    }[colorMode];
    const entries = Object.entries(row.original);
    const renderValue = (value) => {
      if (Array.isArray(value)) {
        return value.map(item => <Text key={item}>{item}</Text>);
      }

      if (typeof value === 'boolean') {
        return value.toString();
      }

      return value;
    };

    return (
      <Flex
        borderBottom={1}
        borderBottomColor={tableBorderColor}
      >
        <Box width="12x" borderRight={2} borderRightColor={dividerColor} />
        <Box as="pre" fontFamily="mono" m={0} px="3x" py="2x">
          <Grid
            templateColumns="auto auto"
            columnGap="10x"
            rowGap="1x"
          >
            {entries.map(([key, value]) => {
              return (
                <Fragment key={key}>
                  <TextLabel>
                    {key}
                  </TextLabel>
                  <Text>
                    {renderValue(value)}
                  </Text>
                </Fragment>
              );
            })}
          </Grid>
        </Box>
      </Flex>
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });

  if (tableRef) {
    assignRef(tableRef, table);
  }

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

    let extraSpaceLeft = tableWidth - totalFixedColumnSize;

    // Distribute extra space to fixed columns if flex columns are not present
    if ((flexColumns.length === 0) && (extraSpaceLeft > 0)) {
      const extraSpacePerColumn = extraSpaceLeft / fixedColumns.length;
      fixedColumns.forEach(column => {
        column.size += extraSpacePerColumn;
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

  return (
    <AutoSizer
      onResize={({ width }) => {
        if (tableWidth !== width) {
          setTableWidth(width);
        }
      }}
    >
      {({ width, height }) => {
        return (
          <Table
            layout={layout}
            variant={variant}
            width={width}
            height={height}
            {...rest}
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
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())
                        }
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <ConditionalWrapper
              condition={layout === 'flexbox'}
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
                  <Fragment key={row.id}>
                    <TableRow
                      data-selected={dataAttr(row.getIsSelected())}
                      _hover={{
                        backgroundColor: hoverBackgroundColor,
                      }}
                      _selected={{
                        backgroundColor: selectedBackgroundColor,
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
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {(row.getCanExpand() && layout === 'flexbox') && (
                      <Collapse in={row.getIsExpanded()}>
                        {renderExpandedRow({ row })}
                      </Collapse>
                    )}
                    {(row.getCanExpand() && layout === 'table') && (
                      <TableRow>
                        <TableCell
                          padding={0}
                          borderBottom={0}
                          colSpan={row.getVisibleCells().length}
                        >
                          <Collapse in={row.getIsExpanded()}>
                            {renderExpandedRow({ row })}
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))}
              </TableBody>
            </ConditionalWrapper>
          </Table>
        );
      }}
    </AutoSizer>
  );
});

BaseTable.displayName = 'BaseTable';

export default BaseTable;
