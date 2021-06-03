import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { createPopper } from '@popperjs/core';
import Portal from '../Portal';
import PseudoBox from '../PseudoBox';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import getPopperArrowStyle from './styles';

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const Popper = forwardRef(({
  anchorEl,
  children,
  gutter,
  container,
  usePortal = true,
  unmountOnExit = true,
  modifiers,
  isOpen,
  placement: initialPlacement = 'bottom',
  popperOptions,
  popperRef: popperRefProp,
  willUseTransition = false,
  arrowSize,
  ...rest
}, ref) => {
  const tooltipRef = useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);

  const popperRef = useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const [exited, setExited] = useState(true);

  const [placement, setPlacement] = useState(initialPlacement);

  const handleOpen = useCallback(() => {
    const popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !isOpen) {
      return;
    }

    const handlePopperUpdate = data => {
      setPlacement(data.placement);
    };
    const popper = createPopper(getAnchorEl(anchorEl), popperNode, {
      placement: placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: modifiers.offset
          },
        },
        {
          name: 'arrow',
          options: {
            padding: 12, // 12px from the edges of the popper
          },
        },
        {
          name: 'handlePopperUpdate',
          enabled: true,
          phase: 'afterWrite',
          fn: ({ state }) => {
            handlePopperUpdate(state);
          },
        }
      ],
      ...popperOptions,
    });

    handlePopperRefRef.current(popper);
  }, [anchorEl, isOpen, modifiers, placement, popperOptions]);

  const handleRef = useCallback(
    node => {
      setRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );

  const handleEnter = () => {
    setExited(false);
  };

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  const handleExited = () => {
    setExited(true);
    handleClose();
  };

  useEffect(() => {
    handleOpen();
  }, [handleOpen]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  useEffect(() => {
    if (!isOpen && !willUseTransition) {
      handleClose();
    }
  }, [isOpen, willUseTransition]);

  if (unmountOnExit && !isOpen && (!willUseTransition || exited)) {
    return null;
  }

  const childProps = { placement };

  if (willUseTransition) {
    childProps.transition = {
      in: isOpen,
      onEnter: handleEnter,
      onExited: handleExited,
    };
  }

  return (
    <Portal isDisabled={!usePortal} container={container}>
      <PseudoBox
        ref={handleRef}
        position="absolute"
        css={getPopperArrowStyle({ arrowSize })}
        {...rest}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </PseudoBox>
    </Portal>
  );
});

Popper.displayName = 'Popper';

export default Popper;
