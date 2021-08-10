import useColorStyle from '../../useColorStyle';
import useColorMode from '../../useColorMode';

const getDaysColor = ({
  colorMode,
  colorStyle,
  isSelected,
  isToday,
  isThisMonth
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
    if (!isThisMonth) {
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

const useDaysStyle = ({ isSelected, isToday, isThisMonth }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorProps = getDaysColor({
    colorMode, colorStyle, isSelected, isToday, isThisMonth
  });

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    cursor: 'pointer',
    ...colorProps,
  };
};

export {
  useDaysStyle
};
