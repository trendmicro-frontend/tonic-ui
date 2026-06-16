import { ariaAttr, runIfFn } from '@tonic-ui/utils';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import useShallowMemo from '../utils/useShallowMemo';
import { useTagStyle } from './styles';
import TagCloseButton from './TagCloseButton';
import { TagContext } from './context';

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
