import { Box, SearchInput } from '@tonic-ui/react';
import { callEventHandlers } from '@tonic-ui/utils';
import { ensureString } from 'ensure-type';
import React, { forwardRef, useState } from 'react';
import { Dropdown } from '../dropdown';

const SearchDropdown = forwardRef((
  {
    onClose: onCloseProp,
    onSelect,
    options = [],
    renderContent: renderContentProp,
    renderOption: renderOptionProp,
    toggleProps,
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
            selectionStart, // the position where the character will be inserted
            selectionEnd, // if has a selection this value will be different than the previous
            value, // this is the value before the key is added
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
      onClearInput={(event) => {
        setSearchKeyword('');
      }}
      onChange={(event) => {
        const value = event.target.value;
        setSearchKeyword(value);
      }}
    />
  );

  const renderContent = ({ options, renderOption, renderOptions }) => {
    if (typeof renderContentProp === 'function') {
      // Render custom layout
      return renderContentProp({ options, renderOption, renderOptions, renderSearchInput, searchKeyword });
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
        {renderOptions(options)}
      </>
    );
  };

  const renderOption = (option) => {
    return (typeof renderOptionProp === 'function')
      ? renderOptionProp(option, { searchKeyword })
      : (option.label ?? option.value);
  };

  const filteredOptions = options.filter(option => {
    if (!normalizedSearchKeyword) {
      return true;
    }
    const normalizedItemString = ensureString(option?.label).trim().toLowerCase();
    return normalizedItemString.includes(normalizedSearchKeyword);
  });

  const onClose = () => {
    setSearchKeyword('');
  };

  return (
    <Dropdown
      defaultActiveIndex={0}
      onClose={callEventHandlers(onCloseProp, onClose)}
      options={filteredOptions}
      onSelect={onSelect}
      renderContent={renderContent}
      renderOption={renderOption}
      toggleProps={toggleProps}
      {...rest}
    />
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;
