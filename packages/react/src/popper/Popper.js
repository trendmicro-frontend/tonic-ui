import { createPopper } from '@popperjs/core';
import { useEffectOnce, useOnceWhen } from '@tonic-ui/react-hooks';
import { warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { forwardRef, useEffect, useRef, useState, useCallback } from 'react';
import { useDefaultProps } from '../default-props';
import { Portal } from '../portal';
import { Box } from '../box';
import { assignRef } from '../utils/refs';

const defaultPlacement = 'bottom-start';

// Sets the popper's width to match the reference element on every Popper.js update.
const matchWidthModifier = {
  name: 'matchWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  },
};

/**
 * @typedef {Object} PopperChildProps
 * @property {string} placement - The current placement of the popper.
 * @property {{ in: boolean; onEnter: () => void; onExited: () => void }} [transition] - Transition props when `willUseTransition` is true.
 */

/**
 * @typedef {Object} PopperInstance
 * @property {() => void} destroy - Destroy the popper instance.
 * @property {() => void} forceUpdate - Force update the popper position.
 */

/**
 * @typedef {Object} PopperProps
 * @property {HTMLElement | (() => HTMLElement) | null} [anchorEl] - Deprecated: Use `referenceRef` instead. The element or a function returning an element to which the popper is attached.
 * @property {React.ReactNode | ((context: PopperChildProps) => React.ReactNode)} [children] - The content of the popper. Can be a ReactNode or a render function that receives `{ placement }`.
 * @property {boolean} [isOpen] - Whether the popper is open.
 * @property {boolean} [matchWidth=false] - If `true`, sizes the popper to match the reference element's width on every update. Useful for autocomplete, date-picker, and select patterns.
 * @property {Array<import('@popperjs/core').Modifier<string, object>>} [modifiers] - Popper.js modifiers to customize positioning behavior.
 * @property {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'} [placement='bottom-start'] - The placement of the popper.
 * @property {React.MutableRefObject<PopperInstance | null>} [popperRef] - Reference to receive the popper instance.
 * @property {boolean} [portalled] - If `true`, renders the popper in a portal. Takes precedence over `usePortal` when provided.
 * @property {import('../portal/Portal').PortalProps} [portalProps] - Props to pass to the Portal component when `portalled` is true.
 * @property {React.RefObject<HTMLElement>} [referenceRef] - Reference to the element the popper is positioned relative to.
 * @property {boolean} [unmountOnExit=false] - Whether to unmount the popper when not open.
 * @property {boolean} [usePortal=false] - Whether to render in a portal. Use `portalled` instead.
 * @property {boolean} [willUseTransition=false] - Whether the popper uses transitions.
 */

/**
 * @type {ForwardRefComponent<'div', PopperProps>}
 */
const Popper = forwardRef((inProps, ref) => {
  const {
    anchorEl, // deprecated

    children,
    isOpen,
    matchWidth = false,
    modifiers = [],
    placement: placementProp,
    popperRef: popperRefProp, // reference to receive the popper instance
    portalProps,
    portalled,
    referenceRef,
    unmountOnExit = false,
    usePortal,
    willUseTransition = false,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Popper' });

  { // deprecation warning
    const prefix = `${Popper.displayName}:`;

    useOnceWhen(() => {
      warnDeprecatedProps('anchorEl', {
        prefix,
        alternative: 'referenceRef',
        willRemove: true,
      });
    }, (anchorEl !== undefined));

    /* TODO: Add a deprecation warning for `usePortal` once `portalled` has been officially available since v4
    useOnceWhen(() => {
      warnDeprecatedProps('usePortal', {
        prefix,
        alternative: 'portalled',
        willRemove: true,
      });
    }, (usePortal !== undefined));
    */
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
    const anchor = (typeof anchorEl === 'function') ? anchorEl() : anchorEl; // deprecated
    const reference = anchor ?? referenceRef?.current;
    const popper = nodeRef.current;

    if (!reference || !popper) {
      return;
    }

    // Destroy existing popper instance and create a new one
    popperRef.current?.destroy?.();

    const popperInstance = createPopper(reference, popper, {
      placement: placement,
      modifiers: [
        { // https://popper.js.org/docs/v2/modifiers/arrow/
          name: 'arrow',
          options: {
            element: '[data-popper-arrow]',
            padding: 12, // 12px from the edges of the popper
          },
        },
        {
          name: 'handlePopperUpdate',
          enabled: true,
          phase: 'afterWrite',
          fn: ({ state }) => {
            const arrowEl = state?.elements?.arrow;
            const nextPlacement = state?.placement;

            // Update the arrow element's `data-popper-placement` attribute based on the desired placement
            // @see https://popper.js.org/docs/v2/tutorial/
            if (arrowEl && arrowEl.getAttribute('data-popper-placement') !== nextPlacement) {
              arrowEl.setAttribute('data-popper-placement', nextPlacement);
            }

            const isControlled = (placementProp !== undefined);
            if (isControlled) {
              return;
            }

            if (nextPlacement && (nextPlacement !== placement)) {
              setPlacement(nextPlacement);
            }
          },
        },
        ...(matchWidth ? [matchWidthModifier] : []),
        ...ensureArray(modifiers),
      ],
      strategy: 'absolute',
    });

    // Force update one-time to fix any positioning issues
    popperInstance.forceUpdate();

    assignRef(popperRef, popperInstance);
    assignRef(popperRefProp, popperInstance);

    if (popperRef.current !== popperInstance) {
      console.error(
        `${Popper.displayName}: An unexpected error occurred. The popper instance is not assigned to the "popperRef" as expected.`,
      );
    }
  }, [anchorEl, matchWidth, modifiers, placement, placementProp, popperRefProp, referenceRef]);

  const cleanupPopper = useCallback(() => {
    // Destroy popper instance
    popperRef.current?.destroy?.();

    assignRef(popperRef, null);
    assignRef(popperRefProp, null);

    if (popperRef.current !== null) {
      console.error(
        `${Popper.displayName}: An unexpected error occurred. The "popperRef" is not set to null as expected.`,
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
      {...rest}
    >
      {typeof children === 'function' ? children(childProps) : children}
    </Box>
  );

  // TODO: Remove `usePortal` in favor of `portalled` in a future major release
  // Use `||` (not `??`) so `usePortal` acts as a fallback even when `portalled`
  // is explicitly `false` — e.g. when propagated from a Menu/Popover context
  // that defaults portalled to false.
  if (portalled || usePortal) {
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
