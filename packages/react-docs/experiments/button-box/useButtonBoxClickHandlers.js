import { useEventCallback } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';

/**
 * A React hook that provides accessible click and keyboard interactions, emulating native button behavior.
 * It handles the `disabled` state, suppresses unintended default behavior, and triggers the `onClick` callback
 * when activated by a mouse click, Enter key, or Space key.
 *
 * @param {Object} options
 * @param {boolean} [options.disabled=false] - If true, all interactions are blocked.
 * @param {React.EventHandler} [options.onClick] - Function called with the event when activated.
 * @returns {Object} An object containing:
 *   - onClick: React.MouseEventHandler
 *   - onKeyDown: React.KeyboardEventHandler
 *   - onKeyUp: React.KeyboardEventHandler
 */
function useButtonBoxClickHandlers({
  disabled = false,
  onClick,
  onKeyDown,
  onKeyUp,
}) {
  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    ensureFunction(onClick)(event);
  }, [disabled, onClick]);

  const handleKeyDown = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ') {
      // Prevent page scroll on Space
      event.preventDefault();
    } else if (event.key === 'Enter' && !event.repeat) {
      event.preventDefault();
      ensureFunction(onClick)(event);
    }

    ensureFunction(onKeyDown)(event);
  }, [disabled, onClick]);

  const handleKeyUp = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ' && !event.repeat) {
      event.preventDefault();
      ensureFunction(onClick)(event);
    }

    ensureFunction(onKeyUp)(event);
  }, [disabled, onClick]);

  return {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };
}

export default useButtonBoxClickHandlers;
