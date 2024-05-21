import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Flex,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { ArrowsIcon } from '@tonic-ui/react-icons';
import {
  useMergeRefs,
} from '@tonic-ui/react-hooks';
import {
  dataAttr,
} from '@tonic-ui/utils';
import { ensurePlainObject } from 'ensure-type';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DragLayer from './DragLayer';
import HandleIcon from '../icons/icon-handle';

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

const DraggableItem = ({
  canDrag: canDragProp,
  canDrop: canDropProp,
  children,
  item: itemProp,
  onDrop: onDropProp,
  onHover: onHoverProp,
}) => {
  const dragRef = useRef();
  const dropRef = useRef();

  // https://react-dnd.github.io/react-dnd/docs/api/use-drag
  const [collectedDragProps, _dragRef, _dragPreviewRef] = useDrag({
    type: 'row',
    item: itemProp,
    canDrag: canDragProp,
    collect: (monitor) => {
      // DragSourceMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor
      return {
        isDragging: monitor.isDragging(),
        monitor,
      };
    },
  })

  // https://react-dnd.github.io/react-dnd/docs/api/use-drop
  const [collectedDropProps, _dropRef] = useDrop({
    accept: 'row',
    drop: (item, monitor) => {
      onDropProp?.({ item, monitor, dragRef, dropRef });
    },
    hover: (item, monitor) => {
      onHoverProp?.({ item, monitor, dragRef, dropRef });
    },
    canDrop: canDropProp,
    collect: (monitor) => {
      // DropTargetMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor
      return {
        isOver: monitor.isOver(),
        monitor,
      };
    }
  })

  useEffect(() => {
    _dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, [_dragPreviewRef]);

  const mergedDragRefs = useMergeRefs(_dragRef, dragRef);
  const mergedDropRefs = useMergeRefs(_dropRef, dropRef);

  return children({
    isDragging: collectedDragProps.isDragging,
    isOver: collectedDropProps.isOver,
    dragRef: mergedDragRefs,
    dropRef: mergedDropRefs,
    dragSourceMonitor: collectedDragProps.monitor,
    dropTargetMonitor: collectedDropProps.monitor,
  });
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const initialData = useMemo(() => [
    { id: 1, order: 1, policy: 'Team Managers', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 2, order: 2, policy: 'Marketing Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 3, order: 3, policy: 'Sales Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 4, order: 4, policy: 'Development Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 5, order: 5, policy: 'IT Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 6, order: null, policy: 'Server policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
    { id: 7, order: null, policy: 'Endpoint policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
  ], []);
  const [items, setItems] = useState(initialData);
  const columns = useMemo(() => [
    {
      id: 'order',
      header: 'Order',
      accessorKey: 'order',
      cell: ({ getValue }) => {
        const order = getValue();
        return order ?? '-';
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
    data: items,
    columns,
    defaultColumn: {
      minSize: 40,
    },
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id, //good to have guaranteed unique row ids/keys for rendering
  });

  const moveItem = useCallback((dragItemId, hoverItemId) => {
    const dragItemIndex = items.findIndex(item => item.id === dragItemId);
    const hoverItemIndex = items.findIndex(item => item.id === hoverItemId);
    const dragItem = items[dragItemIndex];
    let newItems = items;
    // Swap two items
    newItems = update(newItems, {
      $splice: [
        [dragItemIndex, 1],
        [hoverItemIndex, 0, dragItem],
      ],
    });
    // Update the order
    newItems = update(newItems, {
      $apply: items => items.map((item, index) => {
        if (item.order > 0) {
          return {
            ...item,
            order: index + 1,
          };
        }
        return item;
      }),
    });
    setItems(newItems);
  }, [items]);

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <DndProvider backend={HTML5Backend}>
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

                if (header.id === 'order') {
                  styleProps.pl = '4x';
                }

                return (
                  <TableCell
                    key={header.id}
                    sx={styleProps}
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
          <DragLayer>
            {({ item: row }) => {
              // Drag layer is not rendered when nothing is being dragged
              const policy = row?.original?.policy;
              return (
                <Flex alignItems="center" columnGap="1x">
                  <ArrowsIcon />
                  {policy}
                </Flex>
              );
            }}
          </DragLayer>
          {table.getRowModel().rows.map((row, index) => (
            <DraggableItem
              key={row.id}
              item={() => row}
              onHover={({ item, monitor, dropRef }) => {
                const dragItemId = monitor.getItem().original.id;
                const dragItemOrder = monitor.getItem().original.order;
                const hoverItemId = row.original.id;
                const hoverItemOrder = row.original.order;

                if (dragItemId === hoverItemId) {
                  return;
                }

                const hoverBoundingRect = ensurePlainObject(dropRef.current?.getBoundingClientRect());
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                if (dragItemOrder < hoverItemOrder && hoverClientY < hoverMiddleY) {
                  return;
                }
                if (dragItemOrder > hoverItemOrder && hoverClientY > hoverMiddleY) {
                  return;
                }

                moveItem(dragItemId, hoverItemId);
              }}
            >
              {({
                dragRef,
                dropRef,
                dragSourceMonitor,
                dropTargetMonitor,
                isDragging,
                isOver,
              }) => {
                const canDrag = row.original.order > 0;
                const canDrop = row.original.order > 0;
                return (
                  <TableRow
                    ref={(node) => {
                      if (canDrop) {
                        assignRef(dropRef, node);
                      }
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

                      if (cell.column.id === 'order') {
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
            </DraggableItem>
          ))}
        </TableBody>
      </Table>
    </DndProvider>
  );
};

export default App;
