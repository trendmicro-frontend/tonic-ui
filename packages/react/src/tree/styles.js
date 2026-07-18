const useTreeItemStyle = () => {
  return {
    // No default visual styles
  };
};

const useTreeItemContentStyle = ({
  isDisabled,
  isSelected,
  tabIndex,
}) => {
  const color = 'text.primary';
  const hoverBackgroundColor = 'actions.hovered';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const disabledColor = 'actions.disabled';
  const defaultBackgroundColor = 'actions.enabled';
  const selectedBackgroundColor = 'actions.selected';

  return {
    backgroundColor: isSelected ? selectedBackgroundColor : defaultBackgroundColor,
    color: isDisabled ? disabledColor : color,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    px: '3x',
    py: '2x',
    userSelect: 'none',
    width: '100%',
    _hover: {
      backgroundColor: !isDisabled ? hoverBackgroundColor : undefined,
    },
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
  };
};

const useTreeItemToggleStyle = () => {
  return {
    display: 'inline-flex',
    backgroundColor: 'transparent',
  };
};

const useTreeItemToggleIconStyle = ({
  disabled,
}) => {
  const color = 'text.secondary';
  const disabledColor = 'text.disabled';
  const hoverColor = 'text.primary';

  return {
    display: 'inline-flex',
    color: disabled ? disabledColor : color,
    _hover: {
      color: disabled ? disabledColor : hoverColor,
    },
  };
};

const useTreeStyle = () => {
  return {
    // No default visual styles
  };
};

export {
  useTreeItemStyle,
  useTreeItemContentStyle,
  useTreeItemToggleStyle,
  useTreeItemToggleIconStyle,
  useTreeStyle,
};
