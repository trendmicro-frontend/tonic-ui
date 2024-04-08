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
import {
  dataAttr,
} from '@tonic-ui/utils';
import React, { useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableColumn = ({
  canDrag: canDragProp,
  canDrop: canDropProp,
  children,
  item: itemProp,
  onDrop: onDropProp,
}) => {
  // https://react-dnd.github.io/react-dnd/docs/api/use-drag
  const [collectedDragProps, dragRef, dragPreviewRef] = useDrag({
    type: 'column',
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
    accept: 'column',
    drop: onDropProp,
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
  const data = useMemo(() => [
    { id: 1, priority: 1, policy: 'Team Managers', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 2, priority: 2, policy: 'Marketing Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 3, priority: 3, policy: 'Sales Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 4, priority: 4, policy: 'Development Team', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 5, priority: 5, policy: 'IT Department', modifiedTime: 1625875200000, modifiedBy: 'admin' },
    { id: 6, priority: null, policy: 'Server policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
    { id: 7, priority: null, policy: 'Endpoint policy (Default)', modifiedTime: 1625097600000, modifiedBy: 'admin' },
  ], []);
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

  const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id));

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 40,
    },
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  const moveColumn = (draggedColumnId, targetColumnId) => {
    const newColumnOrder = [...columnOrder];
    newColumnOrder.splice(
      newColumnOrder.indexOf(targetColumnId),
      0,
      newColumnOrder.splice(newColumnOrder.indexOf(draggedColumnId), 1)[0],
    );
    console.log('# columnOrder:', columnOrder, newColumnOrder);
    setColumnOrder(newColumnOrder);
  };

  const layout = 'flexbox'; // One of: 'flexbox', 'table'

  return (
    <DndProvider backend={HTML5Backend}>
      <Table layout={layout}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <DraggableColumn
                    key={header.id}
                    item={() => header}
                    onDrop={(item, monitor) => {
                      const draggedColumnId = item.column.id;
                      const targetColumnId = header.column.id;
                      moveColumn(draggedColumnId, targetColumnId);
                    }}
                  >
                    {({
                      dragRef,
                      dragPreviewRef,
                      dropRef,
                      isDragging,
                      isOver,
                    }) => {
                      const styleProps = {
                        opacity: isDragging ? 0.28 : 1,
                        minWidth: header.column.columnDef.minSize,
                        width: header.getSize(),
                        _selected: {
                          backgroundColor: colorStyle.background.selected,
                        },
                        ...header.column.columnDef.style,
                      };
                      const canDrag = header.column.columnDef.id !== 'priority';
                      const canDrop = header.column.columnDef.id !== 'priority';
                      return (
                        <TableCell
                          ref={canDrop ? dropRef : undefined}
                          data-selected={dataAttr(isOver)}
                          sx={{
                            ...styleProps,
                          }}
                        >
                          <Flex
                            ref={canDrag ? dragRef : undefined}
                            sx={{
                              alignItems: 'center',
                              color: '2x',
                              cursor: canDrag ? 'move' : 'default',
                            }}
                          >
                            {header.isPlaceholder ? null : (
                              <Truncate ref={dragPreviewRef}>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </Truncate>
                            )}
                          </Flex>
                        </TableCell>
                      );
                    }}
                  </DraggableColumn>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
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
                    sx={{
                      ...styleProps,
                    }}
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
    </DndProvider>
  );
};

export default App;
