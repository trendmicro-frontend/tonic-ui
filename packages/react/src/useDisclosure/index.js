import { useEffectOnce } from '@tonic-ui/react-hooks';
import { useState, useCallback } from 'react';

const useDisclosure = defaultIsOpen => {
  useEffectOnce(() => {
    console.error('Warning: The `useDisclosure` Hook is deprecated and will be removed in the next major release.');
  });

  const [isOpen, setIsOpen] = useState(Boolean(defaultIsOpen));
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onToggle = useCallback(() => setIsOpen(prevIsOpen => !prevIsOpen), []);
  return { isOpen, onOpen, onClose, onToggle };
};

export default useDisclosure;
