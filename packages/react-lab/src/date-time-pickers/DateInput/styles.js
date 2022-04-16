import {
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

const useDateInputWrapperStyle = () => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
  };
};

const useDateInputIconWrapperStyle = () => {
  return {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    px: '3x',
    zIndex: 3, // The z-index value should be at least 3 for the prepeneded input adornment
  };
};

const useDateInputIconStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  return {
    color: colorStyle.color.secondary,
  };
};

const useDateInputStyle = () => {
  return {
    pl: '10x',
  };
};

export {
  useDateInputWrapperStyle,
  useDateInputIconWrapperStyle,
  useDateInputIconStyle,
  useDateInputStyle,
};
