import React from 'react';
import useForkRef from '../utils/useForkRef';
import { useModal } from './context';
import { useModalContentStyles } from './styles';
import wrapEvent from '../utils/wrapEvent';
import Box from '../Box';

const ModalContent = React.forwardRef(
  ({ onClick, children, zIndex = 'modal', noStyles, ...props }, ref) => {
    const {
      contentRef,
      onClose,
      contentId,
      size,
      closeOnEsc,
      closeOnOverlayClick,
    } = useModal();
    const _contentRef = useForkRef(ref, contentRef);
    const _sectionProps = useModalContentStyles({ size });

    return (
      <Box
        position="fixed"
        left="0"
        top="0"
        w="100%"
        h="100%"
        overflow="hidden"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={zIndex}
        onClick={event => {
          event.stopPropagation();
          if (closeOnOverlayClick) {
            onClose(event, 'clickedOverlay');
          }
        }}
        onKeyDown={event => {
          if (event.key === 'Escape') {
            event.stopPropagation();
            if (closeOnEsc) {
              onClose(event, 'pressedEscape');
            }
          }
        }}
      >
        <Box
          ref={_contentRef}
          as="section"
          role="dialog"
          tabIndex={-1}
          outline={0}
          w="100%"
          id={contentId}
          position="relative"
          d="flex"
          flexDir="column"
          zIndex={zIndex}
          onClick={wrapEvent(onClick, event => event.stopPropagation())}
          {..._sectionProps}
          {...props}
        >
          {children}
        </Box>
      </Box>
    );
  },
);

ModalContent.displayName = 'ModalContent';

export default ModalContent;
