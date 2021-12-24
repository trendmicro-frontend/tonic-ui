import { useColorMode } from '../ColorMode';

const useContainerStyle = ({
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
}) => {
  return {
    position: 'relative',
    overflow: 'hidden',
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  };
};

const useScrollViewStyle = ({
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  overflowX,
  overflowY,
}) => {
  const style = {
    overflowX: (overflowX === 'hidden') ? 'hidden' : 'scroll',
    overflowY: (overflowY === 'hidden') ? 'hidden' : 'scroll',
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    WebkitOverflowScrolling: 'touch',
  };

  if (height === 'auto') {
    return {
      ...style,
      position: 'relative',
    };
  }

  return {
    ...style,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
};

const useHorizontalTrackStyle = ({
  overflowX,
}) => {
  return {
    position: 'absolute',
    height: '2x',
    right: 0,
    bottom: 0,
    left: 0,
    visibility: 'hidden',
    ...(overflowX === 'auto' && {
      transition: 'opacity 200ms',
      opacity: 0,
    }),
    ...(overflowX === 'hidden' && {
      display: 'none',
    }),
  };
};

const useVerticalTrackStyle = ({
  overflowY,
}) => {
  return {
    position: 'absolute',
    width: '2x',
    right: 0,
    bottom: 0,
    top: 0,
    visibility: 'hidden',
    ...(overflowY === 'auto' && {
      transition: 'opacity 200ms',
      opacity: 0,
    }),
    ...(overflowY === 'hidden' && {
      display: 'none',
    }),
  };
};

const useHorizontalThumbStyle = props => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const hoverBgColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    position: 'relative',
    height: '100%',
    cursor: 'pointer',
    borderRadius: 'inherit',
    border: 1,
    borderColor: 'transparent',
    backgroundColor,
    _hover: {
      borderColor: hoverBorderColor,
      backgroundColor: hoverBgColor,
    },
  };
};

const useVerticalThumbStyle = props => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const hoverBgColor = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverBorderColor = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    position: 'relative',
    display: 'block',
    width: '100%',
    cursor: 'pointer',
    borderRadius: 'inherit',
    border: 1,
    borderColor: 'transparent',
    backgroundColor,
    _hover: {
      borderColor: hoverBorderColor,
      backgroundColor: hoverBgColor,
    },
  };
};

export {
  useContainerStyle,
  useScrollViewStyle,
  useHorizontalTrackStyle,
  useVerticalTrackStyle,
  useHorizontalThumbStyle,
  useVerticalThumbStyle,
};
