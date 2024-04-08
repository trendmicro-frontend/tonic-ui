import { fireEvent, screen } from '@testing-library/react';
import { render } from '@tonic-ui/react/test-utils/render';
import { testA11y } from '@tonic-ui/react/test-utils/accessibility';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumnResizeHandle,
  TableScrollbar,
  Truncate,
} from '@tonic-ui/react/src';
import React, { useCallback, useMemo, useRef } from 'react';

describe('Table', () => {
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

  it('should render correctly with `flexbox` layout', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };

    const { container } = render((
      <Table layout="flexbox">
        <TableHeader>
          <TableRow>
            <TableCell>
              Header Cell 1
            </TableCell>
            <TableCell>
              Header Cell 2
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              Row 1, Cell 1
            </TableCell>
            <TableCell>
              Row 1, Cell 2
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Row 2, Cell 1
            </TableCell>
            <TableCell>
              Row 2, Cell 2
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should render correctly with `table` layout', async () => {
    const renderOptions = {
      useCSSVariables: true,
    };

    const { container } = render((
      <Table layout="table">
        <TableHeader>
          <TableRow>
            <TableCell>
              Header Cell 1
            </TableCell>
            <TableCell>
              Header Cell 2
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              Row 1, Cell 1
            </TableCell>
            <TableCell>
              Row 1, Cell 2
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Row 2, Cell 1
            </TableCell>
            <TableCell>
              Row 2, Cell 2
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ), renderOptions);

    expect(container).toMatchSnapshot();

    await testA11y(container);
  });

  it('should resize columns correctly', async () => {
    const TableComponent = ({
      columns,
      data,
      onColumnResizeStart: onColumnResizeStartProp,
      onColumnResize: onColumnResizeProp,
      onColumnResizeEnd: onColumnResizeEndProp,
    }) => {
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
      }, [columns, data]);

      const handleResizeStartBy = (columnId) => (coord) => {
        onColumnResizeStartProp(columnId, coord);
      };
      const handleResizeBy = (columnId) => (coord) => {
        onColumnResizeProp(columnId, coord);
      };
      const handleResizeEndBy = (columnId) => (coord) => {
        onColumnResizeEndProp(columnId, coord);
      };

      const layout = 'flexbox'; // One of: 'flexbox', 'table'
      const variant = 'outline'; // One of: 'default', 'outline'

      return (
        <Table
          layout={layout}
          variant={variant}
        >
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => {
                const styleProps = {
                  flex: 'none',
                  position: 'relative',
                  width: column.size,
                  ...column.style,
                };
                const resizeHandleStyle = {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                };

                return (
                  <TableCell key={column.id} {...styleProps}>
                    <Truncate>
                      {column.header}
                    </Truncate>
                    <TableColumnResizeHandle
                      data-testid={`column-resize-handle-${index}`}
                      style={resizeHandleStyle}
                      onResizeStart={handleResizeStartBy(column.id)}
                      onResize={handleResizeBy(column.id)}
                      onResizeEnd={handleResizeEndBy(column.id)}
                    />
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                {row.cells.map((cell, cellIndex) => {
                  const styleProps = {
                    flex: 'none',
                    width: cell.column.size,
                    ...cell.column.style,
                  };
                  const renderCell = (cell) => {
                    if (typeof cell.column.cell === 'function') {
                      return cell.column.cell(row.row);
                    }
                    return (
                      <Truncate>
                        {cell.row[cell.column.accessorKey]}
                      </Truncate>
                    );
                  };

                  return (
                    <TableCell key={cell.id} {...styleProps}>
                      {renderCell(cell)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    };

    const onColumnResizeStart = jest.fn();
    const onColumnResize = jest.fn();
    const onColumnResizeEnd = jest.fn();

    render(
      <TableComponent
        columns={columns}
        data={data}
        onColumnResizeStart={onColumnResizeStart}
        onColumnResize={onColumnResize}
        onColumnResizeEnd={onColumnResizeEnd}
      />
    );

    const el = screen.getByTestId('column-resize-handle-0');

    // Mouse events
    await fireEvent.mouseDown(el, { clientX: 150, clientY: 18 }); // => onResizeStart
    await fireEvent.mouseMove(el, { clientX: 140, clientY: 18 }); // => onResize
    await fireEvent.mouseUp(el, { clientX: 130, clientY: 18 }); // => onResizeEnd
    expect(onColumnResizeStart).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 150,
        clientY: 18,
      }),
    );
    expect(onColumnResize).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 140,
        clientY: 18,
      }),
    );
    expect(onColumnResizeEnd).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 130,
        clientY: 18,
      }),
    );

    // Touch events
    await fireEvent.touchStart(el, { touches: [{ clientX: 120, clientY: 18 }] }); // => onResizeStart
    await fireEvent.touchMove(el, { touches: [{ clientX: 110, clientY: 18 }] }); // => onResize
    await fireEvent.touchEnd(el, { touches: [{ clientX: 100, clientY: 18 }] }); // => onResizeEnd
    expect(onColumnResizeStart).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 120,
        clientY: 18,
      }),
    );
    expect(onColumnResize).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 110,
        clientY: 18,
      }),
    );
    expect(onColumnResizeEnd).toHaveBeenLastCalledWith(
      columns[0].id,
      expect.objectContaining({
        clientX: 100,
        clientY: 18,
      }),
    );
  });

  it('should scroll rows correctly', async () => {
    const TableComponent = ({
      columns,
      data,
      onScroll: onScrollProp,
    }) => {
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
      }, [columns, data]);

      const tableHeaderRef = useRef();

      const onScrollTableBody = useCallback((event) => {
        onScrollProp?.(event);

        const tableHeader = tableHeaderRef?.current;
        if (!tableHeader) {
          return;
        }
        // Sync the scroll position of the table header and table body for horizontal scrolling
        const scrollLeft = event.target.scrollLeft;
        if (tableHeader.scrollleft !== scrollLeft) {
          tableHeader.scrollLeft = scrollLeft;
        }
      }, [onScrollProp]);

      const cellHeight = 36;
      const headerHeight = 36;
      const rowsToDisplay = 5;
      const tableStyleProps = {
        height: headerHeight + rowsToDisplay * cellHeight,
        // Uncomment the following line to specify the width and enable horizontal scrollbar
        width: 200,
      };

      // Sync the scroll position of the table header and table body for horizontal scrolling
      const tableHeaderStyleProps = {
        overflow: 'hidden',
      };

      return (
        <Table
          layout="flexbox"
          variant="default"
          {...tableStyleProps}
        >
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
          <TableScrollbar
            data-testid="scrollbar"
            height="100%"
            overflow="visible" // Make the scrollbar visible
            onScroll={onScrollTableBody} // To sync the scroll position of the table header and table body for horizontal scrolling
          >
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {row.cells.map((cell, cellIndex) => {
                    const styleProps = {
                      flex: 'none',
                      width: cell.column.size,
                      ...cell.column.style,
                    };
                    const renderCell = (cell) => {
                      if (typeof cell.column.cell === 'function') {
                        return cell.column.cell(row.row);
                      }
                      return (
                        <Truncate>
                          {cell.row[cell.column.accessorKey]}
                        </Truncate>
                      );
                    };

                    return (
                      <TableCell key={cell.id} {...styleProps}>
                        {renderCell(cell)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </TableScrollbar>
        </Table>
      );
    };

    const onScroll = jest.fn();

    render(
      <TableComponent
        columns={columns}
        data={data}
        onScroll={onScroll}
      />
    );

    const scrollContainer = screen.getByTestId('scrollbar').firstChild;
    await fireEvent.scroll(scrollContainer, {
      target: {
        scrollTop: 50,
      },
    });
    await fireEvent.scroll(scrollContainer, {
      target: {
        scrollLeft: 50,
      },
    });
    expect(onScroll).toHaveBeenCalledTimes(2);
  });
});
