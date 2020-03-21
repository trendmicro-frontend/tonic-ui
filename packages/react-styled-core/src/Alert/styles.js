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
