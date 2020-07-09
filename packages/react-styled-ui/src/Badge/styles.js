import _get from 'lodash/get';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';
import { ensureArray } from '../utils/ensure-type';

const get = (color, hue) => `${color}:${hue}`;

const badgeStyle = ({ color, theme: { colors, lineHeights } }) => {
  const xsLineHeight = _get(lineHeights, 'xs');
  return {
    light: {
      bg: colors[get(color, 60)] ? get(color, 60) : get(color, 50),
      color: '#fff',
      borderRadius: 18, //12px
      textAlign: 'center',
      lineHeight: `calc(${xsLineHeight} - 2px)`, // 18px - 2px
      px: 4,
      transform: 'translate(50%,-50%)',
      fontSize: 'xs',
      border: `1px solid ${colors['gray:100']}`
    },
    dark: {
      bg: colors[get(color, 60)] ? get(color, 60) : get(color, 50),
      color: '#fff',
      borderRadius: 18, //12px
      textAlign: 'center',
      lineHeight: `calc(${xsLineHeight} - 2px)`, // 18px - 2px
      px: 4,
      transform: 'translate(50%,-50%)',
      fontSize: 'xs',
      border: `1px solid ${colors['gray:100']}`
    },
  };
};

const variantProps = props => {
  const { colorMode, hasChildren, showAsDot, dotSize, offset } = props;
  const hasChildrenProps = hasChildren ? {
    position: 'absolute',
    top: 0,
    right: 0
  } : {
    top: 0
  };
  const showAsDotProps = showAsDot ? {
    p: 0,
    width: dotSize,
    height: dotSize,
  } : {
    minWidth: 18
  };
  const offsetArray = ensureArray(offset);
  const offsetProps = offsetArray.length === 2 ? {
    right: offsetArray[0],
    mt: offsetArray[1]
  } : {};
  return {
    ...hasChildrenProps,
    ...badgeStyle(props)[colorMode],
    ...showAsDotProps,
    ...offsetProps
  };
};

const useBadgeStyle = props => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = { ...props, theme, colorMode };

  return variantProps(_props);
};

export default useBadgeStyle;
