const useDividerStyle = ({
  orientation,
  variant,
}) => {
  const dividerColor = 'border.tertiary';
  const borderKey = {
    vertical: 'borderLeft',
    horizontal: 'borderTop',
  }[orientation];
  const borderColorKey = {
    vertical: 'borderLeftColor',
    horizontal: 'borderTopColor',
  }[orientation];
  const borderStyleKey = {
    vertical: 'borderLeftStyle',
    horizontal: 'borderTopStyle',
  }[orientation];

  return {
    [borderKey]: 1,
    [borderColorKey]: dividerColor,
    [borderStyleKey]: variant,
  };
};

export {
  useDividerStyle,
};
