import { Modal } from '../Modal';
import { Slide } from '../BasicTransition';
import { DrawerContext } from './context';

const Drawer = ({
  isOpen,
  onClose,
  isFullHeight,
  placement = 'right',
  finalFocusRef,
  size = 'xs',
  ...props
}) => {
  return (
    <Slide
      in={isOpen}
      from={placement}
      finalHeight={isFullHeight ? '100vh' : 'auto'}
    >
      {styles => (
        <DrawerContext.Provider value={{ styles, size }}>
          <Modal
            isOpen={true}
            onClose={onClose}
            finalFocusRef={finalFocusRef}
            formatIds={id => ({
              content: `trendmicro-styled-ui-drawer-${id}`,
              header: `trendmicro-styled-ui-drawer-${id}-header`,
              body: `trendmicro-styled-ui-drawer-${id}-body`,
            })}
            {...props}
          />
        </DrawerContext.Provider>
      )}
    </Slide>
  );
};

export default Drawer;
