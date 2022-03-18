import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useAnimatePresence } from '../utils/animate-presence';
import { Slide } from '../transitions';
import {
  useDrawerContainerStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContainer = forwardRef((
  {
    TransitionComponent = Slide,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    backdrop,
    closeOnOutsideClick,
    isOpen,
    onClose,
    placement,
  } = { ...drawerContext };
  const [, safeToRemove] = useAnimatePresence();
  const styleProps = useDrawerContainerStyle({ backdrop, placement });
  const transitionDirection = {
    'left': 'right',
    'right': 'left',
    'top': 'down',
    'bottom': 'up',
  }[placement];

  return (
    <TransitionComponent
      appear={true}
      {...TransitionProps}
      in={isOpen}
      direction={transitionDirection}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {(state, { ref, style: transitionStyle }) => (
        <Box
          ref={ref}
          onClick={event => {
            event.stopPropagation();
            if (closeOnOutsideClick) {
              (typeof onClose === 'function') && onClose(event);
            }
          }}
          {...styleProps}
          {...transitionStyle}
          {...rest}
        />
      )}
    </TransitionComponent>
  );
});

export default DrawerContainer;
