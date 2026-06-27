import { useIsomorphicEffect } from '@tonic-ui/react-hooks';
import { getOwnerDocument, noop } from '@tonic-ui/utils';
import { useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useForceUpdate from '../utils/useForceUpdate';
import { PortalContext } from './context';

const PORTAL_CLASSNAME = 'tonic-ui-portal';
const PORTAL_SELECTOR = `.${PORTAL_CLASSNAME}`;

const Portal = (inProps) => {
  const {
    appendToParentPortal = false,
    children,
    containerRef,
  } = useDefaultProps({ props: inProps, name: 'Portal' });
  const [doc, setDoc] = useState(null);
  const [rootNode, setRootNode] = useState(null);
  const portalRef = useRef(null);
  const parentPortal = useContext(PortalContext);

  const forceUpdate = useForceUpdate();
  useIsomorphicEffect(() => {
    forceUpdate();
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

      // Default host resolution. `rootNode` is the native `Node.getRootNode()` of the
      // probe node — the root of the tree the portal is actually mounted in — so portals
      // land in the correct DOM context instead of always falling back to `document.body`:
      //
      //   where Portal is mounted | rootNode (node.getRootNode()) | host
      //   ----------------------- | ----------------------------- | ----------------------
      //   Shadow DOM              | ShadowRoot                    | the ShadowRoot
      //   iframe                  | the iframe's Document         | doc.body (iframe body)
      //   normal page             | Document                      | doc.body
      //
      // A `ShadowRoot` is the only root we portal into directly, and it is the only root
      // whose `.host` is an element (the shadow host). A `Document`, a detached `Element`,
      // or a plain `DocumentFragment` has no element host (note `<a>`/`<area>` expose a
      // *string* `.host`), so those fall back to `doc.body` — preserving the iframe and
      // normal-page behavior and avoiding an off-document host for detached trees.
      const defaultHost = (rootNode && rootNode.host?.nodeType === Node.ELEMENT_NODE)
        ? rootNode
        : doc.body;

      // `appendToParentPortal` nests inside the enclosing portal — but only when that portal
      // lives in the same document we render into. With no parent, or a parent from another
      // realm (e.g. an outer page's Portal whose React context crossed an iframe boundary, so
      // `parentPortal` belongs to the parent document while `doc` is the iframe's), fall back
      // to the default host so the portal stays in the correct document / shadow root instead
      // of being appended cross-document.
      if (appendToParentPortal && parentPortal?.ownerDocument === doc) {
        return parentPortal;
      }

      return defaultHost;
    })();

    if (!host) {
      return noop;
    }

    portalRef.current = doc.createElement('div');
    portalRef.current.className = PORTAL_CLASSNAME;

    host.appendChild(portalRef.current);
    forceUpdate();

    const portalNode = portalRef.current;

    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, [doc, rootNode]);

  if (!portalRef.current) {
    return (
      <Box
        ref={(node) => {
          if (node) {
            setDoc(getOwnerDocument(node));
            setRootNode(node.getRootNode());
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
