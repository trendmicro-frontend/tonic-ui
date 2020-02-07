import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const get = (color, hue) => `${color}.${hue}`;

const badgeStyle = ({ color }) => {
  return {
    light: {
      bg: get(color, 60),
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
    dark: {
      bg: get(color, 60),
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
  };
};

const variantProps = props => {
  const { colorMode } = props;
  return badgeStyle(props)[colorMode];
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };

  return variantProps(_props);
};

export default useBadgeStyle;
