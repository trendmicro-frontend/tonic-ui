import memoize from 'micro-memoize';
import React, { useCallback } from 'react';
import { CloseableContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Closeable = ({
  closeable,
  onClose,
  children,
}) => {
  const onCloseCallback = useCallback(() => {
    if (closeable) {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }, [closeable, onClose]);
  const closeableState = getMemoizedState({
    closeable,
    onClose: onCloseCallback,
  });

  return (
    <CloseableContext.Provider value={closeableState}>
      {children}
    </CloseableContext.Provider>
  );
};

export default Closeable;
