import useColorMode from '../useColorMode';

const useContainerStyle = ({
  autoHeight,
  minHeight,
  maxHeight,
}) => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  ...(autoHeight && {
    height: 'auto',
    minHeight,
    maxHeight,
  }),
});

const useScrollViewStyle = ({
  autoHeight,
  minHeight,
  maxHeight,
  disabled,
  overflowX,
  overflowY,
}) => {
  const style = {
    overflowX: (disabled || overflowX === 'hidden') ? 'hidden' : 'scroll',
    overflowY: (disabled || overflowY === 'hidden') ? 'hidden' : 'scroll',
    WebkitOverflowScrolling: 'touch',
  };

  if (autoHeight) {
    return {
      ...style,
      position: 'relative',
      minHeight,
      maxHeight,
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
  horizontalScrollbarVisibility,
}) => {
  const autoHide = horizontalScrollbarVisibility === 'auto';
  const alwaysHide = horizontalScrollbarVisibility === 'hidden';

  return {
    position: 'absolute',
    height: '2x',
    right: 0,
    bottom: 0,
    left: 0,
    visibility: 'hidden',
    ...(autoHide && {
      transition: 'opacity 200ms',
      opacity: 0,
    }),
    ...(alwaysHide && {
      display: 'none',
    }),
  };
};

const useVerticalTrackStyle = ({
  verticalScrollbarVisibility,
}) => {
  const autoHide = verticalScrollbarVisibility === 'auto';
  const alwaysHide = verticalScrollbarVisibility === 'hidden';

  return {
    position: 'absolute',
    width: '2x',
    right: 0,
    bottom: 0,
    top: 0,
    visibility: 'hidden',
    ...(autoHide && {
      transition: 'opacity 200ms',
      opacity: 0,
    }),
    ...(alwaysHide && {
      display: 'none',
    }),
  };
};

const useHorizontalThumbStyle = props => {
  const [colorMode] = useColorMode();
  const bgColor = {
    dark: 'rgba(255, 255, 255, .28)',
    light: 'rgba(255, 255, 255, .30)',
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
    backgroundColor: bgColor,
    _hover: {
      borderColor: hoverBorderColor,
      backgroundColor: hoverBgColor,
    },
  };
};

const useVerticalThumbStyle = props => {
  const [colorMode] = useColorMode();
  const bgColor = {
    dark: 'rgba(255, 255, 255, .28)',
    light: 'rgba(255, 255, 255, .30)',
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
    backgroundColor: bgColor,
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
