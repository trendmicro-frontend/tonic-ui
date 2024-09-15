import memoize from 'micro-memoize';
import React, { useCallback, useState } from 'react';
import { useDefaultProps } from '../default-props';
import Portal from './Portal';
import { PortalManagerContext } from './context';

const uniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return String(id);
  };
})();

const getMemoizedState = memoize(state => ({ ...state }));

const PortalManager = (inProps) => {
  const {
    children,
    containerRef: containerRefProp,
  } = useDefaultProps({ props: inProps, name: 'PortalManager' });
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
  const context = getMemoizedState({ add, remove });

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
