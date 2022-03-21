import { ensurePositiveNumber } from 'ensure-type';
import React, { forwardRef, useEffect, useRef } from 'react';
import { Box } from '../box';
import getComputedStyle from '../utils/dom/getComputedStyle';
import useForkRef from '../utils/useForkRef';
import {
  useModalOverlayStyle,
} from './styles';
import useModal from './useModal';

const ModalOverlay = forwardRef((props, ref) => {
  const modalContext = useModal(); // context might be an undefined value
  const {
    scrollBehavior,
    containerRef, // internal use only
    contentRef, // internal use only
  } = { ...modalContext };
  const overlayRef = useRef();
  const combinedRef = useForkRef(overlayRef, ref);
  const styleProps = useModalOverlayStyle();

  useEffect(() => {
    const updateVerticalAlignment = () => {
      const el = overlayRef?.current;
      if (!el) {
        return;
      }

      const computedContainerStyle = (containerRef?.current) && getComputedStyle(containerRef?.current);
      const paddingY = ensurePositiveNumber(parseFloat(computedContainerStyle?.paddingTop) + parseFloat(computedContainerStyle?.paddingBottom));
      const computedScrollHeight = contentRef?.current?.offsetHeight + paddingY;

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
    <Box
      ref={combinedRef}
      {...styleProps}
      {...props}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
