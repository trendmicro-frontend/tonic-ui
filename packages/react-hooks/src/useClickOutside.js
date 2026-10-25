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
 */

const useClickOutside = (refs, handler, options = {}) => {
  const {
    events = ['mousedown', 'touchstart'],
  } = options;

  // Ensure refs is always an array, even if a single ref is passed
  const allRefs = useMemo(() => {
    return Array.isArray(refs) ? refs : [refs];
  }, [refs]);

  useEffect(() => {
    const handleCheckIfOutside = (event) => {
      // Document listeners see the shadow host as event.target for Shadow DOM clicks.
      // The composed path still includes elements inside an open shadow root, so
      // checking that path prevents internal clicks from being treated as outside.
      const eventPath = event.composedPath?.();
      let allRefsOutside = true;

      for (let i = 0; i < allRefs.length; i++) {
        const ref = allRefs[i];
        const el = ref?.current;

        if (!el) {
          continue;
        }

        const isOutside = !el.contains(event.target) && !eventPath?.includes(el);
        if (!isOutside) {
          allRefsOutside = false;
          break; // Stop early if one ref is not outside
        }
      }

      // Trigger handler if all refs are outside
      if (allRefsOutside) {
        handler?.(event);
      }
    };

    const filteredEvents = (Array.isArray(events) ? events : [])
      .filter(x => (typeof x === 'string'));

    // Keep the subscribed documents even after React clears the element refs.
    const documents = allRefs.map(ref => ref?.current ? getOwnerDocument(ref.current) : null);
    // Attach event listeners to the document of each ref
    documents.forEach(doc => {
      if (!doc) {
        return;
      }
      filteredEvents.forEach(eventName => {
        doc.addEventListener?.(eventName, handleCheckIfOutside);
      });
    });

    return () => {
      documents.forEach(doc => {
        filteredEvents.forEach(eventName => {
          doc?.removeEventListener?.(eventName, handleCheckIfOutside);
        });
      });
    };
  }, [allRefs, handler, events]);
};

export default useClickOutside;
