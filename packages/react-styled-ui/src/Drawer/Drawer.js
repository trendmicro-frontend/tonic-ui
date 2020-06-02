import { Slide } from '../BasicTransition';
import ModalBase from '../Modal/ModalBase';
import config from '../shared/config';
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
              content: `${config.name}:drawer-content-${id}`,
              header: `${config.name}:drawer-header-${id}`,
              body: `${config.name}:drawer-body-${id}`,
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
