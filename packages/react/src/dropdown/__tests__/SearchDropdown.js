/* eslint-disable react/jsx-no-bind */
/**
 * Test fixture: the modern `SearchDropdown` recipe built on the public
 * `Dropdown` surface (current usage).
 *
 * Same wrapper shape as the legacy recipe (`SearchDropdownShim`) expressed with
 * today's API — `renderContent` for the inline search input, a
 * `renderItem({ searchKeyword })` wrapper, client-side label filtering, and
 * keyword reset on close. The toggle is consumer-owned through `renderToggle`:
 * the default toggle calls `renderItem(null)` before any selection, so a
 * `renderToggle` (or a null-safe `renderItem`) is required.
 *
 * Legacy counterpart: `SearchDropdownShim.js` (`slots.toggle` /
 * `slotProps.toggle` / `children`), pinned by `SearchDropdownShim.test.js`.
 */
import {
  Box,
  Dropdown,
  Scrollbar,
  SearchInput,
} from '@tonic-ui/react/src';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useState } from 'react';

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
  ref,
) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const normalizedSearchKeyword = ensureString(searchKeyword).trim().toLowerCase();

  const renderSearchInput = () => (
    <SearchInput
      inputProps={{
        role: 'menuitem', // Specify "menuitem" role for keyboard navigation
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

  const filteredItems = items.filter((item) => {
    if (!normalizedSearchKeyword) {
      return true;
    }
    const normalizedItemString = ensureString(item?.label).trim().toLowerCase();
    return normalizedItemString.includes(normalizedSearchKeyword);
  });

  const handleClose = () => {
    setSearchKeyword('');
  };

  return (
    <Dropdown
      ref={ref}
      defaultActiveIndex={0}
      defaultValue={defaultValue}
      onClose={callEventHandlers(onCloseProp, handleClose)}
      items={filteredItems}
      onChange={onChange}
      renderContent={({ renderItems }) => (
        <>
          <Box
            px="3x"
            mb="2x"
          >
            {renderSearchInput()}
          </Box>
          {filteredItems.length === 0 ? (
            <Box
              px="3x"
              py="2x"
            >
              No options
            </Box>
          ) : (
            <Scrollbar
              maxHeight={36 * 5}
              overflowY="visible"
            >
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
