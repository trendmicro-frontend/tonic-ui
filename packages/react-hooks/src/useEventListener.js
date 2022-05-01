import { useEffect } from 'react';
import useEventCallback from './useEventCallback';

// TODO: move to '@tonic-ui/utils'
const noop = () => {};

// TODO: move to '@tonic-ui/utils'
const runIfFn = (valueOrFn, ...args) => {
  if (typeof valueOrFn === 'function') {
    return valueOrFn(...args);
  }
  return valueOrFn;
};

/**
 * A custom Hook to manage browser event listeners.
 *
 * @param {HTMLElement} target - The target element to attach the event listener to.
 * @param {string} eventName - The name of the event to listen for.
 * @param {function} eventHandler - The event handler to call when the event is fired.
 * @param {object} [options] - Optional options to pass to the event handler.
 */
const useEventListener = (
  target,
  eventName,
  eventHandler,
  options,
) => {
  const eventListener = useEventCallback(eventHandler);

  useEffect(() => {
    if (!eventHandler) {
      return noop;
    }

    const eventTarget = runIfFn(target);
    const isEventListenerSupported = (typeof eventTarget?.addEventListener === 'function') && (typeof eventTarget?.removeEventListener === 'function');
    if (!isEventListenerSupported) {
      return noop;
    }

    eventTarget.addEventListener(eventName, eventListener, options);
    return () => {
      eventTarget.removeEventListener(eventName, eventListener, options);
    };
  }, [target, eventName, eventHandler, eventListener, options]);
};

export default useEventListener;
