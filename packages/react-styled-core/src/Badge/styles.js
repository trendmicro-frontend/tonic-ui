import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const grayStyle = ({ colorMode }) => {
  const style = {
    light: {
      bg: 'gray.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
    dark: {
      bg: 'gray.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
  };
  return style[colorMode];
};

const redStyle = ({ colorMode }) => {
  const style = {
    light: {
      bg: 'red.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
    dark: {
      bg: 'red.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
  };
  return style[colorMode];
};

const greenStyle = ({ colorMode }) => {
  const style = {
    light: {
      bg: 'green.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
    dark: {
      bg: 'green.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
  };
  return style[colorMode];
};

const blueStyle = ({ colorMode }) => {
  const style = {
    light: {
      bg: 'blue.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
    dark: {
      bg: 'blue.60',
      color: '#fff',
      borderRadius: '0.75rem', //12px
      minWidth: '1.125rem', //18px
      height: '1.125rem',
      textAlign: 'center',
      lineHeight: '1.125rem',
    },
  };
  return style[colorMode];
};

const variantProps = props => {
  const { variant, colorMode } = props;
  switch (variant) {
    case 'gray':
      return grayStyle(props);
    case 'red':
      return redStyle(props);
    case 'green':
      return greenStyle(props);
    case 'blue':
      return blueStyle(props);
    default:
      return {};
  }
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };

  return variantProps(_props);
};

export default useBadgeStyle;
