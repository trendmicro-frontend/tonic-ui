import { isPlainObject } from '@tonic-ui/utils';
import { forwardRef } from 'react';
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
