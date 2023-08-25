import { useColorMode } from '../color-mode';

const useTreeItemStyle = () => {
  return {
  };
};

const useTreeItemContentStyle = ({
  isDisabled,
  isSelected,
  tabIndex,
}) => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];
  const hoverBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];
  const focusBorderColor = {
    dark: 'blue:60',
    light: 'blue:60',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const defaultBackgroundColor = undefined;
  const selectedBackgroundColor = {
    dark: 'rgba(255, 255, 255, 0.08)',
    light: 'rgba(0, 0, 0, 0.08)',
  }[colorMode];

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
    _focus: {
      borderColor: focusBorderColor,

      // Note: The border will be added in TreeItemContent
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
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];
  const disabledColor = {
    dark: 'white:disabled',
    light: 'black:disabled',
  }[colorMode];
  const hoverColor = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

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
    outline: 0,
  };
};

export {
  useTreeItemStyle,
  useTreeItemContentStyle,
  useTreeItemToggleStyle,
  useTreeItemToggleIconStyle,
  useTreeStyle,
};
