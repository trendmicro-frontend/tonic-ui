import { createPopper } from '@popperjs/core';
import { useEffectOnce } from '@tonic-ui/react-hooks';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Portal } from '../portal';
import { Box } from '../box';
import { assignRef } from '../utils/refs';
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
  const combinedPopperRef = useForkRef(popperRef, popperRefProp);
  const [exited, setExited] = useState(true);
  const [placement, setPlacement] = useState(placementProp ?? defaultPlacement);

  useEffect(() => {
    const isControlled = (placementProp !== undefined);
    if (isControlled) {
      setPlacement(placementProp);
    }
  }, [placementProp]);

  const handleOpen = useCallback(() => {
    if (popperRef.current) {
      return;
    }

    if (!nodeRef.current) {
      return;
    }

    if (!anchorEl) {
      return;
    }

    const popper = createPopper(getAnchorEl(anchorEl), nodeRef.current, {
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

    assignRef(combinedPopperRef, popper);

    if (popperRef.current !== popper) {
      const prefix = `${Popper.displayName}:`;
      console.error(
        `${prefix} An unexpected error occurred. The popper instance is not assigned to the "popperRef" as expected.`,
      );
    }
  }, [anchorEl, modifiers, placement, placementProp, combinedPopperRef]);

  const handleClose = useCallback(() => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    assignRef(combinedPopperRef, null);

    if (popperRef.current !== null) {
      const prefix = `${Popper.displayName}:`;
      console.error(
        `${prefix} An unexpected error occurred. The "popperRef" is not set to null as expected.`,
      );
    }
  }, [popperRef, combinedPopperRef]);

  useEffect(() => {
    if (isOpen) {
      handleOpen();
      return;
    }

    if (!isOpen && !willUseTransition) {
      handleClose();
      return;
    }
  }, [isOpen, willUseTransition, handleOpen, handleClose]);

  useEffectOnce(() => {
    return () => {
      handleClose();
    };
  });

  if (unmountOnExit && !isOpen && (!willUseTransition || exited)) {
    return null;
  }

  const childProps = { placement };

  if (willUseTransition) {
    childProps.transition = {
      in: isOpen,
      onEnter: () => {
        setExited(false);
      },
      onExited: () => {
        setExited(true);
        handleClose();
      },
    };
  }

  return (
    <Portal isDisabled={!usePortal} container={container}>
      <Box
        ref={combinedRef}
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
