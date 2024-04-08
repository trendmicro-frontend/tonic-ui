import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
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
import React, { useCallback, useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

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

const SortableItem = ({ children, id }) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({ id });
  return children({ attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition });
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
    priority: true,
    policy: true,
    modifiedTime: true,
    modifiedBy: true,
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
      minSize: 40,
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

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

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

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id);
        const newIndex = columnOrder.indexOf(over.id);
        return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
      })
    }
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
                <TableRow key={headerGroup.id}>
                  <SortableContext
                    items={orderedColumns}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map(header => (
                      <SortableItem
                        key={header.id}
                        id={header.column.id}
                      >
                        {({ isDragging, setActivatorNodeRef, setNodeRef, attributes, listeners, transform, transition }) => {
                          const isPinned = header.column.columnDef.isPinned;
                          const sx = [
                            {
                              position: 'relative',
                              minWidth: header.column.columnDef.minSize,
                              width: header.getSize(),
                              ...header.column.columnDef.style,
                            },
                            !isPinned && {
                              cursor: isDragging ? 'move' : undefined,
                              opacity: isDragging ? 0.4 : undefined,
                              transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
                              transition,
                              // Ensure the draggable element appears on top of other elements when dragged
                              zIndex: isDragging ? 1 : 0,
                            },
                          ];
                          
                          return (
                            <TableCell
                              ref={setNodeRef}
                              sx={sx}
                              {...(!isPinned ? attributes : undefined)}
                              {...(!isPinned ? listeners : undefined)}
                            >
                              {header.isPlaceholder ? null : (
                                <Truncate>
                                  {flexRender(header.column.columnDef.header, header.getContext())}
                                </Truncate>
                              )}
                            </TableCell>
                          );
                        }}
                      </SortableItem>
                    ))}
                  </SortableContext>
                </TableRow>
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
                  <SortableContext
                    items={orderedColumns}
                    strategy={horizontalListSortingStrategy}
                  >
                    {row.getVisibleCells().map(cell => (
                      <SortableItem
                        key={cell.id}
                        id={cell.column.id}
                      >
                        {({ isDragging, setNodeRef, transform, transition }) => {
                          const isPinned = cell.column.columnDef.isPinned;
                          const styleProps = {
                            position: 'relative',
                            minWidth: cell.column.columnDef.minSize,
                            width: cell.column.getSize(),
                            ...cell.column.columnDef.style,
                          };
                          let other = {};
                          if (!isPinned) {
                            other = {
                              opacity: isDragging ? 0.4 : undefined,
                              transform: CSS.Translate.toString(transform),
                              transition,
                              zIndex: isDragging ? 1 : 0,
                            };
                          }
                          return (
                            <TableCell
                              ref={setNodeRef}
                              {...styleProps}
                              {...other}
                            >
                              <Truncate>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </Truncate>
                            </TableCell>
                          );
                        }}
                      </SortableItem>
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </AutoSizer>
    </DndContext>
  );
};

export default App;
