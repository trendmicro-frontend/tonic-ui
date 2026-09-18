import { useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, isNullish, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureArray } from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import { useDefaultProps } from '../default-props';
import { useSlot } from '../slot';
import { Popper } from '../popper';
import { Collapse } from '../transitions';
import { useAutocompleteListStyle } from './styles';
import useAutocompleteContext from './useAutocompleteContext';

/**
 * @typedef {Object} AutocompleteListProps
 * @property {{ popper?: React.ElementType; transition?: React.ElementType }} [slots] - Slot components. `slots.popper` replaces the default `Popper`; `slots.transition` replaces the default `Collapse`.
 * @property {{ popper?: object; transition?: object }} [slotProps] - Props forwarded to internal slots. `slotProps.popper` / `slotProps.transition` are applied to the Popper / transition elements.
 * @property {React.ElementType} [PopperComponent] - **Deprecated.** Use `slots.popper`. The component used for the popover.
 * @property {object} [PopperProps] - **Deprecated.** Use `slotProps.popper`. Props applied to the Popper component.
 * @property {React.ElementType} [TransitionComponent] - **Deprecated.** Use `slots.transition`. The component used for the transition.
 * @property {object} [TransitionProps] - **Deprecated.** Use `slotProps.transition`. Props applied to the Transition element.
 * @property {boolean} [TransitionProps.appear=true] - Whether to perform the enter transition when it first mounts.
 * @property {boolean} [matchWidth=false] - If `true`, sizes the list to match the input's `offsetWidth` via the Popper `matchWidth` modifier.
 * @property {string | number} [width] - Explicit width for the list. Ignored when `matchWidth` is set.
 * @property {React.ReactNode} [children] - The list items to render.
 */

/**
 * @type {ForwardRefComponent<'div', AutocompleteListProps>}
 */
const AutocompleteList = forwardRef((inProps, ref) => {
  const {
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    width: widthProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'AutocompleteList' });

  { // deprecation warning
    const prefix = `${AutocompleteList.displayName}:`;
    useOnceWhen(() => {
      warnDeprecatedProps('PopperComponent', {
        prefix,
        alternative: 'slots.popper',
        willRemove: true,
      });
    }, PopperComponent !== undefined);
    useOnceWhen(() => {
      warnDeprecatedProps('PopperProps', {
        prefix,
        alternative: 'slotProps.popper',
        willRemove: true,
      });
    }, PopperProps !== undefined);
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

  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const {
    anchorRef,
    contentRef,
    getListProps,
    isOpen,
    matchWidth,
    placement,
    portalled,
  } = { ...useAutocompleteContext() };
  const listProps = (typeof getListProps === 'function') ? getListProps() : {};
  const styleProps = useAutocompleteListStyle({
    contentWidth: widthProp,
    inputWidth: anchorRef?.current?.offsetWidth,
    matchWidth,
    portalled,
  });

  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/flip/
        name: 'flip',
        enabled: false, // Disable flip functionality
      },
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [0, 0],
        },
      },
    ];
    return modifiers;
  }, []);

  // Skip the popper when there's nothing to show — consumers can signal
  // "empty" by returning `null` from `renderContent`, and the empty Paper
  // background should not appear under the input.
  const hasContent = !isNullish(children);

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerName: AutocompleteList.displayName,
    props: {
      ref: contentRef,
      isOpen: Boolean(isOpen && hasContent),
      matchWidth,
      placement,
      referenceRef: anchorRef,
      unmountOnExit: true,
      portalled,
      willUseTransition: true,
      zIndex: 'dropdown',
    },
    slot: slots.popper ?? PopperComponent ?? Popper,
    slotProps: { ...PopperProps, ...slotProps.popper },
  });

  const [TransitionSlot, transitionSlotProps] = useSlot({
    name: 'transition',
    ownerName: AutocompleteList.displayName,
    props: {
      ref: combinedRef,
      appear: true,
      easing: 'linear',
      timeout: {
        enter: 133,
        exit: Math.floor(133 * 0.7),
      },
    },
    slot: slots.transition ?? TransitionComponent ?? Collapse,
    slotProps: { ...TransitionProps, ...slotProps.transition },
  });

  return (
    <PopperSlot
      {...popperSlotProps}
      modifiers={[
        // Default modifiers
        ...popperModifiers,
        // User-defined modifiers
        ...ensureArray(popperSlotProps?.modifiers),
      ]}
      {...styleProps}
      {...rest}
      {...listProps}
    >
      {({ transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionSlot
            {...transitionSlotProps}
            in={inProp}
            onEnter={callAll(
              onEnter,
              transitionSlotProps.onEnter,
            )}
            onExited={callAll(
              onExited,
              transitionSlotProps.onExited,
            )}
          >
            {children}
          </TransitionSlot>
        );
      }}
    </PopperSlot>
  );
});

AutocompleteList.displayName = 'AutocompleteList';

export default AutocompleteList;
