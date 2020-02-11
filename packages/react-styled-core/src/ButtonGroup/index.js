import React, { Children, cloneElement, isValidElement } from 'react';
import Box from '../Box';

const ButtonGroup = ({
  size,
  variantColor,
  variant,
  children,
  ...rest
}) => {
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return false;
    }

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;

    return cloneElement(child, {
      size: child.props.size || size,
      variantColor: child.props.variantColor || variantColor,
      variant: child.props.variant || variant,
      ...(isFirst && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      ...(!isLast && { mr: -1 }),
      ...(!isFirst && !isLast && { borderRadius: 0 }),
    });
  });

  return (
    <Box display="inline-block" {...rest}>
      {clones}
    </Box>
  );
};

export default ButtonGroup;
