import React from 'react';
import useForkRef from '../utils/useForkRef';
import useColorMode from '../useColorMode';
import { useModal } from './context';
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
    }
  }[size];
};

const modalProps = ({ variantSize = undefined }) => {
  if (variantSize !== undefined) {
    return sizeProps(variantSize);
  }
  return {
    maxWidth: '100%'
  };
};

const ModalContent = React.forwardRef(
  ({ onClick, children, zIndex = 'modal', noStyles, ...props }, ref) => {
    const {
      contentRef,
      onClose,
      isCentered,
      contentId,
      variantSize,
      closeOnEsc,
      scrollBehavior,
      closeOnOverlayClick,
    } = useModal();
    const _contentRef = useForkRef(ref, contentRef);
    const { colorMode } = useColorMode();

    const colorModeStyles = {
      light: {
        color: 'black:primary',
        bg: 'white',
        shadow: '0 7px 14px 0 rgba(0,0,0, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07)',
      },
      dark: {
        color: 'white:primary',
        bg: 'gray:90',
        shadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px',
      },
    };

    const boxStyleProps = colorModeStyles[colorMode];
    const _sizeProps = modalProps({ variantSize });

    let wrapperStyle = {};
    let contentStyle = {};

    if (isCentered) {
      wrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };
    } else {
      contentStyle = {
        top: '3.75rem',
        mx: 'auto',
      };
    }

    if (scrollBehavior === 'inside') {
      wrapperStyle = {
        ...wrapperStyle,
        // maxHeight: 'calc(100vh - 7.5rem)',
        overflow: 'hidden',
        top: '3.75rem',
      };

      contentStyle = {
        ...contentStyle,
        height: '100%',
        top: 0,
      };
    }

    return (
      <Box
        position="fixed"
        left="0"
        top="0"
        w="100%"
        h="100%"
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
        {...wrapperStyle}
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
          {...boxStyleProps}
          {...contentStyle}
          {..._sizeProps}
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
