import { useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';

const Tag = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    isInvalid, // deprecated
    variantColor, // deprecated

    children,
    error,
    isClosable,
    size = 'md',
    variant = 'solid',
    onClose,
    ...rest
  },
  ref
) => {
  { // deprecation warning
    const prefix = `${Tag.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('variantColor', {
        prefix,
        alternative: 'backgroundColor',
        willRemove: true,
      });
    }, (variantColor !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('isCloseButtonVisible', {
        prefix,
        alternative: 'isClosable',
        willRemove: true,
      });
    }, (isCloseButtonVisible !== undefined));

    useOnceWhen(() => {
      warnDeprecatedProps('isInvalid', {
        prefix,
        alternative: 'error',
        willRemove: true,
      });
    }, (isInvalid !== undefined));

    isClosable = isClosable || isCloseButtonVisible; // TODO: remove this line after deprecation
    error = error || isInvalid; // TODO: remove this line after deprecation
  }

  const ariaProps = {
    'aria-disabled': rest.disabled,
    'aria-invalid': error,
  };
  const styleProps = useTagStyle({
    color: variantColor, // TODO: remove this line after deprecation
    size,
    variant,
  });

  return (
    <Box
      ref={ref}
      {...ariaProps}
      {...styleProps}
      {...rest}
    >
      {children}
      {!!isClosable && (
        <TagCloseButton
          ml="2x"
          disabled={rest.disabled}
          onClick={onClose}
        />
      )}
    </Box>
  );
});

Tag.displayName = 'Tag';

export default Tag;
