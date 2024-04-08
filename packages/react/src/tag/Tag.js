import { ariaAttr, runIfFn } from '@tonic-ui/utils';
import memoize from 'micro-memoize';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';
import { TagContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Tag = forwardRef((
  {
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
