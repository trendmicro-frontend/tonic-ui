/* eslint-disable react/jsx-no-bind */
/**
 * Test fixture: the legacy `SearchDropdown` recipe rebuilt on `DropdownShim`.
 *
 * Mirrors the generic wrapper shape that legacy consumers use today —
 * wrapper-local search state, `renderSearchInput` injected into the consumer's
 * `renderContent`, a `renderItem({ searchKeyword })` wrapper, client-side
 * label filtering, and keyword reset on close — without referencing any
 * specific application. Used to pin that such wrappers migrate to the new
 * Dropdown surface without rewriting their toggle or content wiring.
 */
import { Box, SearchInput } from '@tonic-ui/react/src';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import DropdownShim from './DropdownShim';

const SearchDropdownShim = forwardRef((
  {
    children,
    defaultValue,
    onClose: onCloseProp,
    onChange,
    items = [],
    renderContent: renderContentProp,
    renderItem: renderItemProp,
    slots = {},
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

  const renderContent = ({ items: contentItems, renderItem, renderItems }) => {
    if (typeof renderContentProp === 'function') {
      // Render custom layout (legacy contract: renderSearchInput + searchKeyword are injected)
      return renderContentProp({
        items: contentItems,
        renderItem,
        renderItems,
        renderSearchInput,
        searchKeyword,
      });
    }

    // Render default layout
    return (
      <>
        <Box
          px="3x"
          mb="2x"
        >
          {renderSearchInput()}
        </Box>
        {renderItems(contentItems)}
      </>
    );
  };

  // Null-safe: the toggle fallback calls renderItem(null) before any selection
  // (same contract as the raw Dropdown's default toggle).
  const renderItem = (item) => (
    (item === null || item === undefined)
      ? ''
      : (typeof renderItemProp === 'function'
          ? renderItemProp(item, { searchKeyword })
          : (item.label ?? item.value))
  );

  const filteredOptions = items.filter((item) => {
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
    <DropdownShim
      ref={ref}
      defaultActiveIndex={0}
      defaultValue={defaultValue}
      onClose={callEventHandlers(onCloseProp, handleClose)}
      items={filteredOptions}
      onChange={onChange}
      renderContent={renderContent}
      renderItem={renderItem}
      slots={slots}
      slotProps={slotProps}
      value={value}
      {...rest}
    >
      {children}
    </DropdownShim>
  );
});

SearchDropdownShim.displayName = 'SearchDropdownShim';

export default SearchDropdownShim;
