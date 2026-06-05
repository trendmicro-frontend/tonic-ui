import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { Box } from '../box';
import { ButtonBase } from '../button';
import { useDefaultProps } from '../default-props';
import { VARIANT_INLINE, defaultVariant } from './constants';
import { useLinkButtonStyle } from './styles';

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
