import { createPopper } from '@popperjs/core';
import { useIsomorphicEffect } from '@tonic-ui/react-hooks';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { Portal } from '../portal';
import { Box } from '../box';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';
import getPopperArrowStyle from './styles';

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPlacement = 'bottom-start';

const Popper = forwardRef((
  {
    anchorEl,
    arrowSize,
    children,
    container,
    gutter,
    isOpen,
    modifiers,
    placement: placementProp,
    popperRef: popperRefProp,
    unmountOnExit = false,
    usePortal = false,
    willUseTransition = false,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef();
  const combinedRef = useForkRef(nodeRef, ref);
  const popperRef = useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = useRef(handlePopperRef);
  const [exited, setExited] = useState(true);
  const [placement, setPlacement] = useState(placementProp ?? defaultPlacement);

  useEffect(() => {
    const isControlled = (placementProp !== undefined);
    if (isControlled) {
      setPlacement(placementProp);
    }
  }, [placementProp]);

  useIsomorphicEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);

  useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const handleOpen = useCallback(() => {
    const popperNode = nodeRef.current;

    if (!popperNode || !anchorEl || !isOpen) {
      return;
    }

    const popper = createPopper(getAnchorEl(anchorEl), popperNode, {
      placement: placement,
      modifiers: [
        { // https://popper.js.org/docs/v2/modifiers/arrow/
          name: 'arrow',
          options: {
            padding: 12, // 12px from the edges of the popper
          },
        },
        { // https://popper.js.org/docs/v2/modifiers/flip/
          name: 'flip',
          enabled: false, // No flip
        },
        {
          name: 'handlePopperUpdate',
          enabled: true,
          phase: 'afterWrite',
          fn: ({ state }) => {
            const isControlled = (placementProp !== undefined);
            if (isControlled) {
              return;
            }

            const nextPlacement = state?.placement;
            if (nextPlacement && (nextPlacement !== placement)) {
              setPlacement(nextPlacement);
            }
          },
        },
        ...modifiers,
      ],
      strategy: 'absolute',
    });

    handlePopperRefRef.current(popper);
  }, [anchorEl, isOpen, modifiers, placement, placementProp]);

  const handleRef = useCallback(
    node => {
      setRef(combinedRef, node);
      handleOpen();
    },
    [combinedRef, handleOpen],
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
      <Box
        ref={handleRef}
        position="absolute"
        css={getPopperArrowStyle({ arrowSize })}
        {...rest}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </Box>
    </Portal>
  );
});

Popper.displayName = 'Popper';

export default Popper;
