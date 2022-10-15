import { useIsomorphicEffect, useOnceWhen } from '@tonic-ui/react-hooks';
import { canUseDOM, getOwnerDocument, noop, warnRemovedProps } from '@tonic-ui/utils';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../box';

const Portal = ({
  container: DEPRECATED_container, // deprecated
  isDisabled: DEPRECATED_isDisabled, // deprecated
  onRender: DEPRECATED_onRender, // deprecated

  children,
  containerRef,
}) => {
  { // deprecation warning
    const prefix = `${Portal.displayName}:`;

    useOnceWhen(() => {
      warnRemovedProps('container', {
        prefix,
        alternative: 'containerRef',
      });
    }, (DEPRECATED_container !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('isDisabled', {
        prefix,
      });
    }, (DEPRECATED_isDisabled !== undefined));

    useOnceWhen(() => {
      warnRemovedProps('onRender', {
        prefix,
      });
    }, (DEPRECATED_onRender !== undefined));
  }

  const [tempNode, setTempNode] = useState(null);
  const portalRef = useRef(null);
  const [, forceUpdate] = useState({});

  useIsomorphicEffect(() => {
    forceUpdate({});
  }, []);

  useIsomorphicEffect(() => {
    if (!tempNode) {
      return noop;
    }

    const doc = getOwnerDocument(tempNode);
    const containerEl = containerRef?.current;
    const host = containerEl ?? (canUseDOM() ? doc.body : undefined);
    if (!host) {
      return noop;
    }

    portalRef.current = doc.createElement('div');

    host.appendChild(portalRef.current);
    forceUpdate({});

    const portalNode = portalRef.current;

    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [tempNode]);

  if (!portalRef.current) {
    return (
      <Box
        ref={(node) => {
          if (node) {
            setTempNode(node);
          }
        }}
      />
    );
  }

  return createPortal(children, portalRef.current);
};

Portal.displayName = 'Portal';

export default Portal;
