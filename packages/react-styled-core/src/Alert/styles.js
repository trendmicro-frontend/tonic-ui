import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  pl: 16,
  pr: 16,
  pt: 10,
  pb: 10,
  color: 'black:emphasis',
  fontSize: 'sm',
};

const styleProps = ({ color, theme: { colors } }) => {
  return {
    light: {
      bg: colors[color],
    },
    dark: {
      bg: colors[color]
    },
  };
};

const useAlertStyle = props => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const _props = { ...props, theme };

  return {
    ...baseProps,
    ...styleProps(_props)[colorMode],
  };
};

export default useAlertStyle;
