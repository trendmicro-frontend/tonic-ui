import useColorMode from '../useColorMode';

const styledScrollbarWidth = '8px';

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
    minHeight: minHeight,
    maxHeight: maxHeight,
  }),
});

const useViewStyle = ({
  scrollbarWidth,
  autoHeight,
  minHeight,
  maxHeight,
  disabled,
  overflowX,
  overflowY,
}) => {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowX: (disabled || overflowX === 'hidden') ? 'hidden' : 'scroll',
    overflowY: (disabled || overflowY === 'hidden') ? 'hidden' : 'scroll',
    WebkitOverflowScrolling: 'touch',
    // Hide scrollbars by setting a negative margin
    marginRight: scrollbarWidth ? -scrollbarWidth : 0,
    marginBottom: scrollbarWidth ? -scrollbarWidth : 0,
    ...(autoHeight && {
      position: 'relative',
      top: undefined,
      left: undefined,
      right: undefined,
      bottom: undefined,
      // Add scrollbarWidth to autoHeight in order to compensate negative margins
      minHeight: typeof minHeight === 'string' ? `calc(${minHeight} + ${scrollbarWidth}px)` : minHeight + scrollbarWidth,
      maxHeight: typeof maxHeight === 'string' ? `calc(${maxHeight} + ${scrollbarWidth}px)` : maxHeight + scrollbarWidth,
    }),
  };
};

const useTrackHorizontalStyle = ({
  scrollbarWidth,
  horizontalScrollbarVisibility,
}) => {
  const autoHide = horizontalScrollbarVisibility === 'auto';
  const alwaysHide = !scrollbarWidth || horizontalScrollbarVisibility === 'hidden';

  return {
    position: 'absolute',
    height: styledScrollbarWidth,
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

const useTrackVerticalStyle = ({
  scrollbarWidth,
  verticalScrollbarVisibility,
}) => {
  const autoHide = verticalScrollbarVisibility === 'auto';
  const alwaysHide = !scrollbarWidth || verticalScrollbarVisibility === 'hidden';

  return {
    position: 'absolute',
    width: styledScrollbarWidth,
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

const useThumbHorizontalStyle = props => {
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

const useThumbVerticalStyle = props => {
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
  useViewStyle,
  useTrackHorizontalStyle,
  useTrackVerticalStyle,
  useThumbHorizontalStyle,
  useThumbVerticalStyle,
};
