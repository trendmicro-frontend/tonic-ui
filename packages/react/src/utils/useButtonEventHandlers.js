import { useEventCallback } from '@tonic-ui/react-hooks';
import { ensureFunction } from 'ensure-type';

/**
 * A React hook that provides accessible keyboard and mouse interactions, emulating native button behavior.
 * It handles the `disabled` state, suppresses unintended default behavior, and triggers the `onActivate` callback
 * when activated by a mouse click, Enter key, or Space key.
 *
 * Note: If using `role="button"` instead of the semantic `<button>` or `<input type="button">` elements,
 * you will need to make the element focusable and define event handlers for `click` and `keydown` events.
 * This includes handling the `Enter` and `Space` key presses in order to process all forms of user input.
 * See the official WAI-ARIA example code: https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/
 *
 * @param {{ disabled?: boolean, onActivate?: (event: React.SyntheticEvent) => void }} options
 * @param {boolean} [options.disabled=false] - If true, all interactions are blocked.
 * @param {(event: React.SyntheticEvent) => void} [options.onActivate] - Function called with the event when activated.
 * @returns {{ onClick: React.MouseEventHandler, onKeyDown: React.KeyboardEventHandler }} An object containing onClick and onKeyDown handlers.
 */
function useButtonEventHandlers({
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

    if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
      event.preventDefault();
      ensureFunction(onActivate)(event);
    }
  }, [disabled, onActivate]);

  return {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
  };
}

export default useButtonEventHandlers;
