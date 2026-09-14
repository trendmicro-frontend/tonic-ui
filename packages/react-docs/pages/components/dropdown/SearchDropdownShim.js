/**
 * Example: the legacy `SearchDropdown` recipe rebuilt on `DropdownShim`.
 *
 * Copy this file into your app when a legacy search dropdown uses
 * `slots.toggle` / `slotProps.toggle` / `children` and injects
 * `renderSearchInput` into the consumer's `renderContent`.
 *
 * Not a package export. Kept in sync with
 * `packages/react/src/dropdown/__tests__/SearchDropdownShim.js`, which pins the
 * same wrapper shape against the test suite.
 */
import {
  Box,
  SearchInput,
} from '@tonic-ui/react';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import { forwardRef, useState } from 'react';
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
  ref
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
      // Custom layout (legacy contract: renderSearchInput + searchKeyword are injected)
      return renderContentProp({
        items: contentItems,
        renderItem,
        renderItems,
        renderSearchInput,
        searchKeyword,
      });
    }

    // Default layout
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
