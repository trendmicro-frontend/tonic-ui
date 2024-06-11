import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Box,
  Checkbox,
  Flex,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Truncate,
  useColorStyle,
} from '@tonic-ui/react';
import { dataAttr, isNullish } from '@tonic-ui/utils';
import React, { Fragment, forwardRef, useCallback, useMemo, useState } from 'react';
import HandleIcon from './icons/icon-handle';

const DragHandle = forwardRef((
  {
    sx,
    ...rest
  },
  ref,
) => {
  return (
    <Flex
      sx={[
        {
          '[role="row"]:hover > [role="cell"] &': {
            opacity: 1,
          },
          opacity: 0,
          cursor: 'move',
          px: '1x',
          width: '4x',
          position: 'absolute',
          left: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
});
DragHandle.displayName = 'DragHandle';

const SortableItem = ({ children, id }) => {
  const { attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition } = useSortable({ id });
  return children({ attributes, isDragging, listeners, setActivatorNodeRef, setNodeRef, transform, transition });
};

const SortableOverlay = ({ children }) => {
  const dropAnimationConfig = useMemo(() => ({
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  }), []);

  return (
    <DragOverlay dropAnimation={dropAnimationConfig}>
      {children}
    </DragOverlay>
  );
};

const App = () => {
  const [colorStyle] = useColorStyle();
  const [data, setData] = useState([
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(() => [
    {
      id: 'selection',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      minSize: 48,
      size: 48,
      style: {
        px: '4x',
      },
    },
    {
      accessorKey: 'eventType',
      header: () => (
        <Truncate>
          Event Type
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 240,
    },
    {
      accessorKey: 'affectedDevices',
      header: () => (
        <Truncate>
          Affected Devices
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
      size: 150,
      style: {
        textAlign: 'right',
      },
    },
    {
      accessorKey: 'detections',
      header: () => (
        <Truncate>
          Detections
        </Truncate>
      ),
      cell: ({ getValue }) => (
        <Truncate>{getValue()}</Truncate>
      ),
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
      minSize: 80,
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true, // enable row selection for all rows
    // enableRowSelection: row => row.original.detections > 0, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow, index) => {
      // Identify individual rows that are originating from any server-side operation
      return originalRow.id;
    },
  });

  const layout = 'flexbox'; // One of: 'flexbox', 'table'
  const selectedRowCount = Object.keys(rowSelection).length;
  const rows = table.getRowModel().rows;

  const [activeId, setActiveId] = useState(null);
  const getRowById = (id) => rows.find(row => row.id === id);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);
  const handleDragEnd = useCallback((event) => {
    const { over, active } = event;
    if (over && (active.id !== over?.id)) {
      const activeIndex = rows.findIndex(({ id }) => id === active.id);
      const overIndex = rows.findIndex(({ id }) => id === over.id);

      // Update the data
      setData(arrayMove(data, activeIndex, overIndex));
    }
    setActiveId(null);
  }, [data, rows]);
  const handleDragCancel = useCallback((event) => {
    setActiveId(null);
  }, []);

  const renderRow = useCallback((row) => {
    if (!row) {
      return null;
    }

    return (
      <SortableItem id={row.id}>
        {({
          attributes,
          isDragging,
          listeners,
          setActivatorNodeRef,
          setNodeRef,
          transform,
          transition,
        }) => {
          const sx = {
            cursor: isDragging ? 'move' : undefined,
            _hover: {
              backgroundColor: isDragging ? 'gray:70' : colorStyle.background.highlighted,
            },
            _selected: {
              backgroundColor: isDragging ? 'gray:70' : colorStyle.background.selected,
            },
            opacity: isDragging ? 0.4 : undefined,
            transform: CSS.Translate.toString(transform),
            transition,
            // Ensure the draggable element appears on top of other elements when dragged
            zIndex: isDragging ? 1 : 0,
          };

          return (
            <TableRow
              ref={setNodeRef}
              data-selected={dataAttr(row.getIsSelected())}
              sx={sx}
            >
              {row.getVisibleCells().map(cell => {
                const styleProps = {
                  minWidth: cell.column.columnDef.minSize,
                  width: cell.column.getSize(),
                  ...cell.column.columnDef.style,
                };

                if (cell.column.id === 'selection') {
                  return (
                    <TableCell
                      key={cell.id}
                      sx={{
                        ...styleProps,
                        position: 'relative',
                      }}
                    >
                      <Flex alignItems="center">
                        <DragHandle
                          ref={setActivatorNodeRef}
                          {...attributes}
                          {...listeners}
                        >
                          <HandleIcon />
                        </DragHandle>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Flex>
                    </TableCell>
                  );
                }

                return (
                  <TableCell
                    key={cell.id}
                    sx={{
                      ...styleProps,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        }}
      </SortableItem>
    );
  }, [colorStyle]);

  return (
    <>
      <Box mb="4x" px="3x">
        <Text>
          {selectedRowCount} selected
        </Text>
      </Box>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={rows}
        >
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
                          flexRender(header.column.columnDef.header, header.getContext())
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map(row => (
                <Fragment key={row.id}>
                  {renderRow(row)}
                </Fragment>
              ))}
              <SortableOverlay>
                {!isNullish(activeId) ? renderRow(getRowById(activeId)) : null}
              </SortableOverlay>
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default App;
