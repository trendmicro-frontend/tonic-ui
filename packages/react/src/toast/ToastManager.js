import { useHydrated } from '@tonic-ui/react-hooks';
import { isNullish, runIfFn } from '@tonic-ui/utils';
import { ensureArray, ensureString } from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useCallback, useState } from 'react';
import { useDefaultProps } from '../default-props';
import { Portal } from '../portal';
import { renderComponentOrValue } from '../utils/renderComponentOrValue';
import ToastContainer from './ToastContainer';
import ToastController from './ToastController';
import ToastTransition from './ToastTransition';
import ToastTransitionGroup from './ToastTransitionGroup';
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

  /**
   * Create a toast at the specified placement and return the id
   */
  const notify = useCallback((content, options) => {
    // A unique identifier that represents the toast
    const id = options?.id ?? uniqueId();
    // The user-defined data supplied to the toast
    const data = options?.data;
    // The duration (in milliseconds) that the toast should remain on the screen. If set to null, toast will never dismiss.
    const duration = options?.duration;
    // The placement of the toast
    const placement = ensureString(options?.placement ?? placementProp);

    const toast = Object.freeze({ id, content, data, duration, placement });

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
  }, [placementProp]);

  const context = getMemoizedState({
    // Methods
    close,
    closeAll,
    find,
    findIndex,
    update,
    notify,

    // Properties
    placement: placementProp,

    // State
    state,
    setState,
  });

  const createCloseToastHandler = (id, placement) => () => {
    close(id, placement);
  };

  return (
    <ToastManagerContext.Provider value={context}>
      {runIfFn(children, context)}
      {!!isHydrated && (
        <Portal
          containerRef={containerRef}
        >
          {Object.keys(state).map((placement) => {
            const toasts = ensureArray(state[placement]).filter(toast => !isNullish(toast));
            return (
              <ToastContainer
                key={placement}
                placement={placement}
              >
                <ToastTransitionGroup>
                  {toasts.map((toast) => {
                    const onClose = createCloseToastHandler(toast.id, placement);
                    return (
                      <TransitionComponent
                        key={toast.id}
                        in
                        unmountOnExit
                        {...TransitionProps}
                      >
                        <ToastController
                          duration={toast.duration}
                          onClose={onClose}
                        >
                          {renderComponentOrValue(toast.content, {
                            id: toast.id,
                            data: toast.data,
                            onClose,
                            placement: toast.placement,
                          })}
                        </ToastController>
                      </TransitionComponent>
                    );
                  })}
                </ToastTransitionGroup>
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
