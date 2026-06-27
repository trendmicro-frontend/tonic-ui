import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import { VARIANT_INLINE, defaultVariant } from './constants';
import { useLinkButtonStyle } from './styles';

/**
 * @typedef {Object} LinkButtonProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled] - If `true`, the link is displayed as disabled.
 * @property {React.MouseEventHandler<HTMLButtonElement>} [onClick] - A callback called when the link button is clicked.
 * @property {'default' | 'inline' | 'subtle'} [variant='default'] - Defines the visual style of the link: 'default' for standalone links or navigation items, 'inline' for inline links within text or paragraphs, 'subtle' for links with reduced visual emphasis but still interactive.
 */

/**
 * @type {ForwardRefComponent<'button', LinkButtonProps>}
 */
const LinkButton = forwardRef((inProps, ref) => {
  const {
    disabled,
    textDecoration,
    variant: variantProp = defaultVariant,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'LinkButton' });
  let variant = variantProp;

  { // deprecation warning
    const prefix = `${LinkButton.displayName}:`;

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

  const styleProps = useLinkButtonStyle({
    disabled,
    variant,
  });

  return (
    <Box
      as={ButtonBase}
      ref={ref}
      disabled={disabled}
      {...styleProps}
      {...rest}
    />
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;
