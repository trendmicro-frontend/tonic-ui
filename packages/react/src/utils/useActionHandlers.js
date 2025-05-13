import { useEventCallback } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';

/**
 * A React hook that provides accessible keyboard and mouse interactions, emulating native button behavior.
 * It handles the `disabled` state, suppresses unintended default behavior, and triggers the `onAction` callback
 * when activated by a mouse click, Enter key, or Space key.
 *
 * @param {Object} options
 * @param {boolean} [options.disabled=false] - If true, all interactions are blocked.
 * @param {React.EventHandler} [options.onAction] - Function called with the event when activated.
 * @returns {Object} An object containing:
 *   - onClick: React.MouseEventHandler
 *   - onKeyDown: React.KeyboardEventHandler
 *   - onKeyUp: React.KeyboardEventHandler
 */
function useActionHandlers({
  disabled = false,
  onAction,
}) {
  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    ensureFunction(onAction)(event);
  }, [disabled, onAction]);

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
      ensureFunction(onAction)(event);
    }
  }, [disabled, onAction]);

  const handleKeyUp = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === ' ' && !event.repeat) {
      event.preventDefault();
      ensureFunction(onAction)(event);
    }
  }, [disabled, onAction]);

  return {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  };
}

export default useActionHandlers;
