import React from 'react';
import { usePortalManager } from '@tonic-ui/react';

function UsePortalManagerExample() {
  const portalManager = usePortalManager();

  // Call as a function (alias for add)
  const id = portalManager((remove) => <div><button type="button" onClick={remove}>Close</button></div>);

  // add with options
  portalManager.add(
    (remove) => <div><button type="button" onClick={remove}>Close</button></div>,
    { id: 'my-portal', appendToParentPortal: true }
  );

  // remove by id
  portalManager.remove('my-portal');

  return null;
}
