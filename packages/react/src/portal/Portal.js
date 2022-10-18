import { useIsomorphicEffect, useOnceWhen } from '@tonic-ui/react-hooks';
import { getOwnerDocument, noop, warnRemovedProps } from '@tonic-ui/utils';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../box';
import { PortalContext } from './context';
import usePortal from './usePortal';

const PORTAL_CLASSNAME = 'tonic-ui-portal';
const PORTAL_SELECTOR = `.${PORTAL_CLASSNAME}`;

const Portal = ({
  container: DEPRECATED_container, // deprecated
  isDisabled: DEPRECATED_isDisabled, // deprecated
  onRender: DEPRECATED_onRender, // deprecated

  appendToParentPortal = false,
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

  const [doc, setDoc] = useState(null);
  const portalRef = useRef(null);
  const parentPortal = usePortal();

  const [, forceUpdate] = useState({});
  useIsomorphicEffect(() => {
    forceUpdate({});
  }, []);

  useIsomorphicEffect(() => {
    if (!doc) {
      return noop;
    }

    const containerEl = containerRef?.current;
    const host = (() => {
      if (containerEl) {
        return containerEl;
      }

      if (appendToParentPortal) {
        return parentPortal ?? doc.body;
      }

      return doc.body;
    })();

    if (!host) {
      return noop;
    }

    portalRef.current = doc.createElement('div');
    portalRef.current.className = PORTAL_CLASSNAME;

    host.appendChild(portalRef.current);
    forceUpdate({});

    const portalNode = portalRef.current;

    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [doc]);

  if (!portalRef.current) {
    return (
      <Box
        ref={(node) => {
          if (node) {
            const ownerDocument = getOwnerDocument(node);
            setDoc(ownerDocument);
          }
        }}
      />
    );
  }

  return createPortal(
    <PortalContext.Provider value={portalRef.current}>
      {children}
    </PortalContext.Provider>,
    portalRef.current,
  );
};

Portal.className = PORTAL_CLASSNAME;
Portal.selector = PORTAL_SELECTOR;

Portal.displayName = 'Portal';

export default Portal;
