import {
  Box,
} from '@tonic-ui/react';
import { ensureFiniteNumber } from 'ensure-type';
import React from 'react';
import { useDragLayer } from 'react-dnd';

const DragLayer = ({
  children,
}) => {
  const context = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
  }));

  const { isDragging, initialSourceClientOffset, sourceClientOffset } = context;

  if (!isDragging || !initialSourceClientOffset || !sourceClientOffset) {
    return null;
  }

  const offsetX = ensureFiniteNumber(sourceClientOffset?.x);
  const offsetY = ensureFiniteNumber(sourceClientOffset?.y);

  return (
    <Box
      sx={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 'fixed',
      }}
    >
      <Box
        style={{
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
      >
        {typeof children === 'function' ? children(context) : children}
      </Box>
    </Box>
  );
};

export default DragLayer;
