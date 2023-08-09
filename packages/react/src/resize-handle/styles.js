import { useColorMode } from '../color-mode';

const useResizeHandleStyle = ({ isResizing }) => {
  const [colorMode] = useColorMode();
  const translucentBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
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
