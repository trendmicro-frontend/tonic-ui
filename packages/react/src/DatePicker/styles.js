import useColorStyle from '../useColorStyle';
import useColorMode from '../useColorMode';

const useCalendarStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorStyle.background.secondary,
    border: 1,
    borderColor: borderColor,
    borderRadius: 'sm',
    boxShadow: colorStyle.shadow.medium,
    px: '5x',
    py: '4x',
  };
};

const useSelectedCellStyle = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:primary',
    light: 'white:primary'
  }[colorMode];
  const bgColor = {
    dark: 'blue:60',
    light: 'blue:60'
  }[colorMode];
  const hoverBgColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];

  return {
    color,
    backgroundColor: bgColor,
    _hover: {
      color,
      backgroundColor: hoverBgColor,
    }
  };
};

const useCellStyle = ({ isOutOfScope, isToday }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  let color = colorStyle.color.primary;
  if (isOutOfScope) {
    color = colorStyle.color.tertiary;
  }
  if (isToday) {
    color = {
      dark: 'blue:40',
      light: 'blue:40'
    }[colorMode];
  }
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    padding: '1x',
    color: color,
    backgroundColor: 'transparent',
  };
};

const useClickableCellStyle = ({ isOutOfScope, isSelected, isToday }) => {
  const [colorMode] = useColorMode();
  const baseStyle = useCellStyle({ isOutOfScope, isToday });
  const hoverBgColor = {
    dark: 'gray:80',
    light: 'gray:50',
  }[colorMode];
  const selectedStyle = useSelectedCellStyle();

  return {
    ...baseStyle,
    cursor: 'pointer',
    _hover: {
      backgroundColor: hoverBgColor,
    },
    ...isSelected && { ...selectedStyle }
  };
};

export {
  useCalendarStyle,
  useCellStyle,
  useClickableCellStyle,
};
