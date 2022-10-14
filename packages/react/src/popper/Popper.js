import { createPopper } from '@popperjs/core';
import { useEffectOnce, useOnceWhen } from '@tonic-ui/react-hooks';
import { warnRemovedProps } from '@tonic-ui/utils';
import React, { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { Portal } from '../portal';
import { Box } from '../box';
import { assignRef } from '../utils/refs';
import getPopperArrowStyle from './styles';

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPlacement = 'bottom-start';

const Popper = forwardRef((
  {
    container, // deprecated

    anchorEl, // TODO: rename to referenceRef in a future release
    arrowSize,
    children,
    gutter,
    isOpen,
    modifiers,
    placement: placementProp,
    popperRef: popperRefProp,
    portalProps,
    unmountOnExit = false,
    usePortal = false,
    willUseTransition = false,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${Popper.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('container', {
        prefix,
        alternative: 'portalProps',
      });
    }, (container !== undefined));
  }

  const nodeRef = useRef();
  const popperRef = useRef(null); // popper instance
  const [exited, setExited] = useState(true);
  const [placement, setPlacement] = useState(placementProp ?? defaultPlacement);

  useEffect(() => {
    const isControlled = (placementProp !== undefined);
    if (isControlled) {
      setPlacement(placementProp);
    }
  }, [placementProp]);

  const setupPopper = useCallback(() => {
    if (!anchorEl || !nodeRef.current) {
      return;
    }

    // Destroy existing popper instance and create a new one
    popperRef.current?.destroy?.();

    const popperInstance = createPopper(getAnchorEl(anchorEl), nodeRef.current, {
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

    // Force update one-time to fix any positioning issues
    popperInstance.forceUpdate();

    assignRef(popperRef, popperInstance);
    assignRef(popperRefProp, popperInstance);

    if (popperRef.current !== popperInstance) {
      const prefix = `${Popper.displayName}:`;
      console.error(
        `${prefix} An unexpected error occurred. The popper instance is not assigned to the "popperRef" as expected.`,
      );
    }
  }, [anchorEl, modifiers, placement, placementProp, popperRefProp]);

  const cleanupPopper = useCallback(() => {
    // Destroy popper instance
    popperRef.current?.destroy?.();

    assignRef(popperRef, null);
    assignRef(popperRefProp, null);

    if (popperRef.current !== null) {
      const prefix = `${Popper.displayName}:`;
      console.error(
        `${prefix} An unexpected error occurred. The "popperRef" is not set to null as expected.`,
      );
    }
  }, [popperRefProp]);

  useEffectOnce(() => {
    return () => {
      cleanupPopper();
    };
  });

  const refUpdater = useCallback((node) => {
    assignRef(nodeRef, node);
    assignRef(ref, node);
    setupPopper();
  }, [setupPopper, ref]);

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
        cleanupPopper();
      },
    };
  }

  const _children = (
    <Box
      ref={refUpdater}
      position="absolute"
      css={getPopperArrowStyle({ arrowSize })}
      {...rest}
    >
      {typeof children === 'function' ? children(childProps) : children}
    </Box>
  );

  if (usePortal) {
    return (
      <Portal {...portalProps}>
        {_children}
      </Portal>
    );
  }

  return _children;
});

Popper.displayName = 'Popper';

export default Popper;
