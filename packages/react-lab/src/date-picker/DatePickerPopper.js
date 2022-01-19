import {
  Collapse,
  Popper,
} from '@tonic-ui/react';
import chainedFunction from 'chained-function';
import { ensureFunction } from 'ensure-type';
import React, { forwardRef, useRef } from 'react';
import useForkRef from '../utils/useForkRef';
import wrapEvent from '../utils/wrapEvent';
import { useDatePickerPopperStyle } from './styles';
import useDatePicker from './useDatePicker';

const DatePickerList = forwardRef((
  {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    offset,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    closeDatePicker,
    closeOnBlur,
    datePickerId,
    datePickerToggleId,
    datePickerToggleRef,
    datePickerRef,
    isOpen,
    onBlur,
    onKeyDown,
    placement,
    usePortal,
  } = { ...datePickerContext };

  // Close the menu on blur
  const handleBlur = event => {
    const target = event.relatedTarget || document.activeElement;
    const isClickingOutside =
      target &&
      !(datePickerRef?.current?.contains(target)) &&
      !(datePickerToggleRef?.current?.contains(target));
    const shouldCloseMenu = isOpen && closeOnBlur && isClickingOutside;

    if (shouldCloseMenu) {
      ensureFunction(closeDatePicker)();
    }

    ensureFunction(onBlur)(event);
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      ensureFunction(closeDatePicker)();
    }

    ensureFunction(onKeyDown)(event);
  };

  const styleProps = useDatePickerPopperStyle();

  const eventHandlers = {
    onBlur: wrapEvent(onBlurProp, handleBlur),
    onKeyDown: wrapEvent(onKeyDownProp, handleKeyDown),
  };

  return (
    <PopperComponent
      anchorEl={datePickerToggleRef?.current}
      aria-labelledby={datePickerToggleId}
      id={datePickerId}
      isOpen={isOpen}
      modifiers={{ offset }}
      placement={placement}
      ref={datePickerRef}
      role="menu"
      tabIndex={-1}
      unmountOnExit={true}
      usePortal={usePortal}
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

DatePickerList.displayName = 'DatePickerList';

export default DatePickerList;
