import { addOpacity } from '../theme/colors-utils';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const interactionProps = ({ color, colorMode, theme: { colors } }) => {
  let styles = {};
  if (color) {
    const _color = colors[color] || color;
    styles = {
      light: {
        color: addOpacity(_color, 0.54),
        _hover: {
          color: addOpacity(_color, 1),
        },
        _active: {
          color: addOpacity(_color, 0.54),
        },
        _disabled: {
          color: addOpacity(_color, 0.28),
          cursor: 'not-allowed',
        },
      },
      dark: {
        color: addOpacity(_color, 0.47),
        _hover: {
          color: addOpacity(_color, 1),
        },
        _active: {
          color: addOpacity(_color, 0.47),
        },
        _disabled: {
          color: addOpacity(_color, 0.3),
          cursor: 'not-allowed',
        },
      },
    };
    return styles[colorMode];
  }

  styles = {
    light: {
      color: 'black:tertiary',
      _hover: {
        color: 'black:emphasis',
      },
      _active: {
        color: 'black:tertiary',
      },
      _disabled: {
        color: 'black:disabled',
        cursor: 'not-allowed',
      },
    },
    dark: {
      color: 'white:tertiary',
      _hover: {
        color: 'white:emphasis',
      },
      _active: {
        color: 'white:tertiary',
      },
      _disabled: {
        color: 'white:disabled',
        cursor: 'not-allowed',
      },
    },
  };

  return styles[colorMode];
};

////////////////////////////////////////////////////////////

const baseProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s',
  flex: '0 0 auto',
  border: 1,
  borderColor: 'transparent',
};

////////////////////////////////////////////////////////////

const useIconButtonStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, colorMode, theme };
  return {
    ...baseProps,
    ...interactionProps(_props),
  };
};

export {
  useIconButtonStyle,
};
