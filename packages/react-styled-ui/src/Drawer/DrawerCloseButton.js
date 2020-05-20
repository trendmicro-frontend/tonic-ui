import { forwardRef } from 'react';
import { ModalCloseButton } from '../Modal';

const DrawerCloseButton = forwardRef(({ onClick, ...rest }, ref) => (
  <ModalCloseButton ref={ref} position="fixed" zIndex="1" {...rest} />
));

DrawerCloseButton.displayName = 'DrawerCloseButton';

export default DrawerCloseButton;
