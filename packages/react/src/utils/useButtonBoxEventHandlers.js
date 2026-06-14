import { useEventCallback } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';

/**
 * A React hook that provides accessible keyboard and mouse interactions for a
 * box-target control (an element with `role="button"` rather than a native
 * `<button>`). It handles the `disabled` state, suppresses unintended default
 * behavior, and triggers `onActivate` when activated by a mouse click, the
 * Enter key (on key-down), or the Space key (on key-up, matching native
 * `<button>` behavior).
 *
 * Unlike `useButtonEventHandlers` (intended for real `<button>` elements, which
 * the browser activates natively), this hook targets a non-button element with
 * no native keyboard activation, so Space is activated on key-up to match the
 * WAI-ARIA APG button pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/
 *
 * @param {{ disabled?: boolean, onActivate?: (event: React.SyntheticEvent) => void }} options
 * @param {boolean} [options.disabled=false] - If true, all interactions are blocked.
 * @param {(event: React.SyntheticEvent) => void} [options.onActivate] - Function called with the event when activated.
 * @returns {{ onClick: React.MouseEventHandler, onKeyDown: React.KeyboardEventHandler, onKeyUp: React.KeyboardEventHandler }} An object containing onClick, onKeyDown, and onKeyUp handlers.
 */
function useButtonBoxEventHandlers({
  disabled = false,
  onActivate,
}) {
  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    ensureFunction(onActivate)(event);
  }, [disabled, onActivate]);

  const handleKeyDown = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ') {
      // Prevent page scroll on Space; activation happens on key-up.
      event.preventDefault();
    } else if (event.key === 'Enter' && !event.repeat) {
      event.preventDefault();
      ensureFunction(onActivate)(event);
    }
  }, [disabled, onActivate]);

  const handleKeyUp = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ' && !event.repeat) {
      event.preventDefault();
      ensureFunction(onActivate)(event);
    }
  }, [disabled, onActivate]);

  return {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };
}

export default useButtonBoxEventHandlers;
