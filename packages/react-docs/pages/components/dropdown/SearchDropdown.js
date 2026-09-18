import {
  Box,
  Dropdown,
  Scrollbar,
  SearchInput,
} from '@tonic-ui/react';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import { forwardRef, useState } from 'react';

// SearchDropdown: Dropdown with an inline SearchInput in renderContent.
const SearchDropdown = forwardRef((
  {
    defaultValue,
    onClose: onCloseProp,
    onChange,
    items = [],
    renderItem: renderItemProp,
    renderToggle,
    slotProps = {},
    value,
    ...rest
  },
  ref
) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const normalizedSearchKeyword = ensureString(searchKeyword).trim().toLowerCase();

  const renderSearchInput = () => (
    <SearchInput
      inputProps={{
        role: 'menuitem', // Specify "menuitem" role for keyboard navigation
        onKeyDown: (event) => {
          const input = event.target;
          const {
            selectionStart,
            selectionEnd,
            value,
          } = input;
          const isAtStart = (selectionStart === 0 && selectionEnd === 0);
          const isAtEnd = (selectionStart === value.length && selectionEnd === value.length);

          if (isAtStart && ['ArrowUp', 'Home'].includes(event.key)) {
            return;
          }
          if (isAtEnd && ['ArrowDown', 'End'].includes(event.key)) {
            return;
          }

          // Stop event propagation to menu for specific keys
          event.stopPropagation();
        },
      }}
      value={searchKeyword}
      onClearInput={() => {
        setSearchKeyword('');
      }}
      onChange={(event) => {
        setSearchKeyword(event.target.value);
      }}
    />
  );

  const renderItem = (item) => {
    return (typeof renderItemProp === 'function')
      ? renderItemProp(item, { searchKeyword })
      : (item.label ?? item.value);
  };

  const filteredItems = items.filter(item => {
    if (!normalizedSearchKeyword) {
      return true;
    }
    const normalizedLabel = ensureString(item?.label).trim().toLowerCase();
    return normalizedLabel.includes(normalizedSearchKeyword);
  });

  const onClose = () => {
    setSearchKeyword('');
  };

  return (
    <Dropdown
      ref={ref}
      defaultActiveIndex={0}
      defaultValue={defaultValue}
      onClose={callEventHandlers(onCloseProp, onClose)}
      items={filteredItems}
      onChange={onChange}
      renderContent={({ renderItems }) => (
        <>
          <Box px="3x" mb="2x">
            {renderSearchInput()}
          </Box>
          {filteredItems.length === 0 ? (
            <Box px="3x" py="2x">No options</Box>
          ) : (
            <Scrollbar maxHeight={36 * 5} overflowY="visible">
              {renderItems(filteredItems)}
            </Scrollbar>
          )}
        </>
      )}
      renderItem={renderItem}
      renderToggle={renderToggle}
      slotProps={slotProps}
      value={value}
      {...rest}
    />
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;
