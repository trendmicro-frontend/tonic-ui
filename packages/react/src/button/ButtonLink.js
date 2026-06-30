import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import Button from './Button';

/**
 * @typedef {Object} ButtonLinkProps
 * @property {React.ReactNode} [children] - The content to be rendered within the button link.
 * @property {boolean} [disabled] - If `true`, the button link will be disabled. This sets `aria-disabled=true` and you can style this state by using the `_disabled` prop.
 * @property {React.MouseEventHandler<HTMLAnchorElement>} [onClick] - A callback called when the button link is clicked.
 */

/**
 * @type {ForwardRefComponent<'a', ButtonLinkProps>}
 */
const ButtonLink = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ButtonLink' });

  return (
    <Button
      as="a"
      ref={ref}
      {...props}
    />
  );
});

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
