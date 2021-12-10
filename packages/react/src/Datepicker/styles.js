import useColorStyle from '../useColorStyle';
import useColorMode from '../useColorMode';

const useSelectedColor = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:primary',
    light: 'white:primary'
  }[colorMode];
  const bgColor = {
    dark: 'blue:60',
    light: 'blue:60'
  }[colorMode];

  return {
    color,
    backgroundColor: bgColor,
    _hover: {
      color,
      backgroundColor: bgColor,
    }
  };
};

const useCellStyle = ({ isSelected, isToday, isThisMonth, isOutOfScope }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  let color = colorStyle.text.primary;
  if (isOutOfScope) {
    color = colorStyle.text.tertiary;
  }
  if (isToday) {
    color = colorStyle.text.link;
  }

  const selectedColor = useSelectedColor();

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    cursor: isOutOfScope ? 'not-allowed' : 'pointer',
    padding: '1x',
    color: color,
    backgroundColor: colorStyle.background.primary,
    ...isSelected && { ...selectedColor }
  };
};

const useIconColor = ({ showChangeYear }) => {
  const [colorMode] = useColorMode();
  const activeColor = {
    dark: 'blue:40',
    light: 'blue:60'
  }[colorMode];

  return {
    opacity: showChangeYear ? 1 : 0,
    _active: {
      color: activeColor
    }
  };
};

export {
  useIconColor,
  useCellStyle,
};
