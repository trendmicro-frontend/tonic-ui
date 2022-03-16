import React, { forwardRef } from 'react';
import { Box } from '../box';
import { Slide } from '../transitions';
import useForkRef from '../utils/useForkRef';
import DrawerCloseButton from './DrawerCloseButton';
import DrawerContainer from './DrawerContainer';
import {
  useDrawerContentStyle,
} from './styles';
import useDrawer from './useDrawer';

const DrawerContentBase = forwardRef((
  {
    children,
    ...rest
  },
  ref,
) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const {
    closeOnEsc,
    isClosable,
    onClose,
    placement,
    size,
    contentRef, // internal use only
  } = { ...drawerContext };
  const combinedRef = useForkRef(ref, contentRef);
  const styleProps = useDrawerContentStyle({ placement, size });

  return (
    <Box
      ref={combinedRef}
      role="dialog"
      tabIndex={-1}
      onClick={event => event.stopPropagation()}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          event.stopPropagation();
          if (closeOnEsc) {
            (typeof onClose === 'function') && onClose(event);
          }
        }
      }}
      {...styleProps}
      {...rest}
    >
      {children}
      {!!isClosable && (
        <DrawerCloseButton onClick={onClose} />
      )}
    </Box>
  );
});

const DrawerContent = React.forwardRef((
  {
    TransitionComponent = Slide,
    TransitionProps,
    ...rest
  },
  ref,
) => {
  const drawerContext = useDrawer(); // context might be an undefined value

  if (!drawerContext) {
    return (
      <DrawerContentBase ref={ref} {...rest} />
    );
  }

  return (
    <DrawerContainer
      TransitionComponent={TransitionComponent}
      TransitionProps={TransitionProps}
    >
      <DrawerContentBase ref={ref} {...rest} />
    </DrawerContainer>
  );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
