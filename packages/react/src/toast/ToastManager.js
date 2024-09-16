import { useHydrated } from '@tonic-ui/react-hooks';
import { runIfFn } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useCallback, useState } from 'react';
import { isElement, isValidElementType } from 'react-is';
import {
  TransitionGroup,
} from 'react-transition-group';
import { useDefaultProps } from '../default-props';
import { Portal } from '../portal';
import ToastContainer from './ToastContainer';
import ToastController from './ToastController';
import ToastTransition from './ToastTransition';
import { ToastManagerContext } from './context';

const uniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return String(id);
  };
})();

const getMemoizedState = memoize(state => ({ ...state }));

const defaultPlacement = 'bottom-right';
const placements = [
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

const ToastManager = (inProps) => {
  const {
    TransitionComponent = ToastTransition,
    TransitionProps,
    children,
    containerRef,
    placement: placementProp = defaultPlacement,
  } = useDefaultProps({ props: inProps, name: 'ToastManager' });
  const isHydrated = useHydrated();
  const [state, setState] = useState(() => (
    placements.reduce((acc, placement) => {
      acc[placement] = [];
      return acc;
    }, {})
  ));

  /**
   * Create properties for a new toast
   */
  const createToast = useCallback((message, options) => {
    const id = options?.id ?? uniqueId();
    const data = options?.data;
    const duration = options?.duration;
    const placement = ensureString(options?.placement ?? placementProp);
    const onClose = () => close(id, placement);

    return {
      // A unique identifier that represents the toast message
      id,

      // The user-defined data supplied to the toast
      data,

      // The toast message to render
      message,

      // The placement of the toast
      placement,

      // The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss.
      duration,

      // The function to close the toast
      onClose,
    };
  }, [close, placementProp]);

  /**
   * Close a toast record at its placement
   */
  const close = useCallback((id, placement) => {
    setState((prevState) => {
      placement = placement ?? getToastPlacementByState(prevState, id);

      return {
        ...prevState,
        [placement]: ensureArray(prevState[placement]).filter((toast) => toast.id !== id),
      };
    });
  }, []);

  /**
   * Close all toasts at once with the given placements, including the following:
   * • top
   * • top-left
   * • top-right
   * • bottom
   * • bottom-left
   * • bottom-right
   */
  const closeAll = useCallback((options) => {
    setState((prevState) => {
      const placements = options?.placements
        ? ensureArray(options?.placements)
        : Object.keys(prevState);
      const nextState = placements.reduce((acc, placement) => {
        acc[placement] = [];
        return acc;
      }, {});

      return {
        ...prevState,
        ...nextState,
      };
    });
  }, []);

  /**
   * Find the first toast in the array that matches the provided id. Otherwise, `undefined` is returned if not found.
   * If no values satisfy the testing function, undefined is returned.
   */
  const find = useCallback((id) => {
    const placement = getToastPlacementByState(state, id);
    return ensureArray(state[placement]).find((toast) => toast.id === id);
  }, [state]);

  /**
   * Find the first toast in the array that matches the provided id. Otherwise, -1 is returned if not found.
   */
  const findIndex = useCallback((id) => {
    const placement = getToastPlacementByState(state, id);
    return ensureArray(state[placement]).findIndex((toast) => toast.id === id);
  }, [state]);

  /**
   * Create a toast at the specified placement and return the id
   */
  const notify = useCallback((message, options) => {
    const toast = createToast(message, options);

    if (!placements.includes(toast.placement)) {
      console.error(`[ToastManager] Error: Invalid toast placement "${toast.placement}". Please provide a valid placement from the following options: ${placements.join(', ')}.`);
      return false;
    }

    setState((prevState) => {
      const limit = undefined; // TODO: Add a limit option for each placement
      const isTop = toast.placement.includes('top');

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
      const prevToasts = [...ensureArray(prevState[toast.placement])];
      let toasts = [];
      if (isTop) {
        const begin = 0;
        const end = limit > 0 ? limit : undefined;
        toasts = [toast, ...prevToasts].slice(begin, end);
      } else {
        // Negative index counts back from the end of the array — if start < 0, start + array.length is used.
        const begin = limit > 0 ? -limit : undefined;
        toasts = [...prevToasts, toast].slice(begin);
      }

      return {
        ...prevState,
        [toast.placement]: toasts,
      };
    });

    return toast.id;
  }, [createToast]);

  /**
   * Update a specific toast with new options based on the given id. Returns `true` if the toast exists, else `false`.
   */
  const update = useCallback((id, options) => {
    const placement = find(id)?.placement;
    const index = findIndex(id);

    if (!placement || index === -1) {
      return false;
    }

    setState((prevState) => {
      const nextState = { ...prevState };
      nextState[placement][index] = {
        ...nextState[placement][index],
        ...options,
      };
      return nextState;
    });

    return true;
  }, [find, findIndex]);

  const context = getMemoizedState({
    // Methods
    close,
    closeAll,
    find,
    findIndex,
    notify,
    update,

    // Properties
    placement: placementProp,

    // State
    state,
    setState,
  });

  return (
    <ToastManagerContext.Provider value={context}>
      {runIfFn(children, context)}
      {!!isHydrated && (
        <Portal
          containerRef={containerRef}
        >
          {Object.keys(state).map((placement) => {
            const toasts = ensureArray(state[placement]);
            return (
              <ToastContainer
                key={placement}
                placement={placement}
              >
                <TransitionGroup component={null}>
                  {toasts.map((toast) => (
                    <TransitionComponent
                      {...TransitionProps}
                      key={toast.id}
                      in={true}
                      unmountOnExit
                    >
                      <ToastController
                        duration={toast.duration}
                        onClose={toast.onClose}
                      >
                        {(() => {
                          if (isElement(toast.message)) {
                            return toast.message;
                          }
                          if (isValidElementType(toast.message)) {
                            return (
                              <toast.message
                                data={toast.data}
                                id={toast.id}
                                onClose={toast.onClose}
                                placement={toast.placement}
                              />
                            );
                          }
                          return null;
                        })()}
                      </ToastController>
                    </TransitionComponent>
                  ))}
                </TransitionGroup>
              </ToastContainer>
            );
          })}
        </Portal>
      )}
    </ToastManagerContext.Provider>
  );
};

ToastManager.displayName = 'ToastManager';

export default ToastManager;
