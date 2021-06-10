import useColorMode from '../useColorMode';

const styledScrollbarWidth = '8px';

const useContainerStyle = props => ({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  ...(props.autoHeight && {
    height: 'auto',
    minHeight: props.autoHeightMin,
    maxHeight: props.autoHeightMax
  }),
  ...props.style,
});

const useViewStyle = props => {
  const { scrollbarWidth, autoHeight, autoHeightMin, autoHeightMax } = props;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
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
      minHeight: typeof autoHeightMin === 'string' ? `calc(${autoHeightMin} + ${scrollbarWidth}px)` : autoHeightMin + scrollbarWidth,
      maxHeight: typeof autoHeightMax === 'string' ? `calc(${autoHeightMax} + ${scrollbarWidth}px)` : autoHeightMax + scrollbarWidth
    }),
  };
};

const useTrackAutoHeightStyle = props => ({
  transition: `opacity ${props.autoHideDuration}ms`,
  opacity: 0,
});

const useTrackHorizontalStyle = props => {
  const [colorMode] = useColorMode();
  const bgColor = {
    dark: 'gray:70',
    light: 'gray:70',
  }[colorMode];
  const { autoHide, scrollbarWidth, autoHideDuration } = props;
  const trackAutoHeightStyle = useTrackAutoHeightStyle({ autoHideDuration });
  return {
    position: 'absolute',
    height: styledScrollbarWidth,
    right: 0,
    bottom: 0,
    left: 0,
    bg: bgColor,
    ...(autoHide && trackAutoHeightStyle),
    ...(!scrollbarWidth && { display: 'none' }),
  };
};

const useTrackVerticalStyle = props => {
  const [colorMode] = useColorMode();
  const bgColor = {
    dark: 'gray:70',
    light: 'gray:70',
  }[colorMode];
  const { autoHide, scrollbarWidth, autoHideDuration } = props;
  const trackAutoHeightStyle = useTrackAutoHeightStyle({ autoHideDuration });
  return {
    position: 'absolute',
    width: styledScrollbarWidth,
    right: 0,
    bottom: 0,
    top: 0,
    bg: bgColor,
    ...(autoHide && trackAutoHeightStyle),
    ...(!scrollbarWidth && { display: 'none' }),
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
  useTrackAutoHeightStyle,
  useTrackHorizontalStyle,
  useTrackVerticalStyle,
  useThumbHorizontalStyle,
  useThumbVerticalStyle,
};
