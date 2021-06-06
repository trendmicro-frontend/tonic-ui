import {
  ensureArray,
  ensureString,
} from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM } from '../utils/dom';
import { createUniqueId } from '../utils/uniqueid';
import { ToastContext } from './context';
import ToastContainer from './ToastContainer';
import ToastController from './ToastController';

const uniqueId = createUniqueId();

const getMemoizedState = memoize(state => ({ ...state }));

const defaultPlacements = [
  'bottom',
  'bottom-right',
  'bottom-left',
  'top',
  'top-left',
  'top-right',
];

const getToastPlacementByState = (state, id) => {
  const toast = Object.values(state)
    .reduce((acc, val) => acc.concat(val), [])
    .find((toast) => toast.id === id);
  return toast?.placement;
};

const ToastProvider = ({
  autoDismiss = false,
  autoDismissTimeout = 5000,
  children,
  defaultPlacement = 'top-right',
  container,
}) => {
  const [isHydrated, setIsHydrated] = useState(false); // false for initial render
  const [state, setState] = useState(() => (
    defaultPlacements.reduce((acc, placement) => {
      acc[placement] = [];
      return acc;
    }, {})
  ));

  /**
   * Close all toasts at once with the given placements, including the following:
   * • top
   * • top-left
   * • top-right
   * • bottom
   * • bottom-left
   * • bottom-right
   */
  const closeAll = (options) => {
    const placements = options?.placements
      ? ensureArray(options?.placements)
      : Object.keys(state);

    setState((prevState) => {
      return placements.reduce((acc, placement) => {
        acc[placement] = ensureArray(prevState[placement]).map((toast) => ({
          ...toast,
          requestClose: true,
        }));

        return acc;
      }, {});
    });
  };

  /**
   * Request to close a toast based on its id and placement
   */
  const closeToast = (id) => {
    setState((prevState) => {
      const placement = getToastPlacementByState(state, id);

      if (!placement) {
        return prevState;
      }

      return {
        ...prevState,
        [placement]: prevState[placement].map((toast) => {
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
  const createToast = (content, options) => {
    const id = options?.id ?? uniqueId();
    const placement = ensureString(options?.placement) ?? defaultPlacement;
    return {
      id,
      content,
      placement,
      duration: options?.duration,
      onCloseComplete: options?.onCloseComplete,
      onRequestRemove: () => removeToast(id, placement),
      requestClose: false,
    };
  };

  /**
   * Find the toast that matches the id and return its placement and index
   */
  const findToast = (id) => {
    const placement = getToastPlacementByState(state, id);
    const index = placement
      ? state[placement].findIndex((toast) => toast.id === id)
      : -1;

    return {
      placement,
      index,
    };
  };

  /**
   * Check if toasts are appeared to the user
   */
  const hasToasts = () => {
    const toasts = Object.values(state)
      .reduce((acc, val) => acc.concat(val), []);
    return toasts.length > 0;
  };

  /**
   * Check if a specific toast is still visible
   */
  const isToastVisible = (id) => {
    const placement = getToastPlacementByState(state, id);
    return Boolean(placement);
  };

  /**
   * Create a toast at the specified placement and return the id
   */
  const notify = (content, options) => {
    const toast = createToast(content, options);
    const { placement, id } = toast;

    setState((prevState) => {
      const isTop = placement.includes('top');

      /**
       * For the toast is placemented at the top edges:
       *   toast #3 ← the most recent
       *   toast #2
       *   toast #1
       *
       * For the toast is placemented at the bottom edges:
       *   toast #1
       *   toast #2
       *   toast #3 ← the most recent
       */
      const prevToasts = ensureArray(prevState[placement]);
      const toasts = isTop
        ? [toast, ...prevToasts]
        : [...prevToasts, toast];

      return {
        ...prevState,
        [placement]: toasts,
      };
    });

    return id;
  };

  /**
   * Delete a toast record at its placement
   */
  const removeToast = (id, placement) => {
    setState((prevState) => ({
      ...prevState,
      [placement]: prevState[placement].filter((toast) => toast.id !== id),
    }));
  };

  /**
   * Update a specific toast with new options based on the given id
   */
  const updateToast = (id, options) => {
    setState((prevState) => {
      const nextState = { ...prevState };
      const { placement, index } = findToast(id);

      if (placement && index !== -1) {
        nextState[placement][index] = {
          ...nextState[placement][index],
          ...options,
        };
      }

      return nextState;
    });
  };

  const context = getMemoizedState({
    autoDismiss,
    autoDismissTimeout,
    defaultPlacement,
    state,

    closeAll,
    closeToast,
    findToast,
    hasToasts,
    isToastVisible,
    notify,
    removeToast,
    updateToast,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const portalTarget = canUseDOM()
    ? (container ?? document.body)
    : null;

  if (!portalTarget) {
    return (
      <ToastContext.Provider value={context}>
        {children}
      </ToastContext.Provider>
    );
  }

  return (
    <ToastContext.Provider value={context}>
      {children}
      {isHydrated && createPortal((
        Object.keys(state).map((placement) => {
          const toasts = ensureArray(state[placement]);
          return (
            <ToastContainer
              key={placement}
              placement={placement}
            >
              {toasts.map((toast) => (
                <ToastController
                  key={toast.id}
                  autoDismiss={autoDismiss}
                  autoDismissTimeout={autoDismissTimeout}
                >
                  {typeof toast.content === 'function'
                    // TODO: toast context
                    ? toast.content({ onClose: toast.onRequestRemove, placement: toast.placement })
                    : toast.content
                  }
                </ToastController>
              ))}
            </ToastContainer>
          );
        })
      ), portalTarget)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
