const useDateCalendarStyle = ({ tabIndex }) => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    minWidth: '328px',
    minHeight: '308px',
    backgroundColor: 'background.highest',
    border: 1,
    borderColor: 'border.subtle',
    borderRadius: 'sm',
    boxShadow: 'high',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    px: '6x',
    py: '3x',
  };
};

const useYearMonthPickerStyle = () => {
  return {
    display: 'flex',
    flex: 'none',
    mb: '3x',
  };
};

const useYearMonthPickerMonthButtonStyle = () => {
  return {
    width: '8x',
    height: '8x',
  };
};

const useYearMonthPickerYearStyle = () => {
  return {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'md',
    lineHeight: 'md',
    outline: 0, // Remove the default outline
    _hover: {
      '& > * > button': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    _focusVisible: {
      '& > * > button ': {
        opacity: 1,
        visibility: 'visible',
      },
      outlineColor: 'border._primary.active',
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
  };
};

const useYearMonthPickerYearButtonGroupStyle = () => {
  return {
    display: 'inline-flex',
    flexDirection: 'column',
    ml: '2x',
  };
};

const useYearMonthPickerYearButtonStyle = () => {
  return {
    minHeight: 'auto',
    px: 0,
    width: '4x',
    height: '4x',
    opacity: 0,
    visibility: 'hidden',
    _hover: {
      color: 'text.primary',
      borderColor: 'transparent',
      backgroundColor: '_foreground.subtle.hovered',
    },
    _active: {
      color: 'text.accent',
      borderColor: 'transparent',
    },
  };
};

const useMonthDateStyle = () => {
  return {
    flex: 'auto',
  };
};

const useDayStyle = ({
  isSameMonth,
  isSelectable,
  isToday,
}) => {
  const color = (() => {
    if (isToday) {
      return 'text.accent';
    }
    if (!isSelectable) {
      return 'text.disabled';
    }
    if (!isSameMonth) {
      return 'text.tertiary';
    }
    return 'text.primary';
  })();
  const borderColor = isToday ? 'border.secondary' : 'transparent';
  const hoverBackgroundColor = isToday ? undefined : '_foreground.subtle.hovered';
  const focusVisibleOutlineColor = '_foreground.primaryVariant.enabled';
  const selectedColor = 'text._fixed.dark.accent';
  const selectedBackgroundColor = '_foreground.primaryVariant.selected';
  const selectedHoverBackgroundColor = '_foreground.primaryVariant.selectedHovered';
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    color,
    border: '1.5',
    borderRadius: 'sm',
    borderColor,
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
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10x',
    color: 'text.secondary',
    cursor: 'default',
  };
};

export {
  useDateCalendarStyle,
  useYearMonthPickerStyle,
  useYearMonthPickerMonthButtonStyle,
  useYearMonthPickerYearStyle,
  useYearMonthPickerYearButtonGroupStyle,
  useYearMonthPickerYearButtonStyle,
  useMonthDateStyle,
  useDayStyle,
  useDaysOfWeekStyle,
};
