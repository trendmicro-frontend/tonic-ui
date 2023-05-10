import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ButtonBase,
  Icon,
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Truncate,
  useColorMode,
} from '@tonic-ui/react';
import {
  dataAttr,
} from '@tonic-ui/utils';
import React, { useMemo, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableRow = ({
  canDrag: canDragProp,
  canDrop: canDropProp,
  children,
  item: itemProp,
  onDrop: onDropProp,
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
  const [colorMode] = useColorMode();
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const selectedBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

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
              <TableHeaderCell width="10x" />
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
                const styleProps = {
                  opacity: isDragging ? 0.28 : 1,
                  _hover: {
                    backgroundColor: hoverBackgroundColor,
                  },
                  _selected: {
                    backgroundColor: selectedBackgroundColor,
                  },
                };
                return (
                  <TableRow
                    ref={canDrop ? dropRef : undefined}
                    data-selected={dataAttr(isOver)}
                    {...styleProps}
                  >
                    <TableCell width="10x">
                      {canDrag && (
                        <ButtonBase ref={dragRef} cursor="move">
                          <Icon ref={dragPreviewRef} icon="menu" />
                        </ButtonBase>
                      )}
                    </TableCell>
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
