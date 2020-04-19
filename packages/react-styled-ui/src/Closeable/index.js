import memoize from 'micro-memoize';
import React, { useCallback } from 'react';
import { CloseableContext } from './context';

const getMemoizedState = memoize(state => ({ ...state }));

const Closeable = ({
  isCloseable,
  onClose,
  children,
}) => {
  const onCloseCallback = useCallback(() => {
    if (isCloseable) {
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }, [isCloseable, onClose]);
  const closeableState = getMemoizedState({
    isCloseable,
    onClose: onCloseCallback,
  });

  return (
    <CloseableContext.Provider value={closeableState}>
      {children}
    </CloseableContext.Provider>
  );
};

export default Closeable;
