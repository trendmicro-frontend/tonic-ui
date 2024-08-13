import { useColorMode } from '../../color-mode';
import { useColorStyle } from '../../color-style';

const useCalendarStyle = ({ tabIndex }) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const borderColor = {
    dark: 'gray:70',
    light: 'gray:30',
  }[colorMode];

  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    minWidth: '328px',
    minHeight: '308px',
    backgroundColor: colorStyle.background.secondary,
    border: 1,
    borderColor: borderColor,
    borderRadius: 'sm',
    boxShadow: colorStyle.shadow.medium,
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    px: '6x',
    py: '3x',
  };
};

const useNavigationStyle = () => {
  return {
    display: 'flex',
    flex: 'none',
    mb: '3x',
  };
};

const useNavigationCurrentMonthYearStyle = () => {
  return {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'md',
    lineHeight: 'md',
    _hover: {
      '> *': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  };
};

const useNavigationMonthButtonStyle = () => {
  return {
    width: '8x',
    height: '8x',
  };
};

const useNavigationYearButtonStyle = () => {
  const [colorMode] = useColorMode();
  const hoverColor = {
    dark: 'blue:40',
    light: 'blue:60',
  }[colorMode];
  const activeColor = hoverColor;
  return {
    minHeight: 'auto',
    px: 0,
    width: '4x',
    height: '4x',
    _hover: {
      borderColor: 'transparent',
      color: hoverColor,
    },
    _active: {
      borderColor: 'transparent',
      color: activeColor,
    },
  };
};

const useNavigationYearButtonGroupStyle = () => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    ml: '2x',
    opacity: 0,
    visibility: 'hidden',
  };
};

const useMonthViewStyle = () => {
  return {
    flex: 'auto',
  };
};

const useDayStyle = ({
  isSameMonth,
  isSelectable,
  isToday,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const color = (() => {
    if (isToday) {
      const todayColor = {
        dark: 'blue:40',
        light: 'blue:40',
      }[colorMode];
      return todayColor;
    }
    if (!isSelectable) {
      return colorStyle?.color?.disabled;
    }
    if (!isSameMonth) {
      return colorStyle?.color?.tertiary;
    }
    return colorStyle?.color?.primary;
  })();
  const hoverBackgroundColor = {
    dark: 'gray:80',
    light: 'gray:50',
  }[colorMode];
  const focusVisibleOutlineColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const selectedColor = {
    dark: 'white:primary',
    light: 'white:primary'
  }[colorMode];
  const selectedBackgroundColor = {
    dark: 'blue:60',
    light: 'blue:60'
  }[colorMode];
  const selectedHoverBackgroundColor = {
    dark: 'blue:50',
    light: 'blue:50',
  }[colorMode];
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    color,
    cursor: isSelectable ? 'pointer' : 'default',
    _hover: {
      backgroundColor: isSelectable ? hoverBackgroundColor : undefined,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
  };

  return {
    ...baseStyle,
    _selected: {
      color: selectedColor,
      backgroundColor: selectedBackgroundColor,
      '&:hover': {
        backgroundColor: selectedHoverBackgroundColor,
      },
    },
  };
};

const useDaysOfWeekStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    color: colorStyle?.color?.primary,
    cursor: 'default',
  };

  return {
    ...baseStyle,
  };
};

export {
  useCalendarStyle,
  useNavigationStyle,
  useNavigationCurrentMonthYearStyle,
  useNavigationMonthButtonStyle,
  useNavigationYearButtonStyle,
  useNavigationYearButtonGroupStyle,
  useMonthViewStyle,
  useDayStyle,
  useDaysOfWeekStyle,
};
