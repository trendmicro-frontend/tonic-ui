import useColorStyle from '../../useColorStyle';
import useColorMode from '../../useColorMode';

const getDaysColor = ({
  colorMode,
  colorStyle,
  isSelected,
  isToday,
  isThisMonth,
  isOutOfScope
}) => {
  const colorProps = (({ isSelected, isToday, isThisMonth }) => {
    if (isToday && isThisMonth && !isSelected) {
      return colorStyle.text.link;
    }
    if (isSelected) {
      return {
        dark: 'white:primary',
        light: 'white:primary'
      }[colorMode];
    }
    if (!isThisMonth || isOutOfScope) {
      return colorStyle.text.tertiary;
    }
    return colorStyle.text.primary;
  })({ isSelected, isToday, isThisMonth });
  const defaultBgColor = colorStyle.background.primary;
  const hoverBgColor = {
    dark: 'gray:70',
    light: 'gray:20'
  }[colorMode];
  const selectedBgColor = {
    dark: 'blue:60',
    light: 'blue:60'
  }[colorMode];

  return {
    color: colorProps,
    backgroundColor: isSelected ? selectedBgColor : defaultBgColor,
    _hover: {
      color: colorProps,
      backgroundColor: isSelected ? selectedBgColor : hoverBgColor
    }
  };
};

const useDaysStyle = ({ isSelected, isToday, isThisMonth, isOutOfScope }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorProps = getDaysColor({
    colorMode, colorStyle, isSelected, isToday, isThisMonth, isOutOfScope
  });

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    cursor: isOutOfScope ? 'not-allowed' : 'pointer',
    ...colorProps,
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
  useDaysStyle
};
