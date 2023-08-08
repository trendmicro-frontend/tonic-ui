import { useColorMode } from '../color-mode';
import { useTheme } from '../theme';

const useResizeHandleStyle = ({ isResizing }) => {
  const { sizes } = useTheme();
  const [colorMode] = useColorMode();
  const translucentBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const highlightedDividerColor = {
    dark: 'gray:50',
    light: 'gray:50',
  }[colorMode];
  const hoverableWidth = sizes['2x'];
  const borderWidth = sizes['1q'];
  const translucentBackgroundWidth = sizes['1x'];

  return {
    backgroundColor: isResizing ? translucentBackgroundColor : 'transparent',
    borderLeft: 1,
    borderLeftColor: isResizing ? highlightedDividerColor : 'transparent',
    boxSizing: 'border-box',
    cursor: 'col-resize',
    touchAction: 'none',
    userSelect: 'none',
    width: isResizing ? `calc(${borderWidth} + ${translucentBackgroundWidth})` : hoverableWidth,
    _hover: {
      borderLeftColor: highlightedDividerColor,
    },
  };
};

export {
  useResizeHandleStyle,
};
