import { useMergeRefs } from '@tonic-ui/react-hooks';
import { ariaAttr, callAll } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { useDefaultProps } from '../default-props';
import { Slide } from '../transitions';
import { useAnimatePresence } from '../utils/animate-presence';
import DrawerCloseButton from './DrawerCloseButton';
import {
  useDrawerContentStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContent = forwardRef((inProps, ref) => {
  const {
    TransitionComponent = Slide,
    TransitionProps,
    children,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'DrawerContent' });
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
  const combinedRef = useMergeRefs(contentRef, ref);
  const tabIndex = -1;
  const styleProps = useDrawerContentStyle({ placement, size, tabIndex });
  const contentProps = {
    'aria-modal': ariaAttr(true),
    ref: combinedRef,
    role: 'dialog',
    tabIndex,
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
      onExited={callAll(safeToRemove, TransitionProps?.onExited)}
    >
      {children}
      {!!isClosable && (
        <DrawerCloseButton />
      )}
    </TransitionComponent>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
