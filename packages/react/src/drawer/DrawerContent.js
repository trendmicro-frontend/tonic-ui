import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Slide } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import useForkRef from '../utils/useForkRef';
import DrawerCloseButton from './DrawerCloseButton';
import {
  useDrawerContentStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContent = forwardRef((
  {
    TransitionComponent = Slide,
    TransitionProps,
    children,
    ...rest
  },
  ref,
) => {
  const [, safeToRemove] = useAnimatePresence();
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    isOpen,
    onClose,
    placement,
    size,
    contentRef, // internal use only
  } = { ...drawerContext };
  const combinedRef = useForkRef(contentRef, ref);
  const styleProps = useDrawerContentStyle({ placement, size });
  const contentProps = {
    ref: combinedRef,
    role: 'dialog',
    tabIndex: -1,
    onClick: event => event.stopPropagation(),
    onKeyDown: event => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        if (closeOnEsc) {
          (typeof onClose === 'function') && onClose(event);
        }
      }
    },
    ...styleProps,
    ...rest,
  };
  const transitionDirection = {
    'left': 'right',
    'right': 'left',
    'top': 'down',
    'bottom': 'up',
  }[placement];

  return (
    <TransitionComponent
      appear={!!drawerContext}
      {...TransitionProps}
      {...contentProps}
      in={drawerContext ? isOpen : true}
      direction={transitionDirection}
      onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
    >
      {children}
      {!!isClosable && (
        <DrawerCloseButton onClick={onClose} />
      )}
    </TransitionComponent>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
