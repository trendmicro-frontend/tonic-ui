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

const useVerticalTrackStyle = ({
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

const useHorizontalThumbStyle = props => {
  return {
    ...thumbStyle,
  };
};

const useVerticalThumbStyle = props => {
  return {
    display: 'block',
    ...thumbStyle,
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
