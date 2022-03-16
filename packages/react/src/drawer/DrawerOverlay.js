import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useColorMode } from '../color-mode';
import { useAnimatePresence } from '../utils/animate-presence';
import { Fade } from '../transitions';
import useDrawer from './useDrawer';

const DrawerOverlay = forwardRef(({
  TransitionComponent = Fade,
  TransitionProps,
  ...rest
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const { isOpen } = { ...drawerContext };
  const [, safeToRemove] = useAnimatePresence();
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(0, 0, 0, .7)',
    light: 'rgba(0, 0, 0, .7)', // TBD: light mode is not defined yet
  }[colorMode];
  const overlayStyleProps = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: backgroundColor,
    zIndex: 'drawer',
  };

  if (drawerContext) {
    return (
      <TransitionComponent
        appear={true}
        {...TransitionProps}
        in={isOpen}
        onExited={chainedFunction(safeToRemove, TransitionProps?.onExited)}
      >
        {(state, { ref, style: transitionStyle }) => (
          <Box
            ref={ref}
            {...overlayStyleProps}
            {...transitionStyle}
            {...rest}
          />
        )}
      </TransitionComponent>
    );
  }

  return (
    <Box ref={ref} {...overlayStyleProps} {...rest} />
  );
});

DrawerOverlay.displayName = 'DrawerOverlay';

export default DrawerOverlay;
