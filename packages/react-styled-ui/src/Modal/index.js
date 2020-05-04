import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import ModalCloseButton from './ModalCloseButton';

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Trigger = ModalOverlay;
Modal.ModalCloseButton = ModalCloseButton;

export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
};

export default Modal;
