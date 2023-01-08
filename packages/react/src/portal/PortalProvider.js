import { Portal } from '@tonic-ui/react';
import memoize from 'micro-memoize';
import React, { useCallback, useState } from 'react';
import { PortalContext } from './context';

const uniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return String(id);
  };
})();

const getMemoizedState = memoize(state => ({ ...state }));

const PortalProvider = ({
  children,
  containerRef: containerRefProp,
}) => {
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
    <PortalContext.Provider value={context}>
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
    </PortalContext.Provider>
  );
};

PortalProvider.displayName = 'PortalProvider';

export default PortalProvider;
