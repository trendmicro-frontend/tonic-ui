const baseProps = {
  userSelect: 'none',
  border: 1,
  borderColor: 'gray.60',
  transition: 'background-color 120ms, box-shadow 250ms',
};

const indeterminateProps = ({ color, colorMode }) => {
  return {
    borderColor: 'gray.50',
    _indeterminate: {
      borderColor: 'gray.50',
      color: `${color}.60`, // Icon color
    },
    _indeterminateAndHover: {
      borderColor: `${color}.50`,
      color: `${color}.50`,
    },
    _indeterminateAndActive: {
      borderColor: `${color}.60`,
      color: `${color}.60`, // Icon color
    },
    _indeterminateAndDisabled: {
      borderColor: 'gray.60',
      color: 'gray.60', // Icon color
    },
    _indeterminateAndFocus: {
      outlineStyle: 'solid',
      outlineColor: `${color}.60`,
      outlineWidth: '2px',
    },
    _invalid: {
      borderColor: 'red.50',
    },
  };
};

const interactionProps = ({ color, colorMode }) => {
  const isDarkMode = colorMode === 'dark';
  return {
    borderColor: 'gray.50',
    color: 'white', // Icon color
    _checked: {
      bg: `${color}.60`,
      borderColor: `${color}.60`,
    },
    _checkedAndActive: {
      bg: `${color}.60`,
      borderColor: `${color}.60`,
    },
    _checkedAndHover: {
      bg: `${color}.50`,
      borderColor: `${color}.50`,
    },
    _checkedAndFocus: {
      bg: `${color}.60`,
      borderColor: isDarkMode ? 'black' : 'white',
    },
    _checkedAndDisabled: {
      bg: 'gray.60',
      borderColor: 'gray.60',
      color: 'gray.40', // Icon color
    },
    _hover: {
      borderColor: `${color}.50`,
    },
    _disabled: {
      borderColor: 'gray.60',
    },
    _focus: {
      outlineStyle: 'solid',
      outlineColor: `${color}.60`,
      outlineWidth: '2px',
    },
    _invalid: {
      borderColor: 'red.50',
    },
  };
};

const useCheckboxStyle = props => {
  const sizes = {
    lg: '24px',
    md: '16px',
    sm: 'auto',
  };

  return {
    ...baseProps,
    ...props.isIndeterminate ? { ...indeterminateProps(props) } : { ...interactionProps(props) },
    size: sizes[props.size],
  };
};

export default useCheckboxStyle;
