import {
  ensureArray,
  ensureString,
} from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useState } from 'react';
import { createUniqueId } from '../utils/uniqueid';

const uniqueId = createUniqueId();

const getMemoizedState = memoize(state => ({ ...state }));

const allPositions = [
  'bottom',
  'bottom-right',
  'bottom-left',
  'top',
  'top-left',
  'top-right',
];

const getToastPositionByState = (state, id) => {
  const toast = Object.values(state)
    .reduce((acc, val) => acc.concat(val), [])
    .find((toast) => toast.id === id);
  return toast?.position;
};

const ToastManagerContext = React.createContext();

const ToastManager = ({
  children,
}) => {
  const [state, setState] = useState({});

  /**
   * Close all toasts at once with the given positions, including the following:
   * • top
   * • top-left
   * • top-right
   * • bottom
   * • bottom-left
   * • bottom-right
   */
  const closeAll = (options) => {
    const positions = options?.positions
      ? ensureArray(options?.positions)
      : allPositions;

    setState((prevState) => {
      return positions.reduce((acc, position) => {
        acc[position] = prevState[position].map((toast) => ({
          ...toast,
          requestClose: true,
        }));

        return acc;
      }, {});
    });
  };

  /**
   * Request to close a toast based on its id and position
   */
  const closeToast = (id) => {
    setState((prevState) => {
      const position = getToastPositionByState(state, id);

      if (!position) {
        return prevState;
      }

      return {
        ...prevState,
        [position]: prevState[position].map((toast) => {
          if (toast.id !== id) {
            return toast;
          }

          return {
            ...toast,
            requestClose: true,
          };
        }),
      };
    });
  };

  /**
   * Create properties for a new toast
   */
  const createToast = (message, options) => {
    const id = options?.id ?? uniqueId();
    const position = ensureString(options?.position) ?? 'top';
    return {
      id,
      message,
      position,
      duration: options?.duration,
      onCloseComplete: options?.onCloseComplete,
      onRequestRemove: () => removeToast(id, position),
      requestClose: false,
    };
  };

  /**
   * Find the toast that matches the id and return its position and index
   */
  const findToast = (id) => {
    const position = getToastPositionByState(state, id);
    const index = position
      ? state[position].findIndex((toast) => toast.id === id)
      : -1;

    return {
      position,
      index,
    };
  };

  /**
   * Check if a specific toast is still visible
   */
  const isToastVisible = (id) => {
    const position = getToastPositionByState(state, id);
    return Boolean(position);
  };

  /**
   * Create a toast at the specified position and return the id
   */
  const notify = (message, options) => {
    const toast = createToast(message, options);
    const { position, id } = toast;

    setState((prevState) => {
      const isTop = position.includes('top');

      /**
       * For the toast is positioned at the top edges:
       *   toast #3 ← the most recent
       *   toast #2
       *   toast #1
       *
       * For the toast is positioned at the bottom edges:
       *   toast #1
       *   toast #2
       *   toast #3 ← the most recent
       */
      const toasts = isTop
        ? [toast, ...prevState[position]]
        : [...prevState[position], toast];

      return {
        ...prevState,
        [position]: toasts,
      };
    });

    return id;
  };

  /**
   * Delete a toast record at its position
   */
  const removeToast = (id, position) => {
    setState((prevState) => ({
      ...prevState,
      [position]: prevState[position].filter((toast) => toast.id !== id),
    }));
  };

  /**
   * Update a specific toast with new options based on the given id
   */
  const updateToast = (id, options) => {
    setState((prevState) => {
      const nextState = { ...prevState };
      const { position, index } = findToast(id);

      if (position && index !== -1) {
        nextState[position][index] = {
          ...nextState[position][index],
          ...options,
        };
      }

      return nextState;
    });
  };

  const toastManagerState = getMemoizedState({
    state,
    closeAll,
    closeToast,
    findToast,
    isToastVisible,
    notify,
    removeToast,
    updateToast,
  });

  return (
    <ToastManagerContext.Provider value={toastManagerState}>
      {children}
    </ToastManagerContext.Provider>
  );
};

export default ToastManager;
export { ToastManagerContext };
