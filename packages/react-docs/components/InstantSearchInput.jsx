import {
  SearchInput,
} from '@tonic-ui/react';
import React, { forwardRef, useCallback, useState } from 'react';
import {
  useSearchBox,
} from 'react-instantsearch-hooks';

// https://www.algolia.com/doc/api-reference/widgets/search-box/react-hooks/#hook-params
const queryHook = (query, search) => {
  search(query);
};

const InstantSearchInput = forwardRef((props, ref) => {
  const { query, refine, clear, isSearchStalled } = useSearchBox({ queryHook });
  const [inputValue, setInputValue] = useState(query);

  const onChange = useCallback((event) => {
    const value = event.currentTarget.value;
    setInputValue(value);
    refine(value);
  }, [refine]);

  const onClearInput = useCallback(() => {
    setInputValue('');
    clear();
  }, [clear]);

  return (
    <SearchInput
      ref={ref}
      isLoading={isSearchStalled}
      value={inputValue}
      onChange={onChange}
      onClearInput={onClearInput}
      {...props}
    />
  );
});

InstantSearchInput.displayName = 'InstantSearchInput';

export default InstantSearchInput;
