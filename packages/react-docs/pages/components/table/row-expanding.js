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
  Flex,
  Grid,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  TextLabel,
  Truncate,
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';
import { AngleRightIcon } from '@tonic-ui/react-icons';
import {
  createTransitionStyle,
  dataAttr,
  getEnterTransitionProps,
  getExitTransitionProps,
  transitionEasing,
} from '@tonic-ui/utils';
import React, { Fragment, forwardRef, useMemo } from 'react';

const data = [
  { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
  { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
  { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
  { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
  { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
  { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
];

const App = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle();
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

  /*
  const renderExpandedRow = ({ row }) => {
    const tableBorderColor = {
      dark: 'gray:70',
      light: 'gray:30',
    }[colorMode];
    const dividerColor = {
      dark: 'gray:60',
      light: 'gray:30',
    }[colorMode];

    return (
      <Flex
        borderBottom={1}
        borderBottomColor={tableBorderColor}
      >
        <Box width="12x" borderRight={2} borderRightColor={dividerColor} />
        <Box as="pre" fontFamily="mono" m={0} px="3x" py="2x">
          {JSON.stringify(row.original, null, 2)}
        </Box>
      </Flex>
    );
  };
  */

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
      header: 'Event Type',
      accessorKey: 'eventType',
      size: 240,
    },
    {
      header: 'Affected Devices',
      accessorKey: 'affectedDevices',
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      header: 'Detections',
      accessorKey: 'detections',
      size: 150,
      style: {
        textAlign: 'right',
      },
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
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <Table layout={layout}>
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
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <Fragment key={row.id}>
            <TableRow
              data-selected={dataAttr(row.getIsExpanded())}
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
      <AngleRightIcon size="4x" {...styleProps} />
    </ButtonBase>
  );
});
TableRowToggleIcon.displayName = 'TableRowToggleIcon';

export default App;
