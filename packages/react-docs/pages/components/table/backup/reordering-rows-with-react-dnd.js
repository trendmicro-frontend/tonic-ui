import {
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  useColorMode,
} from '@tonic-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrop, useDrag, useDragLayer } from 'react-dnd';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';
import immutableUpdate from 'immutability-helper';

const ItemTypes = {
  TR: 'tr',
};

const TR = ({ id, row, index, moveTr, ...otherProps }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.TR,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current ? ref.current.getBoundingClientRect() : {};
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveTr(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.TR,
    item: { id, index, row },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <TableRow
      {...otherProps}
      ref={ref}
      style={{
        cursor: 'move',
        opacity: isDragging ? 0 : 1,
      }}
    >
      <TableCell width="240px">{row.eventType}</TableCell>
      <TableCell width="140px" textAlign="right">{row.affectedDevices}</TableCell>
      <TableCell width="136px" textAlign="right">{row.detections}</TableCell>
    </TableRow>
  );
};

const CustomDragLayer = (props) => {
  const { itemType, isDragging, item, initialOffset, currentOffset, } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
  };

  const getItemStyles = (initialOffset, currentOffset) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      };
    }
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  };

  if (!isDragging) {
    return null;
  }

  if (itemType === ItemTypes.TR) {
    const row = item.row;
     return (
       <Box style={layerStyles}>
        <Box style={getItemStyles(initialOffset, currentOffset)}>
          <TableRow {...props}>
            <TableCell width="240px">{row.eventType}</TableCell>
            <TableCell width="140px" textAlign="right">{row.affectedDevices}</TableCell>
            <TableCell width="136px" textAlign="right">{row.detections}</TableCell>
          </TableRow>
        </Box>
      </Box>
    );
  }

  return null;
};

const App = () => {
  const [items, setItems] = useState([
    { id: 1, eventType: 'Virus/Malware', affectedDevices: 20, detections: 634 },
    { id: 2, eventType: 'Spyware/Grayware', affectedDevices: 20, detections: 634 },
    { id: 3, eventType: 'URL Filtering', affectedDevices: 15, detections: 598 },
    { id: 4, eventType: 'Web Reputation', affectedDevices: 15, detections: 598 },
    { id: 5, eventType: 'Network Virus', affectedDevices: 15, detections: 497 },
    { id: 6, eventType: 'Application Control', affectedDevices: 0, detections: 0 }
  ]);
  const moveTr = useCallback((dragIndex, hoverIndex) => {
    const dragCard = items[dragIndex];
    setItems(immutableUpdate(items, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragCard],
      ],
    }));
  }, [items]);
  const { colorMode } = useColorMode();
  const tableProps = {
    'dark': {
      backgroundColor: 'gray:80',
    },
    'light': {
      backgroundColor: 'gray:10',
    }
  }[colorMode];
  const rowProps = {
    'dark': {
      backgroundColor: 'gray:100',
    },
    'light': {
      backgroundColor: 'white',
    },
  }[colorMode];

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
       {...tableProps}
      >
        <TableHeader>
          <TableRow
             {...rowProps}
          >
            <TableCell width="240px">Event Type</TableCell>
            <TableCell width="140px" textAlign="right">Affected Devices</TableCell>
            <TableCell width="136px" textAlign="right">Detections</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            items.map((item, i) => (
              <TR {...rowProps} key={item.id} index={i} id={item.id} row={item} moveTr={moveTr}/>
            ))
          }
          <CustomDragLayer {...rowProps} />
        </TableBody>
      </Table>
    </DndProvider>
  );
};

export default App;
