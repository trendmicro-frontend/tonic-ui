import ModalBase from '../Modal/ModalBase';
import { Slide } from '../BasicTransition';
import { DrawerContext } from './context';
import DrawerOverlay from './DrawerOverlay';
import DrawerContent from './DrawerContent';

const Drawer = ({
  context: Context = DrawerContext,
  isOpen,
  onClose,
  isFullHeight,
  placement = 'right',
  size = 'md',
  children,
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
            formatIds={id => ({
              content: `trendmicro-styled-ui-drawer-${id}`,
              header: `trendmicro-styled-ui-drawer-${id}-header`,
              body: `trendmicro-styled-ui-drawer-${id}-body`,
            })}
            {...props}
          >
            <DrawerOverlay />
            <DrawerContent>
              {children}
            </DrawerContent>
          </ModalBase>
        </Context.Provider>
      )}
    </Slide>
  );
};

export default Drawer;
