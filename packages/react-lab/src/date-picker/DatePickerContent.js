import {
  Collapse,
  Popper,
} from '@tonic-ui/react';
import chainedFunction from 'chained-function';
import React, { forwardRef, useRef } from 'react';
import useForkRef from '../utils/useForkRef';
import { useDatePickerContentStyle } from './styles';
import useDatePicker from './useDatePicker';

const DatePickerContent = forwardRef((
  {
    PopperComponent = Popper,
    PopperProps,
    TransitionComponent = Collapse,
    TransitionProps,
    children,
    offset,
    ...rest
  },
  ref,
) => {
  const nodeRef = useRef(null);
  const combinedRef = useForkRef(nodeRef, ref);
  const datePickerContext = useDatePicker(); // context might be an undefined value
  const {
    datePickerId,
    datePickerToggleId,
    datePickerToggleRef,
    datePickerRef,
    isOpen,
    placement,
  } = { ...datePickerContext };

  const styleProps = useDatePickerContentStyle();

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
      willUseTransition={true}
      zIndex="dropdown"
      {...styleProps}
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
