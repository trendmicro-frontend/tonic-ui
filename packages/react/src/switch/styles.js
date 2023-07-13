import { useColorMode } from '../color-mode';

const useSwitchStyle = ({ disabled }) => {
  return {
    display: 'inline-flex',
    verticalAlign: 'top',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
};

const useSwitchControlBoxStyle = ({
  color,
  width,
  height,
}) => {
  const [colorMode] = useColorMode();
  const trackHaloWidth = 2;
  const trackBorderWidth = 1;
  const viewBoxWidth = width + (trackHaloWidth + trackBorderWidth) * 2;
  const viewBoxHeight = height + (trackHaloWidth + trackBorderWidth) * 2;
  const focusAndCheckedColor = {
    dark: `${color}:60`,
    light: `${color}:40`,
  }[colorMode];
  const checkedAndHoverColor = {
    dark: `${color}:50`,
    light: `${color}:30`,
  }[colorMode];
  const trackBorderColor = {
    dark: 'black',
    light: 'white',
  }[colorMode];

  return {
    width: viewBoxWidth,
    height: viewBoxHeight,
    _child: {
      opacity: 1,
    },
    _hover: {
      '[data-switch] [data-switch-track]': {
        fill: 'gray:50',
      },
    },
    _focus: {
      '[data-switch] [data-switch-track-halo]': {
        fill: focusAndCheckedColor,
      },
      '[data-switch] [data-switch-track-border]': {
        fill: trackBorderColor,
      }
    },
    _checked: {
      '[data-switch] [data-switch-track]': {
        fill: focusAndCheckedColor,
      },
      '[data-switch] [data-switch-thumb]': {
        transform: `translateX(${height}px)`,
      },
    },
    _checkedAndHover: {
      '[data-switch] [data-switch-track]': {
        fill: checkedAndHoverColor,
      },
    },
    _disabled: {
      opacity: 0.28,
    }
  };
};

export {
  useSwitchStyle,
  useSwitchControlBoxStyle,
};
