import { useEffect } from 'react';
import useEventCallback from './useEventCallback';

// TODO: move to '@tonic-ui/utils'
const noop = () => {};

// TODO: move to '@tonic-ui/utils'
const ownerDocument = (node) => (node?.ownerDocument || document);

const defaultEvents = ['mouseup', 'touchend'];

/**
 * Checks if a click happened outside a Ref. Handy for dropdowns, modals and popups etc.
 *
 * @param {React.RefObject} ref - A ref object to check if the click happened outside of it.
 * @param {function} handler - The handler to call if the click happened outside of the ref.
 * @param {(boolean|Array<string>)} [events] - The events to listen to. If `false` is given, it will not listen to any events. Defaults to `['mouseup', 'touchend']`.
 */
const useOutsideClick = (
  ref,
  handler,
  events = defaultEvents,
) => {
  const savedHandler = useEventCallback((event) => {
    const el = ref?.current;
    el && !el?.contains?.(event.target) && handler(event);
  }, [handler]);

  useEffect(() => {
    if (!events) {
      return noop;
    }

    const filteredEvents = (Array.isArray(events) ? events : [])
      .filter(x => (typeof x === 'string'));
    const doc = ownerDocument(ref?.current);

    for (const eventName of filteredEvents) {
      doc?.addEventListener?.(eventName, savedHandler, true);
    }

    return () => {
      for (const eventName of filteredEvents) {
        doc?.removeEventListener?.(eventName, savedHandler, true);
      }
    };
  }, [ref, savedHandler, events]);
};

export default useOutsideClick;
