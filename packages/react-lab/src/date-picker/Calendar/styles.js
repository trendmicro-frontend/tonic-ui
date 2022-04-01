import {
  useColorMode,
  useColorStyle,
} from '@tonic-ui/react';

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
    alignItems: 'stretch',
    justifyContent: 'stretch',
    minWidth: '328px',
    minHeight: '308px',
    backgroundColor: colorStyle.background.secondary,
    border: 1,
    borderColor: borderColor,
    borderRadius: 'sm',
    boxShadow: colorStyle.shadow.medium,
    px: '6x',
    py: '3x',
  };
};

const useNavigationStyle = () => {
  return {
    flex: 'none',
    mb: '3x',
  };
};

const useNavigationTitleStyle = () => {
  return {
    flexGrow: 1,
    display: 'flex',
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

const useNavigationYearButtonWrapperStyle = () => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    ml: '2x',
    opacity: 0,
    visibility: 'hidden',
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

const useNavigationMonthButtonStyle = () => {
  return {
    width: '8x',
    height: '8x',
  };
};

const useMonthViewStyle = () => {
  return {
    flex: 'auto',
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
  const hoverBackgroundColor = {
    dark: 'gray:80',
    light: 'gray:50',
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

  return {
    ...baseStyle,
    cursor: 'pointer',
    _hover: {
      backgroundColor: hoverBackgroundColor,
    },
    _selected: {
      color: selectedColor,
      backgroundColor: selectedBackgroundColor,
      '&:hover': {
        backgroundColor: selectedHoverBackgroundColor,
      },
    }
  };
};

export {
  useCalendarStyle,
  useNavigationStyle,
  useNavigationTitleStyle,
  useNavigationYearButtonStyle,
  useNavigationYearButtonWrapperStyle,
  useNavigationMonthButtonStyle,
  useMonthViewStyle,
  useCellStyle,
  useClickableCellStyle,
};
