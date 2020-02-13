import React, { Children, cloneElement, Fragment, isValidElement } from 'react';
import Box from '../Box';

const ButtonGroup = ({
  children,
  size = 'md',
  variant = 'solid',
  variantColor,
  vertical,
  ...rest
}) => {
  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return false;
    }

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;
    const horizontalProps = {
      ...(isFirst && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      ...(!isFirst && variant === 'outline' && { ml: -1 }),
      ...(!isFirst && !isLast && { borderRadius: 0 }),
    };
    const verticalProps = {
      ...(isFirst && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && { borderTopLeftRadius: 0, borderTopRightRadius: 0 }),
      ...(!isFirst && variant === 'outline' && { mt: -1 }),
      ...(!isFirst && !isLast && { borderRadius: 0 }),
    };
    const buttonStyleProps = vertical ? verticalProps : horizontalProps;

    let hr = null;
    if (!isFirst && variant === 'solid') {
      hr = vertical ? (
        <Box height="1px" bg="gray.70" />
      ) : (
        <Box width="1px" bg="gray.70" />
      );
    }

    return (
      <Fragment>
        { hr }
        {
          cloneElement(child, {
            size: size,
            variantColor: child.props.variantColor || variantColor,
            variant: variant,
            ...buttonStyleProps
          })
        }
      </Fragment>
    );
  });

  return (
    <Box
      display="inline-flex"
      flexDirection={vertical ? 'column' : 'row'}
      {...rest}
    >
      {clones}
    </Box>
  );
};

export default ButtonGroup;
