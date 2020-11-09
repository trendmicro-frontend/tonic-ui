import { ensureArray } from 'ensure-type';
import _get from 'lodash.get';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const get = (color, hue) => `${color}:${hue}`;

const badgeStyle = ({ color, borderColor, borderWidth, theme: { colors, lineHeights } }) => {
  const xsLineHeight = _get(lineHeights, 'xs');
  return {
    light: {
      bg: colors[get(color, 60)] ? get(color, 60) : get(color, 50),
      color: '#fff',
      textAlign: 'center',
      lineHeight: `calc(${xsLineHeight} - 2px)`, // 18px - 2px
      px: 4,
      fontSize: 'xs'
    },
    dark: {
      bg: colors[get(color, 60)] ? get(color, 60) : get(color, 50),
      color: '#fff',
      textAlign: 'center',
      lineHeight: `calc(${xsLineHeight} - 2px)`, // 18px - 2px
      px: 4,
      fontSize: 'xs'
    },
  };
};

const variantProps = props => {
  const {
    colorMode,
    hasChildren,
    showAsDot,
    dotSize,
    offset,
    borderColor,
    borderWidth,
    theme: { colors }
  } = props;
  const hasChildrenProps = hasChildren ? {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(50%, -50%)',
    border: `${borderWidth}px solid ${colors[borderColor] || borderColor}`,
    borderRadius: 18,
    minWidth: 18,
  } : {
    top: 0,
    display: 'block',
    transform: 'none',
    borderRadius: 16,
    minWidth: 16
  };
  const showAsDotProps = showAsDot ? {
    p: 0,
    width: dotSize,
    height: dotSize,
    minWidth: 0
  } : {};
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
