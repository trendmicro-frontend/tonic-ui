import {
  Box,
  Button, 
  ButtonGroup,
  Checkbox,
  Code,
  Divider,
  Flex,
  Space,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableScrollbar,
  Text,
  TextLabel,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { useToggle } from '@tonic-ui/react-hooks';
import { callAll } from '@tonic-ui/utils';
import React, { useMemo, useReducer, useRef, useState } from 'react';

const useSelection = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const changeBy = (value) => () => setValue(value);
  return [value, changeBy];
};

const columns = [
  {
    id: 'priority',
    header: 'Priority',
    accessorKey: 'priority',
    cell: (row) => row.priority ?? '-',
    size: 80,
  },
  {
    id: 'policy',
    header: 'Policy',
    accessorKey: 'policy',
    size: 240,
  },
  {
    id: 'modifiedTime',
    header: 'Last Modified',
    cell: (row) => {
      const mtime = new Date(row.modifiedTime);
      return (
        <Truncate>
          {mtime.toLocaleString()}
        </Truncate>
      );
    },
    size: 180,
  },
  {
    id: 'modifiedBy',
    header: 'Last Editor',
    accessorKey: 'modifiedBy',
    size: 150,
  },
];

const data = [
  { id: 1, priority: 1, policy: 'Team Managers', modifiedTime: 1625875200000, modifiedBy: 'admin' },
  { id: 2, priority: 2, policy: 'Marketing Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
  { id: 3, priority: 3, policy: 'Sales Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
  { id: 4, priority: 4, policy: 'Development Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
  { id: 5, priority: 5, policy: 'IT Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
  { id: 6, priority: null, policy: 'Server policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
  { id: 7, priority: null, policy: 'Endpoint policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
];

const FormGroup = (props) => (
  <Box mb="4x" {...props} />
);

const App = () => {
  const [colorStyle] = useColorStyle();
  const [updateKey, forceUpdate] = useReducer((value) => !value, false);
  const [layout, changeLayoutBy] = useSelection('flexbox');
  const [variant, changeVariantBy] = useSelection('default');
  const [size, changeSizeBy] = useSelection('md');
  const [isTableHeaderVisible, toggleIsTableHeaderVisible] = useToggle(true);
  const [isTableBodyVisible, toggleIsTableBodyVisible] = useToggle(true);
  const [isTableScrollbarVisible, toggleIsTableScrollbarVisible] = useToggle(true);
  const rows = useMemo(() => {
    return data.map((row, rowIndex) => {
      return {
        id: rowIndex,
        cells: columns.map((column, columnIndex) => {
          return {
            id: `${columnIndex}_${column.id}`,
            column,
            row,
          };
        }),
        row,
      };
    });
  }, []);
  const tableHeaderRef = useRef();
  const onScrollTableBody = (e) => {
    const tableHeader = tableHeaderRef?.current;
    if (!tableHeader) {
      return;
    }
    // Sync the scroll position of the table header and table body for horizontal scrolling
    const scrollLeft = e.target.scrollLeft;
    if (tableHeader.scrollleft !== scrollLeft) {
      tableHeader.scrollLeft = scrollLeft;
    }
  };
  const isTableScrollingEnabled = isTableScrollbarVisible && layout !== 'table';
  let tableStyleProps = {};
  let tableHeaderStyleProps = {};

  if (isTableScrollingEnabled) {
    const cellHeight = 36;
    const headerHeight = 36;
    const rowsToDisplay = 5;

    tableStyleProps = {
      height: headerHeight + rowsToDisplay * cellHeight,
      // Uncomment the following line to specify the width and enable horizontal scrollbar
      // width: 200,
    };

    // Sync the scroll position of the table header and table body for horizontal scrolling
    tableHeaderStyleProps = {
      overflow: 'hidden',
    };
  }

  return (
    <>
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Table props
        </Text>
      </Box>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            layout
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['flexbox', 'table'].map(value => (
            <Button
              key={value}
              selected={value === layout}
              onClick={callAll(
                changeLayoutBy(value),
                (event) => {
                  if (value === 'table') {
                    toggleIsTableScrollbarVisible(false);
                  }
                },
              )}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            variant
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['default', 'outline'].map(value => (
            <Button
              key={value}
              selected={value === variant}
              onClick={changeVariantBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <FormGroup>
        <Box mb="2x">
          <TextLabel>
            size
          </TextLabel>
        </Box>
        <ButtonGroup
          variant="secondary"
          sx={{
            '> *:not(:first-of-type)': {
              marginLeft: -1
            }
          }}
        >
          {['sm', 'md', 'lg'].map(value => (
            <Button
              key={value}
              selected={value === size}
              onClick={changeSizeBy(value)}
              minWidth="15x"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>
      <Divider mb="4x" />
      <Box mb="4x">
        <Text fontSize="lg" lineHeight="lg">
          Table composition
        </Text>
      </Box>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={isTableHeaderVisible}
            onChange={() => toggleIsTableHeaderVisible()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">TableHeader</Text>
        </TextLabel>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center">
          <Checkbox
            checked={isTableBodyVisible}
            onChange={() => toggleIsTableBodyVisible()}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">TableBody</Text>
        </TextLabel>
      </FormGroup>
      <FormGroup>
        <TextLabel display="flex" alignItems="center" mb="3x">
          <Checkbox
            checked={isTableScrollbarVisible}
            disabled={layout === 'table'}
            onChange={() => {
              toggleIsTableScrollbarVisible();

              // Force update to recalculate table width and height
              forceUpdate();
            }}
          />
          <Space width="2x" />
          <Text fontFamily="mono" whiteSpace="nowrap">TableScrollbar</Text>
        </TextLabel>
        <Box ml="6x" mb="4x">
          <Text mb="2x" color={colorStyle.color.secondary}>
            Note: <Code>TableScrollbar</Code> is only supported when the <Code>layout</Code> prop is set to <Code>flexbox</Code>.
          </Text>
        </Box>
      </FormGroup>
      <Divider mb="4x" />
      <Flex alignItems="center" columnGap="3x" minHeight="5x">
        <Table
          key={updateKey}
          layout={layout}
          variant={variant}
          size={size}
          {...tableStyleProps}
        >
          {isTableHeaderVisible && (
            <TableHeader
              ref={tableHeaderRef}
              {...tableHeaderStyleProps}
            >
              <TableRow>
                {columns.map(column => {
                  const styleProps = {
                    flex: 'none',
                    width: column.size,
                    ...column.style,
                  };
                  return (
                    <TableCell key={column.id} {...styleProps}>
                      <Truncate>
                        {column.header}
                      </Truncate>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHeader>
          )}
          {isTableBodyVisible && (
            <ConditionalWrapper
              condition={isTableScrollingEnabled}
              wrapper={children => (
                <TableScrollbar
                  height="100%"
                  overflow="visible" // Make the scrollbar visible
                  onScroll={onScrollTableBody} // To sync the scroll position of the table header and table body for horizontal scrolling
                >
                  {children}
                </TableScrollbar>
              )}
            >
              <TableBody>
                {rows.map(row => {
                  const styleProps = {
                    _hover: {
                      backgroundColor: colorStyle.background.highlighted,
                    },
                  };
                  return (
                    <TableRow key={row.id} {...styleProps}>
                      {row.cells.map((cell, cellIndex) => {
                        const styleProps = {
                          flex: 'none',
                          width: cell.column.size,
                          ...cell.column.style,
                        };
                        return (
                          <TableCell key={cell.id} {...styleProps}>
                            {typeof cell.column.cell === 'function'
                              ? cell.column.cell(row.row)
                              : <Truncate>{cell.row[cell.column.accessorKey]}</Truncate>
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </ConditionalWrapper>
          )}
          {(isTableHeaderVisible && !isTableBodyVisible) && (
            <TableBody>
              {layout === 'flexbox' && (
                <Flex justifyContent="center" px="3x" py="10x">
                  No data to display
                </Flex>
              )}
              {layout === 'table' && (
                <TableRow>
                  <TableCell colSpan="4" px={0} py={0}>
                    <Text px="3x" py="10x" textAlign="center">
                      No data to display
                    </Text>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </Flex>
    </>
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
