import { useOnceWhen } from '@tonic-ui/react-hooks';
import { ariaAttr, runIfFn, warnDeprecatedProps } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';
import { TagContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Tag = forwardRef((
  {
    isCloseButtonVisible, // deprecated
    isInvalid, // deprecated
    variantColor, // deprecated

    children,
    disabled,
    error,
    isClosable,
    onClose,
    size = 'md',
    variant = 'solid',
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
    'aria-disabled': ariaAttr(disabled),
    'aria-invalid': ariaAttr(error),
  };
  const context = getMemoizedState({
    disabled,
    error,
    isClosable,
    onClose,
    size,
    variant,
  });
  const styleProps = useTagStyle({
    color: variantColor, // TODO: remove this line after deprecation
    isClosable,
    size,
    variant,
  });

  return (
    <TagContext.Provider value={context}>
      <Box
        ref={ref}
        {...ariaProps}
        {...styleProps}
        {...rest}
      >
        {runIfFn(children, context)}
        {!!isClosable && (
          <TagCloseButton />
        )}
      </Box>
    </TagContext.Provider>
  );
});

Tag.displayName = 'Tag';

export default Tag;
