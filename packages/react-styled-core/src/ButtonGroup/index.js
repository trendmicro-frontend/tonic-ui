import React, { Children, cloneElement, isValidElement } from 'react';
import Box from '../Box';

const ButtonGroup = ({
  size,
  variantColor,
  variant,
  isAttached,
  spacing = 'xs',
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
      ...(!isLast && !isAttached && { mr: spacing }),
      ...(isFirst && isAttached && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && isAttached && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      ...(!isLast && isAttached && { borderRight: 0 }),
      ...(!isFirst && !isLast && isAttached && { borderRadius: 0 }),
    });
  });

  return (
    <Box display="inline-block" {...rest}>
      {clones}
    </Box>
  );
};

export default ButtonGroup;
