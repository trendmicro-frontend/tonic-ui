import { useIsomorphicEffect, useMergeRefs } from '@tonic-ui/react-hooks';
import { Children, cloneElement, useState, forwardRef } from 'react';
import { findDOMNode, createPortal } from 'react-dom'; // FIXME: React 18 compatibility
import { assignRef } from '../utils/refs';

function getContainer(container) {
  container = typeof container === 'function' ? container() : container;
  return findDOMNode(container);
}

const Portal = forwardRef(
  ({ children, container, isDisabled = false, onRendered }, ref) => {
    const [mountNode, setMountNode] = useState(null);
    const handleRef = useMergeRefs(children.ref, ref);
    useIsomorphicEffect(() => {
      if (!isDisabled) {
        setMountNode(getContainer(container) || document.body);
      }
    }, [container, isDisabled]);

    useIsomorphicEffect(() => {
      if (mountNode && !isDisabled) {
        assignRef(ref, mountNode);
        return () => {
          assignRef(ref, null);
        };
      }

      return undefined;
    }, [ref, mountNode, isDisabled]);

    useIsomorphicEffect(() => {
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
