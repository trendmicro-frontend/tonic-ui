import React from 'react';
import useForkRef from '../utils/useForkRef';
import useColorMode from '../useColorMode';
import { useModal } from './context';
import { useModalContentStyles } from './styles';
import wrapEvent from '../utils/wrapEvent';
import Box from '../Box';

const sizeProps = (size) => {
  return {
    xs: {
      width: 352,
      height: '22rem',
    },
    sm: {
      width: 512,
      height: '32rem',
    },
    md: {
      width: 672,
      height: '42rem',
    },
    lg: {
      width: 832,
      height: '52rem',
    },
    xl: {
      width: 992,
      height: '62rem',
    },
    full: {
      maxWidth: '100%'
    }
  }[size];
};

const ModalContent = React.forwardRef(
  ({ onClick, children, zIndex = 'modal', noStyles, ...props }, ref) => {
    const {
      contentRef,
      onClose,
      contentId,
      variantSize,
      closeOnEsc,
      closeOnOverlayClick,
    } = useModal();
    const _contentRef = useForkRef(ref, contentRef);
    const _sectionProps = useModalContentStyles({ variantSize });

    return (
      <Box
        position="fixed"
        left="0"
        top="0"
        w="100%"
        h="100%"
        overflow="hidden"
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
