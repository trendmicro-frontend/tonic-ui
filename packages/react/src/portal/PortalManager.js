import React, { useCallback, useState } from 'react';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import Portal from './Portal';
import { PortalManagerContext } from './context';

const uniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return String(id);
  };
})();

/**
 * @typedef {Object} PortalManagerProps
 * @property {React.ReactNode} [children] - The content to be rendered within the portal manager.
 * @property {React.RefObject} [containerRef] - A `ref` to the component where the portals will be rendered.
 */

/**
 * @type {StyledFC<PortalManagerProps>}
 */
const PortalManager = (inProps) => {
  const {
    children,
    containerRef: containerRefProp,
  } = useDefaultProps({ props: inProps, name: 'PortalManager' });
  const shallowMemo = useShallowMemo();
  const [portals, setPortals] = useState([]);
  const add = useCallback((render, options) => {
    const id = options?.id ?? uniqueId();
    const appendToParentPortal = options?.appendToParentPortal;
    const containerRef = options?.containerRef ?? containerRefProp;
    setPortals((portals) => ([
      ...portals,
      { id, appendToParentPortal, containerRef, render },
    ]));
    return id;
  }, [containerRefProp]);
  const remove = useCallback(id => {
    setPortals(portals => portals.filter(portal => portal.id !== id));
  }, []);

  const context = shallowMemo({ add, remove });

  return (
    <PortalManagerContext.Provider value={context}>
      {portals.map(portal => (
        <Portal
          key={portal.id}
          appendToParentPortal={portal.appendToParentPortal}
          containerRef={portal.containerRef}
        >
          {portal.render(() => remove(portal.id))}
        </Portal>
      ))}
      {children}
    </PortalManagerContext.Provider>
  );
};

PortalManager.displayName = 'PortalManager';

export default PortalManager;
