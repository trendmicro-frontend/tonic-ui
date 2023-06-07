import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  Flex,
  Grid,
  Icon,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Text,
  TextLabel,
  Truncate,
  useColorMode,
  useColorStyle,
  useTheme,
} from '@tonic-ui/react';
import {
  createTransitionStyle,
  dataAttr,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionEasing,
} from '@tonic-ui/utils';
import React, { Fragment, forwardRef, useEffect, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

const data = [
  {
    endpointId: '0d4523d9-ceed-4a9a-b3d0-056814ee8811',
    endpointHostname: 'endpoint-1',
    endpointIp: ['fe80::c5a0:6dd9:1002:5760','10.1.136.130'],
    endpointMacAddress: '00:50:56:9c:3c:5a',
    eventId: 1,
    eventSourceType: 1,
    firstSeen: '2023-06-07T02:31:48Z',
    lastSeen: '2023-06-07T02:31:48Z',
    objectFirstSeen: '2023-06-07T02:27:34Z',
    objectLastSeen: '2023-06-07T02:32:04Z',
    objectIps: [
      '192.8.82.3',
      '199.7.83.46',
      '192.113.5.32',
    ],
    osDescription: 'Windows 10 Enterprise (64-bit) build 19044',
    osType: '0x00000007',
    osVer: '10.0.19044',
    processCmd: 'C:\\Windows\\System32\\svchost.exe -k NetworkService -p -s NlaSvc',
    processFileCreation: '2023-06-05T10:07:28Z',
    processFileHashMD5: 'b7f884c1b74a263f746ee12a5f7c9f6a',
    processFileHashSHA1: '1bc5066ddf693fc034d6514618854e26a84fd0d1',
    processFileHashSHA256: 'add683a6910abbbf0e28b557fad0ba998166394932ae2aca069d9aa19ea8fe88',
    processFileModifiedTime: '2023-06-05T10:07:28Z',
    processFileSize: 55320,
    processLaunchTime: '2023-06-06T09:42:15Z',
    processName: 'C:\\Windows\\System32\\svchost.exe',
    processId: 1408,
    processSigner: 'Microsoft Windows Publisher',
    processSignerValid: true,
    processUser: 'NETWORK SERVICE',
    processUserDomain: 'NT AUTHORITY',
    productCode: 'dummy',
    productVersion: 'x.y.z',
    sessionId: 0,
    timezone: 'Pacific Standard Time',
  },
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
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
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

  const columns = useMemo(() => [
    {
      id: 'expand',
      header: () => null,
      cell: ({ row }) => {
        const canExpand = row.getCanExpand();
        const isExpanded = row.getIsExpanded();

        if (!canExpand) {
          return null;
        }

        return (
          <TableRowToggleIcon
            isExpanded={isExpanded}
            onClick={row.getToggleExpandedHandler()}
          />
        );
      },
      size: 48,
    },
    {
      header: 'Logged',
      accessorKey: 'firstSeen',
      size: 180,
      cell: ({ row }) => {
        return (
          <Truncate>
            {row.original?.firstSeen}
          </Truncate>
        );
      },
    },
    {
      id: 'details',
      cell: ({ row }) => {
        const entries = Object.entries(row.original);

        return (
          <Truncate
            as="pre"
            fontFamily="mono"
            m={0}
            sx={{
              '--truncate-line-clamp': 3,
              wordBreak: 'break-all',
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 'var(--truncate-line-clamp)',
            }}
          >
            {entries.map((item, index) => {
              const [key, value] = item;
              return (
                <Box
                  key={key}
                  display="inline"
                >
                  {key}: <Text display="inline" color={colorStyle.color.tertiary}>{Array.isArray(value) ? value.join(',') : value}</Text>
                  {(index < entries.length - 1) && (
                    <Divider display="inline" orientation="vertical" mx="2x" />
                  )}
                </Box>
              );
            })}
          </Truncate>
        );
      },
      size: 'auto',
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 40,
    },
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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

  useEffect(() => {
    // Toggles the expanded state for all rows
    table.toggleAllRowsExpanded(true);
  }, [table]);

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const variant = 'default'; // One of: 'default', 'outline'

  return (
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
            variant={variant}
            width={width}
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
                <Fragment key={row.id}>
                  <TableRow
                    data-selected={dataAttr(row.getIsExpanded())}
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
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
};

const TableRowToggleIcon = forwardRef((
  {
    isExpanded,
    ...rest
  },
  ref,
) => {
  const timeout = isExpanded
    ? Math.floor(133 * 0.7) // exit
    : 133; // enter
  const easing = transitionEasing.easeOut;
  const transitionProps = isExpanded
    ? getEnterTransitionProps({ timeout, easing })
    : getExitTransitionProps({ timeout, easing });
  const styleProps = {
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: createTransitionStyle('transform', transitionProps),
  };

  return (
    <ButtonBase {...rest}>
      <Icon icon="angle-right" size="4x" {...styleProps} />
    </ButtonBase>
  );
});
TableRowToggleIcon.displayName = 'TableRowToggleIcon';

export default App;
