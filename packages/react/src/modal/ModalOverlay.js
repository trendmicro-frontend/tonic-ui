import chainedFunction from 'chained-function';
import { ensurePositiveNumber } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import getComputedStyle from '../utils/dom/getComputedStyle';
import useForkRef from '../utils/useForkRef';
import {
  useModalOverlayStyle,
} from './styles';
import useModal from './useModal';

const ModalOverlay = forwardRef((
  {
    TransitionComponent = Fade,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const [, safeToRemove] = useAnimatePresence();
  const modalContext = useModal(); // context might be an undefined value
  const {
    isOpen,
    scrollBehavior,
    containerRef, // internal use only
    contentRef, // internal use only
  } = { ...modalContext };
  const overlayRef = useRef();
  const combinedRef = useForkRef(overlayRef, ref);
  const styleProps = useModalOverlayStyle();
  const overlayProps = {
    ref: combinedRef,
    ...styleProps,
    ...rest,
  };

  useEffect(() => {
    const updateVerticalAlignment = () => {
      const el = overlayRef?.current;
      if (!el) {
        return;
      }

      const computedContainerStyle = (containerRef?.current) && getComputedStyle(containerRef?.current);
      const paddingX = ensurePositiveNumber(parseFloat(computedContainerStyle?.paddingLeft) + parseFloat(computedContainerStyle?.paddingRight));
      const paddingY = ensurePositiveNumber(parseFloat(computedContainerStyle?.paddingTop) + parseFloat(computedContainerStyle?.paddingBottom));
      const computedScrollWidth = ensurePositiveNumber(contentRef?.current?.offsetWidth) + paddingX;
      const computedScrollHeight = ensurePositiveNumber(contentRef?.current?.offsetHeight) + paddingY;

      if (computedScrollWidth > containerRef?.current?.offsetWidth) {
        el.style.width = `${computedScrollWidth}px`;
      } else {
        el.style.width = '';
      }
      if (computedScrollHeight > containerRef?.current?.offsetHeight) {
        el.style.height = `${computedScrollHeight}px`;
      } else {
        el.style.height = '';
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

    if (containerRef.current) {
      observer?.observe(containerRef.current);
    }
    if (contentRef.current) {
      observer?.observe(contentRef.current);
    }

    return () => {
      observer?.disconnect?.();
    };
  }, [scrollBehavior, containerRef, contentRef]);

  return (
    <TransitionComponent
      appear={!!modalContext}
      {...TransitionProps}
      {...overlayProps}
      in={modalContext ? isOpen : true}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
