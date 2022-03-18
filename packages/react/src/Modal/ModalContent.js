import React, { forwardRef, useEffect, useRef } from 'react';
import Box from '../Box';
import ButtonBase from '../ButtonBase';
import Icon from '../Icon';
import useForkRef from '../utils/useForkRef';
import { useModal } from './context';
import {
  useModalContentStyle,
  useModalCloseButtonStyle,
} from './styles';

const ModalCloseButton = (props) => {
  const closeButtonStyleProps = useModalCloseButtonStyle();

  return (
    <ButtonBase {...closeButtonStyleProps} {...props}>
      <Icon icon="close" />
    </ButtonBase>
  );
};

const ModalContentBackdrop = forwardRef((props, ref) => {
  const context = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    onClose,
    scrollBehavior,
    contentRef, // internal use only
  } = { ...context };
  const containerRef = useRef();
  const combinedRef = useForkRef(containerRef, ref);

  useEffect(() => {
    const updateVerticalAlignment = () => {
      const el = containerRef?.current;
      if (!el) {
        return;
      }

      // When the scroll behavior is set to `inside`, we have to detect whether the content overflows the container.
      // * If it does overflow, set `alignItems` to `flex-start` to make the container scrollable from the top.
      // * If it doesn't overflow, remove the `alignItems` CSS property to vertically align the container to its original position (e.g. `center`).
      if (scrollBehavior === 'inside') {
        const containerHeight = el.offsetHeight;
        const contentHeight = contentRef?.current?.clientHeight;
        if (contentHeight > containerHeight) {
          el.style.alignItems = 'flex-start';
        } else {
          el.style.alignItems = '';
        }
        return;
      }

      // When the scroll behavior is set to `outside`, we have to detect whether the container overflows the viewport.
      // * If it does overflow, set `alignItems` to `flex-start` to make the container scrollable from the top.
      // * If it doesn't overflow, remove the `alignItems` CSS property to vertically align the container to its original position (e.g. `center`).
      if (scrollBehavior === 'outside') {
        const viewportHeight = window?.visualViewport?.height;
        const containerScrollHeight = el.scrollHeight;
        if (containerScrollHeight > viewportHeight) {
          el.style.alignItems = 'flex-start';
        } else {
          el.style.alignItems = '';
        }
        return;
      }
    };

    updateVerticalAlignment();

    const observer = (() => {
      if (!(window?.ResizeObserver)) {
        return null;
      }

      return new ResizeObserver(() => {
        updateVerticalAlignment();
      });
    })();

    observer?.observe?.(containerRef.current);

    return () => {
      observer?.disconnect?.();
    };
  }, [scrollBehavior, contentRef]);

  return (
    <Box
      ref={combinedRef}
      position="fixed"
      left={0}
      right={0}
      top={0}
      bottom={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      zIndex="modal"
      onClick={event => {
        event.stopPropagation();
        if (closeOnOutsideClick) {
          (typeof onClose === 'function') && onClose(event);
        }
      }}
      {...props}
    />
  );
});

const ModalContentFront = forwardRef(({ children, ...props }, ref) => {
  const context = useModal(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    onClose,
    scrollBehavior,
    size,
    contentRef, // internal use only
  } = { ...context };
  const combinedRef = useForkRef(ref, contentRef);
  const contentStyleProps = useModalContentStyle({ scrollBehavior, size });

  return (
    <Box
      ref={combinedRef}
      role="dialog"
      tabIndex={-1}
      outline={0}
      position="relative"
      width="100%"
      onClick={event => event.stopPropagation()}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          if (closeOnEsc) {
            (typeof onClose === 'function') && onClose(event);
          }
        }
      }}
      {...contentStyleProps}
      {...props}
    >
      {children}
      {!!isClosable && (
        <ModalCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const ModalContent = React.forwardRef(({
  children,
  zIndex = 'modal',
  ...props
}, ref) => {
  const context = useModal(); // context might be an undefined value

  if (!context) {
    return (
      <ModalContentFront ref={ref} {...props}>
        {children}
      </ModalContentFront>
    );
  }

  return (
    <ModalContentBackdrop zIndex={zIndex}>
      <ModalContentFront ref={ref} {...props}>
        {children}
      </ModalContentFront>
    </ModalContentBackdrop>
  );
});

ModalContent.displayName = 'ModalContent';

export default ModalContent;
