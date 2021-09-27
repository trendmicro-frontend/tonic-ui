import { useEffect, useRef } from 'react';
import { canUseDOM } from './dom';

const useNodeRef = ({
  isOpen,
  id,
  container = canUseDOM() ? document.body : null,
}) => {
  const mountRef = useRef(
    canUseDOM()
      ? document.getElementById(id) || document.createElement('div')
      : null,
  );

  useEffect(() => {
    let mountNode = mountRef.current;

    if (isOpen && canUseDOM()) {
      mountRef.current.id = id;
      container.appendChild(mountRef.current);
    }

    return () => {
      if (mountNode.parentElement) {
        mountNode.parentElement.removeChild(mountNode);
      }
    };
  }, [isOpen, id, container]);

  return mountRef;
};

export default useNodeRef;
