import { useEventCallback, useMergeRefs, useOnceWhen } from '@tonic-ui/react-hooks';
import { callAll, callEventHandlers, warnDeprecatedProps } from '@tonic-ui/utils';
import { ensureArray, ensureFunction } from 'ensure-type';
import { forwardRef, useMemo, useRef } from 'react';
import useSlot from '../../utils/useSlot';
import { Collapse } from '../../transitions';
import { Popper } from '../../popper';
import { useDatePickerContentStyle } from './styles';
import useDatePicker from './useDatePicker';

const DatePickerContent = forwardRef((
  {
    PopperComponent, // deprecated
    PopperProps, // deprecated
    TransitionComponent, // deprecated
    TransitionProps, // deprecated
    slots = {},
    slotProps = {},
    children,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  { // deprecation warning
    const prefix = `${DatePickerContent.displayName}:`;
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
  }

  const nodeRef = useRef(null);
  const combinedRef = useMergeRefs(nodeRef, ref);
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    isOpen,
    datePickerContentId,
    datePickerContentRef,
    datePickerToggleId,
    datePickerToggleRef,
    offset,
    onClose,
    placement,
    portalled,
  } = { ...datePickerContext };

  const onKeyDown = useEventCallback((event) => {
    if (event.key === 'Escape') {
      ensureFunction(onClose)();
    }
  }, [onClose]);

  const styleProps = useDatePickerContentStyle();

  const [
    skidding = 0,
    distance = 0,
  ] = ensureArray(offset);
  const popperModifiers = useMemo(() => {
    const modifiers = [
      { // https://popper.js.org/docs/v2/modifiers/offset/
        name: 'offset',
        options: {
          offset: [skidding, distance],
        },
      },
    ];
    return modifiers;
  }, [skidding, distance]);

  const [PopperSlot, popperSlotProps] = useSlot({
    name: 'popper',
    ownerDisplayName: DatePickerContent.displayName,
    props: {
      ref: datePickerContentRef,
      'aria-labelledby': datePickerToggleId,
      id: datePickerContentId,
      isOpen,
      placement,
      referenceRef: datePickerToggleRef,
      role: 'menu',
      tabIndex: -1,
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
    ownerDisplayName: DatePickerContent.displayName,
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
        ...popperModifiers,
        ...ensureArray(popperSlotProps?.modifiers),
      ]}
      onKeyDown={callEventHandlers(onKeyDownProp, onKeyDown)}
      {...styleProps}
      {...rest}
    >
      {({ placement, transition }) => {
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

DatePickerContent.displayName = 'DatePickerContent';

export default DatePickerContent;
