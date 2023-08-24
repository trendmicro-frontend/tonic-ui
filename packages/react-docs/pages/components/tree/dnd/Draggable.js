import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend'

const Draggable = ({
  canDrag: canDragProp,
  children,
  item: itemProp,
  type: typeProp = 'dnd',
}) => {
  const [collectedProps, dragRef, dragPreviewRef] = useDrag({
    type: typeProp,
    item: itemProp,
    canDrag: canDragProp,
    collect: (monitor) => {
      // DragSourceMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreviewRef]);

  return children({
    dragRef,
    isDragging: collectedProps.isDragging,
  });
};

export default Draggable;
