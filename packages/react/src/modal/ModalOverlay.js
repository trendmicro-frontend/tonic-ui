import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, getComputedStyle, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensurePositiveNumber } from 'ensure-type';
import { forwardRef, useEffect, useRef } from 'react';
import useSlot from '../utils/useSlot';
import { useDefaultProps } from '../default-props';
import { Fade } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import {
  useModalOverlayStyle,
} from './styles';
import useModal from './useModal';

const ModalOverlay = forwardRef((inProps, ref) => {
  const {
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    ...rest
  } = useDefaultProps({ props: inProps, name: 'ModalOverlay' });

  { // deprecation warning
    const prefix = `${ModalOverlay.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionComponent', {
        prefix,
        alternative: 'slots.transition',
        willRemove: true,
      });
    }, TransitionComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('TransitionProps', {
        prefix,
        alternative: 'slotProps.transition',
        willRemove: true,
      });
    }, TransitionProps !== undefined);
  }

  const [, safeToRemove] = useAnimatePresence();
  const modalContext = useModal(); // context might be an undefined value
  const {
    isOpen,
    scrollBehavior,
    containerRef, // internal use only
    contentRef, // internal use only
  } = { ...modalContext };
  const overlayRef = useRef();
  const combinedRef = useMergeRefs(overlayRef, ref);
  const styleProps = useModalOverlayStyle();

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerDisplayName: ModalOverlay.displayName,
    props: {
      ref: combinedRef,
      appear: !!modalContext,
    },
    slot: slots.transition ?? TransitionComponent ?? Fade,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  useEffect(() => {
    const update = () => {
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

    update();

    let resizeObserver = null;

    const ResizeObserver = globalThis.ResizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        update();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [scrollBehavior, containerRef, contentRef]);

  return (
    <TransitionSlot
      {...transitionSlotProps}
      {...styleProps}
      {...rest}
      in={modalContext ? isOpen : true}
      onExited={callAll(safeToRemove, transitionSlotProps.onExited)}
    />
  );
});

ModalOverlay.displayName = 'ModalOverlay';

export default ModalOverlay;
