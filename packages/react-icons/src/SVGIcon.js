import { Box } from '@tonic-ui/react-base';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const defaultViewBox = '0 0 16 16';

const SVGIcon = forwardRef((
  {
    as: asProp = 'svg',
    children,
    focusable = false,
    size = '4x',
    viewBox = defaultViewBox,
    ...rest
  },
  ref,
) => {
  const hasSVGElementAsChild = React.isValidElement(children) && children.type === 'svg';
  const styleProps = {
    display: 'inline-flex',
    flexShrink: 0,
    width: size,
    height: size,
    verticalAlign: 'middle',
  };
  const more = {};

  // If the root element is the default 'svg', it will set the `viewBox` attribute.
  // If a custom SVG component is passed via the `as` prop, it will inherit its `viewBox` attribute.
  if (typeof asProp === 'string' && asProp.toLowerCase() === 'svg') {
    more.viewBox = viewBox;
  }

  return (
    <Box
      aria-hidden={ariaAttr(true)}
      as={asProp}
      fill="currentColor"
      focusable={focusable}
      ref={ref}
      {...styleProps}
      {...more}
      {...rest}
      {...(hasSVGElementAsChild && children.props)}
    >
      {hasSVGElementAsChild ? children.props.children : children}
    </Box>
  );
});

SVGIcon.displayName = 'SVGIcon';

export default SVGIcon;
