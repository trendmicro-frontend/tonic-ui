const baseProps = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  cursor: 'text',
};

const notFirstChildStyle = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

const notLastChildStyle = {
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const getInputProps = ({ size, variant }) => {
  const inputProps = {
    size,
    variant,
    css: {
      '&:not(:first-child)': notFirstChildStyle,
      '&:not(:last-child)': notLastChildStyle,
    },
  };

  if (variant === 'outline' || variant === 'filled') {
    // adjacent sibling
    inputProps.css['& + &'] = {
      marginLeft: -1,
    };
  }

  return inputProps;
};

export {
  baseProps,
  getInputProps,
};
