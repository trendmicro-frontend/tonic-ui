import { Popper, Collapse } from '@tonic-ui/react';
import { useEventCallback } from '@tonic-ui/react-hooks';
import {
  callAllEventHandlers,
} from '@tonic-ui/utils';
import chainedFunction from 'chained-function';
import {
  ensureArray,
  ensureFunction,
} from 'ensure-type';
import React, { forwardRef, useMemo, useRef } from 'react';
import useForkRef from '../../utils/useForkRef';
import { useDatePickerContentStyle } from './styles';
import useDatePicker from './useDatePicker';

const DatePickerContent = forwardRef((
  {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
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
  } = { ...datePickerContext };

  const handleKeyDown = useEventCallback((event) => {
    if (event.key === 'Escape') {
      ensureFunction(onClose)();
    }
  }, [onClose]);

  const styleProps = useDatePickerContentStyle();

  const eventHandlers = {
    onKeyDown: callAllEventHandlers(onKeyDownProp, handleKeyDown),
  };

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

  return (
    <PopperComponent
      aria-labelledby={datePickerToggleId}
      anchorEl={datePickerToggleRef?.current}
      id={datePickerContentId}
      isOpen={isOpen}
      modifiers={popperModifiers}
      placement={placement}
      ref={datePickerContentRef}
      role="menu"
      tabIndex={-1}
      unmountOnExit={true}
      usePortal={false} // Pass `true` in `PopperProps` to render content in a portal
      willUseTransition={true}
      zIndex="dropdown"
      {...styleProps}
      {...eventHandlers}
      {...PopperProps}
      {...rest}
    >
      {({ placement, transition }) => {
        const { in: inProp, onEnter, onExited } = { ...transition };
        return (
          <TransitionComponent
            appear={true}
            easing="linear"
            timeout={{
              enter: 133,
              exit: Math.floor(133 * 0.7),
            }}
            {...TransitionProps}
            ref={combinedRef}
            in={inProp}
            onEnter={chainedFunction(
              onEnter,
              TransitionProps?.onEnter,
            )}
            onExited={chainedFunction(
              onExited,
              TransitionProps?.onExited,
            )}
          >
            {children}
          </TransitionComponent>
        );
      }}
    </PopperComponent>
  );
});

DatePickerContent.displayName = 'DatePickerContent';

export default DatePickerContent;
