import { useEffect, useMemo } from 'react';
import { getOwnerDocument } from '@tonic-ui/utils';

/**
 * Hook that detects clicks outside one or more elements.
 * Suitable for modals, popovers, drawers, and menus.
 *
 * @param {React.RefObject|React.RefObject[]} refs - A single ref or an array of refs to detect outside clicks from.
 * @param {function(Event): void} handler - The callback function triggered when the click happens outside the referenced elements.
 * @param {Object} [options] - Optional configuration.
 * @param {Array<string>} [options.events=['mousedown', 'touchstart']] - List of event types to listen for.
 * @param {boolean} [options.shouldAllRefsOutside=true] - Whether to trigger the handler when all refs are clicked outside. Otherwise, trigger the handler when some (but not all) refs are clicked outside.
 */

const useClickOutside = (refs, handler, options = {}) => {
  const {
    events = ['mousedown', 'touchstart'],
    shouldAllRefsOutside = true,
  } = options;

  // Ensure refs is always an array, even if a single ref is passed
  const allRefs = useMemo(() => {
    return Array.isArray(refs) ? refs : [refs];
  }, [refs]);

  useEffect(() => {
    const handleCheckIfOutside = (event) => {
      let allOutside = true;
      let anyOutside = false;

      for (let i = 0; i < allRefs.length; i++) {
        const ref = allRefs[i];
        const el = ref?.current;
        const doc = getOwnerDocument(el);
        if (el && doc) {
          const isOutside = !el.contains(event.target);
          if (isOutside) {
            anyOutside = true;
          } else {
            allOutside = false;
          }

          // If `shouldAllRefsOutside` is true and one ref is inside, stop further checks
          if (shouldAllRefsOutside && !isOutside) {
            return; // If one element is not outside, stop checking
          }
        }
      }

      // Trigger handler if conditions are met:
      if ((shouldAllRefsOutside && allOutside) || (!shouldAllRefsOutside && anyOutside)) {
        handler(event);
      }
    };

    const filteredEvents = (Array.isArray(events) ? events : [])
      .filter(x => (typeof x === 'string'));

    // Attach event listeners to the document of each ref
    allRefs.forEach(ref => {
      const doc = getOwnerDocument(ref?.current);
      if (!doc) {
        return;
      }
      filteredEvents.forEach(eventName => {
        doc.addEventListener?.(eventName, handleCheckIfOutside, true);
      });
    });

    return () => {
      allRefs.forEach(ref => {
        const doc = getOwnerDocument(ref?.current);
        if (!doc) {
          return;
        }
        filteredEvents.forEach(eventName => {
          doc.removeEventListener?.(eventName, handleCheckIfOutside, true);
        });
      });
    };
  }, [allRefs, handler, events, shouldAllRefsOutside]);
};

export default useClickOutside;
