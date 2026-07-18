import { Box } from '@tonic-ui/react-base';
import { ariaAttr } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';

const defaultViewBox = '0 0 16 16';

/**
 * @typedef {Object} SVGIconProps
 * @property {React.ElementType} [as='svg'] - The element type to render as.
 * @property {React.ReactNode} [children] - The icon content, typically SVG path elements.
 * @property {boolean} [focusable=false] - Whether the icon is focusable.
 * @property {string | number} [size='4x'] - The size of the icon.
 * @property {string} [viewBox='0 0 16 16'] - The SVG viewBox attribute.
 */

/**
 * @type {React.ForwardRefExoticComponent<StyleProps & React.SVGProps<SVGSVGElement> & SVGIconProps & React.RefAttributes<SVGSVGElement>>}
 */
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
