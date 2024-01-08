import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Flex,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import {
  dataAttr,
} from '@tonic-ui/utils';
import React, { useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HandleIcon from './icons/icon-handle';

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

const DraggableRow = ({
  canDrag: canDragProp,
  canDrop: canDropProp,
  children,
  item: itemProp,
  onDrop: onDropProp,
  onHover: onHoverProp,
}) => {
  // https://react-dnd.github.io/react-dnd/docs/api/use-drag
  const [collectedDragProps, dragRef, dragPreviewRef] = useDrag({
    type: 'row',
    item: itemProp,
    canDrag: canDragProp,
    collect: (monitor) => {
      // DragSourceMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor
      return {
        isDragging: monitor.isDragging(),
      };
    },
  })

  // https://react-dnd.github.io/react-dnd/docs/api/use-drop
  const [collectedDropProps, dropRef] = useDrop({
    accept: 'row',
    drop: onDropProp,
    hover: onHoverProp,
    canDrop: canDropProp,
    collect: (monitor) => {
      // DropTargetMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor
      return {
        isOver: monitor.isOver(),
      };
    }
  })

  return children({
    dragRef,
    dragPreviewRef,
    dropRef,
    isDragging: collectedDragProps.isDragging,
    isOver: collectedDropProps.isOver,
  });
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const initialData = useMemo(() => [
    { id: 1, priority: 1, policy: 'Team Managers', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 2, priority: 2, policy: 'Marketing Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 3, priority: 3, policy: 'Sales Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 4, priority: 4, policy: 'Development Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 5, priority: 5, policy: 'IT Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 6, priority: null, policy: 'Server policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
    { id: 7, priority: null, policy: 'Endpoint policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
  ], []);
  const [data, setData] = useState(initialData);
  const columns = useMemo(() => [
    {
      id: 'priority',
      header: 'Priority',
      accessorKey: 'priority',
      cell: ({ getValue }) => {
        const priority = getValue();
        return priority ?? '-';
      },
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
      size: 180,
    },
    {
      id: 'modifiedBy',
      header: 'Last Editor',
      accessorKey: 'modifiedBy',
      size: 150,
    },
  ], []);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 40,
    },
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id, //good to have guaranteed unique row ids/keys for rendering
  });

  const moveRow = (draggedRowIndex, targetRowIndex) => {
    const newData = [...data];
    const [draggedRow] = newData.splice(draggedRowIndex, 1);
    newData.splice(targetRowIndex, 0, draggedRow);
    for (const [index, row] of newData.entries()) {
      if (!row.priority) {
        break;
      }
      row.priority = index + 1;
    }
    setData(newData);
  };

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <DndProvider backend={HTML5Backend}>
      <Table layout={layout}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableHeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const styleProps = {
                  minWidth: header.column.columnDef.minSize,
                  width: header.getSize(),
                  ...header.column.columnDef.style,
                };

                if (header.id === 'priority') {
                  styleProps.pl = '4x';
                }

                return (
                  <TableHeaderCell
                    key={header.id}
                    sx={styleProps}
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
          {table.getRowModel().rows.map((row, index) => (
            <DraggableRow
              key={row.id}
              item={() => row}
              onDrop={(item, monitor) => {
                const draggedRowIndex = item.index;
                const targetRowIndex = row.index;
                moveRow(draggedRowIndex, targetRowIndex);
              }}
            >
              {({
                dragRef,
                dragPreviewRef,
                dropRef,
                isDragging,
                isOver,
              }) => {
                const canDrag = row.original.priority > 0;
                const canDrop = row.original.priority > 0;
                return (
                  <TableRow
                    ref={(node) => {
                      if (canDrop) {
                        assignRef(dropRef, node);
                      }
                      assignRef(dragPreviewRef, node);
                    }}
                    data-selected={dataAttr(isOver)}
                    sx={{
                      _hover: {
                        backgroundColor: isDragging ? 'gray:70' : colorStyle.background.highlighted,
                      },
                      _selected: {
                        backgroundColor: isDragging ? 'gray:70' : colorStyle.background.selected,
                      },
                    }}
                  >
                    {row.getVisibleCells().map(cell => {
                      const styleProps = {
                        minWidth: cell.column.columnDef.minSize,
                        width: cell.column.getSize(),
                        ...cell.column.columnDef.style,
                      };

                      if (cell.column.id === 'priority') {
                        return (
                          <TableCell
                            key={cell.id}
                            sx={{
                              ...styleProps,
                              position: 'relative',
                              pl: '4x',
                            }}
                          >
                            <Flex alignItems="center">
                              {canDrag && (
                                <Flex
                                  ref={dragRef}
                                  sx={{
                                    '[role="row"]:hover > [role="cell"] &': {
                                      opacity: 1,
                                    },
                                    opacity: 0,
                                    cursor: 'move',
                                    px: '1x',
                                    width: '4x',
                                    position: 'absolute',
                                    left: 0,
                                  }}
                                >
                                  <HandleIcon />
                                </Flex>
                              )}
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Flex>
                          </TableCell>
                        );
                      }

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
                );
              }}
            </DraggableRow>
          ))}
        </TableBody>
      </Table>
    </DndProvider>
  );
};

export default App;
