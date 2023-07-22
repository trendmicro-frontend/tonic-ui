import { useColorMode } from '../color-mode';

const useTreeNodeStyle = ({ isExpandable }) => {
  return {
    cursor: isExpandable ? 'pointer' : 'default',
  };
};

const useTreeNodeContentStyle = ({ isExpanded, isFocused, isSelected }) => {
  const [colorMode] = useColorMode();
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  return {
    display: 'flex',
    alignItems: 'center',
    columnGap: '2x',
    py: '2x',
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
  };
};

const useTreeNodeToggleIconStyle = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    display: 'inline-flex',
    color,
    _disabled: {
      opacity: '.28',
    },
  };
};

const useTreeViewStyle = () => {
  return {
    outline: 0,
  };
};

export {
  useTreeNodeStyle,
  useTreeNodeContentStyle,
  useTreeNodeToggleIconStyle,
  useTreeViewStyle,
};
