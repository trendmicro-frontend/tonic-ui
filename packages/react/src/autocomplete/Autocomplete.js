import { isPlainObject } from '@tonic-ui/utils';
import React, { forwardRef } from 'react';
import { Box } from '../box';
import { useDefaultProps } from '../default-props';
import useShallowMemo from '../utils/useShallowMemo';
import AutocompleteInput from './AutocompleteInput';
import AutocompleteItem from './AutocompleteItem';
import AutocompleteList from './AutocompleteList';
import { AutocompleteContext } from './context';
import { useAutocompleteStyle } from './styles';
import useAutocompleteState from './useAutocompleteState';

const defaultRenderInput = (params) => <AutocompleteInput {...params} />;

const defaultRenderItem = (item) => {
  if (item === null || item === undefined) {
    return '';
  }
  if (typeof item === 'string') {
    return item;
  }
  if (isPlainObject(item)) {
    return item.label ?? item.value ?? '';
  }
  return String(item);
};

/**
 * @typedef {Object} AutocompleteRenderInputParams
 * @property {object} inputProps - Hook-managed props for the underlying `<input>`: ref, value, ARIA, and event handlers.
 * @property {boolean} isClearable - Whether the consumer enabled the clear-button capability.
 * @property {boolean} isLoading - Whether to render the loading indicator.
 * @property {(event?: React.SyntheticEvent) => void} onClearInput - Reset the input and selection (fires `onChange(null)`). Wired into the clear-button slot of `AutocompleteInput` (or invoke directly from a custom input).
 * @property {React.Ref<HTMLElement>} ref - Anchor ref for popper positioning. Spread onto the input wrapper.
 */

/**
 * @typedef {Object} AutocompleteProps
 * @property {boolean} [autoHighlight=false] - If `true`, the first option is automatically highlighted whenever the filtered list changes or the popup (re)opens. Pressing `Enter` then commits the top match without arrowing first.
 * @property {'restore' | 'clear' | 'keep'} [closeBehavior='restore'] - Controls what happens to the input value when the popup closes (blur, click-outside, or Escape) and the typed text differs from the last committed label. `'restore'` reverts to the last committed label; `'clear'` resets to `''` and fires `onChange(null)` so consumers can clear their selection state; `'keep'` leaves it as-is.
 * @property {any} [defaultValue=null] - Initial selected item in uncontrolled mode. Pair with `onChange` to read selection updates without managing `value` externally. The input is seeded with `getItemLabel(defaultValue)`. Ignored when `value` is controlled.
 * @property {(items: any[], state: { inputValue: string; getItemLabel: (item: any) => string }) => any[]} [filterItems] - Override the default case-insensitive label filter. `getItemLabel` is provided so the filter can stringify items without re-implementing the label resolver. The returned array can also include synthetic items (e.g. `Add "X"`); see the Creatable example for the recipe.
 * @property {(item: any) => string} [getItemLabel] - Map an item to its input-text label. Default: `''` for `null`/`undefined`, the string itself for strings, `item.label ?? item.value ?? ''` for plain objects, otherwise `String(item)`.
 * @property {string} [inputValue] - Controlled input text. Pair with `onInputChange` to manage the value externally; if you need an initial value, seed your own state.
 * @property {boolean} [isClearable=false] - If `true`, enables the clear-button capability. The actual button visibility depends on the input having a value and not being disabled. Custom `renderInput` implementations can wire their own clear UI via `params.onClearInput`.
 * @property {boolean} [isLoading=false] - When `true`, signals a loading state. Forwarded to `renderInput` (typically swaps the chevron for a spinner) and to `renderContent` so consumers can customize the popup body while loading.
 * @property {any[]} items - The list of items available for selection.
 * @property {boolean} [matchWidth=false] - If `true`, sizes the dropdown list to match the input's `offsetWidth`.
 * @property {(item: any | null) => void} [onChange] - Fires when the selection changes. Receives the committed item on click/Enter, or `null` when the input is cleared (clear button click or `closeBehavior="clear"` applying on dismiss/Escape).
 * @property {() => void} [onClose] - Fires when the dropdown transitions from open to closed (Escape, item selection, or blur/click-outside).
 * @property {(state: { item: any; index: number; reason: 'keyboard' | 'mouse' }) => void} [onHighlightChange] - Fires when the highlighted option changes via keyboard navigation or hover. The natural integration point for virtualization (call `listRef.scrollToItem(index)` when `reason === 'keyboard'`).
 * @property {(nextValue: string) => void} [onInputChange] - Fires whenever the input value changes — typing, selection commit, clear button, and `closeBehavior`-triggered resets.
 * @property {() => void} [onOpen] - Fires when the dropdown transitions from closed to open (on every open, including re-opens). Use this to trigger or refresh an API fetch.
 * @property {'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'} [placement='bottom-start'] - Popper placement.
 * @property {boolean} [portalled=false] - Render the popover in a portal.
 * @property {(args: { items: any[]; renderItem: (item: any) => React.ReactNode; renderItems: (items: any[]) => React.ReactNode; getItemProps: (params: { index: number; item: any }) => object; inputValue: string; isLoading: boolean; AutocompleteItem: React.ComponentType }) => React.ReactNode} [renderContent] - Customize the list content. Default renders the filtered items. Return `null` to hide the popup entirely (no empty Paper background) when there is nothing to show. For custom layouts (e.g. virtualization), use the `AutocompleteItem` component delivered in the args bag and wire each instance with `getItemProps`.
 * @property {(params: AutocompleteRenderInputParams) => React.ReactNode} [renderInput] - Render the input. Defaults to `(params) => <AutocompleteInput {...params} />`. Override to add visual props (e.g. `placeholder`, `error`) or to render a custom-built input that forwards `ref` and `inputProps`.
 * @property {(item: any, state: { inputValue: string }) => React.ReactNode} [renderItem] - Customize each item's content. Default mirrors `getItemLabel`: `''` for `null`/`undefined`, the string itself for strings, `item.label ?? item.value ?? ''` for plain objects, otherwise `String(item)`.
 * @property {boolean} [selectOnFocus=false] - If `true`, select the existing input text on focus, letting the user immediately type to replace the previous value.
 * @property {{ content?: { width?: string | number; [key: string]: any } }} [slotProps] - Props forwarded to internal slots. `slotProps.content` is spread on `<AutocompleteList>`.
 * @property {any} [value] - Controlled selected item (or `null` for no selection). Pair with `onChange` to manage the value externally. When set, the input automatically syncs to `getItemLabel(value)` on every value change. Pass a referentially stable item (memoize if needed) to avoid spurious sync updates.
 */

/**
 * @type {ForwardRefComponent<'div', AutocompleteProps>}
 */
const Autocomplete = forwardRef((inProps, ref) => {
  const {
    autoHighlight = false,
    closeBehavior = 'restore',
    defaultValue,
    filterItems,
    getItemLabel,
    inputValue: inputValueProp,
    isClearable = false,
    isLoading = false,
    items = [],
    matchWidth = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    placement = 'bottom-start',
    portalled = false,
    renderContent,
    renderInput = defaultRenderInput,
    renderItem = defaultRenderItem,
    selectOnFocus = false,
    slotProps = {},
    value: valueProp,
    ...rest
  } = useDefaultProps({ props: inProps, name: 'Autocomplete' });
  const shallowMemo = useShallowMemo();
  const styleProps = useAutocompleteStyle();

  const {
    // Refs
    anchorRef,
    contentRef,

    // Prop getters
    getInputProps,
    getItemProps,
    getListProps,

    // Derived state
    filteredItems,
    inputValue,
    isOpen,

    // Actions
    clearValue,
  } = useAutocompleteState({
    autoHighlight,
    closeBehavior,
    defaultValue,
    filterItems,
    getItemLabel,
    inputValue: inputValueProp,
    items,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    selectOnFocus,
    value: valueProp,
  });

  const renderItemWithContext = (item) => renderItem(item, { inputValue });

  // `getItemProps` already merges `item.props` (DropdownBase parity), chains
  // consumer-supplied handlers via `callEventHandlers`, and sets both
  // `aria-selected` (semantic) and `data-highlighted` (visual hook used by
  // the style hook), so the component just spreads its result.
  const renderItems = (itemsToRender) => itemsToRender.map((item, index) => (
    <AutocompleteItem
      // Safe: items list narrows-only via filter, AutocompleteItem is stateless.
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      {...getItemProps({ index, item })}
    >
      {renderItemWithContext(item)}
    </AutocompleteItem>
  ));

  let content;
  if (typeof renderContent === 'function') {
    content = renderContent({
      items: filteredItems,
      renderItem: renderItemWithContext,
      renderItems,
      getItemProps,
      inputValue,
      isLoading,
      AutocompleteItem,
    });
  } else {
    content = renderItems(filteredItems);
  }

  // Hook-managed input props (ref, value, ARIA, handlers). The consumer extends
  // these on the `AutocompleteInput` they render — not on the Autocomplete root.
  const inputProps = getInputProps();

  const context = shallowMemo({
    anchorRef,
    contentRef,
    getListProps,
    isOpen,
    matchWidth,
    placement,
    portalled,
  });

  return (
    <AutocompleteContext.Provider value={context}>
      <Box
        ref={ref}
        {...styleProps}
        {...rest}
      >
        {renderInput({ inputProps, isClearable, isLoading, onClearInput: clearValue, ref: anchorRef })}
        <AutocompleteList {...slotProps?.content}>
          {content}
        </AutocompleteList>
      </Box>
    </AutocompleteContext.Provider>
  );
});

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
