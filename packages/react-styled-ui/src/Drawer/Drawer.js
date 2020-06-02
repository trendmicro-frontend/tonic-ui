import React from 'react';
import ModalBase from '../Modal/ModalBase';
import { Slide } from '../BasicTransition';
import { DrawerContext } from './context';

const Drawer = ({
  context: Context = DrawerContext,
  isOpen,
  onClose,
  isFullHeight,
  placement = 'right',
  size = 'md',
  children,
  closeOnOverlayClick = true,
  ...props
}) => {
  return (
    <Slide
      in={isOpen}
      from={placement}
      finalHeight={isFullHeight ? '100vh' : 'auto'}
    >
      {styles => (
        <Context.Provider value={{ styles, size }}>
          <ModalBase
            isOpen={true}
            onClose={onClose}
            closeOnOverlayClick={closeOnOverlayClick}
            formatIds={id => ({
              content: `trendmicro-styled-ui-drawer-${id}`,
              header: `trendmicro-styled-ui-drawer-${id}-header`,
              body: `trendmicro-styled-ui-drawer-${id}-body`,
            })}
            {...props}
          >
            {children}
          </ModalBase>
        </Context.Provider>
      )}
    </Slide>
  );
};

export default Drawer;
