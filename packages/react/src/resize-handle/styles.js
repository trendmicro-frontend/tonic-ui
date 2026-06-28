const useResizeHandleStyle = ({ isResizing }) => {
  const translucentBackgroundColor = '_overlay.thin';
  const hoverableWidth = '2x';
  const translucentWidth = '1x';

  return {
    backgroundColor: isResizing ? translucentBackgroundColor : 'transparent',
    boxSizing: isResizing ? 'content-box' : 'border-box',
    cursor: 'col-resize',
    touchAction: 'none',
    userSelect: 'none',
    width: isResizing ? translucentWidth : hoverableWidth,
  };
};

export {
  useResizeHandleStyle,
};
