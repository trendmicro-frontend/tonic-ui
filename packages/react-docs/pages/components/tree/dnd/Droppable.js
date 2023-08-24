import { useDrop } from 'react-dnd';

const Droppable = ({
  accept: acceptProp = 'dnd',
  canDrop: canDropProp,
  children,
  onDrop: onDropProp,
}) => {
  const [collectedProps, dropRef] = useDrop({
    accept: acceptProp,
    drop: onDropProp,
    canDrop: canDropProp,
    collect: (monitor) => {
      // DropTargetMonitor
      // https://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor
      return {
        isOver: monitor.isOver(),
      };
    },
  });

  return children({
    dropRef,
    isOver: collectedProps.isOver,
  });
};

export default Droppable;
