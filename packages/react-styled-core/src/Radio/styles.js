import useTheme from '../useTheme';

const baseProps = {
  userSelect: 'none',
  border: 1,
  borderRadius: 'circle',
  transition: 'background-color 120ms, box-shadow 250ms',
};

const interactionProps = ({ color, colorMode, theme: { colors } }) => {
  const focusOutlineColor = colors[`${color}:60`];
  return {
    borderColor: 'gray:50',
    _checked: {
      borderColor: `${color}:60`,
      color: `${color}:60`, // Icon color
    },
    _checkedAndHover: {
      borderColor: `${color}:50`,
      color: `${color}:50`, // Icon color
    },
    _checkedAndDisabled: {
      borderColor: 'gray:60',
      color: 'gray:60', // Icon color
    },
    _hover: {
      borderColor: `${color}:50`,
    },
    _disabled: {
      borderColor: 'gray:60',
    },
    _focus: {
      boxShadow: `0 0 0 2px ${focusOutlineColor}`,
    },
    _invalid: {
      borderColor: 'red:50',
    },
  };
};

const useRadioStyle = props => {
  const theme = useTheme();
  const _props = { ...props, theme };
  return {
    ...baseProps,
    ...interactionProps(_props),
  };
};

export default useRadioStyle;
