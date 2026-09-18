import { useId } from '@tonic-ui/react-hooks';
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import config from '../shared/config';
import TooltipContent from './TooltipContent';
import TooltipTrigger from './TooltipTrigger';
import { TooltipContext } from './context';

const defaultPlacement = 'bottom';

/**
 * @typedef {Object} TooltipChildrenContext
 * @property {boolean} arrow - Whether the tooltip arrow is displayed. Always `false` when `followCursor` or `nextToCursor` is set.
 * @property {boolean} closeOnClick - Whether the tooltip closes on click.
 * @property {boolean} closeOnEsc - Whether the tooltip closes when the `Esc` key is pressed.
 * @property {boolean} closeOnPointerDown - Whether the tooltip closes on pointer down.
 * @property {boolean} [disabled] - Whether the tooltip is disabled.
 * @property {boolean} [followCursor] - Whether the tooltip follows the cursor.
 * @property {boolean} isOpen - Whether the tooltip is open.
 * @property {number} mousePageX - The page X coordinate of the cursor.
 * @property {number} mousePageY - The page Y coordinate of the cursor.
 * @property {boolean} [nextToCursor] - Whether the tooltip is positioned next to the cursor.
 * @property {[number, number]} [offset] - The skidding and distance of the tooltip.
 * @property {(callback?: () => void) => void} onClose - Closes the tooltip.
 * @property {(callback?: () => void) => void} onOpen - Opens the tooltip.
 * @property {boolean} openOnFocus - Whether the tooltip opens on focus.
 * @property {string} placement - The placement of the tooltip.
 * @property {boolean} [portalled] - Whether the tooltip is rendered in a portal.
 * @property {React.Dispatch<React.SetStateAction<number>>} setMousePageX - Setter for the mouse page X coordinate.
 * @property {React.Dispatch<React.SetStateAction<number>>} setMousePageY - Setter for the mouse page Y coordinate.
 * @property {React.MutableRefObject<HTMLElement | null>} tooltipContentRef - Ref to the tooltip content element.
 * @property {string} tooltipId - The `id` of the tooltip element.
 * @property {string} tooltipTriggerId - The `id` of the tooltip trigger element.
 * @property {React.MutableRefObject<HTMLElement | null>} tooltipTriggerRef - Ref to the tooltip trigger element.
 */

/**
 * @typedef {Object} TooltipProps
 * @property {boolean} [arrow=true] - Adds an arrow to the tooltip.
 * @property {React.ReactNode | ((context: TooltipChildrenContext) => React.ReactNode)} [children] - A function child can be used instead of a React element. This function is called with the context object.
 * @property {boolean} [closeOnClick=true] - Whether the tooltip closes when the trigger is clicked.
 * @property {boolean} [closeOnEsc=true] - Whether the tooltip closes when the `Esc` key is pressed.
 * @property {boolean} [closeOnPointerDown=true] - Whether the tooltip closes when the pointer is pressed down.
 * @property {boolean} [defaultIsOpen=false] - Whether the tooltip is open by default.
 * @property {boolean} [disabled] - Whether the tooltip is disabled.
 * @property {number} [enterDelay=100] - The number of milliseconds to wait before showing the tooltip.
 * @property {boolean} [followCursor] - Whether the tooltip follows the cursor.
 * @property {boolean} [isOpen] - Whether the tooltip is shown. If set, the tooltip behaves as a controlled component.
 * @property {React.ReactNode} [label] - The content of the tooltip.
 * @property {number} [leaveDelay=0] - The number of milliseconds to wait before hiding the tooltip.
 * @property {boolean} [nextToCursor] - Whether the tooltip is positioned next to the cursor.
 * @property {[number, number]} [offset] - The skidding and distance of the tooltip.
 * @property {() => void} [onClose] - Callback when the tooltip is closed.
 * @property {() => void} [onOpen] - Callback when the tooltip is opened.
 * @property {boolean} [openOnFocus=true] - Whether the tooltip opens when the trigger receives focus.
 * @property {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'} [placement='bottom'] - The placement of the tooltip.
 * @property {React.ElementType} [PopperComponent=Popper] - **Deprecated.** Use `slots.popper`. The component used for the popper.
 * @property {object} [PopperProps] - **Deprecated.** Use `slotProps.popper`. Props applied to the Popper component.
 * @property {boolean} [portalled=false] - If `true`, renders the tooltip in a portal.
 * @property {boolean} [shouldWrapChildren=false] - If `true`, the children are wrapped by a `TooltipTrigger` so event handlers can be attached to them.
 * @property {{ popper?: object; transition?: object; arrow?: object }} [slotProps] - Props forwarded to internal slots. `slotProps.popper` / `slotProps.transition` / `slotProps.arrow` are applied to the Popper / transition / arrow elements.
 * @property {{ popper?: React.ElementType; transition?: React.ElementType; arrow?: React.ElementType }} [slots] - Slot components. `slots.popper` replaces the default `Popper`; `slots.transition` replaces the default `Grow`; `slots.arrow` replaces the default `TooltipArrow`.
 * @property {React.ElementType} [TooltipArrowComponent=TooltipArrow] - **Deprecated.** Use `slots.arrow`. The component used for the arrow.
 * @property {object} [TooltipArrowProps] - **Deprecated.** Use `slotProps.arrow`. Props applied to the arrow element.
 * @property {React.ElementType} [TransitionComponent=Grow] - **Deprecated.** Use `slots.transition`. The component used for the transition.
 * @property {{ appear?: boolean; timeout?: number | { appear?: number; enter?: number; exit?: number } }} [TransitionProps] - **Deprecated.** Use `slotProps.transition`. Props applied to the Transition element.
 * @property {boolean} [TransitionProps.appear=true] - Whether to perform the enter transition when it first mounts.
 */

/**
 * @type {ForwardRefComponent<'div', TooltipProps>}
 */
const Tooltip = forwardRef((inProps, ref) => {
  const {
    // TooltipContent props (deprecated — use slots/slotProps)
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TooltipArrowComponent, // deprecated
    TooltipArrowProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated

    // slots / slotProps
    slots = {},
    slotProps = {},

    // TooltipTrigger props
    shouldWrapChildren = false,

    // Tooltip props
    arrow = true,
    children,
    closeOnClick = true,
    closeOnEsc = true,
    closeOnPointerDown = true,
    defaultIsOpen = false,
    disabled,
    enterDelay = 100,
    followCursor,
    isOpen: isOpenProp,
    label,
    leaveDelay = 0,
    nextToCursor,
    offset,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    openOnFocus = true,
    portalled,
    placement = defaultPlacement,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Tooltip' });
  const shallowMemo = useShallowMemo();
  const tooltipContentRef = useRef(null);
  const tooltipTriggerRef = useRef(null);
  const [mousePageX, setMousePageX] = useState(0);
  const [mousePageY, setMousePageY] = useState(0);
  const [isOpen, setIsOpen] = useState(isOpenProp ?? defaultIsOpen);

  useEffect(() => {
    const isControlled = (isOpenProp !== undefined);
    if (isControlled) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const enterTimeoutRef = useRef();
  const leaveTimeoutRef = useRef();

  const openWithDelay = useCallback((callback, delay) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      enterTimeoutRef.current = setTimeout(() => {
        enterTimeoutRef.current = undefined;
        setIsOpen(true);
        (typeof callback === 'function') && callback();
      }, delay);
    } else {
      setIsOpen(true);
      (typeof callback === 'function') && callback();
    }
  }, []);

  const closeWithDelay = useCallback((callback, delay) => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
      enterTimeoutRef.current = undefined;
    }
    if (delay > 0) {
      leaveTimeoutRef.current = setTimeout(() => {
        leaveTimeoutRef.current = undefined;
        setIsOpen(false);
        (typeof callback === 'function') && callback();
      }, delay);
    } else {
      setIsOpen(false);
      (typeof callback === 'function') && callback();
    }
  }, []);

  const onOpen = useCallback((callback) => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = enterDelay;
      openWithDelay(callback, delay);
    }

    if (typeof onOpenProp === 'function') {
      onOpenProp();
    }
  }, [isOpenProp, onOpenProp, openWithDelay, enterDelay]);

  const onClose = useCallback((callback) => {
    const isControlled = (isOpenProp !== undefined);
    if (!isControlled) {
      const delay = leaveDelay;
      closeWithDelay(callback, delay);
    }

    if (typeof onCloseProp === 'function') {
      onCloseProp();
    }
  }, [isOpenProp, onCloseProp, closeWithDelay, leaveDelay]);

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = undefined;
      }
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = undefined;
      }
    };
  }, []);

  const defaultId = useId();
  const tooltipId = `${config.name}:Tooltip-${defaultId}`;
  const tooltipTriggerId = `${config.name}:TooltipTrigger-${defaultId}`;

  const context = shallowMemo({
    arrow: (followCursor || nextToCursor) ? false : arrow,
    closeOnClick,
    closeOnEsc,
    closeOnPointerDown,
    disabled,
    followCursor,
    isOpen,
    mousePageX,
    mousePageY,
    nextToCursor,
    offset,
    onClose,
    onOpen,
    openOnFocus,
    portalled,
    placement,
    setMousePageX,
    setMousePageY,
    tooltipId,
    tooltipContentRef,
    tooltipTriggerId,
    tooltipTriggerRef,
  });

  if (typeof children === 'function') {
    return (
      <TooltipContext.Provider value={context}>
        {children(context)}
      </TooltipContext.Provider>
    );
  }

  return (
    <TooltipContext.Provider value={context}>
      <TooltipTrigger
        shouldWrapChildren={shouldWrapChildren}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        PopperComponent={PopperComponent}
        PopperProps={PopperProps}
        TooltipArrowComponent={TooltipArrowComponent}
        TooltipArrowProps={TooltipArrowProps}
        TransitionComponent={TransitionComponent}
        TransitionProps={TransitionProps}
        slots={slots}
        slotProps={slotProps}
        {...rest}
      >
        {label}
      </TooltipContent>
    </TooltipContext.Provider>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
