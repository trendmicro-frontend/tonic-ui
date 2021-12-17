import chainedFunction from 'chained-function';
import React, { forwardRef } from 'react';
import Box from '../Box';
import Fade from '../Transitions/Fade';
import useColorMode from '../useColorMode';
import useDrawer from './useDrawer';
import usePresence from '../usePresence';

const DrawerOverlay = forwardRef(({
  TransitionComponent = Fade,
  TransitionProps,
  ...rest
}, ref) => {
  const drawerContext = useDrawer(); // context might be an undefined value
  const { isOpen } = { ...drawerContext };
  const [, safeToRemove] = usePresence();
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
