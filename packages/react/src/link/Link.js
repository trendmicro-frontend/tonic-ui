import { useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef, useCallback } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { VARIANT_INLINE, defaultVariant } from './constants';
import { useLinkStyle } from './styles';

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
