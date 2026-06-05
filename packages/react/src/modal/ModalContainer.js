import { useMergeRefs } from '@tonic-ui/react-hooks';
import { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import {
  useModalContainerStyle,
} from './styles';
import useModal from './useModal';

const ModalContainer = forwardRef((inProps, ref) => {
  const props = useDefaultProps({ props: inProps, name: 'ModalContainer' });
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnInteractOutside,
    containerRef, // internal use only
    onClose,
    onInteractOutside,
  } = { ...modalContext };
  const combinedRef = useMergeRefs(containerRef, ref);
  const styleProps = useModalContainerStyle();
  const containerProps = {
    ref: combinedRef,
    onClick: (event) => {
      event.stopPropagation();

      onInteractOutside?.(event);

      const shouldClose = Boolean(closeOnInteractOutside);
      if (shouldClose && !event.defaultPrevented) {
        // Close the modal when clicking outside the modal content (on the container)
        onClose?.(event);
      }
    },
    ...styleProps,
    ...props,
  };

  return (
    <Box {...containerProps} />
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
