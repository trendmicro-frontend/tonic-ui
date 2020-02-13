import React, { Children, cloneElement, Fragment, isValidElement } from 'react';
import Box from '../Box';

const ButtonGroup = ({
  children,
  size = 'md',
  variantColor,
  variant = 'solid',
  vertical,
  ...rest
}) => {
  let prevChildVariant;

  const clones = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      return false;
    }

    const isFirst = index === 0;
    const isLast = index === Children.count(children) - 1;
    const _variant = child.props.variant || variant;
    const horizontalProps = {
      ...(isFirst && { borderTopRightRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }),
      ...(!isFirst && prevChildVariant === 'outline' && _variant === 'outline' && { ml: -1 }),
      ...(!isFirst && !isLast && { borderRadius: 0 }),
    };
    const verticalProps = {
      ...(isFirst && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }),
      ...(isLast && { borderTopLeftRadius: 0, borderTopRightRadius: 0 }),
      ...(!isFirst && prevChildVariant === 'outline' && _variant === 'outline' && { mt: -1 }),
      ...(!isFirst && !isLast && { borderRadius: 0 }),
    };
    const buttonStyleProps = vertical ? verticalProps : horizontalProps;

    let hr = null;
    if (!isFirst && prevChildVariant === 'solid' && _variant === 'solid') {
      hr = vertical ? (
        <Box height="1px" bg="gray.70" />
      ) : (
        <Box width="1px" bg="gray.70" />
      );
    }

    prevChildVariant = _variant;

    return (
      <Fragment>
        { hr }
        {
          cloneElement(child, {
            size: child.props.size || size,
            variantColor: child.props.variantColor || variantColor,
            variant: _variant,
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
