import { Box } from '@tonic-ui/react-base';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const SVGIcon = forwardRef((
  {
    children,
    color = 'currentColor',
    focusable = false,
    role = 'presentation',
    size = '4x',
    sx,
    viewBox = '0 0 16 16',
    ...rest
  },
  ref,
) => {
  const hasSVGElementAsChild = React.isValidElement(children) && children.type === 'svg';
  const styleProps = {
    display: 'inline-flex',
    flexShrink: 0,
    verticalAlign: 'middle',
    '&:not(:root)': {
      overflow: 'hidden',
    },
  };

  return (
    <Box
      aria-hidden={ariaAttr(true)}
      ref={ref}
      as="svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill={color}
      focusable={focusable}
      role={role}
      sx={[
        styleProps,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...(hasSVGElementAsChild && children.props)}
      {...rest}
    >
      {hasSVGElementAsChild ? children.props.children : children}
    </Box>
  );
});

SVGIcon.displayName = 'SVGIcon';

export default SVGIcon;
