import React from 'react';
import ModalBase from './ModalBase';
import ModalContent from './ModalContent';
import ModalOverlay from './ModalOverlay';

const Modal = (props) => {
  return (
    <ModalBase {...props}>
      <ModalOverlay />
      <ModalContent>
        {props.children}
      </ModalContent>
    </ModalBase>
  );
};

Modal.displayName = 'Modal';

export default Modal;
