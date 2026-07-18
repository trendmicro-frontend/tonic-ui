import { ariaAttr, runIfFn } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import useShallowMemo from '../utils/useShallowMemo';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';
import { TagContext } from './context';

/**
 * @typedef {Object} TagProps
 * @property {React.ReactNode} [children] -
 * @property {boolean} [disabled] - The tag will be disabled.
 * @property {boolean} [error] - The tag will display an error state.
 * @property {boolean} [isClosable] - A close button will appear on the right side.
 * @property {() => void} [onClose] - A callback called when the close button is clicked.
 * @property {'sm' | 'md' | 'lg'} [size='md'] - The size of the tag component.
 * @property {'solid' | 'outline'} [variant='solid'] - The variant style of the tag component.
 */

/**
 * @type {ForwardRefComponent<'div', TagProps>}
 */
const Tag = forwardRef((inProps, ref) => {
  const {
    children,
    disabled,
    error,
    isClosable,
    onClose,
    size = 'md',
    slots = {},
    slotProps = {},
    variant = 'solid',
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Tag' });
  const shallowMemo = useShallowMemo();
  const ariaProps = {
    'aria-disabled': ariaAttr(disabled),
    'aria-invalid': ariaAttr(error),
  };
  const context = shallowMemo({
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

  const [CloseButtonSlot, closeButtonSlotProps] = useSlot({
    name: 'closeButton',
    ownerName: Tag.displayName,
    props: {},
    slot: slots.closeButton ?? TagCloseButton,
    slotProps: slotProps.closeButton,
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
          <CloseButtonSlot {...closeButtonSlotProps} />
        )}
      </Box>
    </TagContext.Provider>
  );
});

Tag.displayName = 'Tag';

export default Tag;
