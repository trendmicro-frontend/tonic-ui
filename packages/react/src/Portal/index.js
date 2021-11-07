import { Children, cloneElement, useState, forwardRef } from 'react';
import { findDOMNode, createPortal } from 'react-dom';
import setRef from '../utils/setRef';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  return findDOMNode(container);
}

const Portal = forwardRef(
  ({ children, container, isDisabled = false, onRendered }, ref) => {
    const [mountNode, setMountNode] = useState(null);
    const handleRef = useForkRef(children.ref, ref);
    useEnhancedEffect(() => {
      if (!isDisabled) {
        setMountNode(getContainer(container) || document.body);
      }
    }, [container, isDisabled]);

    useEnhancedEffect(() => {
      if (mountNode && !isDisabled) {
        setRef(ref, mountNode);
        return () => {
          setRef(ref, null);
        };
      }

      return undefined;
    }, [ref, mountNode, isDisabled]);

    useEnhancedEffect(() => {
      if (onRendered && (mountNode || isDisabled)) {
        onRendered();
      }
    }, [onRendered, mountNode, isDisabled]);

    if (isDisabled) {
      Children.only(children);
      return cloneElement(children, {
        ref: handleRef,
      });
    }
    return mountNode ? createPortal(children, mountNode) : mountNode;
  },
);

Portal.displayName = 'Portal';

export default Portal;
