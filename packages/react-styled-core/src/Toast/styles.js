import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  pl: '4x',
  pr: '4x',
  pt: '2x',
  pb: '2x',
  color: 'black:emphasis',
  fontSize: 'sm',
};

const styleToastProps = ({ color, colorLevel, theme: { colors } }) => {
  return {
    light: {
      bg: `${color}:${colorLevel}`,
    },
    dark: {
      bg: 'gray:10',
      borderLeft: `4px solid ${colors[`${color}:${colorLevel}`]}`,
    },
  };
};

const styleToastIconProps = ({ color, colorLevel }) => {
  return {
    light: {
      color: 'black:emphasis',
    },
    dark: {
      color: `${color}:${colorLevel}`,
    },
  };
};

const statusToastProps = props => {
  const status = props.status;

  switch (status) {
  case 'success':
  case 'warning':
    return styleToastProps({ ...props, colorLevel: 50 });
  case 'error':
    return styleToastProps({ ...props, colorLevel: 60 });
  default:
    return {};
  }
};

const statusToastIconProps = props => {
  const status = props.status;

  switch (status) {
  case 'success':
  case 'warning':
    return styleToastIconProps({ ...props, colorLevel: 50 });
  case 'error':
    return styleToastIconProps({ ...props, colorLevel: 60 });
  default:
    return {};
  }
};

const useToastStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, theme };

  return {
    ...baseProps,
    ...statusToastProps(_props)[colorMode],
  };
};

const useToastIconStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, theme };

  return {
    ...statusToastIconProps(_props)[colorMode],
  };
};

export { useToastStyle, useToastIconStyle };
