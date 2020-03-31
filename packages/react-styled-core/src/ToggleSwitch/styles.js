import useColorMode from '../useColorMode';

const switchSizes = {
  sm: {
    width: 32,
    height: 16,
    radius: 6,
  },
  md: {
    width: 48,
    height: 24,
    radius: 9,
  },
  lg: {
    width: 64,
    height: 32,
    radius: 12,
  },
};

const baseProps = ({
  variantColor,
  height,
  switchMaxWidth,
  switchMaxHeight,
  colorMode,
}) => {
  const focusAndCheckedColor = {
    dark: `${variantColor}:60`,
    light: `${variantColor}:40`,
  }[colorMode];

  const checkedAndHoverColor = {
    dark: `${variantColor}:50`,
    light: `${variantColor}:30`,
  }[colorMode];

  return {
    width: switchMaxWidth,
    height: switchMaxHeight,
    _child: {
      opacity: 1
    },
    _hover: {
      '[data-toggle-svg] [data-toggle-switch-track]': {
        fill: 'gray:50'
      },
    },
    _focus: {
      '[data-toggle-svg] [data-toggle-switch-track-halo]': {
        fill: focusAndCheckedColor
      },
      '[data-toggle-svg] [data-toggle-switch-track-border]': {
        fill: 'black'
      }
    },
    _checked: {
      '[data-toggle-svg] [data-toggle-switch-track]': {
        fill: focusAndCheckedColor
      },
      '[data-toggle-svg] [data-toggle-switch-thumb]': {
        transform: `translateX(${height}px)`
      },
    },
    _checkedAndHover: {
      '[data-toggle-svg] [data-toggle-switch-track]': {
        fill: checkedAndHoverColor
      },
    },
    _disabled: {
      opacity: 0.28
    }
  };
};

const switchSVGProps = ({
  switchMaxWidth,
  switchMaxHeight,
}) => {
  return {
    width: '100%',
    height: '100%',
    viewBox: `0 0 ${switchMaxWidth} ${switchMaxHeight}`,
  };
};

const switchTrackHaloProps = ({
  switchMaxWidth,
  switchMaxHeight,
}) => {
  return {
    width: switchMaxWidth,
    height: switchMaxHeight,
    rx: `${switchMaxHeight / 2}`,
    fill: 'none',
    strokeWidth: 0,
  };
};

const switchTrackBorderProps = ({
  switchMaxWidth,
  switchMaxHeight,
}) => {
  return {
    width: switchMaxWidth - 4, // The halo of one side track is 2, so the sum of both sides is 4
    height: switchMaxHeight - 4,
    rx: `${(switchMaxHeight - 4) / 2}`,
    fill: 'none',
    strokeWidth: 0,
  };
};

const switchTrackProps = ({
  width,
  height,
  colorMode,
}) => {
  const fillColor = {
    dark: 'gray:60',
    light: 'gray:30',
  }[colorMode];

  return {
    width,
    height,
    rx: `${height / 2}`,
    fill: fillColor,
    pointerEvents: 'all',
  };
};

const switchThumbProps = ({
  radius,
  switchMaxHeight,
}) => {
  return {
    cx: `${switchMaxHeight / 2}`,
    cy: `${switchMaxHeight / 2}`,
    r: radius,
    fill: 'white:emphasis',
    transform: 'translateX(0)',
    transition: 'transform .25s',
    transformBox: 'fill-box',
  };
};


const useToggleSwitchStyle = props => {
  const { colorMode } = useColorMode();
  const { size } = props;
  const width = switchSizes[size] && switchSizes[size].width;
  const height = switchSizes[size] && switchSizes[size].height;
  const radius = switchSizes[size] && switchSizes[size].radius;
  const switchMaxWidth = width + 6; //The border and halo width of the one side switching track is 1 and 2, so the sum of both sides is 6
  const switchMaxHeight = height + 6; // Same as width
  const _props = { ...props, colorMode, width, height, radius, switchMaxWidth, switchMaxHeight };

  return {
    baseProps: baseProps(_props),
    switchSVGProps: switchSVGProps(_props),
    switchTrackHaloProps: switchTrackHaloProps(_props),
    switchTrackBorderProps: switchTrackBorderProps(_props),
    switchTrackProps: switchTrackProps(_props),
    switchThumbProps: switchThumbProps(_props),
  };
};

export default useToggleSwitchStyle;
