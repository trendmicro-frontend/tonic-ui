import { useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VARIANT_INLINE, defaultVariant } from './constants';
import { useLinkStyle } from './styles';

/**
 * @typedef {Object} LinkProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled] - The link will be disabled. This sets `aria-disabled=true` and you can style this state by using the `_disabled` prop.
 * @property {React.MouseEventHandler<HTMLAnchorElement>} [onClick] - A callback called when the link is clicked.
 * @property {'default' | 'inline' | 'subtle'} [variant='default'] - Defines the visual style of the link: 'default' for standalone links or navigation items, 'inline' for inline links within text or paragraphs, 'subtle' for links with reduced visual emphasis but still interactive.
 */

/**
 * @type {ForwardRefComponent<'a', LinkProps>}
 */
const Link = forwardRef((inProps, ref) => {
  const {
    disabled,
    onClick,
    textDecoration,
    variant: variantProp = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Link' });
  let variant = variantProp;

  { // deprecation warning
    const prefix = `${Link.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('textDecoration', {
        prefix,
        alternative: 'variant="inline"',
      });
    }, (textDecoration === 'underline'));

    if (textDecoration === 'underline') {
      variant = VARIANT_INLINE;
    }
  }

  const styleProps = useLinkStyle({
    disabled,
    variant,
  });
  const preventDefaultCallback = useCallback((event) => event.preventDefault(), []);

  return (
    <Box
      as="a"
      ref={ref}
      aria-disabled={ariaAttr(disabled)}
      onClick={disabled ? preventDefaultCallback : onClick}
      {...styleProps}
      {...rest}
    />
  );
});

Link.displayName = 'Link';

export default Link;
