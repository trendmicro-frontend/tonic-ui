import { useClickOutside, useId, usePrevious } from '@tonic-ui/react-hooks';
import { ariaAttr, callEventHandlers, dataAttr, isNullish, isPlainObject } from '@tonic-ui/utils';
import { ensureFunction, ensureString } from 'ensure-type';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const defaultGetItemLabel = (item) => {
  if (isNullish(item)) {
    return '';
  }
  if (typeof item === 'string') {
    return item;
  }
  if (isPlainObject(item)) {
    return ensureString(item.label ?? item.value ?? '');
  }
  return String(item);
};

const defaultFilterItems = (items, { inputValue, getItemLabel }) => {
  const q = ensureString(inputValue).trim().toLowerCase();
  if (!q) {
    return items;
  }
  return items.filter((item) => {
    const label = getItemLabel(item);
    return label.toLowerCase().includes(q);
  });
};

/**
 * Headless state + a11y plumbing for Autocomplete.
 *
 * Returns getter functions that produce the props to spread onto the input, the list, and each option.
 * The caller owns the rendering; the hook owns the state machine.
 */
const useAutocompleteState = ({
  autoHighlight = false,
  closeBehavior = 'restore',
  defaultValue,
  filterItems,
  getItemLabel = defaultGetItemLabel,
  inputValue: inputValueProp,
  items = [],
  onChange,
  onClose,
  onHighlightChange,
  onInputChange,
  onOpen,
  selectOnFocus = false,
  value: valueProp,
} = {}) => {
  const isInputValueControlled = (inputValueProp !== undefined);
  const isValueControlled = (valueProp !== undefined);

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? null);
  const value = isValueControlled ? valueProp : uncontrolledValue;

  // Seed initial inputValue from value's label. `useRef` captures it once on
  // mount; later renders re-evaluate the argument but `.current` ignores it.
  const initialInputValue = useRef(isNullish(value) ? '' : getItemLabel(value)).current;
  const [uncontrolledInputValue, setUncontrolledInputValue] = useState(initialInputValue);
  const inputValue = isInputValueControlled ? inputValueProp : uncontrolledInputValue;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Anchor for popper positioning.
  // Set by `renderInput({ ref })` — typically the input wrapper, not the bare `<input>`.
  const anchorRef = useRef(null);

  // The rendered popper container.
  // Set by `<AutocompleteList>` via context.
  // Used by `useClickOutside` to detect clicks inside the list (portalled or not).
  const contentRef = useRef(null);

  // The bare `<input>` element. Set via `getInputProps().ref`. Used by
  // `clearValue` to refocus the input after clearing.
  const inputRef = useRef(null);

  // The label of the currently committed value. Maintained by the sync effect
  // below as a derivative of `getItemLabel(value)`. Used by `closeBehavior:
  // 'restore'` to revert typed-but-not-picked text back to the selection's
  // label, and by the early-bail in `dismiss` to skip work when the input
  // already matches.
  const committedValueRef = useRef(initialInputValue);

  // Always-up-to-date callback refs — updating these does not cause the
  // transition-detection effect below to re-subscribe.
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  onOpenRef.current = onOpen;
  onCloseRef.current = onClose;

  // Always-current inputValue ref — lets dismiss() read the live value
  // without listing inputValue as a dep (which would recreate dismiss and
  // getInputProps on every keystroke).
  const inputValueRef = useRef(inputValue);
  inputValueRef.current = inputValue;

  // Keyboard-nav suppression for mouse hover: when keyboard nav scrolls the
  // list under a stationary cursor, the cursor "enters" a new item and
  // `onMouseEnter` fires without the user actually moving the mouse. That
  // would override the keyboard's highlight. Set to `true` on each
  // keyboard-driven highlight change (in `updateHighlight`) and back to
  // `false` on real `mousemove` over the listbox (in `getListProps`). Item
  // `onMouseEnter` checks the flag and skips while it's set.
  const isKeyboardNavigationRef = useRef(false);

  // Fire onOpen/onClose exactly when isOpen transitions between true and false.
  const prevIsOpenRef = useRef(false);
  useEffect(() => {
    const prev = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;
    if (!prev && isOpen) {
      onOpenRef.current?.();
    } else if (prev && !isOpen) {
      onCloseRef.current?.();
    }
  }, [isOpen]);

  const baseId = useId();
  const listId = baseId ? `autocomplete-list-${baseId}` : undefined;
  const getItemId = useCallback((index) => (
    baseId ? `autocomplete-item-${baseId}-${index}` : undefined
  ), [baseId]);

  const filteredItems = useMemo(() => {
    const fn = (typeof filterItems === 'function') ? filterItems : defaultFilterItems;
    return fn(items, { inputValue, getItemLabel });
  }, [filterItems, items, inputValue, getItemLabel]);

  // When `autoHighlight` is enabled, force the highlight to the first item
  // whenever the popup is open and the filtered list changes (typing) or the
  // popup just (re)opened. Empty list resets to -1. This is what makes
  // "press Enter to commit the top match" UX work without consumer keydown
  // wiring — the synthetic "Add X" item in creatable patterns becomes the
  // implicit Enter target as soon as it appears.
  useEffect(() => {
    if (autoHighlight && isOpen) {
      setHighlightedIndex(filteredItems.length > 0 ? 0 : -1);
    }
  }, [autoHighlight, isOpen, filteredItems]);

  const updateInputValue = useCallback((nextValue) => {
    if (!isInputValueControlled) {
      setUncontrolledInputValue(nextValue);
    }
    ensureFunction(onInputChange)(nextValue);
  }, [isInputValueControlled, onInputChange]);

  // Sync `inputValue` to the label of `value` whenever `value` changes.
  //
  // - The `previousValue === value` early-return prevents the effect from
  //   clobbering typed text when the deps array re-fires because
  //   `onInputChange` / `getItemLabel` are inline functions.
  // - On the first render `previousValue` is `undefined`; if there's no
  //   selection, leave the input alone so a controlled or seeded `inputValue`
  //   isn't blanked by "no value".
  //
  // Caller responsibility: pass a referentially stable `value`. Re-creating
  // the item on every render makes the ref-equality check false each render,
  // firing the effect every render. Memoize via `useMemo` or hoist the item
  // out of render scope.
  const previousValue = usePrevious(value);
  useEffect(() => {
    if (previousValue === value) {
      return;
    }
    if (previousValue === undefined && isNullish(value)) {
      return;
    }

    const committedLabel = isNullish(value) ? '' : getItemLabel(value);
    committedValueRef.current = committedLabel;
    // Only force-sync the input when `value` is controlled. In uncontrolled
    // mode, the consumer manages `inputValue` (e.g. the multi-select pattern
    // resets it to '' after each pick) and the sync effect must not override it.
    if (isValueControlled && inputValueRef.current !== committedLabel) {
      updateInputValue(committedLabel);
    }
  }, [isValueControlled, value, previousValue, getItemLabel, updateInputValue]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  // Applies `closeBehavior` when the popup closes due to blur, click-outside, or Escape.
  // - 'restore' reverts to the last committed label
  // - 'clear' resets to '' and fires `onChange(null)` so consumers can clear their selection state
  // - 'keep' leaves typed text as-is
  // inputValueRef keeps this stable across keystrokes so getInputProps and
  // useClickOutside don't re-subscribe on every keystroke.
  const dismiss = useCallback(() => {
    close();

    if (inputValueRef.current === committedValueRef.current) {
      return;
    }

    if (closeBehavior === 'clear') {
      if (!isValueControlled) {
        setUncontrolledValue(null);
      }
      updateInputValue('');
      ensureFunction(onChange)(null);
    } else if (closeBehavior === 'restore') {
      updateInputValue(committedValueRef.current);
    }
  }, [close, closeBehavior, isValueControlled, updateInputValue, onChange]);

  // Close on outside interaction. The input's `onBlur` only fires when
  // focus is in the input; this catches the case where focus has drifted
  // away first.
  useClickOutside([anchorRef, contentRef], dismiss);

  // Moves the highlight cursor: updates state, fires `onHighlightChange`, and
  // scrolls the active item into view for keyboard nav.
  //
  // `reason` indicates the source of the change:
  //   - 'keyboard' — ArrowDown / ArrowUp / Home / End from the input
  //   - 'mouse'    — option `onMouseEnter`
  //
  // Consumers can filter updates by reason (e.g. virtualization can react
  // only to 'keyboard' since hover already implies visibility).
  //
  // Scroll-into-view fires only for keyboard nav. Mouse hover already implies
  // the row is visible, so it's skipped. Virtualized lists supply their own
  // scroll behavior via `onHighlightChange` — `scrollIntoView` on a real DOM
  // node is a no-op when the element is already visible, so the two paths
  // coexist without conflict.
  const updateHighlight = useCallback(({ index, reason }) => {
    setHighlightedIndex(index);
    const item = (index >= 0) ? (filteredItems[index] ?? null) : null;
    ensureFunction(onHighlightChange)({ item, index, reason });

    if (reason === 'keyboard' && index >= 0) {
      isKeyboardNavigationRef.current = true;
      // Defer one frame so the new highlighted state is committed and the
      // option element exists in the DOM before measuring. `behavior: 'instant'`
      // overrides any inherited CSS `scroll-behavior: smooth` so the jump is
      // synchronous and avoids the smooth-scroll jank that's noticeable
      // compared to native wheel scrolling. The `?.` on `scrollIntoView` is
      // for jsdom (test env), which doesn't implement it on `Element.prototype`;
      // real browsers always have it.
      requestAnimationFrame(() => {
        const el = document.getElementById(getItemId(index));
        el?.scrollIntoView?.({ block: 'nearest', behavior: 'instant' });
      });
    }
  }, [onHighlightChange, filteredItems, getItemId]);

  const clearValue = useCallback(() => {
    if (!isValueControlled) {
      setUncontrolledValue(null);
    }
    updateInputValue('');
    ensureFunction(onChange)(null);
    // Retain focus on the input after clearing — covers keyboard activation
    // of the clear button (Tab + Enter/Space) and programmatic callers.
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [isValueControlled, updateInputValue, onChange]);

  const commitSelection = useCallback((item) => {
    if (isNullish(item)) {
      return;
    }
    if (!isValueControlled) {
      setUncontrolledValue(item);
    }
    // Update the input eagerly for instant visual feedback. `committedValueRef`
    // is intentionally NOT updated here — the value-sync effect is the single
    // source of truth and will set it when `value` actually changes. If the
    // consumer ignores `onChange` (controlled `value` prop unchanged), the
    // sync effect won't run, so a later `dismiss` with `closeBehavior:
    // 'restore'` reverts the input to the actual value's label.
    updateInputValue(getItemLabel(item));
    ensureFunction(onChange)(item);
    close();
  }, [getItemLabel, isValueControlled, updateInputValue, onChange, close]);

  // Keep `highlightedIndex` in-bounds after filtering narrows the list.
  const clampedHighlight = (filteredItems.length > 0 && highlightedIndex >= filteredItems.length)
    ? filteredItems.length - 1
    : highlightedIndex;

  const getRootProps = useCallback(() => ({
    ref: anchorRef,
    role: 'combobox',
    'aria-haspopup': 'listbox',
    // WAI-ARIA combobox requires `aria-expanded` to always be set (`"true"` or
    // `"false"`), not omitted — so we pass the raw boolean instead of `ariaAttr`.
    'aria-expanded': isOpen,
    'aria-owns': isOpen ? listId : undefined,
  }), [isOpen, listId]);

  const getInputProps = useCallback((ownProps = {}) => {
    const activeId = (isOpen && clampedHighlight >= 0) ? getItemId(clampedHighlight) : undefined;

    // Intentionally does NOT open the dropdown on focus. Focus transitions are
    // noisy — clear buttons, chevrons, and other in-widget controls routinely
    // bounce focus back to the input via RAF, which would otherwise reopen the
    // dropdown right after the user just closed or cleared it. Opens still
    // happen on click, typing, and ArrowUp/Down (the explicit intent signals).
    const handleFocus = (event) => {
      if (selectOnFocus && event?.target?.select) {
        event.target.select();
      }
    };

    const handleClick = () => {
      open();
    };

    const handleChange = (event) => {
      const nextValue = event?.target?.value ?? '';
      updateInputValue(nextValue);
      open();
    };

    const handleBlur = dismiss;

    const handleKeyDown = (event) => {
      if (event.defaultPrevented) {
        return;
      }
      const key = event.key;
      const last = filteredItems.length - 1;
      if (key === 'ArrowDown') {
        event.preventDefault();
        if (!isOpen) {
          open();
          updateHighlight({ index: 0, reason: 'keyboard' });
        } else {
          const prev = clampedHighlight;
          const next = (prev < 0 || prev >= last) ? 0 : prev + 1;
          updateHighlight({ index: next, reason: 'keyboard' });
        }
      } else if (key === 'ArrowUp') {
        event.preventDefault();
        if (!isOpen) {
          open();
          updateHighlight({ index: last, reason: 'keyboard' });
        } else {
          const prev = clampedHighlight;
          const next = (prev <= 0) ? last : prev - 1;
          updateHighlight({ index: next, reason: 'keyboard' });
        }
      } else if (key === 'Home') {
        if (isOpen && filteredItems.length > 0) {
          event.preventDefault();
          updateHighlight({ index: 0, reason: 'keyboard' });
        }
      } else if (key === 'End') {
        if (isOpen && filteredItems.length > 0) {
          event.preventDefault();
          updateHighlight({ index: last, reason: 'keyboard' });
        }
      } else if (key === 'Enter') {
        if (isOpen && clampedHighlight >= 0) {
          event.preventDefault();
          commitSelection(filteredItems[clampedHighlight]);
        }
      } else if (key === 'Escape') {
        if (isOpen) {
          event.preventDefault();
          dismiss();
        } else if (closeBehavior !== 'keep' && inputValue !== committedValueRef.current) {
          // Second Escape (popup already closed) — apply closeBehavior to drifted input.
          event.preventDefault();
          if (closeBehavior === 'clear') {
            if (!isValueControlled) {
              setUncontrolledValue(null);
            }
            updateInputValue('');
            ensureFunction(onChange)(null);
          } else if (closeBehavior === 'restore') {
            updateInputValue(committedValueRef.current);
          }
        }
      }
    };

    // Consumer's handlers run first; if a consumer handler calls
    // `preventDefault`, the hook's internal handler is suppressed. Same
    // ordering as the rest of the codebase (TooltipTrigger, MenuItem,
    // AccordionToggle, etc.) — consumer is authoritative.
    // `ownProps` spread first so hook-owned semantics (ref, value, role,
    // aria-*) cannot be silently overridden by consumer keys.
    return {
      ...ownProps,
      ref: inputRef,
      role: 'combobox',
      autoComplete: 'off',
      'aria-autocomplete': 'list',
      // See `getRootProps` — combobox requires explicit `"true"`/`"false"`.
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? listId : undefined,
      'aria-activedescendant': activeId,
      value: inputValue,
      onFocus: callEventHandlers(ownProps.onFocus, handleFocus),
      onClick: callEventHandlers(ownProps.onClick, handleClick),
      onChange: callEventHandlers(ownProps.onChange, handleChange),
      onBlur: callEventHandlers(ownProps.onBlur, handleBlur),
      onKeyDown: callEventHandlers(ownProps.onKeyDown, handleKeyDown),
    };
  }, [
    isOpen,
    isValueControlled,
    listId,
    clampedHighlight,
    getItemId,
    inputValue,
    open,
    updateInputValue,
    filteredItems,
    commitSelection,
    closeBehavior,
    dismiss,
    onChange,
    selectOnFocus,
    updateHighlight,
  ]);

  const getListProps = useCallback(() => ({
    role: 'listbox',
    id: listId,
    // Prevent the mousedown on the list's empty areas from blurring the input.
    onMouseDown: (event) => {
      event.preventDefault();
    },
    // Real mouse movement re-engages hover updates after a keyboard-nav burst.
    // `mousemove` only fires when the cursor's screen position changes — it
    // does NOT fire when the list scrolls under a stationary cursor, which is
    // exactly the discriminator we need.
    onMouseMove: () => {
      isKeyboardNavigationRef.current = false;
    },
  }), [listId]);

  const getItemProps = useCallback(({ index, item }) => {
    const selected = (index === clampedHighlight);
    // Per-item props (DropdownBase parity): when an item is a plain object
    // with a `props` field, those props are spread onto the row element so
    // consumers can declaratively set `disabled`, `className`, `data-*`, etc.
    // per row. Consumer-supplied event handlers (onClick / onMouseEnter /
    // onMouseDown) are chained consumer-first via `callEventHandlers` so they
    // augment rather than override the hook's commit / hover / prevent-blur.
    const itemProps = isPlainObject(item) ? (item.props ?? {}) : {};
    const {
      onClick: onClickProp,
      onMouseEnter: onMouseEnterProp,
      onMouseDown: onMouseDownProp,
      ...restItemProps
    } = itemProps;

    return {
      ...restItemProps,
      id: getItemId(index),
      role: 'option',
      // `aria-selected` carries the ARIA semantic (active descendant — read by screen readers)
      'aria-selected': ariaAttr(selected),
      'data-highlighted': dataAttr(selected),
      // Hover tracks the highlight cursor — except when the cursor "entered"
      // this item only because the list scrolled underneath it during keyboard
      // nav. The `mousemove` handler on the listbox clears `isKeyboardNavigationRef`
      // as soon as the user actually moves the mouse, so this skip is brief.
      onMouseEnter: callEventHandlers(onMouseEnterProp, () => {
        if (isKeyboardNavigationRef.current) {
          return;
        }
        updateHighlight({ index, reason: 'mouse' });
      }),
      // Prevent blur on click — keeps focus in the input (MUI/Radix pattern).
      onMouseDown: callEventHandlers(onMouseDownProp, (event) => {
        event.preventDefault();
      }),
      onClick: callEventHandlers(onClickProp, () => {
        commitSelection(item);
      }),
    };
  }, [clampedHighlight, getItemId, commitSelection, updateHighlight]);

  return {
    // Refs
    anchorRef,
    contentRef,

    // Prop getters
    getInputProps,
    getItemProps,
    getListProps,
    getRootProps,

    // Derived state
    filteredItems,
    highlightedIndex: clampedHighlight,
    inputValue,
    isOpen,
    listId,
    value,

    // Actions
    clearValue,
    close,
    open,
  };
};

export default useAutocompleteState;
