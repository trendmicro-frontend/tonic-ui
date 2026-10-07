import { createTransitionStyle } from '@tonic-ui/utils';

const trackStyle = {
  position: 'absolute',
  visibility: 'hidden',
  right: 0,
  bottom: 0,
  _hover: {
    backgroundColor: '_component.scrollbar.track.hovered',
  },
  _active: {
    backgroundColor: '_component.scrollbar.track.active',
  },
};

const thumbStyle = {
  position: 'relative',
  height: '100%',
  cursor: 'pointer',
  backgroundColor: '_component.scrollbar.thumb.enabled',
  _hover: {
    backgroundColor: '_component.scrollbar.thumb.hovered',
  },
  _active: {
    backgroundColor: '_component.scrollbar.thumb.active',
  },
};

const useScrollbarRootStyle = ({
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

const useScrollbarScrollViewStyle = ({
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  overflowX,
  overflowY,
}) => {
  const baseStyle = {
    // Hide the browser scrollbar
    '&::-webkit-scrollbar': { // Chrome, Safari and Opera
      display: 'none',
    },
    msOverflowStyle: 'none', // IE and Edge
    scrollbarWidth: 'none', // Firefox
  };
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
      ...baseStyle,
      ...style,
      position: 'relative',
    };
  }

  return {
    ...baseStyle,
    ...style,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
};

const useScrollbarHorizontalTrackStyle = ({
  overflowX,
}) => {
  return {
    height: '2x',
    left: 0,
    ...(overflowX === 'auto' && {
      opacity: 0,
      transition: createTransitionStyle('opacity', { duration: 200 }),
    }),
    ...(overflowX === 'hidden' && {
      display: 'none',
    }),
    ...trackStyle,
  };
};

const useScrollbarVerticalTrackStyle = ({
  overflowY,
}) => {
  return {
    width: '2x',
    top: 0,
    ...(overflowY === 'auto' && {
      opacity: 0,
      transition: createTransitionStyle('opacity', { duration: 200 }),
    }),
    ...(overflowY === 'hidden' && {
      display: 'none',
    }),
    ...trackStyle,
  };
};

const useScrollbarHorizontalThumbStyle = props => {
  return {
    ...thumbStyle,
  };
};

const useScrollbarVerticalThumbStyle = props => {
  return {
    display: 'block',
    ...thumbStyle,
  };
};

export {
  useScrollbarRootStyle,
  useScrollbarScrollViewStyle,
  useScrollbarHorizontalTrackStyle,
  useScrollbarVerticalTrackStyle,
  useScrollbarHorizontalThumbStyle,
  useScrollbarVerticalThumbStyle,
};
