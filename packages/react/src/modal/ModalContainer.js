import chainedFunction from 'chained-function';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '../box';
import { useAnimatePresence } from '../utils/animate-presence';
import { Fade } from '../transitions';
import useForkRef from '../utils/useForkRef';
import {
  useModalContainerStyle,
} from './styles';
import useModal from './useModal';

const ModalContainer = forwardRef((
  {
    TransitionComponent = Fade,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    closeOnOutsideClick,
    isOpen,
    onClose,
    scrollBehavior,
    contentRef, // internal use only
  } = { ...modalContext };
  const containerRef = useRef();
  const combinedRef = useForkRef(containerRef, ref);
  const [, safeToRemove] = useAnimatePresence();
  const styleProps = useModalContainerStyle();

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
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {(state, { ref, style: transitionStyle }) => (
        <Box
          ref={combinedRef}
          onClick={event => {
            event.stopPropagation();
            if (closeOnOutsideClick) {
              (typeof onClose === 'function') && onClose(event);
            }
          }}
          {...styleProps}
          {...transitionStyle}
          {...rest}
        />
      )}
    </TransitionComponent>
  );
});

ModalContainer.displayName = 'ModalContainer';

export default ModalContainer;
