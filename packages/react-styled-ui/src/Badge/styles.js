import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const get = (color, hue) => `${color}:${hue}`;

const badgeStyle = ({ color }) => {
  return {
    light: {
      bg: get(color, 60),
      color: '#fff',
      borderRadius: 16, //12px
      textAlign: 'center',
      lineHeight: '12px',
      px: 5,
      transform: 'translate(50%,-50%)',
      border: '1px solid #151515'
    },
    dark: {
      bg: get(color, 60),
      color: '#fff',
      borderRadius: 16, //12px
      textAlign: 'center',
      lineHeight: '12px',
      px: 5,
      transform: 'translate(50%,-50%)',
      border: '1px solid #151515'
    },
  };
};

const variantProps = props => {
  const { colorMode, hasChildren, showAsDot } = props;
  const hasChildrenProps = hasChildren ? {
    position: 'absolute',
    top: 0,
    right: 0
  } : {
    top: 0
  };
  const showAsDotProps = showAsDot ? {
    p: 0,
    width: 6,
    height: 6,
  } : {
    minWidth: 16
  };
  return {
    ...hasChildrenProps,
    ...badgeStyle(props)[colorMode],
    ...showAsDotProps,
  };
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };

  return variantProps(_props);
};

export default useBadgeStyle;
