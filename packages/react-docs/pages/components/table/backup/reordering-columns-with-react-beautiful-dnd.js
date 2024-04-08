import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  useColorMode,
  useTheme,
} from '@tonic-ui/react';
import React, { useMemo, useRef, useState } from 'react';
import { useTable, useBlockLayout, useColumnOrder } from 'react-table';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';

// The resetServerContext function should be used when server side rendering (SSR).
// It ensures context state does not persist across multiple renders on the server
// which would result in client/server markup mismatches after multiple requests are rendered on the server.
resetServerContext();

const App = () => {
  const columns = useMemo(() => [
    {
      Header: 'Event Type',
      accessor: 'eventType',
      width: 240,
    },
    {
      Header: 'Affected Devices',
      accessor: 'affectedDevices',
      width: 150,
      customProps: {
        textAlign: 'right',
      },
    },
    {
      Header: 'Detections',
      accessor: 'detections',
      width: 150,
      customProps: {
        textAlign: 'right',
      },
    },
  ], []);

  const data = React.useMemo(() => [
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ], []);

  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const columnPlaceholderProps = {
    'dark': {
      backgroundColor: 'gray:90',
      color: 'gray:50',
    },
    'light': {
      backgroundColor: 'gray:10',
      color: 'gray:30',
    }
  }[colorMode];
  const columnDraggerProps = {
    'dark': {
      backgroundColor: 'gray:80',
      color: 'gray:30',
      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',
      border: `1px solid ${colors['gray:60']}`,
    },
    'light': {
      backgroundColor: 'gray:10',
      color: 'gray:80',
      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
      border: `1px solid ${colors['gray:20']}`,
    }
  }[colorMode];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: {},
    },
    useBlockLayout,
    useColumnOrder,
  );

  const currentColOrder = useRef();
  const [placeholderProps, setPlaceholderProps] = useState({});
  const onDragEnd = (result) => {
    setPlaceholderProps({});

    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };
  const onDragUpdate = (dragUpdateObj, b) => {
    if(!dragUpdateObj.destination){
      return;
    }
    const draggableId = dragUpdateObj.draggableId;
    const destinationIndex = dragUpdateObj.destination.index;

    const queryAttr = "data-rbd-drag-handle-draggable-id";
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, offsetWidth } = draggedDOM;
    const clientX = Array.from(draggedDOM.parentNode.children)
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        return total + curr.clientWidth;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth: offsetWidth,
      clientY: 2,
      clientX: clientX,
      content: draggedDOM.innerHTML,
    });

    const colOrder = [...currentColOrder.current];
    const sIndex = dragUpdateObj.source.index;
    const dIndex = dragUpdateObj.destination && dragUpdateObj.destination.index;
    if (typeof sIndex === "number" && typeof dIndex === "number") {
      colOrder.splice(sIndex, 1);
      colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
      setColumnOrder(colOrder);
    }
  };
  const onDragStart = () => {
    currentColOrder.current = allColumns.map(o => o.id);
  };

  return (
    <Table {...getTableProps()}>
      <TableHeader>
        {headerGroups.map((headerGroup, index) => (
          <DragDropContext
            key={index}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable
              droppableId="droppable-table-header"
              direction="horizontal"
            >
              {(droppableProvided, droppableSnapshot) => {
                return (
                  <TableRow
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, index) => (
                      <Draggable
                        key={column.id}
                        draggableId={column.id}
                        index={index}
                        isDragDisabled={!column.accessor}
                      >
                        {(provided, snapshot) => {
                          const { style: headerStyle, ...columnHeaderProps } = column.getHeaderProps();
                          const columnHeaderStyle = {
                            ...headerStyle,
                            ...provided.draggableProps.style,
                          };
                          return (
                            <TableCell
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              {...columnHeaderProps}
                              {...column.customProps}
                              {...snapshot.isDragging && columnDraggerProps}
                              ref={provided.innerRef}
                              userSelect="none"
                              style={columnHeaderStyle}
                            >
                              {column.render("Header")}
                            </TableCell>
                          );
                        }}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                    <TableCell
                      position="absolute"
                      top={placeholderProps.clientY}
                      left={placeholderProps.clientX}
                      height={placeholderProps.clientHeight}
                      width={placeholderProps.clientWidth}
                      display={placeholderProps.clientWidth ? 'block' : 'none' }
                      {...columnPlaceholderProps}
                    >
                      { placeholderProps.content }
                    </TableCell>
                  </TableRow>
                );
              }}
            </Droppable>
          </DragDropContext>
        ))}
      </TableHeader>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={row.id} {...row.getRowProps()}>
              {
                row.cells.map(cell => {
                  return (
                    <TableCell
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      {...cell.column.customProps}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })
              }
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default App;
