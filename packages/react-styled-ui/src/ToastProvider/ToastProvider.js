import {
  ensureArray,
  ensureString,
} from 'ensure-type';
import memoize from 'micro-memoize';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isElement, isValidElementType } from 'react-is';
import {
  Transition,
  TransitionGroup,
} from 'react-transition-group';
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
   * Create properties for a new toast
   */
  const createToast = (content, options) => {
    const id = options?.id ?? uniqueId();
    const placement = ensureString(options?.placement) ?? defaultPlacement;
    return {
      /**
       * The element or component to render.
       */
      content,

      /**
       * The toast's id
       */
      id,

      /**
       * The placement of the toast
       */
      placement,

      /**
       * The duration of the toast
       */
      duration: options?.duration,

      /**
       * Function that closes the toast from manager's state
       */
      onClose: () => close(id, placement),
    };
  };

  /**
   * Close a toast record at its placement
   */
  const close = (id, placement) => {
    placement = placement ?? getToastPlacementByState(state, id);

    setState((prevState) => ({
      ...prevState,
      [placement]: ensureArray(prevState[placement]).filter((toast) => toast.id !== id),
    }));
  };

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
      const nextState = placements.reduce((acc, placement) => {
        acc[placement] = [];
        return acc;
      }, {});

      return {
        ...prevState,
        ...nextState,
      };
    });
  };

  /**
   * Find the first toast in the array that matches the provided id. Otherwise, `undefined` is returned if not found.
   * If no values satisfy the testing function, undefined is returned.
   */
  const find = (id) => {
    const placement = getToastPlacementByState(state, id);
    return ensureArray(state[placement]).find((toast) => toast.id === id);
  };

  /**
   * Find the first toast in the array that matches the provided id. Otherwise, -1 is returned if not found.
   */
  const findIndex = (id) => {
    const placement = getToastPlacementByState(state, id);
    return ensureArray(state[placement]).findIndex((toast) => toast.id === id);
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
   * Update a specific toast with new options based on the given id
   */
  const update = (id, options) => {
    setState((prevState) => {
      const nextState = { ...prevState };
      const placement = find(id)?.placement;
      const index = findIndex(id);

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
    defaultPlacement,
    state,

    find,
    findIndex,
    notify,
    close,
    closeAll,
    update,
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
              hasToasts={toasts.length > 0}
              placement={placement}
            >
              <TransitionGroup component={null}>
                {toasts.map((toast) => (
                  <Transition
                    key={toast.id}
                    appear
                    mountOnEnter
                    timeout={220} // TODO: transition timeout
                    unmountOnExit
                  >
                    {transitionState => {
                      // TODO: transition state
                      return (
                        <ToastController
                          key={toast.id}
                          duration={toast.duration}
                          onClose={toast.onClose}
                        >
                          {(() => {
                            if (isElement(toast.content)) {
                              return toast.content;
                            }
                            if (isValidElementType(toast.content)) {
                              return (
                                <toast.content
                                  id={toast.id}
                                  onClose={toast.onClose}
                                  placement={toast.placement}
                                />
                              );
                            }
                            return null;
                          })()}
                        </ToastController>
                      );
                    }}
                  </Transition>
                ))}
              </TransitionGroup>
            </ToastContainer>
          );
        })
      ), portalTarget)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
